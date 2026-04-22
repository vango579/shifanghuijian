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
├── icon/               # 应用图标
│   ├── app_icon_round.png
│   └── logo.png
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
存放自定义图标（可选，优先使用 Font Awesome）：
- 自定义 Logo（如 `logo.svg`）
- 特色图标（如 `custom_icon.png`）

---

## Font Awesome 图标库使用指南

本项目统一使用 **Font Awesome 6.x** 作为图标解决方案。

### CDN 引入方式

在 HTML 文件的 `<head>` 中添加以下链接：

```html
<!-- Font Awesome 6.4.0 -->
<link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
```

**推荐 CDN 源：**
- BootCDN（国内，推荐）：`https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- jsDelivr：`https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css`
- unpkg：`https://unpkg.com/@fortawesome/fontawesome-free@6.4.0/css/all.min.css`

### 基本使用语法

#### 1. HTML 中使用（推荐）

```html
<!-- 方式一：使用 <i> 标签（常用） -->
<i class="fas fa-home"></i>
<i class="far fa-bookmark"></i>
<i class="fab fa-github"></i>

<!-- 带文字的图标 -->
<span><i class="fas fa-search"></i> 搜索</span>
```

#### 2. 图标样式前缀

| 前缀 | 说明 | 示例 |
|------|------|------|
| `fas` | Solid（实心/粗体） | `fa-user` |
| `far` | Regular（常规） | `fa-bookmark` |
| `fal` | Light（细体，需付费） | `fa-comment` |
| `fad` | Duotone（双色调，需付费） | `fa-layer-group` |
| `fab` | Brands（品牌图标） | `fa-github`, `fa-discord` |

> 注：`fas`、`far` 为免费版，`fal`、`fad` 需要 Pro 许可证。

### 常用图标速查表

#### 导航与界面

| 图标名称 | 类名 | 用途 |
|----------|------|------|
| 首页 | `fas fa-home` | 首页导航 |
| 书籍 | `fas fa-book` | 图鉴/百科 |
| 打开的书 | `fas fa-book-open` | 攻略/指南 |
| 计算器 | `fas fa-calculator` | 数值计算 |
| 时钟 | `fas fa-clock` | 计时器 |
| 铃铛 | `fas fa-bell` | 通知 |
| 设置 | `fas fa-cog` | 设置/配置 |
| 箭头-左 | `fas fa-chevron-left` | 返回/折叠 |
| 箭头-右 | `fas fa-chevron-right` | 前进/展开 |
| 搜索 | `fas fa-search` | 搜索功能 |
| 用户 | `fas fa-user` | 用户/角色 |
| 盾牌 | `fas fa-shield-alt` | 防御/保护 |
| 日历 | `fas fa-calendar-alt` | 日期/时间 |
| 火箭 | `fas fa-rocket` | 冒险/出发 |

#### 物品与装备

| 图标名称 | 类名 | 用途 |
|----------|------|------|
| 剑 | `fas fa-sword` | 武器 |
| 盾牌 | `fas fa-shield` | 防具 |
| 药水 | `fas fa-flask` | 消耗品 |
| 箱子 | `fas fa-box` | 宝箱/容器 |
| 宝石 | `fas fa-gem` | 稀有物品 |
| 星标 | `fas fa-star` | 收藏/评分 |
| 星星 | `fas fa-star-of-life` | 生命/恢复 |

#### 状态与操作

| 图标名称 | 类名 | 用途 |
|----------|------|------|
| 加号 | `fas fa-plus` | 添加/新增 |
| 减号 | `fas fa-minus` | 减少/删除 |
| 编辑 | `fas fa-edit` | 编辑 |
| 删除 | `fas fa-trash` | 删除 |
| 分享 | `fas fa-share-alt` | 分享 |
| 下载 | `fas fa-download` | 下载 |
| 上传 | `fas fa-upload` | 上传 |
| 收藏 | `fas fa-heart` | 喜欢/收藏 |
| 关闭 | `fas fa-times` | 关闭 |

#### 品牌图标

| 图标名称 | 类名 | 用途 |
|----------|------|------|
| GitHub | `fab fa-github` | GitHub 链接 |
| Discord | `fab fa-discord` | Discord 社群 |
| Twitter | `fab fa-twitter` | Twitter |
| Weibo | `fab fa-weibo` | 微博 |

### 图标尺寸设置

通过 CSS 或类名设置尺寸：

