/* ═══════════════════════════════════════════════════════════════
   shared.js  — Lazzarus Prime  (single source of truth)
   ═══════════════════════════════════════════════════════════════ */

/* ── Firebase config ─────────────────────────────────────── */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCc7XBAOY4bCDAdKt-tKnNn8xo4Xfj5yw4",
  authDomain: "rocksmith-requests.firebaseapp.com",
  databaseURL: "https://rocksmith-requests-default-rtdb.firebaseio.com",
  projectId: "rocksmith-requests"
};

/* ── Genre map ───────────────────────────────────────────── */
const GENRE_MAP = {
  "Metal":["Metallica","Megadeth","Slayer","Pantera","Iron Maiden","Black Sabbath","Ozzy Osbourne","Judas Priest","Anthrax","Sepultura","Tool","System of A Down","Slipknot","Korn","Disturbed","Avenged Sevenfold","Five Finger Death Punch","Killswitch Engage","Lamb of God","Gojira","Opeth","Dream Theater","Queensryche","Accept","Motorhead","Whitesnake","Dio","Rainbow","Deep Purple","Twisted Sister","Skid Row","Poison","Ratt","Motley Crue","White Zombie","Rob Zombie","Marilyn Manson","Alice in Chains","Soundgarden","Stone Temple Pilots","Audioslave","Velvet Revolver","Creed","Nickelback","Breaking Benjamin","Three Days Grace","Seether","Staind","Puddle Of Mudd","Mudvayne","Crossfade","Trapt","Nonpoint","Taproot","Cradle of Filth","Periphery","Animals As Leaders","DragonForce","Queens of the Stone Age","Royal Blood","Ghost","Volbeat","Airbourne","Rival Sons","Helmet","Alter Bridge","Danzig","Rage Against The Machine","Prophets of Rage","Muse","Bush","Fuel","Chevelle","Filter","The Tea Party","The Cult","Blue Oyster Cult","Rush","Godsmack","Papa Roach","Linkin Park","Limp Bizkit","Deftones","Incubus","Finger Eleven","Our Lady Peace","Theory of A Deadman","Shinedown","Hinder","Drowning Pool","P.O.D.","Rise Against","Pennywise","Bad Religion","Rancid","Sum 41","Billy Talent","Paramore","My Chemical Romance","Asking Alexandria","Ice Nine Kills","Suicidal Tendencies","Primus","Alice Cooper","Warrant","Tesla","Extreme","Mr. Big","Winger","Dokken","Scorpions","Triumph","Kansas","Boston","Styx","Foghat","Bachman Turner Overdrive","Grand Funk Railroad","Mountain","Ted Nugent","Hoobastank","Sick Puppies","Saving Abel","Framing Hanley","Evans Blue","The Flatliners","NoFX","Operation Ivy","Husker Du","Descendents","Green Day","Offspring"],
  "Classic Rock":["Led Zeppelin","The Rolling Stones","Rolling Stones","The Who","Pink Floyd","Aerosmith","Eagles","Fleetwood Mac","The Doors","Doors","Jimi Hendrix","Cream","Eric Clapton","Jeff Beck","Peter Frampton","Foreigner","Journey","REO Speedwagon","Heart","Cheap Trick","Tom Petty","Allman Brothers","Lynyrd Skynyrd","ZZ Top","Van Halen","Queen","AC/DC","ACDC","The Beatles","Beatles","David Bowie","Rod Stewart","Elton John","Bruce Springsteen","Bob Dylan","Neil Young","Paul Simon","Beach Boys","The Kinks","Kinks","T. Rex","Thin Lizzy","Bad Company","Free","Traffic","Steve Winwood","Genesis","Peter Gabriel","Phil Collins","Yes","King Crimson","Emerson Lake","Black Sabbath","Deep Purple","Rainbow","Whitesnake","Dio","Budgie","Mountain","Blue Oyster Cult","Rush","Triumph","Steppenwolf","Foghat","Bachman Turner Overdrive","April Wine","Guess Who","Trooper","Loverboy","Kim Mitchell","Chilliwack","Sloan","Bryan Adams","Blue Rodeo","Tragically Hip","Matthew Good","Moist","Glorious Sons","Sheepdogs","Sass Jordan","Big Wreck","Jeff Healey","Santana","Steve Miller Band","Steely Dan","Toto","Chicago","Electric Light Orchestra","ELO","Golden Earring","Small Faces","Faces","Jethro Tull","Uriah Heep","Supertramp","Crosby Stills","America","Jackson Browne","James Taylor","Gordon Lightfoot","Jim Croce"],
  "Pop":["Taylor Swift","Katy Perry","Ariana Grande","Lady Gaga","Beyonce","Rihanna","Madonna","Michael Jackson","Britney Spears","Justin Timberlake","Ed Sheeran","Adele","Dua Lipa","Harry Styles","Olivia Rodrigo","Billie Eilish","Camila Cabello","Halsey","Shawn Mendes","Miley Cyrus","Sia","Ellie Goulding","Natasha Bedingfield","Alanis Morissette","Avril Lavigne","Kelly Clarkson","Kesha","Gwen Stefani","No Doubt","Pink","Christina Aguilera","Celine Dion","Whitney Houston","Mariah Carey","Cyndi Lauper","Duran Duran","INXS","Roxette","Backstreet Boys","One Direction","5 Seconds of Summer","Carly Rae Jepsen","Lorde","Vance Joy","Train","Matchbox Twenty","OneRepublic","Coldplay","Arcade Fire","Metric","City and Colour","Lumineers","Counting Crows","Gin Blossoms","BLACKPINK","BTS","YOASOBI","Lana Del Rey","MGMT","Foster the People","Imagine Dragons","Twenty One Pilots","Gorillaz","Beck"],
  "R&B Soul":["Marvin Gaye","Stevie Wonder","Aretha Franklin","James Brown","Otis Redding","Sam Cooke","Al Green","Ray Charles","Curtis Mayfield","Isaac Hayes","Sly and The Family Stone","Earth Wind and Fire","Kool and The Gang","Tower of Power","Isley Brothers","Four Tops","Temptations","Commodores","Lionel Richie","Diana Ross","Gladys Knight","Tina Turner","Mary J Blige","Alicia Keys","John Legend","Bruno Mars","Anderson Paak","Thundercat","Vulfpeck","Khruangbin","Amy Winehouse","Sade","Lauryn Hill","Fugees","TLC","Janet Jackson","Donna Summer","Gloria Gaynor","Bee Gees"],
  "Hip Hop":["Eminem","Jay-Z","Jay Z","Kendrick Lamar","Kanye West","Drake","Post Malone","2Pac","NWA","Ice Cube","Dr. Dre","Snoop Dogg","Nas","Biggie","Wu Tang Clan","Beastie Boys","Run DMC","Public Enemy","LL Cool J","Cypress Hill","DMX","Busta Rhymes","50 Cent","Fort Minor","Afroman","Coolio","Childish Gambino","Anderson Paak","Wiz Khalifa","Mac Miller","Cardi B","Limp Bizkit","Kid Rock","LMFAO","Flo Rida","Pitbull"],
  "Blues":["BB King","B.B. King","Albert King","Muddy Waters","Howlin Wolf","Robert Johnson","John Lee Hooker","Eric Clapton","Jeff Beck","Stevie Ray Vaughan","Stevie Ray Vaughn","Jonny Lang","Kenny Wayne Shepherd","Buddy Guy","Joe Cocker","George Thorogood","Blues Brothers","Jack White","White Stripes","Black Keys","Ben Harper","John Mayer","Bonnie Raitt","Gary Clark Jr.","Derek Trucks"],
  "Country":["Johnny Cash","Dolly Parton","Willie Nelson","Waylon Jennings","Garth Brooks","Alan Jackson","George Strait","Kenny Rogers","Hank Williams","Patsy Cline","Loretta Lynn","Glen Campbell","Alabama","Chris Stapleton","Kacey Musgraves","Luke Combs","Carrie Underwood","Rascal Flatts","Dixie Chicks","Brooks and Dunn","Shania Twain","Zac Brown Band","Sturgill Simpson","Gordon Lightfoot","Jim Croce","John Denver","Lumineers","Mumford and Sons"],
  "Funk Disco":["James Brown","Sly and The Family Stone","Earth Wind and Fire","Kool and The Gang","Parliament","Funkadelic","Prince","Rick James","Ohio Players","Tower of Power","War","Commodores","Donna Summer","Gloria Gaynor","Bee Gees","KC and The Sunshine Band","Daft Punk","Jamiroquai","Bruno Mars","Mark Ronson","Vulfpeck","Khruangbin","Fatboy Slim"],
  "Indie Alt":["Radiohead","Pixies","Sonic Youth","Modest Mouse","The Shins","Arcade Fire","Tame Impala","Mac DeMarco","Courtney Barnett","PJ Harvey","St. Vincent","Fiona Apple","Interpol","Bloc Party","Franz Ferdinand","The Strokes","Yeah Yeah Yeahs","Cage The Elephant","MGMT","Foster the People","Lorde","Gorillaz","Beck","Massive Attack","Portishead","American Football","Hot Mulligan","The Wonder Years","Death Cab for Cutie","Fleet Foxes","Bon Iver","Vampire Weekend","Foals","Alt-J","Royal Blood"],
  "Punk":["Ramones","The Clash","Sex Pistols","Dead Kennedys","Black Flag","Misfits","Husker Du","Green Day","The Offspring","Blink 182","Menzingers","NOFX","NoFX","Bad Religion","Pennywise","Rancid","Operation Ivy","Rise Against","Sum 41","Simple Plan","Billy Talent","The Flatliners","Hot Water Music","Propagandhi","Anti-Flag","Social Distortion","Dropkick Murphys","Flogging Molly"],
  "Reggae":["Bob Marley","Jimmy Cliff","Steel Pulse","UB40","Sublime","311","No Doubt","Ska-P","The Interrupters","Reel Big Fish","Less Than Jake","Streetlight Manifesto"]
};

