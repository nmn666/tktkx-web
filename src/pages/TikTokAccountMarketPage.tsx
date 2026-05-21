import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import marketConfig from '@/data/market_config.json';
import { useAuth } from '@/contexts/authContext';

// ─── 帮助中心与常见问题 (FAQ Schema 优化) ──────────────────────────
const FAQ_DATA = [
  {
    question: "速锋科技的 TikTok 账号安全吗？",
    answer: "非常安全。我们的账号均使用原生住宅 IP 注册，且注册时长均在 30 天（满月）以上。每个账号都经过严格的质量检测，支持 24 小时内首登问题包换。"
  },
  {
    question: "什么是满月橱窗号？",
    answer: "满月橱窗号是指注册时间超过 30 天，且已经通过 1000 粉丝门槛或特殊渠道开通了 TikTok Shop 橱窗权限的账号。这类账号权重高，适合直接带货。"
  },
  {
    question: "购买后如何接收账号？",
    answer: "在官网 TKTKX.cn 下单支付后，卡密信息会立即通过网页展示，并同步发送到您的联系邮箱。24 小时全自动发货。"
  }
];

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
    title: 'TikTok账号市场 | 购买千粉橱窗号、满月老号 - 速锋科技',
    description: '速锋科技提供高权重TikTok美国/英国/东南亚满月老号、1000粉丝橱窗号。原生住宅IP养号，稳定不跳验证，24小时自动发货。',
    keywords: '买TikTok账号,TikTok橱窗号,TikTok千粉号,TikTok满月老号,速锋科技',
    canonical: 'https://www.tktkx.cn/tiktok-market'
  });

  // ✅ 注入 FAQPage 结构化数据 (GEO 优化)
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const injectSchema = (schema: object, scriptId: string) => {
      let el = document.getElementById(scriptId);
      if (!el) {
        el = document.createElement('script');
        el.id = scriptId;
        (el as HTMLScriptElement).type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    };

    injectSchema(faqSchema, 'market-faq-schema');
    return () => {
      const el = document.getElementById('market-faq-schema');
      if (el) el.remove();
    };
  }, []);

  const handlePlatformChange = (id: string) => {
    setSelectedPlatform(id);
    const services = servicesByPlatform[id] || [];
    if (services.length > 0) {
      setSelectedServiceId(services[0].id);
      setSocialQty(services[0].min);
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
        <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-black text-sm flex items-center shadow-lg shadow-blue-100 active:scale-95 transition-transform">
          立即购买 <ChevronRight className="h-4 w-4 ml-1" />
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
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-5 font-black text-lg shadow-xl shadow-blue-100 transition-all transform active:scale-[0.98] flex items-center justify-center">
                        立即下单购买 <ArrowRight className="h-5 w-5 ml-2" />
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
