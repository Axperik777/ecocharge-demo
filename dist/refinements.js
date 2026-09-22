'use strict';

function refinePlanSummary() {
  const tier = demo.tariffs.find(t => t.id === chosenTier);
  if (!tier || !$('#r-plan-capital')) return;
  const valid = validDemoInvestment(investmentDraft) && $('#investment-amount')?.value.trim() !== '';
  $('#r-plan-capital').textContent = valid ? money(investmentDraft) : '—';
  $('#r-plan-count').textContent = `${chosenStations.length} / ${tier.count}`;
  $('#r-plan-rate').textContent = `${tier.rate}%`;
  $('#r-dock-capital').textContent = valid ? money(investmentDraft) : '—';
  $('#r-dock-count').textContent = `${chosenStations.length} / ${tier.count}`;
  $('#r-selection-status').textContent = chosenStations.length === tier.count ? 'Station selection complete' : 'Choose the required number of stations';
  // Keep validation actionable, including on the mobile review button.
  $$('#tariffs-section [data-action="apply-plan"]').forEach(b => b.disabled = false);
}

function refineBuilder() {
  const area = $('#tariffs-section');
  if (!area || area.querySelector('.r-builder')) return;
  const amount = area.querySelector('.allocation-panel'), picker = area.querySelector('.station-picker'), tiers = area.querySelector('.tariff-grid');
  if (!amount || !picker || !tiers) return;
  area.classList.add('r-plan');
  area.querySelector('.selection-steps')?.remove();
  const model = $('#decision-model-link'); if (model) model.remove();
  const heading = area.querySelector('.tariff-hero');
  heading.querySelector('.tariff-unit')?.remove();
  heading.querySelector('p').textContent = 'Set your amount, choose reference stations and review one clear weekly example.';
  const layout = document.createElement('div'); layout.className = 'r-builder';
  const main = document.createElement('div'); main.className = 'r-builder-main';
  const summary = document.createElement('aside'); summary.className = 'panel r-plan-summary'; summary.setAttribute('aria-label', 'Your sample plan summary');
  summary.innerHTML = `<span class="j-eyebrow">YOUR EXAMPLE</span><h2>Review your selection</h2><dl class="r-summary-facts"><div><dt>Plan amount</dt><dd id="r-plan-capital"></dd></div><div><dt>Selected stations</dt><dd id="r-plan-count"></dd></div><div><dt>Weekly demo rate</dt><dd id="r-plan-rate"></dd></div></dl>`;
  ['.allocation-math', '.formula-box', '.tariff-disclosure', '[data-action="apply-plan"]', '#tariff-error', '.contact-plan-cta'].forEach(selector => {const el = amount.querySelector(selector); if (el) summary.append(el);});
  // Contact extensions may use a different wrapper; preserve their original action.
  amount.querySelectorAll('button[data-contact-topic],button[data-action="guided-support"]').forEach(el => summary.append(el));
  amount.querySelector('.section-heading').innerHTML = '<h2><span class="r-step">1</span> Choose your amount</h2>';
  const tierSection = document.createElement('section'); tierSection.className = 'panel r-tier-section';
  tierSection.innerHTML = '<div class="section-heading"><h2><span class="r-step">2</span> Choose a station group</h2></div><p class="r-explain">The station count sets the demo rate. Your amount changes the calculation.</p>';
  tierSection.append(tiers);
  picker.querySelector('h2').innerHTML = '<span class="r-step">3</span> Choose reference stations';
  picker.querySelector('.picker-note').textContent = 'Reference choices are preselected. Change any station before saving. Public listings do not establish company ownership.';
  picker.insertAdjacentHTML('beforeend', '<p id="r-selection-status" class="r-selection-status" role="status"></p>');
  main.append(amount, tierSection, picker); layout.append(main, summary);
  area.querySelector('.tariff-workspace')?.remove(); heading.after(layout);
  const scenarios = area.querySelector('.tariff-scenarios');
  if (scenarios) {const details = document.createElement('details'); details.className = 'r-scenario-details'; details.innerHTML = '<summary>See the example over several weeks</summary>'; scenarios.before(details); details.append(scenarios);}
  const historyPanel = area.querySelector('.session-panel'); if (historyPanel) historyPanel.hidden = !demo.sessions.length;
  const help = document.createElement('a'); help.href = 'inside-a-station/'; help.className = 'r-model-link'; help.textContent = 'Explore charging revenue and operating costs →'; area.append(help);
  area.insertAdjacentHTML('beforeend', `<div class="r-plan-dock"><div><span>Sample plan</span><strong id="r-dock-capital"></strong><small><span>Selected stations:</span> <span id="r-dock-count"></span></small></div><button class="button primary" data-action="r-review-plan">Review plan ${icon('arrow')}</button></div>`);
  refinePlanSummary();
}

