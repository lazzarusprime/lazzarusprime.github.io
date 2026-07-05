/* ═══════════════════════════════════════════════════════════════
   theme.js — Lazzarus Prime site-wide theme engine
   Include on every page alongside theme.css, right before that
   page's own <style> block so the theme is set before first paint.
   ═══════════════════════════════════════════════════════════════ */

const THEMES = [
  { id: 'dark-metal', name: 'Dark Metal',   emoji: '🖤' },
  { id: 'fire',       name: 'Fire Mode',    emoji: '🔥' },
  { id: 'synthwave',  name: 'Synthwave',    emoji: '🌆' },
  { id: 'arcade',     name: 'Retro Arcade', emoji: '👾' },
];

/* Apply saved theme immediately, before body renders, to avoid a flash */
(function () {
  const saved = localStorage.getItem('lp-theme') || 'dark-metal';
  document.documentElement.setAttribute('data-theme', saved);
  if (saved === 'arcade') _lpLoadArcadeFont();
})();

function _lpLoadArcadeFont() {
  if (document.getElementById('arcadeFontLink')) return;
  const link = document.createElement('link');
  link.id = 'arcadeFontLink';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
  document.head.appendChild(link);
}

function setTheme(id) {
  document.documentElement.setAttribute('data-theme', id);
  localStorage.setItem('lp-theme', id);
  if (id === 'arcade') _lpLoadArcadeFont();
  closeThemeMenu();
  const active = THEMES.find(t => t.id === id);
  if (active) _lpThemeToast(active);
  const menu = document.getElementById('themeMenu');
  if (menu) { menu.dataset.built = ''; }
}

function _lpThemeToast(theme) {
  let t = document.getElementById('themeToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'themeToast';
    t.className = 'theme-toast';
    document.body.appendChild(t);
  }
  t.textContent = `${theme.emoji} ${theme.name}`;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 1600);
}

function buildThemeMenu() {
  const menu = document.getElementById('themeMenu');
  if (!menu) return;
  const current = document.documentElement.getAttribute('data-theme') || 'dark-metal';
  menu.innerHTML = THEMES.map(t =>
    `<button class="theme-option${t.id === current ? ' active' : ''}" onclick="setTheme('${t.id}')">${t.emoji} ${t.name}</button>`
  ).join('');
  menu.dataset.built = '1';
}

function toggleThemeMenu() {
  const menu = document.getElementById('themeMenu');
  if (!menu) return;
  if (!menu.dataset.built) buildThemeMenu();
  menu.classList.toggle('open');
}

function closeThemeMenu() {
  const menu = document.getElementById('themeMenu');
  if (menu) menu.classList.remove('open');
}

document.addEventListener('click', e => {
  const sw = document.getElementById('themeSwitcher');
  if (sw && !sw.contains(e.target)) closeThemeMenu();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeThemeMenu(); });
