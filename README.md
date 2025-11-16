# ROSOIDEAE Esports Site

Stack:
- React + Vite
- Tailwind CSS
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Deploy to GitHub Pages (with Actions)

1. Create a new GitHub repo and push this project to the `main` branch.
2. Go to **Settings → Pages** and set:
   - Source: **GitHub Actions**
3. Commit & push. The included workflow `.github/workflows/deploy.yml` will:
   - install deps
   - build the site
   - upload `dist` as a Pages artifact
   - deploy to GitHub Pages

If you host under a subpath like `https://<user>.github.io/<repo>/`, edit `vite.config.js` and set:

```js
export default defineConfig({
  plugins: [react()],
  base: '/<repo>/',
})
```

## Logo

Replace `public/assets/ROSO_2.png` with your actual transparent ROSOIDEAE logo.
