This is a static [Next.js](https://nextjs.org) site prepared for GitHub Pages and editable through [Pages CMS](https://pagescms.org/).

## What Changed

- The old server-side CMS setup has been removed.
- The website content now lives in JSON files inside `src/content/`.
- GitHub Pages deployment is automated with [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).
- The repository includes a [`.pages.yml`](./.pages.yml) configuration so Pages CMS can edit the site directly on GitHub.

## Local Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

The only optional variable is:

- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`: external form endpoint if you want the contact form to submit to a service

If this variable is empty, the contact form opens the visitor's email app with a prefilled message.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Editable Content

- `src/content/site.json`: branding, navigation, footer, social links
- `src/content/pages/*.json`: pages and page-builder blocks
- `public/media/`: uploaded images referenced by the content files

The current block types are:

- `hero`
- `services`
- `portfolio`
- `process`
- `testimonials`
- `contact`

## Pages CMS

Once the repo is on GitHub:

1. Open `https://pagescms.org/`
2. Sign in with GitHub
3. Select this repository
4. Pages CMS will read `.pages.yml`
5. Edit content visually and commit changes back to the repo

More detail is available in [PAYLOAD_SETUP.md](./PAYLOAD_SETUP.md).

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. In GitHub, go to `Settings > Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main`.

The workflow builds the static export and publishes the `out/` folder automatically.

## Useful Scripts

```bash
npm run dev
npm run build
npm run lint
```
