// Theme: saved choice, else the visitor's system setting.
(function () {
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';

  document.addEventListener('DOMContentLoaded', function () {
    var bulb = document.querySelector('.bulb');
    function label() {
      var isDark = document.documentElement.dataset.theme === 'dark';
      bulb.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    label();
    bulb.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      bulb.classList.remove('swing'); void bulb.offsetWidth; bulb.classList.add('swing');
      label();
    });

    // Email address is assembled on click so scrapers never see it in the page.
    document.querySelectorAll('.email').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'mailto:' + a.dataset.u + '@' + a.dataset.d;
      });
    });
  });
})();
