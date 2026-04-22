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
      // 如果是图片元素，更新 alt 属性
      if (pageTitle.tagName === 'IMG') {
        const titles = {
          'dream-home': '攻略 - 十方汇鉴',
          'dream-gallery': '图鉴 - 十方汇鉴',
          'dream-calc': '数值 - 十方汇鉴',
          'dream-timer': '计时器 - 十方汇鉴'
        };
        pageTitle.alt = titles[page] || '梦想与征程 - 十方汇鉴';
      } else {
        // 兼容原来的文本元素
        const titles = {
          'dream-home': '攻略',
          'dream-gallery': '图鉴',
          'dream-calc': '数值',
          'dream-timer': '计时器'
        };
        pageTitle.textContent = titles[page] || '梦想与征程';
      }
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

  // 角色卡片移动逻辑 - 默认执行
  const characterSection = document.querySelector('.character-section');
  const characterTarget = document.getElementById('characterTargetSection');
  const toggleBtn = document.getElementById('characterToggleBtn');

  if (characterSection && characterTarget) {
    // 默认将角色卡片移动到目标位置
    const cardsContainer = characterSection.querySelector('.character-cards');
    if (cardsContainer) {
      characterTarget.innerHTML = '';
      const cardsClone = cardsContainer.cloneNode(true);
      characterTarget.appendChild(cardsClone);
    }

    // 如果有切换按钮，添加点击事件
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        characterTarget.style.display = characterTarget.style.display === 'none' ? 'block' : 'none';
      });
    }
  }

  // 下载按钮功能
  const downloadBtn = document.getElementById('downloadBtn');
  const downloadOptions = document.getElementById('downloadOptions');

  if (downloadBtn && downloadOptions) {
    // 点击下载按钮切换显示/隐藏选项
    downloadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if (downloadOptions.classList.contains('show')) {
        downloadOptions.classList.remove('show');
      } else {
        // 计算按钮位置 - 调整到指定位置
        downloadOptions.style.position = 'fixed';
        downloadOptions.style.top = '60px';
        downloadOptions.style.right = '34px';
        downloadOptions.classList.add('show');
      }
    });

    // 点击页面其他地方关闭选项
    document.addEventListener('click', (e) => {
      if (!downloadOptions.contains(e.target) && !downloadBtn.contains(e.target)) {
        downloadOptions.classList.remove('show');
      }
    });
  }
});

// 将ItemGallery暴露给全局
try {
  if (typeof window !== 'undefined') {
    window.ItemGallery = ItemGallery;
  }
} catch (e) {
  console.warn('无法暴露ItemGallery到全局:', e);
}

/**
 * 道具图鉴模块
 */
