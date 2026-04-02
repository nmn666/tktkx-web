import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, User, Lock, CheckCircle, Clock, Eye, TrendingUp, X, Smartphone } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

export default function MetaAccountGuide() {
  useSEO({
    title: 'Meta账号注册养号教程2026 | 速锋科技 - FB/IG账号防封安全运营',
    description: 'Meta/Facebook账号注册、双重验证、养号完整教程2026最新版。固定IP配置、真人养号策略、防封技巧，从Day0到稳定运营手把手指导。微信：SFTKTKTK',
    canonical: 'https://www.tktkx.cn/meta-account-guide',
    keywords: 'Meta账号,Facebook账号,FB账号养号,Meta账号注册,FB账号防封,Instagram账号,Meta养号教程,Facebook账号购买,FB广告账号',
  });
  // 添加结构化数据，帮助AI搜索引擎理解内容
  useEffect(() => {
    document.title = 'Meta养号完全攻略 | 真实账号 = 真实收益 | 速锋科技';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Meta(Facebook/Instagram)养号完全攻略，从注册到成熟账号的全流程指南。真实账号才能带来真实收益，掌握正确的养号方法，避免封号风险。速锋科技专业跨境账号运营指导。');
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Meta养号,Facebook养号,Instagram养号,FB账号安全,IG账号安全,双重验证,跨境账号运营,速锋科技,账号防封');
    
    // 文章结构化数据
    const articleData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Meta养号完全攻略 | 真实账号 = 真实收益",
      "description": "Meta(Facebook/Instagram)养号完全攻略，从注册到成熟账号的全流程指南。",
      "author": {
        "@type": "Organization",
        "name": "速锋科技"
      },
      "publisher": {
        "@type": "Organization",
        "name": "速锋科技",
        "url": "https://www.tktkx.cn"
      },
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "articleSection": ["注册建议", "双重验证", "养号红线", "养号日常操作"]
    };
    
    // HowTo结构化数据
    const howToData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Meta账号养成指南",
      "description": "从新注册账号到成熟账号的完整养号流程",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Day 0 - 注册当天",
          "text": "上传真人头像，填充个人资料，在线挂满至少2小时"
        },
        {
          "@type": "HowToStep",
          "name": "Day 1-3 - 观察与轻度互动",
          "text": "每天在线>2小时，轻度点赞，关注2-3个大型主页"
        },
        {
          "@type": "HowToStep",
          "name": "Day 4-7 - 建立社交连接",
          "text": "增加点赞数量，开始评论，发简单帖子，加好友"
        },
        {
          "@type": "HowToStep",
          "name": "Week 2-3 - 深化互动",
          "text": "保持规律在线，发图文帖子，加入群组参与讨论"
        },
        {
          "@type": "HowToStep",
          "name": "Week 4及以后 - 走向成熟",
          "text": "建立品牌专页，稳定内容输出，尝试投放广告"
        }
      ]
    };
    
    const existingScript = document.getElementById('structured-data');
    if (existingScript) existingScript.remove();
    
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([articleData, howToData]);
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) scriptToRemove.remove();
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            🔥 Meta 养号完全攻略
          </h1>
          <p className="text-xl text-blue-400 font-semibold mb-4">真实账号 = 真实收益</p>
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4 inline-block">
            <p className="text-gray-300 text-lg">
              <strong className="text-white">原则：</strong>信息真实，表现得像真人，让 Meta 系统真正把你当成一个"活生生的、真实的、有价值的用户"
            </p>
          </div>
        </header>

        {/* 一、注册建议 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">一</span>
            注册建议
          </h2>
          
          <div className="space-y-4">
            {/* 1. 个人信息要真实 */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                1. 个人信息要真实
              </h3>
              <p className="text-gray-300">姓名、生日、性别等个人信息一定要真实！<span className="text-red-400 font-semibold">假资料是被封号的第一大原因</span>。</p>
            </div>

            {/* 2. 邮箱 & 手机号 */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-green-400" />
                2. 邮箱 & 手机号
              </h3>
              <p className="text-gray-300 mb-3">使用干净的、未注册过 FB/IG 的、最好能长期使用的邮箱（<span className="text-green-400">Gmail、Outlook 优先</span>）和手机号（能接收验证码）。</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-400">
                  <X className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>别用临时邮箱、10 分钟邮箱</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <X className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>别用已关联了大量 FB/IG 账号的手机号</span>
                </li>
              </ul>
            </div>

            {/* 3. 密码 */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-yellow-400" />
                3. 密码
              </h3>
              <p className="text-gray-300">使用<span className="text-yellow-400 font-semibold">强密码</span>，不要太简单。</p>
            </div>
          </div>
        </section>

        {/* 二、开启双重验证 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-sm">二</span>
            注册成功之后：开启双重验证
          </h2>
          
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-8 h-8 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-lg mb-2">安全防护是养号的地基，必须第一时间做好！</p>
                <p className="text-gray-300">开启双重验证的教程：<a href="https://www.tktkx.cn" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">👉 www.tktkx.cn</a></p>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 mt-4">
              <p className="text-gray-300">
                双重验证推荐使用 <strong className="text-white">谷歌身份验证器（Authenticator）</strong>：FB 会生成一个二维码，用 APP 扫描绑定，之后每次登录，APP 里会生成一个动态验证码（6 位数，30 秒变一次），安全性极高。
              </p>
            </div>
          </div>
        </section>

        {/* 三、养号红线 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-sm">三</span>
            养号红线（绝对不能做）
          </h2>
          
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-red-600/20">
                  <th className="px-6 py-4 text-left text-red-400 font-semibold">❌ 禁止行为</th>
                  <th className="px-6 py-4 text-left text-red-400 font-semibold">原因</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  { action: '频繁切换 IP/设备/浏览器', reason: '养号期间必须固定环境' },
                  { action: '使用自动化工具/脚本', reason: 'Meta 检测能力极强，极易被识别' },
                  { action: '短时间高频操作（疯狂加人/点赞/发帖）', reason: '机器特征，必被封' },
                  { action: '发布违规内容（色情、暴力、仇恨、虚假信息）', reason: '直接封号' },
                  { action: '新号过早进行商业推广', reason: '没养好就猛投广告，必封' },
                  { action: '资料虚假/前后矛盾', reason: '风控系统会交叉比对' },
                  { action: '不开双重验证 + 不固定 IP', reason: '账号安全无保障' },
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 text-gray-200">{item.action}</td>
                    <td className="px-6 py-4 text-gray-400">{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 四、养号日常操作 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm">四</span>
            养号日常操作（耐心是关键）
          </h2>

          {/* 固定IP */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-400" />
              固定 IP —— 新号标配
            </h3>
            <p className="text-gray-300 mb-4">很多人踩的坑：今天在家用电信 WIFI 新加坡 IP，明天到公司用联通香港 IP，后天出差用美国 IP……在 Meta 风控眼里，这种账号行为极度异常，像极了自动化脚本。</p>
            <p className="text-gray-300 mb-4"><strong className="text-white">正确做法：</strong>固定 IP + 靠谱指纹浏览器，让账号长期、稳定地从同一 IP（或同一城市/国家 IP 段）登录操作。</p>
            
            {/* 速锋科技推广 */}
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-gray-300">
                💡 <strong className="text-white">速锋科技</strong> 专注于跨境电商账号安全解决方案，提供稳定的固定 IP 配置 + 指纹浏览器服务，帮助你从底层环境上彻底规避风控风险。
              </p>
              <p className="text-gray-300 mt-2">
                想了解详情，欢迎添加微信 <strong className="text-blue-400">SFTKTKTK</strong> 咨询，拉你进交流群，有问题随时解答。
              </p>
            </div>
          </div>

          {/* 渐进式养号路线图 */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              渐进式人工养号路线图
            </h3>
            <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
              <p className="text-gray-300 mb-2"><strong className="text-white">核心思想：</strong>模仿一个真实新用户的行为轨迹，由浅入深，由慢到快，逐步建立信任。</p>
              <p className="text-gray-300 mb-2"><strong className="text-white">核心行为路径：</strong>浏览 → 点赞 → 社交（评论/关注）→ 内容创作</p>
              <p className="text-gray-300"><strong className="text-yellow-400">关键原则：慢就是快！克制！自然！</strong></p>
            </div>

            {/* Day 0 */}
            <div className="mb-6 border-l-4 border-blue-500 pl-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Day 0（注册当天）：低调潜伏，只做基础
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">上传真人头像</strong>（极其重要！）：用清晰、正面、真实的生活照或职业照。品牌号用高清 Logo。</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <X className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">不要用风景图、卡通图、动物图</span>
                </li>
                <li className="flex items-start gap-2 ml-6">
                  <X className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">不要用 AI 生成的美女/帅哥图（系统识别 AI 图能力很强）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">填充个人资料</strong>：工作经历、教育背景、当前城市、家乡、简介……尽量真实完整。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">其他操作</strong>：先不急加好友、不要点赞、不要搜索敏感词、不要改密码、不要频繁退出登录。只是浏览信息流，熟悉环境。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">在线时长</strong>：挂满至少 2 小时（可分时段，比如上午 1 小时 + 下午 1 小时）。</span>
                </li>
              </ul>
            </div>

            {/* Day 1-3 */}
            <div className="mb-6 border-l-4 border-green-500 pl-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-400" />
                Day 1–3：观察与轻度互动
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>每天累计在线 &gt; 2 小时</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>自然滚动浏览，点开感兴趣的帖子停留几十秒到几分钟（深度阅读是真人特征）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>轻度点赞：每天不超过 10–15 个，切忌短时间疯狂点赞</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>关注 2–3 个大型、知名、内容优质的品牌/媒体/名人主页（每天不超过 3–5 个）</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">这阶段绝对不要：发消息、搜索敏感词、修改姓名/生日</span>
                </li>
              </ul>
            </div>

            {/* Day 4-7 */}
            <div className="mb-6 border-l-4 border-yellow-500 pl-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                Day 4–7：建立初步社交连接
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>点赞数量可略增至每天 15–20 个</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">开始评论</strong>：在帖子下写简短、真实、有意义的评论（每天 2–5 条），避免复制粘贴</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">可以发 1–2 条简单帖子</strong>：纯文字或文字 + 单张生活图，分享心情或有趣发现，不带任何商业链接</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span><strong className="text-white">加好友</strong>：优先加真实认识的人，每天不超过 5–10 个，分散在不同时间段，加人时写个性化说明</span>
                </li>
              </ul>
            </div>

            {/* Week 2-3 */}
            <div className="mb-6 border-l-4 border-orange-500 pl-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                Week 2–3：深化互动，稳定输出内容
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>保持规律在线，浏览深度和互动质量继续提升</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>发图文结合的帖子，内容有价值、有观点</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>加入相关兴趣群组并参与讨论</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>开始与粉丝/好友进行私信互动</span>
                </li>
              </ul>
            </div>

            {/* Week 4+ */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                Week 4 及以后：巩固信任，走向成熟
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>建立品牌粉丝专页（Page），并将个人号与品牌 Page 关联</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>稳定内容输出（每周 3–5 贴）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>尝试非硬广的互动活动（征集用户故事、小问答等）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>好友/关注数量稳步自然增长</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>如目标是品牌推广，可以开始尝试投放广告</span>
                </li>
              </ul>
              <div className="mt-4 bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-yellow-300 text-sm">
                  ⚠️ 即使账号养"老"了，也别突然画风突变——平台风控是持续的，保持行为的<strong>一致性、自然性和价值性</strong>始终是核心。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 五、总结 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-sm">五</span>
            总结：养号其实是在模拟"做人"
          </h2>
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              一个好的 Meta 账号，本质上是一个有血有肉、有生活轨迹的"人"。你越自然，系统越信任你；系统越信任你，你的账号权重越高，后续无论是做内容、投广告还是引流，效果都会事半功倍。
            </p>
          </div>
        </section>

        {/* 联系我们 */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">想要系统学习跨境账号运营？</h2>
          <p className="text-white/80 mb-6">
            FB/IG 养号技巧、最新平台动态、养号干货和避坑指南
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="bg-white rounded-xl px-6 py-4">
              <p className="text-gray-600 text-sm mb-1">添加微信</p>
              <p className="text-2xl font-bold text-gray-900">SFTKTKTK</p>
              <p className="text-gray-500 text-xs mt-1">备注「养号」拉你进交流群</p>
            </div>
          </div>
          <p className="text-white/60 mt-6 text-sm">
            <strong className="text-white">速锋科技</strong> | 专注跨境电商账号安全与运营增长
          </p>
          <p className="text-white/40 mt-2 text-sm">
            🌐 <a href="https://www.tktkx.cn" target="_blank" rel="noopener noreferrer" className="hover:text-white/60">www.tktkx.cn</a>
          </p>
        </section>

        {/* 底部信息 */}
        <footer className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 速锋科技 版权所有</p>
            <p className="mt-2">本文内容旨在帮助用户正确养号，避免封号风险</p>
          </div>
        </footer>
      </article>
    </div>
  );
}
