/* ═══════════════════════════════════════════════════════════════
   i18n.js — Lazzarus Prime site-wide language engine
   Include on every page, right after theme.js and before chrome.js.

   Usage:
     t('nav.home')                 → translated string for current lang
     t('pagination.pageOf', {n:2, total:9})  → "{n}"/"{total}" substitution
     <span data-i18n="library.title"></span>          → auto text
     <input data-i18n-placeholder="search.placeholder">→ auto placeholder
     <button data-i18n-title="view.grid.title">        → auto title attr
     applyTranslations()            → re-scan the whole doc (or a subtree)
     window.addEventListener('lp:langchange', fn)      → react to a switch
   ═══════════════════════════════════════════════════════════════ */

const I18N_LANG_KEY = 'lp-lang';

const I18N_STRINGS = {
  en: {
    'nav.home': 'Home', 'nav.artists': 'Artists', 'nav.random': 'Random',
    'nav.tools': 'Tools', 'nav.more': 'More',
    'nav.tuner': 'Tuner', 'nav.metronome': 'Metronome', 'nav.groove': 'Groove Station',
    'nav.drums': 'Drums', 'nav.chords': 'Chords & Scales', 'nav.theory': 'Music Theory',
    'nav.stats': 'Stats', 'nav.gear': 'Gear', 'nav.videos': 'Videos',
    'links.button': 'Links', 'theme.button': 'Theme',
    'footer.home': 'Home', 'footer.artists': 'Artists',
    'footer.moreSocials': 'More & Socials', 'footer.top': 'Top',

    'search.placeholder': 'Search artist or song…',
    'search.placeholder.artists': 'Search artist…',

    'splash.sub': 'Song Request Library',
    'splash.tagline': '6,705 songs · 1,229 artists · 0 excuses',
    'splash.taglineDynamic': '{songs} songs · {artists} artists · 0 excuses',
    'splash.skip': 'Skip',

    'filters.toggle': 'Filters & Browse',
    'filters.showing': 'Showing:',
    'filters.clear': 'Clear',
    'artists.top': 'Top Artists In Library',

    'library.title': 'SONG LIBRARY',
    'view.list.title': 'List — art + details',
    'view.compact.title': 'Compact — text only, more per screen',
    'view.grid.title': 'Grid — larger art tiles',

    'song.request': 'Request',
    'song.inQueue': 'In Queue',
    'song.viewMusicBrainz': 'View on MusicBrainz',
    'song.canadianArtist': 'Canadian artist',

    'results.songs': 'songs',
    'results.results': 'results',
    'pagination.prev': 'Prev',
    'pagination.next': 'Next',
    'pagination.pageOf': 'Page {n} / {total}',

    'toast.copied.title': 'Copied! 🎸 Paste into Twitch chat',
    'toast.paste.title': 'Paste this into chat:',

    'genre.Canadian': 'Canadian',
    'genre.Metal': 'Metal', 'genre.Classic Rock': 'Classic Rock', 'genre.Pop': 'Pop',
    'genre.R&B Soul': 'R&B Soul', 'genre.Hip Hop': 'Hip Hop', 'genre.Blues': 'Blues',
    'genre.Country': 'Country', 'genre.Funk Disco': 'Funk Disco', 'genre.Indie Alt': 'Indie Alt',
    'genre.Punk': 'Punk', 'genre.Reggae': 'Reggae', 'genre.Alt & Grunge': 'Alt & Grunge',
  },
  fr: {
    'nav.home': 'Accueil', 'nav.artists': 'Artistes', 'nav.random': 'Aléatoire',
    'nav.tools': 'Outils', 'nav.more': 'Plus',
    'nav.tuner': 'Accordeur', 'nav.metronome': 'Métronome', 'nav.groove': 'Station Groove',
    'nav.drums': 'Batterie', 'nav.chords': 'Accords et gammes', 'nav.theory': 'Théorie musicale',
    'nav.stats': 'Statistiques', 'nav.gear': 'Équipement', 'nav.videos': 'Vidéos',
    'links.button': 'Liens', 'theme.button': 'Thème',
    'footer.home': 'Accueil', 'footer.artists': 'Artistes',
    'footer.moreSocials': 'Plus et réseaux', 'footer.top': 'Haut',

    'search.placeholder': 'Chercher un artiste ou une chanson…',
    'search.placeholder.artists': 'Chercher un artiste…',

    'splash.sub': 'Bibliothèque de demandes de chansons',
    'splash.tagline': '6 705 chansons · 1 229 artistes · 0 excuses',
    'splash.taglineDynamic': '{songs} chansons · {artists} artistes · 0 excuses',
    'splash.skip': 'Passer',

    'filters.toggle': 'Filtres et parcourir',
    'filters.showing': 'Affichage :',
    'filters.clear': 'Effacer',
    'artists.top': 'Meilleurs artistes de la bibliothèque',

    'library.title': 'BIBLIOTHÈQUE DE CHANSONS',
    'view.list.title': 'Liste — pochette et détails',
    'view.compact.title': 'Compact — texte seulement, plus par écran',
    'view.grid.title': 'Grille — grandes pochettes',

    'song.request': 'Demander',
    'song.inQueue': 'Dans la file',
    'song.viewMusicBrainz': 'Voir sur MusicBrainz',
    'song.canadianArtist': 'Artiste canadien',

    'results.songs': 'chansons',
    'results.results': 'résultats',
    'pagination.prev': 'Préc.',
    'pagination.next': 'Suiv.',
    'pagination.pageOf': 'Page {n} / {total}',

    'toast.copied.title': 'Copié ! 🎸 Collez-le dans le chat Twitch',
    'toast.paste.title': 'Collez ceci dans le chat :',

    'genre.Canadian': 'Canadien',
    'genre.Metal': 'Metal', 'genre.Classic Rock': 'Rock classique', 'genre.Pop': 'Pop',
    'genre.R&B Soul': 'R&B Soul', 'genre.Hip Hop': 'Hip-Hop', 'genre.Blues': 'Blues',
    'genre.Country': 'Country', 'genre.Funk Disco': 'Funk Disco', 'genre.Indie Alt': 'Indé Alt',
    'genre.Punk': 'Punk', 'genre.Reggae': 'Reggae', 'genre.Alt & Grunge': 'Alt & Grunge',
  }
};

