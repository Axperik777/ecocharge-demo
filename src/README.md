# EcoCharge pages

Run `node build.cjs` and `node validate.cjs` from the repository root.

- `site-pages.cjs` renders the public overview, how-it-works, stations, plans, about, resources and registration pages. All use `dist/site.css` and `dist/site.js`.
- `login.html` renders client and team sign-in, using `dist/public.css` and `dist/public.js`.
- `portal.html` renders separate client and staff workspaces. Their existing app scripts remain in `dist/`.
- `brand.cjs` renders the shared E/C identity and favicon. `dist/brand.css` applies the light and dark variants.
- `station-visuals.cjs` builds the 50-location selection and 40 original SVG illustrations. The 10 locations with real photos keep their verified photo records. Generic illustrations are explicitly labelled and never entered into the real-photo catalog.

Registration creates a local demo profile, not a server account. It preserves existing browser data and never accepts money or a real password. The shared demo credentials remain `lox / lox1` for the client and `admin / admin1` for the team. A public station-group selection carries into the client plan builder, initially at $250; an existing active or draft plan is kept.

Public photos are optimized copies of the existing source photos listed in `dist/station-photos.json`. Their credits remain linked on the site. Public station records do not establish ownership or affiliation. The 43% participation assumption and weekly model rates remain explicitly unverified demo terms.

The public root always stays on the home page, including legacy `?view=client` / `?view=admin` links and existing demo sessions. Internal sign-in and workspace links remain explicit actions. Legacy navigation parameters are removed while campaign parameters are retained.

The hero uses the sourced Clermont, Florida photo. Its account preview explains stations, plans and documents without investment amounts or rates. `public-explainer.cjs` renders the real hardware photography and qualitative plan introduction. Hardware close-ups open the exact photo in the location gallery with its original source, date and license. Generated HTML includes content hashes for scripts, styles and the favicon to avoid mixing a new page with old cached assets.

Client plan amounts start at $250 and accept cents. Changing the amount updates the dollar illustration, while the selected station group determines the weekly rate. Client confirmation, draft activation and staff adjustments enforce the same minimum for new active investments; zero may clear a plan. Public pages do not show investment amounts/rates. The how-it-works operating-cost example is separately labelled as invented teaching data, not an investment quote.

Evidence and transparency sections are rendered by `trust-sections.cjs`, with editable placeholders in `trust-content.json`. See `CONTENT-HANDOFF.md` for video, team, contact and document replacement instructions. The `/terms/` page covers pending rights, capital access, fees and risk conditions. Public station dialogs separate sourced location facts from unverified ownership and unavailable operating figures. Account credits expose the original recorded calculation.
