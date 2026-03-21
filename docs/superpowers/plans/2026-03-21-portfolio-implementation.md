# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio website for creative director Masakazu Fuchigami — dark Apple-quality aesthetic, filterable project grid (42 projects), custom cursor, GSAP animations, Japanese language.

**Architecture:** Three files: `index.html` (all markup + content), `style.css` (all styles via CSS custom properties), `main.js` (GSAP animations + filter logic + custom cursor). No build step, no framework — open `index.html` in a browser directly.

**Tech Stack:** Vanilla HTML5 + CSS3 + JavaScript (ES6+), GSAP 3.12.5 (core + ScrollTrigger via cdnjs), Google Fonts (Inter + Noto Sans JP)

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | All HTML structure and content (header, hero, filter bar, 42 grid items, about, awards, footer) |
| `style.css` | CSS custom properties, reset, layout, all component styles, responsive breakpoints |
| `main.js` | Custom cursor (lerp), hero load stagger (GSAP), scroll stagger (IntersectionObserver + GSAP), filter show/hide (GSAP), smooth scroll offset |

---

## Task 1: Project scaffold

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `main.js`

- [ ] **Step 1: Create `index.html` with full boilerplate**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MASAKAZU FUCHIGAMI — Creative Director</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400&family=Noto+Sans+JP:wght@100;300;400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- CURSOR -->
  <div class="cursor-dot" aria-hidden="true"></div>
  <div class="cursor-ring" aria-hidden="true"></div>

  <!-- HEADER -->
  <header class="site-header" id="top">
    <div class="site-logo">MASAKAZU FUCHIGAMI</div>
    <nav class="site-nav" aria-label="メインナビゲーション">
      <a href="#work">実績</a>
      <a href="#about">プロフィール</a>
      <a href="#awards">受賞歴</a>
    </nav>
  </header>

  <!-- HERO -->
  <section class="hero" aria-label="イントロダクション">
    <div class="hero-orb" aria-hidden="true"></div>
    <p class="hero-eyebrow">Creative Director</p>
    <h1 class="hero-name">
      <span class="hero-name-line1">MASAKAZU</span>
      <span class="hero-name-line2">FUCHIGAMI</span>
    </h1>
    <ul class="hero-tags" aria-label="専門領域">
      <li>ブランディング</li>
      <li>ビジョニング</li>
      <li>統合型コミュニケーション</li>
      <li>UI/UX デザイン</li>
      <li>コンセプト開発</li>
    </ul>
    <div class="hero-stats">
      <div class="stat">
        <span class="stat-num">11<span class="stat-plus">+</span></span>
        <span class="stat-label">受賞・ノミネート</span>
      </div>
      <div class="stat">
        <span class="stat-num">42<span class="stat-plus">+</span></span>
        <span class="stat-label">プロジェクト</span>
      </div>
      <div class="stat">
        <span class="stat-num stat-num--small">GOOD<br>DESIGN</span>
        <span class="stat-label">金賞・Best100</span>
      </div>
    </div>
  </section>

  <!-- FILTER BAR -->
  <div class="filter-bar" id="work" role="tablist" aria-label="カテゴリフィルター">
    <button class="filter-btn active" data-filter="all" role="tab" aria-pressed="true">ALL</button>
    <button class="filter-btn" data-filter="brand" role="tab" aria-pressed="false">ブランディング</button>
    <button class="filter-btn" data-filter="uiux" role="tab" aria-pressed="false">UI / UX</button>
    <button class="filter-btn" data-filter="ad" role="tab" aria-pressed="false">広告・CM</button>
    <button class="filter-btn" data-filter="film" role="tab" aria-pressed="false">映像</button>
    <button class="filter-btn" data-filter="space" role="tab" aria-pressed="false">空間・サイン</button>
    <button class="filter-btn" data-filter="web" role="tab" aria-pressed="false">WEB</button>
  </div>

  <!-- WORK GRID -->
  <main class="work-grid" id="work-grid">

    <!-- 42 project cards inserted in Task 3 -->

  </main>

  <!-- ABOUT -->
  <section class="about-section" id="about">
    <div class="about-bio">
      <p class="about-eyebrow">クリエイティブディレクター</p>
      <h2 class="about-name">MASAKAZU<br>FUCHIGAMI</h2>
      <p class="about-body">
        専門・得意領域：<br>
        ブランディング、ビジョニング<br>
        統合型コミュニケーションデザイン<br>
        戦略、コンセプト、アイデンティティの開発
      </p>
    </div>
    <div class="awards-card" id="awards">
      <p class="awards-title">Awards &amp; Recognition</p>
      <ul class="awards-list">
        <li><span class="award-name">ACC TOKYO CREATIVITY AWARDS</span><span class="award-val">シルバー</span></li>
        <li><span class="award-name">GOOD DESIGN AWARD</span><span class="award-val">金賞・Best100</span></li>
        <li><span class="award-name">SDA Award</span><span class="award-val">ゴールド</span></li>
        <li><span class="award-name">日本空間デザイン賞</span><span class="award-val">ブロンズ</span></li>
        <li><span class="award-name">ディスプレイ産業賞</span><span class="award-val">優秀賞</span></li>
        <li><span class="award-name">One Screen Film Festival</span><span class="award-val">finalist</span></li>
        <li><span class="award-name">AD STARS</span><span class="award-val">finalist</span></li>
        <li><span class="award-name">JAA 消費者が選んだ広告コンクール</span><span class="award-val">入賞</span></li>
        <li><span class="award-name">観光映像大賞</span><span class="award-val">旅もじゃ賞</span></li>
        <li><span class="award-name">日本観光ポスターコンクール</span><span class="award-val">国土交通大臣賞</span></li>
        <li><span class="award-name">JAAA クリエイティブ・オブ・ザ・イヤー</span><span class="award-val">ノミネート</span></li>
      </ul>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="site-footer">
    <span class="footer-logo">MF</span>
    <span class="footer-copy">© 2026 Masakazu Fuchigami. All rights reserved.</span>
  </footer>

  <!-- GSAP -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create empty `style.css` and `main.js`**

