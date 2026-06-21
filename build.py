#!/usr/bin/env python3
"""
build.py — Gerador estático de writeups para o portfólio.

Lê todos os arquivos .md em content/writeups/, gera:
  - writeups/[slug]/index.html  (página individual de cada writeup)
  - writeups/index.html         (índice/grade de todos os writeups)

Uso:
  python3 build.py
"""

import re
import markdown
import frontmatter
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).parent
CONTENT_DIR = ROOT / "content" / "writeups"
OUTPUT_DIR = ROOT / "writeups"

TYPE_LABELS = {
    "incident": "Análise de Incidente",
    "ctf": "CTF / Desafio",
}

DIFFICULTY_LABELS = {
    "beginner": "Iniciante",
    "intermediate": "Intermediário",
    "advanced": "Avançado",
}

MD_EXTENSIONS = ["fenced_code", "tables", "toc", "codehilite"]

PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Daniel Cavalcante</title>
<meta name="description" content="{summary}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../writeup.css">
</head>
<body>

<nav>
  <div class="nav-inner">
    <a href="../../index.html" class="nav-name">Daniel Cavalcante</a>
    <div class="nav-links">
      <a href="../../index.html#projetos">Portfólio</a>
      <a href="../index.html">Writeups</a>
      <a href="../../index.html#contato">Contato</a>
    </div>
  </div>
</nav>

<article class="wrap article">
  <a class="back-link" href="../index.html">&larr; Todos os writeups</a>

  <div class="article-meta-top">
    <span class="type-badge type-{type}">{type_label}</span>
    <span class="meta-date">{date_display}</span>
    {draft_badge}
  </div>

  <h1 class="article-title">{title}</h1>
  <p class="article-summary">{summary}</p>

  <div class="article-tags">
    {tags_html}
  </div>

  <div class="article-divider"></div>

  <div class="article-body">
    {body_html}
  </div>

  <div class="article-footer">
    <a class="back-link" href="../index.html">&larr; Todos os writeups</a>
  </div>
</article>

<footer class="wrap">
  <span>© 2026 Daniel Cavalcante</span>
  <span>São Paulo, Brasil</span>
</footer>

</body>
</html>
"""

INDEX_TEMPLATE = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Writeups — Daniel Cavalcante</title>
<meta name="description" content="Análises de incidentes reais e writeups de CTF — Daniel Cavalcante.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="writeup.css">
</head>
<body>

<nav>
  <div class="nav-inner">
    <a href="../index.html" class="nav-name">Daniel Cavalcante</a>
    <div class="nav-links">
      <a href="../index.html#projetos">Portfólio</a>
      <a href="index.html">Writeups</a>
      <a href="../index.html#contato">Contato</a>
    </div>
  </div>
</nav>

<header class="wrap index-hero">
  <div class="section-label">Writeups</div>
  <h1 class="index-title">Investigações e desafios</h1>
  <p class="index-sub">
    Análises de incidentes reais e resoluções de CTFs — documentadas com o
    mesmo rigor que aplico no trabalho.
  </p>

  <div class="filter-bar">
    <button class="filter-btn active" data-filter="all">Todos</button>
    <button class="filter-btn" data-filter="incident">Incidentes</button>
    <button class="filter-btn" data-filter="ctf">CTFs</button>
  </div>
</header>

<section class="wrap">
  <div class="writeup-grid">
    {cards_html}
  </div>
</section>

<footer class="wrap">
  <span>© 2026 Daniel Cavalcante</span>
  <span>São Paulo, Brasil</span>
</footer>

<script>
const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.writeup-card');
buttons.forEach(btn => {{
  btn.addEventListener('click', () => {{
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {{
      const show = filter === 'all' || card.dataset.type === filter;
      card.style.display = show ? '' : 'none';
    }});
  }});
}});
</script>

</body>
</html>
"""

