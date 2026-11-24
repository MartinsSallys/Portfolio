// Desenhos 2D dos projetos gerados por código (sem dependência de three).

export function drawDocs(g: CanvasRenderingContext2D, w: number, h: number): void {
  g.fillStyle = '#fff';
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#0d0d0d';
  g.font = '600 52px Inter';
  g.fillText('BeckGlobal API', 70, 110);
  g.fillStyle = '#6b6b6b';
  g.font = '26px "JetBrains Mono"';
  g.fillText('v0.1 · OpenAPI 3.1 · /docs', 70, 160);
  const eps: [string, string, string][] = [
    ['GET', '/health', '#1aa260'],
    ['POST', '/auth/token', '#2b50ff'],
    ['POST', '/users/', '#2b50ff'],
    ['GET', '/users/', '#1aa260'],
    ['GET', '/users/{id}', '#1aa260'],
    ['DELETE', '/users/{id}', '#d6453d'],
  ];
  eps.forEach(([m, p, c], i) => {
    const y = 220 + i * 118;
    g.strokeStyle = '#e4e4df';
    g.lineWidth = 2;
    g.strokeRect(70, y, w - 140, 92);
    g.fillStyle = c;
    g.fillRect(90, y + 22, 150, 48);
    g.fillStyle = '#fff';
    g.font = '600 26px "JetBrains Mono"';
    g.textAlign = 'center';
    g.fillText(m, 165, y + 56);
    g.textAlign = 'left';
    g.fillStyle = '#0d0d0d';
    g.font = '30px "JetBrains Mono"';
    g.fillText(p, 280, y + 57);
  });
}

export function drawCode(g: CanvasRenderingContext2D, w: number, h: number): void {
  g.fillStyle = '#0d0d0d';
  g.fillRect(0, 0, w, h);
  g.font = '32px "JetBrains Mono"';
  const lines: [string, string][] = [
    ['#6b6b6b', '# app/api/users.py'],
    ['#8ea1ff', '@router.post("/users/", status_code=201)'],
    ['#fbfbf9', 'def create_user(data: UserCreate, db: Session = Depends(get_db)):'],
    ['#fbfbf9', '    user = User(**data.model_dump(exclude={"password"}))'],
    ['#fbfbf9', '    user.password = bcrypt.hash(data.password)'],
    ['#fbfbf9', '    db.add(user); db.commit(); db.refresh(user)'],
    ['#8ea1ff', '    return UserOut.model_validate(user)'],
    ['', ''],
    ['#1aa260', '$ pytest -q'],
    ['#1aa260', '...... 6 passed in 0.41s'],
  ];
  lines.forEach(([c, t], i) => {
    g.fillStyle = c;
    g.fillText(t, 70, 110 + i * 62);
  });
}
