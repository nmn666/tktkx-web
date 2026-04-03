import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { useSEO } from '@/hooks/useSEO';
import {
  MessageSquare,
  Globe,
  ChevronRight,
  Volume2,
  Bell,
  Clock,
  ShieldCheck,
  TrendingUp,
  Zap,
  ExternalLink,
  HeadphonesIcon
} from 'lucide-react';

// 平台分类
const platforms = [
  { id: 'tiktok', name: '抖音', icon: 'https://cdn.icon-icons.com/icons2/2972/PNG/512/tiktok_logo_icon_186896.png' },
  { id: 'instagram', name: 'Instagram', icon: 'https://cdn.icon-icons.com/icons2/1211/PNG/512/1491580635-yumminkicontentstickersocial16_79457.png' },
  { id: 'facebook', name: 'Facebook', icon: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_logo_icon_145924.png' },
  { id: 'youtube', name: 'YouTube', icon: 'https://cdn.icon-icons.com/icons2/1211/PNG/512/1491579517-yumminkicontentstickersocial02_79447.png' },
  { id: 'twitter', name: '讯讯嘀嘀', icon: 'https://cdn.icon-icons.com/icons2/1183/PNG/512/1490133460-social-icons01_82210.png' },
  { id: 'telegram', name: '电报', icon: 'https://cdn.icon-icons.com/icons2/2993/PNG/512/telegram_logo_icon_187313.png' },
  { id: 'kwai', name: '快', icon: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/kwai_logo_icon_145904.png' },
  { id: 'shopee', name: 'Shopee', icon: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/shopee_logo_icon_145902.png' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'https://cdn.icon-icons.com/icons2/1211/PNG/512/1491580651-yumminkicontentstickersocial06_79448.png' },
];

const services = [
  { id: 4858, name: 'TikTok 粉丝 | 带头像真人粉 | 1-6小时启动 | 无任何售后 ⚠️ | 【0-10万】', price: 12.8772, min: 100, max: 100000 },
];

export default function SocialMediaServicesPage() {
  const { user } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok');
  const [links, setLinks] = useState('');
  const [quantity, setQuantity] = useState(1000);

  useSEO({
    title: '海外社媒服务 | 速锋科技',
    description: '专业的海外社媒服务平台',
    canonical: 'https://www.tktkx.cn/social-media-services'
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
            <div className="bg-[#eef4ff] text-[#1a56db] text-[11px] px-2 py-0.5 rounded border border-[#dce8ff]">
              跨境资源网，致力于跨境电商产业增长
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white border border-[#eef1f6] rounded-full px-4 py-1.5 flex items-center shadow-sm">
              <span className="text-[#999] text-xs mr-3">当前余额: <span className="text-[#1a56db] font-bold">¥ 0.00</span></span>
              <div className="w-[1px] h-3 bg-[#eee] mr-3" />
              <span className="text-xs font-medium text-[#333] flex items-center">
                {user?.username || '18264170234'} <ChevronRight className="h-3 w-3 ml-1 text-[#ccc]" />
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto py-4 px-4">
        {/* Notices */}
        <div className="mb-4 space-y-2">
          <div className="bg-white border border-[#eef1f6] rounded px-4 py-2 flex items-center justify-between text-[13px] shadow-sm">
            <div className="flex items-center overflow-hidden">
              <Volume2 className="h-4 w-4 text-[#999] mr-2 flex-shrink-0" />
              <span className="font-bold mr-2 text-[#333]">公告 | </span>
              <span className="text-[#666] truncate">严禁进行任何违法犯罪活动。本站不提供任何中国大陆业务...</span>
            </div>
            <button className="text-[#1a56db] font-medium flex-shrink-0 ml-4">展开</button>
          </div>
          <div className="bg-white border border-[#eef1f6] rounded px-4 py-2 flex items-center justify-between text-[13px] shadow-sm">
            <div className="flex items-center overflow-hidden">
              <Bell className="h-4 w-4 text-[#999] mr-2 flex-shrink-0" />
              <span className="font-bold mr-2 text-[#333]">通知 | </span>
              <span className="text-[#666] truncate">目前抖音粉丝服务全网风控，刷粉当天掉粉严重，不着急可以过几天再刷。</span>
            </div>
            <button className="text-[#1a56db] font-medium flex-shrink-0 ml-4">展开</button>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="w-52 bg-white rounded-lg border border-[#eef1f6] shadow-sm py-2 self-start sticky top-[70px]">
            {platforms.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 transition-all ${
                  selectedPlatform === p.id 
                  ? 'bg-[#eef4ff] text-[#1a56db]' 
                  : 'text-[#666] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <img src={p.icon} className="w-5 h-5 mr-3 object-contain" alt={`${p.name} 平台图标`} />
                  <span className={`text-[13px] ${selectedPlatform === p.id ? 'font-bold' : ''}`}>{p.name}</span>
                </div>
                <ChevronRight className={`h-3 w-3 ${selectedPlatform === p.id ? 'text-[#1a56db]' : 'text-[#ddd]'}`} />
              </button>
            ))}
          </aside>

          {/* Center Form */}
          <section className="flex-1 bg-white rounded-lg border border-[#eef1f6] shadow-sm p-8 min-h-[600px] relative">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[#333] flex items-center">
                  <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 类别
                </label>
                <div className="relative">
                  <select className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] appearance-none outline-none focus:border-[#1a56db]">
                    <option>🎵 TikTok - 粉丝</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ccc] rotate-90" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 服务
                  </label>
                  <button className="text-[#1a56db] text-[12px]">更多筛选</button>
                </div>
                <div className="relative">
                  <select className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] appearance-none outline-none focus:border-[#1a56db]">
                    <option>4858 - 🟢 TikTok 粉丝 | 带头像真人粉 | 1-6小时启动 | 无售后</option>
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
                  onChange={(e) => setLinks(e.target.value)}
                  placeholder="一行一个支持多链接"
                  className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none min-h-[140px] resize-none focus:border-[#1a56db]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[#333] flex items-center">
                  <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 数量
                </label>
                <input 
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none focus:border-[#1a56db]"
                />
                <p className="text-[#ff4d4f] text-[11px] mt-1">最小: 10 - 最大: 5000000 (¥ 12.8772/1000个)</p>
              </div>

              <div className="flex items-center space-x-2 py-2">
                <input type="checkbox" id="agree" className="w-4 h-4 border-[#ddd] rounded cursor-pointer" />
                <label htmlFor="agree" className="text-[12px] text-[#999] cursor-pointer">我确定已填写好的订单信息！并了解下单须知</label>
              </div>

              <div className="flex items-center justify-between mt-10 border-t border-[#f5f7fa] pt-8 absolute bottom-8 left-8 right-8">
                <div className="flex items-baseline">
                  <span className="text-[#666] text-[14px] mr-2">总金额：</span>
                  <span className="text-[#1a56db] font-bold text-2xl">¥ {(quantity / 1000 * 12.8772).toFixed(4)}</span>
                </div>
                <button className="bg-[#1a56db] text-white px-10 py-3 rounded text-[15px] font-bold hover:bg-[#154ec1] transition-colors shadow-lg shadow-blue-200">
                  立即下单
                </button>
              </div>
            </div>
          </section>

          {/* Right Panel */}
          <aside className="w-72 space-y-4 self-start sticky top-[70px]">
            <div className="bg-white rounded-lg border border-[#eef1f6] shadow-sm p-5">
              <h3 className="text-base font-bold text-[#333] mb-5">服务说明</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[13px] font-bold text-[#333]">示例链接 (PC端)</p>
                  <div className="bg-[#f8f9fb] border border-[#eef1f6] rounded p-3 flex items-center justify-between">
                    <span className="text-[12px] text-[#999] truncate">https://www.tiktok.com/@用户名</span>
                    <ExternalLink className="h-3 w-3 text-[#ccc]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: <Clock />, label: '1-6小时', desc: '开始时间' },
                    { icon: <ShieldCheck />, label: '无', desc: '有无保证' },
                    { icon: <TrendingUp />, label: '10万/天', desc: '速度' },
                    { icon: <Zap />, label: '24小时', desc: '平均时间' },
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

                <div className="space-y-3 pt-4">
                  <p className="text-[13px] font-bold text-[#333]">说明</p>
                  <div className="bg-gray-50 border border-dashed border-[#ddd] p-3 rounded text-[11px] text-[#999] leading-relaxed">
                    🔗 链接格式：查看上方示例链接 或 联系左下角客服咨询链接格式
                  </div>
                  
                  <div className="space-y-2.5">
                    <p className="text-[12px] font-bold text-[#333]">⚠️ 注意：</p>
                    {[
                      '下单前请仔细检查链接格式。',
                      '请确保账户是公开的，而不是公开的。',
                      '禁止在服务中途更改用户名！',
                      '如服务集中时，操作的启动速度会发生变化。',
                      '在系统中完成第一个订单之前，不要重下订单。',
                      '同链接同服务重复下单概不退款。'
                    ].map((note, idx) => (
                      <div key={idx} className="flex items-start text-[11px] text-[#666]">
                        <span className="text-[#ff4d4f] mr-1.5 font-bold">★</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#1a56db] text-white py-4 rounded-lg font-bold flex items-center justify-center hover:bg-[#154ec1] transition-all shadow-md">
              <HeadphonesIcon className="h-4 w-4 mr-2" />
              订单售后客服
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}
