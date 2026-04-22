/**
 * Service Worker 注册与管理
 * 
 * 功能：
 * 1. 自动注册 Service Worker
 * 2. 检测更新并提示用户
 * 3. 提供手动刷新功能
 */

const SWManager = {
  /**
   * 初始化 Service Worker
   */
  init() {
    if ('serviceWorker' in navigator) {
      this.registerSW();
      this.listenForUpdates();
    } else {
      console.log('[SW Manager] 当前浏览器不支持 Service Worker');
    }
  },

  /**
   * 注册 Service Worker
   */
  async registerSW() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('[SW Manager] Service Worker 注册成功:', registration.scope);
      
      // 检查更新
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // 发现新版本
            this.showUpdateNotification();
          }
        });
      });
      
      return registration;
    } catch (error) {
      console.error('[SW Manager] Service Worker 注册失败:', error);
    }
  },

  /**
   * 监听更新
   */
  listenForUpdates() {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  },

  /**
   * 显示更新提示
   */
  showUpdateNotification() {
    // 创建更新提示 UI
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.innerHTML = `
      <div class="update-content">
        <span>有新版本可用</span>
        <button id="update-btn">立即更新</button>
      </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
      #update-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
      }
      
      @keyframes slideIn {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .update-content {
        background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
        border: 1px solid #c9a66b;
        border-radius: 12px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }
      
      .update-content span {
        color: #e8e8e8;
        font-size: 14px;
      }
      
      #update-btn {
        background: #c9a66b;
        border: none;
        border-radius: 6px;
        padding: 8px 16px;
        color: #121212;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      #update-btn:hover {
        background: #e8c99b;
        transform: scale(1.05);
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // 绑定点击事件
    document.getElementById('update-btn').addEventListener('click', () => {
      this.applyUpdate();
    });
  },

  /**
   * 应用更新
   */
  applyUpdate() {
    // 通知 Service Worker 跳过等待
    navigator.serviceWorker.controller?.postMessage('skipWaiting');
    
    // 移除提示
    const notification = document.getElementById('update-notification');
    if (notification) {
      notification.remove();
    }
  },

  /**
   * 手动清除所有缓存
   */
  async clearAllCache() {
    if ('caches' in window) {
      const names = await caches.keys();
      await Promise.all(names.map(name => caches.delete(name)));
      console.log('[SW Manager] 已清除所有缓存');
    }
    
    // 同时清除 localStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // 重新加载页面
    window.location.reload();
  },

  /**
   * 获取当前缓存信息
   */
  async getCacheInfo() {
    if ('caches' in window) {
      const names = await caches.keys();
      console.log('[SW Manager] 当前缓存:', names);
      return names;
    }
    return [];
  }
};

// 自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SWManager.init());
} else {
  SWManager.init();
}

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SWManager;
}
