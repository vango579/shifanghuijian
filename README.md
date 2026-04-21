# 十方汇鉴 - 项目结构

## 项目概览

遵循多页面架构 (MPA) 设计的游戏图鉴网站。

## 文件结构

```
sfhj/
├── index.html          # 首页
├── dreams.html         # 梦想与征程（游戏详细页）
├── styles.css          # 全局样式（含两种主题）
├── components.js       # 公共组件（侧边栏等）
├── main.js             # 主逻辑（页面切换、卡片交互）
├── images/             # 图片资源
│   ├── characters/     # 角色立绘/头像
│   ├── backgrounds/    # 背景图
│   └── icons/          # 自定义图标
└── README.md
```

## 资源文件夹说明

### images/characters/
存放角色相关图片：
- 角色立绘（如 `kael.png`）
- 角色头像（如 `lyra_avatar.jpg`）
- 角色卡片背景（如 `character_card_bg.jpg`）

### images/backgrounds/
存放页面背景图：
- 首页背景（如 `home_bg.jpg`）
- 游戏页背景（如 `dream_bg.jpg`）
- 英雄区域背景（如 `hero_bg.jpg`）

### images/icons/
存放自定义图标（可选，优先使用 Material Symbols）：
- 自定义 Logo（如 `logo.svg`）
- 特色图标（如 `custom_icon.png`）

## 使用说明

### 添加角色
在 `main.js` 的 `CharacterCard.characters` 数组中添加：

```javascript
{
  id: 'unique-id',
  name: '角色名',
  role: '类型',
  image: 'images/characters/xxx.jpg',
  stats: { attack: 80, defense: 60, speed: 70 },
  description: '角色描述'
}
```

### 添加导航项
修改 `components.js` 中的 `renderSidebar` 方法或直接在 HTML 中添加 `.nav-btn`。

### 主题切换
- 首页使用 `.theme-home`
- 游戏页使用 `.theme-dream`

## 依赖

- Google Fonts: Noto Serif SC, Noto Sans SC
- Material Symbols Outlined

## 开发

所有页面通过 `Components.init()` 初始化侧边栏，通过 `main.js` 处理交互逻辑。
