/**
 * 缓存清理工具
 * 
 * 使用方法：
 * 1. 在 HTML 中引入此脚本（放在 body 底部）
 * 2. 在需要清除缓存的 JS/CSS 链接上添加 data-version 属性
 * 
 * 示例：
 * <script src="main.js" data-version></script>
 * <link href="styles.css" data-version rel="stylesheet">
 */

/**
 * 版本号配置
 * 修改 VERSION 值即可强制刷新所有带 data-version 的资源
 */
const CacheBuster = {
  // 版本号：修改此值可强制刷新所有资源
  VERSION: '20260423.1558',
  
  // 是否每次打开时清除缓存（开发模式）
  AUTO_CLEAR_ON_LOAD: true,

  /**
   * 初始化 - 为所有带 data-version 属性的资源添加版本号
   */
  init() {
    // 每次打开时自动清除缓存（开发模式）
    if (this.AUTO_CLEAR_ON_LOAD) {
      this.clearAllCache();
    }
    
    this.addVersionToScripts();
    this.addVersionToStyles();
    this.setMetaVersion();
  },

  /**
   * 为 JS 脚本添加版本号
   */
  addVersionToScripts() {
    const scripts = document.querySelectorAll('script[data-version]');
    scripts.forEach(script => {
      this.addVersionParam(script, 'src');
    });
  },

  /**
   * 为 CSS 样式添加版本号
   */
  addVersionToStyles() {
    const links = document.querySelectorAll('link[data-version]');
    links.forEach(link => {
      if (link.getAttribute('rel') === 'stylesheet') {
        this.addVersionParam(link, 'href');
      }
    });
  },

  /**
   * 为资源 URL 添加版本参数
   * @param {HTMLElement} element - DOM 元素
   * @param {string} attrName - 属性名（src 或 href）
   */
  addVersionParam(element, attrName) {
    let url = element.getAttribute(attrName);
    if (!url) return;

    // 移除已有的 v 参数，避免重复
    url = url.replace(/([?&])v=[^&]*&?/g, '$1');
    
    // 移除末尾的 & 或 ?
    url = url.replace(/[?&]$/, '');
    
    // 添加版本参数
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}v=${this.VERSION}`;
    
    element.setAttribute(attrName, url);
  },

  /**
   * 设置 meta 版本标签（方便调试）
   */
  setMetaVersion() {
    let meta = document.querySelector('meta[name="cache-version"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'cache-version';
      document.head.appendChild(meta);
    }
    meta.content = this.VERSION;
  },

  /**
   * 获取当前版本号
   */
  getVersion() {
    return this.VERSION;
  },

  /**
   * 手动清除 localStorage（可选功能）
   */
  clearStorage() {
    localStorage.removeItem('sidebarCollapsed');
    sessionStorage.clear();
  },
  
  /**
   * 清除所有缓存（开发模式使用）
   */
  clearAllCache() {
    // 清除 localStorage
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('无法清除 localStorage:', e);
    }
    
    // 清除 sessionStorage
    try {
      sessionStorage.clear();
    } catch (e) {
      console.warn('无法清除 sessionStorage:', e);
    }
    
    // 清除 Service Worker 缓存
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
  }
};

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CacheBuster.init());
} else {
  CacheBuster.init();
}

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CacheBuster;
}