const GENRE_EMOJI = {
  "Metal":"🤘","Classic Rock":"🎸","Pop":"🎤","R&B Soul":"🎵","Hip Hop":"🎤",
  "Blues":"🟡","Country":"🌎","Funk Disco":"🕺","Indie Alt":"🌿","Punk":"🎙️","Reggae":"🌴"
};

/* ── Genre lookup cache ──────────────────────────────────── */
const _gc = {};
function assignGenre(artist) {
  if (_gc[artist] !== undefined) return _gc[artist];
  const lower = artist.toLowerCase();
  for (const [g, list] of Object.entries(GENRE_MAP)) {
    if (list.some(a => lower === a.toLowerCase())) { _gc[artist]=g; return g; }
  }
  for (const [g, list] of Object.entries(GENRE_MAP)) {
    if (list.some(a => lower.includes(a.toLowerCase()) || a.toLowerCase().includes(lower))) { _gc[artist]=g; return g; }
  }
  _gc[artist] = null; return null;
}

/* ── HTML escape ─────────────────────────────────────────── */
function esc(s) {
  return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : '';
}

/* ── Slot-spin animation for Random button ───────────────── */
function slotSpin(btn, onDone) {
  const frames = ['🎰','🃏','🎯','🎲','🎰','🎯','🃏','🎲','🎰','🎲'];
  let i = 0;
  btn.classList.add('spinning');
  const fast = setInterval(() => { btn.textContent = frames[i++%frames.length]+' Random'; }, 60);
  setTimeout(() => {
    clearInterval(fast);
    let j = 0;
    const slow = setInterval(() => { btn.textContent = frames[j++%frames.length]+' Random'; }, 120);
    setTimeout(() => { clearInterval(slow); btn.textContent='🎲 Random'; btn.classList.remove('spinning'); onDone(); }, 480);
  }, 600);
}

