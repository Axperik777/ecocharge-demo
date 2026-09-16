# Eco-Charge interactive demo

Mobile-friendly investor portal and manager workspace. Plain HTML, CSS and JavaScript, with a public AFDC charging-station directory. No build or dependency install is required.

## Try the demo

- Client: `?view=client`
- Manager: `?view=admin`
- Use the **?** help button for a short walkthrough.
- On a phone, the navigation stays at the bottom. Explore stations through the photo cards or the Map tab.
- The overview offers plan guidance, document questions and callback requests. **My manager** stays reachable as you browse.

Suggested flow:

1. Open a station card and select it for a demo allocation.
2. Choose a plan, amount and reference stations, then apply it.
3. Choose **Simulate day** to create a test accrual. Each date can be credited only once.
4. Preview/print a draft agreement, download a fact sheet or message the manager.
5. Switch to **Staff console** to edit the client or plan, review requests, reply to messages and manage station photos.
6. **Reset demo** clears this browser's test data.

## Daily model

| Reference stations | Daily demo rate |
| --- | --- |
| 1 | 3% |
| 3 | 5.6% |
| 5 | 7.9% |
| 10 | 11.2% |

Daily demo accrual = total plan capital × daily rate. Simple accrual only, without compounding. Station count does not multiply the capital. These proposed rates are simulations, not verified investment returns or an offer. No station revenue is imported.

Manager changes to published rates affect new plan applications. Previously recorded accruals retain their original basis; changing plans preserves history. Initial migration from the old per-session prototype updates the active plan to the corresponding daily tier and keeps legacy events labeled separately.

## Scope

- 1,184 real US DC charging locations from an AFDC snapshot dated 2026-09-15 UTC.
- 14 real photographs across 10 matched locations, with source credits and license links. Search the photo directory, switch angles and enlarge pictures. A station without a matched photo shows its actual address and a no-photo state. Pictures do not establish current equipment or availability.
- Map search, state filtering, zoom, station facts and source links.
- A single interactive demo client and a complete manager workflow for that account.
- Demo requests, daily accruals, messages, client edits, plan editing and station-specific photo settings.
- Optional manager WhatsApp, Telegram and email fields. They remain unconfigured until real contact details are entered.
- Contextual questions from stations, plans, assets and documents. Plan inquiries include the draft amount and station selection; callbacks include the preferred date, time and US time zone and await confirmation.
- Client/manager conversation threads, follow-ups, unread reply badges, inbox filters and manager-initiated demo messages. External messages and calls are never sent automatically.
- Shorter mobile overview, compact plan comparison, scrollable dialogs with fixed close/action controls, and stacked manager table rows at phone widths.

All data changes stay in the current browser's localStorage. Visitors have independent demo state. Role switching is a demo control, not authentication. There are no real payments, live telemetry, actual earnings, executed contracts or ownership claims. Public station listings do not establish affiliation or investment availability.

## Attribution

- Station data: [US Department of Energy AFDC](https://afdc.energy.gov/stations).
- Map: Esri World Dark Gray Base, HERE, Garmin and OpenStreetMap contributors. Attribution is displayed on the map.
- Photos: exact sources, photographers, dates and licenses are in `dist/station-photos.json` and `dist/assets/photo-credits.json`. Commons thumbnails are displayed with CSS crops. CC BY-SA photo adaptations remain under their original licenses. Baker: TaurusEmerald, CC BY-SA 4.0, with source link in its record.
- Starting image: Costco Clermont, Declan M. Martin, public domain, [source](https://commons.wikimedia.org/wiki/File:Clermont_Costco_EV_Charging.jpg).
- Manager portrait: fictional AI-generated demo illustration.
- Manrope fonts: SIL Open Font License, included in `dist/assets/manrope-LICENSE.txt`.
- Leaflet and jsPDF: original license notices are retained in the vendored assets.

Lovelock has a dated operator upgrade-closure note. Directory availability is not live occupancy.

## Local run and deployment

```sh
node server.cjs
node validate.cjs
```

Open `http://127.0.0.1:4317/`. `validate.cjs` checks entry assets, JavaScript syntax and station-photo mappings. The GitHub Actions workflow publishes only `dist/` to GitHub Pages.

QA performed before release: client and manager workflows, daily calculation and duplicate protection, request approvals, support replies, printed agreement terms, exact-location photos, no-photo state, photo settings, local persistence, deep-linked tabs, reset and responsive layouts at 320, 360, 375, 390, 430 and 768 pixels. Touch flows were checked using mobile browser emulation; physical iPhone/Safari verification is still separate.
