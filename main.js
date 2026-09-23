import { register, login, logout, currentUser } from './auth.js';
import { loadState, saveState } from './state.js';
import { exportProject } from './export.js';
import { de, toast } from './locales/de.js';

const app = document.querySelector('#app');
let state = loadState();
let user = currentUser();

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
const notify = (message, type = 'info') => toast(message, type);

function render() {
  if (!user) return renderAuth();
  const models = state.models || [];
  const datasets = state.datasets || [];
  const runs = state.runs || [];
  app.innerHTML = `<div class="app-shell">
    <header class="topbar"><a class="brand" href="#dashboard">ForgeLab</a><nav aria-label="Hauptnavigation">
      <a href="#dashboard">Übersicht</a><a href="#models">Modelle</a><a href="#datasets">Datensätze</a><a href="#training">Training</a>
    </nav><div class="account"><span>${escapeHtml(user.name || user.email)}</span><button class="btn secondary" data-action="logout">Abmelden</button></div></header>
    <main class="content"><section class="hero"><div><p class="eyebrow">AI MODEL STUDIO</p><h1>Willkommen zurück, ${escapeHtml(user.name || 'Team')}</h1><p>Verwalte Modelle, Datensätze und Trainingsläufe an einem Ort.</p></div><button class="btn primary" data-action="export">Projekt exportieren</button></section>
    <div class="stats"><article><strong>${models.length}</strong><span>Modelle</span></article><article><strong>${datasets.length}</strong><span>Datensätze</span></article><article><strong>${runs.length}</strong><span>Trainingsläufe</span></article></div>
    <section class="panel"><h2>Modelle</h2><div class="cards">${models.map(model => `<article class="card"><div class="card-title"><h3>${escapeHtml(model.name)}</h3><span class="badge">${escapeHtml(model.status)}</span></div><p>${escapeHtml(model.type)} · ${escapeHtml(model.base)}</p><small>Genauigkeit: ${escapeHtml(model.accuracy)}%</small></article>`).join('') || '<p>Noch keine Modelle vorhanden.</p>'}</div></section>
    </main></div>`;
}

function renderAuth() {
  app.innerHTML = `<main class="auth-shell"><section class="auth-card"><p class="eyebrow">FORGELAB</p><h1>AI Model Studio</h1><p id="auth-hint">Melde dich an oder erstelle ein Demo-Konto.</p><form id="auth-form"><label>Name <input name="name" autocomplete="name" placeholder="Nur bei Registrierung erforderlich"></label><label>E-Mail <input name="email" type="email" required autocomplete="email"></label><label>Passwort <input name="password" type="password" minlength="8" required autocomplete="current-password"></label><button class="btn primary" type="submit">Anmelden</button></form><button class="link-button" data-action="toggle-auth">Konto erstellen</button></section></main>`;
  document.querySelector('#auth-form').addEventListener('submit', async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try { user = event.currentTarget.dataset.register === 'true' ? await register(form.get('name'), form.get('email'), form.get('password')) : await login(form.get('email'), form.get('password')); render(); notify('Erfolgreich angemeldet.', 'success'); }
    catch (error) { notify(error.message, 'error'); }
  });
}

document.addEventListener('click', async event => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'toggle-auth') {
    const form = document.querySelector('#auth-form'); const registering = form.dataset.register !== 'true'; form.dataset.register = registering; form.querySelector('label').hidden = !registering; form.querySelector('button[type="submit"]').textContent = registering ? 'Registrieren' : 'Anmelden'; event.target.textContent = registering ? 'Bereits registriert? Anmelden' : 'Konto erstellen';
  }
  if (action === 'logout') { logout(); user = null; render(); }
  if (action === 'export') { try { const blob = await exportProject(); const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'forgelab-project.zip' }); link.click(); URL.revokeObjectURL(link.href); notify('Export erstellt.', 'success'); } catch (error) { notify(error.message, 'error'); } }
});

window.addEventListener('hashchange', () => { state = { ...state, view: location.hash.slice(1) || 'dashboard' }; saveState(state); });
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
render();
