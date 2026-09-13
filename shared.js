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
  "Metal":["Metallica","Megadeth","Slayer","Pantera","Iron Maiden","Black Sabbath","Ozzy Osbourne","Judas Priest","Anthrax","Sepultura","Tool","System of A Down","Slipknot","Korn","Disturbed","Avenged Sevenfold","Five Finger Death Punch","Killswitch Engage","Lamb of God","Gojira","Opeth","Dream Theater","Queensryche","Accept","Motorhead","Whitesnake","Dio","Rainbow","Deep Purple","Twisted Sister","Skid Row","Poison","Ratt","Motley Crue","White Zombie","Rob Zombie","Marilyn Manson","Alice in Chains","Soundgarden","Stone Temple Pilots","Audioslave","Velvet Revolver","Creed","Nickelback","Breaking Benjamin","Three Days Grace","Seether","Staind","Puddle Of Mudd","Mudvayne","Crossfade","Trapt","Nonpoint","Taproot","Cradle of Filth","Periphery","Animals As Leaders","DragonForce","Queens of the Stone Age","Royal Blood","Ghost","Volbeat","Airbourne","Rival Sons","Helmet","Alter Bridge","Danzig","Rage Against The Machine","Prophets of Rage","Muse","Bush","Fuel","Chevelle","Filter","The Tea Party","The Cult","Blue Oyster Cult","Rush","Godsmack","Papa Roach","Linkin Park","Limp Bizkit","Deftones","Incubus","Finger Eleven","Our Lady Peace","Theory of A Deadman","Shinedown","Hinder","Drowning Pool","P.O.D.","Rise Against","Pennywise","Bad Religion","Rancid","Sum 41","Billy Talent","Paramore","My Chemical Romance","Asking Alexandria","Ice Nine Kills","Suicidal Tendencies","Primus","Alice Cooper","Warrant","Tesla","Extreme","Mr. Big","Winger","Dokken","Scorpions","Triumph","Kansas","Boston","Styx","Foghat","Bachman Turner Overdrive","Grand Funk Railroad","Mountain","Ted Nugent","Hoobastank","Sick Puppies","Saving Abel","Framing Hanley","Evans Blue","The Flatliners","NoFX","Operation Ivy","Husker Du","Descendents","Green Day","Offspring","Guns N Roses","Guns N' Roses","Slash","Nine Inch Nails","The Darkness","Def Leppard","Soen","Evanescence"],
  "Classic Rock":["Led Zeppelin","The Rolling Stones","Rolling Stones","The Who","Pink Floyd","Aerosmith","Eagles","Fleetwood Mac","The Doors","Doors","Jimi Hendrix","Cream","Eric Clapton","Jeff Beck","Peter Frampton","Foreigner","Journey","REO Speedwagon","Heart","Cheap Trick","Tom Petty","Allman Brothers","Lynyrd Skynyrd","ZZ Top","Van Halen","Queen","AC/DC","ACDC","The Beatles","Beatles","David Bowie","Rod Stewart","Elton John","Bruce Springsteen","Bruc Springsteen","Bob Dylan","Neil Young","Paul Simon","Beach Boys","The Kinks","Kinks","T. Rex","Thin Lizzy","Bad Company","Free","Traffic","Steve Winwood","Genesis","Peter Gabriel","Phil Collins","Yes","King Crimson","Emerson Lake","Black Sabbath","Deep Purple","Rainbow","Whitesnake","Dio","Budgie","Mountain","Blue Oyster Cult","Rush","Triumph","Steppenwolf","Foghat","Bachman Turner Overdrive","April Wine","Guess Who","Trooper","Loverboy","Kim Mitchell","Chilliwack","Sloan","Bryan Adams","Blue Rodeo","Tragically Hip","Matthew Good","Moist","Glorious Sons","Sheepdogs","Sass Jordan","Big Wreck","Jeff Healey","Santana","Steve Miller Band","Steely Dan","Toto","Chicago","Electric Light Orchestra","ELO","Golden Earring","Small Faces","Faces","Jethro Tull","Uriah Heep","Supertramp","Crosby Stills","America","Jackson Browne","James Taylor","Gordon Lightfoot","Jim Croce","U2","John Lennon","Paul McCartney","Bon Jovi","Bob Seger","Billy Joel","Simon & Garfunkel","Elvis Presley","Roy Orbison","Don Henley","Neil Diamond","Meat Loaf","Sheryl Crow","John Cougar Mellencamp","John Mellencamp","Blondie","Billy Idol","Joan Jett","Lenny Kravitz","Huey Lewis & The News","Huey Lewis and The News","The Police","The Doobie Brothers","Doobie Brothers","Van Morrison","Chuck Berry","Dire Straits","Dire Straights"],
  "Pop":["Taylor Swift","Katy Perry","Ariana Grande","Lady Gaga","Beyonce","Rihanna","Madonna","Michael Jackson","Britney Spears","Justin Timberlake","Ed Sheeran","Adele","Dua Lipa","Harry Styles","Olivia Rodrigo","Billie Eilish","Camila Cabello","Halsey","Shawn Mendes","Miley Cyrus","Sia","Ellie Goulding","Natasha Bedingfield","Alanis Morissette","Avril Lavigne","Kelly Clarkson","Kesha","Gwen Stefani","No Doubt","Pink","Christina Aguilera","Celine Dion","Whitney Houston","Mariah Carey","Cyndi Lauper","Duran Duran","INXS","Roxette","Backstreet Boys","One Direction","5 Seconds of Summer","Carly Rae Jepsen","Lorde","Vance Joy","Train","Matchbox Twenty","OneRepublic","Coldplay","Arcade Fire","Metric","City and Colour","Lumineers","Counting Crows","Gin Blossoms","BLACKPINK","BTS","YOASOBI","Lana Del Rey","MGMT","Foster the People","Imagine Dragons","Twenty One Pilots","Gorillaz","Beck","Maroon 5","Sabrina Carpenter","The Weeknd","Justin Bieber","Justin Beiber","Wham","George Michael","Barenaked Ladies","Bananarama","Gloria Estefan","Tears for Fears","Mr Mister","Mister Mister"],
  "R&B Soul":["Marvin Gaye","Marvn Gaye","Stevie Wonder","Aretha Franklin","Aretha_Franklin","James Brown","Otis Redding","Ottis Redding","Sam Cooke","Al Green","Ray Charles","Curtis Mayfield","Isaac Hayes","Sly and The Family Stone","Earth Wind and Fire","Kool and The Gang","Tower of Power","Isley Brothers","Four Tops","Temptations","Commodores","Lionel Richie","Diana Ross","Gladys Knight","Tina Turner","Mary J Blige","Alicia Keys","John Legend","Bruno Mars","Anderson Paak","Thundercat","Vulfpeck","Khruangbin","Amy Winehouse","Amy Whinehouse","Sade","Lauryn Hill","Fugees","TLC","Janet Jackson","Donna Summer","Gloria Gaynor","Bee Gees","Barry White","Black Pumas","Hall and Oates"],
  "Hip Hop":["Eminem","Jay-Z","Jay Z","Kendrick Lamar","Kanye West","Drake","Post Malone","2Pac","NWA","Ice Cube","Dr. Dre","Dr Dre","Snoop Dogg","Nas","Biggie","Wu Tang Clan","Beastie Boys","Run DMC","Public Enemy","LL Cool J","Cypress Hill","DMX","Busta Rhymes","50 Cent","Fort Minor","Afroman","Coolio","Childish Gambino","Anderson Paak","Wiz Khalifa","Mac Miller","Cardi B","Limp Bizkit","Kid Rock","LMFAO","Flo Rida","Pitbull","Outkast","The Black Eyed Peas","Black Eyed Peas"],
  "Blues":["BB King","B.B. King","Albert King","Muddy Waters","Howlin Wolf","Robert Johnson","John Lee Hooker","Eric Clapton","Jeff Beck","Stevie Ray Vaughan","Stevie Ray Vaughn","Jonny Lang","Kenny Wayne Shepherd","Buddy Guy","Joe Cocker","George Thorogood","Blues Brothers","Jack White","White Stripes","Black Keys","Ben Harper","John Mayer","Bonnie Raitt","Gary Clark Jr.","Derek Trucks","The Raconteurs","Janis Joplin"],
  "Country":["Johnny Cash","Dolly Parton","Willie Nelson","Waylon Jennings","Garth Brooks","Alan Jackson","George Strait","Kenny Rogers","Hank Williams","Patsy Cline","Loretta Lynn","Glen Campbell","Alabama","Chris Stapleton","Kacey Musgraves","Luke Combs","Carrie Underwood","Rascal Flatts","Dixie Chicks","Brooks and Dunn","Shania Twain","Zac Brown Band","Sturgill Simpson","Gordon Lightfoot","Jim Croce","John Denver","Lumineers","Mumford and Sons"],
  "Funk Disco":["James Brown","Sly and The Family Stone","Sly & The Family Stone","Earth Wind and Fire","Kool and The Gang","Kool & The Gang","Parliament","Funkadelic","Prince","Rick James","Ohio Players","Tower of Power","War","Commodores","Donna Summer","Gloria Gaynor","Bee Gees","KC and The Sunshine Band","Daft Punk","Jamiroquai","Bruno Mars","Mark Ronson","Vulfpeck","Khruangbin","Fatboy Slim"],
  "Indie Alt":["Radiohead","Pixies","Sonic Youth","Modest Mouse","The Shins","Arcade Fire","Tame Impala","Mac DeMarco","Courtney Barnett","PJ Harvey","St. Vincent","St Vincent","Fiona Apple","Interpol","Bloc Party","Franz Ferdinand","The Strokes","Yeah Yeah Yeahs","Cage The Elephant","MGMT","Foster the People","Lorde","Gorillaz","Beck","Massive Attack","Portishead","American Football","Hot Mulligan","The Wonder Years","Death Cab for Cutie","Fleet Foxes","Bon Iver","Vampire Weekend","Foals","Alt-J","Royal Blood","Cake","Jack Johnson","Kaleo","Grandson","Blue Stones","Jungle","R.E.M.","R.E.M","REM","Twenty One Pilots","Twenty-One Pilots"],
  "Punk":["Ramones","The Clash","Sex Pistols","Dead Kennedys","Black Flag","Misfits","Husker Du","Green Day","The Offspring","Blink 182","Menzingers","NOFX","NoFX","Bad Religion","Pennywise","Rancid","Operation Ivy","Rise Against","Sum 41","Simple Plan","Billy Talent","The Flatliners","Hot Water Music","Propagandhi","Anti-Flag","Social Distortion","Dropkick Murphys","Flogging Molly","Fall Out Boy","Me First and The Gimme Gimmes","Iggy Pop","Iggy and The Stooges","The Stooges"],
  "Reggae":["Bob Marley","Jimmy Cliff","Steel Pulse","UB40","Sublime","311","No Doubt","Ska-P","The Interrupters","Reel Big Fish","Less Than Jake","Streetlight Manifesto"],
  "Alt & Grunge":["Foo Fighters","Red Hot Chili Peppers","Nirvana","Pearl Jam","Weezer","Arctic Monkeys","The Killers","Kings of Leon","Oasis","Smashing Pumpkins","Hole","Chris Cornell","Live","The Black Crowes","Jane's Addiction","Silverchair","Collective Soul","Better Than Ezra","Third Eye Blind","Everclear","Local H","Cracker","Toadies","Mad Season"]
};