```html
<!-- 使用类名 -->
<i class="fas fa-home fa-xs"></i>   <!-- 0.75em -->
<i class="fas fa-home fa-sm"></i>    <!-- 0.875em -->
<i class="fas fa-home"></i>          <!-- 1em (默认) -->
<i class="fas fa-home fa-lg"></i>    <!-- 1.333em -->
<i class="fas fa-home fa-2x"></i>    <!-- 2em -->
<i class="fas fa-home fa-3x"></i>    <!-- 3em -->
<i class="fas fa-home fa-5x"></i>    <!-- 5em -->
<i class="fas fa-home fa-10x"></i>   <!-- 10em -->

<!-- 使用 CSS -->
<i class="fas fa-home" style="font-size: 24px;"></i>
```

### 固定宽度

使图标宽度一致，方便对齐：

```html
<i class="fas fa-home fa-fw"></i>   <!-- 固定宽度 -->
```

### 旋转与翻转

```html
<i class="fas fa-sync-alt"></i>                    <!-- 正常 -->
<i class="fas fa-sync-alt fa-rotate-90"></i>        <!-- 旋转90° -->
<i class="fas fa-sync-alt fa-rotate-180"></i>       <!-- 旋转180° -->
<i class="fas fa-sync-alt fa-rotate-270"></i>       <!-- 旋转270° -->
<i class="fas fa-arrow-right fa-flip-horizontal"></i> <!-- 水平翻转 -->
<i class="fas fa-arrow-right fa-flip-vertical"></i>   <!-- 垂直翻转 -->
```

### 动画效果

```html
<i class="fas fa-spinner fa-spin"></i>              <!-- 旋转加载 -->
<i class="fas fa-circle-notch fa-spin"></i>          <!-- 圆形加载 -->
<i class="fas fa-pulse fa-spin"></i>                 <!-- 脉冲加载 -->
<i class="fas fa-heart fa-beat"></i>                  <!-- 心跳动画 -->
<i class="fas fa-bell fa-shake"></i>                  <!-- 摇动动画 -->
<i class="fas fa-fire fa-flip"></i>                   <!-- 火焰闪烁 -->
```

### 项目中的图标使用规范

#### 1. CSS 中的图标样式

在 `styles.css` 中统一管理图标基础样式：

```css
/* 图标字体 */
.fas {
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

/* 导航图标 */
.nav-btn .fas {
  font-size: 22px;
  flex-shrink: 0;
  margin-right: 14px;
  min-width: 22px;
  text-align: center;
}

/* 卡片图标 */
.card-icon .fas {
  font-size: 24px;
  color: var(--accent);
}

/* 页面导航图标 */
.page-nav-btn .fas {
  font-size: 18px;
}
```

#### 2. 命名约定

- **HTML 类名**：使用 `fa-` 前缀 + 图标名称（小写，单词间用连字符）
- **自定义样式类名**：使用有意义的名称，如 `.nav-icon`, `.card-icon`

```html
<!-- 正确示例 -->
<i class="fas fa-book-open"></i>
<i class="fab fa-github"></i>

<!-- 避免 -->
<i class="fas fa-Book"></i>           <!-- 大写 -->
<i class="fas fa-book_open"></i>       <!-- 下划线 -->
```

#### 3. 可访问性建议

```html
<!-- 带工具提示 -->
<i class="fas fa-home" title="返回首页"></i>

<!-- 隐藏文字的图标按钮 -->
<button>
  <span class="visually-hidden">通知</span>
  <i class="fas fa-bell"></i>
</button>

<!-- 带有 aria-label -->
<i class="fas fa-search" aria-label="搜索"></i>
```

### 寻找更多图标

访问 [Font Awesome 图标库](https://fontawesome.com/icons) 搜索可用图标。

### 在线工具

- **图标搜索**：https://fontawesome.com/icons
- **Unicode 对照表**：https://fontawesome.com/cheatsheet
- **CDN 链接生成**：https://cdnjs.com/libraries/font-awesome

---

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

修改 `components.js` 中的 `renderSidebar` 方法或直接在 HTML 中添加 `.nav-btn`：

```html
<a class="nav-btn" data-page="new-page" href="new.html">
  <i class="fas fa-plus"></i>
  <span class="nav-text">新页面</span>
</a>
```

### 主题切换

- 首页使用 `.theme-home`
- 游戏页使用 `.theme-dream`

## 依赖

### CDN 资源

| 资源 | 版本 | CDN 链接 |
|------|------|----------|
| Font Awesome | 6.4.0 | `https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css` |
| Google Fonts - Noto Serif SC | - | `https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700` |
| Google Fonts - Noto Sans SC | - | `https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700` |
| Material Symbols Outlined | - | `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght@20..48,100..700` |

## 开发

所有页面通过 `Components.init()` 初始化侧边栏，通过 `main.js` 处理交互逻辑。
