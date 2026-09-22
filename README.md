# EcoCharge participation demo

Public introduction, separate client and team sign-ins, and linked client/manager workspaces. Plain HTML, CSS and JavaScript with a source-linked AFDC station directory.

## Demo accounts

| Workspace | Entry | Username | Password |
| --- | --- | --- | --- |
| Client | `login/` | `lox` | `lox1` |
| Team | `team/` | `admin` | `admin1` |

These are public demo credentials. The static site uses a browser session gate, **not secure server authentication**. Do not enter real personal, financial or confidential information. Client and team tabs share localStorage on the same origin/browser. Different browsers and devices have independent data.

- `/` explains the participation model and links to the two entry screens.
- `client/` opens the client workspace after demo sign-in.
- `staff/` opens the team workspace after demo sign-in.
- Old `?view=client` / `?view=admin` links go to the appropriate sign-in.
- Each workspace has its own navigation and sign-out action. No inline role switch.

## Participation and weekly terms

The proposed model assumes a **43% company participation in a network whose scope and ownership documents have not been supplied**. This is explicitly a demo assumption, not a verified US market share or a claim of ownership over the public EA directory.

Charging payments are the proposed source of operating revenue. Client calculations use the weekly tariff, with no additional payment per car and no compounding:

| Reference stations | Weekly demo rate | Illustration on $250 |
| --- | --- | --- |
| 1 | 3% | $7.50/week |
| 3 | 5.6% | $14.00/week |
| 5 | 7.9% | $19.75/week |
| 10 | 11.2% | $28.00/week |

These proposed rates are simulations, not verified investment returns or an offer. No operating revenue is imported. Historical daily/session credits remain labeled with their original units; the current plan migrates to weekly terms.

## Complete demo flow

1. Sign in as `lox`. A fresh account starts with $0 and no assigned stations.
2. Choose a plan and amount. If available funds are insufficient, the plan is saved as a draft.
3. Submit a funding request. No real payment is collected.
4. In a second tab, sign in as `admin` and approve the request in Inbox.
5. Return to the client account and activate the saved plan. Available funds move into invested demo capital.
6. The manager records a sample week. One Monday-Sunday week can be credited only once; the credit uses invested capital multiplied by the weekly rate.
7. Review allocation history, print the sample agreement, browse location photos and exchange messages.

The team edits the available balance and plan in separate forms in the client card. A plan uses the selected tariff's exact station count. Each change requires a reason and a before/after review; previous credits retain their original terms. Reserved withdrawal requests must remain covered.

Staff can also edit the client profile, manager contacts, station selection/photos and proposed rates. Changes to the general tariff schedule affect future plan applications; an existing plan retains its agreed demo rate until edited/applied again. Reset demo is available only in the team interface.

## Client research workspace

- The overview follows the actual account state: first visit, saved draft, funding request awaiting review, available demo funds, active plan, or unread manager reply.
- A shortlist holds up to 50 locations, with the last 12 viewed locations kept separately. Saving a station does not allocate funds or modify an existing plan.
- Compare up to three stations by address, ports, power, connectors and photo source. A comparison can be included in a local manager inquiry.
- Saved drafts reopen with their amount, tariff and station selection. The account activity panel links to requests, conversations and individual weekly calculation records.
- A three-part walkthrough explains the business model, the weekly calculation and the documentation still required. The phone layout retains dedicated navigation and a compact inbox/shortlist toolbar.

Research preferences live under `demo.exploration` in the existing browser storage. They reset with the team demo reset and are not synchronized across devices.

## Responsive workspaces

- A new client starts with business education, station exploration or a sample plan. Balance operations appear when there is a plan or financial activity.
- The plan builder follows amount, station group, exact locations and review. Its desktop summary stays beside the selection; phones have a review bar above the navigation. Additional weekly scenarios are expandable.
- Stations have map and list views with shared search and filters. The list loads 18 records at a time; map clusters zoom into their locations. Filters collapse on phones, and selecting a marker opens a compact station preview.
- Leaflet loads on first map use, and the PDF library on first PDF download. Both support retry. The directory remains usable if map assets fail. Resizing preserves map zoom.
- The agent sees the current client plan, open question and next action alongside the client card. Replies also retain client context.
- EN/RU switching preserves plan fields and selected stations. Public mobile navigation uses one menu.

Browser checks are in `tests/workspace-refinements.cjs` and `tests/optional-library-recovery.cjs`. They need Playwright and Chrome (or a Playwright Chromium installation). Set `PLAYWRIGHT_PATH` to a module path if it is not locally installed, `CHROME_PATH` for a custom browser executable, and `QA_URL` for a running preview or deployed URL. Run from the repository root; screenshots and reports go into the ignored `qa/` directory. These checks use isolated demo browser contexts. Physical iOS/Android testing is still separate.

## Scope and limits

### Team-provided partner list

The homepage includes the thirteen companies named by the project team in `src/partners.cjs`, with industry labels and official corporate links. The team reports these relationships as confirmed; partnership scope and supporting documents have not yet been supplied for review. Keep that status visible in EN/RU until supporting materials are available. Corporate links identify the companies and are not evidence of a relationship with EcoCharge.

