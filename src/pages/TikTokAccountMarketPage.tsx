import React, { useState } from 'react';
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
  HeadphonesIcon,
} from 'lucide-react';

// ─── 账号购买数据 ───────────────────────────────────────────
const accountCategories = [
  { id: 'us',         name: '美国账号',     icon: '🇺🇸' },
  { id: 'uk',         name: '英国账号',     icon: '🇬🇧' },
  { id: 'sea',        name: '东南亚账号',   icon: '🌏' },
  { id: 'eu',         name: '欧洲账号',     icon: '🇪🇺' },
  { id: 'full-moon',  name: '满月号/千粉号', icon: '🌕' },
  { id: 'natural',    name: '自然流账号',   icon: '🌱' },
];

const accountTypes = [
  { id: 1, title: '美国-满月白号',       region: 'US', tag: '邮箱号', price: 9.00,  stock: 500, description: '注册满30天，权重稳定，适合开通橱窗。' },
  { id: 2, title: '美国-橱窗号(1000粉)', region: 'US', tag: '橱窗号', price: 85.00, stock: 120, description: '已开通橱窗功能，自带1000+真实粉丝，拿到手即可带货。' },
  { id: 3, title: '英国-满月白号',       region: 'UK', tag: '邮箱号', price: 12.00, stock: 300, description: '注册满30天，英区高权重账号，适合开通英区店铺。' },
  { id: 4, title: '美区本土店(资料协助)', region: 'US', tag: '店铺',  price: 0,     stock: 999, description: '提供美区本土店注册全套资料支持，协助过审开通。' },
];

const accountInfoItems = [
  { Icon: Clock,       label: '自动发货', desc: '发货方式' },
  { Icon: ShieldCheck, label: '24小时',  desc: '售后时间' },
  { Icon: TrendingUp,  label: '高权重',  desc: '账号质量' },
  { Icon: Zap,         label: '满30天',  desc: '注册时间' },
];

// ─── 增粉服务数据 ───────────────────────────────────────────
const socialPlatforms = [
  { id: 'tiktok',    name: 'TikTok',    emoji: '🎵' },
  { id: 'instagram', name: 'Instagram', emoji: '📷' },
  { id: 'facebook',  name: 'Facebook',  emoji: '👤' },
  { id: 'youtube',   name: 'YouTube',   emoji: '▶️' },
  { id: 'twitter',   name: 'Twitter/X', emoji: '🐦' },
  { id: 'telegram',  name: '电报',      emoji: '✈️' },
  { id: 'kwai',      name: '快手',      emoji: '⚡' },
  { id: 'shopee',    name: 'Shopee',    emoji: '🛍️' },
  { id: 'whatsapp',  name: 'WhatsApp',  emoji: '📱' },
];

const servicesByPlatform: Record<string, { id: number; name: string; price: number; min: number; max: number }[]> = {
  tiktok: [
    { id: 4858, name: 'TikTok 粉丝 | 带头像真人粉 | 1-6小时启动 | 【0-10万】', price: 12.8772, min: 100, max: 100000 },
    { id: 4859, name: 'TikTok 点赞 | 真实点赞 | 快速启动 | 【0-5万】',           price: 3.5,     min: 100, max: 50000  },
    { id: 4860, name: 'TikTok 播放量 | 极速发货 | 【100-100万】',                 price: 1.2,     min: 100, max: 1000000 },
  ],
  instagram: [
    { id: 5001, name: 'Instagram 粉丝 | 真人粉 | 1-12小时启动 | 【100-5万】', price: 18.5, min: 100, max: 50000 },
    { id: 5002, name: 'Instagram 点赞 | 快速发货 | 【50-1万】',                price: 5.0,  min: 50,  max: 10000 },
  ],
  facebook: [
    { id: 6001, name: 'Facebook 主页点赞 | 真实用户 | 【100-1万】', price: 22.0, min: 100, max: 10000 },
  ],
  youtube: [
    { id: 7001, name: 'YouTube 订阅 | 真人订阅 | 【50-5万】',       price: 28.0, min: 50,  max: 50000   },
    { id: 7002, name: 'YouTube 播放量 | 极速发货 | 【500-100万】',   price: 2.5,  min: 500, max: 1000000 },
  ],
  twitter:   [{ id: 8001,  name: 'Twitter 粉丝 | 真实账号 | 【100-5万】',          price: 20.0, min: 100, max: 50000  }],
  telegram:  [{ id: 9001,  name: 'Telegram 频道会员 | 真实用户 | 【100-10万】',     price: 15.0, min: 100, max: 100000 }],
  kwai:      [{ id: 10001, name: '快手 粉丝 | 真实粉丝 | 【100-5万】',              price: 10.0, min: 100, max: 50000  }],
  shopee:    [{ id: 11001, name: 'Shopee 店铺关注 | 【50-1万】',                    price: 25.0, min: 50,  max: 10000  }],
  whatsapp:  [{ id: 12001, name: 'WhatsApp 群组成员 | 真实号码 | 【50-5000】',      price: 35.0, min: 50,  max: 5000   }],
};

