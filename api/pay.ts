import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

/**
 * 易支付 (EasyPay) 配置文件
 * 建议在 Vercel 控制台设置环境变量：EPAY_PID, EPAY_KEY, EPAY_API_URL
 */
const EPAY_CONFIG = {
  pid: process.env.EPAY_PID || '1000', // 商户ID
  key: process.env.EPAY_KEY || 'default_key', // 商户密钥
  api_url: process.env.EPAY_API_URL || 'https://pay.v8p.xyz/submit.php', // 易支付网关地址
  notify_url: process.env.EPAY_NOTIFY_URL || 'https://www.tktkx.cn/api/pay/notify', // 异步通知地址
  return_url: process.env.EPAY_RETURN_URL || 'https://www.tktkx.cn/tiktok-market?pay=success', // 支付成功跳转地址
};

function md5(str: string): string {
  return crypto.createHash('md5').update(str).digest('hex');
}

/**
 * 生成签名
 */
function generateSign(params: Record<string, string>, key: string): string {
  const sortedKeys = Object.keys(params).filter(k => k !== 'sign' && k !== 'sign_type' && params[k] !== '').sort();
  const signStr = sortedKeys.map(k => `${k}=${params[k]}`).join('&') + key;
  return md5(signStr);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 处理跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { name, money, type = 'alipay' } = req.body;

    if (!name || !money) {
      return res.status(400).json({ error: '缺少必要参数 (name, money)' });
    }

    const out_trade_no = `TK${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // 构建支付参数
    const params: Record<string, string> = {
      pid: EPAY_CONFIG.pid,
      type: type, // alipay, wxpay, qqpay 等
      out_trade_no: out_trade_no,
      notify_url: EPAY_CONFIG.notify_url,
      return_url: EPAY_CONFIG.return_url,
      name: name,
      money: String(money),
    };

    // 生成签名
    params.sign = generateSign(params, EPAY_CONFIG.key);
    params.sign_type = 'MD5';

    // 构建跳转 URL (GET 方式跳转)
    const queryString = new URLSearchParams(params).toString();
    const payUrl = `${EPAY_CONFIG.api_url}?${queryString}`;

    console.log(`[Pay] Created Order: ${out_trade_no}, Amount: ${money}, URL: ${payUrl}`);

    return res.status(200).json({
      ok: true,
      pay_url: payUrl,
      order_id: out_trade_no
    });

  } catch (error: any) {
    console.error('[Pay] Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
