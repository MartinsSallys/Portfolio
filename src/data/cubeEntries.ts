import { projects } from './projects';

const project = (id: string) => projects.find(p => p.id === id)!;
const jas = project('jas-easy-path'), rs = project('fundec-rs');
const postais = project('postais-parnaiba'), beck = project('beckglobal');
export const cubeFaces = [jas.now, rs.now, postais.now, beck.now, 'Competências técnicas', 'Trajetória e laboratório'];

interface CubeEntry {
  id: string; face: number; position: [number, number, number]; category: string;
  name: string; summary: string; technologies: string[]; metrics?: string[];
  href: string; cta: string; type: 'link' | 'etl' | 'http';
}

export const cubeEntries: CubeEntry[] = [
  { id: 'jas-engine', face: 1, position: [-2,1,3], category: 'Logística', name: 'Motor de roteirização', summary: jas.lead, technologies: ['Python','OR-Tools'], href: `#${jas.id}`, cta: 'Explorar JAS Easy Path', type: 'link' },
  { id: 'jas-api', face: 1, position: [1,-1,3], category: 'Integração', name: 'Do cálculo à entrega', summary: 'A API conecta o motor ao fluxo de entregas. Testes verificam a sequência das paradas, as restrições da rota e o retorno ao depósito.', technologies: ['FastAPI','Python'], href: jas.url, cta: 'Consultar código-fonte', type: 'link' },
  { id: 'rs-pipeline', face: 2, position: [3,2,-1], category: 'Engenharia de dados', name: 'Dos repasses ao painel', summary: rs.lead, technologies: ['Python','pandas','SQLite','Qlik'], metrics: rs.metrics.map(([v,k]) => `${v} ${k}`), href: rs.url, cta: 'Ler relatório', type: 'link' },
  { id: 'rs-hackathon', face: 2, position: [3,-1,2], category: 'Conquista', name: '2º lugar nacional', summary: 'No hackathon UniCesumar × Qlik, a equipe do FUNDEC-RS conquistou o segundo lugar nacional. Minha contribuição foi o ETL e o modelo analítico.', technologies: ['ETL','Qlik'], href: `#${rs.id}`, cta: 'Conhecer o projeto premiado', type: 'link' },
  { id: 'postais-acervo', face: 3, position: [0,2,-3], category: 'Cliente real', name: 'Acervo histórico digital', summary: postais.lead, technologies: ['FastAPI','PostgreSQL'], href: `#${postais.id}`, cta: 'Explorar Postais da Parnaíba', type: 'link' },
  { id: 'postais-admin', face: 3, position: [-2,-1,-3], category: 'Administração', name: 'Publicação com autenticação', summary: 'Um painel administrativo permite gerenciar o acervo. A aplicação combina autenticação JWT, persistência relacional e migrações.', technologies: ['SQLAlchemy','Alembic','JWT'], href: postais.url, cta: 'Consultar implementação', type: 'link' },
  { id: 'beck-api', face: 4, position: [-3,1,1], category: 'Arquitetura', name: 'Base reutilizável de APIs', summary: beck.lead, technologies: ['FastAPI','SQLAlchemy','Pydantic'], href: `#${beck.id}`, cta: 'Explorar BeckGlobal', type: 'link' },
  { id: 'beck-infra', face: 4, position: [-3,-2,-1], category: 'Infraestrutura', name: 'Ambiente e migrações', summary: 'O protótipo reúne PostgreSQL em Docker e migrações Alembic para reaproveitar a estrutura em outras APIs.', technologies: ['PostgreSQL','Docker','Alembic'], href: beck.url, cta: 'Ver arquitetura no repositório', type: 'link' },
  { id: 'linux', face: 5, position: [1,3,2], category: 'Sistemas', name: 'Linux por dentro', summary: 'O estudo sysmgr-cli lê uptime e memória diretamente de /proc, usando Python na linha de comando.', technologies: ['Linux','Python','Git'], href: '#estudos', cta: 'Ver estudos e experimentos', type: 'link' },
  { id: 'http', face: 5, position: [-2,3,0], category: 'Backend · demonstração', name: 'Requisição HTTP e JSON', summary: 'Escolha uma rota, envie um GET e inspecione os dados devolvidos. No GitHub Pages a resposta pode vir de um arquivo JSON estático; não se trata de uma simulação de servidor.', technologies: ['HTTP','REST API','JSON'], href: '#api', cta: 'Abrir Backend Playground', type: 'http' },
  { id: 'tests', face: 5, position: [0,3,-2], category: 'Qualidade', name: 'Contratos sob teste', summary: 'No estudo backendGLobal, um CRUD em memória exercita contratos HTTP com sete testes.', technologies: ['FastAPI','TestClient','Pytest'], href: '#estudos', cta: 'Ver o estudo de backend', type: 'link' },
  { id: 'formacao', face: 6, position: [-1,-3,2], category: 'Trajetória', name: 'Formação e equipe', summary: 'Estudo Análise e Desenvolvimento de Sistemas na UniCesumar. Nos hackathons, trabalhei com outras pessoas em problemas de logística e de dados públicos.', technologies: ['Python','SQL'], href: import.meta.env.BASE_URL + 'curriculo/', cta: 'Consultar currículo', type: 'link' },
  { id: 'etl', face: 6, position: [2,-3,-1], category: 'Laboratório · simulação', name: 'Um pequeno pipeline ETL', summary: 'Experimente as etapas de extração, transformação e carga com dados fictícios, sem confundi-los com os resultados do FUNDEC-RS.', technologies: ['ETL'], href: `#${rs.id}`, cta: 'Ver o projeto com dados reais', type: 'etl' },
];
