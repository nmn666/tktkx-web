import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { 
  User, 
  Phone, 
  MessageSquare, 
  Briefcase, 
  Star,
  Send,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// 表单数据类型
interface FormData {
  name: string;
  wechat: string;
  phone: string;
  experience: string;
  specialties: string;
  additionalInfo: string;
}

export default function CoachingApplicationPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    wechat: '',
    phone: '',
    experience: '',
    specialties: '',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名';
    }

    if (!formData.wechat.trim()) {
      newErrors.wechat = '请输入微信号';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '请输入联系电话';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = '请输入工作经验';
    }

    if (!formData.specialties.trim()) {
      newErrors.specialties = '请输入经验特长';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除该字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 保存到 Supabase 数据库（永久存储）
      const { getSupabaseClient } = await import('@/storage/database/supabase-client');
      const client = getSupabaseClient();

      const { data, error } = await client
        .from('coaching_applications')
        .insert({
          userId: isAuthenticated ? 'user_' + Date.now() : 'guest_' + Date.now(),
          name: formData.name,
          wechat: formData.wechat,
          phone: formData.phone,
          experience: formData.experience,
          specialties: formData.specialties,
          additionalInfo: formData.additionalInfo,
          status: 'pending',
        })
        .select();

      if (error) {
        console.error('Supabase 插入错误:', error);
        throw new Error(`数据库错误: ${error.message}`);
      }

      if (!data || data.length === 0) {
        throw new Error('数据保存失败');
      }

      setSubmitted(true);

      // 3秒后跳转回首页
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error: any) {
      console.error('提交失败:', error);
      const errorMessage = error.message || '请检查网络连接后重试';
      alert(`提交失败：${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 返回按钮 */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          返回首页
        </Link>

        {/* 提交成功提示 */}
        {submitted ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">提交成功！</h2>
            <p className="text-gray-600 mb-2">您的陪跑申请已成功提交</p>
            <p className="text-gray-500 text-sm">我们的团队会尽快与您联系，请保持电话畅通</p>
            <p className="text-gray-400 text-sm mt-4">3秒后自动返回首页...</p>
          </div>
        ) : (
          /* 表单 */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* 头部 */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-6">
              <h1 className="text-3xl font-bold text-white mb-2">开始陪跑计划</h1>
              <p className="text-pink-100">
                填写您的信息，我们的专业团队将为您提供一对一陪跑服务
              </p>
            </div>

            {/* 表单内容 */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 姓名 */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 mr-2 text-pink-500" />
                    姓名 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="请输入您的真实姓名"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 微信号 */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="h-4 w-4 mr-2 text-pink-500" />
                    微信号 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.wechat}
                    onChange={(e) => handleChange('wechat', e.target.value)}
                    placeholder="请输入您的微信号"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                      errors.wechat ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.wechat && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.wechat}
                    </p>
                  )}
                </div>

                {/* 电话 */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 mr-2 text-pink-500" />
                    联系电话 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="请输入您的手机号码"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* 工作经验 */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="h-4 w-4 mr-2 text-pink-500" />
                    工作经验 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    placeholder="请简单描述您的工作经历（例如：从事跨境电商3年，运营过TikTok账号等）"
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* 经验特长 */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Star className="h-4 w-4 mr-2 text-pink-500" />
                    经验特长 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    value={formData.specialties}
                    onChange={(e) => handleChange('specialties', e.target.value)}
                    placeholder="请描述您的特长和优势（例如：视频剪辑、直播带货、数据分析、内容策划等）"
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none ${
                      errors.specialties ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.specialties && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.specialties}
                    </p>
                  )}
                </div>

                {/* 其他信息 */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-400" />
                    其他信息（选填）
                  </label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange('additionalInfo', e.target.value)}
                    placeholder="如果您还有其他想要说明的信息，请在这里填写"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* 提交按钮 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      提交中...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      提交申请
                      <Send className="h-5 w-5 ml-2" />
                    </span>
                  )}
                </button>
              </form>

              {/* 底部提示 */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    提交后，我们的专业团队会在1-3个工作日内与您联系，为您提供个性化的陪跑方案。请保持电话畅通，注意查收微信消息。
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
