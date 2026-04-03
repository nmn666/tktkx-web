import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronRight,
  Volume2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Zap,
  HeadphonesIcon,
} from 'lucide-react';

const categories = [
  { id: 'us', name: '美国账号', icon: '🇺🇸' },
  { id: 'uk', name: '英国账号', icon: '🇬🇧' },
  { id: 'sea', name: '东南亚账号', icon: '🌏' },
  { id: 'eu', name: '欧洲账号', icon: '🇪🇺' },
  { id: 'full-moon', name: '满月号/千粉号', icon: '🌕' },
  { id: 'natural', name: '自然流账号', icon: '🌱' },
];

const accountTypes = [
  { id: 1, title: '美国-满月白号', region: 'US', tag: '邮箱号', price: 9.00, stock: 500, description: '注册满30天，权重稳定，适合开通橱窗。' },
  { id: 2, title: '美国-橱窗号(1000粉)', region: 'US', tag: '橱窗号', price: 85.00, stock: 120, description: '已开通橱窗功能，自带1000+真实粉丝，拿到手即可带货。' },
  { id: 3, title: '英国-满月白号', region: 'UK', tag: '邮箱号', price: 12.00, stock: 300, description: '注册满30天，英区高权重账号，适合开通英区店铺。' },
  { id: 4, title: '美区本土店(资料协助)', region: 'US', tag: '店铺', price: 0, stock: 999, description: '提供美区本土店注册全套资料支持，协助过审开通。' },
];

const infoItems = [
  { icon: Clock, label: '自动发货', desc: '发货方式' },
  { icon: ShieldCheck, label: '24小时', desc: '售后时间' },
  { icon: TrendingUp, label: '高权重', desc: '账号质量' },
  { icon: Zap, label: '满30天', desc: '注册时间' },
];

export default function TikTokAccountMarketPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('us');
  const [selectedAccountId, setSelectedAccountId] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const selectedAccount = accountTypes.find(a => a.id === selectedAccountId) || accountTypes[0];

  useSEO({
    title: 'TikTok账号购买市场 | 速锋科技',
    description: '专业TikTok账号购买平台，提供美区/英区满月白号、橱窗号（1000粉）、千粉号、店铺开通等服务。安全稳定，24小时自动发货。',
    canonical: 'https://www.tktkx.cn/tiktok-market'
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#333] font-sans">
      {/* Header */}
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
        {/* Notice */}
        <div className="mb-4 bg-white border border-[#eef1f6] rounded px-4 py-2 flex items-center text-[13px] shadow-sm">
          <Volume2 className="h-4 w-4 text-[#999] mr-2 flex-shrink-0" />
          <span className="font-bold mr-2 text-[#333]">公告 | </span>
          <span className="text-[#666] truncate">所有账号均为24小时自动发货。购买后请及时更改密码和邮箱。如有问题请联系微信客服：SFTKTKTK</span>
        </div>

        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="w-52 bg-white rounded-lg border border-[#eef1f6] shadow-sm py-2 self-start sticky top-[70px]">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 transition-all ${
                  selectedCategory === c.id
                    ? 'bg-[#eef4ff] text-[#1a56db]'
                    : 'text-[#666] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">{c.icon}</span>
                  <span className={`text-[13px] ${selectedCategory === c.id ? 'font-bold' : ''}`}>{c.name}</span>
                </div>
                <ChevronRight className={`h-3 w-3 ${selectedCategory === c.id ? 'text-[#1a56db]' : 'text-[#ddd]'}`} />
              </button>
            ))}
          </aside>

          {/* Center Form */}
          <section className="flex-1 bg-white rounded-lg border border-[#eef1f6] shadow-sm p-8 min-h-[600px] relative">
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
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-20 bg-[#f8f9fb] border border-[#eef1f6] rounded py-2 text-center font-bold text-[#1a56db]"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-[#f8f9fb] border border-[#eef1f6] rounded flex items-center justify-center hover:bg-gray-50 text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[#333]">优惠券</label>
                <input placeholder="如有优惠券请输入" className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none focus:border-[#1a56db]" />
              </div>

              <div className="flex items-center space-x-2 py-2">
                <input type="checkbox" id="agree" className="w-4 h-4 border-[#ddd] rounded cursor-pointer" />
                <label htmlFor="agree" className="text-[12px] text-[#999] cursor-pointer">购买即视为同意服务协议</label>
              </div>

              <div className="flex items-center justify-between mt-10 border-t border-[#f5f7fa] pt-8 absolute bottom-8 left-8 right-8">
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
          </section>

          {/* Right Panel */}
          <aside className="w-72 space-y-4 self-start sticky top-[70px]">
            <div className="bg-white rounded-lg border border-[#eef1f6] shadow-sm p-5">
              <h3 className="text-base font-bold text-[#333] mb-5">商品说明</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[13px] font-bold text-[#333]">{selectedAccount.title}</p>
                  <p className="text-[11px] text-[#999] leading-relaxed bg-[#f8f9fb] p-3 rounded">{selectedAccount.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {infoItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="bg-white border border-[#eef1f6] rounded p-2.5 flex items-center">
                        <div className="bg-[#1a56db] p-1.5 rounded mr-3 text-white">
                          <Icon size={14} />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[#333] leading-none mb-1">{item.label}</div>
                          <div className="text-[10px] text-[#ccc] leading-none">{item.desc}</div>
                        </div>
                      </div>
                    );
                  })}
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

            {/* Contact */}
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
