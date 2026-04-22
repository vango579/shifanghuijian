/**
 * 主逻辑模块
 * 处理页面切换、角色卡片交互等功能
 */

/**
 * 角色卡片模块
 */
const CharacterCard = {
  /**
   * 角色数据
   */
  characters: [
    {
      id: 'kael',
      name: '夜刃 - Kael',
      role: 'Assault · 突击型',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=300&fit=crop',
      stats: { attack: 98, defense: 45, speed: 92 },
      description: '夜刃是战场上最锋利的刀锋，擅长快速切入敌阵造成大量伤害。'
    },
    {
      id: 'lyra',
      name: '流光 - Lyra',
      role: 'Support · 支援型',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
      stats: { attack: 52, defense: 78, healing: 95 },
      description: '流光是团队的灵魂，用治愈之光守护每一位队友。'
    },
    {
      id: 'orion',
      name: '磐石 - Orion',
      role: 'Defender · 防御型',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      stats: { attack: 65, defense: 99, speed: 40 },
      description: '磐石是不可逾越的壁垒，用钢铁般的身躯抵挡一切攻击。'
    },
    {
      id: 'cipher',
      name: '幽灵 - Cipher',
      role: 'Specialist · 特工型',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop',
      stats: { attack: 80, defense: 55, speed: 88 },
      description: '幽灵来无影去无踪，在暗处给予敌人致命一击。'
    }
  ],

  /**
   * 初始化角色卡片交互
   */
  init() {
    this.bindCardHover();
    this.bindCardClick();
    this.initDetailModal();
  },

  /**
   * 绑定卡片悬停效果
   */
  bindCardHover() {
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  },

  /**
   * 绑定卡片点击事件
   */
  bindCardClick() {
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        // 点击缩放效果
        card.classList.add('clicked');
        setTimeout(() => {
          card.classList.remove('clicked');
        }, 150);

        // 获取角色 ID 并显示详情
        const characterId = card.dataset.character;
        if (characterId) {
          this.showCharacterDetail(characterId);
        }
      });
    });
  },

  /**
   * 初始化详情弹窗
   */
  initDetailModal() {
    // 如果弹窗已存在，绑定关闭事件
    const modal = document.getElementById('characterDetailModal');
    const closeBtn = document.getElementById('closeDetailModal');
    
    if (modal && closeBtn) {
      closeBtn.addEventListener('click', () => this.hideDetailModal());
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hideDetailModal();
        }
      });
    }
  },

  /**
   * 显示角色详情
   * @param {string} characterId - 角色 ID
   */
  showCharacterDetail(characterId) {
    const character = this.characters.find(c => c.id === characterId);
    if (!character) return;

    let modal = document.getElementById('characterDetailModal');
    
    // 如果弹窗不存在，创建它
    if (!modal) {
      modal = this.createDetailModal();
      document.body.appendChild(modal);
    }

    // 更新弹窗内容
    const img = modal.querySelector('.character-detail-img');
    const name = modal.querySelector('.character-detail-info h3');
    const roleTag = modal.querySelector('.role-tag');
    const stats = modal.querySelectorAll('.detail-stat-value');
    const desc = modal.querySelector('.character-detail-desc');

    img.src = character.image;
    img.alt = character.name;
    name.textContent = character.name;
    roleTag.textContent = character.role;
    
    const statValues = [character.stats.attack, character.stats.defense, character.stats.speed || character.stats.healing];
    stats.forEach((stat, i) => {
      stat.textContent = statValues[i];
    });
    
    // 动态更新第三个属性标签（支援型显示"治疗量"，其他显示"速度"）
    const statLabels = modal.querySelectorAll('.detail-stat-label');
    const isHealer = !!character.stats.healing;
    statLabels[2].textContent = isHealer ? '治疗量' : '速度';
    
    desc.textContent = character.description;

    // 显示弹窗
    modal.classList.add('active');
  },

  /**
   * 创建详情弹窗 DOM
   */
  createDetailModal() {
    const modal = document.createElement('div');
    modal.id = 'characterDetailModal';
    modal.className = 'character-detail-modal';
    modal.innerHTML = `
      <div class="character-detail-content">
        <div class="character-detail-header">
          <img class="character-detail-img" src="" alt="">
          <div class="character-detail-info">
            <h3></h3>
            <span class="role-tag"></span>
          </div>
        </div>
        <div class="character-detail-stats">
          <div class="detail-stat">
            <span class="detail-stat-value">0</span>
            <span class="detail-stat-label">攻击力</span>
          </div>
          <div class="detail-stat">
            <span class="detail-stat-value">0</span>
            <span class="detail-stat-label">防御力</span>
          </div>
          <div class="detail-stat">
            <span class="detail-stat-value">0</span>
            <span class="detail-stat-label">速度</span>
          </div>
        </div>
        <p class="character-detail-desc"></p>
        <button class="character-detail-close" id="closeDetailModal">关闭</button>
      </div>
    `;

    // 绑定关闭事件
    modal.querySelector('#closeDetailModal').addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    return modal;
  },

  /**
   * 隐藏详情弹窗
   */
  hideDetailModal() {
    const modal = document.getElementById('characterDetailModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }
};

/**
 * 页面导航模块
 */
const PageNavigation = {
  currentPage: 'home',

  /**
   * 初始化页面导航
   * @param {string} initialPage - 初始页面
   */
  init(initialPage = 'home') {
    this.currentPage = initialPage;
    this.bindPageNavButtons();
    this.bindCharacterCardClicks();
  },

  /**
   * 绑定顶部导航按钮
   */
  bindPageNavButtons() {
    const navBtns = document.querySelectorAll('.page-nav-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetPage = btn.dataset.page;
        this.switchPage(targetPage);
      });
    });
  },

  /**
   * 切换页面
   * @param {string} page - 目标页面 ID
   */
  switchPage(page) {
    // 更新导航按钮状态
    document.querySelectorAll('.page-nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.page === page) {
        btn.classList.add('active');
      }
    });

    // 更新页面容器显示
    document.querySelectorAll('.page-container').forEach(container => {
      container.classList.remove('active');
    });

    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // 更新标题
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
      const titles = {
        'dream-home': '攻略',
        'dream-gallery': '图鉴',
        'dream-calc': '数值',
        'dream-timer': '计时器'
      };
      pageTitle.textContent = titles[page] || '梦想与征程';
    }

    this.currentPage = page;
  },

  /**
   * 绑定角色卡片点击（首页内页面切换）
   */
  bindCharacterCardClicks() {
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        // 如果点击的是图鉴页的角色卡片，切换到图鉴页面
        if (this.currentPage !== 'dream-gallery') {
          this.switchPage('dream-gallery');
        }
        // 延迟显示详情，等待页面切换动画完成
        setTimeout(() => {
          const characterId = card.dataset.character;
          if (characterId) {
            CharacterCard.showCharacterDetail(characterId);
          }
        }, 400);
      });
    });
  }
};