const ItemGallery = {
  items: [],
  filteredItems: [],
  filters: {
    tier: '全部',
    category: '全部',
    subcategory: '全部',
    class: '全部'
  },
  searchQuery: '',
  selectedItem: null,
  searchDebounceTimer: null, // 搜索防抖定时器
  keyboardNavigationIndex: -1, // 键盘导航索引

  async init() {
    this.initFileInput();
    await this.loadCSVData();
    this.bindEvents();
    this.updateFilterStats();
    this.renderItems();
  },

  initFileInput() {
    // 创建文件选择输入
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,.csv';
    fileInput.id = 'itemFileInput';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // 绑定文件选择事件
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          if (file.name.endsWith('.json')) {
            try {
              const jsonData = JSON.parse(content);
              const rawItems = jsonData.items || jsonData || [];
              // 字段名映射：将JSON中的中文字段名映射到代码中使用的英文字段名
              let mappedItems = rawItems.map(item => ({
                name: item["道具"],
                id: item["道具ID"],
                tier: item["品阶"],
                category: item["道具分类"],
                jobClass: item["适用职业"],
                source: item["掉落来源(怪物)"],
                map: item["地图"],
                attrs: item["道具属性"],
                craftMaterials: item["制作材料"],
                craftable: item["制作材料"] ? "是" : "否"
              }));
              // 去重处理：根据道具名称去重
              const uniqueItems = [];
              const itemNames = new Set();
              mappedItems.forEach(item => {
                if (!itemNames.has(item.name)) {
                  itemNames.add(item.name);
                  uniqueItems.push(item);
                }
              });
              this.items = uniqueItems;
              console.log(`[ItemGallery] 从 JSON 加载 ${this.items.length} 个道具（去重后）`);
            } catch (jsonError) {
              console.error('[ItemGallery] JSON解析失败:', jsonError);
              alert('JSON文件格式错误，请检查文件内容');
            }
          } else if (file.name.endsWith('.csv')) {
            let csvItems = this.parseCSV(content);
            // 去重处理：根据道具名称去重
            const uniqueItems = [];
            const itemNames = new Set();
            csvItems.forEach(item => {
              if (!itemNames.has(item.name)) {
                itemNames.add(item.name);
                uniqueItems.push(item);
              }
            });
            this.items = uniqueItems;
          }
          this.filteredItems = [...this.items];
          this.updateItemCount();
          this.renderItems();
        };
        reader.readAsText(file);
      } catch (error) {
        console.error('[ItemGallery] 读取文件失败:', error);
        alert('文件读取失败，请重试');
      }
    });
  },

  selectFile() {
    const fileInput = document.getElementById('itemFileInput');
    if (fileInput) {
      fileInput.click();
    }
  },

  async loadCSVData() {
    try {
      // 加载 item_data.json 格式数据
      const jsonPath = 'item/mxyzc/item_data.json';
      const jsonUrl = new URL(jsonPath, window.location.href);
      const jsonResponse = await fetch(jsonUrl);

      if (jsonResponse.ok) {
        const jsonData = await jsonResponse.json();
        const rawItems = jsonData.items || jsonData || [];
        // 字段名映射：将JSON中的中文字段名映射到代码中使用的英文字段名
        let mappedItems = rawItems.map(item => ({
          name: item["道具"],
          id: item["道具ID"],
          tier: item["道具品阶"],
          category: item["道具分类"],
          subCategory: item["装备部位"] || "",
          jobClass: item["道具职业适用"],
          source: item["道具来源(怪物)"],
          map: item["地图"],
          attrs: item["道具属性"] || "",
          craftMaterials: item["制作所需材料"] || "",
          craftable: item["是否可制作"] === '是' ? '是' : '否'
        }));
        // 去重处理：根据道具名称去重
        const uniqueItems = [];
        const itemNames = new Set();
        mappedItems.forEach(item => {
          if (!itemNames.has(item.name)) {
            itemNames.add(item.name);
            uniqueItems.push(item);
          }
        });
        this.items = uniqueItems;
        console.log(`[ItemGallery] 从 JSON 加载 ${this.items.length} 个道具（去重后）`);
      } else {
        // 回退到 CSV 格式
        console.log('[ItemGallery] JSON 文件不存在，尝试加载 CSV...');
        const csvPath = 'item/mxyzc/掉落表.csv';
        const csvUrl = new URL(csvPath, window.location.href);
        const csvResponse = await fetch(csvUrl);
        if (!csvResponse.ok) {
          throw new Error(`文件请求失败: ${csvResponse.status}`);
        }
        const csvText = await csvResponse.text();
        let csvItems = this.parseCSV(csvText);
        // 去重处理：根据道具名称去重
        const uniqueItems = [];
        const itemNames = new Set();
        csvItems.forEach(item => {
          if (!itemNames.has(item.name)) {
            itemNames.add(item.name);
            uniqueItems.push(item);
          }
        });
        this.items = uniqueItems;
      }

      this.filteredItems = [...this.items];
      this.updateItemCount();
    } catch (error) {
      console.error('[ItemGallery] 加载道具数据失败:', error);
      // 显示友好错误提示
      const container = document.getElementById('itemsList');
      if (container) {
        container.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-exclamation-triangle"></i>
            <p>数据加载失败</p>
            <small>${error.message}</small>
            <button class="file-select-btn" onclick="itemGallery.selectFile()">
              <i class="fas fa-file-upload"></i>
              选择文件
            </button>
          </div>
        `;
      }
    }
  },

  /**
   * 解析 CSV - 自动检测分隔符（Tab 或逗号）
   * 忽略：道具ID、道具英文名称、怪物ID、怪物英文名称
   */
  parseCSV(csvText) {
    const normalized = String(csvText || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalized.split('\n').filter(l => l !== '');
    if (lines.length === 0) return [];

    // 自动检测分隔符：计算第一行中 Tab 和逗号的数量
    const firstLine = lines[0];
    const tabCount = (firstLine.match(/\t/g) || []).length;
    const commaCount = (firstLine.match(/,/g) || []).length;
    const separator = tabCount >= commaCount ? '\t' : ',';

    console.log(`[ItemGallery] 检测到分隔符: ${separator === '\t' ? 'Tab' : '逗号'}`);

    // 解析行
    const parseLine = (line) => {
      const out = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const ch = line[i];

        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
            continue;
          }
          inQuotes = !inQuotes;
          continue;
        }

        if (ch === separator && !inQuotes) {
          out.push(current.trim());
          current = '';
          continue;
        }

        current += ch;
      }

      out.push(current.trim());
      return out;
    };

    const items = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseLine(line);

      // 根据分隔符确定字段位置
      // Tab 分隔时：0-道具, 1-ID, 2-英文名, 3-品阶, 4-分类, 5-职业, 6-怪物, 7-怪物ID, 8-怪物英文, 9-地图, 10-属性, 11-材料
      // 逗号分隔时：同样顺序
      let name, tier, category, jobClass, source, map, attributes, craftMaterials;

      if (separator === '\t') {
        // Tab 分隔
        name = values[0] || '';
        tier = values[3] || '';
        category = values[4] || '';
        jobClass = values[5] || '';
        source = values[6] || '';
        map = values[9] || '';
        attributes = values[10] || '';
        craftMaterials = values[11] || '';
      } else {
        // 逗号分隔
        name = values[0] || '';
        tier = values[3] || '';
        category = values[4] || '';
        jobClass = values[5] || '';
        source = values[6] || '';
        map = values[9] || '';
        attributes = values[10] || '';
        craftMaterials = values[11] || '';
      }

      // 清理字段 - 移除换行、回车等特殊字符
      const clean = (str) => String(str || '').replace(/[\n\r\t]/g, '').trim();

      // 跳过无效数据（道具名为空或全英文）
      if (!name || /^[A-Za-z0-9_]+$/.test(name)) {
        continue;
      }

      const item = {
        name: clean(name),
        tier: clean(tier),
        category: clean(category),
        jobClass: clean(jobClass),
        source: clean(source),
        map: clean(map),
        attributes: clean(attributes),
        craftMaterials: clean(craftMaterials),
        craftable: craftMaterials ? '是' : '否'
      };

      items.push(item);
    }

    console.log(`[ItemGallery] 成功解析 ${items.length} 个道具`);
    return items;
  },

  bindEvents() {
    // 搜索框 - 带防抖优化
    const searchInput = document.getElementById('gallerySearchInput');
    if (searchInput) {
      // 输入事件（防抖 200ms）
      searchInput.addEventListener('input', (e) => {
        clearTimeout(this.searchDebounceTimer);
        this.searchDebounceTimer = setTimeout(() => {
          this.searchQuery = e.target.value.trim();
          this.applyFilters();
        }, 200);
      });

      // 回车键：直接定位到第一个结果
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          clearTimeout(this.searchDebounceTimer);
          this.searchQuery = e.target.value.trim();
          this.applyFilters();
          if (this.filteredItems.length > 0) {
            this.selectItem(0);
            this.scrollToSelected();
          }
        }
        // Escape：清空搜索
        if (e.key === 'Escape') {
          searchInput.value = '';
          this.searchQuery = '';
          this.applyFilters();
        }
        // 上/下箭头：键盘导航
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          this.handleKeyboardNavigation(e.key === 'ArrowDown' ? 1 : -1);
        }
      });

      // 聚焦时显示搜索提示
      searchInput.addEventListener('focus', () => {
        searchInput.placeholder = '输入道具名称后按 Enter 搜索...';
      });
      searchInput.addEventListener('blur', () => {
        searchInput.placeholder = '搜索道具名称...';
      });
    }

    // 筛选按钮组
    document.querySelectorAll('.filter-buttons').forEach(group => {
      group.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        // 更新激活状态
        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterType = group.id.replace('filter-', '');
        this.filters[filterType] = btn.dataset.value;
        this.applyFilters();
      });
    });

    // 双击清空所有筛选
    document.querySelector('.gallery-filters')?.addEventListener('dblclick', () => {
      this.resetFilters();
    });
  },

  /**
   * 处理键盘导航
   */
  handleKeyboardNavigation(direction) {
    if (this.filteredItems.length === 0) return;

    this.keyboardNavigationIndex += direction;

    // 边界处理
    if (this.keyboardNavigationIndex < 0) {
      this.keyboardNavigationIndex = 0;
    }
    if (this.keyboardNavigationIndex >= this.filteredItems.length) {
      this.keyboardNavigationIndex = this.filteredItems.length - 1;
    }

    this.selectItem(this.keyboardNavigationIndex);
    this.scrollToSelected();
  },

  /**
   * 滚动到选中项
   */
  scrollToSelected() {
    const container = document.getElementById('itemsList');
    const selectedCard = container?.querySelector('.item-card.selected');
    if (selectedCard) {
      selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  /**
   * 重置所有筛选
   */
  resetFilters() {
    // 清空搜索
    const searchInput = document.getElementById('gallerySearchInput');
    if (searchInput) {
      searchInput.value = '';
    }
    this.searchQuery = '';

    // 重置筛选按钮
    document.querySelectorAll('.filter-buttons').forEach(group => {
      group.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === '全部');
      });
    });

    this.filters = { tier: '全部', category: '全部', subcategory: '全部', class: '全部' };
    this.applyFilters();
  },

  applyFilters() {
    const query = this.searchQuery.toLowerCase();

    this.filteredItems = this.items.filter(item => {
      // 搜索匹配（支持中文）
      if (query && !item.name.includes(query) && !item.source.includes(query) && !item.map.includes(query)) {
        return false;
      }
      // 品阶筛选
      if (this.filters.tier !== '全部' && !item.tier.includes(this.filters.tier)) {
        return false;
      }
      // 分类筛选
      if (this.filters.category !== '全部' && !item.category.includes(this.filters.category)) {
        return false;
      }
      // 二级分类筛选
      if (this.filters.subcategory !== '全部' && (!item.subCategory || !item.subCategory.includes(this.filters.subcategory))) {
        return false;
      }
      // 职业筛选（支持多职业）
      if (this.filters.class !== '全部') {
        const selectedClass = this.filters.class;
        // 检查职业是否包含在道具的适用职业中
        const jobClasses = item.jobClass.split(/[\/\s,]+/).filter(c => c);
        // 全职业道具始终显示不过滤
        const isAllClass = jobClasses.some(job => job.includes('全职业'));
        if (!isAllClass && !jobClasses.some(job => selectedClass.includes(job) || job.includes(selectedClass))) {
          return false;
        }
      }
      return true;
    });

    // 重置键盘导航索引
    this.keyboardNavigationIndex = -1;

    this.updateItemCount();
    this.updateFilterStats();
    this.renderItems();
  },

  /**
   * 更新道具计数
   */
  updateItemCount() {
    const itemCount = document.getElementById('itemCount');
    if (itemCount) {
      itemCount.textContent = this.filteredItems.length;
    }
  },

  /**
   * 更新筛选统计信息
   */
  updateFilterStats() {
    const stats = document.querySelector('.gallery-stats');
    if (!stats) return;

    const counts = {
      total: this.items.length,
      filtered: this.filteredItems.length,
      tiers: {},
      categories: {},
      classes: {}
    };

    // 转义 CSS 选择器特殊字符 - 完全重写
    const escapeCSS = (str) => {
      if (!str || typeof str !== 'string') return '';
      // 只保留字母、数字、中文和常见符号
      const cleaned = str.replace(/[^a-zA-Z0-9\u4e00-\u9fa5\/\\,+()（）【】「」『』\s-]/g, '').trim();
      if (!cleaned) return '';
      // 双重转义引号
      return cleaned.replace(/"/g, '\\"');
    };

    // 统计各筛选条件的数量
    this.items.forEach(item => {
      const tier = item.tier;
      const cat = item.category;
      const cls = item.jobClass;
      if (tier && tier.length > 0 && tier !== '品阶') counts.tiers[tier] = (counts.tiers[tier] || 0) + 1;
      if (cat && cat.length > 0 && cat !== '道具分类') counts.categories[cat] = (counts.categories[cat] || 0) + 1;
      if (cls && cls.length > 0 && cls !== '适用职业' && cls !== '职业') counts.classes[cls] = (counts.classes[cls] || 0) + 1;
    });

    // 更新筛选按钮显示数量
    Object.entries(counts.tiers).forEach(([tier, count]) => {
      const escaped = escapeCSS(tier);
      if (!escaped) return;
      const btn = document.querySelector(`#filter-tier [data-value="${escaped}"]`);
      if (btn) btn.dataset.count = count;
    });

    Object.entries(counts.categories).forEach(([cat, count]) => {
      const escaped = escapeCSS(cat);
      if (!escaped) return;
      const btn = document.querySelector(`#filter-category [data-value="${escaped}"]`);
      if (btn) btn.dataset.count = count;
    });

    Object.entries(counts.classes).forEach(([cls, count]) => {
      const escaped = escapeCSS(cls);
      if (!escaped) return;
      try {
        const btn = document.querySelector(`#filter-class [data-value="${escaped}"]`);
        if (btn) btn.dataset.count = count;
      } catch (e) {
        console.warn('[ItemGallery] 选择器错误:', escaped, e.message);
      }
    });
  },

  getTierClass(tier) {
    const tierMap = {
      '普通(白)': 'tier-common',
      '优秀(绿)': 'tier-rare',
      '精良(蓝)': 'tier-uncommon',
      '英雄(红)': 'tier-hero',
      '传说(紫)': 'tier-legend',
      '神话(金)': 'tier-mythic'
    };
    return tierMap[tier] || 'tier-common';
  },

  getCategoryIcon(category) {
    if (category.includes('武器')) return 'fa-sword';
    if (category.includes('防具')) return 'fa-shield';
    if (category.includes('材料')) return 'fa-cubes';
    return 'fa-box';
  },

  renderItems() {
    const container = document.getElementById('itemsList');
    if (!container) return;

    if (this.filteredItems.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-search" aria-hidden="true"></i>
          <p>没有找到符合条件的道具</p>
          <button class="reset-btn" onclick="ItemGallery.resetFilters()">重置筛选</button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.filteredItems.map((item, index) => `
      <div class="item-card ${this.selectedItem === index ? 'selected' : ''}" 
           data-index="${index}" 
           tabindex="0"
           title="${item.name}">
        <div class="item-icon ${this.getTierClass(item.tier)}">
          <i class="fas ${this.getCategoryIcon(item.category)}" aria-hidden="true"></i>
        </div>
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.category || '未知分类'}</p>
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

    // 显示详情（只显示中文内容）
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
    
    // 显示装备部位
    const subCategoryRow = document.getElementById('detailSubCategoryRow');
    const subCategoryEl = document.getElementById('detailSubCategory');
    if (item.subCategory && item.subCategory.trim()) {
      subCategoryEl.textContent = item.subCategory;
      subCategoryRow.style.display = 'flex';
    } else {
      subCategoryRow.style.display = 'none';
    }
    
    document.getElementById('detailClass').textContent = item.jobClass;
    document.getElementById('detailCraftable').textContent = item.craftable === '是' ? '可制作' : '不可制作';
    document.getElementById('detailSource').textContent = item.source;
    document.getElementById('detailMap').textContent = item.map;

    const attrsContainer = document.getElementById('detailAttrs');
    if (item.attributes && item.attributes !== '无属性' && item.attributes.trim()) {
      const attrPairs = item.attributes.split(';').map(attr => attr.trim()).filter(attr => attr);
      attrsContainer.innerHTML = attrPairs.map(attr => {
        const [name, value] = attr.split(':').map(s => s.trim());
        if (name && value) {
          return `<div class="item-attr"><span class="attr-name">${name}:</span><span class="attr-value">${value}</span></div>`;
        }
        return `<div class="item-attr"><span class="attr-value">${attr}</span></div>`;
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
