import { createClient } from '@supabase/supabase-js';

// 使用 Vite 的环境变量注入方式 (用于前端)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
