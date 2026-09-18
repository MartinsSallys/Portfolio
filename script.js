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
        const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atPageEnd) {
          navLinkEls.forEach(link => link.classList.toggle('navbar__link--active', link.dataset.section === 'contato'));
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('navbar__toggle--active');
    navLinks.classList.toggle('navbar__links--open');
    const isOpen = navLinks.classList.contains('navbar__links--open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    if (isOpen) requestAnimationFrame(() => navLinkEls[0]?.focus());
  });

  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('navbar__toggle--active');
      navLinks.classList.remove('navbar__links--open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !navLinks.classList.contains('navbar__links--open')) return;
    navToggle.classList.remove('navbar__toggle--active');
    navLinks.classList.remove('navbar__links--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
    navToggle.focus();
  });

  const sections = Array.from(document.querySelectorAll('section[id]')).filter(section => !section.closest('[hidden]'));
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        const id = atPageEnd ? 'contato' : entry.target.getAttribute('id');
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
    'Construindo APIs REST...',
    'Explorando arquitetura de sistemas...',
    'Criando ferramentas para Linux...',
    'Python \u2022 FastAPI \u2022 JavaScript \u2022 Linux',
  ];

  const el = document.getElementById('typewriter');
  if (!el || el.closest('[hidden]')) return;

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
   VERIFIED SYSTEM DESIGN — Project data + accessible renderer
   ============================================================ */