const refineTariffsBefore = renderTariffs;
renderTariffs = function () {
  const focusedTier = document.activeElement?.dataset.tier;
  refineTariffsBefore(); refineBuilder();
  if (focusedTier) $(`[data-tier="${focusedTier}"]`)?.focus({preventScroll: true});
};
const refineMathBefore = updateTariffMath;
updateTariffMath = function () {refineMathBefore(); refinePlanSummary();};
const refineApplyBefore = actions['apply-plan'];
actions['apply-plan'] = () => {
  refineApplyBefore();
  if (!$('#modal').open) {
    const invalid = !validDemoInvestment(investmentDraft) || !$('#investment-amount')?.value.trim();
    const el = invalid ? $('#investment-amount') : $('#picker-search');
    el?.focus({preventScroll: true}); el?.scrollIntoView({block: 'center', behavior: 'instant'});
  }
};
actions['r-review-plan'] = () => actions['apply-plan']();
document.addEventListener('change', e => {if (e.target.matches('[data-pick-station]')) refinePlanSummary();});

function refineDashboard() {
  if (workspaceRole !== 'client') return;
  const root = $('#journey-dashboard'), welcome = $('#client-next-step');
  if (!root || !welcome || tab !== 'dashboard') return;
  const fresh = !cabPlan() && !demo.balance && !demo.requests.length && !demo.sessions.length;
  root.classList.toggle('r-fresh', fresh);
  if (fresh) {
    root.querySelector('.cab-summary')?.remove();
    const actionsRow = welcome.querySelector('.cab-welcome-actions');
    if (actionsRow) actionsRow.innerHTML = `<a class="button secondary" href="inside-a-station/">Understand the business</a><button class="button secondary" data-action="explore-map">Explore stations</button>${cabButton('journey-resume', 'Build my plan ' + icon('arrow'), true)}`;
    welcome.querySelector('h1').textContent = 'Start with what interests you.';
    welcome.querySelector('p').textContent = 'Explore the business, inspect a real location or build your own sample plan. No payment details needed.';
    welcome.querySelector('.cab-progress')?.remove();
  }
  if (!cabEvents().length) root.querySelector('.cab-activity')?.remove();
  // Pair the next action and real location on wide screens, keeping DOM reading order intact.
  if (!welcome.querySelector('.r-welcome-main')) {
    const content = document.createElement('div'); content.className = 'r-welcome-main';
    while (welcome.firstChild) content.append(welcome.firstChild);
    welcome.append(content);
    const station = root.querySelector('.cab-stations'); if (station) {station.classList.add('r-welcome-station'); welcome.append(station);}
  }
  root.querySelector('.cab-client-grid')?.classList.add('r-manager-row');
}
const refineJourneyBefore = renderJourney;
renderJourney = function () {refineJourneyBefore(); refineDashboard();};

function refineAgentContext() {
  if (role !== 'admin') return;
  const host = adminTab === 'clients' ? $('.cab-client-header') : adminTab === 'requests' ? $('.cab-inbox-context') : null;
  if (!host || $('#r-agent-context')) return;
  const p = cabPlan(), followup = demo.client.followup;
  const latest = demo.tickets.filter(t => !opsClosed(t)).sort((a,b) => Date.parse(opsLastDate(b)) - Date.parse(opsLastDate(a)))[0];
  const next = followup && !followup.done ? followup.text : latest ? opsService(latest).nextAction : '';
  const block = document.createElement('div'); block.id = 'r-agent-context'; block.className = 'r-agent-context';
  block.innerHTML = `<div><span>Client plan</span><strong>${p ? money(p.capital) : 'No plan saved yet'}</strong><small>${p ? p.stationIds.length + ' reference stations' : 'Choosing a plan'}</small></div><div><span>Open question</span><strong ${latest ? 'translate="no"' : ''}>${latest ? escapeHtml(latest.subject) : 'No open questions'}</strong></div><div><span>Next action</span><strong ${next ? 'translate="no"' : ''}>${next ? escapeHtml(next) : 'Agree on the next step'}</strong></div>`;
  host.after(block);
}
const refineAdminBefore = renderAdmin;
renderAdmin = function () {refineAdminBefore(); refineAgentContext();};
const refineModalBefore = openModal;
openModal = function (html) {
  refineModalBefore(html);
  if (role === 'admin' && $('#reply-form')) {
    const t = demo.tickets.find(t => t.id === $('#reply-form').dataset.ticket), p = cabPlan();
    $('#modal-content').insertAdjacentHTML('afterbegin', `<div class="r-reply-context"><strong translate="no">${escapeHtml(demo.client.name)}</strong><span>${p ? money(p.capital) + ' · ' + p.stationIds.length + ' reference stations' : 'No plan saved yet'}</span>${t && opsService(t).nextAction ? `<small translate="no">${escapeHtml(opsService(t).nextAction)}</small>` : ''}</div>`);
  }
};

function refineViewport() {
  document.body.classList.toggle('r-builder-open', workspaceRole === 'client' && tab === 'tariffs');
}
const refineClientBefore = renderClientTab;
let refineContactOpened = false;
renderClientTab = function () {refineClientBefore(); refineViewport();
  if (!refineContactOpened && workspaceRole === 'client' && new URL(location).searchParams.get('contact') === 'manager') {
    refineContactOpened = true; const url = new URL(location); url.searchParams.delete('contact'); history.replaceState(history.state, '', url);
    queueMicrotask(() => actions.manager());
  }
};
document.addEventListener('ecocharge:locale', () => {refineViewport(); refinePlanSummary();});
window.addEventListener('resize', refineViewport);
document.addEventListener('DOMContentLoaded', refineViewport);
