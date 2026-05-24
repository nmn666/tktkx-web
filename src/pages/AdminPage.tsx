import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  Settings, 
  LogOut, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Box
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface Product {
  id: number;
  title: string;
  region: string;
  tag: string;
  price: number;
  stock: number;
  description: string;
  is_active: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // 检查本地缓存的 Key
  useEffect(() => {
    const savedKey = localStorage.getItem('tktkx_admin_key');
    if (savedKey) {
      setAdminKey(savedKey);
      verifyAndFetch(savedKey);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyAndFetch = async (key: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/manage', {
        headers: { 'x-admin-key': key }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        setIsAuthenticated(true);
        localStorage.setItem('tktkx_admin_key', key);
      } else {
        localStorage.removeItem('tktkx_admin_key');
        toast.error('认证失败，请检查密钥');
      }
    } catch (err) {
      toast.error('服务器连接失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = adminKey.trim();
    setAdminKey(cleanKey);
    verifyAndFetch(cleanKey);
  };

  const handleLogout = () => {
    localStorage.removeItem('tktkx_admin_key');
    setIsAuthenticated(false);
    setProducts([]);
  };

  const handleToggleActive = async (product: Product) => {
    try {
      const res = await fetch('/api/admin/manage', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-key': adminKey 
        },
        body: JSON.stringify({ id: product.id, is_active: !product.is_active })
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === product.id ? { ...p, is_active: !p.is_active } : p));
        toast.success(product.is_active ? '商品已下架' : '商品已上架');
      }
    } catch (err) {
      toast.error('操作失败');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除该商品吗？')) return;
    try {
      const res = await fetch(`/api/admin/manage?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey }
      });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
        toast.success('删除成功');
      }
    } catch (err) {
      toast.error('删除失败');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const method = editingProduct.id ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/admin/manage', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-key': adminKey 
        },
        body: JSON.stringify(editingProduct)
      });
      if (res.ok) {
        const saved = await res.json();
        if (method === 'POST') {
          setProducts([...products, saved]);
        } else {
          setProducts(products.map(p => p.id === saved.id ? saved : p));
        }
        setIsModalOpen(false);
        setEditingProduct(null);
        toast.success('保存成功');
      }
    } catch (err) {
      toast.error('保存失败');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
        <Toaster position="top-center" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-blue-500 rounded-xl mb-4 shadow-lg">
              <Settings className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-white">速锋后台管理</h1>
            <p className="text-blue-200 mt-2">请输入管理员密钥以继续</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="管理密钥 (Admin Key)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all"
            >
              登录控制台
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-xl text-gray-900">速锋管理端</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold">
            <LayoutDashboard size={20} /> 商品管理
          </a>
          {/* 更多菜单项可在此添加 */}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
          >
            <LogOut size={20} /> 退出登录
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h2 className="text-lg font-bold text-gray-800">商品库存列表</h2>
          <button 
            onClick={() => {
              setEditingProduct({ is_active: true, price: 0, stock: 100 });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all"
          >
            <Plus size={18} /> 上架新商品
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">商品信息</th>
                  <th className="px-6 py-4">分类/标签</th>
                  <th className="px-6 py-4">价格/库存</th>
                  <th className="px-6 py-4">状态</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {products.map((p) => (
                    <motion.tr 
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{p.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{p.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                            {p.region}
                          </span>
                          <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                            {p.tag}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-gray-900 font-bold">
                          <DollarSign size={14} className="text-gray-400" /> {p.price}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Box size={12} /> {p.stock}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleToggleActive(p)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            p.is_active 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {p.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                          {p.is_active ? '已上架' : '已下架'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => {
                              setEditingProduct(p);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">{editingProduct?.id ? '编辑商品' : '新增商品'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品标题</label>
                  <input
                    type="text"
                    required
                    value={editingProduct?.title || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">分类 (region)</label>
                  <input
                    type="text"
                    required
                    placeholder="如: us|hot|all"
                    value={editingProduct?.region || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, region: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">标签 (tag)</label>
                  <input
                    type="text"
                    placeholder="如: 满月老号"
                    value={editingProduct?.tag || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, tag: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">价格 (¥)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct?.price || 0}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">库存</label>
                  <input
                    type="number"
                    required
                    value={editingProduct?.stock || 0}
                    onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">商品描述</label>
                  <textarea
                    rows={3}
                    value={editingProduct?.description || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/10 transition-all"
                >
                  保存并上架
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
