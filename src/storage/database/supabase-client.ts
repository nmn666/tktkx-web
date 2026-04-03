import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 支持 Vercel 环境变量 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
// 同时兼容旧的 COZE_ 前缀变量
function getCredentials() {
  const url =
    (import.meta as any).env?.VITE_SUPABASE_URL ||
    (globalThis as any).COZE_SUPABASE_URL ||
    (import.meta as any).env?.VITE_COZE_SUPABASE_URL;

  const anonKey =
    (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
    (globalThis as any).COZE_SUPABASE_ANON_KEY ||
    (import.meta as any).env?.VITE_COZE_SUPABASE_ANON_KEY;

  return { url, anonKey };
}

let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;

  const { url, anonKey } = getCredentials();

  if (!url || !anonKey) {
    console.warn('Supabase 环境变量未配置，部分功能不可用');
    // 返回占位客户端，防止页面崩溃
    _client = createClient('https://placeholder.supabase.co', 'placeholder-anon-key');
    return _client;
  }

  _client = createClient(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  return _client;
}

export const supabase = getSupabaseClient();
