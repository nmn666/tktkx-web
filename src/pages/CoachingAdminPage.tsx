import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { motion } from 'framer-motion';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import {
  User,
  Phone,
  MessageSquare,
  Briefcase,
  Star,
  Trash2,
  Download,
  Search,
  Filter,
  ArrowLeft,
  Eye,
  Calendar,
  FileText,
  Check,
  X,
  Clock,
  AlertCircle,
  Lock,
  LogOut
} from 'lucide-react';

// 申请数据类型
interface Application {
  id: number;
  userId: string;
  name: string;
  wechat: string;
  phone: string;
  experience: string;
  specialties: string;
  additionalInfo: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

// 注册用户数据类型
interface RegisteredUser {
  id: number;
  phone: string;
  email?: string;
  createdAt: string;
}

export default function CoachingAdminPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<RegisteredUser[]>([]);
  const [activeTab, setActiveTab] = useState<'applications' | 'users'>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // 管理员密码（实际项目中应该存储在后端或环境变量中）
  const ADMIN_PASSWORD = '2467296';

  // 检查管理员登录状态
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdminLoggedIn');
    setIsAdminLoggedIn(adminStatus === 'true');
  }, []);

  // 加载申请数据
  useEffect(() => {
    if (isAdminLoggedIn) {
      loadApplications();
      loadRegisteredUsers();
    }
  }, [isAdminLoggedIn]);

  // 筛选和搜索 - 陪跑计划申请
  useEffect(() => {
    if (activeTab !== 'applications') return;

    let filtered = applications;

    // 状态筛选
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // 搜索筛选
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(term) ||
        app.phone.includes(term) ||
        app.wechat.toLowerCase().includes(term)
      );
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, activeTab]);

  // 筛选和搜索 - 注册用户
  useEffect(() => {
    if (activeTab !== 'users') return;

    let filtered = registeredUsers;

    // 搜索筛选
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.phone.includes(term) ||
        (user.email && user.email.toLowerCase().includes(term))
      );
    }

    setFilteredUsers(filtered);
  }, [registeredUsers, searchTerm, activeTab]);

  const loadApplications = () => {
    try {
      const client = getSupabaseClient();

      client
        .from('coaching_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            console.error('加载申请数据失败:', error);
          } else {
            const formattedData = data.map(app => ({
              ...app,
              id: app.id || Date.now(),
              createdAt: app.createdAt || new Date().toISOString(),
            }));
            setApplications(formattedData as Application[]);
          }
        });
    } catch (error) {
      console.error('加载申请数据失败:', error);
    }
  };

  const loadRegisteredUsers = () => {
    try {
      const client = getSupabaseClient();

      client
        .from('registered_users')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            console.error('加载用户数据失败:', error);
          } else {
            const formattedData = data.map(user => ({
              ...user,
              id: user.id || Date.now(),
              createdAt: user.createdAt || new Date().toISOString(),
            }));
            setRegisteredUsers(formattedData as RegisteredUser[]);
          }
          setLoading(false);
        });
    } catch (error) {
      console.error('加载用户数据失败:', error);
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这条申请记录吗？')) {
      const client = getSupabaseClient();

      client
        .from('coaching_applications')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) {
            console.error('删除失败:', error);
            alert('删除失败');
          } else {
            // 重新加载数据
            loadApplications();
            alert('删除成功');
          }
        });
    }
  };

  const handleStatusChange = (id: number, newStatus: 'pending' | 'approved' | 'rejected') => {
    const client = getSupabaseClient();

    client
      .from('coaching_applications')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .then(({ error }) => {
        if (error) {
          console.error('更新状态失败:', error);
          alert('更新状态失败');
        } else {
          // 重新加载数据
          loadApplications();
          alert(`状态已更新为：${newStatus === 'approved' ? '已通过' : newStatus === 'rejected' ? '已拒绝' : '待处理'}`);
        }
      });
  };

  // 管理员登录
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
      setLoginError('');
      setLoading(true);
      loadApplications();
      loadRegisteredUsers();
    } else {
      setLoginError('密码错误，请重试');
    }
  };

  // 管理员登出
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
    setAdminPassword('');
    setApplications([]);
  };

  const handleExport = () => {
    if (activeTab === 'applications') {
      if (filteredApplications.length === 0) {
        alert('没有申请数据可导出');
        return;
      }

      // 生成 CSV - 陪跑计划申请
      const headers = ['序号', '姓名', '微信号', '电话', '工作经验', '经验特长', '其他信息', '申请时间', '状态'];
      const rows = filteredApplications.map((app, index) => [
        index + 1,
        app.name,
        app.wechat,
        app.phone,
        `"${app.experience.replace(/"/g, '""')}"`, // 处理逗号和引号
        `"${app.specialties.replace(/"/g, '""')}"`,
        `"${app.additionalInfo.replace(/"/g, '""')}"`,
        new Date(app.createdAt).toLocaleString('zh-CN'),
        app.status === 'approved' ? '已通过' : app.status === 'rejected' ? '已拒绝' : '待处理'
      ]);

      const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

      // 下载文件
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `陪跑申请_${new Date().toLocaleDateString('zh-CN')}.csv`;
      link.click();
    } else {
      if (filteredUsers.length === 0) {
        alert('没有用户数据可导出');
        return;
      }

      // 生成 CSV - 注册用户
      const headers = ['序号', '手机号', '邮箱', '注册时间'];
      const rows = filteredUsers.map((user, index) => [
        index + 1,
        user.phone,
        user.email || '',
        new Date(user.createdAt).toLocaleString('zh-CN')
      ]);

      const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

      // 下载文件
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `注册用户_${new Date().toLocaleDateString('zh-CN')}.csv`;
      link.click();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            已通过
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" />
            已拒绝
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            待处理
          </span>
        );
    }
  };

  // 管理员登录页面
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">服务中心</h2>
            <p className="text-gray-600">请输入管理员密码以继续</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                管理员密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入密码"
                  autoFocus
                />
              </div>
              {loginError && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {loginError}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              进入服务中心
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回首页
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FileText className="h-6 w-6 mr-2 text-blue-600" />
                服务中心
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExport}
                disabled={
                  activeTab === 'applications' ? filteredApplications.length === 0 : filteredUsers.length === 0
                }
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                导出数据
              </button>
              <button
                onClick={handleAdminLogout}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                退出
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 选项卡切换 */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => {
                setActiveTab('applications');
                setSearchTerm('');
              }}
              className={`flex-1 px-6 py-4 font-medium text-center transition-colors ${
                activeTab === 'applications'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="h-5 w-5 inline mr-2" />
              陪跑计划申请
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
                {applications.length}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab('users');
                setSearchTerm('');
              }}
              className={`flex-1 px-6 py-4 font-medium text-center transition-colors ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="h-5 w-5 inline mr-2" />
              注册用户
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-xs">
                {registeredUsers.length}
              </span>
            </button>
          </div>
        </div>

        {/* 统计卡片 */}
        {activeTab === 'applications' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">总申请数</div>
              <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">待处理</div>
              <div className="text-2xl font-bold text-yellow-600">
                {applications.filter(a => a.status === 'pending').length}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">已通过</div>
              <div className="text-2xl font-bold text-green-600">
                {applications.filter(a => a.status === 'approved').length}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">已拒绝</div>
              <div className="text-2xl font-bold text-red-600">
                {applications.filter(a => a.status === 'rejected').length}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">总用户数</div>
              <div className="text-2xl font-bold text-gray-900">{registeredUsers.length}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">今日新增</div>
              <div className="text-2xl font-bold text-blue-600">
                {registeredUsers.filter(u => {
                  const today = new Date().toDateString();
                  return new Date(u.createdAt).toDateString() === today;
                }).length}
              </div>
            </div>
          </div>
        )}

        {/* 筛选和搜索 */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'applications' ? "搜索姓名、电话、微信号..." : "搜索手机号、邮箱..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {activeTab === 'applications' && (
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">全部状态</option>
                  <option value="pending">待处理</option>
                  <option value="approved">已通过</option>
                  <option value="rejected">已拒绝</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 列表 */}
        {activeTab === 'applications' ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">加载中...</div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">暂无申请记录</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        序号
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        姓名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        联系方式
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        申请时间
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplications.map((app, index) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{app.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center mb-1">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {app.phone}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1 text-gray-400" />
                              {app.wechat}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                            {formatDate(app.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(app.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedApplication(app)}
                              className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                              title="查看详情"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(app.id, 'approved')}
                              className="text-green-600 hover:text-green-900 inline-flex items-center"
                              title="通过"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(app.id, 'rejected')}
                              className="text-red-600 hover:text-red-900 inline-flex items-center"
                              title="拒绝"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="text-red-600 hover:text-red-900 inline-flex items-center ml-2"
                              title="删除"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">加载中...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">暂无注册用户</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        序号
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        手机号
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        邮箱
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        注册时间
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="text-sm font-medium text-gray-900">{user.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                            {formatDate(user.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                if (window.confirm('确定要删除该用户记录吗？')) {
                                  const client = getSupabaseClient();

                                  client
                                    .from('registered_users')
                                    .delete()
                                    .eq('id', user.id)
                                    .then(({ error }) => {
                                      if (error) {
                                        console.error('删除失败:', error);
                                        alert('删除失败');
                                      } else {
                                        // 重新加载数据
                                        loadRegisteredUsers();
                                        alert('删除成功');
                                      }
                                    });
                                }
                              }}
                              className="text-red-600 hover:text-red-900 inline-flex items-center"
                              title="删除"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 详情弹窗 */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">申请详情</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">姓名</label>
                    <p className="text-lg font-medium text-gray-900">{selectedApplication.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">申请时间</label>
                    <p className="text-gray-900">{formatDate(selectedApplication.createdAt)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">微信号</label>
                    <p className="text-gray-900 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedApplication.wechat}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">联系电话</label>
                    <p className="text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedApplication.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    工作经验
                  </label>
                  <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedApplication.experience}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    经验特长
                  </label>
                  <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedApplication.specialties}
                  </p>
                </div>

                {selectedApplication.additionalInfo && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      其他信息
                    </label>
                    <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedApplication.additionalInfo}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">当前状态</label>
                  <div className="mt-2">{getStatusBadge(selectedApplication.status)}</div>
                </div>

                {/* 状态操作 */}
                <div className="border-t pt-4">
                  <label className="text-sm font-medium text-gray-500 block mb-2">更新状态</label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        handleStatusChange(selectedApplication.id, 'approved');
                        setSelectedApplication(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      通过申请
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedApplication.id, 'rejected');
                        setSelectedApplication(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      拒绝申请
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