/* ── Shared navigation HTML ──────────────────────────────── */
/* currentPage: 'home'|'artists'|'stats'|'gear'|'tuner' */
function buildNav(currentPage, showSearch, randomFn, searchFn, clearFn) {
  const pages = [
    { id:'home',    href:"index.html?nosplash=1", label:"🏠 Home" },
    { id:'artists', href:"artists.html",          label:"🎸 Artists" },
    { id:'stats',   href:"stats.html",            label:"📊 Stats" },
    { id:'gear',    href:"gear.html",             label:"🎛️ Gear" },
    { id:'tuner',   href:"tuner.html",            label:"🎵 Tuner" },
  ];
  const navBtns = pages.map(p =>
    `<button class="nav-btn${p.id===currentPage?' active-page':''}" onclick="location.href='${p.href}'">${p.label}</button>`
  ).join('');
  const randomBtn = `<button class="nav-btn" id="randomNavBtn" onclick="${randomFn}(this)">🎲 Random</button>`;
  const searchHtml = showSearch ? `
    <input id="searchBox" placeholder="Search artist or song…" oninput="${searchFn}()" autocomplete="off">
    <button id="clearBtn" class="clearBtn" onclick="${clearFn}()">✕</button>` : '';
  return `<div class="topBar">${navBtns}${randomBtn}${searchHtml}</div>`;
}

/* ── Shared title bar HTML ───────────────────────────────── */
function buildTitleBar(subtitle) {
  return `
  <div class="titleBar">
    <div class="titleLeft">
      <img class="site-logo" src="guitar.png" alt="Lazzarus Prime">
      <h2>Lazzarus Prime${subtitle ? ' — '+subtitle : ''}</h2>
    </div>
    <div class="socialLinks">
      <a href="https://www.twitch.tv/lazzarus_prime" target="_blank">🎮 Twitch</a>
      <a href="https://discord.gg/WCg5sktJNM" target="_blank">💬 Discord</a>
      <a href="https://lazzarus-prime-shop.fourthwall.com/" target="_blank">👕 Merch</a>
      <a href="https://www.instagram.com/lazzarus__prime/" target="_blank">📸 Instagram</a>
      <a href="https://streamlabs.com/lazzarus_prime/tip" target="_blank">💰 Donate</a>
    </div>
  </div>`;
}

