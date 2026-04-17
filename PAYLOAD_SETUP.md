# GitHub Pages + Pages CMS Setup

Le site est maintenant un site statique Next.js, compatible avec GitHub Pages.

## Ce qui change

- plus de base de donnees
- plus d'admin `/admin`
- plus de serveur CMS a garder allume sur ton poste
- le contenu est stocke dans le repo GitHub
- l'edition se fait via Pages CMS

## Fichiers importants

- `src/content/site.json` : nom de marque, navigation, footer, reseaux
- `src/content/pages/home.json` : contenu de la page d'accueil
- `public/media/` : images du site
- `.pages.yml` : schema d'edition pour Pages CMS
- `.github/workflows/deploy.yml` : publication automatique GitHub Pages

## Modifier le contenu

### Option 1 : depuis le code

Edite directement :

- `src/content/site.json`
- `src/content/pages/*.json`

### Option 2 : depuis Pages CMS

1. pousse le repo sur GitHub
2. ouvre `https://pagescms.org/`
3. connecte-toi avec GitHub
4. choisis ton repo
5. modifie le contenu depuis l'interface

Chaque modification cree un commit GitHub, puis GitHub Pages republie le site.

## Images

Les images doivent etre dans `public/media/`.

Dans Pages CMS, les champs image sont deja relies a ce dossier via `.pages.yml`.

## Formulaire de contact

Le site n'a plus d'API locale.

Tu as 2 modes :

- sans configuration : le formulaire prepare un email dans l'application mail du visiteur
- avec service externe : ajoute `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` dans `.env.local`

Exemples possibles :

- Formspree
- Basin
- autre endpoint HTTP externe

## Mise en ligne sur GitHub Pages

1. cree un repo GitHub
2. pousse le projet dessus
3. dans `Settings > Pages`, choisis `GitHub Actions`
4. pousse sur `main`

Le workflow :

- installe les dependances
- lance `next build`
- publie le dossier `out/`

## Ajouter une nouvelle page

1. cree un nouveau fichier JSON dans `src/content/pages/`
2. donne-lui un `slug`
3. ajoute les blocs souhaites
4. pousse sur GitHub

Le build generera automatiquement la route statique correspondante.
