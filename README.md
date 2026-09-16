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

The team can directly edit the client's available balance, invested amount, tariff and station count through **Edit client account**. Changing the tariff suggests its default station count; staff can override the reference count separately. Each adjustment records its before/after values and reason. Previous credits retain their original terms. Reserved withdrawal requests must remain covered.

Staff can also edit the client profile, manager contacts, station selection/photos and proposed rates. Changes to the general tariff schedule affect future plan applications; an existing plan retains its agreed demo rate until edited/applied again. Reset demo is available only in the team interface.

## Scope and limits

- 1,184 public US DC charging locations, AFDC snapshot 2026-09-15 UTC.
- 14 real photos across 10 matched locations, with sources, dates and licenses. Unmatched locations show a no-photo state.
- Map search, filtering, zoom, station facts and exact-location photo galleries.
- One interactive client account and one team demo account.
- Local funding/withdrawal requests, weekly credits, account adjustments and messages.
- Contextual plan/station/document questions, follow-up threads, unread replies and callback requests with US time zones.
- Manager WhatsApp, Telegram and email remain placeholders until details are entered. No external message or call is sent automatically.
- Mobile navigation, scrollable dialogs, fixed dialog actions, browser Back support and cross-tab updates.

No real payments, live occupancy, executed contracts, verified ownership or server-backed accounts. A public station listing does not establish affiliation or investment availability. State is local under `ecocharge-demo-v1`; role sessions use sessionStorage.

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
