# Portfolio Design Spec — Masakazu Fuchigami
Date: 2026-03-21

## Overview

Single-page portfolio website for creative director Masakazu Fuchigami. Dark, Apple-quality aesthetic with glassmorphism, filterable project grid, custom cursor, and GSAP-powered animations.

---

## Decisions

| Item | Decision |
|---|---|
| Type | Single HTML file + CSS + vanilla JS (GSAP) |
| Language | Japanese only |
| Color direction | Graphite × Blue-grey (Cool Dark) |
| Layout | Filterable grid |
| Animation | Stagger + custom cursor |
| Quality reference | Apple — frosted glass, sharp contrast, translucency |
| Min text size | 12px |

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#090c14` | Page background |
| `--bg-secondary` | `#080a10` | Footer, deepest areas |
| `--bg-surface` | `rgba(255,255,255,0.02)` | Glass card surfaces |
| `--border-subtle` | `rgba(255,255,255,0.06)` | 1px borders (standard) |
| `--border-faint` | `rgba(255,255,255,0.04)` | Dividers inside cards |
| `--text-primary` | `#f0f2f8` | Headlines, main text |
| `--text-secondary` | `rgba(240,242,248,0.4)` | Body copy, descriptions |
| `--text-muted` | `#4a5568` | Nav, labels |
| `--text-dim` | `#3a4a6a` | Eyebrows, metadata |
| `--accent` | `#5a7aaa` | Category labels, highlights |
| `--accent-subtle` | `rgba(90,122,170,0.06)` | Tag backgrounds |
| `--accent-border` | `rgba(90,122,170,0.2)` | Tag borders |
| `--gradient-hero` | `radial-gradient(ellipse 80% 60% at 50% 0%, #111d3a, #090c14)` | Hero section |
| `--gradient-about` | `radial-gradient(ellipse 60% 80% at 100% 50%, #0d1828, #090c14)` | About section |

---

## Typography

| Element | Font | Weight | Size | Letter-spacing |
|---|---|---|---|---|
| Site logo | Helvetica Neue / Inter | 300 | 13px | 5px |
| Nav links | Helvetica Neue / Inter | 400 | 12px | 2px |
| Hero eyebrow | Helvetica Neue / Inter | 400 | 12px | 6px |
| Hero name | Helvetica Neue / Inter | 100 | 56px (desktop) / 36px (mobile) | 4px |
| Hero tag | Noto Sans JP / Inter | 400 | 12px | 1px |
| Stat number | Helvetica Neue / Inter | 100 | 36px | 2px |
| Stat label | Helvetica Neue / Inter | 400 | 12px | 2px |
| Filter button | Helvetica Neue / Inter | 400 | 12px | 2px |
| Grid category | Helvetica Neue / Inter | 400 | 12px | 3px |
| Grid title | Noto Sans JP | 300 | 14px | 1px |
| Grid client | Noto Sans JP | 400 | 12px | 1px |
| About heading | Helvetica Neue / Inter | 100 | 32px | 3px |
| About body | Noto Sans JP | 300 | 12px | 0.5px |
| Award name | Noto Sans JP | 400 | 12px | 0.5px |
| Award value | Helvetica Neue / Inter | 400 | 12px | 1px |
| Section eyebrow | Helvetica Neue / Inter | 400 | 12px | 4px |
| Footer | Helvetica Neue / Inter | 300 | 12px | 5px |

**Rule: Minimum font size is 12px across all elements.**

Fonts to load:
- `Inter` (Latin) — weights 100, 300, 400 via Google Fonts
- `Noto Sans JP` (Japanese) — weights 100, 300, 400 via Google Fonts

CSS font stacks (priority order — Inter listed before Helvetica Neue so the loaded web font takes precedence):
```css
--font-latin: 'Inter', 'Helvetica Neue', Arial, sans-serif;
--font-ja:    'Noto Sans JP', 'Helvetica Neue', Arial, sans-serif;
```
Use `--font-latin` for all-Latin content (logo, nav, stats, eyebrows). Use `--font-ja` for Japanese text and mixed content.

---

## Page Structure

