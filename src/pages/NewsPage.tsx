import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ChevronRight, Calendar, User, Tag, ArrowLeft, MessageSquare, Globe } from 'lucide-react';
import newsData from '@/data/news.json';

export default function NewsPage() {
  useSEO({
    title: '行业资讯 & 运营干货 | 速锋科技 - TikTok, Meta, 海外社媒最新动态',
    description: '速锋科技提供最新的TikTok运营技巧、Meta防封教程及海外社媒营销策略。每日更新，助力跨境电商卖家出海。',
    keywords: 'TikTok运营,TikTok干货,Meta防封,海外社媒营销,速锋科技资讯',
    canonical: 'https://www.tktkx.cn/news'
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#333] font-sans">
      {/* Header (Simplified) */}
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
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-4">行业资讯 & 运营干货</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">深度解析 TikTok 算法逻辑，分享 Meta 社交媒体实战经验，助您在跨境电商领域快人一步。</p>
        </div>

        <div className="grid gap-6">
          {newsData.map((news) => (
            <Link 
              key={news.id} 
              to={`/news/${news.id}`}
              className="bg-white rounded-xl border border-[#eef1f6] p-6 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3 text-xs text-gray-400">
                  <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {news.date}</span>
                  <span className="flex items-center text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded"><Tag className="h-3 w-3 mr-1" /> {news.category}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{news.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{news.summary}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-bold">
                  阅读全文 <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
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