const SYSTEM_ARCHITECTURES = {
  postais: {
    title: 'Postais da Parnaíba',
    type: 'Frontend editorial + integração HTTP',
    repo: 'https://github.com/MartinsSallys/Postais-da-Parnaiba',
    summary: 'Duas interfaces no navegador, conteúdo local e uma API esperada que não está presente no repositório.',
    defaultNode: 'site',
    nodes: [
      {
        id: 'visitor', title: 'Visitante', tech: 'Browser', state: 'boundary', x: 90, y: 105, mobileOrder: 1,
        description: 'Pessoa que navega pelo acervo, pelas páginas editoriais e pelos comparadores de imagens.',
        responsibility: 'Iniciar a navegação pública e as interações no site.',
        evidence: 'index.html · pages/',
      },
      {
        id: 'site', title: 'Site editorial', tech: 'HTML + CSS', state: 'implemented', x: 300, y: 105, mobileOrder: 2,
        description: 'Páginas públicas com conteúdo histórico, navegação e apresentação do acervo.',
        responsibility: 'Renderizar o conteúdo editorial e servir como entrada para as interações.',
        evidence: 'index.html · pages/ · css/',
      },
      {
        id: 'scripts', title: 'Scripts de interface', tech: 'JavaScript', state: 'implemented', x: 525, y: 105, mobileOrder: 3,
        description: 'Controla slider, comparador antes/depois e carregamento das coleções dinâmicas.',
        responsibility: 'Adicionar comportamento à interface e chamar os endpoints esperados.',
        evidence: 'js/slider.js · js/antes-depois.js · js/galeria.js',
      },
      {
        id: 'local-content', title: 'Acervo local', tech: 'HTML + images/', state: 'implemented', x: 525, y: 345, mobileOrder: 4,
        description: 'Conteúdo editorial e imagens versionados junto ao frontend.',
        responsibility: 'Fornecer páginas, textos e imagens que funcionam sem uma API.',
        evidence: 'pages/ · images/',
      },
      {
        id: 'admin', title: 'Painel Admin', tech: 'HTML + JavaScript', state: 'implemented', x: 90, y: 430, mobileOrder: 5,
        description: 'Interface cliente para listar, criar, editar e excluir conteúdo.',
        responsibility: 'Montar formulários e requisições CRUD para a API esperada.',
        evidence: 'admin/index.html · admin/app.js',
      },
      {
        id: 'token', title: 'Token no navegador', tech: 'localStorage', state: 'implemented', x: 300, y: 430, mobileOrder: 6,
        description: 'O cliente armazena um token, lê o campo exp e envia o valor como Bearer.',
        responsibility: 'Anexar a credencial do navegador às requisições administrativas.',
        evidence: 'admin/app.js:5-77',
      },
      {
        id: 'external-api', title: 'API esperada', tech: 'HTTP localhost:8001', state: 'external', x: 800, y: 265, mobileOrder: 7,
        description: 'Contrato HTTP consumido pela galeria e pelo painel, mas sem implementação neste repositório.',
        responsibility: 'Fornecer coleções, autenticação, CRUD e upload quando existir externamente.',
        evidence: 'js/galeria.js:1-99 · admin/app.js:1-688',
      },
    ],
    connections: [
      { from: 'visitor', to: 'site', label: 'navega', state: 'implemented' },
      { from: 'site', to: 'scripts', label: 'carrega scripts', state: 'implemented' },
      { from: 'site', to: 'local-content', label: 'renderiza conteúdo', state: 'implemented' },
      { from: 'scripts', to: 'external-api', label: 'GET coleções', state: 'external' },
      { from: 'admin', to: 'token', label: 'lê credencial', state: 'implemented' },
      { from: 'token', to: 'external-api', label: 'Bearer + CRUD', state: 'external', via: [{ x: 650, y: 505 }, { x: 820, y: 405 }] },
    ],
  },
  beck: {
    title: 'BeckGlobal',
    type: 'Protótipo de API REST',
    repo: 'https://github.com/MartinsSallys/BeckGlobal',
    summary: 'O código define um fluxo CRUD síncrono e aponta para SQLite, mas o checkout não possui a tabela users e ainda não executa esse caminho de ponta a ponta.',
    defaultNode: 'fastapi',
    nodes: [
      {
        id: 'client', title: 'Cliente HTTP', tech: 'JSON / OpenAPI', state: 'boundary', x: 80, y: 100, mobileOrder: 1,
        description: 'Consumidor externo da documentação, do health check e do CRUD de usuários.',
        responsibility: 'Enviar requisições HTTP e receber respostas JSON.',
        evidence: 'app/main.py · app/api/router.py',
      },
      {
        id: 'fastapi', title: 'FastAPI app', tech: 'FastAPI', state: 'implemented', x: 245, y: 100, mobileOrder: 2,
        description: 'Aplicação principal com CORS, tratamento global de erros e inclusão do roteador.',
        responsibility: 'Receber requisições e compor os recursos HTTP da aplicação.',
        evidence: 'app/main.py',
      },
      {
        id: 'router', title: 'Router', tech: '/health + /users', state: 'implemented', x: 415, y: 100, mobileOrder: 3,
        description: 'Agrupa o health check e os cinco endpoints de CRUD de usuários.',
        responsibility: 'Associar métodos e caminhos HTTP aos handlers.',
        evidence: 'app/api/router.py · app/api/routes/',
      },
      {
        id: 'schemas', title: 'Schemas', tech: 'Pydantic', state: 'implemented', x: 590, y: 100, mobileOrder: 4,
        description: 'Valida criação e atualização e filtra a senha das respostas públicas.',
        responsibility: 'Definir os contratos de entrada e saída da API.',
        evidence: 'app/api/schemas.py',
      },
      {
        id: 'handlers', title: 'CRUD handlers', tech: 'Python', state: 'implemented', x: 590, y: 270, mobileOrder: 5,
        description: 'Executa criação, listagem, consulta, atualização e exclusão diretamente sobre o ORM.',
        responsibility: 'Aplicar o fluxo CRUD e converter ausências em respostas HTTP.',
        evidence: 'app/api/routes/users.py',
      },
      {
        id: 'bcrypt', title: 'Hash de senha', tech: 'bcrypt', state: 'implemented', x: 410, y: 360, mobileOrder: 6,
        description: 'Aplica bcrypt antes de persistir senhas em criação e atualização.',
        responsibility: 'Evitar a persistência direta da senha recebida.',
        evidence: 'app/core/security.py · app/api/routes/users.py',
      },
      {
        id: 'session', title: 'DB Session', tech: 'SQLAlchemy', state: 'implemented', x: 760, y: 270, mobileOrder: 7,
        description: 'Fornece uma sessão síncrona por requisição aos handlers.',
        responsibility: 'Executar queries, commits, refresh e fechamento de sessão.',
        evidence: 'app/database/session.py · app/database/connection.py',
      },
      {
        id: 'sqlite', title: 'SQLite selecionado', tech: 'dev.db sem users', state: 'incomplete', x: 920, y: 270, mobileOrder: 8,
        description: 'Banco selecionado pela configuração rastreada no checkout atual.',
        responsibility: 'Persistir a revisão Alembic; a tabela users ainda não existe.',
        evidence: '.env · dev.db',
      },
      {
        id: 'jwt', title: 'JWT helper', tech: 'PyJWT', state: 'incomplete', x: 410, y: 515, mobileOrder: 9,
        description: 'Funções para criar e ler tokens existem, mas nenhuma rota emite token ou exige autenticação.',
        responsibility: 'Base de segurança ainda desconectada do fluxo HTTP.',
        evidence: 'app/core/security.py · app/api/dependencies.py',
      },
      {
        id: 'alembic', title: 'Migration scaffold', tech: 'Alembic', state: 'incomplete', x: 590, y: 515, mobileOrder: 10,
        description: 'A infraestrutura de migração existe, porém a única revisão possui upgrade e downgrade vazios.',
        responsibility: 'Versionar o schema quando uma migração real for criada.',
        evidence: 'alembic/versions/67fc2ff5aaf2_initial.py',
      },
      {
        id: 'compose', title: 'Infra declarada', tech: 'Docker Compose', state: 'configured', x: 760, y: 515, mobileOrder: 11,
        description: 'Dockerfile e Compose declaram os serviços de API e PostgreSQL.',
        responsibility: 'Descrever o ambiente containerizado pretendido.',
        evidence: 'Dockerfile · docker-compose.yml',
      },
      {
        id: 'postgres', title: 'PostgreSQL alvo', tech: 'PostgreSQL 16', state: 'configured', x: 920, y: 515, mobileOrder: 12,
        description: 'Serviço provisionado pelo Compose, mas não usado pela configuração atual da aplicação.',
        responsibility: 'Persistência relacional planejada para o ambiente containerizado.',
        evidence: 'docker-compose.yml · .env.example',
      },
    ],
    connections: [
      { from: 'client', to: 'fastapi', label: 'HTTP', state: 'implemented' },
      { from: 'fastapi', to: 'router', label: 'despacha', state: 'implemented' },
      { from: 'router', to: 'schemas', label: 'valida contrato', state: 'implemented' },
      { from: 'schemas', to: 'handlers', label: 'dados validados', state: 'implemented' },
      { from: 'handlers', to: 'bcrypt', label: 'hash password', state: 'implemented' },
      { from: 'handlers', to: 'session', label: 'query + commit', state: 'implemented' },
      { from: 'session', to: 'sqlite', label: 'schema ausente', state: 'incomplete' },
      { from: 'alembic', to: 'sqlite', label: 'revisão vazia', state: 'incomplete' },
      { from: 'compose', to: 'fastapi', label: 'container API', state: 'configured', via: [{ x: 150, y: 565 }, { x: 150, y: 205 }] },
      { from: 'compose', to: 'postgres', label: 'provisiona serviço', state: 'configured' },
    ],
  },
  flora: {
    title: 'Flora Tropical',
    type: 'Frontend modular com mocks',
    repo: 'https://github.com/MartinsSallys/Flora_Tropical',
    summary: 'Os controllers consomem o ApiService e passam os dados aos renderizadores; a fonte ativa é local e o backend HTTP continua ausente.',
    defaultNode: 'service',
    nodes: [
      {
        id: 'visitor', title: 'Visitante', tech: 'Browser', state: 'boundary', x: 90, y: 120, mobileOrder: 1,
        description: 'Navega pelo catálogo, categorias, unidades e conteúdo medicinal.',
        responsibility: 'Iniciar buscas, filtros, navegação e envio de formulários.',
        evidence: 'index.html · produtos.html · contato.html',
      },
      {
        id: 'pages', title: 'Páginas estáticas', tech: 'HTML + CSS', state: 'implemented', x: 285, y: 120, mobileOrder: 2,
        description: 'Sete páginas HTML compartilham a identidade e carregam scripts em ordem explícita.',
        responsibility: 'Fornecer estrutura, navegação e pontos de montagem do conteúdo.',
        evidence: '*.html · style.css',
      },
      {
        id: 'controllers', title: 'Page controllers', tech: 'JavaScript', state: 'implemented', x: 485, y: 120, mobileOrder: 3,
        description: 'Coordena busca, filtros, formulários e renderização específica de cada página.',
        responsibility: 'Transformar eventos da interface em chamadas ao serviço e atualizações do DOM.',
        evidence: 'js/pages/ · script.js',
      },
      {
        id: 'service', title: 'ApiService', tech: 'fetch + AbortController', state: 'implemented', x: 685, y: 120, mobileOrder: 4,
        description: 'Abstrai acesso a dados, timeout e alternância entre mocks e HTTP.',
        responsibility: 'Entregar coleções aos controllers por uma interface única.',
        evidence: 'js/services.js · js/config.js',
      },
      {
        id: 'mocks', title: 'Mock data ativo', tech: 'JavaScript objects', state: 'implemented', x: 890, y: 120, mobileOrder: 5,
        description: 'Produtos, categorias, unidades, benefícios e FAQ usados pelo site atual.',
        responsibility: 'Permitir navegação demonstrável sem backend.',
        evidence: 'js/mock-data.js · CONFIG.MOCK_DATA=true',
      },
      {
        id: 'renderers', title: 'Renderizadores', tech: 'Template strings', state: 'implemented', x: 485, y: 380, mobileOrder: 6,
        description: 'Funções reutilizáveis montam cards, estados de loading, erros, FAQ e paginação.',
        responsibility: 'Converter os dados recebidos em componentes de interface.',
        evidence: 'js/components.js',
      },
      {
        id: 'dom', title: 'Interface renderizada', tech: 'DOM', state: 'implemented', x: 685, y: 380, mobileOrder: 7,
        description: 'Catálogo e conteúdo final apresentados no navegador.',
        responsibility: 'Exibir resultados, estados vazios e feedback de formulário.',
        evidence: 'js/pages/ · js/components.js',
      },
      {
        id: 'future-api', title: 'API futura', tech: 'HTTP localhost:8000/api', state: 'external', x: 890, y: 380, mobileOrder: 8,
        description: 'Endpoint base configurado, mas sem servidor implementado e com divergências no contrato documentado.',
        responsibility: 'Substituir os mocks quando existir uma implementação compatível.',
        evidence: 'js/config.js · FASTAPI_INTEGRATION.md',
      },
    ],
    connections: [
      { from: 'visitor', to: 'pages', label: 'navega', state: 'implemented' },
      { from: 'pages', to: 'controllers', label: 'carrega', state: 'implemented' },
      { from: 'controllers', to: 'service', label: 'solicita dados', state: 'implemented' },
      { from: 'service', to: 'mocks', label: 'fonte ativa', state: 'implemented' },
      { from: 'controllers', to: 'renderers', label: 'renderiza', state: 'implemented' },
      { from: 'renderers', to: 'dom', label: 'innerHTML', state: 'implemented' },
      { from: 'service', to: 'future-api', label: 'modo futuro', state: 'external' },
    ],
  },
  sysmgr: {
    title: 'sysmgr-cli',
    type: 'CLI de inspeção Linux',
    repo: 'https://github.com/MartinsSallys/sysmgr-cli',
    summary: 'Fluxo local e somente leitura: argumentos entram pela CLI, os dados vêm de procfs e da biblioteca padrão, e o snapshot agregado retorna ao terminal.',
    defaultNode: 'cli',
    nodes: [
      {
        id: 'user', title: 'Usuário no shell', tech: 'Terminal', state: 'boundary', x: 90, y: 270, mobileOrder: 1,
        description: 'Executa o pacote pelo console script ou com python -m sysmgr.',
        responsibility: 'Invocar o comando status e consumir a saída textual.',
        evidence: 'pyproject.toml · sysmgr/__main__.py',
      },
      {
        id: 'cli', title: 'CLI parser', tech: 'argparse', state: 'implemented', x: 285, y: 270, mobileOrder: 2,
        description: 'Registra --help, --version e o subcomando obrigatório status.',
        responsibility: 'Validar argumentos, acionar a coleta e formatar erros.',
        evidence: 'sysmgr/cli.py',
      },
      {
        id: 'status', title: 'get_status', tech: 'Python', state: 'implemented', x: 480, y: 270, mobileOrder: 3,
        description: 'Agrega hostname, usuário, uptime e memória em uma única estrutura.',
        responsibility: 'Orquestrar os leitores do sistema operacional.',
        evidence: 'sysmgr/system.py:31-39',
      },
      {
        id: 'uptime', title: '/proc/uptime', tech: 'Linux procfs', state: 'implemented', x: 680, y: 95, mobileOrder: 4,
        description: 'Fonte do tempo desde a inicialização, convertido para horas e minutos.',
        responsibility: 'Fornecer o uptime do kernel.',
        evidence: 'sysmgr/system.py:5-12',
      },
      {
        id: 'memory', title: '/proc/meminfo', tech: 'Linux procfs', state: 'implemented', x: 680, y: 270, mobileOrder: 5,
        description: 'Fonte de MemTotal, MemAvailable e MemFree.',
        responsibility: 'Fornecer os valores de memória usados na saída.',
        evidence: 'sysmgr/system.py:14-30',
      },
      {
        id: 'identity', title: 'Identidade do host', tech: 'os.uname + getpass', state: 'implemented', x: 680, y: 445, mobileOrder: 6,
        description: 'APIs da biblioteca padrão usadas para hostname e usuário.',
        responsibility: 'Completar o snapshot com identidade do sistema.',
        evidence: 'sysmgr/system.py:31-39',
      },
      {
        id: 'output', title: 'CLI output', tech: 'cli.py + stdout', state: 'implemented', x: 900, y: 270, mobileOrder: 7,
        description: 'Texto final com status do sistema apresentado no terminal.',
        responsibility: 'Receber o snapshot agregado, formatá-lo e imprimir uma leitura humana.',
        evidence: 'sysmgr/cli.py:43-50',
      },
    ],
    connections: [
      { from: 'user', to: 'cli', label: 'sysmgr status', state: 'implemented' },
      { from: 'cli', to: 'status', label: 'executa', state: 'implemented' },
      { from: 'status', to: 'uptime', label: 'lê', state: 'implemented' },
      { from: 'status', to: 'memory', label: 'lê', state: 'implemented' },
      { from: 'status', to: 'identity', label: 'consulta', state: 'implemented' },
      { from: 'status', to: 'output', label: 'snapshot agregado', state: 'implemented', via: [{ x: 515, y: 565 }, { x: 865, y: 565 }] },
    ],
  },
};