const socialInfoItems = [
  { Icon: Clock,       label: '1-6小时', desc: '开始时间' },
  { Icon: ShieldCheck, label: '无',      desc: '有无保证' },
  { Icon: TrendingUp,  label: '10万/天', desc: '速度'     },
  { Icon: Zap,         label: '24小时',  desc: '平均时间' },
];

// ─── 侧边栏分组 ─────────────────────────────────────────────
type Mode = 'account' | 'social';

export default function TikTokAccountMarketPage() {
  const { user } = useAuth();

  // 当前模式：账号购买 or 增粉服务
  const [mode, setMode] = useState<Mode>('account');

  // 账号购买状态
  const [selectedCategory, setSelectedCategory]   = useState('us');
  const [selectedAccountId, setSelectedAccountId] = useState(1);
  const [quantity, setQuantity]                   = useState(1);

  // 增粉服务状态
  const [selectedPlatform, setSelectedPlatform]   = useState('tiktok');
  const [selectedServiceId, setSelectedServiceId] = useState(4858);
  const [links, setLinks]                         = useState('');
  const [socialQty, setSocialQty]                 = useState(1000);

  const selectedAccount = accountTypes.find(a => a.id === selectedAccountId) || accountTypes[0];
  const currentServices = servicesByPlatform[selectedPlatform] || [];
  const selectedService = currentServices.find(s => s.id === selectedServiceId) || currentServices[0];

  const handlePlatformChange = (id: string) => {
    setSelectedPlatform(id);
    const services = servicesByPlatform[id] || [];
    if (services.length > 0) {
      setSelectedServiceId(services[0].id);
      setSocialQty(services[0].min);
    }
  };

  useSEO({
    title: 'TikTok账号市场 & 社媒增粉 | 速锋科技',
    description: '专业TikTok账号购买平台，提供美区/英区满月白号、橱窗号（1000粉）、店铺开通，以及TikTok/Instagram/YouTube等平台增粉点赞服务。',
    canonical: 'https://www.tktkx.cn/tiktok-market',
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#333] font-sans">
      {/* ── Header ── */}
      <header className="bg-white border-b border-[#eef1f6] py-2 px-6 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[#1a56db]">速锋科技</span>
            </Link>
            <div className="bg-[#eef4ff] text-[#1a56db] text-[11px] px-2 py-0.5 rounded border border-[#dce8ff]">
              TikTok账号市场 · 安全 · 稳定 · 快速
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="bg-white border border-[#eef1f6] rounded-full px-4 py-1.5 flex items-center shadow-sm">
              <span className="text-[#999] mr-3">当前余额: <span className="text-[#1a56db] font-bold">¥ 0.00</span></span>
              <div className="w-[1px] h-3 bg-[#eee] mr-3" />
              <span className="font-medium text-[#333] flex items-center">
                {user?.username || '游客'} <ChevronRight className="h-3 w-3 ml-1 text-[#ccc]" />
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto py-4 px-4">
        {/* ── 公告 ── */}
        <div className="mb-3 space-y-2">
          <div className="bg-white border border-[#eef1f6] rounded px-4 py-2 flex items-center text-[13px] shadow-sm">
            <Volume2 className="h-4 w-4 text-[#999] mr-2 flex-shrink-0" />
            <span className="font-bold mr-2 text-[#333]">公告 | </span>
            <span className="text-[#666] truncate">所有账号均为24小时自动发货。购买后请及时更改密码和邮箱。如有问题请联系微信客服：SFTKTKTK</span>
          </div>
          <div className="bg-white border border-[#eef1f6] rounded px-4 py-2 flex items-center text-[13px] shadow-sm">
            <Bell className="h-4 w-4 text-[#999] mr-2 flex-shrink-0" />
            <span className="font-bold mr-2 text-[#333]">通知 | </span>
            <span className="text-[#666] truncate">目前TikTok粉丝服务全网风控，刷粉当天掉粉严重，不着急可以过几天再刷。</span>
          </div>
        </div>

        <div className="flex gap-4">
          {/* ── 左侧边栏 ── */}
          <aside className="w-52 bg-white rounded-lg border border-[#eef1f6] shadow-sm py-2 self-start sticky top-[70px]">

            {/* 分组标题：账号购买 */}
            <div
              className={`px-4 py-2 flex items-center justify-between cursor-pointer select-none ${
                mode === 'account' ? 'text-[#1a56db]' : 'text-[#999]'
              }`}
              onClick={() => setMode('account')}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest">📦 账号购买</span>
            </div>

            {accountCategories.map(c => (
              <button
                key={c.id}
                onClick={() => { setMode('account'); setSelectedCategory(c.id); }}
                className={`w-full flex items-center justify-between px-4 py-2 transition-all ${
                  mode === 'account' && selectedCategory === c.id
                    ? 'bg-[#eef4ff] text-[#1a56db]'
                    : 'text-[#666] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-base mr-2">{c.icon}</span>
                  <span className={`text-[12px] ${mode === 'account' && selectedCategory === c.id ? 'font-bold' : ''}`}>{c.name}</span>
                </div>
                <ChevronRight className={`h-3 w-3 ${mode === 'account' && selectedCategory === c.id ? 'text-[#1a56db]' : 'text-[#ddd]'}`} />
              </button>
            ))}

            {/* 分割线 */}
            <div className="mx-4 my-2 border-t border-[#f0f2f5]" />

            {/* 分组标题：增粉服务 */}
            <div
              className={`px-4 py-2 flex items-center justify-between cursor-pointer select-none ${
                mode === 'social' ? 'text-[#1a56db]' : 'text-[#999]'
              }`}
              onClick={() => setMode('social')}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest">🚀 增粉服务</span>
            </div>

            {socialPlatforms.map(p => (
              <button
                key={p.id}
                onClick={() => { setMode('social'); handlePlatformChange(p.id); }}
                className={`w-full flex items-center justify-between px-4 py-2 transition-all ${
                  mode === 'social' && selectedPlatform === p.id
                    ? 'bg-[#eef4ff] text-[#1a56db]'
                    : 'text-[#666] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-base mr-2">{p.emoji}</span>
                  <span className={`text-[12px] ${mode === 'social' && selectedPlatform === p.id ? 'font-bold' : ''}`}>{p.name}</span>
                </div>
                <ChevronRight className={`h-3 w-3 ${mode === 'social' && selectedPlatform === p.id ? 'text-[#1a56db]' : 'text-[#ddd]'}`} />
              </button>
            ))}
          </aside>

          {/* ── 中间表单 ── */}
          <section className="flex-1 bg-white rounded-lg border border-[#eef1f6] shadow-sm p-8 min-h-[600px] relative">

            {/* === 账号购买表单 === */}
            {mode === 'account' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 账号类型
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] appearance-none outline-none focus:border-[#1a56db]"
                      value={selectedAccountId}
                      onChange={e => setSelectedAccountId(Number(e.target.value))}
                    >
                      {accountTypes.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.title} {a.price > 0 ? `- [库存: ${a.stock}]` : '- [联系客服]'}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ccc] rotate-90" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 购买数量
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-[#f8f9fb] border border-[#eef1f6] rounded flex items-center justify-center hover:bg-gray-50 text-xl font-bold"
                    >-</button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-20 bg-[#f8f9fb] border border-[#eef1f6] rounded py-2 text-center font-bold text-[#1a56db]"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-[#f8f9fb] border border-[#eef1f6] rounded flex items-center justify-center hover:bg-gray-50 text-xl font-bold"
                    >+</button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333]">优惠券</label>
                  <input
                    placeholder="如有优惠券请输入"
                    className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none focus:border-[#1a56db]"
                  />
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <input type="checkbox" id="agree-account" className="w-4 h-4 border-[#ddd] rounded cursor-pointer" />
                  <label htmlFor="agree-account" className="text-[12px] text-[#999] cursor-pointer">购买即视为同意服务协议</label>
                </div>

                <div className="flex items-center justify-between border-t border-[#f5f7fa] pt-8 absolute bottom-8 left-8 right-8">
                  <div className="flex items-baseline">
                    <span className="text-[#666] text-[14px] mr-2">支付金额：</span>
                    {selectedAccount.price > 0 ? (
                      <span className="text-[#1a56db] font-bold text-2xl">¥ {(quantity * selectedAccount.price).toFixed(2)}</span>
                    ) : (
                      <span className="text-[#1a56db] font-bold text-2xl">联系客服报价</span>
                    )}
                  </div>
                  <a
                    href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a56db] text-white px-12 py-3 rounded text-[15px] font-bold hover:bg-[#154ec1] shadow-lg shadow-blue-200 inline-block text-center"
                  >
                    立即购买
                  </a>
                </div>
              </div>
            )}

            {/* === 增粉服务表单 === */}
            {mode === 'social' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 服务类型
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] appearance-none outline-none focus:border-[#1a56db]"
                      value={selectedServiceId}
                      onChange={e => setSelectedServiceId(Number(e.target.value))}
                    >
                      {currentServices.map(s => (
                        <option key={s.id} value={s.id}>{s.id} - {s.name}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ccc] rotate-90" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 链接
                  </label>
                  <textarea
                    value={links}
                    onChange={e => setLinks(e.target.value)}
                    placeholder="请输入账号/视频链接，一行一个，支持多链接"
                    className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none min-h-[120px] resize-none focus:border-[#1a56db]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 数量
                  </label>
                  <input
                    type="number"
                    value={socialQty}
                    onChange={e => setSocialQty(Number(e.target.value))}
                    className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none focus:border-[#1a56db]"
                  />
                  {selectedService && (
                    <p className="text-[#ff4d4f] text-[11px]">
                      最小: {selectedService.min} - 最大: {selectedService.max.toLocaleString()} (¥ {selectedService.price}/1000个)
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <input type="checkbox" id="agree-social" className="w-4 h-4 border-[#ddd] rounded cursor-pointer" />
                  <label htmlFor="agree-social" className="text-[12px] text-[#999] cursor-pointer">我确定已填写好的订单信息，并了解下单须知</label>
                </div>

                <div className="flex items-center justify-between border-t border-[#f5f7fa] pt-8 absolute bottom-8 left-8 right-8">
                  <div className="flex items-baseline">
                    <span className="text-[#666] text-[14px] mr-2">总金额：</span>
                    {selectedService ? (
                      <span className="text-[#1a56db] font-bold text-2xl">
                        ¥ {(socialQty / 1000 * selectedService.price).toFixed(4)}
                      </span>
                    ) : (
                      <span className="text-[#1a56db] font-bold text-2xl">联系客服</span>
                    )}
                  </div>
                  <a
                    href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a56db] text-white px-10 py-3 rounded text-[15px] font-bold hover:bg-[#154ec1] transition-colors shadow-lg shadow-blue-200 inline-block text-center"
                  >
                    立即下单
                  </a>
                </div>
              </div>
            )}
          </section>

          {/* ── 右侧面板（随mode切换内容） ── */}
          <aside className="w-72 space-y-4 self-start sticky top-[70px]">

            {/* 账号购买说明 */}
            {mode === 'account' && (
              <div className="bg-white rounded-lg border border-[#eef1f6] shadow-sm p-5">
                <h3 className="text-base font-bold text-[#333] mb-5">商品说明</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[13px] font-bold text-[#333]">{selectedAccount.title}</p>
                    <p className="text-[11px] text-[#999] leading-relaxed bg-[#f8f9fb] p-3 rounded">{selectedAccount.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {accountInfoItems.map((item, idx) => (
                      <div key={idx} className="bg-white border border-[#eef1f6] rounded p-2.5 flex items-center">
                        <div className="bg-[#1a56db] p-1.5 rounded mr-3 text-white">
                          <item.Icon size={14} />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[#333] leading-none mb-1">{item.label}</div>
                          <div className="text-[10px] text-[#ccc] leading-none">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-2">
                    <p className="text-[12px] font-bold text-[#333]">⚠️ 注意事项：</p>
                    {['购买后请务必更改密码', '使用纯净住宅IP登录', '不要频繁切换设备', '如遇问题请联系客服SFTKTKTK'].map((note, idx) => (
                      <div key={idx} className="flex items-start text-[11px] text-[#666]">
                        <span className="text-[#ff4d4f] mr-1.5 font-bold">★</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 增粉服务说明 */}
            {mode === 'social' && (
              <div className="bg-white rounded-lg border border-[#eef1f6] shadow-sm p-5">
                <h3 className="text-base font-bold text-[#333] mb-5">服务说明</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[13px] font-bold text-[#333]">示例链接 (PC端)</p>
                    <div className="bg-[#f8f9fb] border border-[#eef1f6] rounded p-3 flex items-center justify-between">
                      <span className="text-[12px] text-[#999] truncate">https://www.tiktok.com/@用户名</span>
                      <ExternalLink className="h-3 w-3 text-[#ccc] flex-shrink-0 ml-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {socialInfoItems.map((item, idx) => (
                      <div key={idx} className="bg-white border border-[#eef1f6] rounded p-2.5 flex items-center">
                        <div className="bg-[#1a56db] p-1.5 rounded mr-3 text-white flex-shrink-0">
                          <item.Icon size={14} />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[#333] leading-none mb-1">{item.label}</div>
                          <div className="text-[10px] text-[#ccc] leading-none">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-2">
                    <p className="text-[12px] font-bold text-[#333]">⚠️ 注意：</p>
                    {[
                      '下单前请仔细检查链接格式。',
                      '请确保账户是公开状态，不是私密账号。',
                      '禁止在服务中途更改用户名！',
                      '同链接同服务重复下单概不退款。',
                    ].map((note, idx) => (
                      <div key={idx} className="flex items-start text-[11px] text-[#666]">
                        <span className="text-[#ff4d4f] mr-1.5 font-bold flex-shrink-0">★</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 联系我们（始终显示） */}
            <div className="bg-white rounded-lg border border-[#eef1f6] shadow-sm p-4 space-y-3">
              <h4 className="text-[13px] font-bold text-[#333]">联系我们</h4>
              <a
                href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#07c160] text-white py-3 rounded-lg font-bold flex items-center justify-center hover:bg-[#06ad56] transition-all shadow-sm text-[14px]"
              >
                <span className="mr-2">💬</span> 微信客服 SFTKTKTK
              </a>
              <a
                href="https://t.me/TRXBGB"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#229ED9] text-white py-3 rounded-lg font-bold flex items-center justify-center hover:bg-[#1a8bc4] transition-all shadow-sm text-[14px]"
              >
                <span className="mr-2">✈️</span> Telegram @TRXBGB
              </a>
            </div>

            <button className="w-full bg-[#1a56db] text-white py-4 rounded-lg font-bold flex items-center justify-center shadow-md hover:bg-[#154ec1] transition-all">
              <HeadphonesIcon className="h-4 w-4 mr-2" />
              订单售后客服
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}
