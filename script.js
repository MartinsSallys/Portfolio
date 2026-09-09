/* ============================================================
   NAVIGATION — Scroll + Active Section + Mobile Menu
   ============================================================ */
(function () {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkEls = navLinks.querySelectorAll('.navbar__link');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('navbar__toggle--active');
    navLinks.classList.toggle('navbar__links--open');
  });

  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('navbar__toggle--active');
      navLinks.classList.remove('navbar__links--open');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('navbar__link--active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(section => sectionObserver.observe(section));
})();

/* ============================================================
   TYPEWRITER — Hero subtitle
   ============================================================ */
(function () {
  const phrases = [
    'Construindo APIs escaláveis...',
    'Arquitetando sistemas distribuídos...',
    'Automatizando processos...',
    'Python \u2022 FastAPI \u2022 Docker \u2022 PostgreSQL',
  ];

  const el = document.getElementById('typewriter');
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    el.textContent = phrases[phrases.length - 1];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 25 : 55;
    if (!isDeleting && charIndex === current.length) { speed = 2200; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 350; }

    setTimeout(tick, speed);
  }

  tick();
})();

/* ============================================================
   TERMINAL EXPLORER — Project Data
   ============================================================ */
const TERMINAL_PROJECTS = {
  'postais-parnaiba': {
    title: 'Postais da Parnaíba',
    desc: 'Backend para preservação digital da memória histórica da cidade.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Alembic', 'Docker'],
    github: 'https://github.com/MartinsSallys',
    tree: [
      { type: 'dir', name: 'app/' },
      { type: 'dir', name: '  api/', indent: 1 },
      { type: 'dir', name: '  services/', indent: 1 },
      { type: 'dir', name: '  models/', indent: 1 },
      { type: 'dir', name: 'tests/' },
      { type: 'dir', name: 'alembic/' },
      { type: 'file', name: 'Dockerfile' },
      { type: 'file', name: 'docker-compose.yml' },
    ],
  },
  'beck-global': {
    title: 'BeckGlobal',
    desc: 'Boilerplate reutilizável para APIs REST com FastAPI e Docker.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'Docker'],
    github: 'https://github.com/MartinsSallys',
    tree: [
      { type: 'dir', name: 'app/' },
      { type: 'dir', name: '  api/', indent: 1 },
      { type: 'dir', name: '  core/', indent: 1 },
      { type: 'dir', name: '  models/', indent: 1 },
      { type: 'dir', name: 'tests/' },
      { type: 'dir', name: 'alembic/' },
      { type: 'file', name: '.env' },
      { type: 'file', name: 'Dockerfile' },
      { type: 'file', name: 'docker-compose.yml' },
    ],
  },
  'postais-api': {
    title: 'Postais da Parnaíba API',
    desc: 'Backend para preservação digital da memória histórica da cidade.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Pytest'],
    github: 'https://github.com/MartinsSallys',
    tree: [
      { type: 'dir', name: 'app/' },
      { type: 'dir', name: '  api/', indent: 1 },
      { type: 'dir', name: '  services/', indent: 1 },
      { type: 'dir', name: '  models/', indent: 1 },
      { type: 'dir', name: 'tests/' },
      { type: 'dir', name: 'alembic/' },
      { type: 'file', name: 'Dockerfile' },
      { type: 'file', name: 'docker-compose.yml' },
    ],
  },
  'postais-frontend': {
    title: 'Postais Frontend',
    desc: 'Site institucional para preservação da memória histórica.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/MartinsSallys',
    tree: [
      { type: 'dir', name: 'css/' },
      { type: 'dir', name: 'js/' },
      { type: 'dir', name: '  modules/', indent: 1 },
      { type: 'dir', name: 'pages/' },
      { type: 'dir', name: 'assets/' },
      { type: 'file', name: 'index.html' },
    ],
  },
  'flora-tropical': {
    title: 'Flora Tropical',
    desc: 'Site institucional sobre flora tropical com arquitetura modular.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/MartinsSallys',
    tree: [
      { type: 'dir', name: 'css/' },
      { type: 'dir', name: 'js/' },
      { type: 'dir', name: '  modules/', indent: 1 },
      { type: 'dir', name: 'pages/' },
      { type: 'dir', name: 'assets/' },
      { type: 'file', name: 'index.html' },
    ],
  },
};

/* ============================================================
   TERMINAL EXPLORER — SVG Icons
   ============================================================ */
const TIcons = {
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  github: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
};

/* ============================================================
   TERMINAL EXPLORER — State & Init
   ============================================================ */
let terminalView = 'list';
let terminalProject = null;

(function () {
  const body = document.getElementById('explorer-body');
  if (!body) return;
  renderTerminalList();
})();

/* ============================================================
   TERMINAL EXPLORER — Render List View
   ============================================================ */
function renderTerminalList() {
  const body = document.getElementById('explorer-body');
  const pathEl = document.getElementById('terminal-path');
  if (!body || !pathEl) return;

  terminalView = 'list';
  terminalProject = null;
  pathEl.textContent = 'sallys@dev: ~/projects';

  var html = '';
  html += '<div class="terminal-explorer__line terminal-explorer__line--visible">';
  html += '<span class="terminal-explorer__prompt">$</span>';
  html += '<span class="terminal-explorer__cmd">ls</span>';
  html += '</div>';
  html += '<div class="terminal-explorer__output">';

  var projectIds = Object.keys(TERMINAL_PROJECTS);
  projectIds.forEach(function (id) {
    var p = TERMINAL_PROJECTS[id];
    html += '<div class="terminal-explorer__item" data-project="' + id + '">';
    html += '<span class="terminal-explorer__item-icon">' + TIcons.folder + '</span>';
    html += '<span class="terminal-explorer__item-name">' + p.title.toLowerCase().replace(/\s+/g, '-') + '/</span>';
    html += '<span class="terminal-explorer__item-desc">' + p.stack.slice(0, 3).join(' \u00b7 ') + '</span>';
    html += '</div>';
  });

  html += '</div>';
  body.innerHTML = html;

  var items = body.querySelectorAll('.terminal-explorer__item');
  items.forEach(function (item, i) {
    setTimeout(function () {
      item.classList.add('terminal-explorer__item--visible');
    }, 100 + i * 60);
  });

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      renderTerminalDetail(item.dataset.project);
    });
  });
}

