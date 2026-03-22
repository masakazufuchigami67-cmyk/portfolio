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

// ===== EYEBROW LETTER-SPACING: FIT TO MASAKAZU WIDTH =====
(function fitEyebrowToName() {
  function calc() {
    const eyebrow = document.querySelector('.hero-eyebrow');
    const nameEl  = document.querySelector('.hero-name-line1'); // match MASAKAZU
    if (!eyebrow || !nameEl) return;

    const targetWidth = nameEl.offsetWidth;
    const text = eyebrow.textContent;

    // Measure at letter-spacing: 0, shrink font-size until it fits within target
    const clone = eyebrow.cloneNode(true);
    clone.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;letter-spacing:0px;opacity:1;pointer-events:none;top:0;left:0;';
    document.body.appendChild(clone);

    let fontSize = parseFloat(getComputedStyle(eyebrow).fontSize);
    clone.style.fontSize = fontSize + 'px';
    while (clone.offsetWidth > targetWidth && fontSize > 8) {
      fontSize -= 0.5;
      clone.style.fontSize = fontSize + 'px';
    }
    eyebrow.style.fontSize = fontSize + 'px';

    const naturalWidth = clone.offsetWidth;
    document.body.removeChild(clone);

    const spacing = Math.max(-1, (targetWidth - naturalWidth) / text.length - 0.2);
    eyebrow.style.letterSpacing = spacing + 'px';
  }

  document.fonts.ready.then(calc);
  window.addEventListener('resize', calc);
})();

// ===== HERO LOAD STAGGER + HEADER LOGO SCROLL =====
(function initHeroAnimation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.hero-eyebrow, .hero-name-line1, .hero-name-line2')
      .forEach(el => { el.style.opacity = '1'; });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Entrance stagger — fromTo ensures we animate TO opacity:1 regardless of CSS value
  gsap.fromTo([
    '.hero-eyebrow',
    '.hero-name-line1',
    '.hero-name-line2'
  ],
  { opacity: 0, y: 24 },
  {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.1,
    delay: 0.2
  });

  // Scroll: hero name fades out → header logo fades in (2行 → 1行の視覚効果)
  gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6
    }
  })
  .to('.hero-name', { opacity: 0, y: -16, ease: 'power1.in' }, 0);
})();

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

