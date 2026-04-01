import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TikTokRegisterPage() {
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
          TikTok账号注册全流程（图文教程）
        </h1>

        {/* 一句话定义 */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">一句话定义</h2>
          <p className="text-blue-800 text-xl font-medium">
            TikTok账号注册需准备手机号、邮箱，下载APP并完成实名认证
          </p>
        </div>

        {/* 详细解释 */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">详细解释</h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">准备工作</h3>
              <p className="mb-4">
                在开始注册TikTok账号之前，需要做好以下准备工作：
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>有效手机号：</strong>支持中国手机号（+86）或海外手机号</li>
                <li><strong>有效邮箱：</strong>支持Gmail、Outlook、QQ邮箱等主流邮箱</li>
                <li><strong>稳定的网络环境：</strong>建议使用WiFi或稳定的移动数据</li>
                <li><strong>目标市场定位：</strong>确定主要运营的国家/地区（美国、英国、东南亚等）</li>
                <li><strong>账号定位：</strong>明确账号要做的内容方向（美妆、服饰、美食、教育等）</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">注册方式选择</h3>
              <p className="mb-4">
                TikTok提供多种注册方式，可根据实际情况选择：
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">方式1：手机号注册</h4>
                  <p className="text-sm text-blue-700">
                    ✅ 最安全<br/>
                    ✅ 易找回<br/>
                    ✅ 功能完整
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">方式2：邮箱注册</h4>
                  <p className="text-sm text-green-700">
                    ✅ 操作简单<br/>
                    ✅ 不需手机<br/>
                    ⚠️ 部分功能受限
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">方式3：第三方登录</h4>
                  <p className="text-sm text-purple-700">
                    ✅ 快速便捷<br/>
                    ⚠️ 依赖第三方<br/>
                    ⚠️ 安全性一般
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">详细注册步骤</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">步骤1：下载TikTok应用</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-700 mb-2">
                      根据目标市场选择对应的TikTok版本：
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>全球版：</strong>适用于大多数国家（App Store搜索TikTok）</li>
                      <li>• <strong>美国版：</strong>针对美国市场优化（需要美国App Store账号）</li>
                      <li>• <strong>东南亚版：</strong>针对东南亚市场</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">
                    💡 提示：如果无法直接下载，可以通过第三方应用商店或APK文件安装
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">步骤2：打开应用选择注册方式</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-700 mb-2">
                      启动应用后，会看到登录/注册界面，点击"注册"按钮，选择注册方式：
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>使用手机号：</strong>点击"手机号"选项</li>
                      <li>• <strong>使用邮箱：</strong>点击"邮箱"选项</li>
                      <li>• <strong>使用第三方：</strong>选择Google、Facebook、Twitter等</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">步骤3：填写注册信息</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-700 mb-2">
                      根据选择的注册方式，填写相应信息：
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>
                        <strong>手机号注册：</strong>
                        <ul className="ml-4 space-y-1 mt-1">
                          <li>- 选择国家/地区代码（如中国+86）</li>
                          <li>- 输入手机号码</li>
                          <li>- 点击"发送验证码"</li>
                          <li>- 输入收到的短信验证码</li>
                        </ul>
                      </li>
                      <li>
                        <strong>邮箱注册：</strong>
                        <ul className="ml-4 space-y-1 mt-1">
                          <li>- 输入邮箱地址</li>
                          <li>- 设置密码（8位以上，含字母和数字）</li>
                          <li>- 确认密码</li>
                          <li>- 点击邮箱中的验证链接</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">步骤4：设置生日和性别</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-700 mb-2">
                      TikTok要求填写真实的生日信息（年满13岁），选择性别：
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>出生日期：</strong>选择年、月、日</li>
                      <li>• <strong>性别：</strong>选择男、女、自定义</li>
                      <li>• <strong>年龄限制：</strong>未成年人（13-17岁）功能受限</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">
                    ⚠️ 注意：生日信息修改次数有限，请务必填写真实信息
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">步骤5：创建用户名</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-700 mb-2">
                      设置账号的显示名称和用户名：
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>显示名称：</strong>账号昵称，可包含中文、英文、表情符号</li>
                      <li>• <strong>用户名：</strong>账号ID，唯一标识，通常用字母、数字、下划线</li>
                      <li>• <strong>命名建议：</strong>简短易记、符合定位、避免特殊字符</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">
                    💡 提示：用户名一旦确定较难修改，建议慎重选择
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">步骤6：完善个人资料</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-700 mb-2">
                      注册完成后，建议完善个人资料，提升账号专业度：
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>头像：</strong>上传清晰的个人头像或品牌Logo</li>
                      <li>• <strong>简介：</strong>介绍账号定位、内容方向、联系方式</li>
                      <li>• <strong>链接：</strong>添加个人网站或社交媒体链接</li>
                      <li>• <strong>分类：</strong>选择账号类别（个人/企业）</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">步骤7：账号安全设置</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-700 mb-2">
                      为了账号安全，建议完成以下设置：
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>绑定手机号：</strong>即使邮箱注册，也建议绑定手机号</li>
                      <li>• <strong>绑定邮箱：</strong>手机号注册后，也建议绑定邮箱</li>
                      <li>• <strong>设置密码：</strong>设置强密码，定期更换</li>
                      <li>• <strong>开启两步验证：</strong>提高账号安全性</li>
                      <li>• <strong>登录提醒：</strong>开启异地登录提醒</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">注册常见问题处理</h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ 问题1：收不到验证码</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>- 检查手机信号是否良好</li>
                    <li>- 确认手机号是否正确（包括国家代码）</li>
                    <li>- 检查短信是否被拦截</li>
                    <li>- 尝试重新发送（通常60秒后可重新发送）</li>
                    <li>- 更换手机号或使用邮箱注册</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">❌ 问题2：用户名已被占用</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>- 尝试添加数字或下划线（如user123）</li>
                    <li>- 尝试其他拼写方式</li>
                    <li>- 使用个人品牌名称加后缀</li>
                    <li>- 避免使用过于简单的用户名</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">❌ 问题3：年龄未满13岁</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>- TikTok规定用户必须年满13岁</li>
                    <li>- 未满年龄无法注册，请勿使用虚假信息</li>
                    <li>- 建议由家长或监护人代为注册</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">❌ 问题4：网络连接失败</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>- 检查网络连接是否稳定</li>
                    <li>- 尝试切换WiFi/移动数据</li>
                    <li>- 检查应用是否需要更新</li>
                    <li>- 清除应用缓存重新安装</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">注册后的操作建议</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>熟悉平台：</strong>浏览热门视频，了解平台调性和内容风格</li>
                <li><strong>关注同类账号：</strong>关注同领域的优质账号，学习运营技巧</li>
                <li><strong>测试内容：</strong>尝试发布几条测试视频，熟悉发布流程</li>
                <li><strong>保持活跃：</strong>每天登录，点赞、评论、分享，建立账号活跃度</li>
                <li><strong>规划内容：</strong>制定内容发布计划，为后续运营做准备</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">常见问题</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q1: 可以注册多个TikTok账号吗？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A1:</strong> 可以。一个手机号可以注册多个TikTok账号，但建议使用不同的手机号。同一手机号注册多个账号可能会被系统判定为关联账号，影响账号权重。如果需要运营多个账号，建议使用独立的手机号和邮箱。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q2: 注册时使用的手机号可以更换吗？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A2:</strong> 可以更换。在账号设置中可以解绑旧手机号，绑定新手机号。建议绑定常用的手机号，方便接收验证码和找回账号。更换手机号需要验证新旧号码，确保账号安全。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q3: TikTok账号注册成功后会立即发布内容吗？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A3:</strong> 不会自动发布内容。账号注册后需要用户主动创建和发布视频。建议注册后先熟悉平台，浏览优秀内容，再开始创作。新账号建议先发布一些测试视频，了解算法反馈。
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q4: 中国大陆的手机号可以注册TikTok吗？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A4:</strong> 可以注册，但中国大陆的网络环境可能影响访问。如果在中国大陆使用TikTok，可能需要使用特殊网络工具。另外，中国大陆用户主要使用抖音（Douyin），而非TikTok，后者主要面向海外市场。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q5: 注册后多久可以开通橱窗？</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A5:</strong> 需要满足30天注册时长和1000粉丝两个条件。理论上最快30天可以开通，但实际涨粉到1000可能需要更长时间。通常建议准备2-3个月时间，同时优化内容质量，吸引更多粉丝。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
