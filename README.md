# Portfolio — Backend Developer

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)

Portfolio profissional focado em demonstrar capacidade técnica em engenharia de software, arquitetura de sistemas e boas práticas de desenvolvimento backend.

> **Ao contrário de portfolios tradicionais, o diferencial deste projeto está na visualização interativa de arquiteturas de software, com diagramas dinâmicos gerados a partir de arquivos JSON.**

---

## Visão Geral

Este portfólio foi construído para evidenciar:

- **Arquitetura de software** — Visualização interativa de diagramas de arquitetura com nós, arestas SVG, categorias por camada e simulação de requisições.
- **Código limpo** — Componentes pequenos, responsabilidade única, hooks reutilizáveis e tipos forte.
- **Performance** — Build otimizado com Vite, animações performáticas com Framer Motion, lazy loading via scroll.
- **UX profissional** — Tema escuro minimalista, micro-animações, transições suaves, responsividade total.

---

## Tecnologias

| Categoria | Tecnologia |
|-----------|-----------|
| **Linguagem** | TypeScript |
| **Framework** | React 19 |
| **Build** | Vite 8 |
| **Estilização** | TailwindCSS 4 |
| **Animações** | Framer Motion |
| **Ícones** | React Icons (Feather + Simple Icons) |
| **Linter** | Oxlint |

---

## Estrutura de Pastas

```
src/
├── components/
│   ├── architecture/       # Sistema de diagramas de arquitetura
│   │   ├── ArchitectureGraph.tsx
│   │   ├── ArchitectureNodeView.tsx
│   │   ├── ArchitectureEdgeView.tsx
│   │   ├── ArchitectureModal.tsx
│   │   ├── ArchitectureSidePanel.tsx
│   │   └── RequestSimulator.tsx
│   ├── layout/             # Navbar e Footer
│   ├── sections/           # Seções da página (Hero, About, Projects, etc.)
│   └── ui/                 # Componentes atômicos (Button, Card, Modal, etc.)
├── data/                   # Dados estáticos (projects, skills, timeline, technologies)
├── hooks/                  # Hooks customizados (useInView, useTypewriter)
├── services/               # Serviços (carregamento de JSON de arquitetura)
├── types/                  # Interfaces TypeScript
├── utils/                  # Utilitários (variantes de animação)
├── App.tsx
├── main.tsx
└── index.css               # Tema, variáveis CSS, custom scrollbar

public/
└── architectures/          # Arquivos JSON de arquitetura (um por projeto)
```

---

## Arquitetura do Frontend

### Componentes

```
App
├── Navbar              ← Navegação fixa com scroll detection
├── Hero                ← Tela cheia com TypeWriter animado
├── About               ← Bio + grid de tecnologias
├── Projects            ← Grid de cards com modal de arquitetura
│   └── ArchitectureModal
│       ├── RequestSimulator   ← Botão que anima requisição pelo grafo
│       ├── ArchitectureGraph  ← Grafo com layout por camadas
│       │   ├── ArchitectureNodeView  ← Nó com cor por categoria
│       │   └── ArchitectureEdgeView  ← Aresta SVG com seta
│       └── ArchitectureSidePanel ← Painel de detalhes do nó
├── Timeline            ← Linha do tempo animada por scroll
├── Skills              ← Barras de progresso animadas
├── Contact             ← Links sociais + download currículo
└── Footer              ← Informações mínimas
```

### Fluxo de dados da Arquitetura

```
public/architectures/<project-id>.json
                    ↓
            services/architecture.ts
            (fetch + cache)
                    ↓
        ArchitectureModal (state)
                    ↓
    ┌───────────────┼───────────────┐
    │               │               │
RequestSimulator  ArchitectureGraph  ArchitectureSidePanel
                        │
              ArchitectureNodeView  +  ArchitectureEdgeView
```

### Sistema de diagramas

O sistema de diagramas é **100% orientado a dados**. Cada projeto possui um arquivo JSON em `public/architectures/` com a seguinte estrutura:

```json
{
  "nodes": [
    {
      "id": "fastapi",
      "title": "FastAPI",
      "icon": "FiZap",
      "category": "backend",
      "description": "...",
      "responsibility": "...",
      "inputs": "Requisição HTTP",
      "outputs": "Resposta JSON",
      "technologies": ["FastAPI", "Pydantic"]
    }
  ],
  "edges": [
    { "from": "client", "to": "gateway" }
  ]
}
```

As categorias definem cores e posicionamento:

| Categoria   | Cor       | Posição no grafo |
|------------|-----------|-----------------|
| Frontend   | Azul      | Topo            |
| Backend    | Verde     | Meio-superior   |
| Infra      | Laranja   | Meio            |
| Serviços   | Ciano     | Meio-inferior   |
| Banco      | Roxo      | Base            |

---

## Como executar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

---

## Como adicionar novos projetos

1. Adicione o projeto em `src/data/projects.ts`:

```ts
{
  id: 'meu-projeto',
  name: 'Meu Projeto',
  description: 'Descrição do projeto.',
  technologies: ['Python', 'FastAPI'],
  github: 'https://github.com/user/repo',
  demo: 'https://demo.com',
}
```

2. Crie o arquivo de arquitetura em `public/architectures/meu-projeto.json`.

3. O card e o botão "Arquitetura" aparecerão automaticamente.

---

## Como criar novos diagramas

Cada arquivo JSON em `public/architectures/` gera automaticamente um diagrama interativo. Para criar um novo:

```json
{
  "id": "unique-id",
  "projectId": "id-do-projeto",
  "nodes": [
    {
      "id": "node-id",
      "title": "Nome do Componente",
      "icon": "FiZap",           // Ícone do react-icons/fi
      "category": "backend",      // frontend | backend | infrastructure | database | services
      "description": "Descrição curta",
      "responsibility": "Responsabilidade do componente",
      "inputs": "O que entra",
      "outputs": "O que sai",
      "technologies": ["Python", "FastAPI"]
    }
  ],
  "edges": [
    { "from": "node-1", "to": "node-2" }
  ]
}
```

O layout é calculado automaticamente baseado nas categorias. As conexões SVG com setas são renderizadas dinamicamente.

---

## Boas práticas utilizadas

- **Componentes pequenos** com responsabilidade única (SRP)
- **Hooks customizados** para lógica reutilizável (`useInView`, `useTypewriter`)
- **Serviços** para acesso a dados assíncronos
- **Tipagem forte** com TypeScript, sem `any`
- **Separação de dados e apresentação** — dados em JSON/TS, componentes apenas renderizam
- **Animações performáticas** — Framer Motion com `will-change` e animações GPU
- **Scroll reveal** eficiente com `IntersectionObserver` (uma vez apenas)
- **Acessibilidade** — ARIA labels, `aria-live` para typing, contraste adequado
- **SEO** — Meta tags, Open Graph, Twitter Cards, robots.txt

---

## Melhorias futuras

- [ ] **Internacionalização (i18n)** — Suporte a múltiplos idiomas (pt-BR, en)
- [ ] **Modo claro** — Alternância de tema via Context API
- [ ] **GraphQL** — Substituir arquivos JSON por consultas GraphQL para diagramas
- [ ] **Testes** — Adicionar testes unitários com Vitest + Testing Library
- [ ] **PWA** — Service worker para cache offline
- [ ] **Analytics** — Integração com Plausible ou umami
- [ ] **Blog** — Seção de artigos técnicos sobre backend e arquitetura
- [ ] **Exportar diagrama** — Botão para exportar arquitetura como SVG/PNG
- [ ] **Acessibilidade avançada** — Navegação completa por teclado no grafo
