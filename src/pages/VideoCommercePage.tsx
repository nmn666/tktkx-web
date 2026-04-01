import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VideoCommercePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </button>

        {/* 页面标题 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          视频带货从0到1：新手避坑指南
        </h1>

        {/* 一句话定义 */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">一句话定义</h2>
          <p className="text-blue-800 text-xl font-medium">
            视频带货需选品、优化内容、遵守规则，避免违规和低质内容
          </p>
        </div>

        {/* 详细解释 */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">详细解释</h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">什么是视频带货？</h3>
              <p className="mb-4">
                视频带货是指在TikTok等短视频平台通过发布商品推广视频，引导用户点击橱窗链接购买商品的商业模式。创作者通过在视频中展示、介绍、推荐商品，吸引用户点击购买，从而获得佣金分成。
              </p>
              <p>
                这种模式具有低门槛、高转化、快节奏的特点，适合新手快速上手。但同时也存在激烈的竞争和严格的平台规则，新手需要特别注意避免各种陷阱和违规行为。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">新手必须避开的10大坑</h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-red-900 mb-2">🚨 坑1：盲目选品，不考虑市场需求</h4>
                  <p className="text-red-800 text-sm mb-2">
                    很多新手看到别人卖什么就跟着卖，完全不分析市场需求和竞争情况。
                  </p>
                  <p className="text-red-700 text-sm">
                    <strong>避坑建议：</strong>先研究目标市场，了解用户需求，选择有需求且竞争相对较小的品类。可以使用TikTok的热门商品榜单、同类账号的商品作为参考。
                  </p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-orange-900 mb-2">🚨 坑2：过度营销，硬广硬推</h4>
                  <p className="text-orange-800 text-sm mb-2">
                    视频全程都是"买买买"、"超级便宜"，完全不考虑内容价值，很容易被用户划走。
                  </p>
                  <p className="text-orange-700 text-sm">
                    <strong>避坑建议：</strong>内容为王，先让用户愿意看下去。通过有趣的剧情、实用的教程、真诚的分享来展示产品，在内容中自然植入商品，而不是硬推。
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-yellow-900 mb-2">🚨 坑3：虚假宣传，夸大效果</h4>
                  <p className="text-yellow-800 text-sm mb-2">
                    为了转化率，夸大产品效果，甚至使用虚假的"前后对比"，严重违反平台规则。
                  </p>
                  <p className="text-yellow-700 text-sm">
                    <strong>避坑建议：</strong>实事求是地展示产品，突出真实优点，不隐瞒缺点。用户购买后的好评才是长期的转化来源，虚假宣传只会导致差评和账号降权。
                  </p>
                </div>

                <div className="bg-pink-50 border-l-4 border-pink-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-pink-900 mb-2">🚨 坑4：刷赞刷粉，虚假数据</h4>
                  <p className="text-pink-800 text-sm mb-2">
                    为了快速涨粉，花钱买粉丝、买点赞，看似数据漂亮，但完全无真实转化。
                  </p>
                  <p className="text-pink-700 text-sm">
                    <strong>避坑建议：</strong>依靠优质内容和持续运营吸引真实粉丝。虚假粉丝不仅不会购买商品，还会让算法认为内容质量低，反而降低推荐权重。
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-purple-900 mb-2">🚨 坑5：频繁更换选品，缺乏垂直度</h4>
                  <p className="text-purple-800 text-sm mb-2">
                    今天卖美妆，明天卖服饰，后天卖食品，账号定位混乱，粉丝不知道关注你干嘛。
                  </p>
                  <p className="text-purple-700 text-sm">
                    <strong>避坑建议：</strong>专注一个垂直领域，建立专业人设。粉丝关注你是因为你在这个领域有价值，频繁更换品类会失去粉丝信任。
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-blue-900 mb-2">🚨 坑6：忽视版权问题，随意使用素材</h4>
                  <p className="text-blue-800 text-sm mb-2">
                    直接使用网上的图片、视频、音乐作为素材，容易侵犯版权，导致视频被下架甚至封号。
                  </p>
                  <p className="text-blue-700 text-sm">
                    <strong>避坑建议：</strong>使用TikTok官方音乐库的音乐，自己拍摄产品展示图片，使用免费可商用的素材网站，避免侵权风险。
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-green-900 mb-2">🚨 坑7：忽视评论互动，不回复粉丝</h4>
                  <p className="text-green-800 text-sm mb-2">
                    发布视频后完全不管评论，粉丝有疑问不回复，互动率为零。
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>避坑建议：</strong>积极回复评论，解答用户疑问，引导用户关注和购买。互动是TikTok算法的重要指标，高互动率可以获得更多推荐。
                  </p>
                </div>

                <div className="bg-teal-50 border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-teal-900 mb-2">🚨 坑8：发布频率不合理，或太少或太多</h4>
                  <p className="text-teal-800 text-sm mb-2">
                    要么一周才发一条，要么一天发10条，都没有掌握好发布节奏。
                  </p>
                  <p className="text-teal-700 text-sm">
                    <strong>避坑建议：</strong>保持稳定的发布频率，建议每天1-3条视频，在用户活跃时间段发布（如早8-9点、晚8-10点）。持续的内容输出才能培养粉丝观看习惯。
                  </p>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-indigo-900 mb-2">🚨 坑9：忽视数据分析，盲目坚持</h4>
                  <p className="text-indigo-800 text-sm mb-2">
                    不看视频数据，不知道哪些视频受欢迎，哪些不受欢迎，一直做同样的内容。
                  </p>
                  <p className="text-indigo-700 text-sm">
                    <strong>避坑建议：</strong>定期查看TikTok创作者工具的数据，分析完播率、点赞率、评论率、转化率，根据数据优化内容策略，复制成功，避免失败。
                  </p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-500 p-5 rounded-r-lg">
                  <h4 className="font-bold text-rose-900 mb-2">🚨 坑10：急功近利，期望一夜暴富</h4>
                  <p className="text-rose-800 text-sm mb-2">
                    期望发几条视频就爆单，赚大钱，现实落差导致心态崩溃，半途而废。
                  </p>
                  <p className="text-rose-700 text-sm">
                    <strong>避坑建议：</strong>视频带货是一个长期过程，需要持续投入时间和精力。制定合理的目标，从小到大逐步积累。前1-3个月是积累期，保持耐心和持续输出。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">新手入门的5个正确姿势</h3>
              
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">✅ 姿势1：明确账号定位</h4>
                  <p className="text-sm text-green-800">
                    在开始之前，明确账号定位：我是谁？我要卖给谁？我能提供什么价值？清晰的定位有助于吸引精准粉丝，提高转化率。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">✅ 姿势2：研究优质案例</h4>
                  <p className="text-sm text-green-800">
                    找到同领域做得好的账号，分析他们的内容形式、选品策略、文案风格、互动方式。学习别人的成功经验，但不要完全复制，要有自己的特色。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">✅ 姿势3：从小处着手，快速迭代</h4>
                  <p className="text-sm text-green-800">
                    不要一开始就追求完美，先发布内容，根据反馈快速调整。A/B测试不同的内容形式、选品组合，找到最适合自己账号的模式。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">✅ 姿势4：关注数据和反馈</h4>
                  <p className="text-sm text-green-800">
                    每天查看视频数据，了解用户的真实反馈。哪些内容受欢迎？哪些产品转化高？根据数据不断优化内容和选品策略。
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">✅ 姿势5：保持学习和适应</h4>
                  <p className="text-sm text-green-800">
                    TikTok平台规则和用户喜好在不断变化，需要持续学习最新的运营技巧和趋势。关注官方动态，参加培训课程，保持对市场的敏感度。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">成功带货的3个核心要素</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-5 text-white">
                  <h4 className="font-bold text-xl mb-3">📦 选品能力</h4>
                  <p className="text-sm text-blue-50">
                    选择有市场需求、有利润空间、适合视频展示的产品。选品决定了50%的成功率，选对产品事半功倍。
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-5 text-white">
                  <h4 className="font-bold text-xl mb-3">🎬 内容质量</h4>
                  <p className="text-sm text-purple-50">
                    高质量的视频内容是吸引和留住用户的关键。画面清晰、音质优秀、内容有趣、信息准确。
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-5 text-white">
                  <h4 className="font-bold text-xl mb-3">🎯 转化策略</h4>
                  <p className="text-sm text-pink-50">
                    从内容到购买的转化路径要顺畅。产品展示要突出卖点，文案要有吸引力，评论区要引导购买。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">新手建议的起步时间表</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">时间</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">目标</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">关键动作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">第1周</td>
                      <td className="px-4 py-3 text-sm text-gray-700">账号搭建</td>
                      <td className="px-4 py-3 text-sm text-gray-700">完善资料、确定定位、关注对标账号</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">第2-4周</td>
                      <td className="px-4 py-3 text-sm text-gray-700">内容测试</td>
                      <td className="px-4 py-3 text-sm text-gray-700">发布10-15条视频，测试不同内容形式</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">第2个月</td>
                      <td className="px-4 py-3 text-sm text-gray-700">策略优化</td>
                      <td className="px-4 py-3 text-sm text-gray-700">根据数据优化内容，稳定发布节奏</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">第3个月</td>
                      <td className="px-4 py-3 text-sm text-gray-700">转化提升</td>
                      <td className="px-4 py-3 text-sm text-gray-700">重点提升转化率，尝试直播带货</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">第4-6个月</td>
                      <td className="px-4 py-3 text-sm text-gray-700">规模化运营</td>
                      <td className="px-4 py-3 text-sm text-gray-700">扩大内容规模，拓展更多商品品类</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">常见问题</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q1: 新手多久能开始有销量？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A1:</strong> 因人而异，取决于内容质量、选品能力和运营策略。通常第1个月是测试期，基本不会有销量；第2个月开始可能有零星订单；第3个月如果运营得当，可以开始稳定出单。保持耐心，持续优化是关键。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q2: 需要投入多少资金才能开始视频带货？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A2:</strong> 视频带货的启动资金可高可低。最低配置：一部手机、稳定的网络、免费的视频剪辑软件，基本零成本启动。如果想要更好的效果，可以投入资金购买设备（相机、灯光）、购买样品用于拍摄、投放广告等。建议从小投入开始，根据效果逐步增加。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q3: 视频带货需要开直播吗？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A3:</strong> 不一定。视频带货主要以短视频为主，通过视频展示产品、引导购买。直播带货是可选的进阶方式，通常在短视频账号运营到一定规模后开始尝试。直播可以实时互动、解答疑问，转化率更高，但对主播的临场应变能力要求更高。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q4: 如何判断一个产品是否适合视频带货？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A4:</strong> 可以从几个维度判断：1）视觉吸引力：产品是否在视频中好看、有卖点；2）价格区间：适合大众消费，单价不宜过高；3）市场需求：有足够的目标用户群体；4）竞争程度：选择竞争相对较小的细分品类；5）佣金比例：确保有足够的利润空间。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q5: 如果视频没有流量怎么办？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A5:</strong> 首先分析原因：是内容质量差、发布时间不对、还是算法推荐问题。建议：1）检查视频是否清晰、音质是否良好；2）尝试在不同的时间段发布；3）优化标题和文案；4）参与热门话题和挑战；5）分析优质账号，学习改进。不要灰心，持续优化，流量会逐步改善。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