/* ============================================================
   TERMINAL EXPLORER — Render Detail View
   ============================================================ */
function renderTerminalDetail(projectId) {
  var body = document.getElementById('explorer-body');
  var pathEl = document.getElementById('terminal-path');
  var project = TERMINAL_PROJECTS[projectId];
  if (!body || !pathEl || !project) return;

  terminalView = 'detail';
  terminalProject = projectId;

  var folderName = project.title.toLowerCase().replace(/\s+/g, '-');
  pathEl.textContent = 'sallys@dev: ~/projects/' + folderName;

  var html = '';

  html += '<div class="terminal-explorer__line">';
  html += '<span class="terminal-explorer__prompt">$</span>';
  html += '<span class="terminal-explorer__cmd">cd ' + folderName + '</span>';
  html += '</div>';

  html += '<div class="terminal-explorer__line">';
  html += '<span class="terminal-explorer__prompt">$</span>';
  html += '<span class="terminal-explorer__cmd">tree</span>';
  html += '</div>';

  html += '<button class="terminal-explorer__back" id="terminal-back">';
  html += TIcons.back;
  html += '<span>~/projects</span>';
  html += '</button>';

  html += '<div class="terminal-explorer__tree">';
  project.tree.forEach(function (item) {
    if (item.type === 'dir') {
      html += '<div>' + TIcons.folder + ' <span class="terminal-explorer__tree-dir">' + item.name + '</span></div>';
    } else {
      html += '<div>  <span class="terminal-explorer__tree-file">' + item.name + '</span></div>';
    }
  });
  html += '</div>';

  html += '<hr class="terminal-explorer__divider">';

  html += '<div class="terminal-explorer__project-info">';
  html += '<h3 class="terminal-explorer__project-name">' + project.title + '</h3>';
  html += '<p class="terminal-explorer__project-desc">' + project.desc + '</p>';

  html += '<span class="terminal-explorer__project-section-label">Stack</span>';
  html += '<div class="terminal-explorer__techs">';
  project.stack.forEach(function (tech) {
    html += '<span class="badge badge--sm">' + tech + '</span>';
  });
  html += '</div>';

  html += '<div class="terminal-explorer__links">';
  html += '<a href="' + project.github + '" target="_blank" rel="noopener noreferrer" class="button button-secondary button-sm">';
  html += TIcons.github + ' GitHub';
  html += '</a>';
  html += '</div>';
  html += '</div>';

  body.innerHTML = html;

  var lines = body.querySelectorAll('.terminal-explorer__line');
  var back = body.querySelector('.terminal-explorer__back');
  var tree = body.querySelector('.terminal-explorer__tree');
  var info = body.querySelector('.terminal-explorer__project-info');

  var delay = 0;
  lines.forEach(function (line) {
    setTimeout(function () { line.classList.add('terminal-explorer__line--visible'); }, delay);
    delay += 120;
  });

  if (back) setTimeout(function () { back.classList.add('terminal-explorer__back--visible'); }, delay);
  delay += 80;

  if (tree) setTimeout(function () { tree.classList.add('terminal-explorer__tree--visible'); }, delay);
  delay += 80;

  if (info) setTimeout(function () { info.classList.add('terminal-explorer__project-info--visible'); }, delay);

  if (back) {
    back.addEventListener('click', function () {
      renderTerminalList();
    });
  }
}

/* ============================================================
   SKILL BARS — Animate on scroll
   ============================================================ */
