import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { useSEO } from '@/hooks/useSEO';
import {
  Minus,
  Plus,
  CheckCircle,
  Shield,
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
  Grid2x2,
  Phone,
  Globe,
  AlertTriangle
} from 'lucide-react';

// 功能导航菜单
const navItems = [
  { icon: Home, label: '首页', path: '/' },
  { icon: MessageSquare, label: '海外社媒服务', path: '/social-media-services' },
  { icon: ShoppingBag, label: '跨境商城', path: '#' },
  { icon: LayoutGrid, label: 'Tiktok商城', path: '/tiktok-market' },
  { icon: ShoppingBag, label: 'Tiktok账号', path: '/tiktok-market', active: true },
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

// 常用国家列表
const popularCountries = [
  { code: 'SA', name: '沙特', flagEmoji: '🇸🇦', dialCode: '+966' },
  { code: 'SE', name: '瑞典', flagEmoji: '🇸🇪', dialCode: '+46' },
  { code: 'CA', name: '加拿大', flagEmoji: '🇨🇦', dialCode: '+1' },
  { code: 'RU', name: '俄罗斯', flagEmoji: '🇷🇺', dialCode: '+7' },
  { code: 'NZ', name: '新西兰', flagEmoji: '🇳🇿', dialCode: '+64' },
  { code: 'UA', name: '乌克兰', flagEmoji: '🇺🇦', dialCode: '+380' },
  { code: 'TR', name: '土耳其', flagEmoji: '🇹🇷', dialCode: '+90' },
  { code: 'NL', name: '荷兰', flagEmoji: '🇳🇱', dialCode: '+31' },
  { code: 'FI', name: '芬兰', flagEmoji: '🇫🇮', dialCode: '+358' },
  { code: 'KH', name: '柬埔寨', flagEmoji: '🇰🇭', dialCode: '+855' },
  { code: 'IR', name: '伊朗', flagEmoji: '🇮🇷', dialCode: '+98' },
];

// 账号数据（按地区排序）
const accountTypes = [
  // 北美（3个）：美国、加拿大、墨西哥
  { id: 1, title: '美国-满月白号', region: 'US', tag: '邮箱号', price: 9.00, stock: 500 },
  { id: 2, title: '加拿大-满月白号', region: 'CA', tag: '邮箱号', price: 9.00, stock: 300 },
  { id: 3, title: '墨西哥-满月白号', region: 'MX', tag: '邮箱号', price: 9.00, stock: 250 },
  
  // 南美（11个）：阿根廷、玻利维亚、巴西、智利、哥伦比亚、哥斯达黎加、厄瓜多尔、危地马拉、秘鲁、乌拉圭、委内瑞拉
  { id: 4, title: '阿根廷-满月白号', region: 'AR', tag: '邮箱号', price: 9.00, stock: 200 },
  { id: 5, title: '玻利维亚-满月白号', region: 'BO', tag: '邮箱号', price: 9.00, stock: 60 },
  { id: 6, title: '巴西-满月白号', region: 'BR', tag: '邮箱号', price: 9.00, stock: 400 },
  { id: 7, title: '智利-满月白号', region: 'CL', tag: '邮箱号', price: 9.00, stock: 180 },
  { id: 8, title: '哥伦比亚-满月白号', region: 'CO', tag: '邮箱号', price: 9.00, stock: 200 },
  { id: 9, title: '哥斯达黎加-满月白号', region: 'CR', tag: '邮箱号', price: 9.00, stock: 90 },
  { id: 10, title: '厄瓜多尔-满月白号', region: 'EC', tag: '邮箱号', price: 9.00, stock: 100 },
  { id: 11, title: '危地马拉-满月白号', region: 'GT', tag: '邮箱号', price: 9.00, stock: 100 },
  { id: 12, title: '秘鲁-满月白号', region: 'PE', tag: '邮箱号', price: 9.00, stock: 150 },
  { id: 13, title: '乌拉圭-满月白号', region: 'UY', tag: '邮箱号', price: 9.00, stock: 60 },
  { id: 14, title: '委内瑞拉-满月白号', region: 'VE', tag: '邮箱号', price: 9.00, stock: 120 },
  
  // 欧洲（30个）：奥地利、比利时、保加利亚、克罗地亚、塞浦路斯、捷克、丹麦、爱沙尼亚、芬兰、法国、德国、希腊、匈牙利、爱尔兰、意大利、拉脱维亚、立陶宛、卢森堡、马耳他、荷兰、挪威、波兰、葡萄牙、罗马尼亚、斯洛伐克、斯洛文尼亚、西班牙、瑞典、瑞士、英国
  { id: 15, title: '奥地利-满月白号', region: 'AT', tag: '邮箱号', price: 9.00, stock: 120 },
  { id: 16, title: '比利时-满月白号', region: 'BE', tag: '邮箱号', price: 9.00, stock: 150 },
  { id: 17, title: '保加利亚-满月白号', region: 'BG', tag: '邮箱号', price: 9.00, stock: 90 },
  { id: 18, title: '克罗地亚-满月白号', region: 'HR', tag: '邮箱号', price: 9.00, stock: 80 },
  { id: 19, title: '塞浦路斯-满月白号', region: 'CY', tag: '邮箱号', price: 9.00, stock: 60 },
  { id: 20, title: '捷克-满月白号', region: 'CZ', tag: '邮箱号', price: 9.00, stock: 130 },
  { id: 21, title: '丹麦-满月白号', region: 'DK', tag: '邮箱号', price: 9.00, stock: 140 },
  { id: 22, title: '爱沙尼亚-满月白号', region: 'EE', tag: '邮箱号', price: 9.00, stock: 50 },
  { id: 23, title: '芬兰-满月白号', region: 'FI', tag: '邮箱号', price: 9.00, stock: 120 },
  { id: 24, title: '法国-满月白号', region: 'FR', tag: '邮箱号', price: 9.00, stock: 300 },
  { id: 25, title: '德国-满月白号', region: 'DE', tag: '邮箱号', price: 9.00, stock: 320 },
  { id: 26, title: '希腊-满月白号', region: 'GR', tag: '邮箱号', price: 9.00, stock: 140 },
  { id: 27, title: '匈牙利-满月白号', region: 'HU', tag: '邮箱号', price: 9.00, stock: 100 },
  { id: 28, title: '爱尔兰-满月白号', region: 'IE', tag: '邮箱号', price: 9.00, stock: 150 },
  { id: 29, title: '意大利-满月白号', region: 'IT', tag: '邮箱号', price: 9.00, stock: 280 },
  { id: 30, title: '拉脱维亚-满月白号', region: 'LV', tag: '邮箱号', price: 9.00, stock: 50 },
  { id: 31, title: '立陶宛-满月白号', region: 'LT', tag: '邮箱号', price: 9.00, stock: 60 },
  { id: 32, title: '卢森堡-满月白号', region: 'LU', tag: '邮箱号', price: 9.00, stock: 50 },
  { id: 33, title: '马耳他-满月白号', region: 'MT', tag: '邮箱号', price: 9.00, stock: 60 },
  { id: 34, title: '荷兰-满月白号', region: 'NL', tag: '邮箱号', price: 9.00, stock: 280 },
  { id: 35, title: '挪威-满月白号', region: 'NO', tag: '邮箱号', price: 9.00, stock: 130 },
  { id: 36, title: '波兰-满月白号', region: 'PL', tag: '邮箱号', price: 9.00, stock: 200 },
  { id: 37, title: '葡萄牙-满月白号', region: 'PT', tag: '邮箱号', price: 9.00, stock: 150 },
  { id: 38, title: '罗马尼亚-满月白号', region: 'RO', tag: '邮箱号', price: 9.00, stock: 150 },
  { id: 39, title: '斯洛伐克-满月白号', region: 'SK', tag: '邮箱号', price: 9.00, stock: 80 },
  { id: 40, title: '斯洛文尼亚-满月白号', region: 'SI', tag: '邮箱号', price: 9.00, stock: 60 },
  { id: 41, title: '西班牙-满月白号', region: 'ES', tag: '邮箱号', price: 9.00, stock: 260 },
  { id: 42, title: '瑞典-满月白号', region: 'SE', tag: '邮箱号', price: 9.00, stock: 160 },
  { id: 43, title: '瑞士-满月白号', region: 'CH', tag: '邮箱号', price: 9.00, stock: 180 },
  { id: 44, title: '英国-满月白号', region: 'GB', tag: '邮箱号', price: 9.00, stock: 350 },
  
  // 亚洲（25个）：巴林、孟加拉国、柬埔寨、印度尼西亚、以色列、日本、约旦、哈萨克斯坦、韩国、科威特、马来西亚、蒙古、缅甸、阿曼、巴基斯坦、菲律宾、卡塔尔、沙特阿拉伯、新加坡、斯里兰卡、中国台湾、泰国、土耳其、阿联酋、越南
  { id: 45, title: '巴林-满月白号', region: 'BH', tag: '邮箱号', price: 9.00, stock: 80 },
  { id: 46, title: '孟加拉国-满月白号', region: 'BD', tag: '邮箱号', price: 9.00, stock: 220 },
  { id: 47, title: '柬埔寨-满月白号', region: 'KH', tag: '邮箱号', price: 9.00, stock: 150 },
  { id: 48, title: '印度尼西亚-满月白号', region: 'ID', tag: '邮箱号', price: 9.00, stock: 450 },
  { id: 49, title: '以色列-满月白号', region: 'IL', tag: '邮箱号', price: 9.00, stock: 200 },
  { id: 50, title: '日本-满月白号', region: 'JP', tag: '邮箱号', price: 9.00, stock: 300 },
  { id: 51, title: '约旦-满月白号', region: 'JO', tag: '邮箱号', price: 9.00, stock: 80 },
  { id: 52, title: '哈萨克斯坦-满月白号', region: 'KZ', tag: '邮箱号', price: 9.00, stock: 150 },
  { id: 53, title: '韩国-满月白号', region: 'KR', tag: '邮箱号', price: 9.00, stock: 250 },
  { id: 54, title: '科威特-满月白号', region: 'KW', tag: '邮箱号', price: 9.00, stock: 120 },
  { id: 55, title: '马来西亚-满月白号', region: 'MY', tag: '邮箱号', price: 9.00, stock: 280 },
  { id: 56, title: '蒙古-满月白号', region: 'MN', tag: '邮箱号', price: 9.00, stock: 80 },
  { id: 57, title: '缅甸-满月白号', region: 'MM', tag: '邮箱号', price: 9.00, stock: 120 },
  { id: 58, title: '阿曼-满月白号', region: 'OM', tag: '邮箱号', price: 9.00, stock: 90 },
  { id: 59, title: '巴基斯坦-满月白号', region: 'PK', tag: '邮箱号', price: 9.00, stock: 280 },
  { id: 60, title: '菲律宾-满月白号', region: 'PH', tag: '邮箱号', price: 9.00, stock: 380 },
  { id: 61, title: '卡塔尔-满月白号', region: 'QA', tag: '邮箱号', price: 9.00, stock: 150 },
  { id: 62, title: '沙特阿拉伯-满月白号', region: 'SA', tag: '邮箱号', price: 9.00, stock: 300 },
  { id: 63, title: '新加坡-满月白号', region: 'SG', tag: '邮箱号', price: 9.00, stock: 320 },
  { id: 64, title: '斯里兰卡-满月白号', region: 'LK', tag: '邮箱号', price: 9.00, stock: 130 },
  { id: 65, title: '中国台湾-满月白号', region: 'TW', tag: '邮箱号', price: 9.00, stock: 180 },
  { id: 66, title: '泰国-满月白号', region: 'TH', tag: '邮箱号', price: 9.00, stock: 400 },
  { id: 67, title: '土耳其-满月白号', region: 'TR', tag: '邮箱号', price: 9.00, stock: 280 },
  { id: 68, title: '阿联酋-满月白号', region: 'AE', tag: '邮箱号', price: 9.00, stock: 250 },
  { id: 69, title: '越南-满月白号', region: 'VN', tag: '邮箱号', price: 9.00, stock: 350 },
  
  // 非洲（11个）：阿尔及利亚、安哥拉、埃及、加纳、肯尼亚、摩洛哥、尼日利亚、南非、坦桑尼亚、突尼斯、乌干达
  { id: 70, title: '阿尔及利亚-满月白号', region: 'DZ', tag: '邮箱号', price: 9.00, stock: 100 },
  { id: 71, title: '安哥拉-满月白号', region: 'AO', tag: '邮箱号', price: 9.00, stock: 80 },
  { id: 72, title: '埃及-满月白号', region: 'EG', tag: '邮箱号', price: 9.00, stock: 200 },
  { id: 73, title: '加纳-满月白号', region: 'GH', tag: '邮箱号', price: 9.00, stock: 100 },
  { id: 74, title: '肯尼亚-满月白号', region: 'KE', tag: '邮箱号', price: 9.00, stock: 150 },
  { id: 75, title: '摩洛哥-满月白号', region: 'MA', tag: '邮箱号', price: 9.00, stock: 120 },
  { id: 76, title: '尼日利亚-满月白号', region: 'NG', tag: '邮箱号', price: 9.00, stock: 250 },
  { id: 77, title: '南非-满月白号', region: 'ZA', tag: '邮箱号', price: 9.00, stock: 200 },
  { id: 78, title: '坦桑尼亚-满月白号', region: 'TZ', tag: '邮箱号', price: 9.00, stock: 120 },
  { id: 79, title: '突尼斯-满月白号', region: 'TN', tag: '邮箱号', price: 9.00, stock: 70 },
  { id: 80, title: '乌干达-满月白号', region: 'UG', tag: '邮箱号', price: 9.00, stock: 100 },
  
  // 大洋洲（2个）：澳大利亚、新西兰
  { id: 81, title: '澳大利亚-满月白号', region: 'AU', tag: '邮箱号', price: 9.00, stock: 300 },
  { id: 82, title: '新西兰-满月白号', region: 'NZ', tag: '邮箱号', price: 9.00, stock: 200 },
  
  // 其他（3个）：冰岛、塞尔维亚、乌克兰
  { id: 83, title: '冰岛-满月白号', region: 'IS', tag: '邮箱号', price: 9.00, stock: 50 },
  { id: 84, title: '塞尔维亚-满月白号', region: 'RS', tag: '邮箱号', price: 9.00, stock: 80 },
  { id: 85, title: '乌克兰-满月白号', region: 'UA', tag: '邮箱号', price: 9.00, stock: 180 },
];

// 售后规则
const afterSalesRules = [
  {
    text: '带粉丝的号均为',
    highlight: '刷的粉',
    after: '！账号自购买24小时内包售后，确认账号无误之后请修改邮箱登录密码等信息！',
  },
  {
    text: '账号配套微软OUT/HOT邮箱请用自己手机号解锁。邮箱锁定为微软风控，不在本站售后范围内。',
    highlight: '',
    after: '',
  },
  {
    text: '微软邮箱常用软件为: 下载Foxmail 下载心蓝邮箱助手 2fa身份验证器代码获取',
    highlight: '',
    after: '',
  },
  {
    text: '账号出售',
    highlight: '不包任何权限',
    after: '，不包绑定任何渠道号，不包任何流量，请勿扯皮。',
  },
  {
    text: '账号格式：TK用户名----TK密码----邮箱----邮箱密码',
    highlight: '',
    after: '',
  },
  {
    text: '账号随拿随用，不建议囤号，超过售后时间封号无售后，需要测试各种项目前请少量购买测试，确定可以使用再大量购买',
    highlight: '',
    after: '',
  },
];

export default function TikTokAccountMarketPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [agreed, setAgreed] = useState(false);
  useSEO({
    title: 'TikTok账号市场 | 速锋科技 - 满月号/千粉号/橱窗号购买',
    description: '速锋科技TikTok账号市场，提供满月号、千粉号、橱窗号等多种账号类型。安全稳定，售后保障。微信：SFTKTKTK',
    canonical: 'https://www.tktkx.cn/tiktok-market',
  });

  // 显示所有账号列表
  const filteredAccounts = accountTypes;

  // 选中的账号信息
  const selectedAccountData = selectedAccount 
    ? accountTypes.find(acc => acc.id === selectedAccount) 
    : null;

  // 总价格计算
  const totalPrice = selectedAccountData 
    ? (selectedAccountData.price * quantity).toFixed(2)
    : '0.00';

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* 页面头部 - 深色主题 */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
                速锋科技
              </Link>
              <p className="text-gray-400 text-sm hidden md:block">速锋科技，致力于跨境电商产业增长</p>
            </div>
            
            {/* 登录/注册按钮或用户信息 */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="hidden sm:flex items-center text-gray-300 hover:text-white font-medium transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium flex items-center hover:bg-blue-700 transition-colors"
                >
                  注册
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-300 bg-gray-700 px-4 py-2 rounded-lg">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700"
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

      {/* 业务声明 - 新增 */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🌍</span>
            <div className="flex-1">
              <p className="text-gray-200 text-sm leading-relaxed">
                Tiktok/Twitter/youtube/ins/tg/Facebook等社媒业务，提供Tiktok/Twitter/INS/fb等满月白，满年白，干粉老号，CK号等
              </p>
              <p className="text-yellow-400 text-sm mt-2 font-medium">
                ⚠️ 声明：本站仅用于海外社交媒体营销，不提供任何中国地区社交媒体服务！
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* 左侧功能导航栏 */}
          <div className="w-48 flex-shrink-0">
            <div className="bg-gray-800 rounded-lg p-2 sticky top-24">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.path !== '#' && navigate(item.path)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${
                    item.active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
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

          {/* 中间账号展示区 - 两列布局 */}
          <div className="flex-1">
            {/* 页面标题和统计 */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                TikTok账号
              </h2>
              <div className="flex items-center space-x-4">
                <Grid2x2 className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-400">
                  共 <span className="text-white font-medium">{filteredAccounts.length}</span> 个账号
                </span>
              </div>
            </div>

            {/* 账号卡片 - 两列布局 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAccounts.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">该地区暂无可用账号</p>
                </div>
              ) : (
                filteredAccounts.map((account) => (
                  <div
                    key={account.id}
                    onClick={() => {
                      if (account.stock > 0) {
                        setSelectedAccount(account.id);
                      }
                    }}
                    className={`relative bg-gray-800 rounded-lg border-2 p-5 transition-all cursor-pointer hover:shadow-lg hover:shadow-blue-900/20 ${
                      selectedAccount === account.id
                        ? 'border-blue-500 bg-blue-900/20'
                        : account.stock === 0
                        ? 'border-gray-700 opacity-50 cursor-not-allowed'
                        : 'border-gray-700 hover:border-blue-400'
                    }`}
                  >
                    {/* 顶部标签和选中标记 */}
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded ${
                        account.tag === '橱窗号'
                          ? 'bg-green-900/50 text-green-400 border border-green-700'
                          : 'bg-blue-900/50 text-blue-400 border border-blue-700'
                      }`}>
                        {account.tag}
                      </span>
                      {selectedAccount === account.id && (
                        <div className="flex items-center space-x-1 bg-blue-600 px-2 py-1 rounded text-xs font-medium text-white">
                          <CheckCircle className="h-3 w-3" />
                          <span>已选</span>
                        </div>
                      )}
                    </div>

                    {/* 账号标题 */}
                    <h3 className="text-base font-semibold text-white mb-3 line-clamp-2">
                      {account.title}
                    </h3>

                    {/* 价格和库存 */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">单价</div>
                        <div className="text-2xl font-bold text-blue-400">¥{account.price.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          account.stock === 0 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {account.stock === 0 ? '库存：0' : `库存：${account.stock}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 右侧边栏 - 订单结算 */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* 售后规则 */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-base font-bold text-white mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-400" />
                  账号售后规则
                </h3>
                <div className="space-y-2.5 text-xs text-gray-400 max-h-64 overflow-y-auto pr-2">
                  {afterSalesRules.map((rule, index) => (
                    <div key={index} className="leading-relaxed">
                      {rule.text}
                      {rule.highlight && (
                        <span className="text-red-400 font-medium">{rule.highlight}</span>
                      )}
                      {rule.after}
                    </div>
                  ))}
                </div>
              </div>

              {/* 订单结算 */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-base font-bold text-white mb-4 flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-blue-400" />
                  订单信息
                </h3>

                {!selectedAccountData ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                    <p className="text-sm">请先选择要购买的账号</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* 选中的账号 */}
                    <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3">
                      <div className="flex-1">
                        <div className="text-xs text-gray-400 mb-1">{selectedAccountData.tag}</div>
                        <div className="text-sm font-medium text-white mb-1 line-clamp-2">
                          {selectedAccountData.title}
                        </div>
                        <div className="text-sm text-gray-300">
                          单价：¥{selectedAccountData.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* 数量调整 */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-300">购买件数</span>
                        <span className="text-gray-400">库存：{selectedAccountData.stock}</span>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 bg-gray-700 border border-gray-600 rounded-l-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-300" />
                        </button>
                        <div className="w-16 h-10 bg-gray-700 border-t border-b border-gray-600 flex items-center justify-center font-medium text-white">
                          {quantity}
                        </div>
                        <button
                          onClick={() => setQuantity(Math.min(selectedAccountData.stock, quantity + 1))}
                          className="w-10 h-10 bg-gray-700 border border-gray-600 rounded-r-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-300" />
                        </button>
                      </div>
                    </div>

                    {/* 协议勾选 */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agreement"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 text-blue-600"
                      />
                      <label htmlFor="agreement" className="ml-2 text-sm text-gray-400 leading-relaxed">
                        我确定已填好订单信息！并了解下单须知
                      </label>
                    </div>

                    {/* 总价和下单 */}
                    <div className="border-t border-gray-700 pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">总金额</span>
                        <span className="text-2xl font-bold text-blue-400">¥{totalPrice}</span>
                      </div>
                      <button
                        disabled={!agreed}
                        className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                          agreed
                            ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/50'
                            : 'bg-gray-600 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          if (agreed && selectedAccountData) {
                            alert(`下单成功！\n账号：${selectedAccountData.title}\n数量：${quantity}\n总价：¥${totalPrice}`);
                          }
                        }}
                      >
                        立即下单
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 海外社媒服务入口 */}
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-base font-bold text-white flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
                    海外社媒服务
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { id: 'vkontakte', name: 'VKontakte', icon: '🔷' },
                      { id: 'gmail', name: 'GMail', icon: '📧' },
                      { id: 'twitter', name: 'Twitter', icon: '🐦' },
                      { id: 'tiktok', name: 'TikTok', icon: '🎵' },
                      { id: 'lnkdn', name: 'Lnkdn', icon: '💼' },
                      { id: 'telegram', name: 'Telegram', icon: '✈️' },
                      { id: 'ok', name: 'OK', icon: '🟠' },
                      { id: 'odnoklassniki', name: 'Odnoklassniki', icon: '🤝' },
                      { id: 'reddit', name: 'Reddit', icon: '🔴' },
                      { id: 'social-networks', name: 'Social Networks', icon: '🌐' },
                      { id: 'other-email', name: 'Other Email', icon: '📬' },
                      { id: 'game-accounts', name: 'Game Accounts', icon: '🎮' }
                    ].map((platform) => (
                      <button
                        key={platform.id}
                        className="flex flex-col items-center p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                        title={platform.name}
                      >
                        <span className="text-2xl mb-1">{platform.icon}</span>
                        <span className="text-xs text-gray-400">{platform.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-blue-900/30 p-3 rounded-lg mb-3 border border-blue-800">
                    <h4 className="font-semibold text-white text-sm mb-2">服务类型</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-gray-700/50 p-2 rounded text-center text-gray-300">
                        <div className="font-medium text-blue-400">粉丝</div>
                      </div>
                      <div className="bg-gray-700/50 p-2 rounded text-center text-gray-300">
                        <div className="font-medium text-blue-400">点赞</div>
                      </div>
                      <div className="bg-gray-700/50 p-2 rounded text-center text-gray-300">
                        <div className="font-medium text-blue-400">播放</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/social-media-services')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    进入下单页面
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
