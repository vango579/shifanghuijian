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
  customTimers: [], // 自定义计时器列表
  presets: [], // 预设列表
  intervalId: null, // 计时器间隔ID
  fixedTimers: {}, // 固定计时器 { id: { remaining: 秒数, running: boolean } }
  fixedTimerInterval: null, // 固定计时器专用间隔ID
  FIXED_TIMER_DURATION: 3600, // 1小时 = 3600秒

  /**
   * 初始化计时器
   */
  init() {
    this.initFixedTimers();
    this.updateTimers();
    this.loadPresets();
    this.renderPresets();
    this.loadCustomTimers();
    this.initCustomTimerUI();
    
    // 高精度计时器更新（不含固定计时器）
    this.startHighResEngine();
    
    // 启动固定计时器专用1秒间隔
    this.startFixedTimerEngine();
  },

  /**
   * 初始化固定计时器
   */
  initFixedTimers() {
    const timerIds = ['3fxima', '3makur', '3fkasis', '3fbatu', '4fxima', '4makur', '4fkasis', '4fbatu', '4fodua', 'killer'];
    const savedTimers = JSON.parse(localStorage.getItem('fixedTimers') || '{}');
    
    timerIds.forEach(id => {
      if (savedTimers[id]) {
        this.fixedTimers[id] = savedTimers[id];
      } else {
        this.fixedTimers[id] = {
          remaining: this.FIXED_TIMER_DURATION,
          running: false
        };
      }
    });
    
    this.updateFixedTimersDisplay();
    this.updateAllStartButtons();
    
    // 绑定重置全部按钮事件
    const resetAllBtn = document.getElementById('resetAllFixedTimers');
    if (resetAllBtn) {
      resetAllBtn.onclick = () => this.resetAllFixedTimers();
    }
    
    // 绑定每个卡片的按钮事件
    document.querySelectorAll('.fixed-timer-card').forEach(card => {
      const timerId = card.dataset.timer;
      const startBtn = card.querySelector('.start-btn');
      const resetBtn = card.querySelector('.reset-btn');
      
      if (startBtn) {
        startBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleFixedTimer(timerId);
        });
      }
      
      if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.resetFixedTimer(timerId);
        });
      }
    });
  },

  /**
   * 启动固定计时器引擎（1秒间隔）
   */
  startFixedTimerEngine() {
    if (this.fixedTimerInterval) {
      clearInterval(this.fixedTimerInterval);
    }
    this.fixedTimerInterval = setInterval(() => {
      this.tickFixedTimers();
    }, 1000);
  },

  /**
   * 每秒更新固定计时器
   */
  tickFixedTimers() {
    let hasChanges = false;
    Object.keys(this.fixedTimers).forEach(id => {
      const timer = this.fixedTimers[id];
      if (timer.running && timer.remaining > 0) {
        timer.remaining--;
        this.updateFixedTimerDisplay(id);
        hasChanges = true;
      }
    });
    if (hasChanges) {
      this.saveFixedTimers();
    }
  },

  /**
   * 切换固定计时器开始/暂停
   */
  toggleFixedTimer(id) {
    if (this.fixedTimers[id]) {
      this.fixedTimers[id].running = !this.fixedTimers[id].running;
      this.updateStartButton(id);
      this.saveFixedTimers();
    }
  },

  /**
   * 更新单个开始按钮状态
   */
  updateStartButton(id) {
    const timer = this.fixedTimers[id];
    if (!timer) return;
    
    const card = document.querySelector(`[data-timer="${id}"]`);
    if (card) {
      const btn = card.querySelector('.start-btn');
      if (btn) {
        btn.textContent = timer.running ? '暂停' : '开始';
        btn.classList.toggle('running', timer.running);
      }
    }
  },

  /**
   * 更新所有开始按钮状态
   */
  updateAllStartButtons() {
    Object.keys(this.fixedTimers).forEach(id => {
      this.updateStartButton(id);
    });
  },

  /**
   * 更新单个固定计时器显示
   */
  updateFixedTimerDisplay(id) {
    const timer = this.fixedTimers[id];
    if (!timer) return;
    
    const card = document.querySelector(`[data-timer="${id}"]`);
    if (card) {
      const display = card.querySelector('.fixed-timer-display');
      if (display) {
        const hours = Math.floor(timer.remaining / 3600);
        const mins = Math.floor((timer.remaining % 3600) / 60);
        const secs = timer.remaining % 60;
        display.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        
        if (timer.remaining === 0) {
          display.classList.add('timer-ended');
          timer.running = false;
          this.updateStartButton(id);
        } else {
          display.classList.remove('timer-ended');
        }
      }
    }
  },

  /**
   * 更新所有固定计时器显示
   */
  updateFixedTimersDisplay() {
    Object.keys(this.fixedTimers).forEach(id => {
      this.updateFixedTimerDisplay(id);
    });
  },

  /**
   * 重置单个固定计时器
   */
  resetFixedTimer(id) {
    if (this.fixedTimers[id]) {
      this.fixedTimers[id].remaining = this.FIXED_TIMER_DURATION;
      this.fixedTimers[id].running = false;
      this.updateFixedTimerDisplay(id);
      this.updateStartButton(id);
      this.saveFixedTimers();
    }
  },

  /**
   * 重置所有固定计时器
   */
  resetAllFixedTimers() {
    Object.keys(this.fixedTimers).forEach(id => {
      this.fixedTimers[id].remaining = this.FIXED_TIMER_DURATION;
      this.fixedTimers[id].running = false;
      this.updateFixedTimerDisplay(id);
      this.updateStartButton(id);
    });
    this.saveFixedTimers();
  },

  /**
   * 保存固定计时器到localStorage
   */
  saveFixedTimers() {
    localStorage.setItem('fixedTimers', JSON.stringify(this.fixedTimers));
  },

  /**
   * 启动高精度计时引擎（用于自定义计时器）
   */
  startHighResEngine() {
    if (this.intervalId) cancelAnimationFrame(this.intervalId);
    
    const update = () => {
      this.updateTimers();
      this.updateCustomTimers();
      this.intervalId = requestAnimationFrame(update);
    };
    this.intervalId = requestAnimationFrame(update);
  },

  /**
   * 更新每日计时器
   */
  updateTimers() {
    // 内置计时器已移除
  },

  /**
   * 重置所有固定计时器
   */
  resetAllFixedTimers() {
    Object.keys(this.fixedTimers).forEach(id => {
      this.fixedTimers[id].remaining = this.FIXED_TIMER_DURATION;
      this.fixedTimers[id].running = false;
      this.updateFixedTimerDisplay(id);
      this.updateStartButton(id);
    });
    this.saveFixedTimers();
  },

  /**
   * 保存固定计时器到localStorage
   */
  saveFixedTimers() {
    localStorage.setItem('fixedTimers', JSON.stringify(this.fixedTimers));
  },

  /**
   * 启动高精度计时引擎（用于自定义计时器）
   */
  startHighResEngine() {
    if (this.intervalId) cancelAnimationFrame(this.intervalId);
    
    const update = () => {
      this.updateTimers();
      this.updateCustomTimers();
      this.intervalId = requestAnimationFrame(update);
    };
    this.intervalId = requestAnimationFrame(update);
  },

  /**
   * 更新每日计时器
   */
  updateTimers() {
    // 内置计时器已移除
  },

  /**
   * 初始化自定义计时器UI
   */
  initCustomTimerUI() {
    const addBtn = document.getElementById('addTimerBtn');
    const modal = document.getElementById('timerModal');
    const closeBtn = document.getElementById('timerModalClose');
    const cancelBtn = document.getElementById('timerBtnCancel');
    const confirmBtn = document.getElementById('timerBtnConfirm');
    const savePresetBtn = document.getElementById('timerBtnSavePreset');

    if (!addBtn || !modal) return;

    // 添加按钮点击
    addBtn.addEventListener('click', () => {
      modal.classList.add('show');
      this.resetForm();
    });

    // 关闭弹窗
    const closeModal = () => modal.classList.remove('show');
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // 确认添加
    confirmBtn?.addEventListener('click', () => {
      this.addCustomTimer();
      closeModal();
    });

    // 保存预设
    savePresetBtn?.addEventListener('click', () => {
      this.saveAsPreset();
    });

    // 计时模式切换
    document.querySelectorAll('input[name="timerMode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        document.querySelectorAll('.timer-mode-option').forEach(opt => opt.classList.remove('active'));
        e.target.closest('.timer-mode-option').classList.add('active');
        
        const countdownOptions = document.getElementById('countdownOptions');
        if (countdownOptions) {
          countdownOptions.style.display = e.target.value === 'down' ? 'block' : 'none';
        }
      });
    });

    // 快速设置按钮
    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mins = parseInt(btn.dataset.mins);
        document.getElementById('timerMinutes').value = mins;
        document.getElementById('timerSeconds').value = '0';
      });
    });
  },

  /**
   * 重置表单
   */
  resetForm() {
    document.getElementById('timerName').value = '';
    document.getElementById('timerHours').value = '';
    document.getElementById('timerMinutes').value = '';
    document.getElementById('timerSeconds').value = '';
    document.getElementById('timerBgColor').value = '#2a2235';
    document.getElementById('timerBorderColor').value = '#735186';
    document.getElementById('timerTextColor').value = '#e9c0fd';
    document.getElementById('timerEndColor').value = '#e74c3c';
    
    // 重置模式为倒计时
    document.querySelectorAll('input[name="timerMode"]').forEach((radio, i) => {
      radio.checked = i === 0;
    });
    document.querySelectorAll('.timer-mode-option').forEach((opt, i) => {
      opt.classList.toggle('active', i === 0);
    });
  },

  /**
   * 添加自定义计时器
   */
  addCustomTimer(presetData = null) {
    const name = presetData?.name || document.getElementById('timerName').value.trim();
    const mode = presetData?.mode || document.querySelector('input[name="timerMode"]:checked').value;
    const hours = parseInt(presetData?.hours || document.getElementById('timerHours').value) || 0;
    const minutes = parseInt(presetData?.minutes || document.getElementById('timerMinutes').value) || 0;
    const seconds = parseInt(presetData?.seconds || document.getElementById('timerSeconds').value) || 0;
    const bgColor = presetData?.bgColor || document.getElementById('timerBgColor').value;
    const borderColor = presetData?.borderColor || document.getElementById('timerBorderColor').value;
    const textColor = presetData?.textColor || document.getElementById('timerTextColor').value;
    const endColor = presetData?.endColor || document.getElementById('timerEndColor').value;

    if (!name) {
      alert('请输入计时器名称');
      return;
    }

    const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (mode === 'down' && totalMs <= 0) {
      alert('倒计时模式请输入时间！');
      return;
    }

    const timer = {
      id: Date.now() + Math.random(),
      name: name,
      mode: mode,
      original: totalMs,
      remaining: mode === 'down' ? totalMs : 0,
      isRunning: true,
      lastTick: Date.now(),
      hasFlashed: false,
      colors: {
        bg: bgColor,
        border: borderColor,
        text: textColor,
        end: endColor
      }
    };

    this.customTimers.push(timer);
    this.saveCustomTimers();
    this.renderCustomTimer(timer);
    
    // 清空表单（仅在非预设添加时）
    if (!presetData) {
      document.getElementById('timerName').value = '';
      document.getElementById('timerHours').value = '';
      document.getElementById('timerMinutes').value = '';
      document.getElementById('timerSeconds').value = '';
    }
  },

  /**
   * 保存为预设
   */
  saveAsPreset() {
    const name = document.getElementById('timerName').value.trim() || '自定义预设';
    const mode = document.querySelector('input[name="timerMode"]:checked').value;
    const hours = parseInt(document.getElementById('timerHours').value) || 0;
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    const bgColor = document.getElementById('timerBgColor').value;
    const borderColor = document.getElementById('timerBorderColor').value;
    const textColor = document.getElementById('timerTextColor').value;
    const endColor = document.getElementById('timerEndColor').value;

    this.presets.push({
      id: Date.now(),
      name: name,
      mode: mode,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      bgColor: bgColor,
      borderColor: borderColor,
      textColor: textColor,
      endColor: endColor
    });

    this.savePresets();
    this.renderPresets();
    alert('预设已保存！');
  },

  /**
   * 渲染预设标签
   */
  renderPresets() {
    const container = document.getElementById('timerPresets');
    if (!container) return;
    
    container.innerHTML = '';
    this.presets.forEach(p => {
      const tag = document.createElement('div');
      tag.className = 'preset-tag';
      tag.innerHTML = `
        <span class="preset-name">${this.escapeHtml(p.name)}</span>
        <span class="preset-del" data-id="${p.id}">✖</span>
      `;
      
      tag.querySelector('.preset-name').addEventListener('click', () => {
        this.addCustomTimer(p);
      });
      
      tag.querySelector('.preset-del').addEventListener('click', (e) => {
        e.stopPropagation();
        this.deletePreset(p.id);
      });
      
      container.appendChild(tag);
    });
  },

  /**
   * 删除预设
   */
  deletePreset(id) {
    this.presets = this.presets.filter(p => p.id !== id);
    this.savePresets();
    this.renderPresets();
  },

  /**
   * 渲染单个自定义计时器
   */
  renderCustomTimer(timer) {
    const list = document.getElementById('customTimersList');
    if (!list) return;

    let card = document.getElementById(`custom-timer-${timer.id}`);
    
    // 如果卡片已存在，更新按钮状态即可
    if (card) {
      const toggleBtn = card.querySelector('.timer-btn-toggle');
      if (toggleBtn) {
        toggleBtn.innerHTML = `<i class="fas ${timer.isRunning ? 'fa-pause' : 'fa-play'}"></i>`;
        toggleBtn.title = timer.isRunning ? '暂停' : '开始';
      }
      this.applyTimerStyle(timer);
      return;
    }

    // 创建新卡片
    card = document.createElement('div');
    card.className = 'custom-timer-card';
    card.id = `custom-timer-${timer.id}`;
    card.style.setProperty('--timer-bg', timer.colors.bg);
    card.style.setProperty('--timer-border', timer.colors.border);
    card.style.setProperty('--timer-text', timer.colors.text);
    card.style.setProperty('--timer-end', timer.colors.end);
    
    card.innerHTML = `
      <div class="timer-info">
        <h4>${this.escapeHtml(timer.name)} ${timer.mode === 'up' ? '⏱️' : ''}</h4>
        <p class="timer-mode-label">${timer.mode === 'down' ? '倒计时' : '正计时'}</p>
      </div>
      <div class="custom-timer-display" id="display-${timer.id}">--:--:--</div>
      <div class="custom-timer-btns">
        <button class="timer-btn-toggle" data-id="${timer.id}" title="${timer.isRunning ? '暂停' : '开始'}">
          <i class="fas ${timer.isRunning ? 'fa-pause' : 'fa-play'}"></i>
        </button>
        <button class="timer-btn-reset" data-id="${timer.id}" title="重置">
          <i class="fas fa-redo"></i>
        </button>
        <button class="timer-btn-delete" data-id="${timer.id}" title="删除">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    list.appendChild(card);

    // 按钮事件
    card.querySelector('.timer-btn-toggle').addEventListener('click', () => {
      this.toggleTimer(timer.id);
    });
    
    card.querySelector('.timer-btn-reset').addEventListener('click', () => {
      this.resetTimer(timer.id);
    });
    
    card.querySelector('.timer-btn-delete').addEventListener('click', () => {
      this.deleteCustomTimer(timer.id);
    });

    // 应用初始样式
    this.applyTimerStyle(timer);
    
    // 立即更新
    this.updateSingleCustomTimer(timer);
  },

  /**
   * 应用计时器样式
   */
  applyTimerStyle(timer) {
    const card = document.getElementById(`custom-timer-${timer.id}`);
    const display = document.getElementById(`display-${timer.id}`);
    if (!card || !display) return;

    const isEnded = timer.mode === 'down' && timer.remaining <= 0;
    const color = isEnded ? timer.colors.end : timer.colors.text;
    const bgColor = isEnded ? timer.colors.end : timer.colors.bg;
    const borderColor = isEnded ? timer.colors.end : timer.colors.border;

    display.style.color = color;
    card.style.backgroundColor = bgColor;
    card.style.borderColor = borderColor;
  },

  /**
   * 格式化时间
   */
  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  },

  /**
   * 更新单个自定义计时器
   */
  updateSingleCustomTimer(timer) {
    const display = document.getElementById(`display-${timer.id}`);
    const card = document.getElementById(`custom-timer-${timer.id}`);
    if (!display || !card) return;

    if (timer.isRunning) {
      const now = Date.now();
      const elapsed = now - (timer.lastTick || now);
      timer.lastTick = now;

      if (timer.mode === 'down') {
        timer.remaining -= elapsed;
        if (timer.remaining < 0) timer.remaining = 0;
      } else {
        timer.remaining += elapsed;
      }
    }

    // 更新显示
    display.textContent = this.formatTime(timer.remaining);

    // 应用样式
    this.applyTimerStyle(timer);

    // 结束效果
    if (timer.mode === 'down' && timer.remaining <= 0 && !timer.hasFlashed) {
      timer.hasFlashed = true;
      card.classList.add('flash-anim');
      
      // 尝试播放提示音
      this.playAlertSound();
    }
  },

  /**
   * 播放提示音
   */
  playAlertSound() {
    try {
      const audio = new Audio();
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQYAKI/R7LyAQBU1lMzqv4NNGzWNzea8hE0cO5HN6byFTx89lc3pvIZRJD+Szei8h1MnQZDM6L2IVylFkMzovYlYK0aRzOe9iVkuSZLM572KWi9LksznvYpaL0yTzOe9ilswT5PN572LWzFQk83nvYtcMlGTzee9i10zUpPN572LXjNTlM3nvYteNFSVzea9i180VZbN5r2LYDhWl83mvcx';
      audio.play().catch(() => {});
    } catch (e) {}
  },

  /**
   * 切换计时器运行状态
   */
  toggleTimer(id) {
    const timer = this.customTimers.find(t => t.id === id);
    if (!timer) return;
    
    timer.isRunning = !timer.isRunning;
    if (timer.isRunning) {
      timer.lastTick = Date.now();
    }
    
    this.saveCustomTimers();
    this.renderCustomTimer(timer);
  },

  /**
   * 重置计时器
   */
  resetTimer(id) {
    const timer = this.customTimers.find(t => t.id === id);
    if (!timer) return;
    
    timer.remaining = timer.mode === 'down' ? timer.original : 0;
    timer.isRunning = false;
    timer.lastTick = Date.now();
    timer.hasFlashed = false;
    
    this.saveCustomTimers();
    this.updateSingleCustomTimer(timer);
    
    // 更新按钮状态
    const card = document.getElementById(`custom-timer-${id}`);
    if (card) {
      const toggleBtn = card.querySelector('.timer-btn-toggle');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
        toggleBtn.title = '开始';
      }
      card.classList.remove('flash-anim');
    }
  },

  /**
   * 更新所有自定义计时器
   */
  updateCustomTimers() {
    this.customTimers.forEach(timer => this.updateSingleCustomTimer(timer));
    
    // 每秒保存一次
    this.saveCustomTimers();
  },

  /**
   * 删除自定义计时器
   */
  deleteCustomTimer(id) {
    this.customTimers = this.customTimers.filter(t => t.id !== id);
    this.saveCustomTimers();
    const card = document.getElementById(`custom-timer-${id}`);
    if (card) card.remove();
  },

  /**
   * 保存自定义计时器到localStorage
   */
  saveCustomTimers() {
    try {
      localStorage.setItem('customTimers', JSON.stringify(this.customTimers));
    } catch (e) {
      console.warn('无法保存计时器数据:', e);
    }
  },

  /**
   * 从localStorage加载自定义计时器
   */
  loadCustomTimers() {
    try {
      const saved = localStorage.getItem('customTimers');
      if (saved) {
        this.customTimers = JSON.parse(saved);
        const now = Date.now();
        
        // 恢复计时器状态
        this.customTimers.forEach(t => {
          if (t.hasFlashed === undefined) t.hasFlashed = false;
          
          if (t.isRunning) {
            const elapsedMs = now - t.lastTick;
            if (t.mode === 'down') {
              t.remaining -= elapsedMs;
              if (t.remaining < 0) t.remaining = 0;
            } else {
              t.remaining += elapsedMs;
            }
            t.lastTick = now;
          }
        });
        
        // 渲染已保存的计时器
        this.customTimers.forEach(timer => this.renderCustomTimer(timer));
      }
    } catch (e) {
      console.warn('无法加载计时器数据:', e);
    }
  },

  /**
   * 保存预设
   */
  savePresets() {
    try {
      localStorage.setItem('timerPresets', JSON.stringify(this.presets));
    } catch (e) {
      console.warn('无法保存预设数据:', e);
    }
  },

  /**
   * 加载预设
   */
  loadPresets() {
    try {
      const saved = localStorage.getItem('timerPresets');
      if (saved) {
        this.presets = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('无法加载预设数据:', e);
    }
  },

  /**
   * HTML转义
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
    Timer.init();

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
        // 获取按钮位置，让下拉菜单紧贴按钮下方
        const btnRect = downloadBtn.getBoundingClientRect();
        if (btnRect) {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
          
          // 设置下拉菜单位置（相对于视口）
          downloadOptions.style.position = 'absolute';
          downloadOptions.style.top = (btnRect.bottom - scrollTop + 8) + 'px';
          downloadOptions.style.left = (btnRect.left - scrollLeft) + 'px';
          downloadOptions.style.width = btnRect.width + 'px';
          downloadOptions.style.right = 'auto';
          downloadOptions.classList.add('show');
        }
      }
    });

    // 点击页面其他地方关闭选项
    document.addEventListener('click', (e) => {
      if (downloadOptions && downloadBtn && !downloadOptions.contains(e.target) && !downloadBtn.contains(e.target)) {
        downloadOptions.classList.remove('show');
      }
    });
  }

  // 伤害计算器功能
  const calcBtn = document.getElementById('calcDamageBtn');
  const resultDiv = document.getElementById('damageResult');

  if (calcBtn && resultDiv) {
    calcBtn.addEventListener('click', () => {
      // 暂时显示提示，后续添加具体计算逻辑
      resultDiv.textContent = '计算功能开发中...';
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
    class: '全部',
    map: '全部'
  },
  availableMaps: [], // 可用的地图列表
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
        // 去重处理：根据道具名称去重，合并怪物来源
        this.items = this.mergeItemSources(mappedItems);
        this.collectAvailableMaps();
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
        // 去重处理：根据道具名称去重，合并怪物来源
        this.items = this.mergeItemSources(csvItems);
        this.collectAvailableMaps();
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
   * 合并道具来源 - 将同一道具的所有怪物来源按地图分组
   * @param {Array} items - 原始道具数组
   * @returns {Array} - 合并后的道具数组，每个道具包含 sourcesByMap 属性
   */
  mergeItemSources(items) {
    const itemMap = new Map();

    items.forEach(item => {
      const name = item.name;
      const map = item.map || '未知地图';
      const source = item.source;

      if (!name) return; // 跳过无效数据

      if (!itemMap.has(name)) {
        // 首次遇到该道具，创建新记录
        itemMap.set(name, {
          ...item,
          sourcesByMap: new Map([[map, source ? [source] : []]])
        });
      } else {
        // 已存在该道具，合并来源
        const existing = itemMap.get(name);
        if (source && !existing.sourcesByMap.has(map)) {
          // 该地图是新来源
          existing.sourcesByMap.set(map, [source]);
        } else if (source && !existing.sourcesByMap.get(map).includes(source)) {
          // 同地图但不同怪物
          existing.sourcesByMap.get(map).push(source);
        }
      }
    });

    // 转换为数组，并将 Map 转换为对象
    return Array.from(itemMap.values()).map(item => ({
      ...item,
      sourcesByMap: Object.fromEntries(item.sourcesByMap)
    }));
  },

  /**
   * 收集所有可用的地图列表
   */
  collectAvailableMaps() {
    const mapSet = new Set();
    this.items.forEach(item => {
      if (item.sourcesByMap) {
        Object.keys(item.sourcesByMap).forEach(map => {
          if (map && map !== '未知地图' && map.trim()) {
            mapSet.add(map);
          }
        });
      } else if (item.map && item.map.trim()) {
        mapSet.add(item.map);
      }
    });
    this.availableMaps = Array.from(mapSet).sort();
    this.renderMapFilter();
  },

  /**
   * 渲染地图筛选按钮
   */
  renderMapFilter() {
    const container = document.getElementById('filter-map');
    if (!container) return;

    // 保留"全部"按钮
    const allBtn = container.querySelector('.filter-btn[data-value="全部"]');
    container.innerHTML = '';
    if (allBtn) {
      container.appendChild(allBtn);
    } else {
      const btn = document.createElement('button');
      btn.className = 'filter-btn active';
      btn.dataset.value = '全部';
      btn.textContent = '全部';
      container.appendChild(btn);
    }

    // 添加各地图按钮
    this.availableMaps.forEach(map => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.value = map;
      btn.textContent = map;
      container.appendChild(btn);
    });
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

    this.filters = { tier: '全部', category: '全部', subcategory: '全部', class: '全部', map: '全部' };
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
      // 地图筛选
      if (this.filters.map !== '全部') {
        const selectedMap = this.filters.map;
        if (item.sourcesByMap) {
          // 新格式：检查 sourcesByMap 中是否有该地图
          if (!Object.keys(item.sourcesByMap).some(map => map.includes(selectedMap))) {
            return false;
          }
        } else if (item.map) {
          // 旧格式
          if (!item.map.includes(selectedMap)) {
            return false;
          }
        } else {
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

    // 按地图分组显示怪物来源
    const sourceContainer = document.getElementById('detailSource');
    const mapContainer = document.getElementById('detailMap');
    
    if (item.sourcesByMap) {
      // 新格式：按地图分组显示
      const mapEntries = Object.entries(item.sourcesByMap);
      if (mapEntries.length > 0) {
        // 地图列表显示（简洁版）
        mapContainer.textContent = mapEntries.map(([map]) => map).join('、');
        
        // 怪物来源显示（详细版，带地图标注）
        sourceContainer.innerHTML = mapEntries.map(([map, sources]) => {
          if (sources.length === 0 || (sources.length === 1 && !sources[0])) {
            return `<div class="source-group"><span class="source-map">${map}</span><span class="source-monsters">来源不明</span></div>`;
          }
          return `<div class="source-group">
            <span class="source-map">${map}</span>
            <span class="source-monsters">${sources.join('、')}</span>
          </div>`;
        }).join('');
      } else {
        mapContainer.textContent = '无';
        sourceContainer.textContent = '无';
      }
    } else {
      // 旧格式兼容：单来源
      mapContainer.textContent = item.map || '无';
      sourceContainer.textContent = item.source || '无';
    }

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
