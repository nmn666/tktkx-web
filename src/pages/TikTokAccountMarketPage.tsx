import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/authContext';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronRight,
  Volume2,
  Bell,
  Clock,
  ShieldCheck,
  TrendingUp,
  Zap,
  ExternalLink,
  HeadphonesIcon,
} from 'lucide-react';

// ─── 账号购买数据 ───────────────────────────────────────────
const accountCategories = [
  { id: 'all',        name: '全部账号',       icon: '🌐' },
  { id: 'hot',        name: '热销爆款',       icon: '🔥' },
  { id: 'full-moon',  name: '满月号/千粉号',  icon: '🌕' },
  { id: 'us',         name: '美国',           icon: '🇺🇸' },
  { id: 'uk',         name: '英国',           icon: '🇬🇧' },
  { id: 'sea',        name: '东南亚',         icon: '🌏' },
  { id: 'eu',         name: '欧洲',           icon: '🇪🇺' },
  { id: 'me',         name: '中东',           icon: '🌙' },
  { id: 'la',         name: '拉丁美洲',       icon: '🌎' },
  { id: 'af',         name: '非洲',           icon: '🌍' },
  { id: 'other',      name: '其他地区',       icon: '📌' },
];

const accountTypes = [
  // ── 热销 / 满月号 / 千粉号 ──────────────────────────────
  { id: 1,   title: '美国-满月白号',           region: 'US|hot|full-moon|all', tag: '邮箱号',  price: 9,    stock: 500, description: '注册满30天，权重稳定，适合养号开通橱窗，批量可优惠。' },
  { id: 2,   title: '美国-橱窗号(1000粉)',      region: 'US|hot|full-moon|all', tag: '橱窗号',  price: 85,   stock: 120, description: '已开通橱窗功能，自带1000+真实粉丝，到手即可带货。' },
  { id: 3,   title: '英国-满月白号',           region: 'UK|hot|full-moon|all', tag: '邮箱号',  price: 12,   stock: 300, description: '注册满30天，英区高权重，适合开通英区TikTok Shop。' },
  { id: 4,   title: '英国-橱窗号(1000粉)',      region: 'UK|full-moon|all',     tag: '橱窗号',  price: 98,   stock: 80,  description: '英区千粉橱窗号，可直接开通橱窗挂英区商品链接。' },
  { id: 5,   title: '全球通用满月白号',         region: 'hot|full-moon|all',    tag: '满月号',  price: 8,    stock: 999, description: '多国随机发货满月号，适合批量采购养号使用。' },
  { id: 6,   title: '高权重千粉号(多区可选)',   region: 'hot|full-moon|all',    tag: '千粉号',  price: 79,   stock: 200, description: '粉丝1000+高互动账号，可指定美/英/东南亚区域。' },

  // ── 美国 ────────────────────────────────────────────────
  { id: 10,  title: '美国-5000粉高权重号',      region: 'US|all',              tag: '高粉号',  price: 260,  stock: 30,  description: '自带5000+真实粉丝，账号权重极高，适合快速启动带货。' },
  { id: 11,  title: '美区本土店(资料协助)',       region: 'US|all',              tag: '店铺',    price: 0,    stock: 999, description: '提供美区本土店注册全套资料支持，协助过审开通。' },

  // ── 英国 ────────────────────────────────────────────────
  { id: 20,  title: '英国-5000粉账号',          region: 'UK|all',              tag: '高粉号',  price: 280,  stock: 20,  description: '英区5000+粉丝账号，适合英国市场品牌推广。' },

  // ── 东南亚 ──────────────────────────────────────────────
  { id: 30,  title: '泰国-满月白号',            region: 'sea|all',             tag: '邮箱号',  price: 8,    stock: 400, description: '泰区注册满30天账号，适合泰国市场运营。' },
  { id: 31,  title: '泰国-橱窗号(1000粉)',       region: 'sea|all',             tag: '橱窗号',  price: 72,   stock: 90,  description: '泰区千粉橱窗号，挂载泰区商品直接带货。' },
  { id: 32,  title: '越南-满月白号',            region: 'sea|all',             tag: '邮箱号',  price: 7,    stock: 500, description: '越南区满月号，适合越南市场内容运营。' },
  { id: 33,  title: '越南-橱窗号(1000粉)',       region: 'sea|all',             tag: '橱窗号',  price: 68,   stock: 100, description: '越南区千粉橱窗号，东南亚电商首选。' },
  { id: 34,  title: '印度尼西亚-满月白号',       region: 'sea|all',             tag: '邮箱号',  price: 7,    stock: 600, description: '印尼区满月号，东南亚最大市场入口。' },
  { id: 35,  title: '印度尼西亚-橱窗号',         region: 'sea|all',             tag: '橱窗号',  price: 65,   stock: 120, description: '印尼区千粉橱窗号，适合印尼TikTok Shop运营。' },
  { id: 36,  title: '菲律宾-满月白号',          region: 'sea|all',             tag: '邮箱号',  price: 7,    stock: 350, description: '菲律宾区满月号，菲律宾是东南亚TikTok增长最快市场。' },
  { id: 37,  title: '菲律宾-橱窗号',            region: 'sea|all',             tag: '橱窗号',  price: 68,   stock: 80,  description: '菲律宾区千粉橱窗号。' },
  { id: 38,  title: '马来西亚-满月白号',         region: 'sea|all',             tag: '邮箱号',  price: 9,    stock: 300, description: '马来西亚区满月号，适合马来西亚及东南亚华人市场。' },
  { id: 39,  title: '马来西亚-橱窗号',           region: 'sea|all',             tag: '橱窗号',  price: 75,   stock: 60,  description: '马来西亚区千粉橱窗号。' },
  { id: 40,  title: '新加坡-满月白号',           region: 'sea|all',             tag: '邮箱号',  price: 15,   stock: 150, description: '新加坡区满月号，适合开通新加坡本土店铺。' },
  { id: 41,  title: '缅甸-满月白号',            region: 'sea|all',             tag: '邮箱号',  price: 6,    stock: 200, description: '缅甸区满月号。' },
  { id: 42,  title: '柬埔寨-满月白号',          region: 'sea|all',             tag: '邮箱号',  price: 6,    stock: 150, description: '柬埔寨区满月号。' },
  { id: 43,  title: '老挝-满月白号',            region: 'sea|all',             tag: '邮箱号',  price: 6,    stock: 100, description: '老挝区满月号。' },

  // ── 欧洲 ────────────────────────────────────────────────
  { id: 50,  title: '德国-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 200, description: '德国区满月号，欧洲最大消费市场之一。' },
  { id: 51,  title: '德国-橱窗号(1000粉)',       region: 'eu|all',              tag: '橱窗号',  price: 105,  stock: 40,  description: '德国区千粉橱窗号，适合德国TikTok Shop运营。' },
  { id: 52,  title: '法国-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 180, description: '法国区满月号，适合法语区市场运营。' },
  { id: 53,  title: '法国-橱窗号(1000粉)',       region: 'eu|all',              tag: '橱窗号',  price: 105,  stock: 35,  description: '法国区千粉橱窗号。' },
  { id: 54,  title: '意大利-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 13,   stock: 180, description: '意大利区满月号。' },
  { id: 55,  title: '西班牙-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 13,   stock: 200, description: '西班牙区满月号，适合西班牙及拉美西语市场。' },
  { id: 56,  title: '荷兰-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 150, description: '荷兰区满月号。' },
  { id: 57,  title: '比利时-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 13,   stock: 100, description: '比利时区满月号。' },
  { id: 58,  title: '瑞典-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 120, description: '瑞典区满月号，适合北欧市场运营。' },
  { id: 59,  title: '挪威-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 100, description: '挪威区满月号。' },
  { id: 60,  title: '丹麦-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 100, description: '丹麦区满月号。' },
  { id: 61,  title: '芬兰-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 13,   stock: 90,  description: '芬兰区满月号。' },
  { id: 62,  title: '波兰-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 11,   stock: 150, description: '波兰区满月号，东欧最大市场。' },
  { id: 63,  title: '捷克-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 11,   stock: 100, description: '捷克区满月号。' },
  { id: 64,  title: '罗马尼亚-满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 10,   stock: 120, description: '罗马尼亚区满月号。' },
  { id: 65,  title: '葡萄牙-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 12,   stock: 120, description: '葡萄牙区满月号，适合葡语区市场。' },
  { id: 66,  title: '希腊-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 11,   stock: 100, description: '希腊区满月号。' },
  { id: 67,  title: '匈牙利-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 10,   stock: 90,  description: '匈牙利区满月号。' },
  { id: 68,  title: '奥地利-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 13,   stock: 100, description: '奥地利区满月号。' },
  { id: 69,  title: '瑞士-满月白号',            region: 'eu|all',              tag: '邮箱号',  price: 15,   stock: 80,  description: '瑞士区满月号，高消费市场。' },
  { id: 70,  title: '爱尔兰-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 14,   stock: 80,  description: '爱尔兰区满月号。' },
  { id: 71,  title: '土耳其-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 9,    stock: 200, description: '土耳其区满月号，亚欧大市场。' },
  { id: 72,  title: '乌克兰-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 8,    stock: 150, description: '乌克兰区满月号。' },
  { id: 73,  title: '俄罗斯-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 9,    stock: 200, description: '俄罗斯区满月号。' },
  { id: 74,  title: '克罗地亚-满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 10,   stock: 80,  description: '克罗地亚区满月号。' },
  { id: 75,  title: '塞尔维亚-满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 9,    stock: 80,  description: '塞尔维亚区满月号。' },
  { id: 76,  title: '斯洛伐克-满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 10,   stock: 80,  description: '斯洛伐克区满月号。' },
  { id: 77,  title: '保加利亚-满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 9,    stock: 90,  description: '保加利亚区满月号。' },
  { id: 78,  title: '立陶宛-满月白号',           region: 'eu|all',              tag: '邮箱号',  price: 10,   stock: 70,  description: '立陶宛区满月号。' },
  { id: 79,  title: '拉脱维亚-满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 10,   stock: 70,  description: '拉脱维亚区满月号。' },
  { id: 80,  title: '爱沙尼亚-满月白号',         region: 'eu|all',              tag: '邮箱号',  price: 10,   stock: 70,  description: '爱沙尼亚区满月号。' },

  // ── 中东 ────────────────────────────────────────────────
  { id: 90,  title: '沙特阿拉伯-满月白号',       region: 'me|all',              tag: '邮箱号',  price: 18,   stock: 150, description: '沙特区满月号，中东最大市场，高客单价蓝海。' },
  { id: 91,  title: '沙特阿拉伯-橱窗号',         region: 'me|all',              tag: '橱窗号',  price: 128,  stock: 30,  description: '沙特区千粉橱窗号，中东高端消费市场首选。' },
  { id: 92,  title: '阿联酋-满月白号',           region: 'me|all',              tag: '邮箱号',  price: 18,   stock: 120, description: '阿联酋区满月号，迪拜消费市场高净值用户聚集。' },
  { id: 93,  title: '阿联酋-橱窗号',             region: 'me|all',              tag: '橱窗号',  price: 128,  stock: 25,  description: '阿联酋区千粉橱窗号。' },
  { id: 94,  title: '以色列-满月白号',           region: 'me|all',              tag: '邮箱号',  price: 16,   stock: 100, description: '以色列区满月号，高科技市场。' },
  { id: 95,  title: '科威特-满月白号',           region: 'me|all',              tag: '邮箱号',  price: 16,   stock: 80,  description: '科威特区满月号，海湾富裕市场。' },
  { id: 96,  title: '卡塔尔-满月白号',           region: 'me|all',              tag: '邮箱号',  price: 16,   stock: 80,  description: '卡塔尔区满月号。' },
  { id: 97,  title: '巴林-满月白号',             region: 'me|all',              tag: '邮箱号',  price: 15,   stock: 70,  description: '巴林区满月号。' },
  { id: 98,  title: '阿曼-满月白号',             region: 'me|all',              tag: '邮箱号',  price: 15,   stock: 80,  description: '阿曼区满月号。' },
  { id: 99,  title: '约旦-满月白号',             region: 'me|all',              tag: '邮箱号',  price: 12,   stock: 100, description: '约旦区满月号。' },
  { id: 100, title: '伊拉克-满月白号',           region: 'me|all',              tag: '邮箱号',  price: 11,   stock: 100, description: '伊拉克区满月号。' },
  { id: 101, title: '埃及-满月白号',             region: 'me|af|all',           tag: '邮箱号',  price: 10,   stock: 200, description: '埃及区满月号，北非及中东重要市场。' },
  { id: 102, title: '巴基斯坦-满月白号',         region: 'me|all',              tag: '邮箱号',  price: 8,    stock: 300, description: '巴基斯坦区满月号，南亚大市场。' },

  // ── 拉丁美洲 ────────────────────────────────────────────
  { id: 110, title: '巴西-满月白号',             region: 'la|all',              tag: '邮箱号',  price: 10,   stock: 300, description: '巴西区满月号，拉美最大市场，TikTok用户超1亿。' },
  { id: 111, title: '巴西-橱窗号(1000粉)',        region: 'la|all',              tag: '橱窗号',  price: 80,   stock: 60,  description: '巴西区千粉橱窗号，适合巴西电商市场运营。' },
  { id: 112, title: '墨西哥-满月白号',           region: 'la|all',              tag: '邮箱号',  price: 10,   stock: 250, description: '墨西哥区满月号，美通墨模式必备，拉美蓝海市场。' },
  { id: 113, title: '墨西哥-橱窗号(1000粉)',      region: 'la|all',              tag: '橱窗号',  price: 80,   stock: 50,  description: '墨西哥区千粉橱窗号，适合美通墨跨境卖家。' },
  { id: 114, title: '阿根廷-满月白号',           region: 'la|all',              tag: '邮箱号',  price: 9,    stock: 200, description: '阿根廷区满月号。' },
  { id: 115, title: '哥伦比亚-满月白号',         region: 'la|all',              tag: '邮箱号',  price: 9,    stock: 180, description: '哥伦比亚区满月号，南美第三大市场。' },
  { id: 116, title: '智利-满月白号',             region: 'la|all',              tag: '邮箱号',  price: 10,   stock: 150, description: '智利区满月号，南美最高人均消费市场之一。' },
  { id: 117, title: '秘鲁-满月白号',             region: 'la|all',              tag: '邮箱号',  price: 8,    stock: 150, description: '秘鲁区满月号。' },
  { id: 118, title: '委内瑞拉-满月白号',         region: 'la|all',              tag: '邮箱号',  price: 7,    stock: 150, description: '委内瑞拉区满月号。' },
  { id: 119, title: '厄瓜多尔-满月白号',         region: 'la|all',              tag: '邮箱号',  price: 8,    stock: 120, description: '厄瓜多尔区满月号。' },
  { id: 120, title: '玻利维亚-满月白号',         region: 'la|all',              tag: '邮箱号',  price: 7,    stock: 100, description: '玻利维亚区满月号。' },
  { id: 121, title: '巴拉圭-满月白号',           region: 'la|all',              tag: '邮箱号',  price: 7,    stock: 100, description: '巴拉圭区满月号。' },
  { id: 122, title: '乌拉圭-满月白号',           region: 'la|all',              tag: '邮箱号',  price: 9,    stock: 80,  description: '乌拉圭区满月号，南美高消费市场。' },
  { id: 123, title: '巴拿马-满月白号',           region: 'la|all',              tag: '邮箱号',  price: 9,    stock: 80,  description: '巴拿马区满月号。' },
  { id: 124, title: '哥斯达黎加-满月白号',       region: 'la|all',              tag: '邮箱号',  price: 9,    stock: 80,  description: '哥斯达黎加区满月号。' },
  { id: 125, title: '危地马拉-满月白号',         region: 'la|all',              tag: '邮箱号',  price: 8,    stock: 100, description: '危地马拉区满月号，中美洲最大市场。' },
  { id: 126, title: '多米尼加-满月白号',         region: 'la|all',              tag: '邮箱号',  price: 8,    stock: 80,  description: '多米尼加区满月号，加勒比重要市场。' },
  { id: 127, title: '古巴-满月白号',             region: 'la|all',              tag: '邮箱号',  price: 8,    stock: 60,  description: '古巴区满月号。' },

  // ── 非洲 ────────────────────────────────────────────────
  { id: 130, title: '尼日利亚-满月白号',         region: 'af|all',              tag: '邮箱号',  price: 9,    stock: 200, description: '尼日利亚区满月号，非洲最大市场，TikTok快速增长。' },
  { id: 131, title: '肯尼亚-满月白号',           region: 'af|all',              tag: '邮箱号',  price: 8,    stock: 150, description: '肯尼亚区满月号，东非最大经济体。' },
  { id: 132, title: '南非-满月白号',             region: 'af|all',              tag: '邮箱号',  price: 10,   stock: 150, description: '南非区满月号，非洲最发达经济市场。' },
  { id: 133, title: '南非-橱窗号(1000粉)',        region: 'af|all',              tag: '橱窗号',  price: 78,   stock: 30,  description: '南非区千粉橱窗号，南非TikTok市场首选。' },
  { id: 134, title: '加纳-满月白号',             region: 'af|all',              tag: '邮箱号',  price: 8,    stock: 100, description: '加纳区满月号，西非稳定市场。' },
  { id: 135, title: '坦桑尼亚-满月白号',         region: 'af|all',              tag: '邮箱号',  price: 7,    stock: 100, description: '坦桑尼亚区满月号。' },
  { id: 136, title: '埃塞俄比亚-满月白号',       region: 'af|all',              tag: '邮箱号',  price: 7,    stock: 100, description: '埃塞俄比亚区满月号，非洲人口第二大国。' },
  { id: 137, title: '喀麦隆-满月白号',           region: 'af|all',              tag: '邮箱号',  price: 7,    stock: 80,  description: '喀麦隆区满月号。' },
  { id: 138, title: '塞内加尔-满月白号',         region: 'af|all',              tag: '邮箱号',  price: 7,    stock: 80,  description: '塞内加尔区满月号，西非法语区重要市场。' },
  { id: 139, title: '科特迪瓦-满月白号',         region: 'af|all',              tag: '邮箱号',  price: 7,    stock: 80,  description: '科特迪瓦区满月号。' },
  { id: 140, title: '摩洛哥-满月白号',           region: 'af|me|all',           tag: '邮箱号',  price: 9,    stock: 120, description: '摩洛哥区满月号，北非重要市场，连接欧非两洲。' },
  { id: 141, title: '阿尔及利亚-满月白号',       region: 'af|all',              tag: '邮箱号',  price: 8,    stock: 100, description: '阿尔及利亚区满月号，北非第一大国。' },
  { id: 142, title: '突尼斯-满月白号',           region: 'af|all',              tag: '邮箱号',  price: 8,    stock: 80,  description: '突尼斯区满月号。' },
  { id: 143, title: '利比亚-满月白号',           region: 'af|all',              tag: '邮箱号',  price: 8,    stock: 60,  description: '利比亚区满月号。' },
  { id: 144, title: '苏丹-满月白号',             region: 'af|all',              tag: '邮箱号',  price: 7,    stock: 60,  description: '苏丹区满月号。' },
  { id: 145, title: '安哥拉-满月白号',           region: 'af|all',              tag: '邮箱号',  price: 7,    stock: 80,  description: '安哥拉区满月号，非洲重要产油国市场。' },
  { id: 146, title: '莫桑比克-满月白号',         region: 'af|all',              tag: '邮箱号',  price: 6,    stock: 70,  description: '莫桑比克区满月号。' },
  { id: 147, title: '赞比亚-满月白号',           region: 'af|all',              tag: '邮箱号',  price: 6,    stock: 60,  description: '赞比亚区满月号。' },
  { id: 148, title: '津巴布韦-满月白号',         region: 'af|all',              tag: '邮箱号',  price: 6,    stock: 60,  description: '津巴布韦区满月号。' },
  { id: 149, title: '乌干达-满月白号',           region: 'af|all',              tag: '邮箱号',  price: 6,    stock: 70,  description: '乌干达区满月号。' },
  { id: 150, title: '卢旺达-满月白号',           region: 'af|all',              tag: '邮箱号',  price: 6,    stock: 60,  description: '卢旺达区满月号，东非新兴科技市场。' },

  // ── 其他地区 ────────────────────────────────────────────
  { id: 160, title: '澳大利亚-满月白号',         region: 'other|all',           tag: '邮箱号',  price: 15,   stock: 150, description: '澳洲区满月号，高消费英语市场，适合欧美类商品。' },
  { id: 161, title: '澳大利亚-橱窗号',           region: 'other|all',           tag: '橱窗号',  price: 110,  stock: 30,  description: '澳洲区千粉橱窗号，澳洲TikTok市场增速强劲。' },
  { id: 162, title: '加拿大-满月白号',           region: 'other|all',           tag: '邮箱号',  price: 14,   stock: 150, description: '加拿大区满月号，北美英语市场延伸。' },
  { id: 163, title: '加拿大-橱窗号',             region: 'other|all',           tag: '橱窗号',  price: 105,  stock: 25,  description: '加拿大区千粉橱窗号。' },
  { id: 164, title: '新西兰-满月白号',           region: 'other|all',           tag: '邮箱号',  price: 13,   stock: 100, description: '新西兰区满月号，英语高消费市场。' },
  { id: 165, title: '日本-满月白号',             region: 'other|all',           tag: '邮箱号',  price: 18,   stock: 100, description: '日本区满月号，亚洲顶级消费市场。' },
  { id: 166, title: '韩国-满月白号',             region: 'other|all',           tag: '邮箱号',  price: 16,   stock: 100, description: '韩国区满月号，亚洲流行文化输出地，高消费市场。' },
  { id: 167, title: '印度-满月白号',             region: 'other|all',           tag: '邮箱号',  price: 8,    stock: 400, description: '印度区满月号，全球最大TikTok潜力市场之一。' },
  { id: 168, title: '孟加拉国-满月白号',         region: 'other|all',           tag: '邮箱号',  price: 6,    stock: 200, description: '孟加拉区满月号，南亚新兴市场。' },
  { id: 169, title: '斯里兰卡-满月白号',         region: 'other|all',           tag: '邮箱号',  price: 7,    stock: 150, description: '斯里兰卡区满月号。' },
  { id: 170, title: '尼泊尔-满月白号',           region: 'other|all',           tag: '邮箱号',  price: 6,    stock: 120, description: '尼泊尔区满月号。' },
  { id: 171, title: '哈萨克斯坦-满月白号',       region: 'other|all',           tag: '邮箱号',  price: 9,    stock: 100, description: '哈萨克斯坦区满月号，中亚最大经济体。' },
  { id: 172, title: '阿塞拜疆-满月白号',         region: 'other|all',           tag: '邮箱号',  price: 9,    stock: 80,  description: '阿塞拜疆区满月号。' },
  { id: 173, title: '乌兹别克斯坦-满月白号',     region: 'other|all',           tag: '邮箱号',  price: 8,    stock: 100, description: '乌兹别克斯坦区满月号，中亚人口最多国家。' },
  { id: 174, title: '格鲁吉亚-满月白号',         region: 'other|all',           tag: '邮箱号',  price: 9,    stock: 80,  description: '格鲁吉亚区满月号。' },
  { id: 175, title: '亚美尼亚-满月白号',         region: 'other|all',           tag: '邮箱号',  price: 9,    stock: 70,  description: '亚美尼亚区满月号。' },
  { id: 176, title: '蒙古-满月白号',             region: 'other|all',           tag: '邮箱号',  price: 8,    stock: 80,  description: '蒙古区满月号。' },
  { id: 177, title: '巴布亚新几内亚-满月白号',   region: 'other|all',           tag: '邮箱号',  price: 8,    stock: 60,  description: '巴布亚新几内亚区满月号，太平洋岛国市场。' },
  { id: 178, title: '斐济-满月白号',             region: 'other|all',           tag: '邮箱号',  price: 8,    stock: 50,  description: '斐济区满月号。' },
];

const accountInfoItems = [
  { Icon: Clock,       label: '自动发货', desc: '发货方式' },
  { Icon: ShieldCheck, label: '24小时',  desc: '售后时间' },
  { Icon: TrendingUp,  label: '高权重',  desc: '账号质量' },
  { Icon: Zap,         label: '满30天',  desc: '注册时间' },
];

// ─── 增粉服务数据 ───────────────────────────────────────────
const socialPlatforms = [
  { id: 'tiktok',    name: 'TikTok',    emoji: '🎵' },
  { id: 'instagram', name: 'Instagram', emoji: '📷' },
  { id: 'facebook',  name: 'Facebook',  emoji: '👤' },
  { id: 'youtube',   name: 'YouTube',   emoji: '▶️' },
  { id: 'twitter',   name: 'Twitter/X', emoji: '🐦' },
  { id: 'telegram',  name: '电报',      emoji: '✈️' },
  { id: 'kwai',      name: '快手',      emoji: '⚡' },
  { id: 'shopee',    name: 'Shopee',    emoji: '🛍️' },
  { id: 'whatsapp',  name: 'WhatsApp',  emoji: '📱' },
];

const servicesByPlatform: Record<string, { id: number; name: string; price: number; min: number; max: number }[]> = {
  tiktok: [
    { id: 4858, name: 'TikTok 粉丝 | 带头像真人粉 | 1-6小时启动 | 【0-10万】', price: 12.8772, min: 100, max: 100000 },
    { id: 4859, name: 'TikTok 点赞 | 真实点赞 | 快速启动 | 【0-5万】',           price: 3.5,     min: 100, max: 50000  },
    { id: 4860, name: 'TikTok 播放量 | 极速发货 | 【100-100万】',                 price: 1.2,     min: 100, max: 1000000 },
  ],
  instagram: [
    { id: 5001, name: 'Instagram 粉丝 | 真人粉 | 1-12小时启动 | 【100-5万】', price: 18.5, min: 100, max: 50000 },
    { id: 5002, name: 'Instagram 点赞 | 快速发货 | 【50-1万】',                price: 5.0,  min: 50,  max: 10000 },
  ],
  facebook: [
    { id: 6001, name: 'Facebook 主页点赞 | 真实用户 | 【100-1万】', price: 22.0, min: 100, max: 10000 },
  ],
  youtube: [
    { id: 7001, name: 'YouTube 订阅 | 真人订阅 | 【50-5万】',       price: 28.0, min: 50,  max: 50000   },
    { id: 7002, name: 'YouTube 播放量 | 极速发货 | 【500-100万】',   price: 2.5,  min: 500, max: 1000000 },
  ],
  twitter:   [{ id: 8001,  name: 'Twitter 粉丝 | 真实账号 | 【100-5万】',          price: 20.0, min: 100, max: 50000  }],
  telegram:  [{ id: 9001,  name: 'Telegram 频道会员 | 真实用户 | 【100-10万】',     price: 15.0, min: 100, max: 100000 }],
  kwai:      [{ id: 10001, name: '快手 粉丝 | 真实粉丝 | 【100-5万】',              price: 10.0, min: 100, max: 50000  }],
  shopee:    [{ id: 11001, name: 'Shopee 店铺关注 | 【50-1万】',                    price: 25.0, min: 50,  max: 10000  }],
  whatsapp:  [{ id: 12001, name: 'WhatsApp 群组成员 | 真实号码 | 【50-5000】',      price: 35.0, min: 50,  max: 5000   }],
};

const socialInfoItems = [
  { Icon: Clock,       label: '1-6小时', desc: '开始时间' },
  { Icon: ShieldCheck, label: '无',      desc: '有无保证' },
  { Icon: TrendingUp,  label: '10万/天', desc: '速度'     },
  { Icon: Zap,         label: '24小时',  desc: '平均时间' },
];

// ─── 侧边栏分组 ─────────────────────────────────────────────
type Mode = 'account' | 'social';

export default function TikTokAccountMarketPage() {
  const { user } = useAuth();

  // 当前模式：账号购买 or 增粉服务
  const [mode, setMode] = useState<Mode>('account');

  // 账号购买状态
  const [selectedCategory, setSelectedCategory]   = useState('hot');
  const [selectedAccountId, setSelectedAccountId] = useState(1);
  const [quantity, setQuantity]                   = useState(1);

  // 增粉服务状态
  const [selectedPlatform, setSelectedPlatform]   = useState('tiktok');
  const [selectedServiceId, setSelectedServiceId] = useState(4858);
  const [links, setLinks]                         = useState('');
  const [socialQty, setSocialQty]                 = useState(1000);

  // 按分类过滤账号（region 字段用 | 分隔多个分类标签）
  const filteredAccountTypes = accountTypes.filter(a =>
    a.region.split('|').includes(selectedCategory)
  );
  const selectedAccount = accountTypes.find(a => a.id === selectedAccountId) || filteredAccountTypes[0] || accountTypes[0];
  const currentServices = servicesByPlatform[selectedPlatform] || [];
  const selectedService = currentServices.find(s => s.id === selectedServiceId) || currentServices[0];

  const handlePlatformChange = (id: string) => {
    setSelectedPlatform(id);
    const services = servicesByPlatform[id] || [];
    if (services.length > 0) {
      setSelectedServiceId(services[0].id);
      setSocialQty(services[0].min);
    }
  };

  useSEO({
    title: 'TikTok账号购买 | TK千粉/白号批发 - 24H自动发货 - 速锋科技',
    description: '专业TikTok账号购买平台，提供美区/英区满月白号、橱窗号（1000粉）、店铺开通，以及TikTok/Instagram/YouTube等平台增粉点赞服务。',
    canonical: 'https://www.tktkx.cn/tiktok-market',
    keywords: 'TikTok账号购买,TK千粉,白号批发,24H自动发货,美区新号,英区满月号,橱窗号购买,TikTok成品号,2FA验证账号',
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#333] font-sans">
      {/* ── Header ── */}
      <header className="bg-white border-b border-[#eef1f6] py-2 px-6 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[#1a56db]">速锋科技</span>
            </Link>
            <div className="bg-[#eef4ff] text-[#1a56db] text-[11px] px-2 py-0.5 rounded border border-[#dce8ff]">
              TikTok账号市场 · 安全 · 稳定 · 快速
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <a
              href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1.5 flex items-center shadow-sm transition-colors font-medium"
            >
              微信咨询 SFTKTKTK
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto py-4 px-4">
        {/* ── 公告 ── */}
        <div className="mb-3 space-y-2">
          <div className="bg-white border border-[#eef1f6] rounded px-4 py-2 flex items-center text-[13px] shadow-sm">
            <Volume2 className="h-4 w-4 text-[#999] mr-2 flex-shrink-0" />
            <span className="font-bold mr-2 text-[#333]">公告 | </span>
            <span className="text-[#666] truncate">所有账号均为24小时自动发货。购买后请及时更改密码和邮箱。如有问题请联系微信客服：SFTKTKTK</span>
          </div>
          <div className="bg-white border border-[#eef1f6] rounded px-4 py-2 flex items-center text-[13px] shadow-sm">
            <Bell className="h-4 w-4 text-[#999] mr-2 flex-shrink-0" />
            <span className="font-bold mr-2 text-[#333]">通知 | </span>
            <span className="text-[#666] truncate">目前TikTok粉丝服务全网风控，刷粉当天掉粉严重，不着急可以过几天再刷。</span>
          </div>
        </div>

        <div className="flex gap-4">
          {/* ── 左侧边栏 ── */}
          <aside className="w-52 bg-white rounded-lg border border-[#eef1f6] shadow-sm py-2 self-start sticky top-[70px]">

            {/* 分组标题：账号购买 */}
            <div
              className={`px-4 py-2 flex items-center justify-between cursor-pointer select-none ${
                mode === 'account' ? 'text-[#1a56db]' : 'text-[#999]'
              }`}
              onClick={() => setMode('account')}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest">📦 账号购买</span>
            </div>

            {accountCategories.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setMode('account');
                  setSelectedCategory(c.id);
                  const first = accountTypes.find(a => a.region.split('|').includes(c.id));
                  if (first) setSelectedAccountId(first.id);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 transition-all ${
                  mode === 'account' && selectedCategory === c.id
                    ? 'bg-[#eef4ff] text-[#1a56db]'
                    : 'text-[#666] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-base mr-2">{c.icon}</span>
                  <span className={`text-[12px] ${mode === 'account' && selectedCategory === c.id ? 'font-bold' : ''}`}>{c.name}</span>
                </div>
                <ChevronRight className={`h-3 w-3 ${mode === 'account' && selectedCategory === c.id ? 'text-[#1a56db]' : 'text-[#ddd]'}`} />
              </button>
            ))}

            {/* 分割线 */}
            <div className="mx-4 my-2 border-t border-[#f0f2f5]" />

            {/* 分组标题：增粉服务 */}
            <div
              className={`px-4 py-2 flex items-center justify-between cursor-pointer select-none ${
                mode === 'social' ? 'text-[#1a56db]' : 'text-[#999]'
              }`}
              onClick={() => setMode('social')}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest">🚀 增粉服务</span>
            </div>

            {socialPlatforms.map(p => (
              <button
                key={p.id}
                onClick={() => { setMode('social'); handlePlatformChange(p.id); }}
                className={`w-full flex items-center justify-between px-4 py-2 transition-all ${
                  mode === 'social' && selectedPlatform === p.id
                    ? 'bg-[#eef4ff] text-[#1a56db]'
                    : 'text-[#666] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-base mr-2">{p.emoji}</span>
                  <span className={`text-[12px] ${mode === 'social' && selectedPlatform === p.id ? 'font-bold' : ''}`}>{p.name}</span>
                </div>
                <ChevronRight className={`h-3 w-3 ${mode === 'social' && selectedPlatform === p.id ? 'text-[#1a56db]' : 'text-[#ddd]'}`} />
              </button>
            ))}
          </aside>

          {/* ── 中间表单 ── */}
          <section className="flex-1 bg-white rounded-lg border border-[#eef1f6] shadow-sm p-8 min-h-[600px] relative">

            {/* === 账号购买表单 === */}
            {mode === 'account' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 账号类型
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] appearance-none outline-none focus:border-[#1a56db]"
                      value={selectedAccountId}
                      onChange={e => setSelectedAccountId(Number(e.target.value))}
                    >
                      {filteredAccountTypes.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.title} {a.price > 0 ? `- ¥${a.price} [库存: ${a.stock}]` : '- [联系客服]'}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ccc] rotate-90" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 购买数量
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-[#f8f9fb] border border-[#eef1f6] rounded flex items-center justify-center hover:bg-gray-50 text-xl font-bold"
                    >-</button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-20 bg-[#f8f9fb] border border-[#eef1f6] rounded py-2 text-center font-bold text-[#1a56db]"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-[#f8f9fb] border border-[#eef1f6] rounded flex items-center justify-center hover:bg-gray-50 text-xl font-bold"
                    >+</button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333]">优惠券</label>
                  <input
                    placeholder="如有优惠券请输入"
                    className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none focus:border-[#1a56db]"
                  />
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <input type="checkbox" id="agree-account" className="w-4 h-4 border-[#ddd] rounded cursor-pointer" />
                  <label htmlFor="agree-account" className="text-[12px] text-[#999] cursor-pointer">购买即视为同意服务协议</label>
                </div>

                <div className="flex items-center justify-between border-t border-[#f5f7fa] pt-8 absolute bottom-8 left-8 right-8">
                  <div className="flex items-baseline">
                    <span className="text-[#666] text-[14px] mr-2">支付金额：</span>
                    {selectedAccount.price > 0 ? (
                      <span className="text-[#1a56db] font-bold text-2xl">¥ {(quantity * selectedAccount.price).toFixed(2)}</span>
                    ) : (
                      <span className="text-[#1a56db] font-bold text-2xl">联系客服报价</span>
                    )}
                  </div>
                  <a
                    href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a56db] text-white px-12 py-3 rounded text-[15px] font-bold hover:bg-[#154ec1] shadow-lg shadow-blue-200 inline-block text-center"
                  >
                    立即购买
                  </a>
                </div>
              </div>
            )}

            {/* === 增粉服务表单 === */}
            {mode === 'social' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 服务类型
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] appearance-none outline-none focus:border-[#1a56db]"
                      value={selectedServiceId}
                      onChange={e => setSelectedServiceId(Number(e.target.value))}
                    >
                      {currentServices.map(s => (
                        <option key={s.id} value={s.id}>{s.id} - {s.name}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ccc] rotate-90" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 链接
                  </label>
                  <textarea
                    value={links}
                    onChange={e => setLinks(e.target.value)}
                    placeholder="请输入账号/视频链接，一行一个，支持多链接"
                    className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none min-h-[120px] resize-none focus:border-[#1a56db]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-[#333] flex items-center">
                    <span className="text-[#ff4d4f] mr-1 font-bold">*</span> 数量
                  </label>
                  <input
                    type="number"
                    value={socialQty}
                    onChange={e => setSocialQty(Number(e.target.value))}
                    className="w-full bg-[#f8f9fb] border border-[#eef1f6] rounded px-4 py-3 text-[14px] outline-none focus:border-[#1a56db]"
                  />
                  {selectedService && (
                    <p className="text-[#ff4d4f] text-[11px]">
                      最小: {selectedService.min} - 最大: {selectedService.max.toLocaleString()} (¥ {selectedService.price}/1000个)
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <input type="checkbox" id="agree-social" className="w-4 h-4 border-[#ddd] rounded cursor-pointer" />
                  <label htmlFor="agree-social" className="text-[12px] text-[#999] cursor-pointer">我确定已填写好的订单信息，并了解下单须知</label>
                </div>

                <div className="flex items-center justify-between border-t border-[#f5f7fa] pt-8 absolute bottom-8 left-8 right-8">
                  <div className="flex items-baseline">
                    <span className="text-[#666] text-[14px] mr-2">总金额：</span>
                    {selectedService ? (
                      <span className="text-[#1a56db] font-bold text-2xl">
                        ¥ {(socialQty / 1000 * selectedService.price).toFixed(4)}
                      </span>
                    ) : (
                      <span className="text-[#1a56db] font-bold text-2xl">联系客服</span>
                    )}
                  </div>
                  <a
                    href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a56db] text-white px-10 py-3 rounded text-[15px] font-bold hover:bg-[#154ec1] transition-colors shadow-lg shadow-blue-200 inline-block text-center"
                  >
                    立即下单
                  </a>
                </div>
              </div>
            )}
          </section>

          {/* ── 右侧面板（随mode切换内容） ── */}
          <aside className="w-72 space-y-4 self-start sticky top-[70px]">

            {/* 账号购买说明 */}
            {mode === 'account' && (
              <div className="bg-white rounded-lg border border-[#eef1f6] shadow-sm p-5">
                <h3 className="text-base font-bold text-[#333] mb-5">商品说明</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[13px] font-bold text-[#333]">{selectedAccount.title}</p>
                    <p className="text-[11px] text-[#999] leading-relaxed bg-[#f8f9fb] p-3 rounded">{selectedAccount.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {accountInfoItems.map((item, idx) => (
                      <div key={idx} className="bg-white border border-[#eef1f6] rounded p-2.5 flex items-center">
                        <div className="bg-[#1a56db] p-1.5 rounded mr-3 text-white">
                          <item.Icon size={14} />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[#333] leading-none mb-1">{item.label}</div>
                          <div className="text-[10px] text-[#ccc] leading-none">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-2">
                    <p className="text-[12px] font-bold text-[#333]">⚠️ 注意事项：</p>
                    {['购买后请务必更改密码', '使用纯净住宅IP登录', '不要频繁切换设备', '如遇问题请联系客服SFTKTKTK'].map((note, idx) => (
                      <div key={idx} className="flex items-start text-[11px] text-[#666]">
                        <span className="text-[#ff4d4f] mr-1.5 font-bold">★</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 增粉服务说明 */}
            {mode === 'social' && (
              <div className="bg-white rounded-lg border border-[#eef1f6] shadow-sm p-5">
                <h3 className="text-base font-bold text-[#333] mb-5">服务说明</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[13px] font-bold text-[#333]">示例链接 (PC端)</p>
                    <div className="bg-[#f8f9fb] border border-[#eef1f6] rounded p-3 flex items-center justify-between">
                      <span className="text-[12px] text-[#999] truncate">https://www.tiktok.com/@用户名</span>
                      <ExternalLink className="h-3 w-3 text-[#ccc] flex-shrink-0 ml-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {socialInfoItems.map((item, idx) => (
                      <div key={idx} className="bg-white border border-[#eef1f6] rounded p-2.5 flex items-center">
                        <div className="bg-[#1a56db] p-1.5 rounded mr-3 text-white flex-shrink-0">
                          <item.Icon size={14} />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-[#333] leading-none mb-1">{item.label}</div>
                          <div className="text-[10px] text-[#ccc] leading-none">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-2">
                    <p className="text-[12px] font-bold text-[#333]">⚠️ 注意：</p>
                    {[
                      '下单前请仔细检查链接格式。',
                      '请确保账户是公开状态，不是私密账号。',
                      '禁止在服务中途更改用户名！',
                      '同链接同服务重复下单概不退款。',
                    ].map((note, idx) => (
                      <div key={idx} className="flex items-start text-[11px] text-[#666]">
                        <span className="text-[#ff4d4f] mr-1.5 font-bold flex-shrink-0">★</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 联系我们（始终显示） */}
            <div className="bg-white rounded-lg border border-[#eef1f6] shadow-sm p-4 space-y-3">
              <h4 className="text-[13px] font-bold text-[#333]">联系我们</h4>
              <a
                href="https://work.weixin.qq.com/kfid/kfc6e7a2a71db64e56d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#07c160] text-white py-3 rounded-lg font-bold flex items-center justify-center hover:bg-[#06ad56] transition-all shadow-sm text-[14px]"
              >
                <span className="mr-2">💬</span> 微信客服 SFTKTKTK
              </a>
              <a
                href="https://t.me/TRXBGB"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#229ED9] text-white py-3 rounded-lg font-bold flex items-center justify-center hover:bg-[#1a8bc4] transition-all shadow-sm text-[14px]"
              >
                <span className="mr-2">✈️</span> Telegram @TRXBGB
              </a>
            </div>

            <button className="w-full bg-[#1a56db] text-white py-4 rounded-lg font-bold flex items-center justify-center shadow-md hover:bg-[#154ec1] transition-all">
              <HeadphonesIcon className="h-4 w-4 mr-2" />
              订单售后客服
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}
