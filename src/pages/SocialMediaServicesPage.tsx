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

const platforms = [
  { id: 'tiktok', name: 'TikTok', emoji: '🎵' },
  { id: 'instagram', name: 'Instagram', emoji: '📷' },
  { id: 'facebook', name: 'Facebook', emoji: '👤' },
  { id: 'youtube', name: 'YouTube', emoji: '▶️' },
  { id: 'twitter', name: 'Twitter/X', emoji: '🐦' },
  { id: 'telegram', name: '电报', emoji: '✈️' },
  { id: 'kwai', name: '快手', emoji: '⚡' },
  { id: 'shopee', name: 'Shopee', emoji: '🛍️' },
  { id: 'whatsapp', name: 'WhatsApp', emoji: '📱' },
];

const servicesByPlatform: Record<string, { id: number; name: string; price: number; min: number; max: number }[]> = {
  tiktok: [
    { id: 4858, name: 'TikTok 粉丝 | 带头像真人粉 | 1-6小时启动 | 无任何售后 ⚠️ | 【0-10万】', price: 12.8772, min: 100, max: 100000 },
    { id: 4859, name: 'TikTok 点赞 | 真实点赞 | 快速启动 | 【0-5万】', price: 3.5, min: 100, max: 50000 },
    { id: 4860, name: 'TikTok 播放量 | 极速发货 | 【100-100万】', price: 1.2, min: 100, max: 1000000 },
  ],
  instagram: [
    { id: 5001, name: 'Instagram 粉丝 | 真人粉 | 1-12小时启动 | 【100-5万】', price: 18.5, min: 100, max: 50000 },
    { id: 5002, name: 'Instagram 点赞 | 快速发货 | 【50-1万】', price: 5.0, min: 50, max: 10000 },
  ],
  facebook: [
    { id: 6001, name: 'Facebook 主页点赞 | 真实用户 | 【100-1万】', price: 22.0, min: 100, max: 10000 },
  ],
  youtube: [
    { id: 7001, name: 'YouTube 订阅 | 真人订阅 | 【50-5万】', price: 28.0, min: 50, max: 50000 },
    { id: 7002, name: 'YouTube 播放量 | 极速发货 | 【500-100万】', price: 2.5, min: 500, max: 1000000 },
  ],
  twitter: [
    { id: 8001, name: 'Twitter 粉丝 | 真实账号 | 【100-5万】', price: 20.0, min: 100, max: 50000 },
  ],
  telegram: [
    { id: 9001, name: 'Telegram 频道会员 | 真实用户 | 【100-10万】', price: 15.0, min: 100, max: 100000 },
  ],
  kwai: [
    { id: 10001, name: '快手 粉丝 | 真实粉丝 | 【100-5万】', price: 10.0, min: 100, max: 50000 },
  ],
  shopee: [
    { id: 11001, name: 'Shopee 店铺关注 | 【50-1万】', price: 25.0, min: 50, max: 10000 },
  ],
  whatsapp: [
    { id: 12001, name: 'WhatsApp 群组成员 | 真实号码 | 【50-5000】', price: 35.0, min: 50, max: 5000 },
  ],
};

const infoItems = [
  { Icon: Clock, label: '1-6小时', desc: '开始时间' },
  { Icon: ShieldCheck, label: '无', desc: '有无保证' },
  { Icon: TrendingUp, label: '10万/天', desc: '速度' },
  { Icon: Zap, label: '24小时', desc: '平均时间' },
];

export default function SocialMediaServicesPage() {
  const { user } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok');
  const [links, setLinks] = useState('');
  const [quantity, setQuantity] = useState(1000);
  const [selectedServiceId, setSelectedServiceId] = useState(4858);

  const currentServices = servicesByPlatform[selectedPlatform] || [];
  const selectedService = currentServices.find(s => s.id === selectedServiceId) || currentServices[0];

  const handlePlatformChange = (id: string) => {
    setSelectedPlatform(id);
    const services = servicesByPlatform[id] || [];
    if (services.length > 0) {
      setSelectedServiceId(services[0].id);
      setQuantity(services[0].min);
    }
  };

  useSEO({
    title: '海外社媒增粉点赞服务 | 速锋科技',
    description: '专业海外社媒增粉点赞服务，覆盖TikTok、Instagram、Facebook、YouTube等主流平台，真实用户，快速发货，安全稳定。',
    canonical: 'https://www.tktkx.cn/social-media-services'
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
              跨境资源网，致力于跨境电商产业增长
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1.5 flex items-center shadow-sm transition-colors text-xs font-medium"
            >
              微信咨询 SFTKTKTK
            </a>
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
              <span className="text-[#666] truncate">严禁进行任何违法犯罪活动。如有问题请联系微信客服：SFTKTKTK</span>
            </div>
          </div>
          <div className="bg-white border border-[#eef1f6] rounded px-4 py-2 flex items-center justify-between text-[13px] shadow-sm">
            <div className="flex items-center overflow-hidden">
              <Bell className="h-4 w-4 text-[#999] mr-2 flex-shrink-0" />
              <span className="font-bold mr-2 text-[#333]">通知 | </span>
              <span className="text-[#666] truncate">目前TikTok粉丝服务全网风控，刷粉当天掉粉严重，不着急可以过几天再刷。</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="w-52 bg-white rounded-lg border border-[#eef1f6] shadow-sm py-2 self-start sticky top-[70px]">
            {platforms.map(p => (
              <button
                key={p.id}
                onClick={() => handlePlatformChange(p.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 transition-all ${
                  selectedPlatform === p.id
                    ? 'bg-[#eef4ff] text-[#1a56db]'
                    : 'text-[#666] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">{p.emoji}</span>
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
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none focus:border-[#1a56db]"
                />
                {selectedService && (
                  <p className="text-[#ff4d4f] text-[11px] mt-1">
                    最小: {selectedService.min} - 最大: {selectedService.max.toLocaleString()} (¥ {selectedService.price}/1000个)
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2 py-2">
                <input type="checkbox" id="agree" className="w-4 h-4 border-[#ddd] rounded cursor-pointer" />
                <label htmlFor="agree" className="text-[12px] text-[#999] cursor-pointer">我确定已填写好的订单信息，并了解下单须知</label>
              </div>

              <div className="flex items-center justify-between mt-10 border-t border-[#f5f7fa] pt-8 absolute bottom-8 left-8 right-8">
                <div className="flex items-baseline">
                  <span className="text-[#666] text-[14px] mr-2">总金额：</span>
                  {selectedService ? (
                    <span className="text-[#1a56db] font-bold text-2xl">
                      ¥ {(quantity / 1000 * selectedService.price).toFixed(4)}
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
                    <ExternalLink className="h-3 w-3 text-[#ccc] flex-shrink-0 ml-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {infoItems.map((item, idx) => (
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

                <div className="space-y-3 pt-2">
                  <p className="text-[13px] font-bold text-[#333]">说明</p>
                  <div className="bg-gray-50 border border-dashed border-[#ddd] p-3 rounded text-[11px] text-[#999] leading-relaxed">
                    🔗 链接格式：查看上方示例链接，或联系客服咨询正确的链接格式
                  </div>

                  <div className="space-y-2">
                    <p className="text-[12px] font-bold text-[#333]">⚠️ 注意：</p>
                    {[
                      '下单前请仔细检查链接格式。',
                      '请确保账户是公开状态，不是私密账号。',
                      '禁止在服务中途更改用户名！',
                      '如服务集中时，操作的启动速度会发生变化。',
                      '在系统中完成第一个订单之前，不要重下订单。',
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
