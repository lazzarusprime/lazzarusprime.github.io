/* ═══════════════════════════════════════════════════════════════
   chrome.js — Lazzarus Prime shared site chrome (header/nav/footer)
   Single source of truth for navigation + social links.
   Include on every page, then call:
     renderHeader({page:'gear', title:'Gear & Guitars', search:'nav'})
     renderFooter()
   right after the #site-header / #site-footer placeholder divs.
   ═══════════════════════════════════════════════════════════════ */

const NAV_PRIMARY = [
  { id: 'home',    icon: '🏠', label: 'Home',    href: 'index.html?nosplash=1' },
  { id: 'artists', icon: '🎸', label: 'Artists', href: 'artists.html' },
];

const NAV_TOOLS = [
  { id: 'tuner',      icon: '🎵', label: 'Tuner',           href: 'tuner.html' },
  { id: 'metronome',  icon: '🥁', label: 'Metronome',       href: 'metronome.html' },
  { id: 'groove',     icon: '🔥', label: 'Groove Station',  href: 'groove.html' },
  { id: 'drums',      icon: '🪘', label: 'Drums',           href: 'drums.html' },
  { id: 'chords',     icon: '🎼', label: 'Chords & Scales', href: 'chords.html' },
  { id: 'theory',     icon: '📚', label: 'Music Theory',    href: 'theory.html' },
];

const NAV_MORE = [
  { id: 'stats',  icon: '📊', label: 'Stats',  href: 'stats.html' },
  { id: 'gear',   icon: '🎛️', label: 'Gear',   href: 'gear.html' },
  { id: 'videos', icon: '📺', label: 'Videos', href: 'videos.html' },
];

const SOCIAL_LINKS = [
  { icon: '🎮', label: 'Twitch',     href: 'https://www.twitch.tv/lazzarus_prime' },
  { icon: '⚡', label: 'Kick',       href: 'https://kick.com/lazzarus-prime/about' },
  { icon: '📸', label: 'Instagram',  href: 'https://www.instagram.com/lazzarus__prime/' },
  { icon: '▶️', label: 'YouTube',    href: 'https://www.youtube.com/@LazzarusPrime' },
  { icon: '💬', label: 'Discord',    href: 'https://discord.gg/WCg5sktJNM' },
  { icon: '👕', label: 'Merch',      href: 'https://lazzarus-prime-shop.fourthwall.com/' },
  { icon: '🎶', label: 'RockList',   href: 'https://rocklist.live/lazzarus-prime' },
  { icon: '💰', label: 'Donate',     href: 'https://streamlabs.com/lazzarus_prime/tip' },
];

function _inGroup(list, page) { return list.some(i => i.id === page); }

function _navBtn(item, activePage) {
  const active = item.id === activePage ? ' active-page' : '';
  return `<button class="nav-btn${active}" onclick="location.href='${item.href}'">${item.icon} ${item.label}</button>`;
}

function _dropdown(id, label, items, activePage) {
  const groupActive = _inGroup(items, activePage) ? ' active-page' : '';
  const rows = items.map(i => {
    const active = i.id === activePage ? ' active' : '';
    return `<a class="nav-dropdown-item${active}" href="${i.href}">${i.icon} ${i.label}</a>`;
  }).join('');
  return `<div class="nav-dropdown" id="${id}">
    <button class="nav-btn${groupActive}" onclick="toggleNavDropdown('${id}')">${label} ▾</button>
    <div class="nav-dropdown-menu">${rows}</div>
  </div>`;
}

