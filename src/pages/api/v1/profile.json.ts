import type { APIRoute } from 'astro';
export const GET: APIRoute = () => new Response(JSON.stringify({"name": "Sallys Martins", "focus": ["Backend", "Dados", "Sistemas"], "education": "Análise e Desenvolvimento de Sistemas · UniCesumar", "available": true}), {headers:{'Content-Type':'application/json; charset=utf-8'}});
