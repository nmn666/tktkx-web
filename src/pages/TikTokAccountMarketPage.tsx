import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronRight,
  Volume2,
  Bell,
  Clock,
  ShieldCheck,
  TrendingUp,
  Zap,
  ExternalLink,
  MessageSquare,
  Globe,
  Info,
  CheckCircle2,
  AlertTriangle,
  Menu,
  X,
  CreditCard,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  User,
  ArrowRight,
  Search,
  ChevronDown,
  Gamepad2,
  Mail
} from 'lucide-react';

// ─── 全平台分类数据 (根据用户提供图片) ───────────────────────
const sideMenuSocial = [
  { name: 'VKontakte', icon: '🌐' },
  { name: 'GMail', icon: '✉️' },
  { name: 'Twitter', icon: '🐦' },
  { name: 'TikTok', icon: '🎵' },
  { name: 'Lnkdn', icon: '💼' },
  { name: 'Telegram', icon: '✈️' },
  { name: 'Odnoklassniki', icon: '🆗' },
  { name: 'Reddit', icon: '🤖' },
  { name: 'Social Networks', icon: '👥', active: true },
];

const sideMenuOther = [
  { name: 'AI accounts' },
  { name: 'Marketplace' },
  { name: 'Snapchat' },
  { name: 'Twitch' },
  { name: 'Yelp' },
  { name: 'Quora' },
  { name: 'Pinterest' },
  { name: 'Discord' },
  { name: 'Roblox' },
  { name: 'Brawl Stars' },
  { name: 'Eternium' },
  { name: 'Black Desert Mobile' },
  { name: 'GTA5' },
  { name: 'Clash Royale' },
  { name: 'Epicgames.com' },
  { name: 'Steam' },
  { name: 'Other Email services' },
  { name: 'Clash of Clans' },
  { name: 'Game Accounts', highlight: true },
];

// ─── 账号购买数据 ───────────────────────────────────────────
const accountCategories = [
  { id: 'hot',        name: '热销爆款',       icon: '🔥' },
  { id: 'full-moon',  name: '满月/千粉',      icon: '🌕' },
  { id: 'us',         name: '美国区',         icon: '🇺🇸' },
  { id: 'uk',         name: '英国区',         icon: '🇬🇧' },
  { id: 'sea',        name: '东南亚',         icon: '🌏' },
  { id: 'eu',         name: '欧洲区',         icon: '🇪🇺' },
  { id: 'me',         name: '中东区',         icon: '🌙' },
  { id: 'ads',        name: '广告/企业',      icon: '📊' },
  { id: 'high-fan',   name: '高粉/基金',      icon: '📈' },
  { id: 'payment',    name: '代付代购',       icon: '💳' },
  { id: 'all',        name: '全部账号',       icon: '🌐' },
];