(function () {
  const tabs = Array.from(document.querySelectorAll('.system-tab'));
  const panel = document.getElementById('system-panel');
  const map = document.getElementById('system-map');
  const projectType = document.getElementById('system-project-type');
  const projectTitle = document.getElementById('system-project-title');
  const projectRepo = document.getElementById('system-project-repo');
  const summary = document.getElementById('system-summary');
  const inspector = {
    state: document.getElementById('system-inspector-state'),
    index: document.getElementById('system-inspector-index'),
    tech: document.getElementById('system-inspector-tech'),
    title: document.getElementById('system-inspector-title'),
    description: document.getElementById('system-inspector-description'),
    responsibility: document.getElementById('system-inspector-responsibility'),
    connections: document.getElementById('system-inspector-connections'),
    evidence: document.getElementById('system-inspector-evidence'),
  };
  if (!tabs.length || !panel || !map || Object.values(inspector).some(value => !value)) return;

  const NS = 'http://www.w3.org/2000/svg';
  const MAP_WIDTH = 1000;
  const MAP_HEIGHT = 610;
  const NODE_HALF_WIDTH = 76;
  const NODE_HALF_HEIGHT = 46;
  const stateLabels = {
    implemented: 'Implementado',
    configured: 'Configurado',
    external: 'Dependência externa',
    incomplete: 'Incompleto',
    boundary: 'Fronteira do sistema',
  };
  let currentSystem = 'postais';
  let pinnedNode = null;
  let nodeElements = [];
  let edgeElements = [];

  function svgElement(tag, attributes) {
    const element = document.createElementNS(NS, tag);
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    return element;
  }

  function nodeBoundary(origin, target) {
    const dx = target.x - origin.x;
    const dy = target.y - origin.y;
    const scale = 1 / Math.max(Math.abs(dx) / NODE_HALF_WIDTH, Math.abs(dy) / NODE_HALF_HEIGHT);
    return { x: origin.x + dx * scale, y: origin.y + dy * scale };
  }

  function connectionPath(from, to, via) {
    if (via && via.length) {
      const start = nodeBoundary(from, via[0]);
      const end = nodeBoundary(to, via[via.length - 1]);
      const points = via.map(point => `L ${point.x} ${point.y}`).join(' ');
      return `M ${start.x} ${start.y} ${points} L ${end.x} ${end.y}`;
    }
    const start = nodeBoundary(from, to);
    const end = nodeBoundary(to, from);
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    if (Math.abs(dx) >= Math.abs(dy)) {
      const bend = Math.max(50, Math.abs(dx) * 0.45);
      const direction = dx >= 0 ? 1 : -1;
      return `M ${start.x} ${start.y} C ${start.x + bend * direction} ${start.y}, ${end.x - bend * direction} ${end.y}, ${end.x} ${end.y}`;
    }
    const bend = Math.max(45, Math.abs(dy) * 0.42);
    const direction = dy >= 0 ? 1 : -1;
    return `M ${start.x} ${start.y} C ${start.x} ${start.y + bend * direction}, ${end.x} ${end.y - bend * direction}, ${end.x} ${end.y}`;
  }

  function updateInspector(node, project) {
    const orderedNodes = [...project.nodes].sort((a, b) => a.mobileOrder - b.mobileOrder);
    const index = orderedNodes.findIndex(item => item.id === node.id) + 1;
    inspector.state.className = `system-state system-state--${node.state}`;
    inspector.state.textContent = stateLabels[node.state] || node.state;
    inspector.index.textContent = `${String(index).padStart(2, '0')} / ${String(project.nodes.length).padStart(2, '0')}`;
    inspector.tech.textContent = node.tech;
    inspector.title.textContent = node.title;
    inspector.description.textContent = node.description;
    inspector.responsibility.textContent = node.responsibility;
    const relations = project.connections
      .filter(connection => connection.from === node.id || connection.to === node.id)
      .map(connection => {
        const otherId = connection.from === node.id ? connection.to : connection.from;
        const other = project.nodes.find(item => item.id === otherId);
        const direction = connection.from === node.id ? 'Envia para' : 'Recebe de';
        return `${direction} ${other ? other.title : otherId}: ${connection.label} (${stateLabels[connection.state]})`;
      });
    inspector.connections.textContent = relations.length ? relations.join(' · ') : 'Componente lateral, ainda sem conexão com o fluxo principal.';
    inspector.evidence.textContent = node.evidence;
  }

  function setActiveNode(nodeId, persist) {
    const project = SYSTEM_ARCHITECTURES[currentSystem];
    const node = project.nodes.find(item => item.id === nodeId);
    if (!node) return;
    if (persist) pinnedNode = nodeId;

    const related = new Set([nodeId]);
    project.connections.forEach(connection => {
      if (connection.from === nodeId) related.add(connection.to);
      if (connection.to === nodeId) related.add(connection.from);
    });

    nodeElements.forEach(({ element, node: item }) => {
      element.classList.toggle('system-node--active', item.id === nodeId);
      element.classList.toggle('system-node--related', item.id !== nodeId && related.has(item.id));
      element.classList.toggle('system-node--muted', !related.has(item.id));
      element.setAttribute('aria-pressed', String(item.id === pinnedNode));
    });

    edgeElements.forEach(({ path, connection }) => {
      const active = connection.from === nodeId || connection.to === nodeId;
      path.classList.toggle('system-edge--active', active);
      path.classList.toggle('system-edge--muted', !active);
    });

    updateInspector(node, project);
  }

  function renderSystem(systemId) {
    const project = SYSTEM_ARCHITECTURES[systemId];
    if (!project) return;
    currentSystem = systemId;
    pinnedNode = project.defaultNode || project.nodes[0].id;
    nodeElements = [];
    edgeElements = [];
    map.innerHTML = '';

    projectType.textContent = project.type;
    projectTitle.textContent = project.title;
    projectRepo.href = project.repo;
    summary.textContent = project.summary;
    map.setAttribute('aria-label', `Fluxo arquitetural de ${project.title}`);

    const nodeById = Object.fromEntries(project.nodes.map(node => [node.id, node]));
    const svg = svgElement('svg', {
      class: 'system-map__svg',
      viewBox: `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`,
      'aria-hidden': 'true',
      preserveAspectRatio: 'none',
    });
    const defs = svgElement('defs', {});
    ['implemented', 'configured', 'external', 'incomplete'].forEach(state => {
      const marker = svgElement('marker', {
        id: `system-arrow-${state}`,
        viewBox: '0 0 10 8',
        refX: '9',
        refY: '4',
        markerWidth: '7',
        markerHeight: '6',
        orient: 'auto',
      });
      marker.appendChild(svgElement('path', { d: 'M 0 0 L 10 4 L 0 8 z', class: `system-arrow system-arrow--${state}` }));
      defs.appendChild(marker);
    });
    svg.appendChild(defs);

    project.connections.forEach(connection => {
      const from = nodeById[connection.from];
      const to = nodeById[connection.to];
      if (!from || !to) return;
      const path = svgElement('path', {
        d: connectionPath(from, to, connection.via),
        class: `system-edge system-edge--${connection.state}`,
        'marker-end': `url(#system-arrow-${connection.state})`,
      });
      svg.appendChild(path);
      edgeElements.push({ path, connection });
    });
    map.appendChild(svg);

    [...project.nodes]
      .sort((a, b) => a.mobileOrder - b.mobileOrder)
      .forEach(node => {
        const relations = project.connections
          .filter(connection => connection.from === node.id || connection.to === node.id)
          .map(connection => `${connection.from === node.id ? '→' : '←'} ${connection.label} · ${stateLabels[connection.state]}`);
        const relationSummary = relations.length ? relations.join(' · ') : 'componente lateral';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `system-node system-node--${node.state}`;
        button.dataset.node = node.id;
        button.style.left = `${node.x / MAP_WIDTH * 100}%`;
        button.style.top = `${node.y / MAP_HEIGHT * 100}%`;
        button.style.setProperty('--mobile-order', node.mobileOrder);
        button.setAttribute('aria-label', `${node.title}. ${stateLabels[node.state]}. ${node.tech}. Conexões: ${relationSummary}`);
        button.setAttribute('aria-pressed', 'false');
        button.innerHTML =
          `<span class="system-node__state" aria-hidden="true"></span>` +
          `<strong>${node.title}</strong>` +
          `<small>${node.tech}</small>` +
          `<span class="system-node__mobile-flow">${relationSummary}</span>`;
        button.addEventListener('mouseenter', () => setActiveNode(node.id, false));
        button.addEventListener('mouseleave', () => setActiveNode(pinnedNode, false));
        button.addEventListener('focus', () => setActiveNode(node.id, false));
        button.addEventListener('blur', () => setActiveNode(pinnedNode, false));
        button.addEventListener('click', () => setActiveNode(node.id, true));
        map.appendChild(button);
        nodeElements.push({ element: button, node });
      });

    const connections = document.createElement('section');
    connections.className = 'system-connections';
    connections.setAttribute('aria-label', `Conexões de ${project.title}`);
    const connectionsTitle = document.createElement('h4');
    connectionsTitle.textContent = 'Conexões do fluxo';
    const connectionsList = document.createElement('ol');
    project.connections.forEach(connection => {
      const from = nodeById[connection.from];
      const to = nodeById[connection.to];
      if (!from || !to) return;
      const item = document.createElement('li');
      item.innerHTML = `<strong>${from.title}</strong><span aria-hidden="true">→</span><strong>${to.title}</strong><em>${connection.label}</em><span class="system-connection-state system-connection-state--${connection.state}">${stateLabels[connection.state]}</span>`;
      connectionsList.appendChild(item);
    });
    connections.append(connectionsTitle, connectionsList);
    map.appendChild(connections);

    setActiveNode(pinnedNode, true);
  }

  function selectTab(tab, moveFocus) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.classList.toggle('system-tab--active', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    renderSystem(tab.dataset.system);
    if (moveFocus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab, false));
    tab.addEventListener('keydown', event => {
      let nextIndex = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      selectTab(tabs[nextIndex], true);
    });
  });

  renderSystem(currentSystem);
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
  if (!body || body.closest('[hidden]')) return;
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
  if (!canvas || !diagram || !selector || canvas.closest('[hidden]')) return;

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
  if (!track || track.closest('[hidden]')) return;

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

  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.closest('[hidden]')) observer.observe(el);
  });
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
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const hadTabIndex = target.hasAttribute('tabindex');
        if (!hadTabIndex) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        window.scrollTo({ top: position, behavior: reduceMotion ? 'auto' : 'smooth' });
        if (window.location.hash !== href) window.history.pushState(null, '', href);
        if (!hadTabIndex) {
          target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        }
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
  const icons = hero ? hero.querySelectorAll('.hero__tech') : [];
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
