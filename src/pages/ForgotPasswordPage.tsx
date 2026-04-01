import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Lock, 
  Phone,
  Mail,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'input' | 'verify' | 'reset' | 'success'>('input');
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 发送验证码
  const handleSendCode = async () => {
    if (!formData.phone) {
      setErrors({ phone: '请输入手机号' });
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      setErrors({ phone: '请输入正确的手机号格式' });
      return;
    }

    setLoading(true);
    // 模拟发送验证码
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    
    // 开始倒计时
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    alert('测试验证码：123456\n\n（这是演示模式，真实环境中验证码会发送到您的手机）');
  };

  // 验证手机号和验证码
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone) {
      setErrors({ phone: '请输入手机号' });
      return;
    }

    if (!formData.code) {
      setErrors({ code: '请输入验证码' });
      return;
    }

    setLoading(true);
    // 模拟验证
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    // 这里应该调用API验证手机号和验证码
    // 模拟验证成功
    setStep('reset');
  };

  // 重置密码
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newErrors.newPassword = '请输入新密码';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = '密码至少6位';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认新密码';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // 模拟重置密码
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    setStep('success');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 清除该字段的错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBackToInput = () => {
    setStep('input');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 返回按钮 */}
        <Link
          to="/login"
          className="inline-flex items-center text-white hover:text-blue-200 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          返回登录
        </Link>

        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {step === 'success' ? '密码重置成功' : '找回密码'}
          </h1>
          <p className="text-blue-100">
            {step === 'input' && '请输入您注册时使用的手机号'}
            {step === 'verify' && '请输入发送到您手机的验证码'}
            {step === 'reset' && '请设置您的新密码'}
            {step === 'success' && '您现在可以使用新密码登录了'}
          </p>
        </div>

        {/* 表单卡片 */}
        {step !== 'success' ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {step === 'input' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                setStep('verify');
              }} className="space-y-6">
                {/* 手机号输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手机号
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="请输入注册时的手机号"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                    💡 测试模式：使用固定验证码 <strong>123456</strong>
                  </p>
                </div>

                {/* 邮箱输入（可选） */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱 <span className="text-gray-400">(选填)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="请输入注册时的邮箱（选填）"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* 提交按钮 */}
                <button
                  type="submit"
                  disabled={!formData.phone}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                    !formData.phone ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  下一步
                </button>
              </form>
            )}

            {step === 'verify' && (
              <form onSubmit={handleVerify} className="space-y-6">
                {/* 手机号显示 */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    验证码将发送到：<span className="font-semibold text-blue-600">{formData.phone}</span>
                  </p>
                  <button
                    type="button"
                    onClick={handleBackToInput}
                    className="text-sm text-blue-600 hover:text-blue-700 mt-2"
                  >
                    修改手机号
                  </button>
                </div>

                {/* 验证码输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    验证码
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      placeholder="请输入6位验证码"
                      maxLength={6}
                      className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.code ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={countdown > 0 || loading}
                      className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all ${
                        countdown > 0 || loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {countdown > 0 ? `${countdown}秒后重发` : loading ? '发送中...' : '获取验证码'}
                    </button>
                  </div>
                  {errors.code && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.code}
                    </p>
                  )}
                </div>

                {/* 提交按钮 */}
                <button
                  type="submit"
                  disabled={loading || !formData.code}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                    loading || !formData.code ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? '验证中...' : '验证'}
                </button>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={handleResetPassword} className="space-y-6">
                {/* 新密码输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    新密码
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="请输入新密码（至少6位）"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* 确认密码输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    确认新密码
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="请再次输入新密码"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* 提交按钮 */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? '重置中...' : '重置密码'}
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">密码重置成功！</h2>
            <p className="text-gray-600 mb-6">
              您的密码已成功重置，现在可以使用新密码登录了。
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              返回登录
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
