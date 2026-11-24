import type { APIRoute } from 'astro';
export const GET: APIRoute = () => new Response(JSON.stringify({"backend": ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "Alembic"], "data": ["SQL", "PostgreSQL", "pandas", "Qlik"], "infra": ["Linux", "Docker", "Nginx", "Git", "Pytest"]}), {headers:{'Content-Type':'application/json; charset=utf-8'}});
