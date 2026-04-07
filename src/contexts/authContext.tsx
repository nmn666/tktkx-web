import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── 类型 ─────────────────────────────────────────────────
interface AuthUser {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;  // 简单 hash，防止明文存储
  createdAt: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (username: string, email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => void;
  setIsAuthenticated: (v: boolean) => void;
}

// ─── 管理员邮箱 ───────────────────────────────────────────
const ADMIN_EMAILS = ['admin@tktkx.cn', '58734099@qq.com'];
const USERS_KEY = 'tktkx_users';
const SESSION_KEY = 'tktkx_session';

// ─── 简单密码 hash（非明文存储） ──────────────────────────
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36) + str.length.toString(36);
}

// ─── 用户存储操作 ─────────────────────────────────────────
function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch { return []; }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): AuthUser | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch { return null; }
}

function saveSession(user: AuthUser | null) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

// ─── Context ─────────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: false,
  login: async () => ({ error: null }),
  register: async () => ({ error: null }),
  logout: () => {},
  setIsAuthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 初始化：读取本地 session
  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
    setLoading(false);
  }, []);

  // ── 登录 ──
  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    const users = getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { error: '该邮箱未注册，请先注册' };
    if (found.passwordHash !== simpleHash(password)) return { error: '密码错误' };

    const authUser: AuthUser = {
      id: found.id,
      username: found.username,
      email: found.email,
      isAdmin: ADMIN_EMAILS.includes(found.email.toLowerCase()),
    };
    setUser(authUser);
    saveSession(authUser);
    return { error: null };
  };

  // ── 注册 ──
  const register = async (username: string, email: string, password: string): Promise<{ error: string | null }> => {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: '该邮箱已被注册' };
    }

    const newUser: StoredUser = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      username,
      email,
      passwordHash: simpleHash(password),
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);

    // 注册后自动登录
    const authUser: AuthUser = {
      id: newUser.id,
      username,
      email,
      isAdmin: ADMIN_EMAILS.includes(email.toLowerCase()),
    };
    setUser(authUser);
    saveSession(authUser);
    return { error: null };
  };

  // ── 登出 ──
  const logout = () => {
    setUser(null);
    saveSession(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      user,
      loading,
      login,
      register,
      logout,
      setIsAuthenticated: () => {},
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