(function () {
  const fills = document.querySelectorAll('.skill-row__fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
})();

/* ============================================================
   ARCHITECTURE DIAGRAM — Interactive Canvas
   ============================================================ */
(function () {
  const canvas = document.getElementById('arch-canvas');
  const diagram = document.getElementById('arch-diagram');
  const tooltip = document.getElementById('arch-tooltip');
  const tooltipText = document.getElementById('arch-tooltip-text');
  const selector = document.getElementById('arch-selector');
  const viewMode = document.getElementById('view-mode');
  const archContent = document.getElementById('arch-content');
  const videoPanel = document.getElementById('video-panel');
  const videoIframe = document.getElementById('video-iframe');
  const videoPlaceholder = document.getElementById('video-placeholder');
  const videoTitle = document.getElementById('video-title');
  const videoDesc = document.getElementById('video-desc');
  if (!canvas || !diagram || !selector) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const SVG_W = 960, SVG_H = 950;

  /* SVG Icons */
  const ICONS = {
    browser:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    api:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    lock:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    server:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/></svg>',
    db:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    wrench:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    docker:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    check:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    gear:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    shield:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  };

  /* Layer labels for each project */
  const LAYERS = {
    'postais-parnaiba': [
      { y: 30,  label: 'USUARIO' },
      { y: 180, label: 'API' },
      { y: 330, label: 'ENDPOINTS' },
      { y: 480, label: 'LOGICA' },
      { y: 630, label: 'DADOS' },
      { y: 780, label: 'BANCO' },
    ],
    'beck-global': [
      { y: 30,  label: 'USUARIO' },
      { y: 180, label: 'API' },
      { y: 330, label: 'ENDPOINTS' },
      { y: 480, label: 'LOGICA' },
      { y: 630, label: 'DADOS' },
      { y: 780, label: 'INFRA' },
    ],
    'postais-api': [
      { y: 30,  label: 'USUARIO' },
      { y: 180, label: 'API' },
      { y: 330, label: 'ENDPOINTS' },
      { y: 480, label: 'LOGICA' },
      { y: 630, label: 'DADOS' },
      { y: 780, label: 'BANCO' },
    ],
  };

  /* Project Architecture Data — Clear top-to-bottom flow with descriptive labels */
  const PROJECTS = {
    'postais-parnaiba': {
      nodes: [
        /* Layer 1 — User */
        { id: 'client',       x: 180, y: 40,  icon: 'browser',  label: 'USUARIO',      tech: 'Abre o navegador' },
        { id: 'frontend',     x: 480, y: 40,  icon: 'browser',  label: 'FRONTEND',    tech: 'Pagina web' },
        { id: 'design-sys',   x: 780, y: 40,  icon: 'gear',     label: 'DESIGN SYS',  tech: 'Componentes UI' },
        /* Layer 2 — API */
        { id: 'fastapi',      x: 480, y: 180, icon: 'api',      label: 'FASTAPI',     tech: 'Recebe a requisicao' },
        /* Layer 3 — Endpoints */
        { id: 'router',       x: 180, y: 330, icon: 'server',   label: 'ROUTER',      tech: 'Direciona para rota certa' },
        { id: 'schema',       x: 480, y: 330, icon: 'lock',     label: 'PYDANTIC',    tech: 'Valida os dados' },
        { id: 'auth',         x: 780, y: 330, icon: 'shield',   label: 'AUTH',        tech: 'Verifica login' },
        /* Layer 4 — Logic */
        { id: 'services',     x: 320, y: 480, icon: 'server',   label: 'SERVICES',    tech: 'Regras de negocio' },
        { id: 'repository',   x: 640, y: 480, icon: 'gear',     label: 'REPOSITORY',  tech: 'Acessa os dados' },
        /* Layer 5 — Data */
        { id: 'sqlalchemy',   x: 320, y: 630, icon: 'db',       label: 'SQLALCHEMY',  tech: 'Traduz para SQL' },
        { id: 'alembic',      x: 640, y: 630, icon: 'wrench',   label: 'ALEMBIC',     tech: 'Atualiza tabelas' },
        /* Layer 6 — Database */
        { id: 'postgresql',   x: 480, y: 780, icon: 'database', label: 'POSTGRESQL',  tech: 'Armazena dados' },
        /* Infra */
        { id: 'docker',       x: 780, y: 630, icon: 'docker',   label: 'DOCKER',      tech: 'Rodar tudo junto' },
      ],
      connections: [
        { from: 'client',      to: 'frontend',    label: 'Acessa site' },
        { from: 'frontend',    to: 'design-sys',  label: 'Usa componentes' },
        { from: 'frontend',    to: 'fastapi',     label: 'Faz requisicao' },
        { from: 'fastapi',     to: 'router',      label: 'Encontra rota' },
        { from: 'fastapi',     to: 'schema',      label: 'Valida dados' },
        { from: 'fastapi',     to: 'auth',        label: 'Checa token' },
        { from: 'router',      to: 'services',    label: 'Chama servico' },
        { from: 'schema',      to: 'services',    label: 'Dados validados' },
        { from: 'auth',        to: 'services',    label: 'Usuario ok' },
        { from: 'services',    to: 'repository',  label: 'Busca dados' },
        { from: 'repository',  to: 'sqlalchemy',  label: 'Via ORM' },
        { from: 'sqlalchemy',  to: 'postgresql',  label: 'Executa SQL' },
        { from: 'alembic',     to: 'postgresql',  label: 'Atualiza schema' },
        { from: 'docker',      to: 'fastapi',     label: 'Rodar API' },
        { from: 'docker',      to: 'postgresql',  label: 'Rodar DB' },
      ],
    },

    'beck-global': {
      nodes: [
        { id: 'client',       x: 240, y: 40,  icon: 'browser',  label: 'CLIENTE',      tech: 'Navegador' },
        { id: 'frontend',     x: 600, y: 40,  icon: 'browser',  label: 'FRONTEND',    tech: 'React / HTML' },
        { id: 'fastapi',      x: 480, y: 180, icon: 'api',      label: 'FASTAPI',     tech: 'Recebe requisicao' },
        { id: 'router',       x: 180, y: 330, icon: 'server',   label: 'ROUTER',      tech: 'Encontra rota' },
        { id: 'schema',       x: 480, y: 330, icon: 'lock',     label: 'PYDANTIC',    tech: 'Valida dados' },
        { id: 'jwt',          x: 780, y: 330, icon: 'shield',   label: 'JWT',         tech: 'Token de acesso' },
        { id: 'services',     x: 260, y: 480, icon: 'server',   label: 'SERVICES',    tech: 'Regras de negocio' },
        { id: 'auth-svc',     x: 540, y: 480, icon: 'shield',   label: 'AUTH SVC',    tech: 'Gerencia login' },
        { id: 'repository',   x: 800, y: 480, icon: 'gear',     label: 'REPOSITORY',  tech: 'CRUD dados' },
        { id: 'sqlalchemy',   x: 400, y: 630, icon: 'db',       label: 'SQLALCHEMY',  tech: 'Traduz para SQL' },
        { id: 'alembic',      x: 680, y: 630, icon: 'wrench',   label: 'ALEMBIC',     tech: 'Atualiza tabelas' },
        { id: 'postgresql',   x: 400, y: 780, icon: 'database', label: 'POSTGRESQL',  tech: 'Armazena dados' },
        { id: 'docker',       x: 680, y: 780, icon: 'docker',   label: 'DOCKER',      tech: 'Rodar tudo junto' },
        { id: 'pytest',       x: 140, y: 630, icon: 'check',    label: 'PYTEST',      tech: 'Testa o codigo' },
      ],
      connections: [
        { from: 'client',      to: 'fastapi',     label: 'Faz requisicao' },
        { from: 'frontend',    to: 'fastapi',     label: 'Faz requisicao' },
        { from: 'fastapi',     to: 'router',      label: 'Encontra rota' },
        { from: 'fastapi',     to: 'schema',      label: 'Valida dados' },
        { from: 'fastapi',     to: 'jwt',         label: 'Gera token' },
        { from: 'router',      to: 'services',    label: 'Chama servico' },
        { from: 'schema',      to: 'services',    label: 'Dados validados' },
        { from: 'jwt',         to: 'auth-svc',    label: 'Verifica acesso' },
        { from: 'auth-svc',    to: 'services',    label: 'Usuario autorizado' },
        { from: 'services',    to: 'repository',  label: 'Busca dados' },
        { from: 'repository',  to: 'sqlalchemy',  label: 'Via ORM' },
        { from: 'sqlalchemy',  to: 'postgresql',  label: 'Executa SQL' },
        { from: 'alembic',     to: 'postgresql',  label: 'Atualiza schema' },
        { from: 'pytest',      to: 'services',    label: 'Testa servico' },
        { from: 'docker',      to: 'fastapi',     label: 'Rodar API' },
        { from: 'docker',      to: 'postgresql',  label: 'Rodar DB' },
      ],
    },

    'postais-api': {
      nodes: [
        { id: 'client',       x: 240, y: 40,  icon: 'browser',  label: 'CLIENTE',      tech: 'Navegador' },
        { id: 'frontend',     x: 600, y: 40,  icon: 'browser',  label: 'FRONTEND',    tech: 'Postais Web' },
        { id: 'fastapi',      x: 480, y: 180, icon: 'api',      label: 'FASTAPI',     tech: 'Recebe requisicao' },
        { id: 'router',       x: 200, y: 330, icon: 'server',   label: 'ROUTER',      tech: 'Encontra rota' },
        { id: 'schema',       x: 480, y: 330, icon: 'lock',     label: 'PYDANTIC',    tech: 'Valida dados' },
        { id: 'services',     x: 340, y: 480, icon: 'server',   label: 'SERVICES',    tech: 'Regras de negocio' },
        { id: 'repository',   x: 620, y: 480, icon: 'gear',     label: 'REPOSITORY',  tech: 'CRUD dados' },
        { id: 'sqlalchemy',   x: 340, y: 630, icon: 'db',       label: 'SQLALCHEMY',  tech: 'Traduz para SQL' },
        { id: 'alembic',      x: 620, y: 630, icon: 'wrench',   label: 'ALEMBIC',     tech: 'Atualiza tabelas' },
        { id: 'postgresql',   x: 480, y: 780, icon: 'database', label: 'POSTGRESQL',  tech: 'Armazena dados' },
        { id: 'docker',       x: 780, y: 480, icon: 'docker',   label: 'DOCKER',      tech: 'Rodar tudo junto' },
      ],
      connections: [
        { from: 'client',      to: 'fastapi',     label: 'Faz requisicao' },
        { from: 'frontend',    to: 'fastapi',     label: 'Faz requisicao' },
        { from: 'fastapi',     to: 'router',      label: 'Encontra rota' },
        { from: 'fastapi',     to: 'schema',      label: 'Valida dados' },
        { from: 'router',      to: 'services',    label: 'Chama servico' },
        { from: 'schema',      to: 'services',    label: 'Dados validados' },
        { from: 'services',    to: 'repository',  label: 'Busca dados' },
        { from: 'repository',  to: 'sqlalchemy',  label: 'Via ORM' },
        { from: 'sqlalchemy',  to: 'postgresql',  label: 'Executa SQL' },
        { from: 'alembic',     to: 'postgresql',  label: 'Atualiza schema' },
        { from: 'docker',      to: 'fastapi',     label: 'Rodar API' },
        { from: 'docker',      to: 'postgresql',  label: 'Rodar DB' },
      ],
    },
  };

  /* Video Data */
  const VIDEO_DATA = {
    'postais-parnaiba': {
      title: 'Postais da Parnaíba',
      desc: 'Backend para preservação digital da memória histórica da cidade.',
      url: '',
    },
    'beck-global': {
      title: 'BeckGlobal',
      desc: 'Boilerplate reutilizável para APIs REST com FastAPI e Docker.',
      url: '',
    },
    'postais-api': {
      title: 'Postais da Parnaíba API',
      desc: 'Backend para preservação digital da memória histórica da cidade.',
      url: '',
    },
  };

  /* Design Carousel Data */
  const DESIGN_DATA = {
    'postais-parnaiba': {
      title: 'Postais da Parnaíba — Design Web',
      desc: 'Interface de preservação da memória histórica.',
      slides: [
        { label: 'Página Inicial', image: 'assets/images/inicio.png' },
        { label: 'Galeria de Postais', image: 'assets/images/galeria.png' },
        { label: 'Detalhe do Postal', image: 'assets/images/livro.png' },
        { label: 'Mapa Interativo', image: 'assets/images/galeria1.png' },
        { label: 'Busca Avançada', image: 'assets/images/blog.png' },
        { label: 'Painel Admin', image: 'assets/images/Paineladm.png' },
        { label: 'Tela de Login', image: 'assets/images/tela%20de%20login.png' },
        { label: 'Novo Post', image: 'assets/images/novopost.png' },
        { label: 'Conteúdo Editorial', image: 'assets/images/conteudoeditorial.png' },
        { label: 'Novo Postal', image: 'assets/images/novopostal' },
      ],
    },
    'beck-global': {
      title: 'BeckGlobal — Design Web',
      desc: 'Boilerplate e estrutura do projeto.',
      slides: [
        { label: 'Em breve', coming: true },
      ],
    },
    'postais-api': {
      title: 'Postais API — Design Web',
      desc: 'Interface de preservação da memória histórica.',
      slides: [
        { label: 'Em breve', coming: true },
      ],
    },
  };

  /* State */
  let currentProject = 'postais-parnaiba';
  let currentMode = 'both';
  let activeNode = null;
  let zoomLevel = 1;
  let carouselIndex = 0;

  /* SVG Helpers */
  function createSVG(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  function calcPath(fromN, toN) {
    const ax = fromN.x, ay = fromN.y + 70;
    const bx = toN.x, by = toN.y;
    const dx = bx - ax, dy = by - ay;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const tension = Math.min(dist * 0.3, 60);
    if (Math.abs(dx) < 5) return `M ${ax} ${ay} L ${bx} ${by}`;
    return `M ${ax} ${ay} C ${ax} ${ay + tension}, ${bx} ${by - tension}, ${bx} ${by}`;
  }

  /* Render Diagram */
  function renderDiagram(projectId, animate) {
    const project = PROJECTS[projectId];
    if (!project) return;

    diagram.innerHTML = '';
    activeNode = null;
    canvas.classList.remove('is-hovering');

    const nodeMap = {};
    project.nodes.forEach(n => { nodeMap[n.id] = n; });

    const svg = createSVG('svg', {
      class: 'arch-svg',
      viewBox: `0 0 ${SVG_W} ${SVG_H}`,
      preserveAspectRatio: 'xMidYMid meet',
    });

    /* Arrowhead marker */
    const defs = createSVG('defs', {});
    const marker = createSVG('marker', {
      id: 'arrow',
      viewBox: '0 0 10 7',
      refX: '10',
      refY: '3.5',
      markerWidth: '8',
      markerHeight: '6',
      orient: 'auto',
    });
    const arrowPath = createSVG('path', {
      d: 'M 0 0 L 10 3.5 L 0 7 z',
      fill: 'var(--border)',
    });
    marker.appendChild(arrowPath);
    defs.appendChild(marker);

    /* Active arrowhead marker */
    const markerActive = createSVG('marker', {
      id: 'arrow-active',
      viewBox: '0 0 10 7',
      refX: '10',
      refY: '3.5',
      markerWidth: '8',
      markerHeight: '6',
      orient: 'auto',
    });
    const arrowPathActive = createSVG('path', {
      d: 'M 0 0 L 10 3.5 L 0 7 z',
      fill: 'var(--primary)',
    });
    markerActive.appendChild(arrowPathActive);
    defs.appendChild(markerActive);
    svg.appendChild(defs);

    /* Layer labels */
    const layers = LAYERS[projectId] || [];
    layers.forEach(layer => {
      const ly = layer.y + 20;
      const label = createSVG('text', {
        x: '50',
        y: ly,
        'text-anchor': 'middle',
        class: 'arch-layer-label',
      });
      label.textContent = layer.label;
      svg.appendChild(label);

      /* Horizontal guide line */
      const line = createSVG('line', {
        x1: '90',
        y1: ly + 4,
        x2: SVG_W - 20,
        y2: ly + 4,
        class: 'arch-layer-line',
      });
      svg.appendChild(line);
    });

    const pathEls = [];
    const textEls = [];

    project.connections.forEach(conn => {
      const fromN = nodeMap[conn.from];
      const toN = nodeMap[conn.to];
      if (!fromN || !toN) return;

      const path = createSVG('path', {
        d: calcPath(fromN, toN),
        'data-from': conn.from,
        'data-to': conn.to,
        'marker-end': 'url(#arrow)',
      });
      svg.appendChild(path);
      pathEls.push({ el: path, conn });

      /* Position label at midpoint of path with background pill */
      const mx = (fromN.x + toN.x) / 2;
      const my = (fromN.y + 70 + toN.y) / 2;

      const text = createSVG('text', {
        x: mx, y: my,
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        class: 'arch-path-label',
        'data-from': conn.from,
        'data-to': conn.to,
      });

      /* Add background rect for readability */
      const bg = createSVG('rect', {
        x: mx - 4,
        y: my - 8,
        width: 8,
        height: 16,
        rx: 4,
        class: 'arch-path-label-bg',
        'data-from': conn.from,
        'data-to': conn.to,
      });

      text.textContent = conn.label;
      svg.appendChild(bg);
      svg.appendChild(text);

      /* Size bg rect to text after render */
      requestAnimationFrame(() => {
        const bbox = text.getBBox ? text.getBBox() : { x: 0, width: 60 };
        bg.setAttribute('x', bbox.x - 6);
        bg.setAttribute('y', bbox.y - 2);
        bg.setAttribute('width', bbox.width + 12);
        bg.setAttribute('height', bbox.height + 4);
      });

      textEls.push({ el: text, conn });
      textEls.push({ el: bg, conn });
    });

    diagram.appendChild(svg);

    const nodeEls = [];
    project.nodes.forEach(n => {
      const el = document.createElement('div');
      el.className = 'arch-node';
      el.dataset.id = n.id;
      el.style.left = (n.x / SVG_W * 100) + '%';
      el.style.top = (n.y / SVG_H * 100) + '%';
      el.innerHTML =
        '<div class="arch-node__icon">' + (ICONS[n.icon] || ICONS.server) + '</div>' +
        '<span class="arch-node__label">' + n.label + '</span>' +
        '<span class="arch-node__tech">' + n.tech + '</span>' +
        '<span class="arch-node__status"></span>';
      diagram.appendChild(el);
      nodeEls.push({ el, data: n });
    });

    /* Adjacency */
    const adj = {};
    project.nodes.forEach(n => { adj[n.id] = []; });
    project.connections.forEach(c => {
      if (adj[c.from]) adj[c.from].push(c.to);
      if (adj[c.to]) adj[c.to].push(c.from);
    });

    /* Hover */
    function setActive(nodeId) {
      activeNode = nodeId;
      canvas.classList.toggle('is-hovering', !!nodeId);

      nodeEls.forEach(({ el, data }) => {
        el.classList.remove('arch-node--active', 'arch-node--related');
        if (data.id === nodeId) el.classList.add('arch-node--active');
        else if (nodeId && adj[nodeId] && adj[nodeId].includes(data.id)) el.classList.add('arch-node--related');
      });

      pathEls.forEach(({ el, conn }) => {
        const isActive = !!nodeId && (conn.from === nodeId || conn.to === nodeId);
        el.classList.toggle('arch-path--active', isActive);
        el.setAttribute('marker-end', isActive ? 'url(#arrow-active)' : 'url(#arrow)');
      });
      textEls.forEach(({ el, conn }) => {
        const isActive = !!nodeId && (conn.from === nodeId || conn.to === nodeId);
        el.classList.toggle('arch-text--active', isActive);
        if (el.classList.contains('arch-path-label')) {
          el.classList.toggle('arch-path-label--active', isActive);
        }
        if (el.classList.contains('arch-path-label-bg')) {
          el.classList.toggle('arch-path-label-bg--active', isActive);
        }
      });
    }

    function clearActive() {
      activeNode = null;
      canvas.classList.remove('is-hovering');
      nodeEls.forEach(({ el }) => el.classList.remove('arch-node--active', 'arch-node--related'));
      pathEls.forEach(({ el }) => {
        el.classList.remove('arch-path--active');
        el.setAttribute('marker-end', 'url(#arrow)');
      });
      textEls.forEach(({ el }) => {
        el.classList.remove('arch-text--active');
        el.classList.remove('arch-path-label--active');
        el.classList.remove('arch-path-label-bg--active');
      });
    }

    nodeEls.forEach(({ el, data }) => {
      el.addEventListener('mouseenter', () => {
        setActive(data.id);
        tooltipText.textContent = data.desc || data.tech;
        tooltip.classList.add('arch-tooltip--visible');
        positionTooltip(el);
      });
      el.addEventListener('mouseleave', () => {
        clearActive();
        tooltip.classList.remove('arch-tooltip--visible');
      });
      el.addEventListener('mousemove', (e) => {
        positionTooltipAt(e.clientX, e.clientY);
      });
    });

    function positionTooltip(node) {
      const rect = node.getBoundingClientRect();
      const cRect = canvas.getBoundingClientRect();
      let left = rect.left - cRect.left + rect.width / 2;
      let top = rect.top - cRect.top - 10;
      const tw = tooltip.offsetWidth, th = tooltip.offsetHeight;
      left = Math.max(tw / 2 + 8, Math.min(left, cRect.width - tw / 2 - 8));
      top -= th;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }

    function positionTooltipAt(cx, cy) {
      const cRect = canvas.getBoundingClientRect();
      let left = cx - cRect.left;
      let top = cy - cRect.top - 10;
      const tw = tooltip.offsetWidth, th = tooltip.offsetHeight;
      left = Math.max(tw / 2 + 8, Math.min(left, cRect.width - tw / 2 - 8));
      top -= th;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }

    /* Entrance Animation */
    if (animate && !prefersReducedMotion) {
      nodeEls.forEach(({ el }, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-50%) translateY(10px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateX(-50%) translateY(0)';
          el.classList.add('arch-node--visible');
        }, i * 70);
      });

      pathEls.forEach(({ el }, i) => {
        const len = el.getTotalLength ? el.getTotalLength() : 300;
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
        el.style.transition = 'none';
        setTimeout(() => {
          el.style.transition = 'stroke-dashoffset 0.45s cubic-bezier(0.4,0,0.2,1)';
          el.style.strokeDashoffset = '0';
        }, 150 + i * 50);
      });

      textEls.forEach(({ el }, i) => {
        if (el.tagName === 'text') {
          el.style.opacity = '0';
          setTimeout(() => {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = '1';
          }, 350 + i * 50);
        } else {
          el.style.opacity = '0';
          setTimeout(() => {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = '0.85';
          }, 350 + i * 50);
        }
      });
    } else {
      nodeEls.forEach(({ el }) => el.classList.add('arch-node--visible'));
    }
  }

  /* Update Video */
  function updateVideo(projectId) {
    const data = VIDEO_DATA[projectId];
    if (!data || !videoPanel) return;

    videoTitle.textContent = data.title;
    videoDesc.textContent = data.desc;

    if (data.url) {
      videoIframe.src = data.url;
      videoIframe.classList.add('video-panel__iframe--active');
      videoPlaceholder.classList.add('video-panel__placeholder--hidden');
    } else {
      videoIframe.src = '';
      videoIframe.classList.remove('video-panel__iframe--active');
      videoPlaceholder.classList.remove('video-panel__placeholder--hidden');
    }
  }

  /* Design Carousel */
  const carouselEl = document.getElementById('design-carousel');
  const carouselTrack = document.getElementById('design-carousel-track');
  const carouselDots = document.getElementById('design-carousel-dots');
  const carouselPrev = document.getElementById('design-carousel-prev');
  const carouselNext = document.getElementById('design-carousel-next');
  const carouselTitle = document.getElementById('design-carousel-title');
  const carouselDesc = document.getElementById('design-carousel-desc');

  function renderCarousel(projectId) {
    const data = DESIGN_DATA[projectId];
    if (!data || !carouselTrack) return;

    carouselIndex = 0;
    carouselTitle.textContent = data.title;
    carouselDesc.textContent = data.desc;

    var html = '';
    data.slides.forEach(function (slide, i) {
      html += '<div class="design-carousel__slide' + (i === 0 ? ' design-carousel__slide--active' : '') + '">';
      if (slide.coming) {
        html += '<div class="design-carousel__coming-soon">';
        html += '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
        html += '<span>' + slide.label + '</span>';
        html += '</div>';
      } else {
        html += '<img src="' + slide.image + '" alt="' + slide.label + '">';
      }
      html += '</div>';
    });
    carouselTrack.innerHTML = html;

    var dotsHtml = '';
    data.slides.forEach(function (_, i) {
      dotsHtml += '<button class="design-carousel__dot' + (i === 0 ? ' design-carousel__dot--active' : '') + '" data-index="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
    });
    carouselDots.innerHTML = dotsHtml;

    updateCarouselButtons(data.slides.length);
    startCarouselTimer();
  }

  function updateCarousel(total) {
    var slides = carouselTrack.querySelectorAll('.design-carousel__slide');
    var dots = carouselDots.querySelectorAll('.design-carousel__dot');
    slides.forEach(function (s, i) { s.classList.toggle('design-carousel__slide--active', i === carouselIndex); });
    dots.forEach(function (d, i) { d.classList.toggle('design-carousel__dot--active', i === carouselIndex); });
    updateCarouselButtons(total);
  }

  function updateCarouselButtons(total) {
    if (carouselPrev) carouselPrev.disabled = carouselIndex <= 0;
    if (carouselNext) carouselNext.disabled = carouselIndex >= total - 1;
  }

  if (carouselPrev) {
    carouselPrev.addEventListener('click', function () {
      var total = carouselTrack.querySelectorAll('.design-carousel__slide').length;
      if (carouselIndex > 0) { carouselIndex--; updateCarousel(total); }
      resetCarouselTimer();
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener('click', function () {
      var total = carouselTrack.querySelectorAll('.design-carousel__slide').length;
      if (carouselIndex < total - 1) { carouselIndex++; updateCarousel(total); }
      resetCarouselTimer();
    });
  }

  if (carouselDots) {
    carouselDots.addEventListener('click', function (e) {
      var dot = e.target.closest('.design-carousel__dot');
      if (!dot) return;
      carouselIndex = parseInt(dot.dataset.index);
      var total = carouselTrack.querySelectorAll('.design-carousel__slide').length;
      updateCarousel(total);
      resetCarouselTimer();
    });
  }

  /* Carousel Auto-play */
  var carouselTimer = null;

  function startCarouselTimer() {
    stopCarouselTimer();
    carouselTimer = setInterval(function () {
      var total = carouselTrack.querySelectorAll('.design-carousel__slide').length;
      if (total <= 1) return;
      carouselIndex = (carouselIndex + 1) % total;
      updateCarousel(total);
    }, 4000);
  }

  function stopCarouselTimer() {
    if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
  }

  function resetCarouselTimer() {
    stopCarouselTimer();
    startCarouselTimer();
  }

  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stopCarouselTimer);
    carouselEl.addEventListener('mouseleave', startCarouselTimer);
  }

  /* Tab Switching */
  selector.addEventListener('click', (e) => {
    const tab = e.target.closest('.arch-selector__tab');
    if (!tab) return;

    selector.querySelectorAll('.arch-selector__tab').forEach(t => t.classList.remove('arch-selector__tab--active'));
    tab.classList.add('arch-selector__tab--active');

    const projectId = tab.dataset.project;
    if (projectId !== currentProject) {
      currentProject = projectId;
      zoomLevel = 1;
      applyZoom();
      renderDiagram(projectId, true);
      updateVideo(projectId);
      renderCarousel(projectId);
    }
  });

  /* View Mode Switching */
  const designToggle = document.getElementById('view-design-toggle');
  const designDropdown = document.getElementById('view-design-dropdown');

  if (viewMode) {
    viewMode.addEventListener('click', (e) => {
      const tab = e.target.closest('.view-mode__tab');
      if (!tab) return;

      /* Toggle design dropdown */
      if (tab === designToggle) {
        e.stopPropagation();
        const isOpen = designDropdown.classList.contains('view-mode__dropdown--open');
        designDropdown.classList.toggle('view-mode__dropdown--open', !isOpen);
        designToggle.classList.toggle('view-mode__parent--open', !isOpen);
        return;
      }

      /* Close dropdown on any selection */
      if (designDropdown) {
        designDropdown.classList.remove('view-mode__dropdown--open');
        designToggle.classList.remove('view-mode__parent--open');
      }

      /* Deactivate all tabs */
      viewMode.querySelectorAll('.view-mode__tab').forEach(t => t.classList.remove('view-mode__tab--active'));
      viewMode.querySelectorAll('.view-mode__dropdown .view-mode__tab').forEach(t => t.classList.remove('view-mode__tab--active'));
      tab.classList.add('view-mode__tab--active');

      /* Also highlight parent if dropdown item selected */
      const mode = tab.dataset.mode;
      if (mode === 'design-web' || mode === 'design-system') {
        designToggle.classList.add('view-mode__tab--active');
      }

      if (mode !== currentMode) {
        currentMode = mode;
        archContent.setAttribute('data-mode', mode);
      }
    });

    /* Close dropdown when clicking outside */
    document.addEventListener('click', (e) => {
      if (!viewMode.contains(e.target)) {
        if (designDropdown) designDropdown.classList.remove('view-mode__dropdown--open');
        if (designToggle) designToggle.classList.remove('view-mode__parent--open');
      }
    });
  }

  /* Zoom */
  const zoomIn = document.getElementById('arch-zoom-in');
  const zoomOut = document.getElementById('arch-zoom-out');
  const zoomReset = document.getElementById('arch-zoom-reset');

  function applyZoom() {
    diagram.style.transform = 'scale(' + zoomLevel + ')';
    diagram.style.transformOrigin = 'center top';
  }

  if (zoomIn) zoomIn.addEventListener('click', () => {
    if (typeof panzoom !== 'undefined') return;
    zoomLevel = Math.min(1.8, zoomLevel + 0.15); applyZoom();
  });
  if (zoomOut) zoomOut.addEventListener('click', () => {
    if (typeof panzoom !== 'undefined') return;
    zoomLevel = Math.max(0.5, zoomLevel - 0.15); applyZoom();
  });
  if (zoomReset) zoomReset.addEventListener('click', () => {
    if (typeof panzoom !== 'undefined') return;
    zoomLevel = 1; applyZoom();
  });

  /* Initial Render */
  if (archContent) {
    archContent.setAttribute('data-mode', currentMode);
  }
  renderDiagram('postais-parnaiba', true);
  updateVideo('postais-parnaiba');
  renderCarousel('postais-parnaiba');

  /* ============================================================
     System Running Animation — Particles + Hover
     ============================================================ */
  let particleFrame = null;
  let particles = [];

  function createParticle(pathEl) {
    const p = document.createElement('div');
    p.className = 'arch-particle';
    canvas.appendChild(p);
    return { el: p, path: pathEl, offset: Math.random(), speed: 0.003 + Math.random() * 0.004 };
  }

  function animateParticles() {
    const dRect = diagram.getBoundingClientRect();
    particles.forEach(p => {
      p.offset = (p.offset + p.speed) % 1;
      const len = p.path.getTotalLength ? p.path.getTotalLength() : 100;
      const pt = p.path.getPointAtLength(p.offset * len);
      const scaleX = dRect.width / SVG_W;
      const scaleY = dRect.height / SVG_H;
      p.el.style.left = (pt.x * scaleX) + 'px';
      p.el.style.top = (pt.y * scaleY) + 'px';
      p.el.style.opacity = '0.9';
    });
    particleFrame = requestAnimationFrame(animateParticles);
  }

  function startRunning() {
    if (prefersReducedMotion) return;
    canvas.classList.add('is-running');
    /* Create particles on active paths */
    const activePaths = diagram.querySelectorAll('.arch-svg path');
    particles.forEach(p => p.el.remove());
    particles = [];
    activePaths.forEach(path => {
      for (let i = 0; i < 2; i++) {
        particles.push(createParticle(path));
      }
    });
    animateParticles();
  }

  function stopRunning() {
    canvas.classList.remove('is-running');
    if (particleFrame) { cancelAnimationFrame(particleFrame); particleFrame = null; }
    particles.forEach(p => p.el.remove());
    particles = [];
  }

  canvas.addEventListener('mouseenter', startRunning);
  canvas.addEventListener('mouseleave', stopRunning);

  /* Also stop running when hovering a specific node */
  const origSetActive = (function() {
    let _active = null;
    return {
      get: () => _active,
      set: (v) => { _active = v; }
    };
  })();
})();

