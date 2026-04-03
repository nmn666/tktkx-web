import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { supabase } from '@/storage/database/supabase-client';
import {
  Users,
  Search,
  RefreshCw,
  LogOut,
  ArrowLeft,
  Calendar,
  Mail,
  User,
  ShieldAlert,
  Download,
} from 'lucide-react';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers]       = useState<UserProfile[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [error, setError]       = useState('');

  // 权限检查：非管理员踢出
  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (!user.isAdmin) { navigate('/'); return; }
  }, [user, navigate]);

  // 加载用户列表
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase
      .from('user_profiles')
      .select('id, username, email, created_at')
      .order('created_at', { ascending: false });

    if (err) {
      setError('加载失败：' + err.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.isAdmin) fetchUsers();
  }, [user]);

  // 搜索过滤
  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 导出 CSV
  const exportCSV = () => {
    const rows = [
      ['用户名', '邮箱', '注册时间'],
      ...filtered.map(u => [u.username, u.email, new Date(u.created_at).toLocaleString('zh-CN')]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `用户列表_${new Date().toLocaleDateString('zh-CN')}.csv`;
    a.click();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* 顶栏 */}
      <header className="bg-[#1a56db] text-white py-3 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center hover:text-blue-200 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="text-sm">返回网站</span>
          </Link>
          <div className="w-[1px] h-4 bg-blue-400" />
          <div className="flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            <span className="font-bold text-lg">速锋科技 · 管理后台</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-blue-200">管理员：{user.username}</span>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all"
          >
            <LogOut className="h-4 w-4 mr-1" /> 退出
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto py-8 px-4">
        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: '注册用户总数', value: users.length, icon: Users, color: 'text-blue-600 bg-blue-50' },
            { label: '今日注册', value: users.filter(u => new Date(u.created_at).toDateString() === new Date().toDateString()).length, icon: Calendar, color: 'text-green-600 bg-green-50' },
            { label: '搜索结果', value: filtered.length, icon: Search, color: 'text-purple-600 bg-purple-50' },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#eef1f6] shadow-sm p-5 flex items-center">
              <div className={`p-3 rounded-xl mr-4 ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 用户列表卡片 */}
        <div className="bg-white rounded-xl border border-[#eef1f6] shadow-sm">
          {/* 工具栏 */}
          <div className="p-5 border-b border-[#f0f2f5] flex items-center justify-between">
            <h2 className="font-bold text-gray-800 flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#1a56db]" /> 注册用户列表
            </h2>
            <div className="flex items-center space-x-3">
              {/* 搜索框 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="搜索用户名或邮箱…"
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 w-52"
                />
              </div>
              {/* 刷新 */}
              <button
                onClick={fetchUsers}
                disabled={loading}
                className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-all disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} /> 刷新
              </button>
              {/* 导出 CSV */}
              <button
                onClick={exportCSV}
                className="flex items-center text-sm bg-[#1a56db] text-white hover:bg-[#154ec1] px-3 py-2 rounded-lg transition-all"
              >
                <Download className="h-4 w-4 mr-1" /> 导出CSV
              </button>
            </div>
          </div>

          {/* 表格 */}
          <div className="overflow-x-auto">
            {error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : loading ? (
              <div className="p-12 flex flex-col items-center text-gray-400">
                <RefreshCw className="h-8 w-8 animate-spin mb-3" />
                <span>加载中…</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p>{search ? '没有找到匹配的用户' : '暂无注册用户'}</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-[#f0f2f5]">
                    <th className="text-left px-5 py-3 text-gray-500 font-medium">#</th>
                    <th className="text-left px-5 py-3 text-gray-500 font-medium">
                      <span className="flex items-center"><User className="h-4 w-4 mr-1.5" />用户名</span>
                    </th>
                    <th className="text-left px-5 py-3 text-gray-500 font-medium">
                      <span className="flex items-center"><Mail className="h-4 w-4 mr-1.5" />邮箱</span>
                    </th>
                    <th className="text-left px-5 py-3 text-gray-500 font-medium">
                      <span className="flex items-center"><Calendar className="h-4 w-4 mr-1.5" />注册时间</span>
                    </th>
                    <th className="text-left px-5 py-3 text-gray-500 font-medium">用户ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <tr key={u.id} className="border-b border-[#f5f7fa] hover:bg-[#fafbff] transition-colors">
                      <td className="px-5 py-3.5 text-gray-400">{i + 1}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                            {u.username.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">{u.username}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{u.email}</td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {new Date(u.created_at).toLocaleString('zh-CN', {
                          year: 'numeric', month: '2-digit', day: '2-digit',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-5 py-3.5 text-gray-300 text-xs font-mono truncate max-w-[120px]">
                        {u.id.slice(0, 8)}…
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 底部 */}
          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-[#f0f2f5] text-xs text-gray-400">
              共 {filtered.length} 条记录{search ? `（筛选自 ${users.length} 条）` : ''}
              &nbsp;·&nbsp;密码由 Supabase Auth bcrypt 加密，管理员不可查看明文密码
            </div>
          )}
        </div>

        {/* 安全说明 */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex items-start">
          <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-amber-600" />
          <div>
            <p className="font-semibold mb-1">密码安全说明</p>
            <p>所有用户密码均由 Supabase Auth 使用 <strong>bcrypt</strong> 哈希算法加密存储，任何人（包括管理员）均无法查看用户的明文密码。如需重置密码，可在 Supabase 控制台操作。</p>
          </div>
        </div>
      </main>
    </div>
  );
}
