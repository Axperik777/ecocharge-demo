# EcoGrid — public website

Current website: **https://axperik777.github.io/ecocharge-demo/?lang=ru**

The current GitHub Pages workflow publishes **only `public-site/`**. It contains the 11 public pages, RU/EN content, equipment catalogues, mining calculations and the public station directory from the portable EcoGrid project (EC-70).

Client preview: **https://axperik777.github.io/ecocharge-demo/cabinet/client/?lang=ru**

The separate static client preview uses a newly generated example: $250 in charging at 13% per calendar month, activated one month before export, plus an ASIC presentation position. It opens without a password. Completed sample weeks are calculated with the shared finance module; forms do not submit and no server transactions run here.

Staff workspaces, APIs, databases, private configuration and access credentials are excluded. The working local platform is unchanged. See [client preview notes](docs/client-pages-preview.md).

To validate the current publication:

```sh
node scripts/verify-public-site.cjs public-site
```

To export a new copy from the current portable package, use its bundled Node.js 24 and mapped `scripts/export-public-site.cjs`:

```sh
node scripts/export-public-site.cjs --portable "/path/to/ECO CHARGE" --out "/new/output/directory" --url "https://axperik777.github.io/ecocharge-demo/"
```

The output directory must be new. Validate it before replacing `public-site/`. Historical source files below are retained for project history; they are not the current published artifact.

---