CARD_TEMPLATE = """<a class="writeup-card" href="{slug}/index.html" data-type="{type}">
  <div class="card-top">
    <span class="type-badge type-{type}">{type_label}</span>
    <span class="meta-date">{date_display}</span>
  </div>
  <h2 class="card-title">{title}</h2>
  <p class="card-summary">{summary}</p>
  <div class="card-tags">
    {tags_html}
  </div>
</a>
"""


def slugify(text):
    text = text.lower()
    text = re.sub(r"[áàâã]", "a", text)
    text = re.sub(r"[éê]", "e", text)
    text = re.sub(r"[í]", "i", text)
    text = re.sub(r"[óôõ]", "o", text)
    text = re.sub(r"[ú]", "u", text)
    text = re.sub(r"[ç]", "c", text)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def render_tags(tags):
    return "\n    ".join(f'<span class="tag">{t}</span>' for t in tags)


def build():
    OUTPUT_DIR.mkdir(exist_ok=True)
    posts = []

    md_files = sorted(CONTENT_DIR.glob("*.md"))
    if not md_files:
        print(f"Nenhum arquivo .md encontrado em {CONTENT_DIR}")
        return

    for md_file in md_files:
        post = frontmatter.load(md_file)
        meta = post.metadata

        title = meta.get("title", md_file.stem)
        post_type = meta.get("type", "incident")
        date_raw = meta.get("date", datetime.today().date())
        difficulty = meta.get("difficulty", "intermediate")
        tags = meta.get("tags", [])
        summary = meta.get("summary", "")
        is_draft = meta.get("draft", False)

        slug = meta.get("slug") or md_file.stem

        if isinstance(date_raw, str):
            date_obj = datetime.strptime(date_raw, "%Y-%m-%d").date()
        else:
            date_obj = date_raw

        date_display = date_obj.strftime("%d %b %Y").replace(
            "Jan", "jan").replace("Feb", "fev").replace("Mar", "mar"
            ).replace("Apr", "abr").replace("May", "mai").replace("Jun", "jun"
            ).replace("Jul", "jul").replace("Aug", "ago").replace("Sep", "set"
            ).replace("Oct", "out").replace("Nov", "nov").replace("Dec", "dez")

        body_html = markdown.markdown(post.content, extensions=MD_EXTENSIONS)

        posts.append({
            "slug": slug,
            "title": title,
            "type": post_type,
            "type_label": TYPE_LABELS.get(post_type, post_type),
            "date_obj": date_obj,
            "date_display": date_display,
            "difficulty": difficulty,
            "difficulty_label": DIFFICULTY_LABELS.get(difficulty, difficulty),
            "tags": tags,
            "summary": summary,
            "body_html": body_html,
            "draft": is_draft,
        })

        # Build individual page
        page_dir = OUTPUT_DIR / slug
        page_dir.mkdir(exist_ok=True)

        draft_badge = '<span class="draft-badge">Rascunho</span>' if is_draft else ""

        page_html = PAGE_TEMPLATE.format(
            title=title,
            summary=summary,
            type=post_type,
            type_label=TYPE_LABELS.get(post_type, post_type),
            date_display=date_display,
            draft_badge=draft_badge,
            tags_html=render_tags(tags),
            body_html=body_html,
        )

        (page_dir / "index.html").write_text(page_html, encoding="utf-8")
        print(f"  gerado: writeups/{slug}/index.html")

    # Sort posts by date, newest first
    posts.sort(key=lambda p: p["date_obj"], reverse=True)

    # Build index page
    cards = []
    for p in posts:
        cards.append(CARD_TEMPLATE.format(
            slug=p["slug"],
            type=p["type"],
            type_label=p["type_label"],
            date_display=p["date_display"],
            title=p["title"],
            summary=p["summary"],
            tags_html=render_tags(p["tags"][:4]),
        ))

    index_html = INDEX_TEMPLATE.format(cards_html="\n  ".join(cards))
    (OUTPUT_DIR / "index.html").write_text(index_html, encoding="utf-8")
    print(f"  gerado: writeups/index.html")
    print(f"\n{len(posts)} writeup(s) processado(s) com sucesso.")


if __name__ == "__main__":
    build()
