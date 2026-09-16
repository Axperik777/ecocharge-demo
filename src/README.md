# EcoCharge pages

Run `node build.cjs` and `node validate.cjs` from the repository root.

- `site-pages.cjs` renders the public overview, how-it-works, stations, plans, about, resources and registration pages. All use `dist/site.css` and `dist/site.js`.
- `login.html` renders client and team sign-in, using `dist/public.css` and `dist/public.js`.
- `portal.html` renders separate client and staff workspaces. Their existing app scripts remain in `dist/`.

Registration creates a local demo profile, not a server account. It preserves existing browser data and never accepts money or a real password. The shared demo credentials remain `lox / lox1` for the client and `admin / admin1` for the team. Calculator selections carry into an unfunded client plan; an existing active or draft plan is kept.

Public photos are optimized copies of the existing source photos listed in `dist/station-photos.json`. Their credits remain linked on the site. Public station records do not establish ownership or affiliation. The 43% participation assumption and weekly model rates remain explicitly unverified demo terms.
