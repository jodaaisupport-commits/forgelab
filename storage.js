const memory = new Map();
const api = globalThis.miniapp || globalThis.MiniApp || {};
export const storage = {
  get(key, fallback = null) { try { const raw = api.getItem ? api.getItem(key) : memory.get(key); return raw == null ? fallback : (typeof raw === 'string' ? JSON.parse(raw) : raw); } catch { return fallback; } },
  set(key, value) { try { const raw = JSON.stringify(value); if (api.setItem) api.setItem(key, raw); else memory.set(key, raw); return true; } catch { return false; } },
  remove(key) { try { if (api.removeItem) api.removeItem(key); else memory.delete(key); } catch {} }
};