const GENRE_EMOJI = {
  "Metal":"🤘","Classic Rock":"🎸","Pop":"🎤","R&B Soul":"🎵","Hip Hop":"🎤",
  "Blues":"🟡","Country":"🌎","Funk Disco":"🕺","Indie Alt":"🌿","Punk":"🎙️","Reggae":"🌴","Alt & Grunge":"🔊"
};

/* ── Canadian artists (🍁 filter + inline badge) ──────────
   Independent of GENRE_MAP — this is a nationality tag, not a
   music genre, so it's checked separately and can layer on top
   of any genre/search filter. */
const CANADIAN_ARTISTS = ["Alanis Morissette", "Alannah Myles", "Anne Murray", "April Wine", "Arcade Fire", "Avril Lavigne", "Bachman Turner Overdrive", "Barenaked Ladies", "Beau Dommage", "Biff Naked", "Big Sugar", "Big Wreck", "Blue Rodeo", "Blue Stones", "Bryan Adams", "Carly Rae Jepsen", "Celine Dion", "Chantal Kreviazuk", "Chilliwack", "City and Colour", "Corey Heart", "Coton Ouate", "Crash Test Dummies", "Danko Jones", "Default", "Drake", "Finger Eleven", "Flatliners", "Francois Perusse", "Glass Tiger", "Glorious Sons", "Gordon Lightfoot", "Half Moon Run", "Headstones", "Honeymoon Suite", "I Mother Earth", "Jeff Healey", "Justin Beiber", "Kim Mitchell", "Kittie", "Leonard Cohen", "Les Colocs", "Les Cowboys", "Loverboy", "Marianas Trench", "Matt Mays", "Matthew Good Band", "Metric", "Michael Buble", "Moist", "Neil Young", "Nelly Furtado", "Neverending White Lights", "Nickelback", "Northern Pikes", "Our Lady Peace", "Paul Anka", "Plume Latraverse", "Red Rider", "ReignWolf", "Rheostatics", "Roch Voisine", "Rush", "Sarah McLachlan", "Sass Jordan", "Shania Twain", "Shawn Mendes", "Simple Plan", "Sloan", "Snow", "Sum 41", "The Blue Stones", "The Guess Who", "The Sheepdogs", "The Tea Party", "The Tragically Hip", "The Trews", "The Weeknd", "Theory of A Deadman", "Thornley", "Three Days Grace", "Triumph", "Trooper", "eXterio"];

