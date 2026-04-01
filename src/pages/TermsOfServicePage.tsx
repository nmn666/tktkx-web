import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            返回首页
          </Link>
        </div>
      </nav>

      {/* 页面内容 */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">服务条款</h1>
          
          <div className="text-gray-700 space-y-6 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. 服务条款的接受</h2>
              <p className="mb-3">
                欢迎使用TikTok变现专家平台。通过访问或使用本网站及我们提供的服务，您同意遵守本服务条款。如果您不同意本服务条款的任何部分，请不要使用我们的服务。
              </p>
              <p>
                我们保留随时修改本服务条款的权利。修改后的条款一旦公布即生效。您在修改后继续使用我们的服务，即视为您接受修改后的条款。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. 服务描述</h2>
              <p className="mb-3">
                TikTok变现专家平台提供TikTok账号运营培训、陪跑服务、账号交易等相关服务。我们致力于帮助用户从零开始运营TikTok账号，实现内容变现。
              </p>
              <p className="mb-3">
                我们提供的服务包括但不限于：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>TikTok账号陪跑培训服务</li>
                <li>账号注册与设置指导</li>
                <li>内容创作与剪辑培训</li>
                <li>账号交易市场服务</li>
                <li>运营数据分析与优化</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. 用户责任</h2>
              <p className="mb-3">
                使用本平台服务时，您同意：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>提供真实、准确、完整的个人信息</li>
                <li>维护账号信息的及时更新</li>
                <li>不使用本平台进行任何违法或违规活动</li>
                <li>遵守TikTok平台的相关规则和政策</li>
                <li>不侵犯他人知识产权、隐私权或其他合法权益</li>
                <li>不传播虚假信息、欺诈信息或有害内容</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. 账号安全</h2>
              <p className="mb-3">
                您对本账号的密码和信息安全负全部责任。您应妥善保管账号信息，不得将账号信息提供给他人使用。
              </p>
              <p>
                如发现任何未经授权使用您的账号的情况，请立即通知我们。我们将协助您采取措施保护您的账号安全。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. 服务费用</h2>
              <p className="mb-3">
                我们的部分服务可能需要支付费用。具体的收费标准将在相关服务页面中明确说明。
              </p>
              <p className="mb-3">
                支付方式包括但不限于：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>在线支付</li>
                <li>银行转账</li>
                <li>第三方支付平台</li>
              </ul>
              <p>
                支付成功后，费用一般不予退还，除非因平台原因导致服务无法正常提供。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. 知识产权</h2>
              <p className="mb-3">
                本网站的所有内容，包括但不限于文字、图片、视频、音频、软件、代码等，均受知识产权法保护。
              </p>
              <p className="mb-3">
                未经我们事先书面许可，您不得：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>复制、修改、传播本网站的内容</li>
                <li>将本网站的内容用于商业目的</li>
                <li>删除或修改本网站的版权声明</li>
              </ul>
              <p>
                您在使用本平台过程中产生的原创内容，知识产权归您所有。但您授予我们在提供服务所需的范围内使用这些内容的权利。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. 免责声明</h2>
              <p className="mb-3">
                本平台提供的服务"按现状"提供，不提供任何明示或暗示的保证，包括但不限于：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>服务的适用性、可靠性或及时性</li>
                <li>服务不会出现错误或中断</li>
                <li>服务能够满足您的特定需求</li>
              </ul>
              <p>
                我们不对因使用本服务而导致的任何直接或间接损失承担责任，包括但不限于利润损失、数据丢失或其他经济损失。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. 限制责任</h2>
              <p>
                在法律允许的最大范围内，我们对您因使用本服务而遭受的任何损害承担责任的总金额，不超过您为使用本服务而支付的费用总额。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. 争议解决</h2>
              <p className="mb-3">
                如发生与本服务条款相关的争议，双方应首先通过友好协商解决。
              </p>
              <p>
                如协商不成，任何一方均有权向本平台所在地有管辖权的人民法院提起诉讼。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. 条款修改</h2>
              <p>
                我们保留随时修改本服务条款的权利。修改后的条款将在本网站上公布，自公布之日起生效。您在修改后继续使用我们的服务，即视为您接受修改后的条款。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. 联系我们</h2>
              <p className="mb-3">
                如您对本服务条款有任何疑问或建议，请通过以下方式联系我们：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>邮箱：t8578870@gmail.com</li>
                <li>微信：SFTKTKTK</li>
                <li>地址：中国广东省深圳市</li>
              </ul>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                本服务条款最后更新日期：2026年2月
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
