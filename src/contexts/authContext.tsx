import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/storage/database/supabase-client';
import type { User, Session } from '@supabase/supabase-js';

// ─── 类型定义 ──────────────────────────────────────────────
interface AuthUser {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (username: string, email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  // 兼容旧代码（只传用户名的调用方式）
  setIsAuthenticated: (v: boolean) => void;
}

// ─── 管理员邮箱列表（在这里维护，不暴露到前端逻辑） ────────
const ADMIN_EMAILS = ['admin@tktkx.cn', '58734099@qq.com'];

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  session: null,
  loading: true,
  login: async () => ({ error: null }),
  register: async () => ({ error: null }),
  logout: async () => {},
  setIsAuthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

// ─── 从 Supabase User 提取 AuthUser ────────────────────────
function toAuthUser(supabaseUser: User): AuthUser {
  const meta = supabaseUser.user_metadata || {};
  return {
    id: supabaseUser.id,
    username: meta.username || supabaseUser.email?.split('@')[0] || '用户',
    email: supabaseUser.email || '',
    isAdmin: ADMIN_EMAILS.includes(supabaseUser.email || ''),
  };
}

// ─── Provider ──────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初始化：获取当前 session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setSession(data.session);
        setUser(toAuthUser(data.session.user));
      }
      setLoading(false);
    });

    // 监听 auth 状态变化
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (sess?.user) {
        setSession(sess);
        setUser(toAuthUser(sess.user));
      } else {
        setSession(null);
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // ── 登录（邮箱 + 密码） ──
  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes('Invalid login credentials')) return { error: '邮箱或密码错误' };
      if (error.message.includes('Email not confirmed')) return { error: '请先验证邮箱后再登录' };
      return { error: error.message };
    }
    return { error: null };
  };

  // ── 注册（用户名 + 邮箱 + 密码） ──
  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },          // 存入 user_metadata
        emailRedirectTo: undefined,  // 不发验证邮件（可后续开启）
      },
    });

    if (error) {
      if (error.message.includes('already registered')) return { error: '该邮箱已被注册' };
      return { error: error.message };
    }

    // 同时写入自定义 user_profiles 表（方便后台查看）
    if (data.user) {
      await supabase.from('user_profiles').upsert({
        id: data.user.id,
        username,
        email,
        created_at: new Date().toISOString(),
      });
    }

    return { error: null };
  };

  // ── 登出 ──
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        session,
        loading,
        login,
        register,
        logout,
        setIsAuthenticated: () => {},   // 兼容旧代码，无实际作用
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