const _canc = {};
function isCanadian(artist) {
  if (_canc[artist] !== undefined) return _canc[artist];
  const lower = artist.toLowerCase();
  const hit = CANADIAN_ARTISTS.some(a => a.toLowerCase() === lower);
  _canc[artist] = hit;
  return hit;
}

/* ── Maple leaf energy pulse (🍁 badge click) ──────────────
   Spawns a few maple-leaf-shaped outlines at the click point
   that scale up and fade out, radiating outward. */
const MAPLE_LEAF_PATH = "M50 2 L57 20 L72 10 L68 30 L90 26 L76 42 L96 50 L76 58 L90 74 L68 70 L72 90 L57 80 L50 98 L43 80 L28 90 L32 70 L10 74 L24 58 L4 50 L24 42 L10 26 L32 30 L28 10 L43 20 Z";
function mapleLeafPulse(x, y) {
  const NS = 'http://www.w3.org/2000/svg';
  const ripples = 3;
  for (let i = 0; i < ripples; i++) {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.classList.add('maple-pulse');
    svg.style.left = x + 'px';
    svg.style.top = y + 'px';
    svg.style.animationDelay = (i * 110) + 'ms';
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', MAPLE_LEAF_PATH);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#e63946');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
    document.body.appendChild(svg);
    svg.addEventListener('animationend', () => svg.remove());
  }
}
function onMapleLeafClick(e) {
  e.stopPropagation();
  mapleLeafPulse(e.clientX, e.clientY);
}

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

