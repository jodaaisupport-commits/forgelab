export const de = {
  login: 'Anmelden', register: 'Registrieren', dashboard: 'Übersicht', models: 'Modelle', datasets: 'Datensätze', training: 'Training', playground: 'Playground', connectors: 'Connectoren', admin: 'Administration',
  exportSuccess: 'Export erstellt.', exportError: 'Export konnte nicht erstellt werden.'
};
export const t = key => de[key] || key;
export function toast(message, type = 'info') {
  const region = document.querySelector('#toast-region');
  if (!region) return;
  const element = document.createElement('div'); element.className = `toast ${type}`; element.setAttribute('role', 'status'); element.textContent = message; region.append(element);
  window.setTimeout(() => element.remove(), 4500);
}
