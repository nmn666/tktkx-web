import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ChevronRight, Calendar, Tag, MessageSquare, Globe, ArrowRight, Menu, X, Zap } from 'lucide-react';
import newsData from '@/data/news.json';

const CATEGORIES = ['全部', 'TikTok运营', '海外社媒', 'GEO优化', '行业深度', '蓝海市场', '选品攻略', 'AI营销'];

const CATEGORY_COLORS: Record<string, string> = {
  'TikTok运营':  'bg-pink-50 text-pink-600',
  '海外社媒':    'bg-blue-50 text-blue-600',
  'GEO优化':    'bg-purple-50 text-purple-600',
  '行业深度':    'bg-orange-50 text-orange-600',
  '蓝海市场':    'bg-green-50 text-green-600',
  '选品攻略':    'bg-yellow-50 text-yellow-700',
  'AI营销':      'bg-indigo-50 text-indigo-600',
};

export default function NewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '全部';
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES.includes(categoryParam) ? categoryParam : '全部'
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useSEO({
    title: '行业资讯 & 运营干货 | 速锋科技 - TikTok, Meta, GEO优化最新动态',
    description: '速锋科技提供最新的TikTok运营技巧、GEO优化实战、Meta防封教程及海外社媒营销策略。每日更新，助力跨境电商卖家出海。',
    keywords: 'TikTok运营,GEO优化,Meta防封,海外社媒营销,速锋科技资讯',
    canonical: 'https://www.tktkx.cn/news'
  });

  const filteredNews = useMemo(() => {
    if (activeCategory === '全部') return newsData;
    return newsData.filter(n => n.category === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { '全部': newsData.length };
    newsData.forEach(n => {
      counts[n.category] = (counts[n.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === '全部') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
    // Mobile scroll to top of list after change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#333] font-sans pb-10">
      {/* Header */}
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
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 text-sm font-bold">
              <Link to="/" className="text-gray-600 hover:text-blue-600">首页</Link>
              <Link to="/tiktok-market" className="text-gray-600 hover:text-blue-600">账号市场</Link>
              <Link to="/geo-marketing" className="text-gray-600 hover:text-blue-600">GEO服务</Link>
            </div>
             <a
              href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1a56db] hover:bg-[#1e429f] text-white rounded-lg px-4 py-2 flex items-center shadow-md transition-all text-xs font-bold"
            >
              <MessageSquare className="h-4 w-4 mr-2" /> 客服
            </a>
          </div>
        </div>

        {/* ── 手机端侧边菜单 ── */}
        <div className={`md:hidden fixed inset-0 top-[57px] bg-white z-[55] transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">主要导航</p>
              <Link to="/" className="flex items-center p-3 rounded-xl hover:bg-gray-50 font-bold text-gray-700" onClick={() => setIsMenuOpen(false)}><Globe className="h-5 w-5 mr-3 text-blue-500" /> 首页</Link>
              <Link to="/tiktok-market" className="flex items-center p-3 rounded-xl hover:bg-gray-50 font-bold text-gray-700" onClick={() => setIsMenuOpen(false)}><Tag className="h-5 w-5 mr-3 text-pink-500" /> 账号市场</Link>
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

      <main className="max-w-[1100px] mx-auto py-8 md:py-12 px-4">
        {/* Page Title */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Insights & Strategy</div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">行业资讯 & 运营干货</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">深度解析 TikTok 算法逻辑、GEO优化实战、Meta社媒营销策略，助您在跨境电商领域快人一步。</p>
        </div>

        {/* Category Tabs (Mobile Scrollable) */}
        <div className="mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
          <div className="flex flex-nowrap gap-2 md:flex-wrap">
            {CATEGORIES.map(cat => {
              const count = categoryCounts[cat] || 0;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-black transition-all border whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                      : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {cat}
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Article count */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
            共 <span className="text-gray-900">{filteredNews.length}</span> 篇文章
            {activeCategory !== '全部' && <span className="text-blue-500 ml-1"># {activeCategory}</span>}
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold mb-4">该分类暂无文章</p>
              <button onClick={() => handleCategoryChange('全部')} className="text-blue-600 font-black text-sm hover:underline">查看全部文章</button>
            </div>
          ) : (
            filteredNews.map((news) => {
              const colorClass = CATEGORY_COLORS[news.category] || 'bg-blue-50 text-blue-600';
              return (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${colorClass}`}>
                      {news.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> {news.date}
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors flex-grow">
                    {news.title}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                    {news.summary}
                  </p>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-blue-600 text-xs font-black flex items-center">
                      阅读详情 <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="bg-gray-50 p-2 rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-20 relative rounded-[3rem] overflow-hidden bg-gray-900 p-8 md:p-16 text-center">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-500 rounded-full blur-[100px]" />
           </div>
           <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-4xl font-black text-white mb-6">需要专业的运营指导？</h3>
              <p className="text-gray-400 mb-10 text-sm md:text-base font-medium">无论是账号问题、流量变现还是 GEO 优化策略，速锋科技专家团队为您提供 1v1 深度咨询。</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <a href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-900/20">
                    立即联系专家微信
                 </a>
                 <div className="text-gray-500 text-xs font-black uppercase tracking-widest">
                    WeChat: SFTKTKTK
                 </div>
              </div>
           </div>
        </div>
      </main>

      <footer className="py-12 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2026 速锋科技 TKTKX.CN · 助力中国品牌出海</p>
      </footer>
    </div>
  );
}
