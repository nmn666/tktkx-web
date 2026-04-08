import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, User, ShoppingBag } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
  time: string;
}

const SESSION_ID = `web_${Math.random().toString(36).slice(2, 10)}`;

const QUICK_QUESTIONS = [
  '满月号和千粉号有什么区别？',
  '如何开通TikTok橱窗？',
  '增粉服务多少钱？',
  '什么是GEO优化？',
  '账号安全怎么保障？',
];

export default function ChatBot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: '您好！我是速锋科技智能导购助手 🤖\n\n我可以帮您：\n• 选择合适的TikTok账号类型\n• 了解橱窗号开通条件\n• 查询增粉服务价格\n• 了解GEO优化服务\n\n请问有什么可以帮您？',
      time: now(),
    },
  ]);
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread]   = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  function now() {
    return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/wechat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text.trim(), session_id: SESSION_ID }),
      });
      const data = await res.json();
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: data.reply || '感谢咨询！如需人工服务请加微信：SFTKTKTK',
        time: now(),
      };
      setMessages(prev => [...prev, botMsg]);
      if (!open) setUnread(n => n + 1);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'bot',
        text: '网络繁忙，请稍后重试，或直接联系微信：SFTKTKTK / Telegram：@TRXBGB',
        time: now(),
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* 悬浮按钮 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-gray-100 whitespace-nowrap"
            >
              智能导购助手 · 立即咨询
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(v => !v)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} /></motion.div>
              : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={24} /></motion.div>
            }
          </AnimatePresence>
          {unread > 0 && !open && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {unread}
            </span>
          )}
        </motion.button>
      </div>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-sm">速锋科技 · 智能导购</div>
                <div className="text-blue-200 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                  在线 · 即时回复
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition">
                <X size={18} />
              </button>
            </div>

            {/* 消息区 */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* 头像 */}
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold ${msg.role === 'bot' ? 'bg-blue-500' : 'bg-gray-400'}`}>
                    {msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  {/* 气泡 */}
                  <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                    <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.role === 'bot'
                        ? 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
                        : 'bg-blue-600 text-white rounded-tr-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {/* 加载中 */}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* 快捷问题 */}
            {messages.length <= 1 && (
              <div className="px-3 py-2 flex gap-1.5 flex-wrap border-t border-gray-100 bg-white">
                {QUICK_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-[11px] text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-full px-2.5 py-1 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* 输入框 */}
            <div className="px-3 py-2.5 border-t border-gray-100 bg-white flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入问题，例如：橱窗号多少钱？"
                className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                disabled={loading}
                maxLength={300}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-9 h-9 bg-blue-600 disabled:bg-gray-200 rounded-full flex items-center justify-center text-white transition flex-shrink-0"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
              </button>
            </div>

            {/* 底部品牌 */}
            <div className="text-center text-[10px] text-gray-400 py-1 bg-white border-t border-gray-50">
              速锋科技 · 微信：SFTKTKTK · TG：@TRXBGB
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
