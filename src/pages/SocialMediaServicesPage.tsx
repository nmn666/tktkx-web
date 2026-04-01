import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import {
  MessageSquare,
  Home,
  ShoppingBag,
  Gift,
  BookOpen,
  HelpCircle,
  FileText,
  CreditCard,
  User,
  LayoutGrid,
  DollarSign,
  Navigation,
  HeadphonesIcon,
  LogOut,
  CheckCircle,
  Phone,
  Globe
} from 'lucide-react';

// 功能导航菜单
const navItems = [
  { icon: Home, label: '首页', path: '/' },
  { icon: MessageSquare, label: '海外社媒服务', path: '/social-media-services', active: true },
  { icon: ShoppingBag, label: '跨境商城', path: '#' },
  { icon: LayoutGrid, label: 'Tiktok商城', path: '/tiktok-market' },
  { icon: ShoppingBag, label: 'Tiktok账号', path: '/tiktok-market' },
  { icon: Gift, label: 'Tk自然流账号', path: '#' },
  { icon: Phone, label: '长效手机接码', path: '#' },
  { icon: CreditCard, label: '账号充值', path: '#' },
  { icon: DollarSign, label: '推广赚钱', path: '#' },
  { icon: Navigation, label: '开通分站', path: '#' },
  { icon: Globe, label: '资源导航', path: '#' },
  { icon: BookOpen, label: '使用必读', path: '#' },
  { icon: HelpCircle, label: '常见问题', path: '/tk-account-purchase' },
  { icon: FileText, label: '订单记录', path: '#' },
];

