# Content handoff — evidence, video and contacts

The website is an interactive demo. Placeholders must remain explicit until the actual materials are supplied. Do not replace them with invented names, testimonials, seals, operating results or affiliations.

## Where to add materials

Edit `src/trust-content.json`, then run `node build.cjs` and `node validate.cjs`.

- `updatedAt`: actual date of the content revision, not an audit or document verification date.
- `company`: legal name, jurisdiction, registration number, registered address, exact client instrument and scope of the 43% interest. These must agree with the documents. Displaying supplied text does not verify it; update the accompanying pending explanations only after review.
- `video.src`: an MP4 under `dist/assets/` referenced as `assets/company-introduction.mp4`, or a direct HTTPS MP4 URL. Use a real company representative. `video.poster`: local/HTTPS poster. `video.captions`: English WebVTT file (same origin recommended). Native controls and inline mobile playback are already wired. YouTube/embed URLs are not direct MP4 assets.
- `team`: actual name, role and photo, corporate email, international phone number, Telegram username without `@`, working hours, IANA time zone, HTTPS meeting calendar. Blank channels open an explicit placeholder. A calendar link is not a confirmed appointment.
- `documents`: supply a local `assets/` file or HTTPS link in `href`, with its actual document date in `publishedAt`. A supplied link is labelled “Provided · review required,” never automatically “verified.” Pending rows explain what the missing document should cover and have no fake download.

The public team is project content. The staff console's editable manager profile is local demo account data; update both when the actual team is known.

## Materials required

1. Company registration and authorized representative.
2. Defined network/asset list and documents supporting the proposed 43% interest.
3. Client instrument and agreement: contracting entity, rights, distribution basis and eligibility.
4. Dated operating results connecting charging receipts, costs and distributions to actual assets.
5. Fees, recipient/custody of client money, capital access, any lock-up and withdrawal rules.
6. Risk disclosures and final offering documents.
7. Real team photo/bio, support channels/hours and introduction video with English captions.
8. Chosen custom domain and access to DNS setup when ready. No domain, mailbox, payment processing or shared server authentication is configured by this visual update.

## Content that needs a business decision

The four weekly demo rates remain 3%, 5.6%, 7.9% and 11.2%. They are not justified by station-count selection or by the teaching example. Replace with documented terms when available; do not hide their period or imply guaranteed payouts.

The cash-flow examples are explicitly invented teaching numbers. Electricity varies with receipts; site/service/reserve costs are held fixed to illustrate a shortfall. They do not apply the unverified 43% assumption or calculate actual client income.

Actual station photographs prove a location, not company ownership. Every public station detail includes separate ownership and operating-data statuses.