```
┌─────────────────────────────────────┐
│  HEADER (sticky, frosted glass)     │
├─────────────────────────────────────┤
│  HERO                               │
│  - Eyebrow / Name / Tags / Stats    │
│  - Decorative orb (right)           │
├─────────────────────────────────────┤
│  FILTER BAR (sticky below header)   │
│  ALL / ブランディング / UI/UX /      │
│  広告・CM / 映像 / 空間・サイン / WEB │
├─────────────────────────────────────┤
│  WORK GRID                          │
│  - 3-column, gap 1px                │
│  - Some items span 2 columns        │
│  - 42 project cards                 │
├─────────────────────────────────────┤
│  ABOUT + AWARDS                     │
│  - 2-column: bio left / glass right │
├─────────────────────────────────────┤
│  FOOTER                             │
└─────────────────────────────────────┘
```

---

## Section Specs

### Header
- Position: `sticky`, `top: 0`, `z-index: 100`
- Background: `rgba(9,12,20,0.6)` + `backdrop-filter: blur(20px)`
- Border-bottom: `1px solid rgba(255,255,255,0.06)`
- Left: logo `MASAKAZU FUCHIGAMI` (letter-spacing 5px)
- Right: nav links — 実績 / プロフィール / 受賞歴
- Nav links scroll to section anchors (smooth)

### Hero
- Top line: `1px` gradient line (`rgba(60,90,160,0.25)`)
- Background: radial gradient `#111d3a → #090c14`
- Decorative orb: absolute positioned, right side, `280px` circle with subtle border + radial glow
- Eyebrow: `CREATIVE DIRECTOR` — 12px, letter-spacing 6px, `--accent`
- Name: two `<span>` blocks — first line full opacity, second line 50% opacity
- Tags: pill-shaped, `border-radius: 20px`, glassmorphism background
- Stats: 3 items separated by `border-top: 1px solid rgba(255,255,255,0.06)`
  - 11+ 受賞・ノミネート
  - 42+ プロジェクト
  - GOOD DESIGN 金賞・Best100