function toggleNavDropdown(id) {
  document.querySelectorAll('.nav-dropdown').forEach(d => { if (d.id !== id) d.classList.remove('open'); });
  document.getElementById(id).classList.toggle('open');
}
document.addEventListener('click', e => {
  document.querySelectorAll('.nav-dropdown.open').forEach(d => { if (!d.contains(e.target)) d.classList.remove('open'); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
});

/* ── Header ──────────────────────────────────────────────── */
function renderHeader(opts) {
  const el = document.getElementById('site-header');
  if (!el) return;
  const { page, title, search = 'nav', showNav = true } = opts;

  const socialRows = SOCIAL_LINKS.map(s =>
    `<a href="${s.href}" target="_blank" rel="noopener">${s.icon} ${s.label}</a>`
  ).join('');

  const SEARCH_VARIANTS = {
    local:   `<div class="search-row">
                <input id="searchBox" placeholder="Search artist or song…" oninput="handleSearchInput()" autocomplete="off">
                <button id="clearBtn" class="clearBtn" onclick="clearSearch()">✕</button>
              </div>`,
    nav:     `<div class="search-row">
                <input id="searchBox" placeholder="Search artist or song…" oninput="navSearch()" autocomplete="off">
                <button id="clearBtn" class="clearBtn" onclick="clearNavSearch()">✕</button>
              </div>`,
    artists: `<div class="search-row">
                <input id="searchBox" placeholder="Search artist…" oninput="handleSearch()" autocomplete="off">
              </div>`,
    none: '',
  };
  const searchRow = SEARCH_VARIANTS[search] ?? SEARCH_VARIANTS.nav;

  const RANDOM_HANDLERS = { home: 'randomArtistFilter(this)', artists: 'randomArtist(this)' };
  const randomHandler = RANDOM_HANDLERS[page] || 'randomSong(this)';

  const navRow = !showNav ? '' : `<div class="topBar">
    <div class="nav-row">
      ${NAV_PRIMARY.map(i => _navBtn(i, page)).join('')}
      <button class="nav-btn" id="randomBtn" onclick="${randomHandler}">🎲 Random</button>
      ${_dropdown('toolsDropdown', '🛠️ Tools', NAV_TOOLS, page)}
      ${_dropdown('moreDropdown', '⋯ More', NAV_MORE, page)}
    </div>
    ${searchRow}
  </div>`;

  el.innerHTML = `<div class="titleBar">
    <div class="titleLeft">
      <img class="site-logo" src="guitar.png" alt="Lazzarus Prime">
      <h2>Lazzarus Prime${title ? ' — ' + title : ''}</h2>
    </div>
    <div class="headerRight">
      <div class="theme-switcher" id="themeSwitcher">
        <button class="theme-btn" id="themeBtn" onclick="toggleThemeMenu()">🎨 Theme</button>
        <div class="theme-menu" id="themeMenu"></div>
      </div>
      <div class="nav-dropdown" id="linksDropdown">
        <button class="nav-btn" onclick="toggleNavDropdown('linksDropdown')">🔗 Links</button>
        <div class="nav-dropdown-menu nav-dropdown-menu-social">${socialRows}</div>
      </div>
    </div>
  </div>
  ${navRow}`;
}

/* ── Footer ──────────────────────────────────────────────── */
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `<footer>
    <a href="index.html?nosplash=1">🏠 Home</a><span class="footer-sep">·</span>
    <a href="artists.html">🎸 Artists</a><span class="footer-sep">·</span>
    <div class="nav-dropdown nav-dropdown-footer" id="footerLinksDropdown">
      <button class="footer-dropdown-btn" onclick="toggleNavDropdown('footerLinksDropdown')">🔗 More &amp; Socials ▾</button>
      <div class="nav-dropdown-menu nav-dropdown-menu-footer">
        ${NAV_TOOLS.concat(NAV_MORE).map(i => `<a href="${i.href}">${i.icon} ${i.label}</a>`).join('')}
        <div class="nav-dropdown-sep"></div>
        ${SOCIAL_LINKS.map(s => `<a href="${s.href}" target="_blank" rel="noopener">${s.icon} ${s.label}</a>`).join('')}
      </div>
    </div>
    <span class="footer-sep">·</span>
    <a href="#top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">↑ Top</a>
  </footer>`;
}
