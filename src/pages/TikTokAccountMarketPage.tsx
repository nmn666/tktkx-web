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
  ChevronRight,
  Globe,
  Clock,
  Zap,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  Volume2,
  Bell
} from 'lucide-react';

// 平台/分类 (侧边栏)
const categories = [
  { id: 'us', name: '美国账号', icon: '🇺🇸' },
  { id: 'uk', name: '英国账号', icon: '🇬🇧' },
  { id: 'sea', name: '东南亚账号', icon: '🌏' },
  { id: 'eu', name: '欧洲账号', icon: '🇪🇺' },
  { id: 'full-moon', name: '满月号/千粉号', icon: '🌕' },
  { id: 'natural', name: '自然流账号', icon: '🌱' },
];

// 账号数据
const accountTypes = [
  { id: 1, title: '美国-满月白号', region: 'US', tag: '邮箱号', price: 9.00, stock: 500, description: '注册满30天，权重稳定，适合开通橱窗。' },
  { id: 2, title: '美国-千粉号', region: 'US', tag: '千粉号', price: 85.00, stock: 120, description: '自带1000+真实粉丝，直接开通直播/橱窗。' },
  { id: 3, title: '英国-满月白号', region: 'UK', tag: '邮箱号', price: 9.50, stock: 300, description: '英国本土注册，满30天。' },
];

export default function TikTokAccountMarketPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedAccount, setSelectedAccount] = useState(accountTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [agreed, setAgreed] = useState(false);

  // SEO 设置
  useSEO({
    title: 'TikTok账号购买市场 | 速锋科技 - 满月号/千粉号/橱窗号批发',
    description: '速锋科技TikTok账号购买平台，提供全球85个国家满月白号、TikTok千粉号、TikTok橱窗号批发。安全稳定，24小时发货，售后保障。微信：SFTKTKTK',
    keywords: 'TikTok账号购买,TikTok满月号购买,TikTok千粉号购买,TikTok橱窗号购买,TikTok账号批发,满月白号,TikTok美国账号,TikTok英国账号,TikTok账号市场',
    canonical: 'https://www.tktkx.cn/tiktok-market'
  });

  const totalPrice = (quantity * selectedAccount.price).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200 py-3 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <span className="text-xl font-extrabold text-blue-600 tracking-tight">速锋科技</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-4 text-sm font-medium text-gray-500">
              <span className="text-blue-600 border-b-2 border-blue-600 pb-1">跨境资源网，致力于跨境电商产业增长</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-sm border border-gray-200">
              <div className="flex items-center space-x-2 mr-4 border-r border-gray-300 pr-4">
                <span className="text-gray-500">当前余额:</span>
                <span className="font-bold text-blue-600">¥ 0.00</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
                <span className="font-medium">{user?.username || '18264170234'}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主体区域 */}
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        
        {/* 公告栏 */}
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center shadow-sm">
            <div className="flex items-center text-sm text-gray-600 flex-1 overflow-hidden">
              <Volume2 className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <span className="font-bold mr-2 text-gray-800 whitespace-nowrap">公告 | </span>
              <span className="truncate">所有账号均为24小时自动发货。购买后请及时更改密码和邮箱，确保账号安全。</span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          
          {/* 左侧侧边栏 */}
          <aside className="w-64 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0 sticky top-[88px]">
            <div className="py-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 transition-all group ${
                    selectedCategory === c.id 
                      ? 'bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{c.icon}</span>
                    <span className="text-[15px]">{c.name}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-colors ${selectedCategory === c.id ? 'text-blue-600' : 'text-gray-300 group-hover:text-gray-400'}`} />
                </button>
              ))}
            </div>
          </aside>

          {/* 中间下单区域 */}
          <section className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[600px]">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                  TikTok账号购买
                </h1>
                <Link to="/orders" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md active:scale-95">
                  查看订单
                </Link>
              </div>

              <div className="space-y-8">
                {/* 1. 账号选择 */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800 flex items-center">
                    <span className="text-red-500 mr-1">*</span> 账号类型
                  </label>
                  <div className="relative group">
                    <select 
                      value={selectedAccount.id}
                      onChange={(e) => {
                        const a = accountTypes.find(a => a.id === Number(e.target.value));
                        if (a) setSelectedAccount(a);
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-[15px] appearance-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer"
                    >
                      {accountTypes.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.title} - [库存: {a.stock}]
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none rotate-90" />
                  </div>
                </div>

                {/* 2. 数量输入 */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800 flex items-center">
                    <span className="text-red-500 mr-1">*</span> 购买数量
                  </label>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <input 
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-32 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* 3. 优惠券 (可选) */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800 flex items-center">
                    优惠券
                  </label>
                  <input 
                    type="text"
                    placeholder="如有优惠券请输入"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-[15px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* 下单确认 */}
                <div className="space-y-6 pt-4">
                  <div className="flex items-center group cursor-pointer" onClick={() => setAgreed(!agreed)}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${agreed ? 'bg-blue-600 border-blue-600' : 'bg-gray-100 border-gray-300 group-hover:border-blue-400'}`}>
                      {agreed && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                    <span className="ml-3 text-sm text-gray-600 font-medium">我确定已填写好的订单信息！购买即视为同意服务协议</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                    <div>
                      <span className="text-gray-500 text-sm font-medium">支付金额：</span>
                      <span className="text-3xl font-extrabold text-blue-600 tracking-tight">¥ {totalPrice}</span>
                    </div>
                    <button 
                      disabled={!agreed}
                      className={`px-12 py-4 rounded-xl font-black text-[17px] transition-all shadow-lg active:scale-95 ${
                        agreed 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      立即购买
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 右侧说明区域 */}
          <aside className="w-80 space-y-6 flex-shrink-0 sticky top-[88px]">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  商品说明
                </h3>
              </div>
              <div className="p-5 space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-800">{selectedAccount.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {selectedAccount.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center text-blue-600 mb-1.5">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">自动发货</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">发货方式</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center text-blue-600 mb-1.5">
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">24小时</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">售后时间</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center text-blue-600 mb-1.5">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">高权重</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">账号质量</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center text-blue-600 mb-1.5">
                      <Zap className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">满30天</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">注册时间</span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <p className="text-sm font-bold text-gray-800">注意事项</p>
                  <div className="space-y-3">
                    {[
                      '购买后请务必更改初始密码。',
                      '请确保使用纯净住宅IP登录，避免封号。',
                      '不要在同一个设备上频繁切换多个账号。',
                      '如果账号有任何问题，请联系客服处理。',
                      '批量购买请联系右下角客服咨询优惠。'
                    ].map((note, idx) => (
                      <div key={idx} className="flex items-start text-[11px] text-gray-500 group">
                        <span className="text-red-500 mr-2 font-bold group-hover:scale-125 transition-transform">★</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 客服按钮 */}
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg active:scale-95">
              <HeadphonesIcon className="h-5 w-5 mr-3" />
              订单售后客服
            </button>
          </aside>

        </div>
      </main>

      {/* 底部版权 */}
      <footer className="max-w-[1400px] mx-auto px-4 py-12 border-t border-gray-200 mt-12 text-center">
        <p className="text-sm text-gray-400">© 2026 速锋科技 TKTKX.CN. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
