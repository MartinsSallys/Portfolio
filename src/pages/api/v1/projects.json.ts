import type { APIRoute } from 'astro';
import { projects } from '../../../data/projects';
export const GET: APIRoute = () => new Response(JSON.stringify(projects.map(({id,now,lead,url,dl})=>({id,name:now,description:lead,link:url,details:Object.fromEntries(dl)}))), {headers:{'Content-Type':'application/json; charset=utf-8'}});