/* ============================================================
   PANZOOM — Touch zoom/pan on architecture diagram
   ============================================================ */
(function () {
  const diagram = document.getElementById('arch-diagram');
  const canvas = document.getElementById('arch-canvas');
  if (!diagram || !canvas) return;

  if (typeof panzoom === 'undefined') return;

  let pz = null;

  function initPanzoom() {
    if (pz) pz.destroy();
    pz = panzoom(diagram, {
      maxZoom: 2,
      minZoom: 0.5,
      bounds: true,
      boundsPadding: 0.1,
      touch: true,
      zoomDoubleClickSpeed: 1,
    });
  }

  const observer = new MutationObserver(() => {
    if (diagram.querySelector('.arch-svg')) {
      initPanzoom();
    }
  });
  observer.observe(diagram, { childList: true });

  if (diagram.querySelector('.arch-svg')) {
    initPanzoom();
  }

  const zoomIn = document.getElementById('arch-zoom-in');
  const zoomOut = document.getElementById('arch-zoom-out');
  const zoomReset = document.getElementById('arch-zoom-reset');

  if (zoomIn) zoomIn.addEventListener('click', () => { if (pz) pz.zoomTo(pz.getZoom() * 1.2, { animate: true }); });
  if (zoomOut) zoomOut.addEventListener('click', () => { if (pz) pz.zoomTo(pz.getZoom() * 0.8, { animate: true }); });
  if (zoomReset) zoomReset.addEventListener('click', () => { if (pz) pz.reset({ animate: true }); });
})();