AMEC is described as a semiconductor manufacturing equipment company, consistent with its [official company profile](https://www.amec-inc.com/uploads/files/20250611/17496080859885.pdf). The reported procurement relationship needs product/specification details before describing AMEC as a supplier of charging-station semiconductors. NVIDIA uses its correct brand spelling and public computing profile.

### English (US) and Russian

The academic presentation uses `src/locales/en.json` for concise English UI copy and `src/locales/ru.json` for Russian. The build applies matching copy to static text; `locale.js` applies the same language choices to dynamic dialogs without changing IDs, stored records or calculations. The site identifies itself as an academic project, with simulated financial activity and clearly marked academic agreement samples.

The introduction cover remains in place until a video is supplied. Set `video.src`, and optionally `video.poster` and `video.captions`, in `src/trust-content.json` to render the existing video player. Empty team and legal-entity fields display a finished explanation of the academic workflows. Company logos are industry references; the AI and founder story remain explicitly illustrative.

The English UI uses `en-US`, short public-facing copy, US date formatting and "plan" terminology. Russian covers page text, dynamic account states, form errors, image descriptions, metadata and sample documents. Translation changes display only: inputs, stored amounts, station IDs/addresses and message bodies remain intact. Language switches update `?lang=` and preserve the current selection; an explicit language URL also works when local storage is unavailable.

The September 22 localization audit covered 97 page/dialog states (1,576 distinct rendered text/attribute pairs), 152 page/language/viewport checks at 320/390/768/1440 px, 19 additional document/conversation states, language round trips, dates, currencies, plural forms and generated calendar/PDF files. English and Russian agreement downloads now use the same sample content as the print preview. Both PDF pages were rendered and visually reviewed. Responsive checks used Chromium emulation, not physical phones.

### Brand and company content

ECO CHARGE is the only public project brand, including both workspaces and demo document headings. The former secondary brand has been removed.

The About page `#founder` and `#company-story` sections use text from the supplied `S6oTdwIKC57SoRQY-grok-workspace.zip` concept website. `src/company-story.json` records the source and milestones. James R. Whitaker's profile, Clermont location and 1998/2011/2014/2018 dates are explicitly unverified demo biography, not verified corporate history. Legal entity and registration fields remain empty. No archive images or executable files are published or executed. The homepage links to this profile; all new copy is available in EN/RU.

The homepage `#technology` section presents **ECO AI**, described by the team as analyzing charging sessions and forecasting station demand, alongside the team's reported compute resources and NVIDIA hardware. `src/technology-section.cjs` keeps these claims attributed. Processor model and compute capacity use dashes pending specifications; no benchmark or operating demonstration is invented. The section opens the existing demo manager contact flow; it does not connect an AI service or compute backend.

The shared logo reads **ECO CHARGE** in uppercase, with a lime conductor/wordmark on dark surfaces. The homepage uses a navy hero, a direct guest plan-builder CTA, source-linked equipment photos and functional workspace-preview links. Partner logos are local assets with source records in `dist/assets/partners/sources.json`; they identify companies and do not independently substantiate a relationship. Company profiles remain available in an expandable section. Photo and partnership disclosures stay visible.

### Demo capabilities

- 1,184 public US DC charging locations, AFDC snapshot 2026-09-15 UTC.
- 27 real photos across 21 matched locations, with source and license credits. The 50-location featured catalogue uses clearly labeled concept illustrations for the remaining 29 locations.
- Map search, filtering, zoom, station facts and exact-location photo galleries.
- One interactive client account and one team demo account.
- Local funding/withdrawal requests, weekly credits, account adjustments and messages.
- Contextual plan/station/document questions, follow-up threads, unread replies and callback requests with US time zones.
- Manager WhatsApp, Telegram and email remain placeholders until details are entered. No external message or call is sent automatically.
- Mobile navigation, scrollable dialogs, fixed dialog actions, browser Back support and cross-tab updates.

No real payments, live occupancy, executed contracts, verified ownership or server-backed accounts. A public station listing does not establish affiliation or investment availability. State is local under `ecocharge-demo-v1`; role sessions use sessionStorage.

### Location photographs

`dist/station-photos.json` records the source, photographer, license, and address/coordinate matching evidence for each location. Wikimedia Commons photographs retain their individual licenses. Open Charge Map contributor photos are attributed under CC BY 4.0; [contributor guidance](https://www.openchargemap.org/about/guidance) explicitly includes photos in its open-data contributions, and the [provider license](https://openchargemap.org/about) identifies CC BY 4.0.

Open Charge Map dates are stored as `dateUploaded`, not `dateTaken`. Public and account galleries distinguish the publication date from the capture date. WebP copies are resized for display, with no new equipment added or source watermarks removed. A photo does not prove current equipment availability, ownership or investment rights.

## Build, run and deploy

```sh
node build.cjs
node validate.cjs
node server.cjs
```

Open `http://127.0.0.1:4317/`. Optional `PORT` changes the local server port. `src/home.html`, `src/login.html` and `src/portal.html` generate the entry pages via `build.cjs`. The GitHub workflow builds, validates and publishes `dist/` only.

Validation checks all five entry pages, JavaScript syntax and station-photo mappings. Runtime QA covered credentials and separate routes; funding, activation and weekly credits; duplicate week prevention; all four tariff calculations; manager adjustments and cross-tab sync; messages; map/photos; print terms and PDF download; persistence/reset; delayed directory loading; legacy migration; and 10 views at 320, 360, 390, 430 and 768 px. Phone checks use Chrome mobile emulation; physical iPhone/Safari remains a separate check.

## Attribution

- Station data: [US DOE AFDC](https://afdc.energy.gov/stations).
- Map: Esri, HERE, Garmin and OpenStreetMap; on-map attribution retained.
- Photos: exact source, photographer, date and license in `dist/station-photos.json` and `dist/assets/photo-credits.json`. CSS display crops; CC BY-SA adaptations retain their original licenses.
- Homepage: Abingdon, Maryland, Ken Fields, CC BY-SA 2.0; source linked alongside the image.
- Manager portrait: fictional AI-generated illustration.
- Manrope: SIL Open Font License, included in assets.
- Leaflet and jsPDF: original license notices retained.