// 社交媒体平台数据
const platforms = [
  { id: 'vkontakte', name: 'VKontakte', icon: '🔷', bg: 'bg-blue-500' },
  { id: 'gmail', name: 'GMail', icon: '📧', bg: 'bg-red-500' },
  { id: 'twitter', name: 'Twitter', icon: '🐦', bg: 'bg-sky-500' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', bg: 'bg-black' },
  { id: 'lnkdn', name: 'Lnkdn', icon: '💼', bg: 'bg-blue-700' },
  { id: 'telegram', name: 'Telegram', icon: '✈️', bg: 'bg-sky-400' },
  { id: 'ok', name: 'OK', icon: '🟠', bg: 'bg-orange-500' },
  { id: 'odnoklassniki', name: 'Odnoklassniki', icon: '🤝', bg: 'bg-orange-600' },
  { id: 'reddit', name: 'Reddit', icon: '🔴', bg: 'bg-orange-700' },
  { id: 'social-networks', name: 'Social Networks', icon: '🌐', bg: 'bg-gray-600' },
  { id: 'other-email', name: 'Other Email', icon: '📬', bg: 'bg-purple-500' },
  { id: 'game-accounts', name: 'Game Accounts', icon: '🎮', bg: 'bg-green-600' },
];

// TikTok服务类型
const tikTokServices = [
  {
    id: 1,
    code: '4837',
    name: 'TikTok 粉丝 | 带头像粉 | 24小时内启动 | 无任何售后',
    price: 6.2634
  },
  {
    id: 2,
    code: '4838',
    name: 'TikTok 点赞 | 高质量 | 30分钟内启动 | 3天售后',
    price: 8.5421
  },
  {
    id: 3,
    code: '4839',
    name: 'TikTok 播放量 | 真实播放 | 即时启动 | 无售后',
    price: 3.2156
  },
  {
    id: 4,
    code: '4840',
    name: 'TikTok 评论 | 中文评论 | 1小时内启动 | 7天售后',
    price: 12.8543
  },
  {
    id: 5,
    code: '4841',
    name: 'TikTok 分享 | 真实分享 | 2小时内启动 | 3天售后',
    price: 15.3287
  },
];

export default function SocialMediaServicesPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [selectedCategory, setSelectedCategory] = useState('TikTok - 粉丝');
  const [selectedService, setSelectedService] = useState(tikTokServices[0]);
  const [links, setLinks] = useState('');
  const [agreed, setAgreed] = useState(false);

  // 计算总价（按链接数量计算）
  const linkList = links.split('\n').filter(link => link.trim());
  const totalPrice = (linkList.length * selectedService.price).toFixed(4);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* 页面头部 */}
      <div className="bg-blue-600 text-white py-3 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
                速锋科技
              </Link>
              <p className="text-blue-100 text-sm hidden md:block">速锋科技，致力于跨境电商产业增长</p>
            </div>
            
            {/* 登录/注册按钮或用户信息 */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="hidden sm:flex items-center text-white hover:text-blue-200 font-medium transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-5 py-2 rounded-lg font-medium flex items-center hover:bg-blue-50 transition-colors"
                >
                  注册
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-white bg-blue-700 px-4 py-2 rounded-lg">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-lg hover:bg-blue-700"
                  title="退出登录"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline">退出</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* 左侧功能导航栏 */}
          <div className="w-48 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-2 sticky top-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.path !== '#' && navigate(item.path)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${
                    item.active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
              
              {/* 底部客服按钮 */}
              <button className="w-full flex items-center justify-center px-3 py-3 rounded-lg text-sm font-medium mt-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <HeadphonesIcon className="h-4 w-4 mr-2" />
                订单售后客服
              </button>
            </div>
          </div>

          {/* 中间平台选择区 */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              {/* 平台列表 */}
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                      selectedPlatform.id === platform.id
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${platform.bg} flex items-center justify-center text-white text-xl mr-3`}>
                      {platform.icon}
                    </div>
                    <span className="font-medium text-gray-900">{platform.name}</span>
                    {selectedPlatform.id === platform.id && (
                      <div className="ml-auto">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧下单表单区 */}
          <div className="w-96 flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                {/* 标题 */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">社媒服务下单</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    批量下单
                  </button>
                </div>

                {/* 表单 */}
                <div className="space-y-4">
                  {/* 类别选择 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      *类别
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="TikTok - 粉丝">TikTok - 粉丝</option>
                      <option value="TikTok - 点赞">TikTok - 点赞</option>
                      <option value="TikTok - 播放">TikTok - 播放</option>
                      <option value="TikTok - 评论">TikTok - 评论</option>
                      <option value="TikTok - 分享">TikTok - 分享</option>
                    </select>
                  </div>

                  {/* 服务选择 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      *服务
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectedService.id}
                        onChange={(e) => {
                          const service = tikTokServices.find(s => s.id === parseInt(e.target.value));
                          if (service) setSelectedService(service);
                        }}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {tikTokServices.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.code} - 🟢 {service.name}
                          </option>
                        ))}
                      </select>
                      <button className="text-sm text-blue-600 hover:text-blue-700 whitespace-nowrap px-2">
                        更多筛选
                      </button>
                    </div>
                  </div>

                  {/* 链接输入 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      *链接
                    </label>
                    <textarea
                      value={links}
                      onChange={(e) => setLinks(e.target.value)}
                      placeholder="一行一个 支持多链接"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-y"
                    />
                  </div>

                  {/* 协议勾选 */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreement"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="agreement" className="ml-2 text-sm text-gray-600 leading-relaxed">
                      我确定已填好订单信息!并了解下单须知
                    </label>
                  </div>

                  {/* 总金额和下单 */}
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">总金额</span>
                      <span className="text-2xl font-bold text-blue-600">¥{totalPrice}</span>
                    </div>
                    <button
                      disabled={!agreed || linkList.length === 0}
                      onClick={() => {
                        if (agreed && linkList.length > 0) {
                          alert(`下单成功！\n平台：${selectedPlatform.name}\n服务：${selectedService.name}\n链接数：${linkList.length}\n总金额：¥${totalPrice}`);
                        }
                      }}
                      className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                        agreed && linkList.length > 0
                          ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      立即下单
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
