# EcoCharge pages

Run `node build.cjs` and `node validate.cjs` from the repository root.

- `site-pages.cjs` renders the public overview, how-it-works, stations, plans, about, resources and registration pages. All use `dist/site.css` and `dist/site.js`.
- `login.html` renders client and team sign-in, using `dist/public.css` and `dist/public.js`.
- `portal.html` renders separate client and staff workspaces. Their existing app scripts remain in `dist/`.
- `brand.cjs` renders the shared E/C identity and favicon. `dist/brand.css` applies the light and dark variants.
- `station-visuals.cjs` builds the 50-location selection and 40 original SVG illustrations. The 10 locations with real photos keep their verified photo records. Generic illustrations are explicitly labelled and never entered into the real-photo catalog.

Registration creates a local demo profile, not a server account. It preserves existing browser data and never accepts money or a real password. The shared demo credentials remain `lox / lox1` for the client and `admin / admin1` for the team. Calculator selections carry into an unfunded client plan; an existing active or draft plan is kept.

Public photos are optimized copies of the existing source photos listed in `dist/station-photos.json`. Their credits remain linked on the site. Public station records do not establish ownership or affiliation. The 43% participation assumption and weekly model rates remain explicitly unverified demo terms.

The public root always stays on the home page, including legacy `?view=client` / `?view=admin` links and existing demo sessions. Internal sign-in and workspace links remain explicit actions. Legacy navigation parameters are removed while campaign parameters are retained.

The hero uses the sourced Clermont, Florida photo. Its $200 / $250 / $300 choices retain their value across preview tabs and pass into the calculator or registration. Generated HTML includes content hashes for scripts, styles and the favicon to avoid mixing a new page with old cached assets.
