# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio website for Hung Q. Pham, hosted on GitHub Pages at hungqpham.com. Built with Astro, Tailwind CSS, and tsParticles (interactive particle network background).

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:4321 (hot reload)
npm run build        # Production build to dist/
npm run preview      # Preview production build
```

## Architecture

Single-page Astro site. All source code is in `src/`.

**Rendering flow:** `src/pages/index.astro` → `src/layouts/Layout.astro` → components (Particles, Nav, Hero, About, Projects, Experience, Education, Footer).

**Key files:**
- `src/components/Particles.astro` — tsParticles interactive background (floating connected dots with mouse interaction)
- `src/styles/global.css` — Tailwind directives, scroll-reveal animations, glow-card and timeline styles
- `public/` — Static assets (images, CNAME)
- `astro.config.mjs` — Astro + Tailwind integration config

**Content is hardcoded in components** (not in a separate data file). To update resume content, edit the data arrays at the top of `Projects.astro`, `Experience.astro`, and `Education.astro`. About text is in `About.astro`.

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `master`. Requires GitHub Pages source set to "GitHub Actions" in repo settings.

## Legacy Files

The repo still contains old Jekyll files (`_config.yml`, `Gemfile`, `_includes/`, `_layouts/`, `_sass/`, etc.) from the previous modern-resume-theme setup. These are no longer used for the live site.
