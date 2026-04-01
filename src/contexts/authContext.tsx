import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    username: string;
  } | null;
  login: (username: string) => void;
  register: (username: string) => void;
  logout: () => void;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  setIsAuthenticated: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    username: string;
  } | null>(null);

  // 从localStorage加载用户状态
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string) => {
    const userData = {
      username,
    };
    
    setIsAuthenticated(true);
    setUser(userData);
    
    // 保存到localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const register = async (username: string) => {
    const userData = {
      username,
    };
    
    setIsAuthenticated(true);
    setUser(userData);
    
    // 保存到localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));

    // 同时保存到 Supabase 数据库（用于服务中心查看）
    try {
      const { getSupabaseClient } = await import('@/storage/database/supabase-client');
      const client = getSupabaseClient();

      // 检查是否已存在该用户
      const { data: existingUser } = await client
        .from('registered_users')
        .select('username')
        .eq('username', username)
        .single();

      // 如果用户不存在，则插入新用户
      if (!existingUser) {
        await client
          .from('registered_users')
          .insert({
            username,
          });
      }
    } catch (error) {
      console.error('保存用户到数据库失败:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    // 清除localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
