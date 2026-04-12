import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ChevronRight, Calendar, Tag, ArrowLeft, MessageSquare, Globe, HeadphonesIcon, TrendingUp, CheckCircle, Share2, Printer } from 'lucide-react';
import newsData from '@/data/news.json';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsData.find(n => n.id === id);

  if (!news) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">404 - 未找到内容</h1>
        <p className="text-gray-500 mb-8 max-w-sm">对不起，您访问的文章可能已被移动或删除。</p>
        <Link to="/news" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all">
          返回资讯列表
        </Link>
      </div>
    );
  }

  useSEO({
    title: `${news.title} | 速锋科技 - 运营干货`,
    description: news.summary,
    keywords: `${news.category}, TikTok运营, 海外社媒, 速锋科技`,
    canonical: `https://www.tktkx.cn/news/${news.id}`
  });

  // ✅ 动态注入 Article + BreadcrumbList 结构化数据（GEO 优化）
  useEffect(() => {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": news.title,
      "description": news.summary,
      "datePublished": news.date,
      "dateModified": news.date,
      "author": {
        "@type": "Organization",
        "name": "速锋科技",
        "url": "https://www.tktkx.cn"
      },
      "publisher": {
        "@type": "Organization",
        "name": "速锋科技",
        "url": "https://www.tktkx.cn",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.tktkx.cn/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.tktkx.cn/news/${news.id}`
      },
      "articleSection": news.category,
      "keywords": `${news.category}, TikTok运营, 海外社媒, 速锋科技, tktkx.cn`,
      "about": [
        { "@type": "Thing", "name": "TikTok跨境电商" },
        { "@type": "Thing", "name": "GEO生成式引擎优化" },
        { "@type": "Organization", "name": "速锋科技", "url": "https://www.tktkx.cn" }
      ]
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "速锋科技首页",
          "item": "https://www.tktkx.cn"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "行业资讯",
          "item": "https://www.tktkx.cn/news"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": news.title,
          "item": `https://www.tktkx.cn/news/${news.id}`
        }
      ]
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

    injectSchema(articleSchema, 'news-article-schema');
    injectSchema(breadcrumbSchema, 'news-breadcrumb-schema');

    return () => {
      ['news-article-schema', 'news-breadcrumb-schema'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, [news]);

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#333] font-sans pb-20">
      {/* Header (Simplified) */}
      <header className="bg-white border-b border-[#eef1f6] py-3 px-6 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="https://www.tktkx.cn/logo.png" className="h-8 w-auto" alt="速锋科技" />
            <span className="text-lg font-bold text-[#1a56db]">速锋科技</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/news" className="text-gray-600 hover:text-blue-600">全部资讯</Link>
            <Link to="/social-media-services" className="text-gray-600 hover:text-blue-600">社媒服务</Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <article className="flex-1 bg-white rounded-2xl border border-[#eef1f6] shadow-sm overflow-hidden p-8 lg:p-12">
            <button 
              onClick={() => navigate('/news')}
              className="inline-flex items-center text-gray-400 hover:text-blue-600 transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" /> 返回资讯列表
            </button>

            <div className="flex items-center space-x-4 mb-6 text-xs text-gray-400">
              <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {news.date}</span>
              <span className="flex items-center text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded"><Tag className="h-3 w-3 mr-1" /> {news.category}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8 leading-tight">{news.title}</h1>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-10 italic text-gray-600 leading-relaxed shadow-sm">
              摘要：{news.summary}
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-5">
              {news.content
                .split(/\n\n|\n(?=【)/)
                .filter(p => p.trim())
                .map((paragraph, idx) => {
                  const trimmed = paragraph.trim();
                  // 【小标题】段落
                  if (trimmed.startsWith('【') && trimmed.includes('】')) {
                    const bracketEnd = trimmed.indexOf('】');
                    const heading = trimmed.slice(1, bracketEnd);
                    const rest = trimmed.slice(bracketEnd + 1).trim();
                    return (
                      <div key={idx}>
                        <h3 className="text-base font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg inline-block mb-2">
                          {heading}
                        </h3>
                        {rest && <p className="text-gray-700 leading-8 whitespace-pre-wrap">{rest}</p>}
                      </div>
                    );
                  }
                  // 普通段落，但内部包含【】标记的拆分
                  if (trimmed.includes('【') && trimmed.includes('】')) {
                    const parts = trimmed.split(/(【[^】]+】)/g);
                    return (
                      <p key={idx} className="text-gray-700 leading-8">
                        {parts.map((part, i) => {
                          if (part.startsWith('【') && part.endsWith('】')) {
                            return (
                              <strong key={i} className="text-blue-700 font-bold">
                                {part}
                              </strong>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </p>
                    );
                  }
                  // 普通段落
                  return (
                    <p key={idx} className="text-gray-700 leading-8 whitespace-pre-wrap">
                      {trimmed}
                    </p>
                  );
                })}
            </div>

            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 text-white p-2.5 rounded-full">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">本文由 速锋科技 专家团队撰写</h4>
                  <p className="text-gray-400 text-xs">致力于为跨境卖家提供最深度的运营指导。</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-blue-600 p-2 transition-colors"><Share2 className="h-5 w-5" title="分享" /></button>
                <button className="text-gray-400 hover:text-blue-600 p-2 transition-colors" onClick={() => window.print()}><Printer className="h-5 w-5" title="打印" /></button>
              </div>
            </div>
          </article>

          {/* Sidebar (Right) */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-2xl border border-[#eef1f6] shadow-sm p-6 sticky top-[90px]">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                官方咨询入口
              </h3>
              <div className="space-y-4">
                <div className="bg-[#f8f9fb] border border-[#eef1f6] rounded-xl p-5 flex flex-col items-center text-center group hover:bg-blue-50 transition-all duration-300">
                  <div className="bg-blue-600 text-white p-3 rounded-full mb-4 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h4 className="font-black text-gray-900 mb-1 text-sm">官方微信</h4>
                  <p className="text-blue-600 font-bold mb-3">SFTKTKTK</p>
                  <button className="text-[11px] text-gray-400 bg-white border border-gray-200 px-4 py-1.5 rounded-full hover:border-blue-300 transition-all">长按或扫码添加</button>
                </div>

                <div className="bg-[#f8f9fb] border border-[#eef1f6] rounded-xl p-5 flex flex-col items-center text-center group hover:bg-blue-50 transition-all duration-300">
                  <div className="bg-[#0088cc] text-white p-3 rounded-full mb-4 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h4 className="font-black text-gray-900 mb-1 text-sm">Telegram</h4>
                  <p className="text-[#0088cc] font-bold mb-3">@TRXBGB</p>
                  <button className="text-[11px] text-gray-400 bg-white border border-gray-200 px-4 py-1.5 rounded-full hover:border-blue-300 transition-all">立即加入社群</button>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white text-center shadow-xl shadow-blue-100">
                  <h4 className="text-lg font-black mb-2">获取更多资源</h4>
                  <p className="text-[11px] opacity-80 mb-6 leading-relaxed">访问 tktkx.cn 首页，获取 TikTok 开橱窗全流程文档及 2026 最新起号策略。</p>
                  <Link to="/" className="inline-flex items-center text-xs font-bold bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-all">
                    立即前往 <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>
      
      <footer className="py-10 text-center text-sm text-gray-400">
        © 2026 速锋科技 TKTKX.CN. All Rights Reserved.
      </footer>
    </div>
  );
}