/* ── Shared footer HTML ──────────────────────────────────── */
function buildFooter(randomFn) {
  return `
  <footer>
    <a href="index.html?nosplash=1">🏠 Home</a><span class="footer-sep">·</span>
    <a href="artists.html">🎸 Artists</a><span class="footer-sep">·</span>
    <a href="stats.html">📊 Stats</a><span class="footer-sep">·</span>
    <a href="gear.html">🎛️ Gear</a><span class="footer-sep">·</span>
    <a href="tuner.html">🎵 Tuner</a><span class="footer-sep">·</span>
    <a href="#" onclick="${randomFn}();return false;">🎲 Random</a><span class="footer-sep">·</span>
    <a href="https://www.twitch.tv/lazzarus_prime" target="_blank">🎮 Twitch</a><span class="footer-sep">·</span>
    <a href="https://discord.gg/WCg5sktJNM" target="_blank">💬 Discord</a><span class="footer-sep">·</span>
    <a href="https://lazzarus-prime-shop.fourthwall.com/" target="_blank">👕 Merch</a><span class="footer-sep">·</span>
    <a href="https://www.instagram.com/lazzarus__prime/" target="_blank">📸 Instagram</a><span class="footer-sep">·</span>
    <a href="https://streamlabs.com/lazzarus_prime/tip" target="_blank">💰 Donate</a>
  </footer>`;
}

/* ── Shared CSS variables ────────────────────────────────── */
/* Pages inject this via a <style> block calling getSharedCSS() */
function getSharedCSS() {
  return `
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{font-family:'Inter',Segoe UI,Arial;background:#0f0f0f;color:white;margin:0;overflow-x:hidden}
.titleBar{display:flex;justify-content:space-between;align-items:center;background:#141414;padding:10px 14px;border-bottom:2px solid #222;flex-wrap:wrap;gap:8px}
.titleLeft{display:flex;align-items:center;gap:12px}
.titleBar .site-logo{width:44px;height:44px;object-fit:contain;flex-shrink:0;filter:drop-shadow(0 0 6px rgba(241,196,15,.4))}
.titleLeft h2{margin:0;font-weight:900;text-transform:uppercase;font-size:clamp(14px,2.5vw,22px);background:linear-gradient(to bottom,#fff 20%,#f1c40f 45%,#b8860b 85%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 5px rgba(241,196,15,.6))}
.socialLinks{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.socialLinks a{color:#aaa;text-decoration:none;font-size:13px;transition:.15s;white-space:nowrap;padding:4px 9px;border-radius:4px;border:1px solid transparent}
.socialLinks a:hover{color:#f1c40f;border-color:#333;background:#1a1a1a}
.topBar{display:flex;gap:6px;padding:8px 10px;background:#181818;position:sticky;top:0;z-index:100;flex-wrap:wrap;justify-content:flex-start;align-items:center;border-bottom:1px solid #333}
.topBar input{flex:1;padding:9px 12px;border-radius:6px;border:none;min-width:150px;background:white;color:black;font-size:14px}
.nav-btn{background:#2a2a2a;color:white;border:1px solid #444;padding:9px 14px;border-radius:6px;cursor:pointer;font-weight:700;text-transform:uppercase;font-size:12px;transition:.2s;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;gap:4px}
.nav-btn:hover,.nav-btn:active{background:#444;border-color:#f1c40f;color:#f1c40f}
.nav-btn.active-page{border-color:#f1c40f55;color:#f1c40f;background:#1a1800}
.nav-btn.spinning{pointer-events:none;border-color:#f1c40f;color:#f1c40f;background:#444}
.clearBtn{display:none;background:#333;color:white;border:none;padding:9px 12px;border-radius:6px;cursor:pointer;font-size:14px}
footer{text-align:center;padding:16px 10px;color:#333;font-size:12px;border-top:1px solid #1a1a1a;line-height:2;margin-top:30px}
footer a{color:#555;text-decoration:none;transition:.15s;padding:2px 6px;border-radius:3px}
footer a:hover{color:#f1c40f;background:#1a1a1a}
.footer-sep{color:#2a2a2a;margin:0 2px}
@media(max-width:600px){.titleBar{padding:8px 10px}.socialLinks{gap:4px}.socialLinks a{font-size:11px;padding:3px 6px}.topBar{gap:4px;padding:6px 8px}.nav-btn{padding:7px 9px;font-size:10px}.titleBar .site-logo{width:36px;height:36px}}`;
}