function getLang() { return localStorage.getItem(I18N_LANG_KEY) || 'en'; }

function t(key, vars) {
  const lang = getLang();
  let str = (I18N_STRINGS[lang] && I18N_STRINGS[lang][key]) ?? I18N_STRINGS.en[key] ?? key;
  if (vars) Object.keys(vars).forEach(k => { str = str.replace('{' + k + '}', vars[k]); });
  return str;
}

/* Set <html lang> immediately, before first paint, same pattern as theme.js */
(function () { document.documentElement.lang = getLang(); })();

function applyTranslations(root) {
  const scope = root || document;
  scope.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.getAttribute('data-i18n')); });
  scope.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.getAttribute('data-i18n-placeholder')); });
  scope.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.getAttribute('data-i18n-title')); });
  scope.querySelectorAll('[data-i18n-alt]').forEach(el => { el.alt = t(el.getAttribute('data-i18n-alt')); });
}

function setLang(lang) {
  if (getLang() === lang) { closeLangMenu(); return; }
  localStorage.setItem(I18N_LANG_KEY, lang);
  document.documentElement.lang = lang;
  closeLangMenu();

  /* Rebuild the shared chrome so nav/footer text updates, without losing
     whatever the visitor already typed in the search box. */
  const searchBox = document.getElementById('searchBox');
  const searchVal = searchBox ? searchBox.value : null;
  if (window.__lpHeaderOpts && typeof renderHeader === 'function') renderHeader(window.__lpHeaderOpts);
  if (typeof renderFooter === 'function') renderFooter();
  if (searchVal) { const sb = document.getElementById('searchBox'); if (sb) sb.value = searchVal; }

  applyTranslations();
  window.dispatchEvent(new CustomEvent('lp:langchange', { detail: { lang } }));
}

function buildLangMenu() {
  const menu = document.getElementById('langMenu');
  if (!menu) return;
  const current = getLang();
  menu.innerHTML =
    `<button class="theme-option${current === 'en' ? ' active' : ''}" onclick="setLang('en')">🇬🇧 English</button>` +
    `<button class="theme-option${current === 'fr' ? ' active' : ''}" onclick="setLang('fr')">🇫🇷 Français</button>`;
  menu.dataset.built = '1';
}

function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  if (!menu) return;
  if (!menu.dataset.built) buildLangMenu();
  menu.classList.toggle('open');
}

function closeLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.remove('open');
}

document.addEventListener('click', e => {
  const sw = document.getElementById('langSwitcher');
  if (sw && !sw.contains(e.target)) closeLangMenu();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLangMenu(); });
