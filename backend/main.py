from pathlib import Path
import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Portfolio API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["https://martinssallys.github.io", "http://localhost:4321"], allow_methods=["GET"], allow_headers=["Accept"])
DATA_DIR = Path(os.environ.get("PORTFOLIO_DATA_DIR", str(Path(__file__).resolve().parents[1] / "dist" / "api" / "v1")))

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/v1/{resource}")
def get_resource(resource: str):
    if resource not in {"profile", "projects", "skills"}:
        raise HTTPException(status_code=404, detail="Resource not found")
    try:
        return json.loads((DATA_DIR / f"{resource}.json").read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        raise HTTPException(status_code=503, detail="Portfolio data unavailable") from exc