// ===== MODAL =====
(function initModal() {
  // Layout: { left: [[idx,...],...], right: [[idx,...],...] } 2-col like PDF
  // or { single: [[idx,...],...] } for full-width grid layouts
  const LAYOUTS = {
    // ── SHIFT ──────────────────────────────────────────────────────────────
    1:  { single: [[0]] },                                                                      // ワスレナイ
    2:  { single: [[0]] },                                                                      // 天才くん
    3:  { single: [[0]] },                                                                      // シフじぃ
    4:  { single: [[0]] },                                                                      // Advanced Dashboard
    // ── M3 ─────────────────────────────────────────────────────────────────
    5:  { single: [[0]] },                                                                      // WHITE JACK
    6:  { single: [[0]] },                                                                      // EBHS
    7:  { single: [[0]] },                                                                      // Ask Doctors
    8:  { single: [[0]] },                                                                      // お医者さんのおせんべい
    // ── 小田急電鉄 ─────────────────────────────────────────────────────────
    9:  { single: [[0]] },                                                                      // WOOMS
    10: { single: [[0]] },                                                                      // EMot
    11: { single: [[0]] },                                                                      // 小田急でんき
    12: { single: [[0]] },                                                                      // ONE
    13: { single: [[0]] },                                                                      // ACT FOR SKY
    14: { single: [[0]] },                                                                      // 登戸駅ドラえもん化
    15: { single: [[0]] },                                                                      // 4&2
    16: { single: [[0]] },                                                                      // 4&2梅ヶ丘
    17: { single: [[0]] },                                                                      // ロマンスカー新型
    18: { single: [[0]] },                                                                      // はじめての、ロマンスカー
    19: { single: [[0]] },                                                                      // 箱根の森から
    20: { single: [[0]] },                                                                      // 小田急ポイントカード
    21: { single: [[0]] },                                                                      // ネスレ日本 Dolce Gusto 1
    22: { single: [[0]] },                                                                      // ネスレ日本 Dolce Gusto 2
    23: { single: [[0]] },                                                                      // リーフィア2021
    24: { single: [[0]] },                                                                      // リーフィア
    25: { single: [[0]] },                                                                      // HELLO NEW ODAKYU
    26: { single: [[0]] },                                                                      // 企業CM 2人
    27: { single: [[0]] },                                                                      // 企業CM 3人
    28: { single: [[0]] },                                                                      // 企業CM 1人
    29: { single: [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15],[16,17]] },                    // page_31
    30: { single: [[0]] },                                                                      // 企業広告 日経新聞
    31: { single: [[0]] },                                                                      // 周年ビジュアル
    32: { single: [[0,1,2],[3,4,5],[6,7,8]] },                                                  // page_34
    33: { single: [[0]] },                                                                      // 江ノ電2019
    34: { single: [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12]] },                                     // page_36
    35: { single: [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12]] },                                     // page_37
    36: { single: [[0]] },                                                                      // 大山キャンペーン
    37: { single: [[0]] },                                                                      // 大山観光サイン
    38: { single: [[0]] },                                                                      // 湘南GATE
    39: { single: [[0]] },                                                                      // 新宿サザンテラス
    40: { single: [[0]] },                                                                      // 小田急百貨店
    41: { single: [[0]] },                                                                      // 路線図フットマーク
    42: { single: [[0]] },                                                                      // Satellite Train
  };

  function makeDefaultLayout(n) {
    if (n === 0) return { single: [] };
    if (n === 1) return { single: [[0]] };
    if (n === 2) return { left: [[0]], right: [[1]] };
    const left = [[0]];
    const right = [[1]];
    let addToLeft = true;
    let i = 2;
    while (i < n) {
      const row = (i + 1 < n) ? [i, i + 1] : [i];
      if (addToLeft) left.push(row); else right.push(row);
      i += row.length;
      addToLeft = !addToLeft;
    }
    return { left, right };
  }

  function buildGallery(layout, pages, name, galleryEl) {
    galleryEl.innerHTML = '';

    function makeImg(idx) {
      const img = document.createElement('img');
      img.alt = name;
      gsap.set(img, { opacity: 0, y: 12 });
      const onLoad = () => {
        gsap.to(img, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          delay: idx * 0.045
        });
      };
      img.addEventListener('load', onLoad, { once: true });
      img.src = pages[idx];
      if (img.complete) onLoad();
      return img;
    }

    function makeColRow(idxArr) {
      const valid = idxArr.filter(i => i < pages.length);
      if (!valid.length) return null;
      const row = document.createElement('div');
      row.className = 'gal-col-row';
      row.dataset.cols = valid.length;
      valid.forEach(i => row.appendChild(makeImg(i)));
      return row;
    }

    if (layout.mid) {
      // 3-column layout: left / mid / right
      const wrap = document.createElement('div');
      wrap.className = 'gal-3col';
      ['left', 'mid', 'right'].forEach(side => {
        const rows = layout[side] || [];
        const col  = document.createElement('div');
        col.className = 'gal-col';
        rows.forEach(row => {
          const r = makeColRow(row);
          if (r) col.appendChild(r);
        });
        if (col.children.length) wrap.appendChild(col);
      });
      if (wrap.children.length) galleryEl.appendChild(wrap);
    } else if (layout.single) {
      const wrap = document.createElement('div');
      wrap.className = 'gal-single';
      layout.single.forEach(row => {
        const r = makeColRow(row);
        if (r) wrap.appendChild(r);
      });
      galleryEl.appendChild(wrap);
    } else {
      const wrap = document.createElement('div');
      wrap.className = 'gal-2col';
      ['left', 'right'].forEach(side => {
        const rows = layout[side] || [];
        const col  = document.createElement('div');
        col.className = 'gal-col';
        rows.forEach(row => {
          const r = makeColRow(row);
          if (r) col.appendChild(r);
        });
        if (col.children.length) wrap.appendChild(col);
      });
      if (wrap.children.length) galleryEl.appendChild(wrap);
    }
  }

  const overlay  = document.getElementById('modal');
  const closeBtn = overlay.querySelector('.modal-close');
  const prevBtn  = document.querySelector('.modal-prev');
  const nextBtn  = document.querySelector('.modal-next');
  const catEl    = document.getElementById('modal-cat');
  const nameEl   = document.getElementById('modal-name');
  const clientEl = document.getElementById('modal-client');
  const gallery  = document.getElementById('modal-gallery');

  let currentCardIndex = -1;

  function preloadPages(pages) {
    pages.forEach(url => { const i = new Image(); i.src = url; });
  }

  function preloadAdjacentCards() {
    const cards = getVisibleCards();
    [currentCardIndex - 1, currentCardIndex + 1].forEach(i => {
      if (i < 0 || i >= cards.length) return;
      const pages = (cards[i].dataset.pages || '').split(',').map(s => s.trim()).filter(Boolean);
      preloadPages(pages);
    });
  }

  function getVisibleCards() {
    return Array.from(document.querySelectorAll('.grid-item')).filter(el => el.style.display !== 'none' && !el.classList.contains('hidden'));
  }

  function updateNavButtons() {
    const cards = getVisibleCards();
    prevBtn.disabled = currentCardIndex <= 0;
    nextBtn.disabled = currentCardIndex >= cards.length - 1;
  }

  function loadCard(card) {
    const pages  = (card.dataset.pages || '').split(',').map(s => s.trim()).filter(Boolean);
    const proj   = parseInt(card.dataset.proj, 10);
    const cat    = card.querySelector('.item-cat')?.textContent    || '';
    const name   = card.querySelector('.item-name')?.textContent   || '';
    const client = card.querySelector('.item-client')?.textContent || '';

    catEl.textContent    = cat;
    nameEl.textContent   = name;
    clientEl.textContent = client;

    const layout = LAYOUTS[proj] || makeDefaultLayout(pages.length);
    buildGallery(layout, pages, name, gallery);
  }

  function loadCardWithTransition(card) {
    gsap.to(gallery, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        loadCard(card);
        gsap.set(gallery, { opacity: 1 });
      }
    });
  }

  function openModal(card) {
    const cards = getVisibleCards();
    currentCardIndex = cards.indexOf(card);
    loadCard(card);
    updateNavButtons();

    overlay.removeAttribute('hidden');
    prevBtn.removeAttribute('hidden');
    nextBtn.removeAttribute('hidden');
    // rAF lets display:flex apply before opacity transition
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    preloadAdjacentCards();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.addEventListener('transitionend', () => {
      overlay.setAttribute('hidden', '');
      prevBtn.setAttribute('hidden', '');
      nextBtn.setAttribute('hidden', '');
      document.body.style.overflow = '';
      gallery.innerHTML = '';
    }, { once: true });
  }

  // Open on card click; preload images on hover
  document.querySelectorAll('.grid-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const pages = (card.dataset.pages || '').split(',').map(s => s.trim()).filter(Boolean);
      preloadPages(pages);
    }, { once: true });
    card.addEventListener('click', () => openModal(card));
  });

  // Prev / Next navigation
  prevBtn.addEventListener('click', () => {
    if (currentCardIndex <= 0) return;
    const cards = getVisibleCards();
    currentCardIndex--;
    loadCardWithTransition(cards[currentCardIndex]);
    updateNavButtons();
    preloadAdjacentCards();
    overlay.scrollTop = 0;
  });

  nextBtn.addEventListener('click', () => {
    const cards = getVisibleCards();
    if (currentCardIndex >= cards.length - 1) return;
    currentCardIndex++;
    loadCardWithTransition(cards[currentCardIndex]);
    updateNavButtons();
    preloadAdjacentCards();
    overlay.scrollTop = 0;
  });

  // Close on button
  closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click (not on inner content)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape; arrow keys for prev/next
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft')  prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
})();

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
