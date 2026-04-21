/**
 * 公共组件模块
 * 提供侧边栏初始化、主题应用等全局功能
 */
const Components = {
  /**
   * 初始化所有公共组件
   * @param {Object} options 配置选项
   * @param {string} options.currentPage - 当前页面标识
   * @param {string} options.theme - 主题类型 'home' | 'dream'
   */
  init(options = {}) {
    const { currentPage = 'home', theme = 'home' } = options;
    
    this.applyTheme(theme);
    this.initSidebarNavigation(currentPage);
  },

  /**
   * 应用主题
   * @param {string} theme - 主题类型
   */
  applyTheme(theme) {
    document.body.classList.remove('theme-home', 'theme-dream');
    document.body.classList.add(`theme-${theme}`);
  },

  /**
   * 初始化侧边栏导航
   * @param {string} currentPage - 当前页面
   */
  initSidebarNavigation(currentPage) {
    const navBtns = document.querySelectorAll('.sidebar .nav-btn');
    navBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.page === currentPage) {
        btn.classList.add('active');
      }
    });
    
    this.initSidebarToggle();
  },

  /**
   * 初始化侧边栏切换按钮
   */
  initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggleBtn && sidebar && mainContent) {
      // 从 localStorage 恢复侧边栏状态
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState === 'true') {
        sidebar.classList.add('collapsed');
        mainContent.style.marginLeft = '72px';
      }
      
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        
        if (sidebar.classList.contains('collapsed')) {
          mainContent.style.marginLeft = '72px';
          localStorage.setItem('sidebarCollapsed', 'true');
        } else {
          mainContent.style.marginLeft = '220px';
          localStorage.setItem('sidebarCollapsed', 'false');
        }
      });
    }
  }
};

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Components;
}
