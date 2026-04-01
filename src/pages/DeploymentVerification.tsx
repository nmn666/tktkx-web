import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Copy, Check, AlertCircle } from 'lucide-react';

interface VerificationData {
  fileName: string;
  content: string;
}

export default function DeploymentVerification() {
  const [copied, setCopied] = useState(false);
  const [verified, setVerified] = useState(false);

  // 验证数据（可从后端或环境变量获取）
  const verificationData: VerificationData = {
    fileName: '8ea233d2e29b156d4810d701b098a781.txt',
    content: '1e321739d9ade81e4e6657352c5627539e2742b1'
  };

  // 复制文件名和内容
  const handleCopy = async () => {
    const textToCopy = `文件名：${verificationData.fileName}\n内容：${verificationData.content}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // 开始验证
  const handleVerify = async () => {
    try {
      // 直接验证文件是否可以访问
      const fileUrl = `/${verificationData.fileName}`;
      const response = await fetch(fileUrl);

      if (response.ok) {
        // 检查内容是否正确
        const content = await response.text();
        if (content.trim() === verificationData.content) {
          setVerified(true);
          alert('✅ 验证成功！文件已正确部署，可以通过微信平台审核。');
        } else {
          alert('❌ 验证失败！文件内容不正确。');
        }
      } else {
        alert('❌ 验证失败！无法访问验证文件，请检查文件是否正确部署。');
      }
    } catch (err) {
      console.error('验证出错:', err);
      alert('❌ 验证出错，请检查网络连接后重试。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">微信团队</h1>
          <div className="w-6"></div> {/* 占位保持居中 */}
        </div>
      </div>

      {/* 核心内容区 */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 标题区 */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">部署验证文件</h2>
            </div>
            <p className="text-gray-600 text-sm">
              根据以下步骤在网站根目录下部署验证文件。申请提交前请勿关闭页面。
            </p>
          </div>

          {/* 步骤区 */}
          <div className="px-6 py-6 space-y-6">
            {/* 步骤 1 */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </span>
                <p className="text-gray-700 text-sm leading-relaxed pt-0.5">
                  在网站根目录下创建一个TXT文件，用以下信息命名；
                </p>
              </div>
              <div className="ml-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-500 font-mono text-sm break-all">
                    {verificationData.fileName}
                  </p>
                </div>
              </div>
            </div>

            {/* 步骤 2 */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </span>
                <p className="text-gray-700 text-sm leading-relaxed pt-0.5">
                  在TXT文件中填写以下内容并保存。
                </p>
              </div>
              <div className="ml-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-500 font-mono text-sm break-all">
                    {verificationData.content}
                  </p>
                </div>
              </div>
            </div>

            {/* 复制按钮 */}
            <div className="ml-8">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>复制文件标题和内容</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 操作按钮区 */}
          <div className="px-6 py-6 bg-gray-50 border-t border-gray-100 space-y-4">
            {/* 验证按钮 */}
            <button
              onClick={handleVerify}
              disabled={verified}
              className={`w-full py-3 px-6 rounded-lg font-medium text-sm transition-all ${
                verified
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {verified ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  验证成功
                </span>
              ) : (
                '已部署，开始验证'
              )}
            </button>

            {/* 备选方案 */}
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                暂无法部署？
                <Link
                  to="/proof-material"
                  className="ml-1 text-blue-600 hover:text-blue-700"
                >
                  仅提交证明材料
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">部署说明</p>
              <ul className="text-blue-800 space-y-1">
                <li>• 请确保文件名完全一致（包括大小写）</li>
                <li>• 文件内容必须是纯文本，不要包含引号或空格</li>
                <li>• 文件必须部署在网站根目录，即通过 yourdomain.com/文件名 可以访问</li>
                <li>• 部署完成后，点击上方"已部署，开始验证"按钮</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-3 flex justify-around items-center">
          <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Link>
          <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
          <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>
      </div>

      {/* 底部占位，避免内容被固定导航遮挡 */}
      <div className="h-20"></div>
    </div>
  );
}
