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
   TERMINAL — Typing animation (Linux)
   ============================================================ */
(function () {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = body.querySelectorAll('.terminal__line');

  if (prefersReducedMotion) {
    lines.forEach(line => line.classList.add('terminal__line--visible'));
    return;
  }

  lines.forEach(line => { line.style.opacity = '0'; line.style.transform = 'translateY(4px)'; });

  let started = false;

  function animateTerminal() {
    if (started) return;
    started = true;

    const sequence = [
      { type: 'line', el: lines[0], delay: 200 },
      { type: 'line', el: lines[1], delay: 400 },
      { type: 'line', el: lines[2], delay: 300 },
      { type: 'line', el: lines[3], delay: 400 },
      { type: 'line', el: lines[4], delay: 300 },
      { type: 'line', el: lines[5], delay: 400 },
      { type: 'line', el: lines[6], delay: 300 },
      { type: 'line', el: lines[7], delay: 500 },
      { type: 'line', el: lines[8], delay: 200 },
    ];

    let totalDelay = 0;
    sequence.forEach(step => {
      totalDelay += step.delay;
      setTimeout(() => {
        step.el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        step.el.style.opacity = '1';
        step.el.style.transform = 'translateY(0)';
        step.el.classList.add('terminal__line--visible');
      }, totalDelay);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateTerminal();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(body);
})();

/* ============================================================
   TYPEWRITER — Hero subtitle
   ============================================================ */
(function () {
  const phrases = [
    'Construindo APIs escaláveis...',
    'Arquitetando sistemas distribuídos...',
    'Automatizando processos...',
    'Python • FastAPI • Docker • PostgreSQL',
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
  'tarefa-agent': {
    title: 'TarefaAgent',
    desc: 'Backend para automação de tarefas/agendamentos com assistente de IA.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Alembic', 'Docker'],
    github: 'https://github.com/MartinsSallys',
    tree: [
      { type: 'dir', name: 'app/' },
      { type: 'dir', name: '  api/', indent: 1 },
      { type: 'dir', name: '  models/', indent: 1 },
      { type: 'dir', name: '  services/', indent: 1 },
      { type: 'dir', name: '  core/', indent: 1 },
      { type: 'dir', name: 'tests/' },
      { type: 'dir', name: 'frontend/' },
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
    html += '<span class="terminal-explorer__item-desc">' + p.stack.slice(0, 3).join(' · ') + '</span>';
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
  if (!canvas || !diagram || !selector) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const SVG_W = 960, SVG_H = 620;

  /* ── SVG Icons ─────────────────────────────────────────── */
  const ICONS = {
    browser:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    api:      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    lock:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    server:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/></svg>',
    db:       '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    wrench:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    docker:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    check:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    gear:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    shield:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    database: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  };

  /* ── Project Architecture Data ──────────────────────────── */
  const PROJECTS = {
    generic: {
      nodes: [
        { id: 'client',     x: 500, y: 40,  icon: 'browser',  label: 'CLIENT',     tech: 'Browser' },
        { id: 'fastapi',    x: 500, y: 155, icon: 'api',      label: 'FASTAPI',    tech: 'REST API' },
        { id: 'auth',       x: 305, y: 275, icon: 'lock',     label: 'AUTH',       tech: 'JWT' },
        { id: 'services',   x: 580, y: 275, icon: 'server',   label: 'SERVICES',   tech: 'Business Logic' },
        { id: 'sqlalchemy', x: 580, y: 400, icon: 'db',       label: 'SQLALCHEMY', tech: 'ORM' },
        { id: 'postgresql', x: 580, y: 520, icon: 'database', label: 'POSTGRESQL', tech: 'Database' },
        { id: 'alembic',    x: 305, y: 520, icon: 'wrench',   label: 'ALEMBIC',    tech: 'Migrations' },
        { id: 'docker',     x: 800, y: 275, icon: 'docker',   label: 'DOCKER',     tech: 'Infrastructure' },
        { id: 'pytest',     x: 800, y: 400, icon: 'check',    label: 'PYTEST',     tech: 'Testing' },
      ],
      connections: [
        { from: 'client',     to: 'fastapi',    label: 'HTTP / JSON' },
        { from: 'fastapi',    to: 'auth',       label: 'Validate' },
        { from: 'fastapi',    to: 'services',   label: 'DI' },
        { from: 'services',   to: 'sqlalchemy', label: 'ORM' },
        { from: 'sqlalchemy', to: 'postgresql', label: 'SQL' },
        { from: 'alembic',    to: 'postgresql', label: 'Migrate' },
        { from: 'pytest',     to: 'services',   label: 'Test' },
        { from: 'docker',     to: 'fastapi',    label: 'Run' },
      ],
    },

    'tarefa-agent': {
      nodes: [
        { id: 'client',     x: 500, y: 40,  icon: 'browser',  label: 'CLIENT',     tech: 'Browser' },
        { id: 'fastapi',    x: 500, y: 155, icon: 'api',      label: 'FASTAPI',    tech: 'REST API' },
        { id: 'auth',       x: 305, y: 275, icon: 'shield',   label: 'AUTH',       tech: 'JWT' },
        { id: 'services',   x: 580, y: 275, icon: 'server',   label: 'SERVICES',   tech: 'Task Scheduling' },
        { id: 'sqlalchemy', x: 580, y: 400, icon: 'db',       label: 'SQLALCHEMY', tech: 'ORM + asyncpg' },
        { id: 'postgresql', x: 580, y: 520, icon: 'database', label: 'POSTGRESQL', tech: 'Database' },
        { id: 'alembic',    x: 305, y: 520, icon: 'wrench',   label: 'ALEMBIC',    tech: 'Migrations' },
        { id: 'docker',     x: 800, y: 275, icon: 'docker',   label: 'DOCKER',     tech: 'Containers' },
        { id: 'pytest',     x: 800, y: 400, icon: 'check',    label: 'PYTEST',     tech: 'Testing' },
      ],
      connections: [
        { from: 'client',     to: 'fastapi',    label: 'HTTP / JSON' },
        { from: 'fastapi',    to: 'auth',       label: 'Validate' },
        { from: 'fastapi',    to: 'services',   label: 'DI' },
        { from: 'services',   to: 'sqlalchemy', label: 'ORM' },
        { from: 'sqlalchemy', to: 'postgresql', label: 'SQL' },
        { from: 'alembic',    to: 'postgresql', label: 'Migrate' },
        { from: 'pytest',     to: 'services',   label: 'Test' },
        { from: 'docker',     to: 'fastapi',    label: 'Run' },
      ],
    },

    'beck-global': {
      nodes: [
        { id: 'client',     x: 500, y: 40,  icon: 'browser',  label: 'CLIENT',     tech: 'Browser' },
        { id: 'fastapi',    x: 500, y: 155, icon: 'api',      label: 'FASTAPI',    tech: 'REST API' },
        { id: 'services',   x: 500, y: 275, icon: 'gear',     label: 'SERVICES',   tech: 'Reusable Patterns' },
        { id: 'sqlalchemy', x: 500, y: 400, icon: 'db',       label: 'SQLALCHEMY', tech: 'ORM' },
        { id: 'postgresql', x: 500, y: 520, icon: 'database', label: 'POSTGRESQL', tech: 'Database' },
        { id: 'alembic',    x: 305, y: 520, icon: 'wrench',   label: 'ALEMBIC',    tech: 'Migrations' },
        { id: 'docker',     x: 700, y: 275, icon: 'docker',   label: 'DOCKER',     tech: 'Containers' },
      ],
      connections: [
        { from: 'client',     to: 'fastapi',    label: 'HTTP / JSON' },
        { from: 'fastapi',    to: 'services',   label: 'DI' },
        { from: 'services',   to: 'sqlalchemy', label: 'ORM' },
        { from: 'sqlalchemy', to: 'postgresql', label: 'SQL' },
        { from: 'alembic',    to: 'postgresql', label: 'Migrate' },
        { from: 'docker',     to: 'fastapi',    label: 'Run' },
      ],
    },

    'postais-api': {
      nodes: [
        { id: 'client',     x: 500, y: 40,  icon: 'browser',  label: 'CLIENT',     tech: 'Browser' },
        { id: 'fastapi',    x: 500, y: 155, icon: 'api',      label: 'FASTAPI',    tech: 'REST API' },
        { id: 'services',   x: 500, y: 275, icon: 'server',   label: 'SERVICES',   tech: 'Business Logic' },
        { id: 'sqlalchemy', x: 500, y: 400, icon: 'db',       label: 'SQLALCHEMY', tech: 'ORM' },
        { id: 'postgresql', x: 500, y: 520, icon: 'database', label: 'POSTGRESQL', tech: 'Database' },
        { id: 'alembic',    x: 305, y: 520, icon: 'wrench',   label: 'ALEMBIC',    tech: 'Migrations' },
        { id: 'docker',     x: 700, y: 275, icon: 'docker',   label: 'DOCKER',     tech: 'Containers' },
        { id: 'pytest',     x: 700, y: 400, icon: 'check',    label: 'PYTEST',     tech: 'Testing' },
      ],
      connections: [
        { from: 'client',     to: 'fastapi',    label: 'HTTP / JSON' },
        { from: 'fastapi',    to: 'services',   label: 'DI' },
        { from: 'services',   to: 'sqlalchemy', label: 'ORM' },
        { from: 'sqlalchemy', to: 'postgresql', label: 'SQL' },
        { from: 'alembic',    to: 'postgresql', label: 'Migrate' },
        { from: 'pytest',     to: 'services',   label: 'Test' },
        { from: 'docker',     to: 'fastapi',    label: 'Run' },
      ],
    },
  };

  /* ── State ─────────────────────────────────────────────── */
  let currentProject = 'generic';
  let activeNode = null;
  let zoomLevel = 1;

  /* ── SVG Helpers ───────────────────────────────────────── */
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

  /* ── Render Diagram ────────────────────────────────────── */
  function renderDiagram(projectId, animate) {
    const project = PROJECTS[projectId];
    if (!project) return;

    diagram.innerHTML = '';
    activeNode = null;
    canvas.classList.remove('is-hovering');

    const nodeMap = {};
    project.nodes.forEach(n => { nodeMap[n.id] = n; });

    /* SVG */
    const svg = createSVG('svg', {
      class: 'arch-svg',
      viewBox: `0 0 ${SVG_W} ${SVG_H}`,
      preserveAspectRatio: 'xMidYMid meet',
    });

    /* Connections */
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
      });
      svg.appendChild(path);
      pathEls.push({ el: path, conn });

      const mx = (fromN.x + toN.x) / 2;
      const my = (fromN.y + 70 + toN.y) / 2;
      const text = createSVG('text', {
        x: mx, y: my - 8,
        'text-anchor': 'middle',
        'data-from': conn.from,
        'data-to': conn.to,
      });
      text.textContent = conn.label;
      svg.appendChild(text);
      textEls.push({ el: text, conn });
    });

    diagram.appendChild(svg);

    /* Nodes */
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
        '<span class="arch-node__tech">' + n.tech + '</span>';
      diagram.appendChild(el);
      nodeEls.push({ el, data: n });
    });

    /* ── Adjacency ─────────────────────────────────────── */
    const adj = {};
    project.nodes.forEach(n => { adj[n.id] = []; });
    project.connections.forEach(c => {
      if (adj[c.from]) adj[c.from].push(c.to);
      if (adj[c.to]) adj[c.to].push(c.from);
    });

    /* ── Hover ─────────────────────────────────────────── */
    function setActive(nodeId) {
      activeNode = nodeId;
      canvas.classList.toggle('is-hovering', !!nodeId);

      nodeEls.forEach(({ el, data }) => {
        el.classList.remove('arch-node--active', 'arch-node--related');
        if (data.id === nodeId) el.classList.add('arch-node--active');
        else if (nodeId && adj[nodeId] && adj[nodeId].includes(data.id)) el.classList.add('arch-node--related');
      });

      pathEls.forEach(({ el, conn }) => {
        el.classList.toggle('arch-path--active', !!nodeId && (conn.from === nodeId || conn.to === nodeId));
      });
      textEls.forEach(({ el, conn }) => {
        el.classList.toggle('arch-text--active', !!nodeId && (conn.from === nodeId || conn.to === nodeId));
      });
    }

    function clearActive() {
      activeNode = null;
      canvas.classList.remove('is-hovering');
      nodeEls.forEach(({ el }) => el.classList.remove('arch-node--active', 'arch-node--related'));
      pathEls.forEach(({ el }) => el.classList.remove('arch-path--active'));
      textEls.forEach(({ el }) => el.classList.remove('arch-text--active'));
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

    /* ── Entrance Animation ────────────────────────────── */
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
        el.style.opacity = '0';
        setTimeout(() => {
          el.style.transition = 'opacity 0.3s ease';
          el.style.opacity = '1';
        }, 350 + i * 50);
      });
    } else {
      nodeEls.forEach(({ el }) => el.classList.add('arch-node--visible'));
    }
  }

  /* ── Tab Switching ─────────────────────────────────────── */
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
    }
  });

  /* ── Zoom ──────────────────────────────────────────────── */
  const zoomIn = document.getElementById('arch-zoom-in');
  const zoomOut = document.getElementById('arch-zoom-out');
  const zoomReset = document.getElementById('arch-zoom-reset');

  function applyZoom() {
    diagram.style.transform = 'scale(' + zoomLevel + ')';
    diagram.style.transformOrigin = 'center top';
  }

  if (zoomIn) zoomIn.addEventListener('click', () => { zoomLevel = Math.min(1.8, zoomLevel + 0.15); applyZoom(); });
  if (zoomOut) zoomOut.addEventListener('click', () => { zoomLevel = Math.max(0.5, zoomLevel - 0.15); applyZoom(); });
  if (zoomReset) zoomReset.addEventListener('click', () => { zoomLevel = 1; applyZoom(); });

  /* ── Initial Render ────────────────────────────────────── */
  renderDiagram('generic', true);
})();

/* ============================================================
   EVOLUTION — Staircase animation
   ============================================================ */
(function () {
  const steps = document.querySelectorAll('.staircase__step');
  if (!steps.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    steps.forEach(step => step.classList.add('staircase__step--visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('staircase__step--visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  steps.forEach(step => observer.observe(step));
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
