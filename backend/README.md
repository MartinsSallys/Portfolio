# Portfolio API

GitHub Pages hospeda arquivos estáticos e não executa Python. O playground usa os arquivos JSON gerados pelo Astro por padrão, com requisições HTTP reais.

Para testar o servidor FastAPI separadamente, na raiz do repositório:

```bash
npm ci
npm run build
python3 -m venv .venv-api
source .venv-api/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```

Abra http://localhost:8000/docs. Em outro terminal, use `PUBLIC_API_URL=http://localhost:8000 npm run dev` para conectar o front local ao backend.

Para produção, hospede o servidor Python separadamente, levando os três arquivos JSON de `dist/api/v1/` junto ao deploy. Configure `PORTFOLIO_DATA_DIR` se a pasta tiver outro caminho. Defina a variável de repositório `PUBLIC_API_URL` (URL base HTTPS, sem `/api/v1`) em Settings > Secrets and variables > Actions > Variables. Execute novamente o workflow Pages. Sem a variável, o front continua estático. Não é necessário expor credenciais ou habilitar acesso de escrita.