/**
 * 计时器模块
 */
const Timer = {
  eventTimeLeft: 2 * 60 * 60 + 34 * 60 + 15, // 2小时34分15秒

  /**
   * 初始化计时器
   */
  init() {
    this.updateTimers();
    this.updateEventTimer();
    
    // 每秒更新
    setInterval(() => this.updateTimers(), 1000);
    setInterval(() => this.updateEventTimer(), 1000);
  },

  /**
   * 更新每日计时器
   */
  updateTimers() {
    const now = new Date();
    
    // 每日签到倒计时
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const diffSignin = tomorrow - now;
    
    const hours = Math.floor(diffSignin / (1000 * 60 * 60));
    const mins = Math.floor((diffSignin % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffSignin % (1000 * 60)) / 1000);
    
    const signinTimer = document.getElementById('timer-signin');
    if (signinTimer) {
      signinTimer.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // 体力恢复倒计时（每6分钟恢复1点体力）
    const staminaMinutes = 6;
    const totalSecsIntoDay = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const staminaSecs = (staminaMinutes * 60) - (totalSecsIntoDay % (staminaMinutes * 60));
    const staminaMins = Math.floor(staminaSecs / 60);
    const staminaSec = staminaSecs % 60;
    
    const staminaTimer = document.getElementById('timer-stamina');
    if (staminaTimer) {
      staminaTimer.textContent = `${String(staminaMins).padStart(2, '0')}:${String(staminaSec).padStart(2, '0')}`;
    }

    // 周常副本倒计时
    const weekDay = now.getDay();
    // 周一时设为7天，避免负数
    const daysUntilMonday = weekDay === 1 ? 7 : (8 - weekDay) % 7;
    const nextMonday = new Date(now);
    nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);
    nextMonday.setHours(0, 0, 0, 0);
    const diffWeekly = nextMonday - now;
    
    const weeklyDays = Math.floor(diffWeekly / (1000 * 60 * 60 * 24));
    const weeklyHours = Math.floor((diffWeekly % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const weeklyMins = Math.floor((diffWeekly % (1000 * 60 * 60)) / (1000 * 60));
    const weeklySecs = Math.floor((diffWeekly % (1000 * 60)) / 1000);
    
    const weeklyTimer = document.getElementById('timer-weekly');
    if (weeklyTimer) {
      weeklyTimer.textContent = `${weeklyDays}天 ${String(weeklyHours).padStart(2, '0')}:${String(weeklyMins).padStart(2, '0')}:${String(weeklySecs).padStart(2, '0')}`;
    }
  },

  /**
   * 更新事件计时器
   */
  updateEventTimer() {
    const hours = Math.floor(this.eventTimeLeft / (60 * 60));
    const mins = Math.floor((this.eventTimeLeft % (60 * 60)) / 60);
    const secs = this.eventTimeLeft % 60;
    
    const eventTimer = document.getElementById('timer-event');
    if (eventTimer) {
      eventTimer.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    
    if (this.eventTimeLeft > 0) {
      this.eventTimeLeft--;
    } else {
      this.eventTimeLeft = 0;
    }
  }
};

/**
 * 主入口
 */
const App = {
  /**
   * 初始化应用
   * @param {Object} options - 配置选项
   */
  init(options = {}) {
    const { page = 'home' } = options;

    // 初始化角色卡片交互
    if (document.querySelector('.character-card')) {
      CharacterCard.init();
    }

    // 初始化页面导航
    if (document.querySelector('.page-nav')) {
      PageNavigation.init(page);
    }

    // 初始化计时器
    if (document.getElementById('timer-signin')) {
      Timer.init();
    }

    // 初始化道具图鉴
    if (document.getElementById('galleryItems')) {
      ItemGallery.init();
    }
  }
};

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 检测当前页面类型
  const isDreamPage = window.location.pathname.includes('dreams');
  const initialPage = isDreamPage ? 'dream-home' : 'home';

  App.init({ page: initialPage });
});

/**
 * 道具图鉴模块
 */
const ItemGallery = {
  items: [],
  filteredItems: [],
  filters: {
    tier: '全部',
    category: '全部',
    class: '全部'
  },
  searchQuery: '',
  selectedItem: null,

  async init() {
    await this.loadCSVData();
    this.bindEvents();
    this.renderItems();
  },

  async loadCSVData() {
    try {
      // 直接用 file:// 打开页面时，浏览器通常会禁止 fetch 读取本地文件
      if (window.location.protocol === 'file:') {
        throw new Error('当前通过 file:// 打开页面，浏览器会阻止读取本地 CSV。请用本地 HTTP 服务打开（例如 VSCode Live Server）。');
      }

      const csvPath = 'item/mxyzc/掉落表.csv';
      const csvUrl = new URL(csvPath, window.location.href);
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`CSV 请求失败: ${response.status} ${response.statusText}`);
      }
      const csvText = await response.text();
      this.items = this.parseCSV(csvText);
      this.filteredItems = [...this.items];
      const itemCount = document.getElementById('itemCount');
      if (itemCount) itemCount.textContent = this.items.length;
    } catch (error) {
      console.error('加载道具数据失败:', error);
    }
  },

  parseCSV(csvText) {
    const normalized = String(csvText || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalized.split('\n').filter(l => l !== '');
    if (lines.length === 0) return [];

    // 解析 CSV 行，支持引号字段与 "" 转义
    const parseLine = (line) => {
      const out = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const ch = line[i];

        if (ch === '"') {
          // 处理 "" 作为转义的双引号
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
            continue;
          }
          inQuotes = !inQuotes;
          continue;
        }

        if (ch === ',' && !inQuotes) {
          out.push(current.trim());
          current = '';
          continue;
        }

        current += ch;
      }

      out.push(current.trim());
      return out;
    };

    const headers = parseLine(lines[0]).map(h => h.trim());
    const items = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseLine(line);

      const item = {
        name: values[0] || '',
        tier: values[1] || '',
        category: values[2] || '',
        jobClass: values[3] || '',
        source: values[4] || '',
        map: values[5] || '',
        location: values[6] || '',
        attributes: values[7] || '',
        dropRate: values[8] || '',
        craftable: values[9] || '',
        craftMaterials: values[10] || ''
      };

      items.push(item);
    }

    return items;
  },

  bindEvents() {
    const searchInput = document.getElementById('gallerySearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.applyFilters();
      });
    }

    document.querySelectorAll('.filter-buttons').forEach(group => {
      group.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterType = group.id.replace('filter-', '');
        this.filters[filterType] = btn.dataset.value;
        this.applyFilters();
      });
    });
  },

  applyFilters() {
    this.filteredItems = this.items.filter(item => {
      if (this.searchQuery && !item.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }
      if (this.filters.tier !== '全部' && item.tier !== this.filters.tier) {
        return false;
      }
      if (this.filters.category !== '全部' && !item.category.includes(this.filters.category)) {
        return false;
      }
      if (this.filters.class !== '全部' && item.jobClass !== this.filters.class) {
        return false;
      }
      return true;
    });

    const itemCount = document.getElementById('itemCount');
    if (itemCount) itemCount.textContent = this.filteredItems.length;
    this.renderItems();
  },

  getTierClass(tier) {
    const tierMap = {
      '普通': 'tier-common',
      '稀有': 'tier-rare',
      '英雄': 'tier-hero',
      '传说': 'tier-legend'
    };
    return tierMap[tier] || 'tier-common';
  },

  getCategoryIcon(category) {
    // 统一使用 Font Awesome 图标类名（fas）
    if (category.includes('武器')) return 'fa-sword';
    if (category.includes('防具')) return 'fa-shield';
    if (category.includes('材料')) return 'fa-cubes';
    return 'fa-box';
  },

  renderItems() {
    const container = document.getElementById('itemsList');
    if (!container) return;

    if (this.filteredItems.length === 0) {
      container.innerHTML = '<div class="empty-state">没有找到符合条件的道具</div>';
      return;
    }

    container.innerHTML = this.filteredItems.map((item, index) => `
      <div class="item-card ${this.selectedItem === index ? 'selected' : ''}" data-index="${index}">
        <div class="item-icon ${this.getTierClass(item.tier)}">
          <i class="fas ${this.getCategoryIcon(item.category)}" aria-hidden="true"></i>
        </div>
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.map || '未知地图'}</p>
        </div>
        <span class="item-tier-badge ${this.getTierClass(item.tier)}">${item.tier}</span>
      </div>
    `).join('');

    container.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index);
        this.selectItem(index);
      });
    });
  },

  selectItem(index) {
    // 移除之前的选中状态
    if (this.selectedItem !== null) {
      const prevCard = document.querySelector(`.item-card[data-index="${this.selectedItem}"]`);
      if (prevCard) {
        prevCard.classList.remove('selected');
      }
    }
    
    // 设置新的选中状态
    this.selectedItem = index;
    const currentCard = document.querySelector(`.item-card[data-index="${index}"]`);
    if (currentCard) {
      currentCard.classList.add('selected');
    }
    
    // 显示详情
    this.showItemDetail(this.filteredItems[index]);
  },

  showItemDetail(item) {
    const placeholder = document.querySelector('.detail-placeholder');
    const content = document.getElementById('itemDetailContent');

    if (placeholder) placeholder.style.display = 'none';
    if (content) content.style.display = 'block';

    document.getElementById('detailItemName').textContent = item.name;

    const tierEl = document.getElementById('detailItemTier');
    tierEl.textContent = item.tier;
    tierEl.className = `item-tier ${this.getTierClass(item.tier)}`;

    document.getElementById('detailCategory').textContent = item.category;
    document.getElementById('detailClass').textContent = item.jobClass;
    document.getElementById('detailCraftable').textContent = item.craftable === '是' ? '可制作' : '不可制作';
    document.getElementById('detailSource').textContent = item.source;
    document.getElementById('detailMap').textContent = item.map;
    document.getElementById('detailLocation').textContent = item.location;
    document.getElementById('detailDropRate').textContent = item.dropRate;

    const attrsContainer = document.getElementById('detailAttrs');
    if (item.attributes && item.attributes !== '无属性') {
      const attrPairs = item.attributes.split(';').map(attr => attr.trim()).filter(attr => attr);
      attrsContainer.innerHTML = attrPairs.map(attr => {
        const [name, value] = attr.split(':').map(s => s.trim());
        return `<div class="item-attr"><span class="attr-name">${name}:</span><span class="attr-value">${value}</span></div>`;
      }).join('');
    } else {
      attrsContainer.innerHTML = '<div class="item-attr no-attr">无属性</div>';
    }

    const craftSection = document.getElementById('detailCraftSection');
    const craftMaterials = document.getElementById('detailCraftMaterials');
    if (item.craftable === '是' && item.craftMaterials) {
      craftSection.style.display = 'block';
      craftMaterials.textContent = item.craftMaterials;
    } else {
      craftSection.style.display = 'none';
    }
  }
};
