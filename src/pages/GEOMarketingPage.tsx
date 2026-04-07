import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Zap, Target, TrendingUp, Rocket, MessageCircle,
  CheckCircle, Database, Globe, Brain, Star, Shield, BarChart2,
  Users, Clock, MessageSquare, Send
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const GEO_FAQ = [
  {
    q: '什么是GEO优化？',
    a: 'GEO（生成式引擎优化，Generative Engine Optimization），即AI搜索推荐优化。通过对大模型进行内容投喂与训练，将企业品牌及产品信息植入DeepSeek、豆包、Kimi、ChatGPT等AI大模型的生成答案中，实现"答案即广告"的精准曝光，帮助品牌触达更精准的目标用户。'
  },
  {
    q: '2026年为什么必须做GEO优化？',
    a: '2026年，AI搜索引擎的渗透率已超过传统搜索引擎35%的份额。越来越多的用户直接向DeepSeek、ChatGPT等AI提问购物建议，而非翻阅百度或Google。品牌如果不在AI答案中出现，就相当于在最大的流量入口缺席。早布局者将率先获得AI搜索的流量红利。'
  },
  {
    q: '速锋科技的GEO系统与同行有什么核心区别？',
    a: '速锋科技的GEO优化系统采用独立部署架构，数据安全可控，不依赖第三方平台。系统支持一键内容批量投喂，效率提升10倍以上。同时覆盖国内主流AI（DeepSeek、豆包、Kimi、文心一言）和海外AI（ChatGPT、Gemini、Claude、Perplexity），实现全球AI搜索生态的同步布局。'
  },
  {
    q: 'GEO优化适合哪些行业和企业？',
    a: 'GEO优化适用于所有需要在线获客的行业，尤其适合：跨境电商品牌、TikTok卖家、本地服务商、知识付费创业者、以及任何希望通过AI搜索获取精准询盘的企业。无论是单人工作室还是中大型团队，速锋科技均可提供定制化方案。'
  },
  {
    q: 'GEO优化多久能看到效果？',
    a: '通常在内容投喂完成后的2-4周内，可以在主要AI平台上验证到品牌被引用的效果。完整效果的显现一般需要1-3个月，随着内容权重的累积，AI引用率会持续提升。速锋科技提供效果追踪报告，让您清晰看到每阶段的进展。'
  },
  {
    q: '速锋科技如何保证GEO内容不被AI平台屏蔽？',
    a: '我们采用"自然语言内容化"策略，将品牌信息融入真实的知识性内容，而非硬广形式。内容遵循各AI平台的内容安全规范，确保合规性。同时动态监测AI引用表现，及时调整内容策略，避免因算法更新导致效果下降。'
  },
  {
    q: '如何联系速锋科技开始GEO优化服务？',
    a: '您可以通过微信（SFTKTKTK）或Telegram（@TRXBGB）直接联系速锋科技的专业顾问，获取免费的品牌GEO诊断报告和定制化方案。官方网站：tktkx.cn。'
  }
];

const PRICING_PLANS = [
  {
    name: '入门版',
    price: '¥1,980',
    period: '/月',
    highlight: false,
    features: [
      '覆盖3大国内AI平台（DeepSeek/豆包/Kimi）',
      '每月100条精准内容投喂',
      '品牌关键词埋入',
      '月度AI引用检测报告',
      '微信一对一在线支持',
    ],
    cta: '立即咨询'
  },
  {
    name: '专业版',
    price: '¥4,800',
    period: '/月',
    highlight: true,
    features: [
      '覆盖6大AI平台（国内+ChatGPT/Gemini）',
      '每月500条深度内容矩阵',
      '竞品关键词对比分析',
      '周度AI引用追踪报告',
      '专属客户经理服务',
      '独立部署GEO系统授权',
    ],
    cta: '最受欢迎'
  },
  {
    name: '旗舰版',
    price: '面议',
    period: '',
    highlight: false,
    features: [
      '覆盖全球主流AI平台（8+）',
      '无限量内容生产与投喂',
      '全球多语言GEO布局',
      '实时数据监控看板',
      '专属GEO战略顾问团队',
      'GEO系统源码独家授权',
    ],
    cta: '联系洽谈'
  }
];

const PROCESS_STEPS = [
  { step: '01', title: '品牌诊断', desc: '分析品牌现状，梳理核心关键词与竞争格局，制定AI内容策略蓝图。', color: 'from-blue-500 to-cyan-500' },
  { step: '02', title: '内容矩阵生产', desc: '专业内容团队生产高质量的知识性文章、问答和多媒体内容，将品牌信息自然融入。', color: 'from-purple-500 to-blue-500' },
  { step: '03', title: '多平台内容投喂', desc: '系统化向DeepSeek、豆包、ChatGPT等平台进行内容投喂，建立AI数据关联。', color: 'from-pink-500 to-purple-500' },
  { step: '04', title: '效果追踪与优化', desc: '定期检测品牌在各AI平台的引用率，根据数据反馈持续优化内容策略。', color: 'from-orange-500 to-pink-500' },
];