```css
/* style.css — populated in Tasks 2–9 */
```

```js
// main.js — populated in Tasks 10–15
```

- [ ] **Step 3: Open `index.html` in browser**

Open the file directly: `open index.html` (macOS) or drag into Chrome.
Expected: blank dark page, no console errors (GSAP scripts load from CDN; fonts load from Google).

- [ ] **Step 4: Commit scaffold**

```bash
cd /Users/masakazu.fuchigami.67/Desktop/portfolio
git init
git add index.html style.css main.js
git commit -m "feat: scaffold — html structure, empty css/js"
```

---

## Task 2: CSS custom properties + reset + base

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add CSS custom properties, reset, and base body styles**

```css
/* ===== CUSTOM PROPERTIES ===== */
:root {
  --bg-base:        #090c14;
  --bg-secondary:   #080a10;
  --bg-surface:     rgba(255, 255, 255, 0.02);
  --border-subtle:  rgba(255, 255, 255, 0.06);
  --border-faint:   rgba(255, 255, 255, 0.04);
  --text-primary:   #f0f2f8;
  --text-secondary: rgba(240, 242, 248, 0.4);
  --text-muted:     #4a5568;
  --text-dim:       #3a4a6a;
  --accent:         #5a7aaa;
  --accent-subtle:  rgba(90, 122, 170, 0.06);
  --accent-border:  rgba(90, 122, 170, 0.2);
  --font-latin: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --font-ja:    'Noto Sans JP', 'Helvetica Neue', Arial, sans-serif;
}

/* ===== RESET ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
ul { list-style: none; }
a { text-decoration: none; }
button { border: none; background: none; cursor: pointer; font: inherit; }

/* ===== BASE ===== */
html { scroll-behavior: smooth; }

body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-ja);
  font-size: 12px;
  line-height: 1.6;
  cursor: none; /* hide default cursor — custom cursor takes over */
  overflow-x: hidden;
}

/* Restore cursor when custom cursor is not supported */
@media (hover: none) {
  body { cursor: auto; }
  .cursor-dot, .cursor-ring { display: none; }
}

/* Reduced motion: restore default cursor, disable custom cursor */
@media (prefers-reduced-motion: reduce) {
  body { cursor: auto; }
  .cursor-dot, .cursor-ring { display: none; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 2: Reload browser**

Expected: background is `#090c14` (near-black), text would be white if any existed, no layout errors.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: css custom properties, reset, base body styles"
```

---

## Task 3: 42 project cards HTML

**Files:**
- Modify: `index.html` (replace the `<!-- 42 project cards inserted in Task 3 -->` comment)

- [ ] **Step 1: Replace the placeholder comment with all 42 project cards**

Each card follows this template:
```html
<article class="grid-item [wide]" data-category="[categories]" role="article" aria-label="[name]">
  <div class="item-bg" style="background: linear-gradient(135deg, [color1], [color2]);"></div>
  <div class="item-overlay"></div>
  <div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">[category label]</p>
    <h3 class="item-name">[project name]</h3>
    <p class="item-client">[client / role]</p>
  </div>
</article>
```

Add class `wide` to items marked Wide in spec. Use `data-category` as space-separated values. Vary the gradient colors slightly per card using dark blue-greys (stay within the palette: `#090c14`, `#0d1828`, `#111b2a`, `#0e1520`, `#141622`, `#101824`, `#121a28`, `#131820`).

Full card list (copy exactly):

