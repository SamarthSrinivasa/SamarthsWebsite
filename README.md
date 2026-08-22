# samarth.dev (working title)

A tiny personal site: your name, a one-line tagline, and About / Projects pages.
No build step, no framework — just `index.html`, `styles.css`, and `script.js`.

## Run it locally

Just open `index.html` in a browser, or serve it so the fonts/routing behave exactly
like production:

```bash
npx serve .
```

## Deploy for free on Vercel

1. **Create a GitHub repo.**
   - Go to github.com → New repository → name it something like `samarth-site` → Create.
2. **Push this folder to it.**
   ```bash
   cd samarth-site
   git init
   git add .
   git commit -m "initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/samarth-site.git
   git push -u origin main
   ```
3. **Import it on Vercel.**
   - Go to vercel.com → sign in with GitHub → "Add New… → Project."
   - Select your `samarth-site` repo.
   - Framework preset: choose "Other" (it's static — no build command needed).
   - Click **Deploy**.
4. You'll get a live URL like `samarth-site.vercel.app` in about 30 seconds.
   Every future `git push` to `main` auto-redeploys it.

### Custom domain (optional, still free)

In the Vercel project → Settings → Domains, add a domain you own (e.g. from
Namecheap/Cloudflare) and follow the DNS instructions Vercel gives you. Vercel's
hosting itself stays free; you'd only pay for the domain name if you want a
custom one instead of `*.vercel.app`.

## Editing content

- **Name / tagline:** `index.html`, inside `#view-home`.
- **About text:** `index.html`, inside `#view-about`.
- **Projects:** `index.html`, inside `#view-projects` — duplicate the `.project-item`
  block for each project, e.g.:
  ```html
  <li class="project-item">
    <span class="project-name">Project name</span>
    <span class="project-desc">One line about it.</span>
  </li>
  ```
- **Colors / fonts:** all theme tokens live at the top of `styles.css` under
  `html[data-theme="light"]` and `html[data-theme="dark"]`.
