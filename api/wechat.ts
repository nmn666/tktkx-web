import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as crypto from 'crypto';

// ─── 微信对话平台配置 ────────────────────────────────────────
const APPID  = process.env.WECHAT_DIALOG_APPID  || 'XVQaFi83JLMB8PHY';
const TOKEN  = process.env.WECHAT_DIALOG_TOKEN  || 'HYGZRpXGPMkpwS9EKDbATBjFGT785';
const BASE   = 'https://openaiapi.weixin.qq.com';

// ─── access_token 内存缓存（Vercel 冷启动后会重置，但对小流量够用）──
let cachedToken  = '';
let tokenExpires = 0;

function md5(s: string): string {
  return crypto.createHash('md5').update(s).digest('hex');
}

function makeSign(body: string): { timestamp: string; nonce: string; sign: string } {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const nonce     = Math.random().toString(36).slice(2, 14);
  const bodyMd5   = md5(body);
  const sign      = md5(TOKEN + timestamp + nonce + bodyMd5);
  return { timestamp, nonce, sign };
}

async function fetchJson(path: string, body: object, useToken = false): Promise<any> {
  const bodyStr = JSON.stringify(body);
  const { timestamp, nonce, sign } = makeSign(bodyStr);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'timestamp':    timestamp,
    'nonce':        nonce,
    'sign':         sign,
    'request_id':   crypto.randomUUID(),
  };
  if (useToken) {
    headers['X-OPENAI-TOKEN'] = cachedToken;
  } else {
    headers['X-APPID'] = APPID;
  }

  const res  = await fetch(`${BASE}${path}`, { method: 'POST', headers, body: bodyStr });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

// ─── 自动获取/刷新 access_token ──────────────────────────────
async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpires) return cachedToken;
  const data = await fetchJson('/v2/token', {}, false);
  if (data?.code === 0 && data?.data?.access_token) {
    cachedToken  = data.data.access_token;
    tokenExpires = Date.now() + 110 * 60 * 1000; // 提前10分钟过期
    return cachedToken;
  }
  throw new Error('获取 access_token 失败: ' + JSON.stringify(data));
}

// ─── 主处理函数 ───────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS（允许网站前端跨域调用）
  res.setHeader('Access-Control-Allow-Origin', 'https://www.tktkx.cn');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { query: userQuery, session_id } = req.body || {};
  if (!userQuery || typeof userQuery !== 'string') {
    return res.status(400).json({ error: '缺少 query 参数' });
  }

  try {
    await getAccessToken();

    // 调用微信对话平台 /v2/bot/query
    const result = await fetchJson('/v2/bot/query', {
      query:      userQuery,
      env:        'release',
      session_id: session_id || `web_${Date.now()}`,
      appid:      APPID,
    }, true);

    if (result?.code !== 0) {
      return res.status(200).json({ reply: '抱歉，我暂时无法回答，请联系微信客服：SFTKTKTK', raw: result });
    }

    // 提取回复文本
    const answer = result?.data?.answer
      || result?.data?.response
      || result?.data?.text
      || '感谢您的咨询！如需购买TikTok账号或了解GEO服务，请添加微信：SFTKTKTK';

    return res.status(200).json({ reply: answer, session_id });
  } catch (e: any) {
    console.error('[wechat api error]', e);
    return res.status(200).json({
      reply: '网络繁忙，请稍后再试，或直接联系微信：SFTKTKTK / Telegram：@TRXBGB',
    });
  }
}