```html
<!-- 1 -->
<article class="grid-item wide" data-category="uiux web" role="article" aria-label="ワスレナイ">
  <div class="item-bg" style="background:linear-gradient(135deg,#0d1828,#09111f);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">UI/UX · Web</p>
    <h3 class="item-name">SHIFT — ワスレナイ</h3>
    <p class="item-client">クリエイティブディレクター・UI/UXデザイン・Webサイト</p>
  </div>
</article>

<!-- 2 -->
<article class="grid-item" data-category="uiux web brand" role="article" aria-label="天才くん">
  <div class="item-bg" style="background:linear-gradient(135deg,#121a28,#09101c);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">UI/UX · AI</p>
    <h3 class="item-name">SHIFT — 天才くん</h3>
    <p class="item-client">クリエイティブディレクター・ロゴ・UI/UX</p>
  </div>
</article>

<!-- 3 -->
<article class="grid-item" data-category="uiux" role="article" aria-label="シフじぃ">
  <div class="item-bg" style="background:linear-gradient(135deg,#0e1520,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">UI/UX</p>
    <h3 class="item-name">SHIFT — シフじぃ</h3>
    <p class="item-client">オフィスDXアプリ UI/UXデザイン</p>
  </div>
</article>

<!-- 4 -->
<article class="grid-item" data-category="uiux brand" role="article" aria-label="Advanced Dashboard">
  <div class="item-bg" style="background:linear-gradient(135deg,#111b2a,#0a0f1a);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">UI/UX · Service Design</p>
    <h3 class="item-name">SHIFT — Advanced Dashboard</h3>
    <p class="item-client">クリエイティブディレクター・サービスデザイン</p>
  </div>
</article>

<!-- 5 -->
<article class="grid-item wide" data-category="brand film web" role="article" aria-label="WHITE JACK project">
  <div class="item-bg" style="background:linear-gradient(135deg,#101824,#090f1c);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Film · Web</p>
    <h3 class="item-name">M3 — WHITE JACK project</h3>
    <p class="item-client">クリエイティブディレクター</p>
  </div>
</article>

<!-- 6 -->
<article class="grid-item" data-category="brand web" role="article" aria-label="EBHS">
  <div class="item-bg" style="background:linear-gradient(135deg,#131820,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Web</p>
    <h3 class="item-name">M3 — EBHS</h3>
    <p class="item-client">クリエイティブディレクター・ブランドガイドライン</p>
  </div>
</article>

<!-- 7 -->
<article class="grid-item" data-category="ad brand" role="article" aria-label="Ask Doctors総研">
  <div class="item-bg" style="background:linear-gradient(135deg,#141622,#0b0d18);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告・CM</p>
    <h3 class="item-name">M3 — Ask Doctors総研</h3>
    <p class="item-client">クリエイティブディレクター・動画広告・展示会</p>
  </div>
</article>

<!-- 8 -->
<article class="grid-item" data-category="brand" role="article" aria-label="お医者さんのおせんべい">
  <div class="item-bg" style="background:linear-gradient(135deg,#0d1828,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Naming</p>
    <h3 class="item-name">M3 — お医者さんのおせんべい</h3>
    <p class="item-client">ネーミング・パッケージ・コピーライティング</p>
  </div>
</article>

<!-- 9 -->
<article class="grid-item wide" data-category="brand web film space" role="article" aria-label="WOOMS">
  <div class="item-bg" style="background:linear-gradient(135deg,#111b2a,#09101c);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Web · Film · Space</p>
    <h3 class="item-name">小田急電鉄 — WOOMS</h3>
    <p class="item-client">ブランディング・クリエイティブディレクター</p>
  </div>
</article>

<!-- 10 -->
<article class="grid-item" data-category="brand web film" role="article" aria-label="EMot">
  <div class="item-bg" style="background:linear-gradient(135deg,#0e1520,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · App · Film</p>
    <h3 class="item-name">小田急電鉄 — EMot</h3>
    <p class="item-client">MaaSアプリ ブランド開発（ネーミング・VI・映像・WEB）</p>
  </div>
</article>

<!-- 11 -->
<article class="grid-item" data-category="brand ad film web" role="article" aria-label="小田急でんき">
  <div class="item-bg" style="background:linear-gradient(135deg,#121a28,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · 広告 · Film</p>
    <h3 class="item-name">小田急でんき</h3>
    <p class="item-client">ネーミング・ロゴ・コミュニケーション開発</p>
  </div>
</article>

<!-- 12 -->
<article class="grid-item" data-category="brand web" role="article" aria-label="ONE オーネ">
  <div class="item-bg" style="background:linear-gradient(135deg,#101824,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Web</p>
    <h3 class="item-name">ICTプラットフォーム ONE（オーネ）</h3>
    <p class="item-client">ブランド開発（ネーミング・VI・グラフィック）</p>
  </div>
</article>

<!-- 13 -->
<article class="grid-item" data-category="web" role="article" aria-label="ACT FOR SKY">
  <div class="item-bg" style="background:linear-gradient(135deg,#0d1828,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Web</p>
    <h3 class="item-name">ACT FOR SKY</h3>
    <p class="item-client">サイト制作</p>
  </div>
</article>

<!-- 14 -->
<article class="grid-item" data-category="brand space" role="article" aria-label="登戸駅ドラえもん化">
  <div class="item-bg" style="background:linear-gradient(135deg,#111b2a,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Space</p>
    <h3 class="item-name">小田急線 登戸駅 ドラえもん化</h3>
    <p class="item-client">デザイン開発</p>
  </div>
</article>

<!-- 15 -->
<article class="grid-item wide" data-category="brand space web" role="article" aria-label="4&2">
  <div class="item-bg" style="background:linear-gradient(135deg,#0e1520,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Space · Web</p>
    <h3 class="item-name">4&2（ペットのお店）</h3>
    <p class="item-client">ネーミング・ロゴ・店舗・商品・コミュニケーション開発</p>
  </div>
</article>

<!-- 16 -->
<article class="grid-item" data-category="space" role="article" aria-label="4&2梅ヶ丘">
  <div class="item-bg" style="background:linear-gradient(135deg,#141622,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Space Design</p>
    <h3 class="item-name">4&2 梅ヶ丘</h3>
    <p class="item-client">店舗デザイン</p>
  </div>
</article>

<!-- 17 -->
<article class="grid-item wide" data-category="ad brand" role="article" aria-label="ロマンスカー新型デビュー">
  <div class="item-bg" style="background:linear-gradient(135deg,#131820,#09101c);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Branding</p>
    <h3 class="item-name">特急ロマンスカー 新型デビュー</h3>
    <p class="item-client">キャンペーン企画・コミュニケーション開発（新宿駅ジャック）</p>
  </div>
</article>

<!-- 18 -->
<article class="grid-item" data-category="ad web" role="article" aria-label="はじめての、ロマンスカー">
  <div class="item-bg" style="background:linear-gradient(135deg,#101824,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Web</p>
    <h3 class="item-name">はじめての、ロマンスカー。</h3>
    <p class="item-client">キャンペーン企画・コミュニケーション開発</p>
  </div>
</article>

<!-- 19 -->
<article class="grid-item" data-category="brand web" role="article" aria-label="箱根の森から">
  <div class="item-bg" style="background:linear-gradient(135deg,#0d1828,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Web</p>
    <h3 class="item-name">箱根の森から（ミネラルウォーター）</h3>
    <p class="item-client">パッケージデザイン・コミュニケーション開発</p>
  </div>
</article>

<!-- 20 -->
<article class="grid-item" data-category="ad" role="article" aria-label="小田急ポイントカード">
  <div class="item-bg" style="background:linear-gradient(135deg,#111b2a,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告</p>
    <h3 class="item-name">小田急ポイントカード</h3>
    <p class="item-client">キャンペーン企画・ポスター制作</p>
  </div>
</article>

<!-- 21 -->
<article class="grid-item" data-category="ad brand" role="article" aria-label="ネスレ日本 Dolce Gusto 1">
  <div class="item-bg" style="background:linear-gradient(135deg,#0e1520,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Branding</p>
    <h3 class="item-name">ネスレ日本 — Nescafé Dolce Gusto</h3>
    <p class="item-client">ポイントプログラム CRM・商品広告 デザイン開発</p>
  </div>
</article>

<!-- 22 -->
<article class="grid-item" data-category="ad" role="article" aria-label="ネスレ日本 Dolce Gusto 2">
  <div class="item-bg" style="background:linear-gradient(135deg,#141622,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告</p>
    <h3 class="item-name">ネスレ日本 — Morning Blend</h3>
    <p class="item-client">商品KV・OOH・店頭展開</p>
  </div>
</article>

<!-- 23 -->
<article class="grid-item" data-category="ad film" role="article" aria-label="リーフィア2021">
  <div class="item-bg" style="background:linear-gradient(135deg,#101824,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Film</p>
    <h3 class="item-name">小田急不動産 リーフィア 2021</h3>
    <p class="item-client">コミュニケーション開発（グラフィック・ムービー）</p>
  </div>
</article>

<!-- 24 -->
<article class="grid-item" data-category="ad film" role="article" aria-label="リーフィア">
  <div class="item-bg" style="background:linear-gradient(135deg,#0d1828,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Film</p>
    <h3 class="item-name">小田急不動産 リーフィア</h3>
    <p class="item-client">コミュニケーション開発（グラフィック・ムービー）</p>
  </div>
</article>

<!-- 25 -->
<article class="grid-item wide" data-category="ad film" role="article" aria-label="HELLO NEW ODAKYU">
  <div class="item-bg" style="background:linear-gradient(135deg,#111b2a,#09101c);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Film</p>
    <h3 class="item-name">HELLO NEW ODAKYU!</h3>
    <p class="item-client">複々線化プロモーション キャンペーン企画・CM・グラフィック</p>
  </div>
</article>

<!-- 26 -->
<article class="grid-item" data-category="film" role="article" aria-label="企業CM 2人">
  <div class="item-bg" style="background:linear-gradient(135deg,#131820,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Film</p>
    <h3 class="item-name">企業CM「世界に一つの日々と」</h3>
    <p class="item-client">小田急電鉄 — 2人の時間篇</p>
  </div>
</article>

<!-- 27 -->
<article class="grid-item" data-category="film" role="article" aria-label="企業CM 3人">
  <div class="item-bg" style="background:linear-gradient(135deg,#101824,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Film</p>
    <h3 class="item-name">企業CM「世界に一つの日々と」</h3>
    <p class="item-client">小田急電鉄 — 3人の日々篇</p>
  </div>
</article>

<!-- 28 -->
<article class="grid-item" data-category="film" role="article" aria-label="企業CM 1人">
  <div class="item-bg" style="background:linear-gradient(135deg,#0e1520,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Film</p>
    <h3 class="item-name">企業CM「世界に一つの日々と」</h3>
    <p class="item-client">小田急電鉄 — 1人の寄り道篇</p>
  </div>
</article>

<!-- 29 -->
<article class="grid-item" data-category="film web" role="article" aria-label="企業CMキャンペーンサイト">
  <div class="item-bg" style="background:linear-gradient(135deg,#111b2a,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Film · Web</p>
    <h3 class="item-name">企業CM キャンペーンサイト</h3>
    <p class="item-client">小田急電鉄「世界に一つの日々と」</p>
  </div>
</article>

<!-- 30 -->
<article class="grid-item" data-category="ad" role="article" aria-label="企業広告 日経新聞">
  <div class="item-bg" style="background:linear-gradient(135deg,#141622,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告</p>
    <h3 class="item-name">小田急電鉄 企業広告</h3>
    <p class="item-client">日経新聞 全面広告</p>
  </div>
</article>

<!-- 31 -->
<article class="grid-item" data-category="ad" role="article" aria-label="周年ビジュアル">
  <div class="item-bg" style="background:linear-gradient(135deg,#0d1828,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告</p>
    <h3 class="item-name">小田急不動産 周年ビジュアル</h3>
    <p class="item-client">イメージビジュアル制作</p>
  </div>
</article>

<!-- 32 -->
<article class="grid-item" data-category="ad film web" role="article" aria-label="そこまでやるの">
  <div class="item-bg" style="background:linear-gradient(135deg,#101824,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Film · Web</p>
    <h3 class="item-name">小田急不動産「そこまでやるの！？」</h3>
    <p class="item-client">企業キャンペーン コミュニケーション開発</p>
  </div>
</article>

<!-- 33 -->
<article class="grid-item wide" data-category="ad film web" role="article" aria-label="江ノ電2019">
  <div class="item-bg" style="background:linear-gradient(135deg,#0e1520,#09101c);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Film · Web · SNS</p>
    <h3 class="item-name">江ノ電で、会いにゆく。2019</h3>
    <p class="item-client">江ノ島・鎌倉 観光キャンペーン 企画・コミュニケーション開発</p>
  </div>
</article>

<!-- 34 -->
<article class="grid-item" data-category="ad film web" role="article" aria-label="江ノ電2018">
  <div class="item-bg" style="background:linear-gradient(135deg,#111b2a,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Film · Web</p>
    <h3 class="item-name">江ノ電で、会いにゆく。2018</h3>
    <p class="item-client">江ノ島・鎌倉 観光キャンペーン</p>
  </div>
</article>

<!-- 35 -->
<article class="grid-item" data-category="ad film web" role="article" aria-label="江ノ電2017">
  <div class="item-bg" style="background:linear-gradient(135deg,#141622,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Film · Web</p>
    <h3 class="item-name">江ノ電で、会いにゆく。2017</h3>
    <p class="item-client">江ノ島・鎌倉 観光キャンペーン</p>
  </div>
</article>

<!-- 36 -->
<article class="grid-item wide" data-category="brand ad film web space" role="article" aria-label="大山キャンペーン">
  <div class="item-bg" style="background:linear-gradient(135deg,#101824,#09101c);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · 広告 · Film · Web · Space</p>
    <h3 class="item-name">大山（伊勢原市）観光キャンペーン</h3>
    <p class="item-client">「大山、ふたたび。」企画・コミュニケーション開発</p>
  </div>
</article>

<!-- 37 -->
<article class="grid-item" data-category="space" role="article" aria-label="大山観光サイン">
  <div class="item-bg" style="background:linear-gradient(135deg,#0d1828,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Space · Sign</p>
    <h3 class="item-name">伊勢原市 大山観光サイン統一</h3>
    <p class="item-client">デザイン開発</p>
  </div>
</article>

<!-- 38 -->
<article class="grid-item" data-category="brand" role="article" aria-label="湘南GATE">
  <div class="item-bg" style="background:linear-gradient(135deg,#111b2a,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Naming</p>
    <h3 class="item-name">ODAKYU 湘南GATE</h3>
    <p class="item-client">コンセプト・ネーミング・ロゴ・コミュニケーション開発</p>
  </div>
</article>

<!-- 39 -->
<article class="grid-item" data-category="brand space" role="article" aria-label="新宿サザンテラス">
  <div class="item-bg" style="background:linear-gradient(135deg,#0e1520,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Branding · Space</p>
    <h3 class="item-name">新宿サザンテラス</h3>
    <p class="item-client">ロゴ・VI開発・イベント企画</p>
  </div>
</article>

<!-- 40 -->
<article class="grid-item" data-category="ad web" role="article" aria-label="小田急百貨店">
  <div class="item-bg" style="background:linear-gradient(135deg,#141622,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">広告 · Web</p>
    <h3 class="item-name">小田急百貨店</h3>
    <p class="item-client">コミュニケーション開発</p>
  </div>
</article>

<!-- 41 -->
<article class="grid-item" data-category="space brand" role="article" aria-label="路線図フットマーク">
  <div class="item-bg" style="background:linear-gradient(135deg,#101824,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Space · Branding</p>
    <h3 class="item-name">小田急線 路線図・ロマンスカーフットマーク</h3>
    <p class="item-client">デザイン開発</p>
  </div>
</article>

<!-- 42 -->
<article class="grid-item" data-category="web brand" role="article" aria-label="Satellite Train">
  <div class="item-bg" style="background:linear-gradient(135deg,#0d1828,#090c14);"></div>
  <div class="item-overlay"></div><div class="item-glass"></div>
  <div class="item-info">
    <p class="item-cat">Web · Branding</p>
    <h3 class="item-name">バーチャル電車「Satellite Train」</h3>
    <p class="item-client">企画・開発（実証実験）</p>
  </div>
</article>
```

