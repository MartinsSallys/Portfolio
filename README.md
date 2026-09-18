# Portfolio — Sallys Martins

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

Portfólio técnico orientado a projetos, com conteúdo auditado diretamente nos repositórios apresentados.

---

## Visão Geral

- **Projetos como protagonistas** — Os trabalhos principais aparecem antes de stack, trajetória e apresentação pessoal
- **Escopo verificável** — Cada card diferencia implementação real, integração externa e partes ainda em evolução
- **Hierarquia técnica** — Projetos principais, trabalhos secundários e estudos possuem pesos visuais diferentes
- **Links diretos** — Cada projeto leva ao repositório correspondente
- **Tema Escuro/Claro** — Toggle com persistência no localStorage
- **Responsivo** — Layout adaptável para desktop e mobile

---

## Tecnologias

| Categoria | Tecnologia |
|-----------|-----------|
| **Estrutura** | HTML5 |
| **Estilização** | CSS3 (Custom Properties, Flexbox, Grid) |
| **Interatividade** | JavaScript Vanilla |
| **Ícones** | SVG inline |

---

## Estrutura de Pastas

```
portfolio/
├── index.html              # Página principal
├── style.css               # Estilos globais
├── script.js               # Navegação, temas e componentes interativos
├── assets/
│   └── images/             # Imagens dos projetos
└── public/
    └── architectures/      # JSONs dos diagramas
```

---

## Como Executar

```bash
# Opção 1 — Abrir direto no navegador
open index.html

# Opção 2 — Servidor local (Python)
python3 -m http.server 8000

# Opção 3 — Servidor local (Node)
npx serve .
```

---

## Deploy no GitHub Pages

```bash
git add . && git commit -m "feat: atualização do portfolio" && git push
```

1. Vá em **Settings → Pages** no repositório GitHub
2. Em **Source**, selecione `main` e `/ (root)`
3. Clique **Save**
4. Acesse: `https://martinssallys.github.io/Portfolio/`

---

## Funcionalidades

### Hero orientado aos sistemas
- Posicionamento baseado no trabalho realmente encontrado nos repositórios
- Índice direto para Postais da Parnaíba, BeckGlobal e sysmgr-cli
- Sem métricas de cobertura ou escalabilidade não comprovadas

### Vitrine de projetos
- Dois cases principais com escopo, entrega, decisões, evidências, limitações e maturidade
- Galeria com telas reais de Postais da Parnaíba
- Superfície completa das seis rotas de aplicação do BeckGlobal
- Flora Tropical e sysmgr-cli separados como projetos secundários
- backendGLobal e MagicScan apresentados como estudos, com bloqueios explícitos

### Navegação e acessibilidade
- Menu móvel com `aria-expanded` e fechamento pela tecla Escape
- Suporte a `prefers-reduced-motion`
- Tema claro/escuro persistido localmente

---

## Refatoração incremental

1. [x] Estrutura, hierarquia e conteúdo factual
2. [x] Cases detalhados dos projetos principais
3. Diagramas baseados na arquitetura real
4. Expansão e navegação profunda dos cases
5. Identidade visual e stack contextual
6. Responsividade, acessibilidade e refinamentos

Os componentes antigos de diagramas e exploração permanecem no código durante a transição, mas estão ocultos até que seus dados sejam substituídos por representações verificadas.

---

## Melhorias Futuras

- [ ] Diagramas reais e acessíveis
- [ ] Stack relacionada a evidências por projeto
- [ ] Testes automatizados da interface
- [ ] Internacionalização pt-BR/en
