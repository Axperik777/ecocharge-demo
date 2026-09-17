'use strict';

// One operational surface per role. The existing ledger, inbox and map remain the data sources.
const cabSections = ['profile', 'plan', 'operations', 'messages', 'history'];
const cabSettings = ['contacts', 'stations', 'rates', 'tools'];
const cabQuery = new URL(location).searchParams;
let cabSection = cabSections.includes(cabQuery.get('section')) ? cabQuery.get('section') : 'profile';
let cabSetting = cabSettings.includes(cabQuery.get('section')) ? cabQuery.get('section') : 'contacts';
let cabClientOpen = cabQuery.get('client') === 'CL-1001';
let cabClientQuery = '', cabClientFilter = 'all', cabQueueFilter = 'all';
let cabEdit = null, cabConfirmation = null;
const cabInitials = name => escapeHtml(String(name || '').split(/\s+/).map(s => s[0]).slice(0, 2).join(''));
const cabButton = (action, label, primary = false) => `<button class="button ${primary ? 'primary' : 'secondary'}" data-action="${action}">${label}</button>`;
const cabPill = (label, tone = '') => `<span class="cab-pill ${tone}">${label}</span>`;
const cabAmountValid = n => Number.isFinite(n) && n >= 0 && n <= 1e7 && Math.abs(n * 100 - Math.round(n * 100)) < .00001;
const cabPlan = () => demo.planDraft || (isActivePlan() ? demo.plan : null);
const cabStage = () => isActivePlan() ? 'Active demo plan' : demo.planDraft ? 'Plan saved' : 'Choosing a plan';
const cabDate = value => Number.isFinite(Date.parse(value)) ? contactDate(value) : '—';

function cabRoute(section = 'profile') {
  if (role !== 'admin') return;
  cabSection = cabSections.includes(section) ? section : 'profile';
  cabClientOpen = true;
  adminTab = 'clients';
  renderAdmin();
  window.scrollTo({top: 0, behavior: 'instant'});
}

renderNav = function () {
  const nav = role === 'admin'
    ? [['overview', 'grid', 'Today'], ['clients', 'users', 'Clients'], ['requests', 'chat', 'Messages'], ['settings', 'filter', 'Settings']]
    : [['dashboard', 'grid', 'Overview'], ['map', 'map', 'Stations'], ['tariffs', 'assets', 'My plan'], ['documents', 'file', 'Documents']];
  const active = role === 'admin' ? adminTab : tab === 'assets' ? 'tariffs' : tab;
  $('.main-nav').innerHTML = nav.map(([id, glyph, label]) => `<button class="nav-item ${active === id ? 'active' : ''}" data-tab="${id}" ${active === id ? 'aria-current="page"' : ''}>${icon(glyph)}<span>${label}</span></button>`).join('');
  const url = new URL(location);
  url.searchParams.delete('view'); url.searchParams.delete('preview');
  url.searchParams.set('tab', role === 'admin' ? adminTab : tab);
  if (role === 'admin' && adminTab === 'clients') {
    url.searchParams.set('section', cabSection);
    if (cabClientOpen) url.searchParams.set('client', 'CL-1001'); else url.searchParams.delete('client');
  } else {
    url.searchParams.delete('client');
    if (role === 'admin' && adminTab === 'settings') url.searchParams.set('section', cabSetting);
    else url.searchParams.delete('section');
  }
  if (!restoringRoute && url.href !== location.href) {
    if (routeInitialized) history.pushState({}, '', url); else history.replaceState({}, '', url);
  }
  routeInitialized = true;
  const skip = $('#skip-content'); if (skip) skip.href = role === 'admin' ? '#admin-view' : '#client-view';
  renderContactSurfaces();
};

function cabClientStep() {
  const p = cabPlan();
  if (demo.planDraft) {
    if (!draftFundingGap()) return {state: 'ready', tag: 'Ready to activate', title: 'Your saved plan is ready.', copy: 'Review your stations and amount, then activate the demo plan.', action: 'journey-my-plan', label: 'Review saved plan', step: 2};
    if (journeyPendingFunding().length) return {state: 'pending', tag: 'Awaiting manager review', title: 'Your request is being reviewed.', copy: 'Your selection is saved. View the request status or ask your manager a question.', action: 'history', label: 'View request status', step: 1};
    return {state: 'saved', tag: 'Plan saved', title: 'Continue with your saved plan.', copy: 'Your amount and station selection are ready to review. You can still change them.', action: 'journey-my-plan', label: 'Continue my plan', step: 1};
  }
  if (isActivePlan()) return {state: 'active', tag: 'Active demo plan', title: 'Your plan, in one place.', copy: 'Check your stations, recorded weekly credits and account activity.', action: 'journey-my-plan', label: 'Open my plan', step: 3};
  return {state: 'new', tag: 'Your first step', title: 'Build your first charging plan.', copy: 'Choose reference stations and an amount. Review the calculation before saving your example.', action: 'journey-resume', label: 'Build my plan', step: 0};
}