- [ ] **Step 2: Reload browser**

Expected: unstyled content visible — 42 card texts stacked vertically. No JS errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: 42 project cards HTML with data-category attributes"
```

---

## Task 4: CSS — Header + Hero

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add header styles**

```css
/* ===== HEADER ===== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: rgba(9, 12, 20, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
}

.site-logo {
  font-family: var(--font-latin);
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 5px;
  color: var(--text-primary);
  text-transform: uppercase;
}

.site-nav {
  display: flex;
  gap: 28px;
}

.site-nav a {
  font-family: var(--font-latin);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 2px;
  color: var(--text-muted);
  text-transform: uppercase;
  transition: color 0.2s ease;
}

.site-nav a:hover {
  color: var(--text-primary);
}
```

- [ ] **Step 2: Add hero styles**

```css
/* ===== HERO ===== */
.hero {
  position: relative;
  padding: 96px 32px 80px;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, #111d3a, var(--bg-base));
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(60, 90, 160, 0.25), transparent);
}

.hero-orb {
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(60, 90, 160, 0.1) 0%, transparent 70%);
  border: 1px solid rgba(90, 122, 170, 0.06);
  pointer-events: none;
}

.hero-orb::after {
  content: '';
  position: absolute;
  inset: 24px;
  border-radius: 50%;
  border: 1px solid rgba(90, 122, 170, 0.04);
}

