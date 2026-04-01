import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TrendingUp, Users, Package, DollarSign, Clock, Star, CheckCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

export default function SuccessCasesPage() {
  useSEO({
    title: '学员成功案例 | 速锋科技 - TikTok橱窗号真实变现案例',
    description: '速锋科技学员真实案例：3个月从0粉到10000+粉，月销售额突破5万元。查看更多TikTok橱窗号陪跑成功故事，了解如何快速实现变现。',
    canonical: 'https://www.tktkx.cn/success-cases',
  });
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const successCases = [
    {
      id: 1,
      name: "王杰",
      avatar: "👨",
      previousJob: "银行职员",
      previousSalary: "3,000元/月",
      currentIncome: "30,000元/月",
      growthTime: "3个月",
      category: "美国TikTok",
      product: "化妆品",
      tags: ["零基础", "副业", "跨境电商"],
      color: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      borderColor: "border-pink-500",
      incomeData: [
        { month: '第1月', income: 800 },
        { month: '第2月', income: 5000 },
        { month: '第3月', income: 15000 },
        { month: '第4月', income: 25000 },
        { month: '第5月', income: 30000 },
      ],
      story: [
        { type: 'title', content: '从银行柜员到TikTok美妆博主' },
        { type: 'paragraph', content: '王杰原本是某银行的一名普通职员，每天朝九晚五，月薪3000元。工作稳定但收入有限，看着房价上涨、生活成本增加，他一直在寻找副业机会。' },
        { type: 'subtitle', content: '初次接触' },
        { type: 'paragraph', content: '2024年3月，王杰偶然了解到我们的TikTok陪跑服务。虽然他对视频剪辑和海外社交媒体完全陌生，但看到学员的成功案例后，决定试一试。' },
        { type: 'subtitle', content: '学习过程' },
        { type: 'paragraph', content: '第1个月：从零开始学习，每天下班后花2-3小时研究TikTok算法、学习视频剪辑。在我们的指导下，他选择了化妆品赛道，因为产品体积小、物流方便、利润空间大。' },
        { type: 'paragraph', content: '第2个月：开始发布第一条视频，播放量只有2000次，但他没有放弃。通过数据分析和优化，视频质量逐渐提升，单条视频播放量突破10万，开始有订单进来。' },
        { type: 'paragraph', content: '第3个月：账号粉丝突破5万，单日最高订单达到200单，月收入首次突破1.5万元！' },
        { type: 'subtitle', content: '取得成绩' },
        { type: 'paragraph', content: '经过5个月的坚持，王杰现在已经建立了自己的化妆品品牌，月收入稳定在3万元以上，远超原本的银行工资。他组建了3人小团队，专注于内容创作和供应链管理。' },
        { type: 'subtitle', content: '关键成功因素' },
        { type: 'list', items: [
          '精准定位美国年轻女性市场',
          '选择高利润、低物流成本的化妆品',
          '坚持每天发布1-2条高质量视频',
          '善用TikTok算法，不断优化内容策略',
          '快速响应市场趋势，推出爆款产品'
        ]}
      ],
      achievements: [
        { label: "当前粉丝", value: "12.5万", icon: Users },
        { label: "月订单量", value: "2,800+", icon: Package },
        { label: "月收入", value: "30,000+", icon: DollarSign },
        { label: "经营时长", value: "5个月", icon: Clock },
      ],
      tips: [
        "选择自己熟悉或感兴趣的领域",
        "前期不要追求完美，先做起来",
        "关注数据，用数据指导内容优化",
        "保持耐心，前3个月最关键",
        "学会利用团队协作，放大收益"
      ]
    },
    {
      id: 2,
      name: "李小红",
      avatar: "👩",
      previousJob: "超市理货员",
      previousSalary: "3,500元/月",
      currentIncome: "10,000元/月",
      growthTime: "2个月",
      category: "国内TikTok",
      product: "日用百货",
      tags: ["宝妈", "时间灵活", "零成本"],
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-500",
      incomeData: [
        { month: '第1月', income: 2000 },
        { month: '第2月', income: 6000 },
        { month: '第3月', income: 9000 },
        { month: '第4月', income: 10000 },
      ],
      story: [
        { type: 'title', content: '超市理货员的逆袭之路' },
        { type: 'paragraph', content: '李小红是一位34岁的宝妈，在社区超市做理货员，月薪3500元。每天从早忙到晚，还要照顾两个孩子的学习，生活压力很大。她一直想找一份时间灵活、能在家办公的工作。' },
        { type: 'subtitle', content: '机缘巧合' },
        { type: 'paragraph', content: '在一次朋友聚会上，李小红听说了我们的TikTok陪跑服务。起初她担心自己学历不高、没有经验，但了解到不需要直播、只需要录短视频后，她决定尝试一下。' },
        { type: 'subtitle', content: '学习与实践' },
        { type: 'paragraph', content: '第1个月：选择了日用百货赛道，因为这类产品家家都需要，需求稳定。每天利用孩子上学后的时间学习剪辑，晚上孩子睡着后制作视频。第一条视频播放量5000，获得了20个订单！' },
        { type: 'paragraph', content: '第2个月：掌握了爆款视频的制作技巧，单条视频最高播放量达到50万，日订单量突破100单。收入首次超过超市工资。' },
        { type: 'paragraph', content: '第3个月：收入稳定在万元以上，果断辞去了超市工作，全职做TikTok带货。现在她每天只需工作4-5小时，有更多时间陪伴孩子。' },
        { type: 'subtitle', content: '生活改变' },
        { type: 'paragraph', content: '不仅收入翻倍，李小红的生活质量也大大提升：换了更大的房子，给孩子报了兴趣班，还计划带家人旅游。她说："这是我做梦都不敢想的改变。"' },
        { type: 'subtitle', content: '成功秘诀' },
        { type: 'list', items: [
          '利用碎片时间，灵活安排工作',
          '选择单价低、需求大的日用品',
          '突出性价比，吸引价格敏感用户',
          '真诚分享，建立信任感',
          '坚持每天更新，保持账号活跃度'
        ]}
      ],
      achievements: [
        { label: "当前粉丝", value: "8.6万", icon: Users },
        { label: "月订单量", value: "1,500+", icon: Package },
        { label: "月收入", value: "10,000+", icon: DollarSign },
        { label: "经营时长", value: "4个月", icon: Clock },
      ],
      tips: [
        "宝妈也能做TikTok，时间灵活是优势",
        "选择生活类产品，贴近用户日常",
        "真诚分享比专业讲解更有效",
        "多关注同类账号，学习优秀案例",
        "家人支持很重要，沟通很关键"
      ]
    },
    {
      id: 3,
      name: "张伟",
      avatar: "👨‍💼",
      previousJob: "房地产销售",
      previousSalary: "5,000元/月",
      currentIncome: "25,000元/月",
      growthTime: "4个月",
      category: "英国TikTok",
      product: "家居用品",
      tags: ["销售转型", "高客单价", "团队运营"],
      color: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      borderColor: "border-purple-500",
      incomeData: [
        { month: '第1月', income: 1000 },
        { month: '第2月', income: 5000 },
        { month: '第3月', income: 12000 },
        { month: '第4月', income: 20000 },
        { month: '第5月', income: 25000 },
      ],
      story: [
        { type: 'title', content: '房产销售转型TikTok家居博主' },
        { type: 'paragraph', content: '张伟曾是某房地产公司的金牌销售，月薪5000元加提成，但受房地产市场低迷影响，提成大幅减少，收入不稳定。他一直在寻找新的发展方向。' },
        { type: 'subtitle', content: '转型决定' },
        { type: 'paragraph', content: '2024年5月，张伟报名参加了我们的TikTok陪跑服务。凭借多年销售经验，他很快就理解了带货的本质：找到目标客户，提供有价值的产品。' },
        { type: 'subtitle', content: '快速成长' },
        { type: 'paragraph', content: '第1个月：选择了家居用品赛道，客单价高，利润空间大。发挥销售经验优势，很快掌握了产品卖点提炼和用户痛点挖掘技巧。' },
        { type: 'paragraph', content: '第2个月：账号粉丝突破2万，开始接到家居品牌的合作邀请，单月收入首次过万。' },
        { type: 'paragraph', content: '第3-4个月：组建了5人团队，负责产品拍摄、剪辑、客服和物流。月收入突破2万，远超做房产销售时的最高水平。' },
        { type: 'subtitle', content: '团队化运营' },
        { type: 'paragraph', content: '张伟特别注重团队建设，他认为一个人可以走得快，但一群人可以走得远。团队分工明确：' },
        { type: 'list', items: [
          '产品拍摄：专业摄影师负责产品图和视频拍摄',
          '内容剪辑：2名剪辑师负责视频后期制作',
          '客户服务：1名客服负责订单处理和售后',
          '张伟本人：负责产品选品、内容策划和品牌对接'
        ]},
        { type: 'subtitle', content: '未来规划' },
        { type: 'paragraph', content: '目前张伟正在筹备自己的家居品牌，计划从卖别人的产品转型为卖自己的产品。他说："TikTok给了我一个全新的舞台，我想在这里实现更大的梦想。"' }
      ],
      achievements: [
        { label: "当前粉丝", value: "15.8万", icon: Users },
        { label: "月订单量", value: "2,000+", icon: Package },
        { label: "月收入", value: "25,000+", icon: DollarSign },
        { label: "团队成员", value: "5人", icon: Users },
      ],
      tips: [
        "发挥自身优势，转型不是从零开始",
        "团队化运营是规模化发展的关键",
        "高客单价产品需要更专业的服务",
        "品牌合作是重要的收入来源",
        "要有长远规划，不止于带货"
      ]
    }
  ];

  const renderStoryContent = (content: any[], colorClass: string) => {
    return content.map((item, idx) => {
      const key = `story-${idx}`;
      
      switch (item.type) {
        case 'title':
          return <h3 key={key} className="text-xl font-bold text-gray-800 mb-3">{item.content}</h3>;
        case 'subtitle':
          return <h4 key={key} className={`text-lg font-semibold ${colorClass} mb-2`}>{item.content}</h4>;
        case 'paragraph':
          return <p key={key} className="text-gray-700 mb-4">{item.content}</p>;
        case 'list':
          return (
            <ul key={key} className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              {item.items.map((listItem: string, listIdx: number) => (
                <li key={`${key}-${listIdx}`}>{listItem}</li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  const caseItem = successCases[selectedCase];
  const colorClass = selectedCase === 0 ? 'text-pink-600' : 
                    selectedCase === 1 ? 'text-blue-600' : 'text-purple-600';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            返回首页
          </Link>
        </div>
      </nav>

      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            成功案例
          </h1>
          <p className="text-xl text-pink-100">
            真实学员的成功故事，你也可以做到
          </p>
        </div>
      </div>

      {/* 案例选择器 */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {successCases.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedCase(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCase === index
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* 案例详情 */}
      <div className="container mx-auto px-4 pb-16">
        <div className={`bg-gradient-to-r ${caseItem.bgGradient} rounded-3xl p-8 mb-8 border-2 ${caseItem.borderColor}`}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 左侧：基本信息 */}
            <div>
              <div className="flex items-center mb-6">
                <div className="text-6xl mr-4">{caseItem.avatar}</div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{caseItem.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {caseItem.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-32 text-gray-600">原职业：</div>
                  <div className="font-semibold text-gray-800">{caseItem.previousJob}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-gray-600">原收入：</div>
                  <div className="font-semibold text-gray-800">{caseItem.previousSalary}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-gray-600">现收入：</div>
                  <div className={`font-bold text-2xl bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent`}>
                    {caseItem.currentIncome}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-gray-600">增长时间：</div>
                  <div className="font-semibold text-gray-800">{caseItem.growthTime}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-gray-600">运营平台：</div>
                  <div className="font-semibold text-gray-800">{caseItem.category}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-gray-600">产品类别：</div>
                  <div className="font-semibold text-gray-800">{caseItem.product}</div>
                </div>
              </div>
            </div>

            {/* 右侧：收入增长 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-pink-600" />
                收入增长曲线
              </h3>
              <div className="space-y-3">
                {caseItem.incomeData.map((data, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-24 text-gray-600">{data.month}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 mr-3 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${caseItem.color}`}
                        style={{ width: `${(data.income / 30000) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-semibold text-gray-800 w-20 text-right">
                      ¥{data.income.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 数据统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {caseItem.achievements.map((achievement, idx) => {
            const Icon = achievement.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <Icon className="h-10 w-10 mx-auto mb-3 text-pink-600" />
                <div className={`text-2xl font-bold bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent mb-1`}>
                  {achievement.value}
                </div>
                <div className="text-gray-600 text-sm">{achievement.label}</div>
              </div>
            );
          })}
        </div>

        {/* 成功故事 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            成功故事
          </h3>
          <div className="text-gray-700 leading-relaxed space-y-4">
            {renderStoryContent(caseItem.story, colorClass)}
          </div>
        </div>

        {/* 成功秘诀 */}
        <div className={`bg-gradient-to-r ${caseItem.bgGradient} rounded-2xl p-8 border-2 ${caseItem.borderColor}`}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
            成功秘诀
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {caseItem.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start bg-white rounded-xl p-4 shadow">
                <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-700 mb-6">
            看了这些成功案例，你是不是也心动了？
          </p>
          <Link
            to="/coaching-application"
            className="inline-flex items-center bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            开始你的陪跑计划
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