function cabEvents() {
  const p = cabPlan(), rows = [];
  if (p) rows.push({date: p.appliedAt, title: isActivePlan() && !demo.planDraft ? 'Demo plan activated' : 'Plan saved', detail: `${p.name} · ${money(p.capital)}`, action: 'journey-my-plan', glyph: 'assets'});
  for (const r of demo.requests) rows.push({date: r.reviewedAt || r.date, title: `${r.type === 'topup' ? 'Demo funding' : 'Demo withdrawal'} · ${money(r.amount)}`, detail: r.status, action: 'history', glyph: 'calendar'});
  for (const t of demo.tickets) {
    const latest = threadMessages(t).at(-1);
    rows.push({date: latest?.date || t.date, title: latest?.from === 'manager' ? 'Manager replied' : 'Message saved', detail: t.service?.closed ? 'Closed' : t.status === 'Open' ? 'Awaiting reply' : 'Answered', thread: t.id, glyph: 'chat'});
  }
  for (const s of demo.sessions.filter(s => s.period === 'week')) rows.push({date: s.date, title: `Weekly demo credit · ${money(s.payout)}`, detail: `Period starting ${s.weekStart}`, credit: s.id, glyph: 'zap'});
  for (const a of (demo.adjustments || [])) rows.push({date: a.date, title: 'Account updated by manager', detail: 'Demo adjustment recorded', action: 'cab-account-details', glyph: 'filter'});
  return rows.filter(e => Number.isFinite(Date.parse(e.date))).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

function cabTimeline(limit = 3) {
  const rows = cabEvents().slice(0, limit);
  if (!rows.length) return '<div class="cab-empty"><p>No account activity yet.</p><small>Saved plans, requests and replies will appear here.</small></div>';
  return `<div class="cab-timeline">${rows.map(e => `<button ${e.thread ? `data-thread="${escapeHtml(e.thread)}"` : e.credit ? `data-credit-detail="${escapeHtml(e.credit)}"` : `data-action="${e.action === 'history' ? 'cab-request-history' : e.action}"`}>${icon(e.glyph)}<span><strong>${escapeHtml(e.title)}</strong><small>${escapeHtml(e.detail)}</small><time>${escapeHtml(cabDate(e.date))}</time></span>${icon('arrow')}</button>`).join('')}</div>`;
}

function cabStationPreview() {
  const p = cabPlan(), ids = p?.stationIds || explorationState().saved;
  let rows = ids.map(journeyStation).filter(Boolean).slice(0, 2);
  if (!rows.length) rows = [journeyStation(121704) || stations[0]].filter(Boolean);
  return `<section class="panel cab-stations"><div class="cab-section-heading"><h2>${p ? 'Your selected stations' : 'Explore a real location'}</h2><button class="text-button" data-action="${p ? 'journey-my-plan' : 'explore-map'}">${p ? 'View selection' : 'Open map'} ${icon('arrow')}</button></div>${rows.map(s => {const photo = journeyPhoto(s); return `<button class="cab-location" data-journey-open="${s.id}"><img src="${escapeHtml(photo.path)}" alt="${escapeHtml(photo.alt)}" width="180" height="128" loading="lazy" decoding="async"><span><strong translate="no">${escapeHtml(journeyLabel(s))}</strong><small>${s.ports} DC ports · ${photo.kind === 'illustration' ? 'Illustration' : 'Location photo'}</small></span>${icon('arrow')}</button>`;}).join('')}<small class="cab-caption">Reference locations · ownership is not established.</small></section>`;
}

function cabManagerStrip() {
  const unread = unreadReplies();
  return `<section class="panel cab-manager j-manager"><div class="cab-manager-person"><span class="cab-avatar">${cabInitials(demo.manager.name)}</span><div><small>Your manager</small><strong translate="no">${escapeHtml(demo.manager.name)}</strong><span>Local demo inbox</span></div>${unread ? cabPill(`${unread} unread replies`, 'mint') : ''}</div><div class="cab-manager-actions">${cabButton(unread ? 'cab-read-reply' : 'manager', unread ? 'Read reply' : 'Contact manager', true)}<button class="button secondary" data-action="conversations">${icon('chat')} Messages</button><button class="text-button" data-contact-topic="call">Request a call ${icon('arrow')}</button></div></section>`;
}

renderJourney = function () {
  if (workspaceRole !== 'client') return;
  $('#journey-toolbar')?.remove();
  const welcome = $('#client-next-step'); if (!welcome) return;
  let root = $('#journey-dashboard');
  if (!root) {root = document.createElement('div'); root.id = 'journey-dashboard'; welcome.after(root);}
  root.className = 'cab-dashboard'; root.hidden = tab !== 'dashboard';
  cabContactButton();
  cabStationTools();
  if (tab !== 'dashboard') return;
  const step = cabClientStep(), p = cabPlan(), credits = demo.sessions.filter(s => s.period === 'week').reduce((sum, s) => sum + s.payout, 0);
  welcome.className = 'panel client-next-step cab-welcome';
  welcome.dataset.state = step.state;
  welcome.innerHTML = `<div class="cab-welcome-top"><span class="j-eyebrow">${isGuest() ? 'YOUR DEMO WORKSPACE' : 'YOUR ECOCHARGE ACCOUNT'}</span>${cabPill(step.tag, step.state === 'pending' ? 'amber' : 'mint')}</div><h1>${step.title}</h1><p>${step.copy}</p><div class="cab-welcome-actions j-hero-actions">${cabButton(step.action, step.label + ' ' + icon('arrow'), true)}<button class="text-button" data-action="manager">Ask my manager ${icon('chat')}</button></div><ol class="cab-progress" aria-label="Plan progress">${['Choose stations', 'Review & fund', 'Active demo plan'].map((label, i) => `<li class="${i < step.step ? 'complete' : i === step.step ? 'current' : ''}" ${i === step.step ? 'aria-current="step"' : ''}><span>${i < step.step ? '✓' : i + 1}</span>${label}</li>`).join('')}</ol>`;
  root.innerHTML = `<section class="panel cab-summary"><div class="cab-section-heading"><h2>Account snapshot</h2><button class="text-button" data-action="cab-calculation">How it is calculated ${icon('arrow')}</button></div><dl class="cab-summary-values"><div><dt>${demo.planDraft ? 'Saved plan amount' : 'Plan amount'}</dt><dd>${p ? money(p.capital) : '—'}</dd><small>${demo.planDraft ? 'Not activated' : isActivePlan() ? 'Active demo capital' : 'Choose your amount'}</small></div><div><dt>Available balance</dt><dd>${money(Math.max(0, demo.balance - pendingWithdrawals()))}</dd><small>${pendingWithdrawals() ? money(pendingWithdrawals()) + ' reserved' : 'Sample funds'}</small></div><div><dt>Recorded credits</dt><dd>${money(credits)}</dd><button class="text-button" data-action="sessions">View calculations ${icon('arrow')}</button></div><div><dt>Selected stations</dt><dd>${p?.stationIds.length || 0}</dd><small>${p ? escapeHtml(p.name) : 'No plan selected'}</small></div></dl><div class="cab-summary-actions">${cabButton('topup', 'Add demo funds')}${cabButton('withdraw', 'Request withdrawal')}<button class="text-button" data-action="history">All activity ${icon('arrow')}</button></div></section><div class="cab-client-grid">${cabStationPreview()}${cabManagerStrip()}</div><section class="panel cab-activity"><div class="cab-section-heading"><h2>Latest activity</h2><button class="text-button" data-action="history">View all ${icon('arrow')}</button></div>${cabTimeline()}</section><nav class="cab-help" aria-label="Account help"><button data-action="journey-guide">${icon('file')} How it works</button><button data-action="journey-documents">Documents</button><a href="terms/">Terms & risks ↗</a></nav><p class="cab-local-note">Demo data stays in this browser. No real payments.</p>`;
};

function cabContactButton() {
  if (workspaceRole !== 'client') return;
  let b = $('#cab-inbox-button');
  if (!b) {b = document.createElement('button'); b.id = 'cab-inbox-button'; b.className = 'icon-btn cab-inbox-button'; b.dataset.action = 'manager'; $('.account-actions').prepend(b);}
  b.setAttribute('aria-label', 'Contact manager');
  b.innerHTML = icon('chat') + (unreadReplies() ? `<b>${unreadReplies()}</b>` : '');
  const dock = $('#manager-launcher');
  if (dock) {dock.classList.add('cab-contact-dock'); dock.hidden = window.scrollY < 460;}
}

function cabStationTools() {
  let tools = $('#cab-station-tools');
  if (!tools) {tools = document.createElement('nav'); tools.id = 'cab-station-tools'; tools.className = 'cab-station-tools'; tools.setAttribute('aria-label', 'Your station collection'); $('#map-section').before(tools);}
  tools.hidden = tab !== 'map';
  if (tab === 'map') {
    const x = explorationState();
    tools.innerHTML = `${cabButton('journey-browse-all', 'Photo catalog')}<button class="button secondary" data-action="journey-saved">Saved <b>${x.saved.length}</b></button><button class="button secondary" data-action="journey-compare">Compare <b>${x.compared.length}</b></button>`;
  }
}
window.addEventListener('scroll', () => {const dock = $('#manager-launcher'); if (workspaceRole === 'client' && dock) dock.hidden = window.scrollY < 460;}, {passive: true});

const cabDecisionBefore = renderDecisionSurfaces;
function cabGuestLabels() {
  if (workspaceRole !== 'client' || !isGuest()) return;
  $('#profile-name').textContent = window.EcoLocale?.language === 'ru' ? 'Гость' : 'Guest';
  const eyebrow = $('#client-next-step .j-eyebrow'); if (eyebrow) eyebrow.textContent = 'YOUR DEMO WORKSPACE';
}
renderDecisionSurfaces = function () {cabDecisionBefore(); $('#decision-roadmap')?.remove(); cabGuestLabels();};
document.addEventListener('ecocharge:locale', cabGuestLabels);
const cabJourneyPlanBefore = renderJourneyPlan;
renderJourneyPlan = function () {
  cabJourneyPlanBefore();
  if (workspaceRole !== 'client' || tab !== 'assets' || !demo.planDraft) return;
  const primary = $('.j-plan-summary .button.primary'); if (!primary) return;
  const gap = draftFundingGap(), pending = journeyPendingFunding().length;
  primary.dataset.action = !gap ? 'activate-draft' : pending ? 'cab-request-history' : 'request-plan-funding';
  primary.textContent = !gap ? 'Activate my demo plan' : pending ? 'View request status' : 'Request demo funding';
  primary.parentElement.insertAdjacentHTML('beforeend', cabButton('journey-resume', 'Edit plan choices'));
};
actions['journey-discover'] = () => {$('#modal').close(); actions['explore-map']();};
actions['cab-calculation'] = () => {
  const p = cabPlan();
  openModal(`<h2>Your weekly calculation</h2>${p ? `<div class="cab-formula"><strong>${money(p.capital)}</strong><span>×</span><strong>${p.rate}%</strong><span>=</span><strong>${money(weeklyCredit(p.capital, p.rate))}</strong></div><p>Plan amount × weekly demo rate. No compounding and no extra credit per vehicle.</p><p class="modal-note">This is an illustration. Only entries in the weekly history have been recorded in your demo balance.</p>${cabButton('sessions', 'View recorded credits', true)}` : `<p>Choose an amount and station group to see your weekly example.</p>${cabButton('journey-resume', 'Build my plan', true)}`}`);
};
actions['cab-account-details'] = () => openModal(`<h2>Current account details</h2><dl class="cab-detail-list"><div><dt>Available balance</dt><dd>${money(demo.balance - pendingWithdrawals())}</dd></div><div><dt>Plan amount</dt><dd>${money(cabPlan()?.capital || 0)}</dd></div><div><dt>Selected stations</dt><dd>${cabPlan()?.stationIds.length || 0}</dd></div></dl>${cabButton('manager', 'Ask about this update')}`);
const cabRequestHistory = actions.history;
actions.history = () => {
  if (role === 'admin') {cabRoute('operations'); $('#modal').close(); return;}
  openModal(`<h2>Account activity</h2><p>Requests, messages and recorded demo credits.</p><div class="cab-history-tools">${cabButton('cab-request-history', 'Funding & withdrawals')}${cabButton('sessions', 'Weekly credits')}</div>${cabTimeline(40)}`);
  // An event opens its request details rather than recursively opening this same list.
  $$('#modal [data-action="history"]').forEach(b => b.dataset.action = 'cab-request-history');
};
actions['cab-request-history'] = () => {
  cabRequestHistory();
  const summary = $('#modal-content>p');
  if (summary) summary.innerHTML = `<span>Total demo balance:</span> ${money(demo.balance)}<br><span>Reserved withdrawals:</span> ${money(pendingWithdrawals())}<br><span>Available balance:</span> ${money(demo.balance - pendingWithdrawals())}`;
};

const cabRequestTableBefore = requestTable;
requestTable = () => cabRequestTableBefore().replaceAll('John Doe', escapeHtml(demo.client.name));
// Directory shortcuts prepare a reviewable edit instead of making a loose assignment.
const cabDirectoryRowsBefore = directoryRows;
directoryRows = rows => cabDirectoryRowsBefore(rows).replaceAll('data-assign=', 'data-cab-use=').replaceAll('>Assign</button>', '>Use in plan</button>');
const cabStationDialogBefore = actions.station;
actions.station = function () {
  cabStationDialogBefore();
  if (role !== 'admin') return;
  const button = $('#modal [data-action="invest-selected"]');
  if (button) {button.dataset.action = 'cab-use-station'; button.textContent = 'Use in client plan';}
};
actions['cab-use-station'] = () => {
  if (role !== 'admin' || !selected) return;
  const id = selected.id;
  actions['cab-edit-plan']();
  const tier = demo.tariffs.find(t => t.id === cabEdit.tierId);
  if (!cabEdit.ids.includes(id)) cabEdit.ids = [...cabEdit.ids.slice(0, tier.count - 1), id];
  cabEditPlanForm();
  toast('Station added to the editor. Review the full selection before saving.');
};
const cabReviewRequestBefore = reviewRequest;
reviewRequest = function (id, decision) {
  if (role !== 'admin') return;
  cabReviewRequestBefore(id, decision);
  const p = $('#modal-content>p');
  if (p?.firstChild?.nodeType === Node.TEXT_NODE) p.firstChild.textContent = p.firstChild.textContent.replace('John Doe', demo.client.name);
};

function cabTasks() {
  const rows = [];
  for (const r of demo.requests.filter(r => r.status === 'Pending')) rows.push({type: 'payments', id: r.id, title: r.type === 'topup' ? 'Review demo funding' : 'Review demo withdrawal', detail: money(r.amount), status: 'Needs review', date: r.date, score: 2, request: true});
  for (const t of opsSortedTickets()) {
    const s = opsService(t), call = t.callback && t.callback.status !== 'cancelled' && Date.parse(t.callback.instant) > Date.now();
    if (!opsNeedsWork(t) && !call) continue;
    const overdue = Boolean(s.nextAction && s.due && !s.done && s.due < opsToday());
    rows.push({type: t.appointment || call ? 'calls' : t.status === 'Open' ? 'replies' : 'followups', id: t.id, title: t.subject, userText: true, detail: s.nextAction && !s.done ? s.nextAction : call ? opsAppointmentLabel(t.callback) : 'Read the question and its context', detailUser: Boolean(s.nextAction && !s.done), status: overdue ? 'Overdue' : call ? opsTicketStatus(t) : s.priority === 'high' ? 'High priority' : opsTicketStatus(t), date: call ? t.callback.instant : s.due ? s.due + 'T12:00:00' : opsLastDate(t), dateOnly: !call && Boolean(s.due), score: overdue ? 0 : s.priority === 'high' ? 1 : 3, ticket: true, followup: t.status !== 'Open' && !call});
  }
  const task = demo.client.followup;
  if (task?.text && !task.done) rows.push({type: 'followups', id: 'client-task', title: task.text, userText: true, detail: task.due || 'No due date', status: task.due && task.due < opsToday() ? 'Overdue' : 'Next action', date: task.due ? task.due + 'T12:00:00' : task.createdAt, score: task.due && task.due < opsToday() ? 0 : 4, dateOnly: Boolean(task.due), clientTask: true});
  if (!demo.plan && !rows.length) rows.push({type: 'plans', id: 'plan', title: demo.planDraft ? 'Review the saved plan' : 'Help with the first plan', detail: demo.planDraft ? `${demo.planDraft.name} · ${money(demo.planDraft.capital)}` : 'No plan saved yet', status: 'Next step', score: 5, section: 'plan'});
  return rows.sort((a, b) => a.score - b.score || (a.date || '').localeCompare(b.date || ''));
}

function cabQueue() {
  const all = cabTasks(), rows = all.filter(t => cabQueueFilter === 'all' || t.type === cabQueueFilter);
  return `<section class="panel cab-queue ops-queue"><div class="cab-section-heading"><div><h2>Work queue</h2><p>Open the task to see the client context.</p></div><button class="text-button" data-action="cab-task">Set next action ${icon('plus')}</button></div><div class="cab-filters" role="group" aria-label="Task filters">${[['all', 'All'], ['replies', 'Replies'], ['payments', 'Requests'], ['calls', 'Calls'], ['followups', 'Follow-ups']].map(([id, label]) => `<button data-cab-queue="${id}" aria-pressed="${cabQueueFilter === id}">${label}<b>${id === 'all' ? all.length : all.filter(t => t.type === id).length}</b></button>`).join('')}</div><div class="cab-task-list">${rows.length ? rows.map(t => `<article class="cab-task"><span class="cab-task-glyph">${icon(t.type === 'payments' ? 'assets' : t.type === 'calls' || t.type === 'followups' ? 'calendar' : t.type === 'plans' ? 'zap' : 'chat')}</span><div class="cab-task-body"><strong ${t.userText ? 'translate="no"' : ''}>${escapeHtml(t.title)}</strong><small><span translate="no">${escapeHtml(demo.client.name)}</span> · <span ${t.detailUser ? 'translate="no"' : ''}>${escapeHtml(t.detail)}</span></small>${t.date ? `<time>${escapeHtml(t.dateOnly ? t.date.slice(0, 10) : cabDate(t.date))}</time>` : ''}</div>${cabPill(t.status, t.score === 0 ? 'amber' : '')}<button class="button secondary" ${t.request ? `data-cab-request="${escapeHtml(t.id)}"` : t.clientTask ? 'data-action="cab-task"' : t.ticket ? (t.followup ? `data-ops-ticket="${escapeHtml(t.id)}"` : `data-reply="${escapeHtml(t.id)}"`) : `data-cab-section="${t.section}"`}>${t.request ? 'Review' : t.ticket && !t.followup ? 'Open conversation' : 'Open task'} ${icon('arrow')}</button></article>`).join('') : '<div class="cab-empty"><h3>No tasks in this view.</h3><p>New messages and requests will appear here.</p></div>'}</div></section>`;
}

function cabClientList() {
  const match = `${demo.client.name} ${demo.client.email} CL-1001`.toLowerCase().includes(cabClientQuery.toLowerCase().trim());
  const needs = cabTasks().some(t => !t.section), filterMatch = cabClientFilter === 'all' || cabClientFilter === 'attention' && needs || cabClientFilter === 'active' && isActivePlan();
  return `<aside class="panel cab-client-list"><div class="cab-section-heading"><h2>Clients</h2><span class="cab-count">1</span></div><label for="cab-client-search">Find a client</label><input id="cab-client-search" type="search" value="${escapeHtml(cabClientQuery)}" placeholder="Name, email or client ID"><label for="cab-client-filter">Show clients</label><select id="cab-client-filter"><option value="all">All clients</option><option value="attention" ${cabClientFilter === 'attention' ? 'selected' : ''}>Needs attention</option><option value="active" ${cabClientFilter === 'active' ? 'selected' : ''}>Active demo plan</option></select><div id="cab-client-results">${match && filterMatch ? `<button class="cab-client-select ${cabClientOpen ? 'selected' : ''}" data-cab-client="CL-1001"><span class="cab-avatar">${cabInitials(demo.client.name)}</span><span><strong translate="no">${escapeHtml(demo.client.name)}</strong><small><span translate="no">CL-1001</span> · <span>${cabStage()}</span></small></span>${icon('arrow')}</button>` : '<div class="cab-empty"><p>No matching clients.</p><button class="text-button" data-action="cab-clear-client-search">Clear filters</button></div>'}</div><p class="cab-caption">1 interactive demo account · this browser</p></aside>`;
}

function cabProfile() {
  const c = demo.client, task = c.followup;
  return `<section class="cab-card-section"><div class="cab-section-heading"><h2>Client profile</h2>${cabButton('edit-client', 'Edit profile')}</div><dl class="cab-detail-list"><div><dt>Client ID</dt><dd>CL-1001</dd></div><div><dt>Email</dt><dd translate="no">${escapeHtml(c.email)}</dd></div><div><dt>Account status</dt><dd>${c.status === 'Review' ? 'Under review' : escapeHtml(c.status)}</dd></div><div><dt>Assigned manager</dt><dd translate="no">${escapeHtml(demo.manager.name)}</dd></div><div><dt>First-touch source</dt><dd translate="no">${escapeHtml(demo.attribution?.utm_source || '—')}</dd></div></dl><div class="cab-note"><strong>Staff note</strong><p translate="no">${escapeHtml(c.note || '')}</p>${!c.note ? '<small>No staff note yet.</small>' : ''}</div><div class="cab-followup"><div><h3>Next action</h3><p ${task?.text ? 'translate="no"' : ''}>${escapeHtml(task?.text || 'Set a follow-up for this client.')}</p>${task?.text ? `<small>${task.done ? 'Completed' : escapeHtml(task.due || 'No due date')}</small>` : ''}</div>${cabButton('cab-task', task?.text ? 'Edit follow-up' : 'Set next action')}</div></section>`;
}

function cabPlanPanel() {
  const p = cabPlan();
  return `<section class="cab-card-section"><div class="cab-section-heading"><div><h2>Plan & stations</h2><p>${demo.planDraft ? 'Saved selection awaiting activation' : isActivePlan() ? 'Active demo plan' : 'No plan saved yet'}</p></div>${cabButton('cab-edit-plan', p ? 'Change plan' : 'Set up plan', true)}</div>${p ? `<dl class="cab-plan-values"><div><dt>Plan amount</dt><dd>${money(p.capital)}</dd></div><div><dt>Weekly demo rate</dt><dd>${p.rate}%</dd></div><div><dt>Weekly illustration</dt><dd>${money(weeklyCredit(p.capital, p.rate))}</dd></div></dl><div class="cab-assigned-stations">${p.stationIds.map(journeyStation).filter(Boolean).map(s => `<button data-cab-station="${s.id}"><img src="${escapeHtml(journeyPhoto(s).path)}" alt="${escapeHtml(journeyPhoto(s).alt)}" loading="lazy" width="96" height="72"><span><strong translate="no">${escapeHtml(journeyLabel(s))}</strong><small>AFDC ${s.id} · ${s.ports} DC ports</small></span>${icon('arrow')}</button>`).join('')}</div>` : '<div class="cab-empty"><p>Choose the amount, tariff and exact reference stations in one form.</p></div>'}<div class="cab-plan-footer">${cabButton('preview-contract', 'View documents')}<button class="text-button" data-action="account-audit">Change history ${icon('arrow')}</button></div></section>`;
}

function cabOperationsPanel() {
  return `<section class="cab-card-section"><div class="cab-section-heading"><div><h2>Account operations</h2><p>Available balance: <strong>${money(demo.balance - pendingWithdrawals())}</strong></p></div>${cabButton('cab-edit-balance', 'Adjust demo balance')}</div><div class="cab-operation-actions">${cabButton('simulate-session', 'Record a demo week')}${cabButton('sessions', 'Weekly credit history')}</div>${requestTable()}</section>`;
}

function cabClientCard() {
  const content = cabSection === 'profile' ? cabProfile() : cabSection === 'plan' ? cabPlanPanel() : cabSection === 'operations' ? cabOperationsPanel() : cabSection === 'messages' ? supportTable() : `<section class="cab-card-section"><div class="cab-section-heading"><h2>Client change history</h2>${cabButton('account-audit', 'View adjustments')}</div>${activityPanel()}</section>`;
  return `<section class="panel cab-client-card"><button class="text-button cab-back-list" data-action="cab-client-list">← All clients</button><header class="cab-client-header"><span class="cab-avatar">${cabInitials(demo.client.name)}</span><div><h2 translate="no">${escapeHtml(demo.client.name)}</h2><small><span translate="no">CL-1001</span> · <span>${cabStage()}</span></small></div><button class="text-button" data-action="view-client">Preview client ${icon('out')}</button></header><nav class="cab-card-tabs" aria-label="Client sections">${[['profile', 'Profile'], ['plan', 'Plan & stations'], ['operations', 'Operations'], ['messages', 'Messages'], ['history', 'History']].map(([id, label]) => `<button data-cab-section="${id}" ${cabSection === id ? 'aria-current="page"' : ''}>${label}</button>`).join('')}</nav><div class="cab-card-content">${content}</div></section>`;
}

function cabSettingsPanel() {
  let content;
  if (cabSetting === 'contacts') content = managerIdentity();
  else if (cabSetting === 'stations') content = stationDirectory();
  else if (cabSetting === 'rates') content = tariffAdmin();
  else content = `<section class="panel cab-card-section"><h2>Demo tools</h2><p>Local diagnostics and workspace controls.</p><div class="cab-tool-actions">${cabButton('decision-diagnostics', 'View local events')}${cabButton('reset', 'Reset demo')}</div><p class="cab-caption">Changes sync between tabs in this browser. There is no shared client database.</p></section>`;
  return `<nav class="cab-settings-tabs" aria-label="Workspace settings">${[['contacts', 'Manager contacts'], ['stations', 'Station directory'], ['rates', 'Demo tariffs'], ['tools', 'Demo tools']].map(([id, label]) => `<button data-cab-setting="${id}" aria-current="${cabSetting === id ? 'page' : 'false'}">${label}</button>`).join('')}</nav><div class="cab-settings-content">${content}</div>`;
}

renderAdmin = function () {
  if (workspaceRole !== 'admin') return;
  ensureClient(); ensureManager(); ensureTariffs();
  if (restoringRoute) {const q = new URL(location).searchParams; cabSection = cabSections.includes(q.get('section')) ? q.get('section') : 'profile'; cabSetting = cabSettings.includes(q.get('section')) ? q.get('section') : 'contacts'; cabClientOpen = q.get('client') === 'CL-1001';}
  if (adminTab === 'plan') {adminTab = 'clients'; cabSection = 'plan'; cabClientOpen = true;}
  if (['stations', 'tariffs'].includes(adminTab)) {cabSetting = adminTab === 'stations' ? 'stations' : 'rates'; adminTab = 'settings';}
  const titles = {overview: ['Today', 'Messages, requests and follow-ups that need your attention.'], clients: ['Clients', 'Profile, plan, operations and conversations in one place.'], requests: ['Messages', 'Reply with the client context and keep your next action nearby.'], settings: ['Settings', 'Contacts, directory and demo configuration.']};
  const [title, description] = titles[adminTab] || titles.overview;
  const tasks = cabTasks(), pending = demo.requests.filter(r => r.status === 'Pending').length, replies = demo.tickets.filter(t => !opsClosed(t) && t.status === 'Open').length;
  let content;
  if (adminTab === 'clients') content = `<div class="cab-client-workspace ${cabClientOpen ? 'detail-open' : ''}">${cabClientList()}${cabClientCard()}</div>`;
  else if (adminTab === 'requests') content = `<div class="cab-inbox-context"><span translate="no">${escapeHtml(demo.client.name)}</span>${cabPill(cabStage())}<button class="text-button" data-cab-section="profile">Open client card ${icon('arrow')}</button></div>${supportTable()}`;
  else if (adminTab === 'settings') content = cabSettingsPanel();
  else content = `<section class="cab-today-counts" aria-label="Work summary"><button data-cab-queue="all"><strong>${tasks.length}</strong><span>Next actions</span></button><button data-cab-queue="replies"><strong>${replies}</strong><span>Needs reply</span></button><button data-cab-queue="payments"><strong>${pending}</strong><span>Requests to review</span></button></section>${cabQueue()}<section class="panel cab-today-client"><span class="cab-avatar">${cabInitials(demo.client.name)}</span><div><small>Your demo client</small><strong translate="no">${escapeHtml(demo.client.name)}</strong><span>${cabStage()}</span></div>${cabButton('cab-open-client', 'Open client card')}</section>`;
  $('#admin-view').className = 'cab-staff';
  $('#admin-view').innerHTML = `<header class="cab-page-heading"><div><span class="j-eyebrow">TEAM WORKSPACE</span><h1>${title}</h1><p>${description}</p></div>${adminTab === 'overview' ? cabButton('cab-open-client', 'Open client card') : ''}</header>${content}`;
  $('#profile-name').textContent = demo.manager.name; $('#profile-role').textContent = 'TEAM · DEMO';
  $('.profile .avatar').textContent = demo.manager.name.split(/\s+/).map(s => s[0]).slice(0, 2).join('');
  renderNav();
  $('#notification-count').textContent = String(pending + replies); $('#notification-count').hidden = !pending && !replies;
  if (cabSetting === 'stations' && adminTab === 'settings' && managerDirectoryQuery) {$('#admin-station-search').value = managerDirectoryQuery; $('#admin-station-search').dispatchEvent(new Event('input', {bubbles: true}));}
  labelMobileTables();
};

// Keep the saved directory query without replacing a focused field during input.
document.addEventListener('input', e => {if (e.target.id === 'admin-station-search') managerDirectoryQuery = e.target.value;});
actions['cab-open-client'] = () => cabRoute();
actions['cab-client-list'] = () => {cabClientOpen = false; renderAdmin(); window.scrollTo({top: 0, behavior: 'instant'});};
actions['cab-clear-client-search'] = () => {cabClientQuery = ''; cabClientFilter = 'all'; renderAdmin(); $('#cab-client-search')?.focus();};
actions['manage-account'] = () => cabRoute('plan');
actions['client-plan'] = () => {$('#modal').close(); cabRoute('plan');};
actions['manage-tariffs'] = () => {adminTab = 'settings'; cabSetting = 'rates'; renderAdmin();};
actions['view-client'] = () => {window.open(new URL('client/?preview=1&tab=dashboard', currentPortalBase), '_blank');};
actions.notifications = () => {if (role === 'admin') {adminTab = 'overview'; cabQueueFilter = 'all'; renderAdmin();} else actions.history();};

actions['cab-task'] = () => {
  if (role !== 'admin') return;
  const t = demo.client.followup || {};
  openModal(`<h2>Client follow-up</h2><p translate="no">${escapeHtml(demo.client.name)}</p><form id="cab-task-form"><label for="cab-task-text">Next action</label><input id="cab-task-text" maxlength="180" value="${escapeHtml(t.text || '')}" required><label for="cab-task-due">Follow-up date</label><input id="cab-task-due" type="date" value="${escapeHtml(t.due || '')}"><label class="ops-check"><input id="cab-task-done" type="checkbox" ${t.done ? 'checked' : ''}> Follow-up completed</label><p class="form-hint">Internal task in this browser. No reminder or client message is sent.</p><button class="button primary" type="submit">Save follow-up</button></form>`);
};

function cabSnapshot() {return JSON.stringify({balance: demo.balance, plan: demo.plan, draft: demo.planDraft, portfolio: demo.portfolio, tariffs: demo.tariffs, reserved: pendingWithdrawals()});}
function cabBeforeValues() {return {balance: demo.balance, capital: demo.plan?.capital || 0, stations: demo.portfolio.length, tariff: demo.plan?.name || 'None', rate: demo.plan?.rate || 0, stationIds: demo.portfolio.slice()};}
function cabEditRows() {
  const q = (cabEdit?.query || '').toLowerCase().trim();
  const pool = q ? stations.filter(s => `${s.city} ${s.state} ${s.name} ${s.id}`.toLowerCase().includes(q)) : [...new Set([...(cabEdit?.ids || []), ...(window.ECOCHARGE_STATION_VISUALS?.featuredIds || [])])].map(journeyStation).filter(Boolean);
  return pool.slice(0, 50).map(s => `<label class="cab-pick-row"><input type="checkbox" data-cab-pick="${s.id}" ${cabEdit.ids.includes(s.id) ? 'checked' : ''}><img src="${escapeHtml(journeyPhoto(s).path)}" alt="${escapeHtml(journeyPhoto(s).alt)}" width="84" height="64" loading="lazy"><span><strong translate="no">${escapeHtml(journeyLabel(s))}</strong><small>AFDC ${s.id} · ${journeyPhoto(s).kind === 'illustration' ? 'Illustration' : 'Location photo'}</small></span></label>`).join('') || '<p>No matching locations.</p>';
}

function cabEditPlanForm() {
  const t = demo.tariffs.find(t => t.id === cabEdit.tierId) || demo.tariffs[0];
  openModal(`<h2>Change client plan</h2><p>Review the amount, tariff and exact stations together.</p><form id="cab-plan-form"><div class="cab-form-columns"><div><label for="cab-plan-amount">Plan amount (USD)</label><input id="cab-plan-amount" type="number" inputmode="decimal" min="250" max="10000000" step=".01" value="${cabEdit.capital}" required></div><div><label for="cab-plan-tier">Weekly tariff</label><select id="cab-plan-tier">${demo.tariffs.map(t => `<option value="${t.id}" ${t.id === cabEdit.tierId ? 'selected' : ''}>${escapeHtml(t.name)} · ${t.count} stations · ${t.rate}%</option>`).join('')}</select></div></div><div class="cab-preview-math" id="cab-plan-math"></div><div class="cab-section-heading"><label for="cab-plan-search">Reference stations</label><span id="cab-selection-count">${cabEdit.ids.length} / ${t.count}</span></div><input id="cab-plan-search" type="search" value="${escapeHtml(cabEdit.query || '')}" placeholder="City, state or station ID"><div class="cab-picker" id="cab-picker">${cabEditRows()}</div><label for="cab-plan-reason">Reason for change</label><input id="cab-plan-reason" maxlength="180" value="${escapeHtml(cabEdit.reason || '')}" required><div id="cab-plan-error" class="form-error" role="alert"></div><p class="form-hint">Direct demo plan adjustment. Available balance stays unchanged. Saving activates this demo plan.</p><button class="button primary" type="submit">Review changes</button></form>`);
  cabUpdatePlanMath();
}
function cabUpdatePlanMath() {
  const t = demo.tariffs.find(t => t.id === cabEdit?.tierId); if (!t || !$('#cab-plan-math')) return;
  $('#cab-plan-math').textContent = validDemoInvestment(cabEdit.capital) ? money(cabEdit.capital) + ' × ' + t.rate + '% = ' + money(weeklyCredit(cabEdit.capital, t.rate)) + ' per demo week' : 'Enter a valid amount from $250.';
  $('#cab-selection-count').textContent = cabEdit.ids.length + ' / ' + t.count;
}
actions['cab-edit-plan'] = () => {
  if (role !== 'admin') return;
  const p = cabPlan(), t = demo.tariffs.find(t => t.id === p?.tierId) || demo.tariffs[0];
  cabEdit = {kind: 'plan', baseline: cabSnapshot(), capital: p?.capital || 250, tierId: t.id, ids: (p?.stationIds || demo.portfolio).filter(id => stations.some(s => s.id === id)).slice(0, t.count), reason: '', query: ''};
  cabEditPlanForm();
};

function cabBalanceForm() {
  openModal(`<h2>Adjust demo balance</h2><p>Change the available sample funds separately from the plan.</p><form id="cab-balance-form"><label for="cab-balance-amount">Total demo balance (USD)</label><input id="cab-balance-amount" type="number" inputmode="decimal" min="0" max="10000000" step=".01" value="${cabEdit.balance}" required><p class="form-hint">Reserved withdrawals: ${money(pendingWithdrawals())}</p><label for="cab-balance-reason">Reason for change</label><input id="cab-balance-reason" maxlength="180" value="${escapeHtml(cabEdit.reason || '')}" required><div id="cab-balance-error" class="form-error" role="alert"></div><button class="button primary" type="submit">Review changes</button></form>`);
}
actions['cab-edit-balance'] = () => {if (role !== 'admin') return; cabEdit = {kind: 'balance', baseline: cabSnapshot(), balance: demo.balance, reason: ''}; cabBalanceForm();};

function cabReviewChanges(after) {
  const before = cabBeforeValues();
  cabConfirmation = {...cabEdit, before, after};
  const fields = cabEdit.kind === 'balance' ? [['balance', 'Demo balance', money]] : [['capital', 'Plan amount', money], ['tariff', 'Weekly tariff', escapeHtml], ['stations', 'Selected stations', String], ['rate', 'Weekly demo rate', n => n + '%']];
  openModal(`<h2>Review account changes</h2><p translate="no">${escapeHtml(demo.client.name)}</p><div class="cab-review-table"><div class="cab-review-head"><span>Field</span><span>Before</span><span>After</span></div>${fields.map(([key, label, format]) => `<div><strong>${label}</strong><span>${format(before[key])}</span><b>${format(after[key])}</b></div>`).join('')}</div><div class="cab-note"><strong>Reason for change</strong><p translate="no">${escapeHtml(cabEdit.reason)}</p></div><p class="modal-note">Demo adjustment only. The change will be recorded in the account history.</p><div id="cab-confirm-error" class="form-error" role="alert"></div><div class="cab-confirm-actions">${cabButton('cab-confirm-change', 'Save changes', true)}${cabButton('cab-back-edit', 'Back to editing')}</div>`);
}
actions['cab-back-edit'] = () => {if (role !== 'admin' || !cabEdit) return; cabEdit.kind === 'plan' ? cabEditPlanForm() : cabBalanceForm();};
actions['cab-confirm-change'] = () => {
  if (role !== 'admin' || !cabConfirmation) return;
  const c = cabConfirmation;
  if (c.baseline !== cabSnapshot()) {$('#cab-confirm-error').textContent = 'The account changed in another tab. Reopen the editor to review current values.'; return;}
  if (c.kind === 'balance') demo.balance = c.after.balance;
  else {
    const tier = demo.tariffs.find(t => t.id === c.tierId);
    demo.plan = {tierId: tier.id, name: tier.name, rate: tier.rate, period: 'week', capital: c.capital, stationIds: c.ids.slice(), status: 'active', appliedAt: new Date().toISOString()};
    demo.portfolio = c.ids.slice(); delete demo.planDraft;
  }
  demo.adjustments ??= [];
  demo.adjustments.unshift({actor: 'admin', kind: c.kind, date: new Date().toISOString(), reason: c.reason, before: c.before, after: c.after});
  activity(c.kind === 'balance' ? 'Manager adjusted the demo balance' : 'Manager updated the demo plan');
  cabConfirmation = null; cabEdit = null;
  persist(); $('#modal').close(); cabRoute(c.kind === 'balance' ? 'operations' : 'plan');
  toast('Changes saved in the client account and history.');
};

document.addEventListener('submit', e => {
  const f = e.target;
  if (!['cab-plan-form', 'cab-balance-form', 'cab-task-form'].includes(f.id)) return;
  e.preventDefault(); if (role !== 'admin') return;
  if (f.id === 'cab-task-form') {
    const text = $('#cab-task-text').value.trim(); if (!text) return;
    demo.client.followup = {text, due: $('#cab-task-due').value, done: $('#cab-task-done').checked, createdAt: demo.client.followup?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString()};
    activity('Staff updated the client follow-up'); persist(); $('#modal').close(); renderAdmin(); toast('Follow-up saved.'); return;
  }
  if (!cabEdit) return;
  if (f.id === 'cab-balance-form') {
    cabEdit.balance = Number($('#cab-balance-amount').value); cabEdit.reason = $('#cab-balance-reason').value.trim();
    if (!cabAmountValid(cabEdit.balance) || cabEdit.balance < pendingWithdrawals() || cabEdit.reason.length < 3) {$('#cab-balance-error').textContent = 'Keep reserved withdrawals covered and add a reason of at least 3 characters.'; return;}
    if (cabEdit.balance === demo.balance) {$('#cab-balance-error').textContent = 'Enter a different balance to record an adjustment.'; return;}
    cabReviewChanges({...cabBeforeValues(), balance: cabEdit.balance});
  } else {
    cabEdit.capital = Number($('#cab-plan-amount').value); cabEdit.reason = $('#cab-plan-reason').value.trim();
    const tier = demo.tariffs.find(t => t.id === cabEdit.tierId);
    if (!tier || !validDemoInvestment(cabEdit.capital) || cabEdit.reason.length < 3 || cabEdit.ids.length !== tier.count || !cabEdit.ids.every(id => stations.some(s => s.id === id))) {$('#cab-plan-error').textContent = 'Choose the required number of stations, a valid amount and a reason of at least 3 characters.'; return;}
    cabReviewChanges({...cabBeforeValues(), capital: cabEdit.capital, stations: cabEdit.ids.length, tariff: tier.name, rate: tier.rate, stationIds: cabEdit.ids.slice()});
  }
});

document.addEventListener('input', e => {
  if (e.target.id === 'cab-client-search') {cabClientQuery = e.target.value; const html = document.createElement('div'); html.innerHTML = cabClientList(); $('#cab-client-results').innerHTML = html.querySelector('#cab-client-results').innerHTML;}
  if (e.target.id === 'cab-plan-search' && cabEdit) {cabEdit.query = e.target.value; $('#cab-picker').innerHTML = cabEditRows();}
  if (e.target.id === 'cab-plan-amount' && cabEdit) {cabEdit.capital = Number(e.target.value); cabUpdatePlanMath();}
});
document.addEventListener('change', e => {
  if (e.target.id === 'cab-client-filter') {cabClientFilter = e.target.value; $('#cab-client-search').dispatchEvent(new Event('input', {bubbles: true}));}
  if (e.target.id === 'cab-plan-tier' && cabEdit) {cabEdit.tierId = e.target.value; const t = demo.tariffs.find(t => t.id === cabEdit.tierId); cabEdit.ids = cabEdit.ids.slice(0, t.count); $('#cab-picker').innerHTML = cabEditRows(); cabUpdatePlanMath();}
  if (e.target.dataset.cabPick && cabEdit) {
    const id = Number(e.target.dataset.cabPick), t = demo.tariffs.find(t => t.id === cabEdit.tierId);
    if (e.target.checked && cabEdit.ids.length >= t.count) {e.target.checked = false; $('#cab-plan-error').textContent = 'Remove a selected station before adding another.'; return;}
    cabEdit.ids = e.target.checked ? [...cabEdit.ids, id] : cabEdit.ids.filter(n => n !== id); $('#cab-plan-error').textContent = ''; cabUpdatePlanMath();
  }
});
document.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || role !== 'admin') return;
  if (b.dataset.cabSection) {$('#modal').close(); cabRoute(b.dataset.cabSection);}
  if (b.dataset.cabClient) cabRoute(cabSection);
  if (b.dataset.cabSetting) {cabSetting = b.dataset.cabSetting; renderAdmin(); document.querySelector(`[data-cab-setting="${cabSetting}"]`)?.focus({preventScroll: true});}
  if (b.dataset.cabQueue) {cabQueueFilter = b.dataset.cabQueue; adminTab = 'overview'; renderAdmin(); document.querySelector(`.cab-filters [data-cab-queue="${cabQueueFilter}"]`)?.focus({preventScroll: true});}
  if (b.dataset.cabRequest) {cabRoute('operations'); const row = document.querySelector(`[data-review="${b.dataset.cabRequest}"]`); row?.scrollIntoView({block: 'center', behavior: 'instant'}); row?.focus({preventScroll: true});}
  if (b.dataset.cabStation) {selectStation(Number(b.dataset.cabStation)); actions.station();}
  if (b.dataset.cabUse) {selectStation(Number(b.dataset.cabUse)); actions['cab-use-station']();}
});

