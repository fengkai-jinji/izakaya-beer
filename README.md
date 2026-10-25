# 居酒屋 · IZAKAYA

A scroll-driven Three.js Japanese izakaya experience. Phase 1 approaches a glass-door refrigerator, opens the doors and extracts a Sapporo bottle for drag rotation. Includes procedural assets, Rapier physics, cold mist and synthesized audio.

## Run locally

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## GitHub Pages

Live site: https://fengkai-jinji.github.io/izakaya-beer/

The workflow at .github/workflows/deploy.yml builds and deploys main. Repository Settings → Pages → Source must be GitHub Actions. The build sets VITE_BASE_PATH=/izakaya-beer/; local development keeps the root path.

## Stack

Three.js r169, GSAP ScrollTrigger, Rapier compat 0.14, Vite 5.4, plain JavaScript ES modules. No application framework. The pinned Three Rapier adapter is patched at build time to use the local WASM dependency and one fixed-step world.

## Assets and scope

Models, labels, environment reflections and sound are generated procedurally. Optional local models and HDR textures can be placed in public/models/ and public/textures/. This release implements Phase 1 only. Brand names identify the depicted products; this project is not affiliated with those brands.

The specified final camera pose produces a bottle-label close-up rather than a complete bottle view. The pinned Vite 5 toolchain has known development-only audit findings; keep local development bound to localhost.
