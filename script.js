(function () {
  var root = document.documentElement;
  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  var themeButtons = Array.prototype.slice.call(document.querySelectorAll('.theme-btn'));
  var indicator = document.querySelector('.theme-indicator');

  function resolvedFromMode(mode) {
    return mode === 'system' ? (mql.matches ? 'dark' : 'light') : mode;
  }

  function applyMode(mode, persist) {
    root.setAttribute('data-theme-pref', mode);
    root.setAttribute('data-theme', resolvedFromMode(mode));
    if (persist) localStorage.setItem('theme', mode);

    themeButtons.forEach(function (btn) {
      var active = btn.getAttribute('data-mode') === mode;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (active) moveIndicator(btn);
    });
  }

  function moveIndicator(btn) {
    if (!indicator) return;
    indicator.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
  }

  themeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyMode(btn.getAttribute('data-mode'), true);
    });
  });

  mql.addEventListener('change', function () {
    var current = root.getAttribute('data-theme-pref');
    if (current === 'system') applyMode('system', false);
  });

  window.addEventListener('resize', function () {
    var current = themeButtons.find(function (b) { return b.getAttribute('aria-pressed') === 'true'; });
    if (current) moveIndicator(current);
  });

  // Initialize toggle UI to match the pre-set theme (set inline in <head> before paint)
  var initialMode = root.getAttribute('data-theme-pref') || 'system';
  window.requestAnimationFrame(function () { applyMode(initialMode, false); });

  // ---------- Routing ----------
  var views = Array.prototype.slice.call(document.querySelectorAll('.view'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var validRoutes = ['home', 'about', 'projects'];

  function showRoute(route) {
    if (validRoutes.indexOf(route) === -1) route = 'home';
    views.forEach(function (v) {
      v.classList.toggle('active', v.id === 'view-' + route);
    });
    navLinks.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('data-route') === route);
    });
  }

  function routeFromHash() {
    return (window.location.hash || '#home').replace('#', '');
  }

  window.addEventListener('hashchange', function () {
    showRoute(routeFromHash());
  });

  showRoute(routeFromHash());
})();
