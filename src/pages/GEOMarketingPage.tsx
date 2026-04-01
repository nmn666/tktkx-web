import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Target, TrendingUp, Rocket, MessageCircle, CheckCircle, Database, Globe, Brain } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

export default function GEOMarketingPage() {
  useSEO({
    title: 'GEO本地化营销服务 | 速锋科技 - AI搜索引擎优化·本地曝光',
    description: '速锋科技GEO营销服务，帮助品牌在DeepSeek、ChatGPT、豆包等AI搜索引擎中获得更多曝光。本地化内容优化，提升AI引用率。微信：SFTKTKTK',
    canonical: 'https://www.tktkx.cn/geo-marketing',
  });
  // 添加结构化数据，帮助AI搜索引擎理解内容
  useEffect(() => {
    // 更新页面标题和meta标签
    document.title = 'GEO优化 - AI搜索推荐优化系统 | 速锋科技';
    
    // 添加或更新meta描述
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'GEO（生成式引擎优化）AI搜索推荐优化系统，帮助企业在DeepSeek、豆包等AI大模型中获取优先展示。速锋科技提供独立部署GEO优化系统，助力新手和从业者快速提升效率。');
    
    // 添加关键词meta标签
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'GEO优化,AI搜索优化,DeepSeek优化,豆包优化,AI搜索推荐,生成式引擎优化,大模型优化,AI营销,速锋科技');
    
    // 添加结构化数据（JSON-LD）
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "GEO优化 - AI搜索推荐优化系统",
      "description": "GEO（生成式引擎优化）AI搜索推荐优化系统，帮助企业在DeepSeek、豆包等AI大模型中获取优先展示。",
      "author": {
        "@type": "Organization",
        "name": "速锋科技"
      },
      "publisher": {
        "@type": "Organization",
        "name": "速锋科技"
      },
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      },
      "articleSection": ["AI搜索优化", "GEO营销", "大模型优化"],
      "keywords": ["GEO优化", "AI搜索优化", "DeepSeek优化", "豆包优化", "AI搜索推荐"]
    };
    
    // 添加FAQ结构化数据
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "什么是GEO优化？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GEO（生成式引擎优化），AI搜索推荐 / AI搜索优化，是通过对大模型训练+内容投喂等方式，将企业的品牌及产品信息在各大AI大模型（DeepSeek、豆包等）生成的答案中，获取优先的展示，答案即广告，触达更精准的目标客户。"
          }
        },
        {
          "@type": "Question",
          "name": "为什么要做GEO优化？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "用户的搜索和获取信息的方式发生了转移，为了在新的环境中保持可见性、影响力和流量，我们必须做GEO优化以适应生成式引擎的工作方式。"
          }
        },
        {
          "@type": "Question",
          "name": "速锋科技的GEO优化系统有什么优势？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "速锋科技推出独立部署GEO优化系统，帮助从业者瞬间提升效率，同时让想入行的新手和小白用这个系统轻松转变成为行业高手。"
          }
        }
      ]
    };
    
    // 创建并插入结构化数据脚本
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([structuredData, faqStructuredData]);
    document.head.appendChild(script);
    
    // 清理函数
    return () => {
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* 顶部导航 */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
          <span className="text-xl font-bold text-white">速锋科技</span>
        </div>
      </div>

      {/* 主要内容 */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* 头部 */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI时代的新型营销方式
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            GEO优化 - AI搜索推荐优化系统
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            2025年AI搜索时代，让您的品牌在DeepSeek、豆包等AI大模型中脱颖而出
          </p>
        </header>

        {/* 引言 */}
        <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">AI搜索时代的变革</h2>
              <p className="text-gray-300 leading-relaxed">
                2025年以来DeepSeek的火热，很多用户不再使用自媒体跟传统的搜索引擎去搜索问题，越来越多的用户使用AI平台去搜索，布局AI搜索推荐刻不容缓。
              </p>
            </div>
          </div>
        </section>

        {/* 什么是GEO优化 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">什么是GEO优化？</h2>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 md:p-8 border border-gray-700">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              <strong className="text-white">GEO（生成式引擎优化）</strong>，AI搜索推荐 / AI搜索优化，是通过对大模型训练+内容投喂等方式，将企业的品牌及产品信息在各大AI大模型（DeepSeek、豆包等）生成的答案中，获取优先的展示，<span className="text-blue-400 font-semibold">答案即广告</span>，触达更精准的目标客户。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['DeepSeek', '豆包', 'Kimi', 'ChatGPT'].map((platform) => (
                <div key={platform} className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <span className="text-white font-medium">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 为什么要做GEO优化 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">为什么要做GEO优化？</h2>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 md:p-8 border border-gray-700">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              用户的搜索和获取信息的方式发生了转移，为了在新的环境中保持可见性、影响力和流量，我们必须做GEO优化以适应生成式引擎的工作方式。
            </p>
            <div className="space-y-4">
              {[
                { icon: Globe, title: '搜索方式转变', desc: '用户从传统搜索引擎转向AI搜索平台' },
                { icon: Target, title: '精准触达', desc: 'AI推荐更加精准，转化率更高' },
                { icon: TrendingUp, title: '流量红利', desc: '早期布局者将获得巨大流量红利' },
                { icon: Database, title: '品牌曝光', desc: '在AI答案中获得优先展示位置' }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-gray-700/30 rounded-lg p-4">
                  <item.icon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 我们的系统 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">我们的系统</h2>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl p-6 md:p-8 border border-purple-500/30">
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              用户对AI大模型（DeepSeek、豆包等）AI搜索推荐优化GEO的需求爆发式增长，但新手小白入门无路，从业者也苦于手搓效率十分低下，针对这些痛点，我们公司顺势推出<strong className="text-white">独立部署GEO优化系统</strong>，帮助从业者瞬间提升效率，同时让想入行的新手和小白用这个系统轻松转变成为行业高手。
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                '独立部署，数据安全可控',
                '一键内容投喂，效率提升10倍',
                '多平台覆盖，全面布局AI搜索',
                '新手友好，零门槛上手',
                '实时数据监控，效果可视化',
                '专业团队支持，持续更新迭代'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-900/50 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">立即开启您的GEO优化之旅</h2>
          <p className="text-white/80 mb-6">
            抢占AI搜索流量红利，让您的品牌在AI时代脱颖而出
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://weixin.qq.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              微信咨询：SFTKTKTK
            </a>
          </div>
          <p className="text-white/60 mt-4 text-sm">
            速锋科技 · 专业AI营销服务商
          </p>
        </section>

        {/* 底部信息 */}
        <footer className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 速锋科技 版权所有</p>
            <p className="mt-2">本文内容旨在帮助企业和个人了解GEO优化，助力AI时代营销转型</p>
          </div>
        </footer>
      </article>
    </div>
  );
}