.hero-eyebrow {
  font-family: var(--font-latin);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 6px;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 20px;
  opacity: 0; /* GSAP animates this in */
}

.hero-name {
  font-family: var(--font-latin);
  font-size: 60px;
  font-weight: 100;
  letter-spacing: 4px;
  line-height: 1.0;
  margin-bottom: 36px;
  overflow: hidden;
}

.hero-name-line1 {
  display: block;
  color: var(--text-primary);
  opacity: 0; /* GSAP */
}

.hero-name-line2 {
  display: block;
  color: rgba(240, 242, 248, 0.45);
  opacity: 0; /* GSAP */
}

.hero-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 56px;
  opacity: 0; /* GSAP */
}

.hero-tags li {
  font-family: var(--font-ja);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 1px;
  color: var(--accent);
  border: 1px solid var(--accent-border);
  padding: 6px 14px;
  border-radius: 20px;
  background: var(--accent-subtle);
  backdrop-filter: blur(4px);
}

.hero-stats {
  display: flex;
  gap: 48px;
  padding-top: 36px;
  border-top: 1px solid var(--border-subtle);
  opacity: 0; /* GSAP */
}

.stat-num {
  display: block;
  font-family: var(--font-latin);
  font-size: 40px;
  font-weight: 100;
  color: var(--text-primary);
  letter-spacing: 2px;
  line-height: 1;
}

