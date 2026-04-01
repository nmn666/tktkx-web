import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * 动态设置页面 SEO 信息
 * 用法：在每个页面组件顶部调用 useSEO({ title, description })
 */
export function useSEO({ title, description, canonical, ogImage }: SEOProps) {
  useEffect(() => {
    // 设置 title
    document.title = title;

    // 设置 meta description
    setMeta('name', 'description', description);

    // 设置 OG tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    if (canonical) setMeta('property', 'og:url', canonical);
    if (ogImage) setMeta('property', 'og:image', ogImage);

    // 设置 Twitter Card
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // 设置 canonical link
    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // 页面切换后恢复默认
    return () => {
      document.title = '速锋科技 | TikTok橱窗号陪跑·Meta账号·GEO营销·账号市场';
    };
  }, [title, description, canonical, ogImage]);
}

function setMeta(attrName: string, attrValue: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