/* ── Shared artist list (for search redirect + random button) ── */
let _artists = [];
async function loadArtists() {
  if (_artists.length) return;
  try {
    const d = await (await fetch('songs.json')).json();
    _artists = [...new Set(d.map(s => s.artist))];
  } catch(e) { /* songs.json unavailable */ }
}
loadArtists();

/* ── Nav search box: redirects to Home with the query ────── */
function navSearch() {
  const box = document.getElementById('searchBox');
  const clearBtn = document.getElementById('clearBtn');
  if (!box) return;
  const q = box.value;
  if (clearBtn) clearBtn.style.display = q ? 'inline-block' : 'none';
  if (q.length >= 1) {
    clearTimeout(window._nsTimer);
    window._nsTimer = setTimeout(() => {
      window.location.href = 'index.html?search=' + encodeURIComponent(q) + '&nosplash=1';
    }, 600);
  }
}
function clearNavSearch() {
  const box = document.getElementById('searchBox');
  const clearBtn = document.getElementById('clearBtn');
  if (box) box.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
}

/* ── Nav random button: picks a random artist, spins, redirects ── */
async function randomSong(btn) {
  await loadArtists();
  if (!_artists.length) { location.href = 'index.html?nosplash=1'; return; }
  const pick = _artists[Math.floor(Math.random() * _artists.length)];
  if (btn) {
    slotSpin(btn, () => { location.href = 'index.html?nosplash=1&search=' + encodeURIComponent(pick); });
  } else {
    location.href = 'index.html?nosplash=1&search=' + encodeURIComponent(pick);
  }
}