.stat-num--small {
  font-size: 22px;
  line-height: 1.3;
}

.stat-plus {
  font-size: 20px;
  color: var(--text-dim);
}

.stat-label {
  display: block;
  font-family: var(--font-latin);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 2px;
  color: var(--text-dim);
  margin-top: 8px;
  text-transform: uppercase;
}
```

- [ ] **Step 3: Reload browser**

Expected: header appears at top with logo and nav. Hero section shows large name text with gradient background. Eyebrow, name, tags, stats are invisible (opacity:0 — GSAP will reveal them in Task 11).

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "feat: header and hero CSS styles"
```

---

## Task 5: CSS — Filter bar + Work Grid

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add filter bar styles**

```css
/* ===== FILTER BAR ===== */
.filter-bar {
  position: sticky;
  top: 57px; /* header height — adjust if header height changes */
  z-index: 90;
  display: flex;
  gap: 0;
  padding: 0 24px;
  background: rgba(9, 12, 20, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.filter-bar::-webkit-scrollbar { display: none; }

.filter-btn {
  font-family: var(--font-latin);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 2px;
  color: var(--text-dim);
  padding: 16px 18px;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  text-transform: uppercase;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.filter-btn:hover {
  color: var(--text-muted);
}

.filter-btn.active {
  color: var(--text-primary);
  border-bottom-color: var(--accent);
}
```

- [ ] **Step 2: Add work grid styles**

```css
/* ===== WORK GRID ===== */
.work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.04);
}

.grid-item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: none;
  opacity: 0; /* GSAP scroll stagger reveals */
}

.grid-item.wide {
  grid-column: span 2;
  aspect-ratio: auto;
  min-height: 260px;
}

.item-bg {
  position: absolute;
  inset: 0;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.grid-item:hover .item-bg {
  transform: scale(1.04);
}

.item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(9, 12, 20, 0.92) 0%, rgba(9, 12, 20, 0.2) 50%, transparent 100%);
}

.item-glass {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.015) 0%, transparent 60%);
}

.item-info {
  position: relative;
  z-index: 2;
  padding: 24px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.grid-item:hover .item-info {
  transform: translateY(-4px);
}

.item-cat {
  font-family: var(--font-latin);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 3px;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 6px;
  transition: color 0.2s ease;
}

.grid-item:hover .item-cat {
  color: #8aaad0;
}

.item-name {
  font-family: var(--font-ja);
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 1px;
  color: var(--text-primary);
  margin-bottom: 4px;
  line-height: 1.4;
}

.item-client {
  font-family: var(--font-ja);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Hidden items (filtered out) */
.grid-item.hidden {
  display: none;
}
```

- [ ] **Step 3: Reload browser**

Expected: filter bar appears below header. Grid shows 42 items in 3-column layout with dark gradient backgrounds, text at bottom. Wide items span 2 columns. Items are still opacity:0 (GSAP will reveal them).

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "feat: filter bar and work grid CSS"
```

---

## Task 6: CSS — About, Awards, Footer

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add about + awards + footer styles**

```css
/* ===== ABOUT SECTION ===== */
.about-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  padding: 96px 48px;
  background: radial-gradient(ellipse 60% 80% at 100% 50%, #0d1828, var(--bg-base));
  border-top: 1px solid var(--border-subtle);
}

.about-eyebrow {
  font-family: var(--font-ja);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 4px;
  color: var(--text-dim);
  margin-bottom: 16px;
  text-transform: uppercase;
}

.about-name {
  font-family: var(--font-latin);
  font-size: 36px;
  font-weight: 100;
  letter-spacing: 3px;
  color: var(--text-primary);
  line-height: 1.1;
  margin-bottom: 32px;
}

.about-body {
  font-family: var(--font-ja);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  line-height: 2.4;
}

/* Awards glass card */
.awards-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 28px 32px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  align-self: start;
}

.awards-title {
  font-family: var(--font-latin);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 4px;
  color: var(--text-dim);
  text-transform: uppercase;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-faint);
}

.awards-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.awards-list li {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-faint);
}

.awards-list li:last-child {
  border-bottom: none;
}

.award-name {
  font-family: var(--font-ja);
  font-size: 12px;
  font-weight: 400;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
  flex: 1;
}

.award-val {
  font-family: var(--font-latin);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 1px;
  color: var(--accent);
  white-space: nowrap;
}

/* ===== FOOTER ===== */
.site-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
}

