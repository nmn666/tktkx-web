import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!
);

const ADMIN_SECRET = (process.env.ADMIN_SECRET_KEY || 'tktkx_admin_888').trim();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 基础身份验证 (同时支持 Header 和 Query 参数作为备选)
  const adminKey = (req.headers['x-admin-key'] as string || req.query.key as string || '').trim();
  
  if (adminKey !== ADMIN_SECRET) {
    return res.status(401).json({ 
      error: 'Unauthorized: Invalid Admin Key',
      debug: {
        receivedLength: adminKey.length,
        expectedLength: ADMIN_SECRET.length,
        method: req.method
      }
    });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
        if (error) throw error;
        return res.status(200).json(data);
      }

      case 'POST': {
        const product = req.body;
        const { data, error } = await supabase.from('products').insert([product]).select();
        if (error) throw error;
        return res.status(201).json(data[0]);
      }

      case 'PUT': {
        const { id, ...updates } = req.body;
        const { data, error } = await supabase.from('products').update(updates).eq('id', id).select();
        if (error) throw error;
        return res.status(200).json(data[0]);
      }

      case 'DELETE': {
        const { id } = req.query;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error: any) {
    console.error('[Admin API] Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
