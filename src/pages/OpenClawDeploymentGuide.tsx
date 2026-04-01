import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  BookOpen, 
  Settings,
  Terminal,
  Key,
  Download,
  Rocket,
  HelpCircle
} from 'lucide-react';

export default function OpenClawDeploymentGuide() {
  const [activeSection, setActiveSection] = useState('chapter1');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板！');
  };

  const chapters = [
    { id: 'chapter1', title: '准备工作与环境检查', icon: Settings },
    { id: 'chapter2', title: '安装Node.js（详细图解步骤）', icon: Download },
    { id: 'chapter3', title: '安装OpenClaw', icon: Rocket },
    { id: 'chapter4', title: '配置工作目录', icon: Settings },
    { id: 'chapter5', title: '启动Gateway服务', icon: Terminal },
    { id: 'chapter6', title: '配置AI模型API', icon: Key },
    { id: 'chapter7', title: '测试与验证', icon: CheckCircle2 },
    { id: 'chapter8', title: '常见问题解决（重要！）', icon: HelpCircle },
    { id: 'chapter9', title: '日常使用方法', icon: BookOpen },
    { id: 'chapter10', title: '高级配置选项', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-blue-200 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            返回首页
          </Link>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-8 w-8" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">🚀 OpenClaw 本地部署详细教程（小白完全版）</h1>
              <p className="text-blue-100 text-lg">从0开始一步步教你如何在Windows笔记本上完整部署OpenClaw</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* 左侧目录导航 */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                📋 目录
              </h3>
              <nav className="space-y-1">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => scrollToSection(chapter.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === chapter.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {chapter.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="flex-1 max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              {/* 文档说明 */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <h2 className="font-bold text-blue-900 mb-2">📖 文档说明</h2>
                <p className="text-blue-700 text-sm">
                  本教程专为零基础用户编写，从0开始一步步教你如何在Windows笔记本上完整部署OpenClaw。建议按照顺序操作，不要跳过步骤。
                </p>
              </div>

              {/* 第一章：准备工作与环境检查 */}
              <section id="chapter1" className="mb-12 scroll-mt-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg mr-3">1</span>
                  第一章：准备工作与环境检查
                </h2>
                
                <div className="space-y-6">
                  {/* 1.1 确认电脑配置 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 确认电脑配置</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">1. 检查操作系统版本</h4>
                      <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                        <li>右键点击"此电脑"或"我的电脑"</li>
                        <li>选择"属性"</li>
                        <li>查看Windows版本</li>
                      </ol>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200 text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-200 px-4 py-2 text-left">项目</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">最低要求</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">推荐配置</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-200 px-4 py-2">操作系统</td>
                            <td className="border border-gray-200 px-4 py-2">Windows 10 家庭版</td>
                            <td className="border border-gray-200 px-4 py-2">Windows 10/11 专业版</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 px-4 py-2">内存(RAM)</td>
                            <td className="border border-gray-200 px-4 py-2">4GB</td>
                            <td className="border border-gray-200 px-4 py-2">8GB或以上</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 px-4 py-2">硬盘空间</td>
                            <td className="border border-gray-200 px-4 py-2">5GB可用空间</td>
                            <td className="border border-gray-200 px-4 py-2">20GB可用空间</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 px-4 py-2">网络</td>
                            <td className="border border-gray-200 px-4 py-2">普通宽带</td>
                            <td className="border border-gray-200 px-4 py-2">稳定网络连接</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 px-4 py-2">CPU</td>
                            <td className="border border-gray-200 px-4 py-2">双核处理器</td>
                            <td className="border border-gray-200 px-4 py-2">四核或更高</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 1.2 检查磁盘空间 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 检查磁盘空间</h3>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">2. 查看C盘和D盘空间</h4>
                      <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                        <li>打开"此电脑"</li>
                        <li>查看C盘和D盘的剩余空间</li>
                        <li>确保C盘至少有5GB空间，建议D盘有10GB以上空间</li>
                      </ol>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-900 mb-1">⚠️ 重要提示：</h4>
                          <p className="text-yellow-800 text-sm">
                            如果C盘空间不足，建议先清理垃圾文件或将部分文件移动到D盘，否则安装可能失败。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 第二章：安装Node.js */}
              <section id="chapter2" className="mb-12 scroll-mt-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg mr-3">2</span>
                  第二章：安装Node.js（详细图解步骤）
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">什么是Node.js？</h4>
                  <p className="text-gray-700 text-sm">
                    Node.js是运行JavaScript代码的环境，OpenClaw基于Node.js开发，必须先安装它才能运行OpenClaw。
                  </p>
                </div>

                <div className="space-y-6">
                  {/* 2.1 下载Node.js */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 下载Node.js安装包</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">1. 访问官方网站</h4>
                      <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                        <li>打开浏览器（Chrome、Edge、Firefox都可以）</li>
                        <li>在地址栏输入：https://nodejs.org/</li>
                        <li>按回车键访问网站</li>
                      </ol>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">2. 选择版本下载</h4>
                      <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-3">
                        <p className="font-medium text-green-900 mb-2">【推荐】选择LTS版本（长期支持版）：</p>
                        <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                          <li>在网页上找到绿色的大按钮，写着 "18.x.x LTS"</li>
                          <li>点击这个按钮下载</li>
                          <li>下载的文件名类似：node-v18.x.x-x64.msi</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="font-medium text-blue-900 mb-1">为什么不选择Current版本？</p>
                        <p className="text-blue-800 text-sm">
                          Current版本是最新功能版，可能有不稳定因素，LTS版本更稳定可靠，适合新手使用。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2.2 安装Node.js */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2 安装Node.js</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">3. 运行安装程序</h4>
                      <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                        <li>打开下载文件夹（通常在"下载"文件夹中）</li>
                        <li>找到 node-v18.x.x-x64.msi 文件</li>
                        <li>右键点击 → 选择"以管理员身份运行"</li>
                        <li>如果出现Windows安全提示，点击"是"或"允许"</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">4. 安装向导步骤</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-gray-900 mb-1">第1步 - 欢迎界面：</p>
                          <p className="text-gray-700 text-sm">点击 &quot;Next &gt;&quot;</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-gray-900 mb-1">第2步 - 许可协议：</p>
                          <p className="text-gray-700 text-sm">勾选 &quot;I accept the terms in the License Agreement&quot;，点击 &quot;Next &gt;&quot;</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-gray-900 mb-1">第3步 - 安装位置：</p>
                          <p className="text-gray-700 text-sm">保持默认路径（不要修改！），默认路径是：C:\Program Files\nodejs\，点击 &quot;Next &gt;&quot;</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="font-medium text-blue-900 mb-1">第4步 - 自定义安装：</p>
                          <p className="text-blue-800 text-sm">保持默认选项（全部勾选），确保 &quot;Add to PATH&quot; 被勾选（非常重要！），点击 &quot;Next &gt;&quot;</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-gray-900 mb-1">第5步 - 安装工具：</p>
                          <p className="text-gray-700 text-sm">取消勾选可选工具，点击 &quot;Next &gt;&quot;</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-gray-900 mb-1">第6步 - 开始安装：</p>
                          <p className="text-gray-700 text-sm">点击 "Install" 按钮，等待安装完成（约1-3分钟），点击 "Finish" 完成安装</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2.3 验证安装 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">2.3 验证Node.js安装</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">5. 打开命令提示符</h4>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <p className="text-sm text-gray-700"><strong>方法一：</strong></p>
                        <p className="text-sm text-gray-700 ml-4">按键盘上的 Win + R 键，输入 cmd，按回车键</p>
                        <p className="text-sm text-gray-700"><strong>方法二：</strong></p>
                        <p className="text-sm text-gray-700 ml-4">右键点击"开始"按钮，选择"Windows终端"或"命令提示符"</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">6. 检查Node.js版本</h4>
                      <div className="relative">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                          <div className="flex items-center justify-between">
                            <code>node --version</code>
                            <button
                              onClick={() => copyToClipboard('node --version')}
                              className="text-gray-400 hover:text-white transition-colors"
                              title="复制"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-3">
                          <p className="font-medium text-green-900 flex items-center">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            ✅ 成功标志：
                          </p>
                          <p className="text-green-800 text-sm mt-1">
                            如果显示类似 v18.20.0 或 v20.x.x 的版本号，说明Node.js安装成功！
                          </p>
                        </div>
                        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                          <p className="font-medium text-red-900 mb-1">❌ 如果显示"'node' 不是内部或外部命令"：</p>
                          <ol className="list-decimal list-inside text-red-800 text-sm space-y-1">
                            <li>重启电脑</li>
                            <li>重新打开命令提示符</li>
                            <li>再次输入命令测试</li>
                            <li>如果还是不行，需要卸载重装Node.js，确保安装时勾选了"Add to PATH"</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">7. 检查npm版本</h4>
                      <div className="relative">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                          <div className="flex items-center justify-between">
                            <code>npm --version</code>
                            <button
                              onClick={() => copyToClipboard('npm --version')}
                              className="text-gray-400 hover:text-white transition-colors"
                              title="复制"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mt-2">
                        如果显示类似 10.x.x 的版本号，说明npm也安装成功了。
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 第三章：安装OpenClaw */}
              <section id="chapter3" className="mb-12 scroll-mt-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg mr-3">3</span>
                  第三章：安装OpenClaw
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">安装前准备：</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    <li>确保Node.js已正确安装（第二章已完成）</li>
                    <li>确保网络连接正常</li>
                    <li>确保有管理员权限</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  {/* 3.1 通过npm安装 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 通过npm安装OpenClaw（推荐）</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">1. 打开命令提示符（管理员权限）</h4>
                      <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                        <li>按 Win + R</li>
                        <li>输入 cmd</li>
                        <li>不要直接按回车！</li>
                        <li>按 Ctrl + Shift + Enter 以管理员身份运行</li>
                        <li>如果出现UAC提示，点击"是"</li>
                      </ol>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">2. 执行安装命令</h4>
                      <div className="relative mb-3">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                          <div className="flex items-center justify-between">
                            <code>npm install -g openclaw</code>
                            <button
                              onClick={() => copyToClipboard('npm install -g openclaw')}
                              className="text-gray-400 hover:text-white transition-colors"
                              title="复制"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium text-blue-900 mb-2">📌 命令解释：</p>
                        <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                          <li>npm：Node包管理器</li>
                          <li>install：安装命令</li>
                          <li>-g：全局安装（所有用户都能使用）</li>
                          <li>openclaw：要安装的软件包名称</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">3. 等待安装完成</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        安装过程需要几分钟时间，会显示下载进度和安装信息，看到类似 added 1 package in 30s 表示安装成功。
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="font-medium text-yellow-900 mb-2">⚠️ 安装过程常见问题：</p>
                        <div className="space-y-2 text-yellow-800 text-sm">
                          <p><strong>问题1：安装卡住不动</strong></p>
                          <p>解决：按 Ctrl + C 取消，然后更换npm源：</p>
                          <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs mt-1">
                            npm config set registry https://registry.npmmirror.com<br/>
                            npm install -g openclaw
                          </div>
                          <p className="mt-2"><strong>问题2：权限错误（EACCES）</strong></p>
                          <p>解决：确保以管理员身份运行命令提示符</p>
                          <p className="mt-2"><strong>问题3：网络超时</strong></p>
                          <p>解决：检查网络连接，或使用代理/VPN</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3.2 验证安装 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 验证OpenClaw安装</h3>
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-800 mb-2">4. 检查版本</h4>
                      <div className="relative">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                          <div className="flex items-center justify-between">
                            <code>openclaw --version</code>
                            <button
                              onClick={() => copyToClipboard('openclaw --version')}
                              className="text-gray-400 hover:text-white transition-colors"
                              title="复制"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <p className="font-medium text-green-900 mb-1">如果显示类似 1.x.x 的版本号，恭喜你！OpenClaw安装成功！</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 快速开始 */}
              <section className="mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">📞 获取帮助</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-1">📚 官方文档</p>
                      <a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white underline">
                        https://docs.openclaw.ai
                      </a>
                    </div>
                    <div>
                      <p className="font-medium mb-1">💻 GitHub仓库</p>
                      <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white underline">
                        https://github.com/openclaw/openclaw
                      </a>
                    </div>
                    <div>
                      <p className="font-medium mb-1">💬 Discord社区</p>
                      <a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white underline">
                        https://discord.com/invite/clawd
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* 版本信息 */}
              <div className="text-center text-gray-500 text-sm pt-8 border-t">
                <p>文档版本：1.0</p>
                <p>创建时间：2025-03-10</p>
                <p>适用系统：Windows 10/11</p>
                <p>OpenClaw版本：最新版</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
