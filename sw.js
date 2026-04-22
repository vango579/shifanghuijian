/**
 * Service Worker - 缓存清理与更新策略
 * 
 * 功能：
 * 1. 缓存优先策略（提升加载速度）
 * 2. 网络优先策略（确保最新内容）
 * 3. 自动检测更新并提示用户
 */

const CACHE_NAME = 'sfhj-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/dreams.html',
  '/styles.css',
  '/components.js',
  '/main.js',
  '/cache-buster.js',
  '/icon/logo.png',
  '/icon/app_icon_round.png'
];

/**
 * 安装事件 - 缓存静态资源
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] 缓存静态资源');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()) // 立即激活新版本
  );
});

/**
 * 激活事件 - 清理旧缓存
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] 删除旧缓存:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim()) // 控制所有页面
  );
});

/**
 * 请求拦截 - 根据策略处理缓存
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== location.origin) return;

  // HTML 页面：网络优先，确保获取最新内容
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 静态资源（JS/CSS/图片）：缓存优先，提升性能
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 其他请求：网络优先
  event.respondWith(networkFirst(request));
});

/**
 * 判断是否为静态资源
 */
function isStaticAsset(path) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.woff', '.woff2', '.ttf'];
  return staticExtensions.some(ext => path.endsWith(ext));
}

/**
 * 缓存优先策略
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    // 后台更新缓存
    fetchAndCache(request);
    return cached;
  }
  return fetchAndCache(request);
}

/**
 * 网络优先策略
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

/**
 * 后台获取并更新缓存
 */
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] 获取资源失败:', request.url);
  }
}

/**
 * 监听来自主线程的消息
 */
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  // 清除所有缓存
  if (event.data === 'clearCache') {
    event.waitUntil(
      caches.keys().then(names => Promise.all(names.map(name => caches.delete(name))))
    );
  }
});