.footer-logo {
  font-family: var(--font-latin);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 5px;
  color: var(--text-dim);
}

.footer-copy {
  font-family: var(--font-latin);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: #1e2535;
}
```

- [ ] **Step 2: Reload browser, scroll to bottom**

Expected: About section shows 2-column layout — bio on left, glassmorphism awards card on right. Footer visible at bottom. All text minimum 12px.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: about section, awards glassmorphism card, footer CSS"
```

---

## Task 7: CSS — Custom cursor

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add cursor styles**

```css
/* ===== CUSTOM CURSOR ===== */
.cursor-dot {
  position: fixed;
  top: 0; left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease, width 0.2s ease, height 0.2s ease;
  will-change: transform;
}

.cursor-ring {
  position: fixed;
  top: 0; left: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(90, 122, 170, 0.5);
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease, width 0.3s ease, height 0.3s ease, border-color 0.2s ease;
  will-change: transform;
}

/* Hover state: dot hides, ring expands */
body.cursor-hover .cursor-dot {
  opacity: 0;
  width: 0;
  height: 0;
}

body.cursor-hover .cursor-ring {
  width: 48px;
  height: 48px;
  border-color: rgba(90, 122, 170, 0.3);
}
```

- [ ] **Step 2: Verify cursor styles added, defer JS to Task 10**

The cursor elements will be invisible at center until JS runs. No visual check needed yet.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: custom cursor CSS (dot + ring)"
```

---

## Task 8: CSS — Responsive breakpoints

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add responsive breakpoints**

```css
/* ===== RESPONSIVE ===== */

/* Tablet: 768px–1023px */
@media (max-width: 1023px) {
  .hero { padding: 72px 24px 60px; }
  .hero-name { font-size: 40px; letter-spacing: 3px; }
  .hero-orb { width: 200px; height: 200px; }
  .about-section { padding: 64px 32px; gap: 40px; }
  .site-footer { padding: 28px 32px; }

  .work-grid { grid-template-columns: repeat(2, 1fr); }
  /* Wide items: span full width on tablet */
  .grid-item.wide { grid-column: 1 / -1; }
}

/* Mobile: <768px */
@media (max-width: 767px) {
  .site-header { padding: 14px 20px; }
  .site-logo { font-size: 12px; letter-spacing: 3px; }
  .site-nav { gap: 16px; }

  .hero { padding: 56px 20px 48px; }
  .hero-name { font-size: 32px; letter-spacing: 2px; }
  .hero-orb { display: none; }
  .hero-stats { gap: 28px; }
  .stat-num { font-size: 30px; }

  .filter-bar { padding: 0 16px; }
  .filter-btn { padding: 14px 12px; font-size: 12px; }

  /* 1-column grid */
  .work-grid { grid-template-columns: 1fr; }
  /* Override span 2 on mobile */
  .grid-item.wide {
    grid-column: span 1;
    min-height: 200px;
  }
  .grid-item { aspect-ratio: 3 / 2; }

  .about-section {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 48px 20px;
  }
  .about-name { font-size: 28px; }
  .awards-card { padding: 24px 20px; }

  .site-footer { padding: 24px 20px; flex-direction: column; gap: 8px; text-align: center; }
}
```

- [ ] **Step 2: Reload browser, resize window to mobile width**

Expected:
- At <768px: grid collapses to 1 column, wide items no longer span 2
- At 768–1023px: grid is 2-column, wide items span full width
- Hero name shrinks appropriately at each breakpoint

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: responsive breakpoints — tablet 2-col, mobile 1-col grid"
```

---

## Task 9: CSS — Filter bar sticky top offset + polish

**Files:**
- Modify: `style.css`

Note: The filter bar uses `top: 57px` as the header height. Measure the actual rendered header height in browser devtools after Task 4. If different, update this value.

- [ ] **Step 1: Check header height in browser devtools**

Open DevTools → Elements → select `.site-header` → check computed height.
If not 57px, update `.filter-bar { top: Xpx; }` in style.css accordingly.

- [ ] **Step 2: Add smooth scroll offset (so anchors aren't hidden under sticky headers)**

```css
/* Offset for sticky header + filter bar when scrolling to anchors */
#work  { scroll-margin-top: 114px; } /* header + filter bar combined height */
#about { scroll-margin-top: 57px; }  /* header only */
#awards { scroll-margin-top: 57px; }
```

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: scroll-margin-top offsets for sticky header, filter bar top value"
```

---

## Task 10: JS — Custom cursor

**Files:**
- Modify: `main.js`

- [ ] **Step 1: Write cursor code**

```js
// ===== CUSTOM CURSOR =====
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // CSS already hides cursor elements

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  const LERP = 0.12;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state: links, buttons, grid items
  const hoverTargets = 'a, button, .grid-item';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });
})();
```

- [ ] **Step 2: Reload browser, move cursor**

Expected: small blue dot follows cursor exactly. Ring lags behind with lerp easing. On hovering links/buttons/grid items: dot disappears, ring expands.

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: custom cursor — lerp ring, hover state"
```

---

## Task 11: JS — Hero load stagger (GSAP)

**Files:**
- Modify: `main.js`

- [ ] **Step 1: Write hero stagger animation**

```js
// ===== HERO LOAD STAGGER =====
(function initHeroAnimation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Reveal without motion
    document.querySelectorAll('.hero-eyebrow, .hero-name-line1, .hero-name-line2, .hero-tags, .hero-stats')
      .forEach(el => { el.style.opacity = '1'; });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from([
    '.hero-eyebrow',
    '.hero-name-line1',
    '.hero-name-line2',
    '.hero-tags',
    '.hero-stats'
  ], {
    opacity: 0,
    y: 24,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.1,
    delay: 0.2
  });
})();
```