const cabResetBefore = actions['confirm-reset'];
actions['confirm-reset'] = () => {cabEdit = null; cabConfirmation = null; cabQueueFilter = 'all'; cabClientQuery = ''; cabClientFilter = 'all'; cabResetBefore();};

actions['cab-read-reply'] = () => {const t = demo.tickets.find(t => t.reply && t.readReply !== t.reply); if (t) showThread(t.id); else actions.conversations();};

// State updates can replace the button that opened a dialog. Restore focus to its
// visible replacement instead of the browser falling back to the skip link.
let cabDialogTrigger = null;
document.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b || b.closest('#modal')) return;
  cabDialogTrigger = b.id ? '#' + CSS.escape(b.id) : b.dataset.action ? `[data-action="${CSS.escape(b.dataset.action)}"]` : null;
}, true);
$('#modal').addEventListener('close', () => requestAnimationFrame(() => {
  if ($('#modal').open) return;
  const focused = document.activeElement;
  if (focused && focused !== document.body && focused.id !== 'skip-content' && focused.getClientRects().length) return;
  const candidates = cabDialogTrigger ? $$(cabDialogTrigger).filter(el => !el.closest('#modal') && el.getClientRects().length) : [];
  (candidates[0] || $('.main-nav .active'))?.focus({preventScroll: true});
}));
