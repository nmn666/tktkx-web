import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { useSEO } from '@/hooks/useSEO';
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
  Globe,
  ChevronRight,
  Volume2,
  Bell,
  Search,
  ExternalLink,
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';

// 平台分类 (侧边栏)
const platforms = [
  { id: 'tiktok', name: '抖音', icon: '🎵', active: true },
  { id: 'instagram', name: 'Instagram', icon: '📸' },
  { id: 'facebook', name: 'Facebook', icon: '👥' },
  { id: 'youtube', name: 'YouTube', icon: '📺' },
  { id: 'phone', name: '手机接码', icon: '📱' },
  { id: 'telegram', name: '电报', icon: '✈️' },
  { id: 'kwai', name: '快', icon: '🧡' },
  { id: 'shopee', name: 'Shopee', icon: '🧡' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬' },
  { id: 'twitch', name: '抽搐', icon: '🟣' },
  { id: 'discord', name: 'Discord', icon: '🎮' },
  { id: 'linkedin', name: '领英', icon: '💼' },
  { id: 'spotify', name: 'Spotify', icon: '🟢' },
];

// 服务数据 (演示)
const services = [
  { id: 4858, name: 'TikTok 粉丝 | 带头像真人粉 | 1-6小时启动 | 无任何售后 ⚠️ | 【0-10万】', price: 12.8772, min: 100, max: 100000 },
  { id: 4859, name: 'TikTok 粉丝 | 高权重 | 24小时内启动 | 30天售后', price: 25.5000, min: 100, max: 50000 },
  { id: 4860, name: 'TikTok 点赞 | 真人点赞 | 立即启动', price: 5.2000, min: 50, max: 200000 },
];

export default function SocialMediaServicesPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].id);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [links, setLinks] = useState('');
  const [quantity, setQuantity] = useState(1000);
  const [agreed, setAgreed] = useState(false);

  // SEO 设置
  useSEO({
    title: '海外社媒服务 | 速锋科技 - TikTok粉丝、点赞、播放量增长',
    description: '速锋科技提供TikTok、Instagram、Facebook、YouTube等全球社媒账号粉丝、点赞、播放量增长服务。24小时全自动下单。微信：SFTKTKTK',
    keywords: 'TikTok刷粉,TikTok刷赞,海外社媒服务,TikTok粉丝购买,Instagram增粉,Facebook推广',
    canonical: 'https://www.tktkx.cn/social-media-services'
  });

  const totalPrice = ((quantity / 1000) * selectedService.price).toFixed(4);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 1. 顶部导航 (Header) */}
      <header className="bg-white border-b border-gray-200 py-3 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
                <Globe className="h-6 w-6" />
              </div>
              <span className="text-xl font-extrabold text-blue-600 tracking-tight">速锋科技</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-4 text-sm font-medium text-gray-500">
              <span className="text-blue-600 border-b-2 border-blue-600 pb-1">跨境资源网，致力于跨境电商产业增长</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium transition-colors">
                <MessageSquare className="h-4 w-4 mr-1 text-blue-500" /> 商务合作联系
              </button>
              <button className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium transition-colors">
                <Globe className="h-4 w-4 mr-1 text-blue-500" /> 资源交流群
              </button>
              <button className="text-gray-400 hover:text-yellow-500">
                <Globe className="h-5 w-5" title="收藏本站" />
              </button>
            </div>

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

      {/* 2. 主体区域 */}
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        
        {/* 公告栏 */}
        <div className="space-y-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center shadow-sm">
            <div className="flex items-center text-sm text-gray-600 flex-1 overflow-hidden">
              <Volume2 className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <span className="font-bold mr-2 text-gray-800 whitespace-nowrap">公告 | </span>
              <span className="truncate">严禁进行任何违法犯罪活动。消费者使用本网站提供的商品服务未经授权的违法犯罪行为所产生的一切责任，均由消费者自行承担...</span>
            </div>
            <button className="text-blue-600 text-sm font-medium ml-4 hover:underline">展开</button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center shadow-sm">
            <div className="flex items-center text-sm text-gray-600 flex-1 overflow-hidden">
              <Bell className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <span className="font-bold mr-2 text-gray-800 whitespace-nowrap">通知 | </span>
              <span className="truncate">目前抖音粉丝服务全网风控，刷粉当天掉粉严重，不着急可以过几天再刷。</span>
            </div>
            <button className="text-blue-600 text-sm font-medium ml-4 hover:underline">展开</button>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          
          {/* 左侧侧边栏 (Sidebar) */}
          <aside className="w-64 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0 sticky top-[88px]">
            <div className="py-2">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 transition-all group ${
                    selectedPlatform === p.id 
                      ? 'bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3 group-hover:scale-110 transition-transform">{p.icon}</span>
                    <span className="text-[15px]">{p.name}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-colors ${selectedPlatform === p.id ? 'text-blue-600' : 'text-gray-300 group-hover:text-gray-400'}`} />
                </button>
              ))}
            </div>
          </aside>

          {/* 中间下单区域 (Order Form) */}
          <section className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[600px]">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                <h1 className="text-2xl font-extrabold text-gray-900 flex items-center">
                  社媒服务下单
                </h1>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md active:scale-95">
                  批量下单
                </button>
              </div>

              <div className="space-y-8">
                {/* 1. 类别选择 */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800 flex items-center">
                    <span className="text-red-500 mr-1">*</span> 类别
                  </label>
                  <div className="relative group">
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-[15px] appearance-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer">
                      <option>🎵 TikTok - 粉丝</option>
                      <option>❤️ TikTok - 点赞</option>
                      <option>👀 TikTok - 播放</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none rotate-90" />
                  </div>
                </div>

                {/* 2. 服务选择 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-800 flex items-center">
                      <span className="text-red-500 mr-1">*</span> 服务
                    </label>
                    <button className="text-blue-600 text-sm font-medium hover:underline flex items-center transition-colors">
                      更多筛选 <ChevronRight className="h-3 w-3 ml-0.5" />
                    </button>
                  </div>
                  <div className="relative group">
                    <select 
                      value={selectedService.id}
                      onChange={(e) => {
                        const s = services.find(s => s.id === Number(e.target.value));
                        if (s) setSelectedService(s);
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-[15px] appearance-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.id} - 🟢 {s.name}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none rotate-90" />
                  </div>
                </div>

                {/* 3. 链接输入 */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800 flex items-center">
                    <span className="text-red-500 mr-1">*</span> 链接
                  </label>
                  <textarea 
                    value={links}
                    onChange={(e) => setLinks(e.target.value)}
                    placeholder="一行一个 支持多链接"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-[15px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-[160px] resize-none placeholder:text-gray-400"
                  />
                </div>

                {/* 4. 数量输入 */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-800 flex items-center">
                    <span className="text-red-500 mr-1">*</span> 数量
                  </label>
                  <input 
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={selectedService.min}
                    max={selectedService.max}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-[15px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                {/* 下单确认 */}
                <div className="space-y-6 pt-4">
                  <div className="flex items-center group cursor-pointer" onClick={() => setAgreed(!agreed)}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${agreed ? 'bg-blue-600 border-blue-600' : 'bg-gray-100 border-gray-300 group-hover:border-blue-400'}`}>
                      {agreed && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                    <span className="ml-3 text-sm text-gray-600 font-medium">我确定已填写好的订单信息！并了解下单须知</span>
                  </div>

                  <div className="flex items-center justify-between items-end border-t border-gray-100 pt-8">
                    <div>
                      <span className="text-gray-500 text-sm font-medium">总金额：</span>
                      <span className="text-3xl font-extrabold text-blue-600 tracking-tight">¥ {totalPrice}</span>
                    </div>
                    <button 
                      disabled={!agreed || !links.trim()}
                      className={`px-12 py-4 rounded-xl font-black text-[17px] transition-all shadow-lg active:scale-95 ${
                        agreed && links.trim() 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      立即下单
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 右侧说明区域 (Service Description) */}
          <aside className="w-80 space-y-6 flex-shrink-0 sticky top-[88px]">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  服务说明
                </h3>
              </div>
              <div className="p-5 space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-bold text-gray-800">示例链接 (PC端)</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-blue-600 flex items-center justify-between group cursor-pointer hover:bg-blue-50 transition-all">
                    <span className="truncate">https://www.tiktok.com/@用户名</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center text-blue-600 mb-1.5">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">1-6小时</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">开始时间</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center text-blue-600 mb-1.5">
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">无</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">有无保证</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center text-blue-600 mb-1.5">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">10万/天</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">速度</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center text-blue-600 mb-1.5">
                      <Zap className="h-4 w-4 mr-2" />
                      <span className="text-xs font-bold">24小时</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">平均时间</span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <p className="text-sm font-bold text-gray-800">说明</p>
                  <div className="flex items-start text-xs text-gray-500 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    <ExternalLink className="h-3.5 w-3.5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>链接格式：查看上方示例链接 或 联系左下角客服咨询链接格式</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[13px] font-bold text-gray-800 flex items-center">
                      ⚠️ 注意：
                    </p>
                    {[
                      '下单前请仔细检查链接格式。',
                      '请确保账户是公开的，而不是公开的。',
                      '禁止在服务中途更改用户名！',
                      '如服务集中时，操作的启动速度会发生变化。',
                      '在系统中完成第一个订单之前，请勿在同一个链接上下两个订单。',
                      '如果同一个链接，不同服务/相同服务，重复下一个，概不退款'
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
