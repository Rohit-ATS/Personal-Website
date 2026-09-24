/* =========================================================
   Rohit Maruri — personal site
   Vanilla JS. Everything degrades: no JS still reads fine.
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- year ---------- */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- theme ----------
     Warm paper is the default. Dark is the same terracotta with the
     paper turned down, so it is opt-in rather than an OS guess. */
  var root = document.documentElement;
  var toggle = $('#themeToggle');
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) { /* private mode */ }

  if (stored === 'dark') root.setAttribute('data-theme', 'dark');
  else if (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  function syncToggleLabel() {
    if (!toggle) return;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }
  syncToggleLabel();

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (next === 'dark') root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
      syncToggleLabel();
    });
  }

  /* ---------- nav: sticky state, scroll progress, scrollspy ---------- */
  var nav = $('#nav');
  var bar = $('#progressBar');
  var navLinks = $$('.nav-links a');
  var ticking = false;

  // Only the sections a nav tab actually points at. The ones in between
  // (principles, stack, resume) keep the preceding tab lit rather than
  // clearing it, so the pill never goes blank mid-page.
  var spy = navLinks.map(function (a) {
    var id = a.getAttribute('href').slice(1);
    return { link: a, el: document.getElementById(id) };
  }).filter(function (s) { return s.el; });

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (nav) nav.classList.toggle('stuck', y > 16);

    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }

    var probe = y + window.innerHeight * 0.35;
    var active = spy.length ? spy[0] : null;
    for (var i = 0; i < spy.length; i++) {
      if (spy[i].el.offsetTop <= probe) active = spy[i];
    }
    spy.forEach(function (s) { s.link.classList.toggle('active', s === active); });

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var menuBtn = $('#menuBtn');
  var mobileMenu = $('#mobileMenu');

  function setMenu(open) {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.hidden = !open;
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', mobileMenu).forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = $$('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        window.setTimeout(function () { el.classList.add('in'); }, i * 65);
        revealer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- count-up stats ---------- */
  var counters = $$('[data-count]');
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-dec') || '0', 10);
    if (reduced) { el.textContent = target.toFixed(decimals); return; }

    var duration = 1300;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) window.requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    window.requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(runCounter);
  } else {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }
})();
