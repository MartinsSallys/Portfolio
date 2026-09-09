# Portfolio — Sallys Martins

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

Portfolio profissional de Backend Python Developer com visualização interativa de arquiteturas de software.

---

## Visão Geral

- **Diagramas de Arquitetura** — Visualização interativa com nós SVG, arestas animadas, categorias por camada e simulação de requisições
- **Design Web** — Carrossel com screenshots dos projetos
- **Hero Interativo** — Ícones de tecnologias com parallax que acompanha o mouse
- **Tema Escuro/Claro** — Toggle com persistência no localStorage
- **Responsivo** — Layout adaptável para desktop e mobile

---

## Tecnologias

| Categoria | Tecnologia |
|-----------|-----------|
| **Estrutura** | HTML5 |
| **Estilização** | CSS3 (Custom Properties, Flexbox, Grid) |
| **Interatividade** | JavaScript Vanilla |
| **Ícones** | SVG inline (Python, FastAPI, Docker, PostgreSQL, Git) |

---

## Estrutura de Pastas

```
portfolio/
├── index.html              # Página principal
├── style.css               # Estilos globais
├── script.js               # Lógica (diagramas, carrossel, parallax, temas)
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

### Diagramas de Arquitetura
- Nós posicionados por camada (Cliente → API → Endpoints → Lógica → Dados → Banco)
- SVG com setas animadas e labels descritivos em português
- Hover nos nós destaca conexões relacionadas
- Animação de fluxo com pontos percorrendo as arestas

### Carrossel Design Web
- Navegação manual (setas) e automática (autoplay)
- Indicadores de posição (dots)
- Transições suaves entre slides

### Hero Parallax
- 5 ícones de tecnologias (Python, FastAPI, Docker, PostgreSQL, Git)
- Efeito parallax 3D que acompanha o mouse com profundidades variadas
- Desabilitado em `prefers-reduced-motion`

---

## Como Adicionar Novos Diagramas

1. Crie um arquivo JSON em `public/architectures/<id>.json`:

```json
{
  "id": "meu-projeto",
  "nodes": [
    {
      "id": "client",
      "title": "Cliente",
      "icon": "FiGlobe",
      "category": "client",
      "desc": "Descrição do componente",
      "technologies": ["HTML", "CSS"]
    }
  ],
  "edges": [
    { "from": "client", "to": "api", "label": "Requisição HTTP" }
  ]
}
```

2. Adicione o projeto no objeto `PROJECTS` em `script.js`
3. Adicione os slides no `DESIGN_DATA` se necessário

---

## Melhorias Futuras

- [ ] Internacionalização (pt-BR / en)
- [ ] Modo claro com toggle
- [ ] Blog com artigos técnicos
- [ ] Testes unitários
- [ ] PWA com cache offline
- [ ] Analytics com Plausible
