export type ScreenSrc = string | 'code()' | 'docs()';

export interface StageLabel {
  html: string;
  pos: [number, number, number];
}

export interface Project {
  id: string;
  url: string;
  no: string;
  kicker: string;
  title: string; // HTML — trecho em itálico usa <i>
  lead: string;
  dl: [string, string][];
  metrics: [string, string][];
  monitor: ScreenSrc;
  laptop: ScreenSrc;
  phone?: ScreenSrc;
  labels: StageLabel[];
  now: string;
  what: string;
  navLabel: string;
  fallbackImg: string; // imagem estática para <1024px
  fallbackAlt: string;
}

const L = {
  monitor: (html: string): StageLabel => ({ html, pos: [-2.3, 4.55, -1.1] }),
  laptop: (html: string): StageLabel => ({ html, pos: [2.9, 2.55, 1.35] }),
  phone: (html: string): StageLabel => ({ html, pos: [-3.4, 2.75, 2.5] }),
};

export const projects: Project[] = [
  {
    id: 'jas-easy-path',
    url: 'https://github.com/MartinsSallys/JAS-Easy-Path',
    no: '01',
    kicker: 'LOGÍSTICA · HACK BRASIL · EM DESENVOLVIMENTO',
    title: 'A rota do dia em <i>um clique</i>.',
    lead: 'O lojista cadastra as entregas e recebe a ordem das paradas calculada pelo motor em Python.',
    dl: [
      ['Papel', 'Motor de roteirização (route engine)'],
      ['Stack', 'Python · OR-Tools · FastAPI · React'],
      ['Ano', '2026 · equipe de 4'],
    ],
    metrics: [
      ['CVRP', 'OR-Tools'],
      
      ['3', 'telas · web + mobile'],
    ],
    monitor: import.meta.env.BASE_URL + 'img/jas-rota.png',
    laptop: import.meta.env.BASE_URL + 'img/jas-dash.png',
    phone: import.meta.env.BASE_URL + 'img/jas-driver.png',
    labels: [
      L.monitor('<b>●</b> rota otimizada'),
      L.laptop('resumo do dia'),
      L.phone('app do entregador'),
    ],
    now: 'JAS Easy Path',
    what: 'painel · rota · app do entregador',
    navLabel: 'JAS Easy Path',
    fallbackImg: import.meta.env.BASE_URL + 'img/jas-rota.png',
    fallbackAlt: 'Tela do JAS Easy Path com a rota do dia otimizada no mapa',
  },
  {
    id: 'fundec-rs',
    url: 'https://github.com/Nalan27/Hackaton-Excelsior-/blob/main/docs/relatorio-final.md',
    no: '02',
    kicker: 'DADOS PÚBLICOS · HACKATHON · 2º LUGAR NACIONAL',
    title: 'Para onde foi o dinheiro da <i>reconstrução</i> do RS?',
    lead: 'Um painel no Qlik mostra como os recursos chegaram aos municípios gaúchos após as enchentes de 2024.',
    dl: [
      ['Papel', 'ETL e modelo analítico'],
      ['Stack', 'Python · pandas · SQLite · Qlik'],
      ['Ano', '2026 · equipe de 3'],
    ],
    metrics: [
      ['658', 'repasses'],
      ['334', 'municípios'],
      ['23', 'testes'],
    ],
    monitor: import.meta.env.BASE_URL + 'img/03-tela-1-sem-filtros.png',
    laptop: import.meta.env.BASE_URL + 'img/04-tela-2-sem-filtros.png',
    phone: import.meta.env.BASE_URL + 'img/fundec-m.png',
    labels: [
      L.monitor('<b>●</b> distribuição geográfica'),
      L.laptop('evolução mensal'),
      L.phone('versão mobile'),
    ],
    now: 'FUNDEC-RS',
    what: 'dashboard Qlik · 7 telas',
    navLabel: 'FUNDEC-RS',
    fallbackImg: import.meta.env.BASE_URL + 'img/03-tela-1-sem-filtros.png',
    fallbackAlt: 'Dashboard Qlik do FUNDEC-RS com a distribuição geográfica dos repasses',
  },
  {
    id: 'postais-parnaiba',
    url: 'https://github.com/MartinsSallys/Postais-da-Parnaiba',
    no: '03',
    kicker: 'FULLSTACK · CLIENTE REAL · MVP',
    title: 'Postais da <i>Parnaíba</i>',
    lead: 'Um acervo digital reúne fotografias e crônicas de Parnaíba. O historiador gerencia o conteúdo pelo painel administrativo.',
    dl: [
      ['Papel', 'Backend e frontend'],
      ['Stack', 'FastAPI · SQLAlchemy · PostgreSQL'],
      ['Infra', 'Nginx · Docker Compose · JWT'],
    ],
    metrics: [
      ['3', 'serviços'],
      ['JWT', 'auth'],
      ['CRUD', 'painel'],
    ],
    monitor: import.meta.env.BASE_URL + 'img/inicio.png',
    laptop: import.meta.env.BASE_URL + 'img/Paineladm.png',
    phone: import.meta.env.BASE_URL + 'img/postais-m-home.png',
    labels: [
      L.monitor('<b>●</b> site público'),
      L.laptop('painel admin'),
      L.phone('site no celular'),
    ],
    now: 'Postais da Parnaíba',
    what: 'site público + painel admin',
    navLabel: 'Postais',
    fallbackImg: import.meta.env.BASE_URL + 'img/inicio.png',
    fallbackAlt: 'Página inicial do site Postais da Parnaíba com galeria do acervo histórico',
  },
  {
    id: 'beckglobal',
    url: 'https://github.com/MartinsSallys/BeckGlobal',
    no: '04',
    kicker: 'BACKEND · PROTÓTIPO',
    title: 'Uma API <i>antes</i> do domínio',
    lead: 'Base reutilizável para APIs em FastAPI com autenticação, migrações e ambiente PostgreSQL em Docker.',
    dl: [
      ['Papel', 'Arquitetura e implementação'],
      ['Stack', 'FastAPI · Pydantic · SQLAlchemy'],
      ['Infra', 'Docker · PostgreSQL'],
    ],
    metrics: [
      ['6', 'endpoints'],
      ['bcrypt', 'senhas'],
      ['Docker', 'ambiente'],
    ],
    monitor: 'code()',
    laptop: 'docs()',
    labels: [
      L.monitor('<b>●</b> app/api/users.py'),
      L.laptop('/docs · OpenAPI 3.1'),
    ],
    now: 'BeckGlobal',
    what: 'docs OpenAPI + código',
    navLabel: 'BeckGlobal',
    fallbackImg: '', // renderizado por canvas 2D (code())
    fallbackAlt: 'Trecho de código app/api/users.py do boilerplate BeckGlobal',
  },
];
