/* Rohit Maruri — personal site. Scrollspy for the rail, current year. */
(function () {
  'use strict';

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var links = Array.prototype.slice.call(document.querySelectorAll('.rail a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var map = {};
  var targets = [];

  links.forEach(function (a) {
    var el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    map[el.id] = a;
    targets.push(el);
  });

  // Projects, Stack and Education all sit under the "Projects" rail item.
  var grouped = { skills: 'projects', education: 'projects', github: 'projects' };
  Object.keys(grouped).forEach(function (id) {
    var el = document.getElementById(id);
    if (el && map[grouped[id]]) { map[id] = map[grouped[id]]; targets.push(el); }
  });

  function activate(a) {
    links.forEach(function (l) { l.classList.toggle('is-active', l === a); });
  }

  var io = new IntersectionObserver(function (entries) {
    var best = null;
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
    });
    if (best && map[best.target.id]) activate(map[best.target.id]);
  }, { rootMargin: '-15% 0px -70% 0px', threshold: [0, 0.2, 0.5] });

  targets.forEach(function (t) { io.observe(t); });
})();
