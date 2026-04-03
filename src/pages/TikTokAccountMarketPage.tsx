import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  HeadphonesIcon,
  Minus,
  Plus
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
];

export default function TikTokAccountMarketPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('us');
  const [selectedAccount, setSelectedAccount] = useState(accountTypes[0]);
  const [quantity, setQuantity] = useState(1);

  useSEO({
    title: 'TikTok账号购买市场 | 速锋科技',
    description: '专业的TikTok账号购买平台',
    canonical: 'https://www.tktkx.cn/tiktok-market'
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#333] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-[#eef1f6] py-2 px-6 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://www.tktkx.cn/logo.png" className="h-8 w-auto" alt="速锋科技" />
              <span className="text-lg font-bold text-[#1a56db]">速锋科技</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="bg-white border border-[#eef1f6] rounded-full px-4 py-1.5 flex items-center shadow-sm">
              <span className="text-[#999] mr-3">当前余额: <span className="text-[#1a56db] font-bold">¥ 0.00</span></span>
              <div className="w-[1px] h-3 bg-[#eee] mr-3" />
              <span className="font-medium text-[#333] flex items-center">
                {user?.username || '18264170234'} <ChevronRight className="h-3 w-3 ml-1 text-[#ccc]" />
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
          <span className="text-[#666] truncate">所有账号均为24小时自动发货。购买后请及时更改密码和邮箱。</span>
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

          {/* Form */}
          <section className="flex-1 bg-white rounded-lg border border-[#eef1f6] shadow-sm p-8 min-h-[600px] relative">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[#333] flex items-center">
                  <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 账号类型
                </label>
                <div className="relative">
                  <select className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] appearance-none outline-none">
                    <option>美国-满月白号 - [库存: 500]</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ccc] rotate-90" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[#333] flex items-center">
                  <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 购买数量
                </label>
                <div className="flex items-center space-x-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-[#f8f9fb] border border-[#eef1f6] rounded flex items-center justify-center hover:bg-gray-50">-</button>
                  <input type="number" value={quantity} readOnly className="w-20 bg-[#f8f9fb] border border-[#eef1f6] rounded py-2 text-center font-bold text-[#1a56db]" />
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-[#f8f9fb] border border-[#eef1f6] rounded flex items-center justify-center hover:bg-gray-50">+</button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[#333]">优惠券</label>
                <input placeholder="如有优惠券请输入" className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none" />
              </div>

              <div className="flex items-center space-x-2 py-2">
                <input type="checkbox" id="agree" className="w-4 h-4 border-[#ddd] rounded cursor-pointer" />
                <label htmlFor="agree" className="text-[12px] text-[#999] cursor-pointer">购买即视为同意服务协议</label>
              </div>

              <div className="flex items-center justify-between mt-10 border-t border-[#f5f7fa] pt-8 absolute bottom-8 left-8 right-8">
                <div className="flex items-baseline">
                  <span className="text-[#666] text-[14px] mr-2">支付金额：</span>
                  <span className="text-[#1a56db] font-bold text-2xl">¥ {(quantity * 9.00).toFixed(2)}</span>
                </div>
                <button className="bg-[#1a56db] text-white px-12 py-3 rounded text-[15px] font-bold hover:bg-[#154ec1] shadow-lg shadow-blue-200">
                  立即购买
                </button>
              </div>
            </div>
          </section>

          {/* Right */}
          <aside className="w-72 space-y-4 self-start sticky top-[70px]">
            <div className="bg-white rounded-lg border border-[#eef1f6] shadow-sm p-5">
              <h3 className="text-base font-bold text-[#333] mb-5">商品说明</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[13px] font-bold text-[#333]">美国-满月白号</p>
                  <p className="text-[11px] text-[#999] leading-relaxed bg-[#f8f9fb] p-3 rounded">注册满30天，权重稳定，适合开通橱窗。</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: <Clock />, label: '自动发货', desc: '发货方式' },
                    { icon: <ShieldCheck />, label: '24小时', desc: '售后时间' },
                    { icon: <TrendingUp />, label: '高权重', desc: '账号质量' },
                    { icon: <Zap />, label: '满30天', desc: '注册时间' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-[#eef1f6] rounded p-2.5 flex items-center">
                      <div className="bg-[#1a56db] p-1.5 rounded mr-3 text-white">
                        {Object.cloneElement(item.icon as React.ReactElement, { size: 14 })}
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
                  {['购买后请务必更改密码', '使用纯净住宅IP', '不要频繁切换设备'].map((note, idx) => (
                    <div key={idx} className="flex items-start text-[11px] text-[#666]">
                      <span className="text-[#ff4d4f] mr-1.5 font-bold">★</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button className="w-full bg-[#1a56db] text-white py-4 rounded-lg font-bold flex items-center justify-center shadow-md">
              <HeadphonesIcon className="h-4 w-4 mr-2" />
              订单售后客服
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}