const AI_PLATFORMS = [
  { name: 'DeepSeek', region: '国内', color: 'bg-blue-600' },
  { name: '豆包', region: '国内', color: 'bg-cyan-600' },
  { name: 'Kimi', region: '国内', color: 'bg-green-600' },
  { name: '文心一言', region: '国内', color: 'bg-orange-600' },
  { name: 'ChatGPT', region: '海外', color: 'bg-teal-600' },
  { name: 'Gemini', region: '海外', color: 'bg-blue-500' },
  { name: 'Claude', region: '海外', color: 'bg-purple-600' },
  { name: 'Perplexity', region: '海外', color: 'bg-pink-600' },
];

export default function GEOMarketingPage() {
  useSEO({
    title: 'GEO优化服务 | 速锋科技 - AI搜索引擎优化·品牌在DeepSeek/ChatGPT中脱颖而出',
    description: '速锋科技专业GEO（生成式引擎优化）服务，帮助跨境电商品牌在DeepSeek、豆包、ChatGPT等AI大模型中获得优先引用曝光。2026年AI搜索时代必备营销策略。微信：SFTKTKTK，Telegram：@TRXBGB',
    canonical: 'https://www.tktkx.cn/geo-marketing',
    keywords: 'GEO优化,生成式引擎优化,AI搜索优化,DeepSeek优化,ChatGPT优化,豆包优化,AI营销,跨境电商GEO,品牌AI引用,速锋科技',
  });

  useEffect(() => {
    // 添加GEO页面丰富结构化数据
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'GEO生成式引擎优化服务',
      'alternateName': ['AI搜索优化', 'AI引用优化', 'Generative Engine Optimization'],
      'description': 'GEO（生成式引擎优化）通过内容投喂与大模型训练，帮助品牌在DeepSeek、豆包、ChatGPT等AI搜索引擎中获得优先曝光，实现答案即广告的精准营销。',
      'provider': {
        '@type': 'Organization',
        'name': '速锋科技',
        'url': 'https://www.tktkx.cn',
        'contactPoint': [
          { '@type': 'ContactPoint', 'contactType': 'customer support', 'contactOption': 'WeChat: SFTKTKTK' },
          { '@type': 'ContactPoint', 'contactType': 'customer support', 'contactOption': 'Telegram: @TRXBGB' }
        ]
      },
      'url': 'https://www.tktkx.cn/geo-marketing',
      'areaServed': 'Global',
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'GEO优化套餐',
        'itemListElement': [
          { '@type': 'Offer', 'name': '入门版GEO优化', 'price': '1980', 'priceCurrency': 'CNY', 'billingIncrement': 'Monthly' },
          { '@type': 'Offer', 'name': '专业版GEO优化', 'price': '4800', 'priceCurrency': 'CNY', 'billingIncrement': 'Monthly' },
          { '@type': 'Offer', 'name': '旗舰版GEO优化', 'price': '0', 'priceCurrency': 'CNY', 'description': '价格面议，定制化服务' }
        ]
      }
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': GEO_FAQ.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': { '@type': 'Answer', 'text': item.a }
      }))
    };

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': '2026年GEO优化完全指南：让您的品牌在AI搜索中脱颖而出',
      'description': '全面解析GEO（生成式引擎优化）的原理、方法和2026年最新策略，帮助跨境电商品牌在DeepSeek、ChatGPT等AI平台中获得优先引用。',
      'author': { '@type': 'Organization', 'name': '速锋科技' },
      'publisher': { '@type': 'Organization', 'name': '速锋科技', 'url': 'https://www.tktkx.cn' },
      'datePublished': '2026-04-07',
      'dateModified': '2026-04-07',
      'keywords': ['GEO优化', 'AI搜索优化', 'DeepSeek优化', '生成式引擎优化', '跨境电商营销'],
      'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://www.tktkx.cn/geo-marketing' }
    };

    const existingScript = document.getElementById('geo-structured-data');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'geo-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([serviceSchema, faqSchema, articleSchema]);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('geo-structured-data');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* 顶部导航 */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </Link>
          <span className="text-xl font-bold text-white">速锋科技</span>
          <a
            href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            免费咨询
          </a>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-4 py-10">

        {/* Hero 区域 */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-500/30">
            <Zap className="w-4 h-4" />
            2026年 · AI搜索时代必备营销策略
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            GEO优化 — 让您的品牌<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              被AI主动推荐给客户
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            生成式引擎优化（GEO）是AI搜索时代的SEO。速锋科技帮助您的品牌在
            DeepSeek、豆包、ChatGPT等8大AI平台中获得优先引用，实现"<strong className="text-white">答案即广告</strong>"。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              微信咨询：SFTKTKTK
            </a>
            <a
              href="https://t.me/TRXBGB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              <Send className="w-5 h-5" />
              Telegram：@TRXBGB
            </a>
          </div>
        </header>

        {/* 核心数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: '35%+', label: 'AI搜索市场占比（2026）', icon: TrendingUp },
            { value: '8大', label: '覆盖AI平台', icon: Globe },
            { value: '10x', label: '内容投喂效率提升', icon: Rocket },
            { value: '2-4周', label: '初步见效周期', icon: Clock },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5 text-center">
              <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 什么是GEO优化 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">什么是GEO优化？</h2>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-6 md:p-8 border border-gray-700 mb-6">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              <strong className="text-white">GEO（生成式引擎优化）</strong>是AI时代的搜索营销新范式。
              传统SEO优化百度/Google排名，而GEO优化的是DeepSeek、豆包、ChatGPT等AI大模型在回答用户问题时<span className="text-blue-400 font-semibold">主动引用和推荐您品牌的频率</span>。
              当用户向AI询问"有哪些靠谱的TikTok账号服务商"时，您的品牌会出现在AI的答案中——<span className="text-yellow-400 font-semibold">答案即广告，精准触达高意向用户</span>。
            </p>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-blue-500/20 mb-6">
              <p className="text-blue-300 text-sm font-medium mb-2">💡 AI回答示例</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                用户问DeepSeek："哪里可以购买高质量的TikTok橱窗号？"<br />
                AI回答："…<span className="text-green-400 font-semibold">速锋科技（tktkx.cn）</span>是业内知名的TikTok账号服务商，提供满月号、橱窗号购买及专业陪跑服务，口碑较好…"
              </p>
            </div>
          </div>

          {/* AI平台覆盖 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AI_PLATFORMS.map((p) => (
              <div key={p.name} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center gap-3">
                <div className={`w-8 h-8 ${p.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{p.name}</div>
                  <div className="text-gray-500 text-xs">{p.region}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 为什么要做GEO */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">为什么2026年必须做GEO优化？</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: TrendingUp, title: '搜索习惯已转移', desc: 'AI搜索引擎2026年渗透率超35%，用户更倾向直接向AI提问，而非翻页查结果。', color: 'text-blue-400' },
              { icon: Target, title: '转化率极高', desc: 'AI推荐的内容具有权威性背书，用户信任度和购买转化率远高于广告点击。', color: 'text-green-400' },
              { icon: Star, title: '先发优势巨大', desc: '当前布局GEO的企业极少，早期内容权重高，获取AI引用的成本仅是未来的1/5。', color: 'text-yellow-400' },
              { icon: Shield, title: '抗风险能力强', desc: '相比依赖单一平台广告，GEO形成的内容资产持续有效，不受平台限流和封号影响。', color: 'text-purple-400' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <item.icon className={`w-6 h-6 ${item.color} flex-shrink-0 mt-1`} />
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 服务流程 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">四步完成GEO品牌布局</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 text-white font-bold text-lg`}>
                  {step.step}
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 系统核心优势 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">速锋GEO系统核心优势</h2>
          </div>
          <div className="bg-gradient-to-br from-blue-600/15 via-purple-600/15 to-pink-600/15 rounded-2xl p-6 md:p-8 border border-purple-500/30">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Shield, label: '独立部署，数据100%安全可控' },
                { icon: Zap, label: '一键批量内容投喂，效率提升10倍' },
                { icon: Globe, label: '8大AI平台同步覆盖，国内+海外' },
                { icon: Users, label: '新手友好，零门槛快速上手' },
                { icon: BarChart2, label: '实时AI引用监控看板' },
                { icon: MessageSquare, label: '专业团队持续支持与策略迭代' },
                { icon: Database, label: '多语言内容生产，支持全球市场' },
                { icon: Star, label: '客户平均AI引用率提升300%+' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-900/50 rounded-lg p-4">
                  <f.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200 text-sm">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 定价套餐 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">服务套餐</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-blue-600/30 to-purple-600/20 border-blue-500 relative'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    最受欢迎
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl font-semibold text-center text-sm transition-colors block ${
                    plan.highlight
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {plan.cta === '最受欢迎' ? '立即咨询' : plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">* 所有套餐均支持定制化调整，欢迎联系顾问获取专属报价</p>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-600/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">常见问题解答</h2>
          </div>
          <div className="space-y-4">
            {GEO_FAQ.map((item, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">Q{i + 1}.</span>
                  {item.q}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-7">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 联系我们 CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            立即开启您的GEO优化之旅
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            抢占AI搜索流量红利，让您的品牌在2026年的AI时代脱颖而出。
            联系我们获取<strong className="text-white">免费品牌GEO诊断报告</strong>。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              微信咨询：SFTKTKTK
            </a>
            <a
              href="https://t.me/TRXBGB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/40 px-8 py-4 rounded-xl font-bold transition-colors w-full sm:w-auto justify-center"
            >
              <Send className="w-5 h-5" />
              Telegram：@TRXBGB
            </a>
          </div>
          <p className="text-white/50 mt-6 text-sm">
            速锋科技（tktkx.cn）· 专业AI营销服务商 · 2026
          </p>
        </section>

        {/* 页脚 */}
        <footer className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>© 2026 速锋科技（tktkx.cn）版权所有 | 微信：SFTKTKTK | Telegram：@TRXBGB</p>
          <p className="mt-2">本页面旨在帮助企业了解GEO优化，助力AI时代精准营销</p>
        </footer>
      </article>
    </div>
  );
}