### Filter Bar
- Position: sticky below header
- `z-index: 90` (below header's z-index: 100)
- Background: `rgba(9,12,20,0.8)` + `backdrop-filter: blur(12px)`
- Active state: `color: #f0f2f8`, `border-bottom: 2px solid #5a7aaa`
- Categories map (button label → data-category value):
  - ALL → show all items
  - ブランディング → `brand`
  - UI/UX → `uiux`
  - 広告・CM → `ad`
  - 映像 → `film`
  - 空間・サイン → `space`
  - WEB → `web`
- Multi-category format: `data-category` is a space-separated string (e.g., `data-category="uiux web brand"`)
- Match rule: an item is shown if its `data-category` attribute **contains** the selected category string (e.g., `item.dataset.category.includes(selectedCategory)`)
- ALL filter: show all items regardless of category

### Work Grid
- Layout: `display: grid`, `grid-template-columns: repeat(3, 1fr)`, `gap: 1px`, `background: rgba(255,255,255,0.04)`
- Each item has `data-category` attribute for filtering
- Some items: `grid-column: span 2` (large/featured works)
- **Mobile override**: at `<768px`, all `grid-column: span 2` items revert to `grid-column: span 1` via media query
- Grid item internals:
  - `.item-bg` — gradient background (each project has a unique dark gradient)
  - `.item-overlay` — `linear-gradient(to top, rgba(9,12,20,0.9) 0%, transparent 100%)`
  - `.item-glass` — `linear-gradient(135deg, rgba(255,255,255,0.02), transparent)`
  - `.item-info` — positioned at bottom, z-index 2
- Hover: `.item-bg` scale to `1.04`, `transition: 0.6s cubic-bezier(0.16,1,0.3,1)`

### Project Data (42 items)

| # | Name | Client | Categories | Wide |
|---|---|---|---|---|
| 1 | ワスレナイ | SHIFT | uiux, web | ✓ |
| 2 | 天才くん | SHIFT | uiux, web, brand | |
| 3 | シフじぃ | SHIFT | uiux | |
| 4 | Advanced Dashboard | SHIFT | uiux, brand | |
| 5 | WHITE JACK project | M3 | brand, film, web | ✓ |
| 6 | EBHS | M3 | brand, web | |
| 7 | Ask Doctors総研 | M3 | ad, brand | |
| 8 | お医者さんのおせんべい | M3 | brand | |
| 9 | WOOMS | 小田急電鉄 | brand, web, film, space | ✓ |
| 10 | EMot | 小田急電鉄 | brand, web, film | |
| 11 | 小田急でんき | 小田急電鉄 | brand, ad, film, web | |
| 12 | ONE（オーネ） | 小田急電鉄 | brand, web | |
| 13 | ACT FOR SKY | — | web | |
| 14 | 登戸駅 ドラえもん化 | 小田急電鉄 | brand, space | |
| 15 | 4&2 | 小田急電鉄 | brand, space, web | ✓ |
| 16 | 4&2 梅ヶ丘 | 小田急電鉄 | space | |
| 17 | ロマンスカー新型デビュー | 小田急電鉄 | ad, brand | ✓ |
| 18 | はじめての、ロマンスカー | 小田急電鉄 | ad, web | |
| 19 | 箱根の森から | 小田急電鉄 | brand, web | |
| 20 | 小田急ポイントカード | 小田急電鉄 | ad | |
| 21 | Nescafé Dolce Gusto (1) | ネスレ日本 | ad, brand | |
| 22 | Nescafé Dolce Gusto (2) | ネスレ日本 | ad | |
| 23 | リーフィア 2021 | 小田急不動産 | ad, film | |
| 24 | リーフィア | 小田急不動産 | ad, film | |
| 25 | HELLO NEW ODAKYU! | 小田急電鉄 | ad, film | ✓ |
| 26 | 企業CM「世界に一つの日々と」2人 | 小田急電鉄 | film | |
| 27 | 企業CM「世界に一つの日々と」3人 | 小田急電鉄 | film | |
| 28 | 企業CM「世界に一つの日々と」1人 | 小田急電鉄 | film | |
| 29 | 企業CMキャンペーンサイト | 小田急電鉄 | film, web | |
| 30 | 企業広告/日経新聞 | 小田急電鉄 | ad | |
| 31 | 周年ビジュアル | 小田急不動産 | ad | |
| 32 | そこまでやるの！？ | 小田急不動産 | ad, film, web | |
| 33 | 江ノ電キャンペーン 2019 | 小田急電鉄 | ad, film, web | ✓ |
| 34 | 江ノ電キャンペーン 2018 | 小田急電鉄 | ad, film, web | |
| 35 | 江ノ電キャンペーン 2017 | 小田急電鉄 | ad, film, web | |
| 36 | 大山キャンペーン | 小田急電鉄 | brand, ad, film, web, space | ✓ |
| 37 | 大山観光サイン | 伊勢原市 | space | |
| 38 | 湘南GATE | 小田急電鉄 | brand | |
| 39 | 新宿サザンテラス | 小田急電鉄 | brand, space | |
| 40 | 小田急百貨店 | 小田急電鉄 | ad, web | |
| 41 | 路線図・ロマンスカーフットマーク | 小田急電鉄 | space, brand | |
| 42 | Satellite Train | 小田急電鉄 | web, brand | |

### About Section
- 2-column grid (`1fr 1fr`), gap `64px`
- Left: name block + bio text
  - Japanese eyebrow: `クリエイティブディレクター`
  - English name: `MASAKAZU / FUCHIGAMI` (two lines, weight 100)
  - Bio (final copy from PDF):
    ```
    専門・得意領域：
    ブランディング、ビジョニング
    統合型コミュニケーションデザイン
    戦略、コンセプト、アイデンティティの開発
    ```
- Right: glassmorphism card
  - `background: rgba(255,255,255,0.02)`
  - `border: 1px solid rgba(255,255,255,0.06)`
  - `border-radius: 12px`
  - `backdrop-filter: blur(20px)`
  - Awards list with `border-bottom: 1px solid rgba(255,255,255,0.04)` separators

### Awards Content
- ACC TOKYO CREATIVITY AWARDS — シルバー
- GOOD DESIGN AWARD — 金賞・Best100
- SDA Award — ゴールド
- 日本空間デザイン賞 — ブロンズ
- ディスプレイ産業賞 — 優秀賞
- One Screen Film Festival — finalist
- AD STARS — finalist
- JAA 消費者が選んだ広告コンクール — 入賞
- 観光映像大賞 旅もじゃ賞
- 日本観光ポスターコンクール — 国土交通大臣賞
- JAAA クリエイティブ・オブ・ザ・イヤー — ノミネート

### Footer
- `padding: 32px`
- Left: `MF` (logo mark, letter-spacing 5px)
- Right: `© 2026 Masakazu Fuchigami. All rights reserved.`
- `background: #080a10`

---

## Animation Spec

### Custom Cursor
- Two layers: small dot (6px, `#5a7aaa`) + ring (28px, border `1px solid #3a4a6a`)
- Ring follows with lerp: `ring.x += (cursor.x - ring.x) * 0.12` per rAF
- On hoverable elements (links, buttons, grid items): dot hides, ring expands to 48px + opacity 0.4
- `pointer-events: none` on cursor elements
- Hide default cursor: `cursor: none` on `body`

### Page Load (hero stagger)
- All hero children get `opacity: 0; transform: translateY(20px)` initially
- GSAP `stagger: 0.08s`, `duration: 0.9`, `ease: power3.out`
- Sequence: eyebrow → name line 1 → name line 2 → tags → stats

### Scroll-triggered grid stagger
- `IntersectionObserver` with `threshold: 0.1`
- On intersection: GSAP `from { opacity:0, y:24 }` to `{ opacity:1, y:0 }`, `duration:0.7`, `ease:power2.out`
- Grid items stagger by `index * 0.06s` within each observed batch

### Filter animation (CSS + GSAP, no Flip plugin required)
- GSAP Flip is a Club GSAP plugin not available on public CDNs. Use a free-tier approach instead.
- On filter click:
  1. Matching items: `gsap.to(item, { opacity:1, scale:1, duration:0.4, ease:'power2.out', stagger:0.03 })`
  2. Non-matching items: `gsap.to(item, { opacity:0, scale:0.96, duration:0.25, ease:'power2.in' })` then `display:none`
  3. On show: set `display:block` first, then animate in
- Active filter button: `border-bottom: 2px solid #5a7aaa` with CSS `transition: border-color 0.3s`

### Grid item hover
- `.item-bg`: `transform: scale(1.04)`, `transition: 0.6s cubic-bezier(0.16,1,0.3,1)`
- `.item-info`: slight upward shift `translateY(-4px)` on hover
- Category label brightens: `color: #8aaad0`

### Smooth scroll
- Header nav links: `scroll-behavior: smooth` + manual offset for sticky header height

---

## File Structure

```
portfolio/
├── index.html          ← single page (all content)
├── style.css           ← all styles
├── main.js             ← GSAP animations + filter logic + cursor
└── assets/
    └── (project screenshots if available)
```

---

## External Dependencies

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400&family=Noto+Sans+JP:wght@100;300;400&display=swap" rel="stylesheet">

<!-- GSAP core + ScrollTrigger (both available on cdnjs, free tier) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<!-- Note: GSAP Flip is Club GSAP only — filter animation uses gsap.to() approach instead (see Animation Spec) -->
```

---

## Accessibility & Constraints

- All text: minimum 12px
- `prefers-reduced-motion`: disable stagger/translate animations and custom cursor lerp animation; revert to default system cursor; keep opacity fades only
- Color contrast: primary text `#f0f2f8` on `#090c14` — passes WCAG AA
- Filter buttons: keyboard navigable, `aria-pressed` state
- Grid items: `role="article"` + `aria-label` with project name

---

## Responsive Breakpoints

| Breakpoint | Grid | Hero name | Notes |
|---|---|---|---|
| ≥1024px | 3 columns | 56px | Full layout |
| 768–1023px | 2 columns | 40px | Wide items span full width |
| <768px | 1 column | 32px | Filter scrolls horizontally |
