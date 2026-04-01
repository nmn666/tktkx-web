import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TKAccountPurchaseFAQ() {
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
          TK账号购买常见问题FAQ
        </h1>

        {/* 一句话定义 */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">一句话定义</h2>
          <p className="text-blue-800 text-xl font-medium">
            购买TK账号需验证真实性、历史记录、粉丝质量，选择可靠卖家
          </p>
        </div>

        {/* 详细解释 */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">详细解释</h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">什么是TK账号购买？</h3>
              <p className="mb-4">
                TK账号购买是指从第三方卖家购买已经注册并运营过一段时间的TikTok账号，而不是从零开始注册新账号。这种方式可以跳过新账号的培育期，快速获得具有一定粉丝基础和账号权重的账号，从而更快地开展带货业务。
              </p>
              <p>
                常见的购买类型包括：满月号（注册满30天）、橱窗号（已开通橱窗功能）、老号（运营时间较长）、带货号（已有带货经验）等。价格从几十元到几千元不等，取决于账号的质量、粉丝数量、粉丝质量等因素。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">购买账号的利弊分析</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h4 className="font-bold text-green-900 mb-3">✅ 优势</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• <strong>节省时间：</strong>跳过30天培育期，立即使用</li>
                    <li>• <strong>有粉丝基础：</strong>不用从零开始涨粉</li>
                    <li>• <strong>账号权重高：</strong>新账号权重不稳定，老号更稳定</li>
                    <li>• <strong>可直接带货：</strong>部分账号已开通橱窗</li>
                    <li>• <strong>降低封号风险：</strong>已度过新手观察期</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                  <h4 className="font-bold text-red-900 mb-3">❌ 劣势</h4>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• <strong>价格成本：</strong>购买账号需要花钱</li>
                    <li>• <strong>质量不确定：</strong>可能买到劣质账号</li>
                    <li>• <strong>历史风险：</strong>账号可能有违规记录</li>
                    <li>• <strong>虚假粉丝：</strong>粉丝可能是刷出来的假粉</li>
                    <li>• <strong>安全隐患：</strong>账号可能被卖家找回</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">购买账号前的10个必备检查</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-blue-900 mb-2">检查1：账号注册时间</h4>
                  <p className="text-sm text-blue-800">
                    确认账号的注册时间，要求至少满30天。可以通过账号设置查看注册日期，或让卖家提供注册截图。如果注册时间不足，账号可能无法开通橱窗。
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-green-900 mb-2">检查2：粉丝数量和质量</h4>
                  <p className="text-sm text-green-800">
                    确认粉丝数量是否与卖家描述一致。更重要的是检查粉丝质量：粉丝头像是否正常、是否有动态、粉丝地域分布是否合理。大量无头像粉丝、全是同一地区粉丝，很可能是假粉。
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-purple-900 mb-2">检查3：违规记录</h4>
                  <p className="text-sm text-purple-800">
                    要求卖家提供账号无违规记录的证明。查看账号的视频是否有被下架、是否有警告通知。账号有违规记录，即使现在正常，也可能在未来被限制功能。
                  </p>
                </div>

                <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-pink-900 mb-2">检查4：内容质量和数量</h4>
                  <p className="text-sm text-pink-800">
                    查看账号发布过的视频，内容质量如何、数量有多少。如果账号几乎没有内容或内容质量很差，说明卖家没有认真运营，账号质量堪忧。
                  </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-yellow-900 mb-2">检查5：橱窗状态</h4>
                  <p className="text-sm text-yellow-800">
                    如果卖家声称账号已开通橱窗，必须亲自验证。进入账号主页，查看是否有橱窗入口，点击橱窗查看是否有商品。未开通橱窗的账号价值要打折扣。
                  </p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-orange-900 mb-2">检查6：账号绑定信息</h4>
                  <p className="text-sm text-orange-800">
                    确认账号绑定的是手机号还是邮箱。建议选择手机号绑定的账号，安全性和可找回性更高。同时确认绑定信息是否可以修改，拿到账号后要立即修改绑定信息。
                  </p>
                </div>

                <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-teal-900 mb-2">检查7：卖家信誉</h4>
                  <p className="text-sm text-teal-800">
                    查看卖家的信誉评价、交易记录、客户反馈。优先选择有良好信誉、有售后保障的卖家。避免选择价格异常低廉、无评价、无售后的卖家。
                  </p>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-indigo-900 mb-2">检查8：账号来源</h4>
                  <p className="text-sm text-indigo-800">
                    了解账号的来源渠道。账号是通过正规渠道注册，还是批量注册、盗号获取？正规注册的账号安全性更高，批量注册和盗号账号风险很大。
                  </p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-rose-900 mb-2">检查9：价格合理性</h4>
                  <p className="text-sm text-rose-800">
                    对比市场行情，价格是否合理。价格异常低廉的账号，很可能有猫腻（假粉、违规、会被找回等）。价格过高，则要考虑性价比。货比三家，选择价格合理的产品。
                  </p>
                </div>

                <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-cyan-900 mb-2">检查10：售后保障</h4>
                  <p className="text-sm text-cyan-800">
                    确认卖家的售后政策：是否提供7天无理由退换？账号出问题是否支持售后？售后是否有时间限制？完善的售后保障可以降低购买风险。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">账号购买流程</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>需求确定：</strong>明确需要什么类型的账号（满月号、橱窗号、老号等），预算范围是多少
                </li>
                <li>
                  <strong>卖家筛选：</strong>根据需求寻找可靠的卖家，对比价格、服务、信誉
                </li>
                <li>
                  <strong>账号验证：</strong>要求卖家提供账号详细信息，进行必要的验证和检查
                </li>
                <li>
                  <strong>交易支付：</strong>选择安全的交易方式，避免直接转账，使用有保障的平台
                </li>
                <li>
                  <strong>账号交接：</strong>收到账号后，立即修改密码和绑定信息，确保账号安全
                </li>
                <li>
                  <strong>账号验收：</strong>验收账号功能是否正常，粉丝数量是否一致，橱窗是否可用
                </li>
                <li>
                  <strong>后续运营：</strong>账号验收后，正常运营，避免敏感操作
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">避免被骗的5个关键提示</h3>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <ul className="space-y-2 text-sm text-red-800">
                  <li>• <strong>不要预付全款：</strong>采用担保交易，先验货再付款</li>
                  <li>• <strong>使用官方平台：</strong>优先在知名交易平台购买，避免私下交易</li>
                  <li>• <strong>保留交易凭证：</strong>保存聊天记录、交易截图、账号信息</li>
                  <li>• <strong>警惕异常低价：</strong>价格远低于市场价的账号很可能是骗局</li>
                  <li>• <strong>验证卖家身份：</strong>确认卖家的联系方式真实可靠，避免被拉黑</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">购买账号后的安全操作</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>立即修改密码：</strong>拿到账号后立即修改登录密码</li>
                <li><strong>更换绑定信息：</strong>修改绑定的手机号和邮箱，确保账号完全属于自己</li>
                <li><strong>清理历史内容：</strong>删除之前的视频或隐藏，避免影响新定位</li>
                <li><strong>逐步更换风格：</strong>不要突然完全改变内容风格，要循序渐进</li>
                <li><strong>保持活跃度：</strong>持续发布内容，保持账号活跃</li>
                <li><strong>避免敏感操作：</strong>不要频繁更换设备、频繁修改资料</li>
                <li><strong>定期检查账号状态：</strong>定期登录查看账号是否正常</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">常见问题</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q1: 购买的账号会不会被原卖家找回？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A1:</strong> 有可能。如果卖家恶意找回账号，买家可能失去账号和投入的资金。为降低风险：1）选择信誉好的卖家；2）拿到账号后立即修改所有绑定信息；3）要求卖家提供原注册信息的转让证明；4）在合同中约定账号找回的赔偿责任。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q2: 购买的账号被封了怎么办？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A2:</strong> 首先分析封号原因：是购买前就有违规记录，还是购买后操作不当导致。如果是购买前就有问题，可以联系卖家协商退款或换号；如果是购买后操作不当，只能自己承担。建议购买前充分验证账号状态。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q3: 购买账号和从零注册哪个更好？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A3:</strong> 各有优劣。购买账号可以快速开始，但成本高、风险大；从零注册成本低、安全可控，但需要时间培育。如果预算充足、急于开展业务，可以考虑购买账号；如果预算有限、有时间等待，建议从零注册。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q4: 如何判断账号的粉丝是否真实？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A4:</strong> 可以从几个方面判断：1）粉丝头像是否正常（无头像粉丝多可能是假粉）；2）粉丝是否有发布内容；3）粉丝地域分布是否合理（真实账号地域分布广泛，假粉可能集中在一两个地区）；4）查看账号视频的点赞、评论数据，如果粉丝多但互动少，可能是假粉。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q5: 满月号和橱窗号的价格大概是多少？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A5:</strong> 价格受市场供需影响，会有波动。大概范围：普通满月号（1000粉丝以内）50-150元；高质量满月号（1000-5000粉丝）150-500元；普通橱窗号（已开通橱窗，1000-5000粉丝）300-800元；高质量橱窗号（5000粉丝以上，带货经验）800-2000元。价格仅供参考，具体以实际市场为准。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
