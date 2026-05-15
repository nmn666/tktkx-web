import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';

// ─── 账号购买数据 ───────────────────────────────────────────
const accountCategories = [
  { id: 'all',        name: '全部账号',       icon: '🌐' },
  { id: 'hot',        name: '热销爆款',       icon: '🔥' },
  { id: 'full-moon',  name: '满月号/千粉号',  icon: '🌕' },
  { id: 'us',         name: '美国区',         icon: '🇺🇸' },
  { id: 'uk',         name: '英国区',         icon: '🇬🇧' },
  { id: 'sea',        name: '东南亚区',       icon: '🌏' },
  { id: 'eu',         name: '欧洲区',         icon: '🇪🇺' },
  { id: 'me',         name: '中东区',         icon: '🌙' },
  { id: 'ads',        name: '广告/企业号',     icon: '📊' },
  { id: 'high-fan',   name: '高粉/基金号',    icon: '📈' },
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
  { id: 38,  title: '菲律宾-满月白号',           region: 'sea|all',             tag: '邮箱号',  price: 7,    stock: 250, description: '菲区满月号，适合菲区内容获客。' },
  { id: 39,  title: '菲律宾-橱窗号',             region: 'sea|all',             tag: '橱窗号',  price: 75,   stock: 40,  description: '菲区千粉号，适合东南亚跨境电商运营。' },

  // ── 欧洲区 (EU) ────────────────────────────────────────
  { id: 50,  title: '德国-权重满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 120, description: '德区权重满月号，适合针对高净值德语用户进行内容创作。' },
  { id: 51,  title: '法国-权重满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 130, description: '法区权重满月号，适合时尚、美妆等品类在法国市场的推广。' },
  { id: 52,  title: '意大利-权重满月白号',       region: 'eu|all',              tag: '邮箱号',  price: 13,   stock: 110, description: '意区权重满月号。' },
  { id: 53,  title: '西班牙-权重满月白号',       region: 'eu|all',              tag: '邮箱号',  price: 12,   stock: 100, description: '西区权重满月号。' },

  // ── 中东区 (ME) ────────────────────────────────────────
  { id: 90,  title: '沙特-权重满月白号',         region: 'me|all',              tag: '邮箱号',  price: 18,   stock: 150, description: '沙特区权重号，中东土豪金区，流量价值极高。' },
  { id: 91,  title: '沙特-1000粉橱窗号',         region: 'me|all',              tag: '橱窗号',  price: 128,  stock: 30,  description: '沙特橱窗号，高客单价蓝海市场带货神器。' },

  // ── 特色账号 ──────────────────────────────────────────
  { id: 180, title: 'TikTok 1万粉 (创作基金号)',  region: 'high-fan|all',         tag: '基金号',  price: 850,  stock: 10,  description: '【旗舰精品】自带1万真实粉丝，已成功开通Creator Fund，视频播放即可产生美金收益。' },
  { id: 181, title: 'TikTok 1万粉 (无基金纯粉)',  region: 'high-fan|all',         tag: '高粉号',  price: 580,  stock: 15,  description: '自带1万粉丝，无违规，适合作为品牌主号或快速起号的中转号。' },
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
  { id: 'telegram',  name: '电报',      emoji: '✈️' },
];

const servicesByPlatform: Record<string, { id: number; name: string; price: number; min: number; max: number }[]> = {
  tiktok: [
    { id: 4858, name: 'TikTok 粉丝 | 真实头像粉 | 极速启动', price: 12.87, min: 100, max: 100000 },
    { id: 4859, name: 'TikTok 点赞 | 真人交互 | 稳定不掉', price: 3.5,   min: 100, max: 50000  },
    { id: 4860, name: 'TikTok 播放量 | 万次起刷 | 提升权重', price: 0.12,  min: 1000, max: 5000000 },
    { id: 4861, name: 'TikTok 分享/收藏 | 触发推荐机制', price: 2.5,   min: 100, max: 10000 },
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
    { id: 7002, name: 'YouTube 播放量 | 提升搜索排名', price: 2.5,  min: 500, max: 1000000 },
  ],
  twitter:   [{ id: 8001,  name: 'Twitter(X) 粉丝 | 精准账号关注', price: 20.0, min: 100, max: 50000 }],
  telegram:  [{ id: 9001,  name: 'Telegram 频道/群组成员', price: 15.0, min: 100, max: 100000 }],
};

const socialInfoItems = [
  { Icon: Clock,       label: '1-3小时', desc: '平均启动' },
  { Icon: ShieldCheck, label: '售后补偿', desc: '掉粉包补' },
  { Icon: TrendingUp,  label: '拟人增长', desc: '安全策略' },
  { Icon: Zap,         label: '24/7',    desc: '全天运行' },
];

type Mode = 'account' | 'social';

export default function TikTokAccountMarketPage() {
  const [mode, setMode] = useState<Mode>('account');
  const [selectedCategory, setSelectedCategory]   = useState('hot');
  const [selectedAccountId, setSelectedAccountId] = useState(1);
  const [quantity, setQuantity]                   = useState(1);
  const [selectedPlatform, setSelectedPlatform]   = useState('tiktok');
  const [selectedServiceId, setSelectedServiceId] = useState(4858);
  const [socialQty, setSocialQty]                 = useState(1000);

  const filteredAccountTypes = useMemo(() => 
    accountTypes.filter(a => a.region.split('|').includes(selectedCategory)),
    [selectedCategory]
  );

  const selectedAccount = useMemo(() => 
    accountTypes.find(a => a.id === selectedAccountId) || filteredAccountTypes[0] || accountTypes[0],
    [selectedAccountId, filteredAccountTypes]
  );

  const currentServices = servicesByPlatform[selectedPlatform] || [];
  const selectedService = currentServices.find(s => s.id === selectedServiceId) || currentServices[0];

  const totalPrice = mode === 'account' 
    ? (selectedAccount.price * quantity) 
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

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#333] font-sans pb-20">
      {/* ── Header ── */}
      <header className="bg-white border-b border-[#eef1f6] py-3 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-black text-[#1a56db] tracking-tighter">速锋科技</span>
            </Link>
            <div className="hidden sm:block h-4 w-px bg-gray-200" />
            <div className="hidden sm:flex items-center text-[#1a56db] text-[12px] font-bold">
              <ShieldCheck className="h-3 w-3 mr-1" /> TikTok跨境出海一级市场
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <a
              href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a56db] hover:bg-[#1e429f] text-white rounded-lg px-5 py-2 flex items-center shadow-md transition-all font-bold"
            >
              <MessageSquare className="h-4 w-4 mr-2" /> 官方客服 (微信)
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto py-6 px-4">
        {/* ── 公告栏 ── */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center text-[13px]">
            <Volume2 className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 animate-pulse" />
            <p className="text-blue-900 font-medium">
              <span className="font-black mr-2">【公告】</span> 
              所有账号均为24小时自动发货。下单后请查看注册邮箱或订单详情。
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-center text-[13px]">
            <Bell className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
            <p className="text-amber-900 font-medium">
              <span className="font-black mr-2">【通知】</span> 
              新购账号建议使用目标国家原生独立IP，切勿频繁切换IP，以免触发风控。
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── 左侧边栏导航 ── */}
          <aside className="w-full lg:w-56 space-y-2 self-start lg:sticky lg:top-[84px]">
            <div className="bg-white rounded-xl border border-[#eef1f6] shadow-sm p-2 overflow-hidden">
              <div className="px-3 py-2 text-[12px] font-bold text-gray-400 uppercase tracking-widest">业务板块</div>
              <button
                onClick={() => setMode('account')}
                className={`w-full px-4 py-3 rounded-lg flex items-center transition-all ${
                  mode === 'account' ? 'bg-[#1a56db] text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Globe className="h-4 w-4 mr-3" />
                <span className="text-[14px] font-bold">账号市场</span>
              </button>
              <button
                onClick={() => setMode('social')}
                className={`w-full px-4 py-3 rounded-lg flex items-center transition-all mt-1 ${
                  mode === 'social' ? 'bg-[#1a56db] text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-3" />
                <span className="text-[14px] font-bold">增粉服务</span>
              </button>
            </div>

            {mode === 'account' && (
              <div className="bg-white rounded-xl border border-[#eef1f6] shadow-sm p-2">
                <div className="px-3 py-2 text-[12px] font-bold text-gray-400 uppercase tracking-widest">账号地区分类</div>
                {accountCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      const filtered = accountTypes.filter(a => a.region.split('|').includes(cat.id));
                      if (filtered.length > 0) setSelectedAccountId(filtered[0].id);
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg flex items-center justify-between transition-all mt-0.5 ${
                      selectedCategory === cat.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-base">{cat.icon}</span>
                      <span className="text-[13px]">{cat.name}</span>
                    </div>
                    {selectedCategory === cat.id && <ChevronRight className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            )}

            {mode === 'social' && (
              <div className="bg-white rounded-xl border border-[#eef1f6] shadow-sm p-2">
                <div className="px-3 py-2 text-[12px] font-bold text-gray-400 uppercase tracking-widest">平台分类</div>
                {socialPlatforms.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handlePlatformChange(p.id)}
                    className={`w-full px-4 py-2.5 rounded-lg flex items-center justify-between transition-all mt-0.5 ${
                      selectedPlatform === p.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-base">{p.emoji}</span>
                      <span className="text-[13px]">{p.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </aside>

          {/* ── 中间主区域 ── */}
          <section className="flex-1 space-y-6">
            <div className="bg-white rounded-2xl border border-[#eef1f6] shadow-sm overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-black mb-6 flex items-center">
                  {mode === 'account' ? (
                    <><Globe className="h-5 w-5 mr-2 text-blue-600" /> 选购 TikTok 优质账号</>
                  ) : (
                    <><TrendingUp className="h-5 w-5 mr-2 text-blue-600" /> 配置增粉推广服务</>
                  )}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 表单部分 */}
                  <div className="space-y-6">
                    {mode === 'account' ? (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">账号类型</label>
                          <select
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                            value={selectedAccountId}
                            onChange={e => setSelectedAccountId(Number(e.target.value))}
                          >
                            {filteredAccountTypes.map(a => (
                              <option key={a.id} value={a.id}>
                                {a.title} {a.price > 0 ? `(¥${a.price})` : '(联系客服)'}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">购买数量</label>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 text-xl font-bold"
                            >-</button>
                            <input
                              type="number"
                              value={quantity}
                              onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                              className="w-20 bg-gray-50 border border-gray-200 rounded-xl py-3 text-center font-black text-blue-600 text-lg"
                            />
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 text-xl font-bold"
                            >+</button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">服务项目</label>
                          <select
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                            value={selectedServiceId}
                            onChange={e => setSelectedServiceId(Number(e.target.value))}
                          >
                            {currentServices.map(s => (
                              <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">链接 / ID</label>
                          <input
                            placeholder="请输入作品链接或主页ID"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 text-flex items-center justify-between flex">
                            <span>下单数量</span>
                            <span className="text-[11px] font-normal text-gray-400">最小: {selectedService?.min} / 最大: {selectedService?.max}</span>
                          </label>
                          <input
                            type="number"
                            value={socialQty}
                            onChange={e => setSocialQty(Number(e.target.value))}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-blue-600"
                          />
                        </div>
                      </>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-medium">总计金额</span>
                        <div className="text-right">
                          <span className="text-3xl font-black text-blue-600">¥ {totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-black text-lg shadow-lg shadow-blue-100 transition-all flex items-center justify-center">
                        立即下单 <Zap className="h-5 w-5 ml-2 fill-current" />
                      </button>
                      <p className="mt-4 text-[11px] text-gray-400 text-center">支付即视为同意《速锋科技服务协议》与《账号使用规范》</p>
                    </div>
                  </div>

                  {/* 详情与参数部分 */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-black text-gray-900 mb-4 flex items-center">
                      <Info className="h-4 w-4 mr-2 text-blue-600" /> 
                      {mode === 'account' ? '账号详情说明' : '服务参数详情'}
                    </h3>
                    
                    {mode === 'account' ? (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                          <div className="text-[11px] font-bold text-blue-600 uppercase mb-1">{selectedAccount.tag}</div>
                          <div className="text-lg font-black text-gray-900 mb-2">{selectedAccount.title}</div>
                          <p className="text-sm text-gray-600 leading-relaxed">{selectedAccount.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {accountInfoItems.map((item, i) => (
                            <div key={i} className="bg-white rounded-xl p-3 border border-gray-200 flex items-center">
                              <item.Icon className="h-5 w-5 text-blue-500 mr-3" />
                              <div>
                                <div className="text-[10px] text-gray-400 font-bold">{item.desc}</div>
                                <div className="text-xs font-black text-gray-800">{item.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                          <div className="text-lg font-black text-gray-900 mb-2">{selectedService?.name}</div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">单位单价 (每千)</span>
                            <span className="font-black text-blue-600">¥ {selectedService?.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {socialInfoItems.map((item, i) => (
                            <div key={i} className="bg-white rounded-xl p-3 border border-gray-200 flex items-center">
                              <item.Icon className="h-5 w-5 text-blue-500 mr-3" />
                              <div>
                                <div className="text-[10px] text-gray-400 font-bold">{item.desc}</div>
                                <div className="text-xs font-black text-gray-800">{item.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-blue-600/5 border border-blue-600/10 rounded-xl">
                      <h4 className="text-[12px] font-black text-blue-700 mb-2 flex items-center">
                        <ShieldCheck className="h-3 w-3 mr-1.5" /> 质量与安全承诺
                      </h4>
                      <ul className="text-[11px] text-blue-600/80 space-y-1.5">
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 mr-2" /> 账号均为2FA加密验证，防盗性极强</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 mr-2" /> 100% 模拟真实用户手机注册环境</li>
                        <li className="flex items-center"><CheckCircle2 className="h-3 w-3 mr-2" /> 售后24小时内封禁无理由包换</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 账号使用规范 ── */}
            <div className="bg-white rounded-2xl border border-[#eef1f6] shadow-sm p-8">
              <h3 className="text-lg font-black mb-6 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" /> 账号使用安全指南 (新手必读)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold">1</div>
                  <h4 className="font-black text-sm">IP与网络环境</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">必须使用账号所属国家的“原生住宅IP”。切勿使用市面低质公用梯子，多人共用IP极易导致账号封禁或0播放。</p>
                </div>
                <div className="space-y-3">
                  <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold">2</div>
                  <h4 className="font-black text-sm">资料更改策略</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">建议登录后24小时后再进行改密、换绑邮箱等操作。资料分批更改，切勿一次性修改所有设置。</p>
                </div>
                <div className="space-y-3">
                  <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold">3</div>
                  <h4 className="font-black text-sm">售后处理流程</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">首登封禁、密码错误、无法验证等问题，请在24小时内截图联系微信客服补发，过期或因违规操作导致不予售后。</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 右侧悬浮窗 (大屏可见) ── */}
          <aside className="hidden xl:block w-64 space-y-4">
            <div className="bg-gradient-to-br from-[#1a56db] to-[#1e429f] rounded-2xl p-6 text-white shadow-xl shadow-blue-100 sticky top-[84px]">
              <h3 className="text-lg font-black mb-2">需要批量采购？</h3>
              <p className="text-[12px] opacity-80 mb-6 leading-relaxed">单次采购超过 50 个账号可申请大客户批发价，并获得独立的技术支持频道。</p>
              <a 
                href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d" 
                className="block w-full bg-white text-[#1a56db] text-center py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors shadow-lg"
              >
                联系批发专员
              </a>
              <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-3 opacity-60" />
                  <div>
                    <div className="text-[10px] opacity-60">Telegram</div>
                    <div className="text-xs font-bold">@TRXBGB</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-3 opacity-60" />
                  <div>
                    <div className="text-[10px] opacity-60">官方微信</div>
                    <div className="text-xs font-bold">SFTKTKTK</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-12 text-center">
        <div className="text-[12px] text-gray-400 font-medium">
          © 2026 速锋科技 TKTKX.CN · 跨境出海账号服务一级供应商
        </div>
      </footer>
    </div>
  );
}
