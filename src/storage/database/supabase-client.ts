import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface SupabaseCredentials {
  url: string;
  anonKey: string;
}

// 使用 Vite 的环境变量
function getSupabaseCredentials(): SupabaseCredentials {
  // 优先从全局变量获取，其次从环境变量获取
  const url = (globalThis as any).COZE_SUPABASE_URL || (import.meta as any).env?.VITE_COZE_SUPABASE_URL || (import.meta as any).env?.COZE_SUPABASE_URL;
  const anonKey = (globalThis as any).COZE_SUPABASE_ANON_KEY || (import.meta as any).env?.VITE_COZE_SUPABASE_ANON_KEY || (import.meta as any).env?.COZE_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error('COZE_SUPABASE_URL is not set');
  }
  if (!anonKey) {
    throw new Error('COZE_SUPABASE_ANON_KEY is not set');
  }

  return { url, anonKey };
}

function getSupabaseClient(token?: string): SupabaseClient {
  try {
    const { url, anonKey } = getSupabaseCredentials();

    if (token) {
      return createClient(url, anonKey, {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
        db: {
          timeout: 60000,
        },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    }

    return createClient(url, anonKey, {
      db: {
        timeout: 60000,
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (error) {
    console.error('Supabase 客户端初始化失败:', error);
    // 返回一个模拟的客户端，避免页面崩溃
    return createClient('https://placeholder.supabase.co', 'placeholder-key') as any;
  }
}

export { getSupabaseClient };
