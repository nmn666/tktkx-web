import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold text-gray-800 mb-8">隐私政策</h1>
          
          <div className="text-gray-700 space-y-6 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. 引言</h2>
              <p className="mb-3">
                TikTok变现专家平台（以下简称"我们"或"本平台"）非常重视您的隐私保护。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息。
              </p>
              <p>
                使用本平台即表示您同意本隐私政策的条款。如果您不同意本隐私政策，请不要使用本平台的服务。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. 信息收集</h2>
              <p className="mb-3">
                我们可能收集以下类型的个人信息：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>注册信息：</strong>包括您的姓名、电话号码、微信号、电子邮箱等</li>
                <li><strong>账户信息：</strong>包括用户名、密码（加密存储）等</li>
                <li><strong>申请信息：</strong>包括工作经验、特长、附加说明等</li>
                <li><strong>使用数据：</strong>包括访问日志、IP地址、设备信息等</li>
                <li><strong>Cookie信息：</strong>用于改善用户体验和网站功能</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. 信息使用</h2>
              <p className="mb-3">
                我们使用收集的个人信息用于以下目的：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>提供、维护和改进我们的服务</li>
                <li>处理您的服务申请和订单</li>
                <li>与您沟通，包括发送服务通知、营销信息等</li>
                <li>分析用户行为，优化网站体验</li>
                <li>防范欺诈和滥用，确保服务安全</li>
                <li>遵守法律法规要求</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. 信息共享</h2>
              <p className="mb-3">
                在以下情况下，我们可能会与第三方共享您的个人信息：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>服务提供商：</strong>与我们合作的第三方服务提供商，用于提供技术支持、支付处理等服务</li>
                <li><strong>业务合作伙伴：</strong>在您同意的情况下，与我们的业务合作伙伴共享信息，以提供更好的服务</li>
                <li><strong>法律法规要求：</strong>在法律法规要求或政府部门要求的情况下，我们可能需要披露您的信息</li>
                <li><strong>业务转让：</strong>如果我们的业务被收购或合并，您的信息可能会被转让给新的所有者</li>
              </ul>
              <p className="mt-3">
                我们不会向任何第三方出售、出租或以其他方式转让您的个人信息，除非获得您的明确同意。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. 信息存储</h2>
              <p className="mb-3">
                我们将您的个人信息存储在位于中国的服务器上，并采取合理的安全措施保护您的信息。
              </p>
              <p className="mb-3">
                我们仅在实现本隐私政策所述目的所必需的期间内保留您的个人信息。超出该期限后，我们将删除您的信息或进行匿名化处理。
              </p>
              <p>
                请注意，互联网传输不是100%安全的，我们不能保证您向我们传输的信息的绝对安全。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. 信息安全</h2>
              <p className="mb-3">
                我们采取合理的安全措施来保护您的个人信息，包括：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>使用SSL/TLS加密技术保护数据传输</li>
                <li>限制内部员工对个人信息的访问权限</li>
                <li>定期审查安全措施和系统漏洞</li>
                <li>建立数据备份和恢复机制</li>
              </ul>
              <p className="mt-3">
                尽管我们采取了合理的安全措施，但请注意，任何安全措施都无法保证绝对安全。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookie政策</h2>
              <p className="mb-3">
                我们使用Cookie和类似技术来改善您的用户体验：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>必需Cookie：</strong>确保网站基本功能正常工作</li>
                <li><strong>性能Cookie：</strong>收集使用数据，帮助改进网站性能</li>
                <li><strong>功能Cookie：</strong>记住您的偏好设置</li>
              </ul>
              <p className="mt-3">
                您可以通过浏览器设置管理Cookie，但请注意，禁用某些Cookie可能会影响网站功能。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. 您的权利</h2>
              <p className="mb-3">
                根据相关法律法规，您对您的个人信息享有以下权利：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>访问权：</strong>要求访问我们持有的关于您的个人信息</li>
                <li><strong>更正权：</strong>要求更正不准确或不完整的个人信息</li>
                <li><strong>删除权：</strong>要求删除您的个人信息</li>
                <li><strong>限制处理权：</strong>限制我们处理您的个人信息的方式</li>
                <li><strong>数据携带权：</strong>要求以结构化、常用格式提供您的个人信息</li>
                <li><strong>反对权：</strong>反对我们处理您的个人信息</li>
              </ul>
              <p className="mt-3">
                如需行使上述权利，请通过本隐私政策第12条提供的方式联系我们。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. 未成年人保护</h2>
              <p>
                本平台主要面向成年用户。如果您未满18周岁，请在父母或监护人的陪同下使用本平台。如果我们发现收集了未成年人的个人信息，将采取删除措施。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. 政策更新</h2>
              <p className="mb-3">
                我们可能不时更新本隐私政策。更新后的政策将在本网站上公布，并标注更新日期。
              </p>
              <p>
                继续使用我们的服务即表示您接受更新后的隐私政策。我们建议您定期查看本政策以了解我们的最新隐私实践。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. 跨境数据传输</h2>
              <p>
                我们的服务可能涉及将您的个人信息传输到中国境外。在跨境传输前，我们将采取适当措施确保您的个人信息得到充分保护，包括但不限于签署标准合同条款、获得您的明确同意等。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. 联系我们</h2>
              <p className="mb-3">
                如您对本隐私政策有任何疑问、意见或投诉，或者需要行使您的权利，请通过以下方式联系我们：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>邮箱：t8578870@gmail.com</li>
                <li>微信：SFTKTKTK</li>
                <li>地址：中国广东省深圳市</li>
              </ul>
              <p className="mt-3">
                我们将在收到您的请求后尽快处理，并在法律要求的期限内给予回复。
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                本隐私政策最后更新日期：2026年2月
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