/* ============================================================
   TIMELINE — Horizontal scroll + expand/collapse
   ============================================================ */
(function () {
  const track = document.getElementById('timeline-track');
  const leftBtn = document.getElementById('timeline-left');
  const rightBtn = document.getElementById('timeline-right');
  if (!track) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Arrow scroll */
  const scrollAmount = 260;

  function updateArrows() {
    if (leftBtn) leftBtn.disabled = track.scrollLeft <= 0;
    if (rightBtn) rightBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  }

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  track.addEventListener('scroll', updateArrows, { passive: true });
  updateArrows();

  /* Expand/collapse cards */
  const items = document.querySelectorAll('.timeline__item');
  items.forEach(item => {
    const expandBtn = item.querySelector('.timeline__expand');
    if (!expandBtn) return;

    expandBtn.addEventListener('click', () => {
      const isExpanded = item.classList.contains('timeline__item--expanded');
      items.forEach(i => i.classList.remove('timeline__item--expanded'));
      if (!isExpanded) {
        item.classList.add('timeline__item--expanded');
      }
    });
  });

  /* Entrance animation */
  if (prefersReducedMotion) {
    items.forEach(item => {
      const card = item.querySelector('.timeline__card');
      if (card) card.classList.add('timeline__card--visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target.querySelector('.timeline__card');
        if (card) {
          const idx = Array.from(items).indexOf(entry.target);
          setTimeout(() => {
            card.classList.add('timeline__card--visible');
          }, idx * 80);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('reveal--visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 72;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });
})();

/* ============================================================
   THEME TOGGLE — Dark / Light
   ============================================================ */
(function () {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  if (!toggle) return;

  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

/* ============================================================
   HERO — Mouse Parallax on Tech Icons
   ============================================================ */
(function () {
  const hero = document.getElementById('hero');
  const icons = document.querySelectorAll('.hero__tech');
  if (!hero || !icons.length) return;

  let mouseX = 0, mouseY = 0;
  let currentX = [], currentY = [];
  let targetsX = [], targetsY = [];

  icons.forEach((_, i) => {
    currentX[i] = 0;
    currentY[i] = 0;
    targetsX[i] = 0;
    targetsY[i] = 0;
  });

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  hero.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  function animate() {
    icons.forEach((icon, i) => {
      const depth = 20 + (i * 12);
      targetsX[i] = mouseX * depth;
      targetsY[i] = mouseY * depth;
      currentX[i] += (targetsX[i] - currentX[i]) * 0.08;
      currentY[i] += (targetsY[i] - currentY[i]) * 0.08;
      icon.style.transform = `translate(${currentX[i]}px, ${currentY[i]}px)`;
    });
    requestAnimationFrame(animate);
  }
  animate();
})();
