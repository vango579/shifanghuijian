/**
 * Radiant Living - Main JavaScript
 * 游戏攻略图鉴网站交互脚本
 */

(function() {
  'use strict';

  // ========================================
  // Sidebar Toggle Module
  // ========================================
  const SidebarModule = {
    isAnimating: false,

    init() {
      this.sidebar = document.getElementById('sidebar');
      this.toggleBtn = document.getElementById('sidebarToggle');
      this.hamburgerBtn = document.getElementById('hamburgerBtn');
      this.mobileOverlay = document.getElementById('mobileOverlay');
      if (!this.sidebar) return;

      this.bindEvents();
      this.loadState();
      this.initMobile();
    },

    bindEvents() {
      // Toggle button click (desktop)
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (this.isAnimating) return;
          this.toggle();
        });
      }

      // 导航项点击
      this.sidebar.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item');
        if (navItem && navItem.href) {
          e.stopPropagation();
          // 在移动端，点击导航链接后关闭侧边栏
          if (window.innerWidth <= 768) {
            this.closeMobile();
          }
        }
      });

      // 防止在过渡动画期间触发状态变化
      this.sidebar.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'width' || e.propertyName === 'transform') {
          this.isAnimating = false;
        }
      });

      this.sidebar.addEventListener('transitionstart', (e) => {
        if (e.propertyName === 'width' || e.propertyName === 'transform') {
          this.isAnimating = true;
        }
      });

      // Keyboard support - ESC键折叠
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (window.innerWidth <= 768) {
            this.closeMobile();
          } else if (!this.sidebar.classList.contains('collapsed')) {
            this.collapse();
          }
        }
      });
    },

    // Mobile hamburger menu
    initMobile() {
      if (this.hamburgerBtn) {
        this.hamburgerBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openMobile();
        });
      }

      if (this.mobileOverlay) {
        this.mobileOverlay.addEventListener('click', () => {
          this.closeMobile();
        });
      }

      // Handle resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          this.closeMobile();
        }
      });
    },

    openMobile() {
      this.sidebar.classList.add('mobile-open');
      this.mobileOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    closeMobile() {
      this.sidebar.classList.remove('mobile-open');
      this.mobileOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    },

    toggle() {
      this.isAnimating = true;
      this.sidebar.classList.toggle('collapsed');
      this.saveState();
    },

    collapse() {
      this.isAnimating = true;
      this.sidebar.classList.add('collapsed');
      this.saveState();
    },

    expand() {
      this.isAnimating = true;
      this.sidebar.classList.remove('collapsed');
      this.saveState();
    },

    saveState() {
      const isCollapsed = this.sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebar-collapsed', isCollapsed);
    },

    loadState() {
      // 仅在桌面端加载折叠状态
      if (window.innerWidth > 768) {
        const saved = localStorage.getItem('sidebar-collapsed');
        if (saved === 'true') {
          this.sidebar.classList.add('collapsed');
        }
      }
    }
  };

  // ========================================
  // Navigation Module - 处理导航链接
  // ========================================
  const NavigationModule = {
    init() {
      this.navLinks = document.querySelectorAll('.sidebar-nav .nav-item');
      this.bindEvents();
    },

    bindEvents() {
      this.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          // 确保链接正常工作，SidebarModule 已处理 stopPropagation
        });
      });
    }
  };

  // ========================================
  // Search Module
  // ========================================
  const SearchModule = {
    init() {
      this.searchInput = document.querySelector('.input-search');
      this.searchBtn = document.querySelector('[aria-label="搜索"]');
      if (!this.searchInput) return;

      this.bindEvents();
    },

    bindEvents() {
      if (this.searchInput) {
        this.searchInput.addEventListener('input', App.utils.debounce((e) => {
          this.onSearch(e.target.value);
        }, 300));

        // 搜索框聚焦时阻止事件冒泡
        this.searchInput.addEventListener('focus', (e) => e.stopPropagation());
      }

      if (this.searchBtn) {
        this.searchBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.searchInput?.focus();
        });
      }
    },

    onSearch(query) {
      // TODO: 实现搜索结果渲染功能
      // 示例: document.querySelector('.search-results').innerHTML = renderResults(query);
      document.dispatchEvent(new CustomEvent('search', { detail: { query } }));
    }
  };

  // ========================================
  // Category Filter Module
  // ========================================
  const FilterModule = {
    init() {
      this.chips = document.querySelectorAll('.chip');
      if (this.chips.length === 0) return;

      this.bindEvents();
    },

    bindEvents() {
      this.chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectChip(chip);
        });
      });
    },

    selectChip(selectedChip) {
      this.chips.forEach(chip => {
        chip.classList.remove('chip-primary');
        chip.classList.add('chip-default');
      });

      selectedChip.classList.remove('chip-default');
      selectedChip.classList.add('chip-primary');

      // TODO: 实现筛选逻辑
      // 示例: filterCards(filterType);
      const filterType = selectedChip.textContent.trim();
      document.dispatchEvent(new CustomEvent('filter', { detail: { type: filterType } }));
    }
  };

  // ========================================
  // Card Interactions Module
  // ========================================
  const CardModule = {
    init() {
      this.featuredCard = document.querySelector('.featured-card');
      this.cards = document.querySelectorAll('.card');
      this.bookmarkBtns = document.querySelectorAll('[aria-label="收藏"]');

      this.bindEvents();
    },

    bindEvents() {
      // Bookmark buttons
      this.bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleBookmark(btn);
        });
      });

      // Keyboard navigation for cards
      this.cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
          }
        });
      });
    },

    toggleBookmark(btn) {
      const icon = btn.querySelector('.material-symbols-outlined');
      const isBookmarked = btn.classList.contains('bookmarked');

      if (isBookmarked) {
        btn.classList.remove('bookmarked');
        icon.textContent = 'bookmark_border';
      } else {
        btn.classList.add('bookmarked');
        icon.textContent = 'bookmark';
      }
    }
  };

  // ========================================
  // Timer Module
  // ========================================
  const TimerModule = {
    timers: {},
    updateInterval: null,
    serverTimeInterval: null,

    init() {
      this.timerDisplays = document.querySelectorAll('[class*="timer-display"]');
      this.parseTimers();
      this.startUpdating();
      this.bindEvents();
      this.initServerTime();
    },

    parseTimers() {
      document.querySelectorAll('.card').forEach((card, index) => {
        const timeEl = card.querySelector('.time-value');
        if (timeEl) {
          const timeText = timeEl.textContent;
          if (timeText && timeText.match(/\d+:\d+/)) {
            if (!card.dataset.timerId) {
              card.dataset.timerId = `timer-${Date.now()}-${index}`;
            }
            const id = card.dataset.timerId;
            this.timers[id] = this.parseTimeToSeconds(timeText);
          } else if (timeText === '已就绪') {
            if (!card.dataset.timerId) {
              card.dataset.timerId = `timer-${Date.now()}-${index}`;
            }
            const id = card.dataset.timerId;
            this.timers[id] = 0;
          }
        }
      });
    },

    parseTimeToSeconds(timeStr) {
      const parts = timeStr.split(':').map(Number);
      if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
      } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
      }
      return 0;
    },

    formatTime(seconds) {
      if (seconds < 0) return '00:00';
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;

      if (h > 0) {
        return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      }
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    },

    startUpdating() {
      // 防止内存泄漏：先清除旧定时器
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }
      this.updateInterval = setInterval(() => {
        Object.keys(this.timers).forEach(id => {
          if (this.timers[id] > 0) {
            this.timers[id]--;
          }
        });
        this.updateDisplay();
      }, 1000);
    },

    updateDisplay() {
      document.querySelectorAll('.card').forEach(card => {
        const timeEl = card.querySelector('.time-value');
        const timerId = card.dataset.timerId;
        if (timeEl && timerId && this.timers[timerId] !== undefined) {
          if (this.timers[timerId] === 0) {
            timeEl.textContent = '已就绪';
            timeEl.className = 'text-sm font-bold text-secondary time-value';
          } else {
            timeEl.textContent = this.formatTime(this.timers[timerId]);
            timeEl.className = 'text-sm font-bold text-primary time-value';
          }
        }
      });
    },

    bindEvents() {
      // Add alarm buttons
      document.querySelectorAll('[aria-label="添加计时"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const card = btn.closest('.card');
          const timerId = card?.dataset.timerId;
          if (timerId) {
            this.timers[timerId] = 7200;
            this.updateDisplay();
          }
        });
      });

      // Play buttons
      document.querySelectorAll('[aria-label="挑战"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const card = btn.closest('.card');
          const timerId = card?.dataset.timerId;
          const timeEl = card?.querySelector('.time-value');
          if (timerId && (this.timers[timerId] === 0 || this.timers[timerId] === undefined)) {
            this.timers[timerId] = 14400;
            if (timeEl) {
              timeEl.className = 'text-sm font-bold text-primary time-value';
            }
            this.updateDisplay();
          }
        });
      });
    },

    initServerTime() {
      const serverTimeEl = document.getElementById('serverTime');
      if (serverTimeEl) {
        this.updateServerTime();
        this.serverTimeInterval = setInterval(() => this.updateServerTime(), 1000);
      }
    },

    updateServerTime() {
      const serverTimeEl = document.getElementById('serverTime');
      if (serverTimeEl) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        serverTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
      }
    },

    destroy() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
      if (this.serverTimeInterval) {
        clearInterval(this.serverTimeInterval);
        this.serverTimeInterval = null;
      }
    }
  };

  // ========================================
  // Toggle Switch Module
  // ========================================
  const ToggleModule = {
    init() {
      this.toggles = document.querySelectorAll('.toggle');
      if (this.toggles.length === 0) return;

      this.bindEvents();
    },

    bindEvents() {
      this.toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          toggle.classList.toggle('active');

          const isActive = toggle.classList.contains('active');
          document.dispatchEvent(new CustomEvent('toggle', {
            detail: { element: toggle, active: isActive }
          }));
        });
      });
    }
  };

  // ========================================
  // Range Slider Module
  // ========================================
  const SliderModule = {
    init() {
      this.sliders = document.querySelectorAll('.range');
      if (this.sliders.length === 0) return;

      this.bindEvents();
    },

    bindEvents() {
      this.sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
          e.stopPropagation();
          this.onSlide(e.target);
        });
      });
    },

    onSlide(slider) {
      const value = slider.value;
      const min = slider.min || 0;
      const max = slider.max || 100;
      const percentage = ((value - min) / (max - min)) * 100;

      slider.style.background = `linear-gradient(to right, var(--primary) ${percentage}%, var(--surface-container-highest) ${percentage}%)`;
    }
  };

  // ========================================
  // Modal Module
  // ========================================
  const ModalModule = {
    init() {
      this.modals = document.querySelectorAll('.modal-overlay');
      this.modalTriggers = document.querySelectorAll('[data-modal]');
      this.closeButtons = document.querySelectorAll('[data-close]');

      if (this.modals.length === 0) return;

      this.bindEvents();
    },

    bindEvents() {
      this.modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const modalId = trigger.dataset.modal;
          this.open(modalId);
        });
      });

      this.closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.closeAll();
        });
      });

      this.modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.closeAll();
          }
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAll();
        }
      });
    },

    open(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },

    closeAll() {
      this.modals.forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  };

  // ========================================
  // Progress Animation Module
  // ========================================
  const ProgressModule = {
    init() {
      this.progressBars = document.querySelectorAll('.progress-bar');
      if (this.progressBars.length === 0) return;

      this.observe();
    },

    observe() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      this.progressBars.forEach(bar => observer.observe(bar));
    },

    animate(bar) {
      const targetWidth = bar.dataset.width || '100%';
      bar.style.width = '0%';

      requestAnimationFrame(() => {
        bar.style.transition = 'width 1s ease-out';
        bar.style.width = targetWidth;
      });
    }
  };

  // ========================================
  // Smooth Scroll Module
  // ========================================
  const ScrollModule = {
    init() {
      this.links = document.querySelectorAll('a[href^="#"]');
      if (this.links.length === 0) return;

      this.bindEvents();
    },

    bindEvents() {
      this.links.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href === '#') return;

          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  };

  // ========================================
  // Lazy Load Images
  // ========================================
  const LazyLoadModule = {
    init() {
      this.images = document.querySelectorAll('img[data-src]');
      if (this.images.length === 0) return;

      this.observe();
    },

    observe() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.load(entry.target);
              observer.unobserve(entry.target);
            }
          });
        });

        this.images.forEach(img => observer.observe(img));
      } else {
        this.images.forEach(img => this.load(img));
      }
    },

    load(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    }
  };

  // ========================================
  // Ripple Effect Module
  // ========================================
  const RippleModule = {
    init() {
      this.buttons = document.querySelectorAll('.btn, .btn-icon, .chip, .btn-icon-sm, .sidebar-nav .nav-item');

      this.buttons.forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.create(e, btn);
        }, true); // 使用捕获阶段确保先触发
      });
    },

    create(e, btn) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX === 0 ? rect.width / 2 : e.clientX - rect.left;
      const y = e.clientY === 0 ? rect.height / 2 : e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        position: absolute;
        background: rgba(149, 75, 0, 0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.5s ease-out forwards;
        pointer-events: none;
        width: ${Math.max(rect.width, rect.height) * 2}px;
        height: ${Math.max(rect.width, rect.height) * 2}px;
        left: ${x}px;
        top: ${y}px;
        margin-left: -${Math.max(rect.width, rect.height)}px;
        margin-top: -${Math.max(rect.width, rect.height)}px;
      `;

      btn.appendChild(ripple);

      setTimeout(() => ripple.remove(), 500);
    }
  };

  // Add ripple animation
  if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(1);
          opacity: 0;
        }
      }
      .ripple-effect {
        z-index: 1;
      }
    `;
    document.head.appendChild(style);
  }

  // ========================================
  // Calculator Module
  // ========================================
  const CalculatorModule = {
    init() {
      this.inputs = document.querySelectorAll('.input-number');
      this.calculateBtn = document.querySelector('[data-calculate]');

      if (this.inputs.length === 0) return;

      this.bindEvents();
    },

    bindEvents() {
      this.inputs.forEach(input => {
        input.addEventListener('input', App.utils.debounce(() => {
          this.calculate();
        }, 300));
      });

      if (this.calculateBtn) {
        this.calculateBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.calculate();
        });
      }
    },

    calculate() {
      const inputs = {};
      this.inputs.forEach(input => {
        const name = input.name || input.id;
        inputs[name] = parseFloat(input.value) || 0;
      });

      // TODO: 实现DPS计算逻辑
      // 示例: updateRadarChart(inputs);
      document.dispatchEvent(new CustomEvent('calculate', { detail: inputs }));
    }
  };

  // ========================================
  // Notification Module
  // ========================================
  const NotificationModule = {
    container: null,

    init() {
      this.createContainer();
    },

    createContainer() {
      this.container = document.createElement('div');
      this.container.className = 'notification-container';
      this.container.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    },

    show(message, type = 'info', duration = 3000) {
      const notification = document.createElement('div');
      const colors = {
        success: 'var(--primary)',
        error: 'var(--error)',
        warning: 'var(--tertiary-container)',
        info: 'var(--surface-container-high)'
      };

      notification.style.cssText = `
        padding: 1rem 1.5rem;
        background: ${colors[type]};
        color: ${type === 'warning' ? 'var(--on-tertiary-fixed)' : 'var(--on-surface)'};
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        animation: slideIn 0.3s ease;
        pointer-events: auto;
      `;
      notification.textContent = message;

      this.container.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
      }, duration);
    }
  };

  // Add notification animations
  if (!document.getElementById('notification-styles')) {
    const notifStyle = document.createElement('style');
    notifStyle.id = 'notification-styles';
    notifStyle.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(notifStyle);
  }

  // ========================================
  // Initialize All Modules
  // ========================================
  const App = {
    modules: [],
    utils: {
      debounce(fn, delay) {
        let timeout;
        return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => fn.apply(this, args), delay);
        };
      }
    },

    init() {
      // 初始化顺序很重要
      this.modules = [
        SidebarModule,
        NavigationModule,
        SearchModule,
        FilterModule,
        CardModule,
        TimerModule,
        ToggleModule,
        SliderModule,
        ModalModule,
        ProgressModule,
        ScrollModule,
        LazyLoadModule,
        RippleModule,
        CalculatorModule,
        NotificationModule
      ];

      this.modules.forEach(module => {
        try {
          module.init();
        } catch (e) {
          console.warn(`Module ${module.constructor?.name || module.init?.name} initialization failed:`, e);
        }
      });

      document.dispatchEvent(new Event('app.ready'));
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }

  // Expose App globally for debugging
  window.RadiantLiving = App;

})();
