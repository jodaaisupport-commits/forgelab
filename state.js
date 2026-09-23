import {storage} from './storage.js'; import {seed,connectorSeed} from './data.js';
export const keys={state:'forgelab.state',users:'forgelab.users',session:'forgelab.session'};
export function loadState(){const saved=storage.get(keys.state,{}); return {view:saved.view||'dashboard',models:saved.models||seed.models,datasets:saved.datasets||seed.datasets,runs:saved.runs||seed.runs,connectors:saved.connectors||connectorSeed,settings:saved.settings||{workspace:'Meine Werkstatt',notifications:true}}}
export function saveState(state){storage.set(keys.state,state)}
export function users(){return storage.get(keys.users,[])} export function session(){return storage.get(keys.session,null)}
export function saveUsers(v){storage.set(keys.users,v)} export function saveSession(v){storage.set(keys.session,v)}
