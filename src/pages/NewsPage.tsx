import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ChevronRight, Calendar, Tag, MessageSquare, Globe } from 'lucide-react';
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
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#333] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-[#eef1f6] py-3 px-6 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="https://www.tktkx.cn/logo.png" className="h-8 w-auto" alt="速锋科技" />
            <span className="text-lg font-bold text-[#1a56db]">速锋科技</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">首页</Link>
            <Link to="/tiktok-market" className="text-gray-600 hover:text-blue-600">账号市场</Link>
            <Link to="/social-media-services" className="text-gray-600 hover:text-blue-600">社媒服务</Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto py-10 px-4">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-4">行业资讯 & 运营干货</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">深度解析 TikTok 算法逻辑、GEO优化实战、Meta社媒营销策略，助您在跨境电商领域快人一步。</p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => {
            const count = categoryCounts[cat] || 0;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-white text-gray-600 border border-[#eef1f6] hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {cat}
                {count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Article count */}
        <p className="text-sm text-gray-400 mb-4">
          共 <span className="font-bold text-gray-700">{filteredNews.length}</span> 篇文章
          {activeCategory !== '全部' && <span>（{activeCategory}）</span>}
        </p>

        {/* Article List */}
        <div className="grid gap-6">
          {filteredNews.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">该分类暂无文章</p>
              <button onClick={() => handleCategoryChange('全部')} className="mt-4 text-blue-600 hover:underline text-sm">查看全部文章</button>
            </div>
          ) : (
            filteredNews.map((news) => {
              const colorClass = CATEGORY_COLORS[news.category] || 'bg-blue-50 text-blue-600';
              return (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="bg-white rounded-xl border border-[#eef1f6] p-6 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3 text-xs text-gray-400">
                      <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {news.date}</span>
                      <span className={`flex items-center font-bold px-2 py-0.5 rounded ${colorClass}`}>
                        <Tag className="h-3 w-3 mr-1" /> {news.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{news.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{news.summary}</p>
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-bold">
                      阅读全文 <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer Contact */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white text-center shadow-xl shadow-blue-100">
          <h3 className="text-2xl font-black mb-4">需要专业的运营指导？</h3>
          <p className="mb-8 text-blue-100 opacity-90">无论是账号问题还是流量变现，速锋科技专家团队为您提供 1v1 深度咨询。</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" /> 微信：SFTKTKTK
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center">
              <Globe className="h-5 w-5 mr-2" /> 电报：@TRXBGB
            </div>
          </div>
        </div>
      </main>

      <footer className="py-10 text-center text-sm text-gray-400">
        © 2026 速锋科技 TKTKX.CN. All Rights Reserved. · 每日更新行业资讯
      </footer>
    </div>
  );
}
