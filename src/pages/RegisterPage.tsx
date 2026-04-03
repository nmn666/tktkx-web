import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPwd, setShowPwd]            = useState(false);
  const [showConfirm, setShowConfirm]    = useState(false);
  const [errors, setErrors]              = useState<Record<string, string>>({});
  const [loading, setLoading]            = useState(false);
  const [success, setSuccess]            = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  // 密码强度
  const getStrength = () => {
    const p = form.password;
    if (!p) return { level: 0, text: '', color: '' };
    let score = 0;
    if (p.length >= 6)  score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 2) return { level: 1, text: '弱', color: 'bg-red-500' };
    if (score <= 3) return { level: 2, text: '中', color: 'bg-yellow-500' };
    return { level: 3, text: '强', color: 'bg-green-500' };
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.username || form.username.length < 2) e.username = '用户名至少2个字符';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = '请输入有效邮箱';
    if (!form.password || form.password.length < 6) e.password = '密码至少6位';
    if (form.password !== form.confirmPassword) e.confirmPassword = '两次密码不一致';
    if (!form.agreeTerms) e.agreeTerms = '请同意服务条款';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { error } = await register(form.username, form.email, form.password);
    setLoading(false);

    if (error) return setErrors({ submit: error });

    setSuccess(true);
    setTimeout(() => navigate('/'), 2000);
  };

  const strength = getStrength();

  // ── 注册成功提示 ──
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-sm w-full">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">注册成功！</h2>
          <p className="text-gray-500">正在跳转到首页…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-pink-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-white hover:text-purple-200 mb-6 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-1" /> 返回首页
        </Link>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <span className="text-3xl">🛍️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">创建账号</h1>
          <p className="text-purple-100">加入速锋科技，开启跨境之旅</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* 用户名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                用户名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="请输入用户名（昵称）"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${errors.username ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errors.username && <p className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="h-3.5 w-3.5 mr-1" />{errors.username}</p>}
            </div>

            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                邮箱 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="请输入邮箱"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="h-3.5 w-3.5 mr-1" />{errors.email}</p>}
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                密码 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="至少6位，建议字母+数字"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {/* 强度条 */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">密码强度</span>
                    <span className={strength.level === 1 ? 'text-red-500' : strength.level === 2 ? 'text-yellow-500' : 'text-green-500'}>{strength.text}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(l => (
                      <div key={l} className={`h-1.5 flex-1 rounded-full ${strength.level >= l ? strength.color : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="h-3.5 w-3.5 mr-1" />{errors.password}</p>}
            </div>

            {/* 确认密码 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                确认密码 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="请再次输入密码"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="h-3.5 w-3.5 mr-1" />{errors.confirmPassword}</p>}
            </div>

            {/* 服务条款 */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded cursor-pointer"
              />
              <label className="ml-2 text-sm text-gray-600 cursor-pointer">
                我已阅读并同意{' '}
                <Link to="/terms-of-service" target="_blank" className="text-purple-600 hover:underline font-medium">服务条款</Link>
                {' '}和{' '}
                <Link to="/privacy-policy" target="_blank" className="text-purple-600 hover:underline font-medium">隐私政策</Link>
              </label>
            </div>
            {errors.agreeTerms && <p className="text-xs text-red-600 flex items-center"><AlertCircle className="h-3.5 w-3.5 mr-1" />{errors.agreeTerms}</p>}

            {/* 提交错误 */}
            {errors.submit && (
              <div className="flex items-center text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />{errors.submit}
              </div>
            )}

            {/* 注册按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : '立即注册'}
            </button>

            <p className="text-center text-sm text-gray-500">
              已有账号？{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">立即登录</Link>
            </p>
          </form>
        </div>

        <p className="text-center mt-4 text-xs text-purple-100">密码采用加密存储，速锋科技不会明文保存您的密码</p>
      </div>
    </div>
  );
}
