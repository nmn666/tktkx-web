import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { category } = req.query;

    let query = supabase.from('products').select('*').eq('is_active', true);
    
    // 如果指定了分类，进行筛选 (模糊匹配 region 字段)
    if (category && category !== 'all' && category !== 'hot') {
      query = query.ilike('region', `%${category}%`);
    }

    const { data, error } = await query.order('id', { ascending: true });

    if (error) throw error;

    return res.status(200).json(data);

  } catch (error: any) {
    console.error('[API Products] Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
