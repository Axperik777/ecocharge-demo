# Demo funnel: implementation and activation boundaries

## Shipped

- Compact public home, with no investment amounts or plan rates.
- `/inside-a-station/`: attributed location photography and AFDC record, followed by an explicitly invented, adjustable 30-day operating example. Surplus and shortfall are both supported. No investor payout is derived from the example.
- Guest entry through `/client/?guest=1&tab=dashboard`. This is a browser-only demo gate, not authentication.
- Reference station selection, working-example recovery, plan review, registration at save, and preserved station/amount context.
- Four client navigation items: Overview, Stations, My plan, Documents. My plan contains the builder and saved/active selection.
- Questions from plan review carry the plan context to the local staff inbox.
- Staff overview exposes local event diagnostics and a JSON export without names, email, amounts or message bodies.
- Staff work queue, searchable conversations, priority, internal UI notes, next-action dates and explicit close/reopen behavior. Dates are organizational fields; no reminders are scheduled.
- Client and staff message drafts survive navigation and reload, and clear after a successful send. They are stored locally, not in secure private server storage.
- Demo callback proposal, client acceptance/cancellation, US time-zone validation and sample calendar-file download. Past times, nonexistent spring-forward times and ambiguous fall-back times are rejected. No actual call or invitation is sent.
- Photo thumbnails in the plan picker. The 21 primary portal photos use existing optimized WebP files (2,521,518 bytes in total versus 8,387,327 original bytes); the lightbox retains access to the original images. Credits remain attached to their exact locations.

## What this release does not establish

GitHub Pages serves static files. There is no server account, verified email, cross-device client database, live manager delivery, payment processing or advertising analytics integration. Demo registrations, requests and replies remain local to the browser. No real advertising conversions are reported.

The previously requested weekly rates remain marked as unverified demo inputs. More selected locations does not economically establish a higher return. The company identity, proposed 43% interest, network scope, client instrument, financial statements and final terms must be supplied and reviewed before replacing the placeholders in `src/trust-content.json`.

## Production integration contract

1. **Authentication and database:** choose a hosted backend and configure client/staff access separately. Use verified email or another real sign-in method. A client may read only their own plans, documents and conversations; staff permissions and adjustments must be recorded server-side. Do not reuse the public demo credentials as production credentials.
2. **Saved plans:** carry selected reference IDs and entered amounts through sign-in; validate against the server's current products and terms. Reconfirm changes to terms before funding.
3. **Lead processing:** create a staff task after a confirmed registration or user inquiry, with consent, source attribution, selected plan and assigned manager. Notify the actual team only through configured channels.
4. **Payments and ledger:** create requests on the server, verify payment-provider notifications and record actual transactions separately from staff notes. A button click or manual demo adjustment is never `funding_confirmed`.
5. **Messages:** persist in the central database; expose real unread/replied states. Add email delivery and opt-out rules before claiming external delivery. No automated emails are sent by this release.
6. **Data and content:** connect documented offering terms and verified operating reports. Public directory records remain references unless ownership/affiliation is evidenced.

## Measurement

The current `EcoChargeFunnel` API stores at most 400 local demo events. It sends no network requests. Its export is for testing instrumentation only; unique browser sessions are not unique investors. Stages may occur out of order, so the staff panel does not claim conversion rates.

Implemented names: `page_view`, `demo_opened`, `model_explored`, `station_viewed`, `station_saved`, `plan_reviewed`, `registration_completed`, `plan_saved`, `terms_viewed`, `question_saved`, `demo_funding_requested`, `demo_funding_reviewed`.

Production measurement should use authenticated server events for verified registration, funding started and funding confirmed; select a consistent attribution window and deduplicate events. Confirm the events permitted for the advertising account/category before connecting Meta or other vendors. Do not send balances, financial documents or conversation text to advertising systems.

## Next validation

### Demo languages

EN / RU is available on the public pages and both workspaces. English remains the fresh-browser default; `?lang=ru` opens Russian directly. The selection persists without resetting the plan, browser profile or message drafts. Russian print previews, sample PDFs and calendar exports are included. Message contents and original station/address records are preserved. Translation maintenance is documented in `src/locales/README.md`.

- Observe US English speakers answering: what is being offered, who receives funds, what supports distributions, how can capital be accessed?
- Test headline angle, registration timing and optional manager assistance separately.
- Measure confirmed funding, CAC, servicing cost and misunderstanding-related support/withdrawal requests. Visitor time on site is not the primary success metric.
- Set a spend cap using expected net business contribution, not investor deposits. Stop on misleading terms, broken confirmation/attribution or an uneconomic CAC; do not infer success from a handful of clicks.

## Checks for this release

`node build.cjs` and `node validate.cjs` check generated routes, local assets, JavaScript syntax and photo provenance fields. Browser tests cover operating math (including zero charging), guest exploration, plan/registration handoff, decimal amounts, manager inquiry context, sample funding and weekly credits, local event export and responsive layouts. Actual iOS Safari and production integrations remain outside these browser-demo checks.