- [ ] **Step 2: Reload browser**

Expected: on page load, hero elements fade in from bottom one after another — eyebrow first, then name line 1, line 2, tags, stats. Total animation ~1s.

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: hero load stagger animation with GSAP"
```

---

## Task 12: JS — Scroll-triggered grid stagger

**Files:**
- Modify: `main.js`

- [ ] **Step 1: Write scroll stagger using IntersectionObserver + GSAP**

```js
// ===== SCROLL STAGGER — GRID ITEMS =====
(function initGridScrollStagger() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.grid-item');

  if (prefersReducedMotion) {
    items.forEach(item => { item.style.opacity = '1'; });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const item = entry.target;
      const siblings = Array.from(item.parentElement.children);
      const visibleSiblings = siblings.filter(el => !el.classList.contains('hidden'));
      const idx = visibleSiblings.indexOf(item);

      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: (idx % 6) * 0.06 // stagger within each row-group
      });

      observer.unobserve(item);
    });
  }, { threshold: 0.08 });

  // Set initial state for GSAP
  gsap.set(items, { opacity: 0, y: 24 });

  items.forEach(item => observer.observe(item));
})();
```

- [ ] **Step 2: Reload browser and scroll down**

Expected: grid items fade up and in as they enter the viewport, staggered in groups. Each item animates only once.

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: scroll-triggered stagger for grid items via IntersectionObserver"
```

---

## Task 13: JS — Filter logic

**Files:**
- Modify: `main.js`

- [ ] **Step 1: Write filter click logic**

```js
// ===== FILTER LOGIC =====
(function initFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items   = document.querySelectorAll('.grid-item');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.filter;

      // Update button states
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      items.forEach(item => {
        const cats = item.dataset.category || '';
        const matches = selected === 'all' || cats.includes(selected);

        if (matches) {
          item.classList.remove('hidden');
          if (prefersReducedMotion) {
            item.style.opacity = '1';
          } else {
            gsap.to(item, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.05 });
          }
        } else {
          if (prefersReducedMotion) {
            item.classList.add('hidden');
          } else {
            gsap.to(item, {
              opacity: 0,
              scale: 0.96,
              duration: 0.2,
              ease: 'power2.in',
              onComplete: () => item.classList.add('hidden')
            });
          }
        }
      });
    });
  });
})();
```

- [ ] **Step 2: Test filter in browser**

Click "UI/UX" — expected: only uiux-tagged items visible, others fade out.
Click "ALL" — expected: all items reappear.
Click "ブランディング" — expected: only brand-tagged items visible.
Click "広告・CM" — expected: ad-tagged items visible (including multi-category items tagged `ad film web`).

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: filter logic — gsap fade in/out, multi-category contains-match"
```

---

## Task 14: JS — Smooth scroll with offset

**Files:**
- Modify: `main.js`

- [ ] **Step 1: Override default anchor scroll to account for sticky headers**

```js
// ===== SMOOTH SCROLL WITH STICKY OFFSET =====
(function initSmoothScroll() {
  const HEADER_HEIGHT = document.querySelector('.site-header').offsetHeight;
  const FILTER_HEIGHT = document.querySelector('.filter-bar').offsetHeight;

  document.querySelectorAll('.site-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      // #work is below filter bar; #about and #awards only below header
      const offset = targetId === 'work' ? HEADER_HEIGHT + FILTER_HEIGHT : HEADER_HEIGHT;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
```

- [ ] **Step 2: Test nav links**

Click "実績" — page scrolls to grid, filter bar visible at top.
Click "プロフィール" — page scrolls to about section, not hidden under headers.
Click "受賞歴" — scrolls to awards card.

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: smooth scroll with sticky header offset"
```

---

## Task 15: Final verification

**Files:** All

- [ ] **Step 1: Full browser check — desktop**

Open `index.html`. Verify:
- [ ] Custom cursor dot and ring move correctly
- [ ] Hero elements stagger in on load
- [ ] Scrolling down reveals grid items with stagger
- [ ] Filter buttons work (all 7 categories)
- [ ] Multi-category items appear in correct filters
- [ ] Grid hover scales image and shifts text up
- [ ] Nav smooth-scrolls to correct sections
- [ ] All text is ≥12px (check in DevTools)
- [ ] Header and filter bar stay sticky while scrolling
- [ ] No console errors

- [ ] **Step 2: Mobile check (DevTools)**

Toggle DevTools device toolbar, set width to 375px. Verify:
- [ ] Grid collapses to 1 column
- [ ] Wide items do not span 2 (span:1 override active)
- [ ] Filter bar scrolls horizontally
- [ ] Hero name is 32px
- [ ] No content overflow

- [ ] **Step 3: Reduced motion check**

In DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Verify:
- [ ] Custom cursor reverts to system cursor
- [ ] Hero elements visible immediately (no stagger animation)
- [ ] Grid items visible on load (no scroll stagger)
- [ ] Filter still works (items hide/show without animation)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: portfolio complete — dark Apple aesthetic, 42 projects, GSAP animations"
```

---

## Reference

- Spec: `docs/superpowers/specs/2026-03-21-portfolio-design.md`
- Color tokens: `--bg-base: #090c14`, `--accent: #5a7aaa`
- Fonts: Inter (Latin), Noto Sans JP (Japanese)
- GSAP CDN: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/`
- Minimum font size: **12px** everywhere
