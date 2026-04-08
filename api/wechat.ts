import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as crypto from 'crypto';

// ─── 微信对话平台配置 ────────────────────────────────────────
const APPID  = process.env.WECHAT_DIALOG_APPID  || 'XVQaFi83JLMB8PHY';
const TOKEN  = process.env.WECHAT_DIALOG_TOKEN  || 'HYGZRpXGPMkpwS9EKDbATBjFGT785';
const ACCOUNT = process.env.WECHAT_DIALOG_ACCOUNT || 'dx5PISfaTGQ';
const BASE   = 'https://openaiapi.weixin.qq.com';
const DEBUG  = process.env.WECHAT_DEBUG === 'true'; // 开启后返回原始错误

// ─── access_token 内存缓存 ────────────────────────────────────
let cachedToken  = '';
let tokenExpires = 0;

function md5(s: string): string {
  return crypto.createHash('md5').update(s, 'utf8').digest('hex');
}

function makeSign(bodyStr: string): { timestamp: string; nonce: string; sign: string } {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const nonce     = crypto.randomBytes(8).toString('hex');
  // 签名 = md5(Token + timestamp + nonce + md5(body))
  const sign      = md5(TOKEN + timestamp + nonce + md5(bodyStr));
  return { timestamp, nonce, sign };
}

async function wxPost(path: string, body: Record<string, any>, useToken = false): Promise<any> {
  // 微信要求 JSON key 顺序固定，用 JSON.stringify 默认即可
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

  console.log(`[wx] POST ${path}`, { bodyStr, timestamp, nonce, sign, useToken });

  const res  = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers,
    body: bodyStr,
    // Vercel edge 环境需要显式传 signal 防止无限等待
    signal: AbortSignal.timeout(12000),
  });

  const text = await res.text();
  console.log(`[wx] ${path} HTTP ${res.status} →`, text.slice(0, 300));

  try { return JSON.parse(text); } catch { return { raw: text, http_status: res.status }; }
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpires) {
    console.log('[wx] using cached token');
    return cachedToken;
  }
  const data = await wxPost('/v2/token', { account: ACCOUNT }, false);
  if (data?.code === 0 && data?.data?.access_token) {
    cachedToken  = data.data.access_token;
    tokenExpires = Date.now() + 110 * 60 * 1000;
    console.log('[wx] token refreshed, expires in 110min');
    return cachedToken;
  }
  throw new Error('token_failed:' + JSON.stringify(data));
}

// ─── 主处理函数 ───────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { query: userQuery, session_id } = req.body || {};
  if (!userQuery || typeof userQuery !== 'string') {
    return res.status(400).json({ error: '缺少 query 参数' });
  }

  let tokenError = '';
  let queryResult: any = null;

  try {
    await getAccessToken();

    queryResult = await wxPost('/v2/bot/query', {
      query:      userQuery,
      env:        'release',
      session_id: session_id || `web_${Date.now()}`,
      appid:      APPID,
    }, true);

    if (queryResult?.code === 0) {
      // 微信对话返回格式：data.answer 或 data.response 或 data.msg_list[0].content
      const answer =
        queryResult?.data?.answer ||
        queryResult?.data?.response ||
        queryResult?.data?.text ||
        (queryResult?.data?.msg_list?.[0]?.content) ||
        '感谢您的咨询！如需购买TikTok账号或了解GEO服务，请添加微信：SFTKTKTK';

      return res.status(200).json({ reply: answer, session_id, ok: true });
    }

    // 非 0 code，返回原始错误（调试用）或兜底
    console.error('[wx] query non-zero code:', queryResult);
    if (DEBUG) {
      return res.status(200).json({ reply: JSON.stringify(queryResult), debug: true });
    }
    return res.status(200).json({
      reply: '抱歉，智能助手暂时无法回答，请联系微信：SFTKTKTK 或 Telegram：@TRXBGB',
    });

  } catch (e: any) {
    tokenError = e?.message || String(e);
    console.error('[wx] error:', tokenError);
    if (DEBUG) {
      return res.status(200).json({ reply: '[DEBUG] ' + tokenError, queryResult });
    }
    return res.status(200).json({
      reply: '网络繁忙，请稍后再试，或直接联系微信：SFTKTKTK / Telegram：@TRXBGB',
    });
  }
}
