# Radiant Living - 游戏攻略图鉴网站

基于 **The Radiant Living System** 设计系统构建的游戏攻略图鉴网站。

## 设计理念

**炉火边社论风格 (Hearthside Editorial)** - 温暖、精致、有质感的高端生活杂志风格

### 核心设计原则

- **无边框规则**: 用背景色差异定义区块，而非传统分割线
- **大圆角系统**: 所有元素采用柔和的圆角设计 (1rem - 3rem)
- **玻璃拟态**: 半透明毛玻璃效果用于导航和弹窗
- **Bento 网格**: 非对称布局创造视觉层次
- **琥珀色系**: 温暖的黄金时段配色方案

### 色彩系统

| 用途 | 色值 |
|------|------|
| 主色 Primary | `#954b00` → `#ffaf75` |
| 背景 Surface | `#fff8ef` (奶油白) |
| 次要色 Secondary | `#a33f00` |
| 强调色 Tertiary | `#875400` / `#fea520` |
| 文字色 On-Surface | `#373222` |

### 字体

- **Display/Headlines**: Plus Jakarta Sans
- **Body/UI**: Be Vietnam Pro

## 功能模块

### 1. 首页 (index.html)
- Hero 区域展示精选内容
- 分类筛选标签
- 特色攻略卡片网格
- 本周专题推荐
- 快速导航入口

### 2. 攻略 (guides.html)
- 攻略文章列表
- 分类筛选（角色扮演、动作策略、极速竞速等）
- 作者信息和阅读时长
- 收藏功能

### 3. 图鉴 (database.html)
- 物品数据库展示
- 搜索功能
- 多维度筛选
- 物品对比功能
- 稀有度标签

### 4. 数值计算 (calculator.html)
- 属性雷达图可视化
- DPS 瞬时计算器
- 收益深度分析卡片
- 对比历史记录

### 5. 计时器 (timer.html)
- 首领刷新倒计时
- 实时进度条
- 预警提醒设置
- 挑战历史记录
- 所有首领一览

## 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 自定义设计系统（无框架依赖）
- **Google Fonts** - Plus Jakarta Sans, Be Vietnam Pro
- **Material Symbols** - 图标库

## 快速开始

直接在浏览器中打开 `index.html` 即可预览网站。

```bash
# 或者使用本地服务器
npx serve .
# 或
python -m http.server 8000
```

## 项目结构

```
website/
├── index.html      # 首页
├── guides.html     # 攻略页面
├── database.html   # 图鉴页面
├── calculator.html # 数值计算页面
├── timer.html      # 计时器页面
├── styles.css     # 统一样式文件
└── README.md       # 项目说明
```

## 设计规范

### 圆角系统
- Small: 8px
- Default: 1rem (16px)
- Large: 2rem (32px)
- XL: 3rem (48px)
- Full: 9999px (胶囊形)

### 阴影
- 使用 `rgba(55, 50, 34, 0.04-0.08)` 的暖色调阴影
- 禁止使用纯黑色阴影

### 组件状态
- Hover: `scale(1.02)` + 背景色变化
- Active: `scale(0.98)` + 颜色加深
- Focus: 2px `primary/20` 外发光

## License

MIT License