const accountTypes = [
  // ── 热销爆款 ──────────────────────────────────────────
  { id: 1,   title: '美国-优质满月白号',         region: 'us|hot|full-moon|all', tag: '邮箱号',  price: 9,    stock: 500, description: '【推荐】注册满30-45天，模拟真实环境养号，权重稳定。支持更改资料、2FA安全验证，适合开通美区橱窗及Shop运营。' },
  { id: 2,   title: '美国-橱窗号 (1000真人粉)',  region: 'us|hot|full-moon|all', tag: '橱窗号',  price: 85,   stock: 120, description: '【爆款】已开通TikTok橱窗功能，自带1000+真实活跃粉丝。由于带货门槛，到手即可直接挂载小黄车带货。' },
  { id: 3,   title: '英国-优质满月白号',         region: 'uk|hot|full-moon|all', tag: '邮箱号',  price: 12,   stock: 300, description: '注册满30天，纯正英区原生住宅IP养号。适合开通英区TikTok Shop本土店或跨境店。' },
  { id: 5,   title: '全球通用-高质满月白号',     region: 'hot|full-moon|all',    tag: '满月号',  price: 8,    stock: 999, description: '德/法/意/西等随机发货，注册满30天，环境干净，适合批量采集数据或跑基础流量。' },
  { id: 6,   title: '高权重千粉号 (地区定制)',    region: 'hot|full-moon|all',    tag: '千粉号',  price: 79,   stock: 200, description: '粉丝1000+，无违规记录。可根据需求定制美、英、法、德等特定区域权重。' },

  // ── 美国区专场 ────────────────────────────────────────
  { id: 10,  title: '美国-5000粉高权重号',      region: 'us|high-fan|all',     tag: '高粉号',  price: 260,  stock: 30,  description: '【旗舰】自带5000+高质量真人粉丝，账号历史干净，权重极高，极易触发推荐系统流量爆发。' },
  { id: 11,  title: '美区本土店(资料辅助号)',    region: 'us|ads|all',          tag: '店铺',    price: 350,  stock: 50,  description: '含美区本土店注册所需基础环境及账号，协助过审，适合深度布局美区Shop。' },
  { id: 12,  title: '美区Ads企业投放账号',      region: 'us|ads|all',          tag: '广告号',  price: 180,  stock: 40,  description: 'TikTok Ads广告投放专用号，已过新手风控期，投放更加稳定，适合跑高消耗广告。' },

  // ── 英国区专场 ────────────────────────────────────────
  { id: 20,  title: '英国-5000粉商业号',        region: 'uk|high-fan|all',     tag: '高粉号',  price: 280,  stock: 20,  description: '英区5000+粉丝，粉丝画像精准。适合英国品牌出海、矩阵分发及本地获客。' },
  { id: 21,  title: '英区资料本土店',           region: 'uk|ads|all',          tag: '店铺',    price: 420,  stock: 15,  description: '高稳定性英区本土店账号，包含全套售后支持，适合长期电商运营。' },

  // ── 东南亚区 (SEA) ──────────────────────────────────
  { id: 30,  title: '泰国-满月白号',            region: 'sea|all',             tag: '邮箱号',  price: 8,    stock: 400, description: '泰区注册满30天账号，环境干净，适合泰区短视频引流和矩阵起号。' },
  { id: 31,  title: '泰国-橱窗号 (1000粉)',      region: 'sea|all',             tag: '橱窗号',  price: 72,   stock: 90,  description: '泰区千粉号，支持直接开通小黄车带货，东南亚热门电商市场首选。' },
  { id: 36,  title: '马来西亚-满月白号',         region: 'sea|all',             tag: '邮箱号',  price: 9,    stock: 300, description: '马区注册满30天，权重稳定，适合马区电商运营起号。' },
  { id: 37,  title: '马来西亚-橱窗号',           region: 'sea|all',             tag: '橱窗号',  price: 82,   stock: 50,  description: '马区千粉号，支持开通橱窗带货，粉丝活跃。' },

  // ── 欧洲区 (EU) ────────────────────────────────────────
  { id: 50,  title: '德国-权重满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 120, description: '德区权重满月号，适合针对高净值德语用户进行内容创作。' },
  { id: 51,  title: '法国-权重满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 130, description: '法区权重满月号，适合时尚、美妆等品类在法国市场的推广。' },

  // ── 中东区 (ME) ────────────────────────────────────────
  { id: 90,  title: '沙特-权重满月白号',         region: 'me|all',              tag: '邮箱号',  price: 18,   stock: 150, description: '沙特区权重号，中东土豪金区，流量价值极高。' },
  { id: 91,  title: '沙特-1000粉橱窗号',         region: 'me|all',              tag: '橱窗号',  price: 128,  stock: 30,  description: '沙特橱窗号，高客单价蓝海市场带货神器。' },

  // ── 特色账号 ──────────────────────────────────────────
  { id: 180, title: 'TikTok 1万粉 (创作基金号)',  region: 'high-fan|all',         tag: '基金号',  price: 850,  stock: 10,  description: '【旗舰精品】自带1万真实粉丝，已成功开通Creator Fund，视频播放即可产生美金收益。' },
  // ── 增值服务 (代付代购) ──────────────────────────────────
  { 
    id: 200, 
    title: '代付代购服务｜信用卡支付', 
    region: 'payment|hot|all', 
    tag: '支付服务', 
    price: 1, 
    stock: 9999, 
    description: '支持多种网站支付、缴费、充值、订阅、赞助等服务。全程安全保障，提供安全支付方式；提供扣款证明，确保交易透明无忧。全程协助服务，确保顺利完成交易。注：本服务仅限于合法合规的支付用途，下单前请先联系客服咨询金额！' 
  },
];

const accountInfoItems = [
  { Icon: Clock,       label: '自动发货', desc: '秒速交付' },
  { Icon: ShieldCheck, label: '24H售后',  desc: '安全保障' },
  { Icon: TrendingUp,  label: '高权重',  desc: '原生环境' },
  { Icon: Zap,         label: '30天+',   desc: '注册时长' },
];

// ─── 增粉服务数据 ───────────────────────────────────────────
const socialPlatforms = [
  { id: 'tiktok',    name: 'TikTok',    emoji: '🎵' },
  { id: 'instagram', name: 'Instagram', emoji: '📷' },
  { id: 'facebook',  name: 'Facebook',  emoji: '👤' },
  { id: 'youtube',   name: 'YouTube',   emoji: '▶️' },
  { id: 'twitter',   name: 'Twitter/X', emoji: '🐦' },
];

const servicesByPlatform: Record<string, { id: number; name: string; price: number; min: number; max: number }[]> = {
  tiktok: [
    { id: 4858, name: 'TikTok 粉丝 | 真实头像粉 | 极速启动', price: 12.87, min: 100, max: 100000 },
    { id: 4859, name: 'TikTok 点赞 | 真人交互 | 稳定不掉', price: 3.5,   min: 100, max: 50000  },
    { id: 4860, name: 'TikTok 播放量 | 万次起刷 | 提升权重', price: 0.12,  min: 1000, max: 5000000 },
  ],
  instagram: [
    { id: 5001, name: 'Instagram 粉丝 | 全球真人粉', price: 18.5, min: 100, max: 50000 },
    { id: 5002, name: 'Instagram 点赞 | 快速提升曝光', price: 5.0,  min: 100, max: 10000 },
  ],
  facebook: [
    { id: 6001, name: 'Facebook 主页赞/关注 | 真人用户', price: 22.0, min: 100, max: 10000 },
  ],
  youtube: [
    { id: 7001, name: 'YouTube 订阅 | 稳定真人订阅', price: 28.0, min: 100, max: 20000 },
  ],
  twitter:   [{ id: 8001,  name: 'Twitter(X) 粉丝 | 精准账号关注', price: 20.0, min: 100, max: 50000 }],
};

const socialInfoItems = [
  { Icon: Clock,       label: '1-3小时', desc: '平均启动' },
  { Icon: ShieldCheck, label: '包补机制', desc: '掉粉包补' },
  { Icon: Zap,         label: '24/7',    desc: '全天运行' },
  { Icon: Globe,       label: '全球',    desc: '用户覆盖' },
];

type Mode = 'account' | 'social';

export default function TikTokAccountMarketPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [mode, setMode] = useState<Mode>('account');
  const [selectedCategory, setSelectedCategory]   = useState('hot');
  const [selectedAccountId, setSelectedAccountId] = useState(1);
  const [quantity, setQuantity]                   = useState(1);
  const [selectedPlatform, setSelectedPlatform]   = useState('tiktok');
  const [selectedServiceId, setSelectedServiceId] = useState(4858);
  const [socialQty, setSocialQty]                 = useState(1000);
  const [isMenuOpen, setIsMenuOpen]               = useState(false);
  const [isPaying, setIsPaying]                   = useState(false);
  const [dynamicProducts, setDynamicProducts]     = useState<any[]>(accountTypes);
  const [loadingProducts, setLoadingProducts]     = useState(true);

  // 从后端 API 获取实时商品数据
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await fetch(`/api/products?category=${selectedCategory}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setDynamicProducts(data);
          } else {
            setDynamicProducts(accountTypes);
          }
        } else {
          setDynamicProducts(accountTypes);
        }
      } catch (err) {
        setDynamicProducts(accountTypes);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // GEO 优化：结构化数据
  const MARKET_SCHEMA = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "TikTok 满月白号 / 千粉橱窗号",
        "description": "专业TikTok运营账号，包含注册满30天的权重满月号及自带1000+粉丝的橱窗开通号。24小时自动发货，安全稳定。",
        "brand": { "@type": "Brand", "name": "速锋科技" },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "9",
          "highPrice": "850",
          "priceCurrency": "CNY"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "购买后的TikTok账号多久发货？",
            "acceptedAnswer": { "@type": "Answer", "text": "速锋科技提供24小时自动发货服务。下单成功后立即发送至注册邮箱。" }
          }
        ]
      }
    ]
  };

  useEffect(() => {
    const scriptId = 'market-jsonld';
    let el = document.getElementById(scriptId);
    if (!el) {
      el = document.createElement('script');
      el.id = scriptId;
      (el as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(MARKET_SCHEMA);
    return () => { document.getElementById(scriptId)?.remove(); };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pay') === 'success') {
      alert('支付成功！系统正在处理您的订单，请稍后在个人中心查看或联系客服。');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // ─── 全平台分类菜单组件 ───
  const PlatformExplorer = () => (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-10">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#f4f4f4] flex flex-col">
        <div className="bg-[#2d7a31] text-white p-4 flex items-center justify-between font-bold">
           <div className="flex items-center gap-2">
             <Menu className="h-4 w-4" /> 选择一个类别
           </div>
           <ChevronDown className="h-4 w-4" />
        </div>
        <div className="flex-1 py-1">
           {sideMenuSocial.map((item, idx) => (
             <div key={idx} className={`px-4 py-2.5 flex items-center justify-between hover:bg-white cursor-pointer transition-colors group ${item.active ? 'bg-white text-[#2d7a31]' : 'text-gray-600'}`}>
                <div className="flex items-center gap-3">
                   <span className="text-base opacity-70">{item.icon}</span>
                   <span className="text-xs font-black uppercase tracking-tight">{item.name}</span>
                </div>
                <ChevronRight className="h-3 w-3 opacity-30 group-hover:opacity-100" />
             </div>
           ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 p-0 flex flex-col">
        <div className="p-4 border-b border-gray-50 flex items-center bg-gray-50/50">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
             <input placeholder="搜索全平台账号 (Search for accounts)" className="w-full pl-10 pr-4 py-2 bg-transparent outline-none text-sm font-bold placeholder:text-gray-300" />
           </div>
        </div>
        <div className="p-6 grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
           {sideMenuOther.map((item, idx) => (
             <div key={idx} className={`text-[13px] font-bold cursor-pointer hover:text-blue-600 transition-colors ${item.highlight ? 'text-[#2d7a31]' : 'text-gray-500'}`}>
               {item.name}
             </div>
           ))}
           <div className="text-[13px] font-bold text-[#2d7a31] cursor-pointer hover:underline">Show all</div>
        </div>
        
        {/* Banner Area */}
        <div className="mt-auto p-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2d7a31]/10 rounded-full flex items-center justify-center text-[#2d7a31]">
                 <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase">Security First</p>
                 <p className="text-xs font-black text-gray-700">全平台账号均经过安全审计，24H自动发货</p>
              </div>
           </div>
           <ArrowRight className="h-4 w-4 text-gray-300" />
        </div>
      </div>
    </div>
  );

  const filteredAccountTypes = useMemo(() => 
    dynamicProducts.filter(a => a.region.split('|').includes(selectedCategory)),
    [selectedCategory, dynamicProducts]
  );

  const selectedAccount = useMemo(() => 
    dynamicProducts.find(a => a.id === selectedAccountId) || filteredAccountTypes[0] || dynamicProducts[0],
    [selectedAccountId, filteredAccountTypes, dynamicProducts]
  );

  const currentServices = servicesByPlatform[selectedPlatform] || [];
  const selectedService = currentServices.find(s => s.id === selectedServiceId) || currentServices[0];

  const totalPrice = mode === 'account' 
    ? ((selectedAccount?.price || 0) * quantity) 
    : ((selectedService?.price || 0) * socialQty / 1000);

  useSEO({
    title: 'TikTok账号购买 | TK千粉/白号批发 - 24H自动发货 - 速锋科技',
    description: '专业TikTok账号购买平台，提供美区/英区满月白号、橱窗号（1000粉）、店铺开通，以及TikTok/Instagram/YouTube等平台增粉点赞服务。',
    canonical: 'https://www.tktkx.cn/tiktok-market',
    keywords: 'TikTok账号购买,TK千粉,白号批发,24H自动发货,美区新号,英区满月号,橱窗号购买,TikTok成品号,2FA验证账号',
  });

  const handlePlatformChange = (id: string) => {
    setSelectedPlatform(id);
    const services = servicesByPlatform[id] || [];
    if (services.length > 0) {
      setSelectedServiceId(services[0].id);
      setSocialQty(services[0].min);
    }
  };

  const handleCheckout = async () => {
    if (isPaying) return;
    setIsPaying(true);
    
    try {
      const goodsName = mode === 'account' 
        ? `${selectedAccount?.title || 'TikTok账号'} x ${quantity}` 
        : `${selectedService?.name} (Qty: ${socialQty})`;
        
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: goodsName,
          money: totalPrice.toFixed(2),
          type: 'alipay'
        })
      });
      
      const data = await response.json();
      if (data.ok && data.pay_url) {
        window.location.href = data.pay_url;
      } else {
        alert('支付生成失败: ' + (data.error || '未知错误'));
      }
    } catch (err) {
      console.error(err);
      alert('支付请求出错，请检查网络或联系客服');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#333] font-sans pb-32 md:pb-20">
      {/* ── 手机端底部粘性结算条 ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase">总计费用</p>
          <p className="text-2xl font-black text-blue-600">¥ {totalPrice.toFixed(2)}</p>
        </div>
        <button 
          onClick={handleCheckout}
          disabled={isPaying}
          className={`${isPaying ? 'bg-gray-400' : 'bg-blue-600'} text-white px-8 py-3.5 rounded-xl font-black text-sm flex items-center shadow-lg shadow-blue-100 active:scale-95 transition-transform`}
        >
          {isPaying ? '处理中...' : '立即购买'} <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      {/* ── Header ── */}
      <header className="bg-white border-b border-[#eef1f6] py-3 px-4 md:px-6 sticky top-0 z-[60] shadow-sm">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              className="md:hidden p-1.5 text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-black text-[#1a56db] tracking-tighter">速锋科技</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex bg-[#1a56db] hover:bg-[#1e429f] text-white rounded-lg px-5 py-2 items-center shadow-md transition-all text-xs font-bold"
            >
              <MessageSquare className="h-4 w-4 mr-2" /> 官方客服
            </a>
            <div className="h-6 w-px bg-gray-200 hidden sm:block" />
            {!isAuthenticated ? (
              <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-blue-600 px-2 py-1 transition-colors">登录</Link>
            ) : (
              <button onClick={logout} className="p-2 text-gray-500 hover:text-red-500 transition-colors"><LogOut className="h-5 w-5" /></button>
            )}
          </div>
        </div>

        {/* ── 手机端侧边菜单 ── */}
        <div className={`md:hidden fixed inset-0 top-[57px] bg-white z-[55] transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">主要导航</p>
              <Link to="/" className="flex items-center p-3 rounded-xl hover:bg-gray-50 font-bold text-gray-700" onClick={() => setIsMenuOpen(false)}><Globe className="h-5 w-5 mr-3 text-blue-500" /> 首页</Link>
              <Link to="/news" className="flex items-center p-3 rounded-xl hover:bg-gray-50 font-bold text-gray-700" onClick={() => setIsMenuOpen(false)}><Bell className="h-5 w-5 mr-3 text-pink-500" /> 行业资讯</Link>
              <Link to="/geo-marketing" className="flex items-center p-3 rounded-xl hover:bg-gray-50 font-bold text-gray-700" onClick={() => setIsMenuOpen(false)}><Zap className="h-5 w-5 mr-3 text-purple-500" /> GEO优化</Link>
            </div>
            <div className="pt-6 border-t border-gray-100">
               <a href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d" className="flex items-center p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100 font-bold justify-center">
                  <MessageSquare className="h-5 w-5 mr-2" /> 联系官方微信客服
               </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto py-4 md:py-6 px-4">
        {/* ── 业务切换 (手机端优化为圆角卡片) ── */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 mb-6 shadow-sm">
          <button 
            onClick={() => setMode('account')}
            className={`flex-1 py-3.5 rounded-xl font-black text-sm flex items-center justify-center transition-all ${mode === 'account' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Globe className="h-4 w-4 mr-2" /> 账号市场
          </button>
          <button 
            onClick={() => setMode('social')}
            className={`flex-1 py-3.5 rounded-xl font-black text-sm flex items-center justify-center transition-all ${mode === 'social' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <TrendingUp className="h-4 w-4 mr-2" /> 增粉服务
          </button>
        </div>

        {/* ── 全平台全品类导航 (仿用户图片布局) ── */}
        {mode === 'account' && <PlatformExplorer />}

        {/* ── 核心分类 (手机端改为横向滚动) ── */}
        <div className="mb-6">
          <div className="flex overflow-x-auto no-scrollbar pb-2 gap-2 -mx-4 px-4 scroll-smooth">
            {(mode === 'account' ? accountCategories : socialPlatforms).map((item) => {
              const isActive = mode === 'account' ? selectedCategory === item.id : selectedPlatform === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => mode === 'account' ? setSelectedCategory(item.id) : handlePlatformChange(item.id)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-black transition-all border whitespace-nowrap flex items-center ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' 
                      : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <span className="mr-1.5">{(item as any).icon || (item as any).emoji}</span>
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <section className="flex-1 space-y-6">
            {/* ── 选购主卡片 ── */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* 表单 */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          {mode === 'account' ? '选择账号细分' : '选择服务项目'}
                        </label>
                        <select
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600/20 rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all appearance-none shadow-sm"
                          value={mode === 'account' ? selectedAccountId : selectedServiceId}
                          onChange={e => mode === 'account' ? setSelectedAccountId(Number(e.target.value)) : setSelectedServiceId(Number(e.target.value))}
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a1a1aa\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'org/19/9l7 7 7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2rem' }}
                        >
                          {mode === 'account' ? (
                            filteredAccountTypes.map(a => <option key={a.id} value={a.id}>{a.title} (¥{a.price})</option>)
                          ) : (
                            currentServices.map(s => <option key={s.id} value={s.id}>{s.name}</option>)
                          )}
                        </select>
                      </div>

                      {mode === 'account' ? (
                        <div className="space-y-2">
                          <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">购买数量</label>
                          <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-14 h-14 rounded-xl flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-xl font-black text-gray-400 hover:text-blue-600">-</button>
                            <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} className="flex-1 bg-transparent text-center font-black text-blue-600 text-xl outline-none" />
                            <button onClick={() => setQuantity(quantity + 1)} className="w-14 h-14 rounded-xl flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-xl font-black text-gray-400 hover:text-blue-600">+</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">投放链接</label>
                            <input placeholder="请粘贴作品链接或主页ID" className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600/20 rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all shadow-sm" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1 flex justify-between">
                              <span>下单数量</span>
                              <span className="text-blue-500">{selectedService?.min} - {selectedService?.max}</span>
                            </label>
                            <input type="number" value={socialQty} onChange={e => setSocialQty(Number(e.target.value))} className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600/20 rounded-2xl px-5 py-4 text-sm font-black text-blue-600 outline-none transition-all shadow-sm" />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="hidden md:block pt-4">
                      <div className="flex items-end justify-between mb-6">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">结算金额 (元)</p>
                          <p className="text-4xl font-black text-blue-600">¥ {totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="text-right text-gray-400 text-[11px] font-medium leading-tight">
                          支付完成后<br />系统自动发货
                        </div>
                      </div>
                      <button 
                        onClick={handleCheckout}
                        disabled={isPaying}
                        className={`w-full ${isPaying ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-2xl py-5 font-black text-lg shadow-xl shadow-blue-100 transition-all transform active:scale-[0.98] flex items-center justify-center`}
                      >
                        {isPaying ? '正在跳转支付...' : '立即下单购买'} <ArrowRight className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                  </div>

                  {/* 详情卡片 */}
                  <div className="space-y-6">
                    <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <ShieldCheck className="h-24 w-24" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {mode === 'account' ? selectedAccount.tag : '服务担保'}
                          </span>
                          <span className="flex items-center text-[10px] font-bold text-white/70">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> 已通过安全审计
                          </span>
                        </div>
                        <h3 className="text-2xl font-black mb-4 leading-tight">
                          {mode === 'account' ? selectedAccount.title : selectedService?.name}
                        </h3>
                        <p className="text-sm text-blue-50/80 leading-relaxed mb-8">
                          {mode === 'account' ? selectedAccount.description : '该服务由速锋科技自研拟人增长引擎驱动，支持 24 小时全自动化启动，掉粉包补，确保账号运营安全。'}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {(mode === 'account' ? accountInfoItems : socialInfoItems).map((item, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center">
                              <item.Icon className="h-5 w-5 mr-3 text-white/80" />
                              <div>
                                <p className="text-[9px] text-white/50 font-black uppercase">{item.desc}</p>
                                <p className="text-[11px] font-black">{item.label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border-2 border-gray-50 flex items-center gap-5">
                       <div className="bg-green-50 p-4 rounded-2xl text-green-600">
                          <MessageSquare className="h-8 w-8" />
                       </div>
                       <div className="flex-1">
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">联系客服处理异常</p>
                          <p className="text-sm font-black text-gray-800">WeChat: SFTKTKTK</p>
                       </div>
                       <ChevronRight className="h-5 w-5 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 规范与指南 (手机端优化布局) ── */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
              <div className="flex items-center mb-8">
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-3" />
                <h3 className="text-xl font-black text-gray-900">账号使用安全指南</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: '网络环境', text: '必须使用目标国家原生住宅IP。切勿使用多人共用梯子，避免0播放或封号。', icon: Globe },
                  { title: '资料更改', text: '建议登录24小时后再修改密保和资料。分批次操作，切勿瞬间改完。', icon: CheckCircle2 },
                  { title: '售后标准', text: '首登封禁、密码错误等24小时内包换。由于不合规运营导致的异常无法售后。', icon: ShieldCheck }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <div className="bg-amber-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <h4 className="font-black text-sm text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-12 text-center px-6">
        <p className="text-xs text-gray-400 font-bold mb-2">速锋科技 TKTKX.CN · 2026 跨境出海账号服务一级供应商</p>
        <div className="flex justify-center space-x-4 opacity-50 grayscale scale-75">
           <img src="https://www.tktkx.cn/logo.png" className="h-6" alt="security-1" />
           <img src="https://www.tktkx.cn/logo.png" className="h-6" alt="security-2" />
        </div>
      </footer>
    </div>
  );
}
