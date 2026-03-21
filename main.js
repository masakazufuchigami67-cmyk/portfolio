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
