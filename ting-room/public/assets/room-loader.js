// Only validated, original-resolution room files are persisted. No HTML/UI is cached.
const REVISION='__TING_ROOM_REVISION__';
const EXPECTED=(()=>{try{return JSON.parse('__TING_ROOM_MANIFEST__')}catch{return {}}})();
let database;
const writes=[],cacheHits=new Set();
let finished=0;
const state=window.__tingRoomLoading={phase:'loading',completed:0,cached:0,retries:0};
function message(text){const node=document.querySelector('.room-loading-caption');if(node)node.textContent=text}
export function roomStep(){finished++;state.completed=finished;if(state.phase==='error')return;message(finished<5?`正在载入高清场景 · ${finished}/5`:'正在准备场景画面…')}
function openCache(wait=250){
 if(REVISION.startsWith('__')||!('indexedDB' in window))return Promise.resolve(null);
 if(!database)database=new Promise(resolve=>{try{const request=indexedDB.open('ting-room-original-assets',1);request.onupgradeneeded=()=>request.result.createObjectStore('files');request.onsuccess=()=>resolve(request.result);request.onerror=request.onblocked=()=>resolve(null)}catch{resolve(null)}});
 return new Promise(resolve=>{const timer=setTimeout(()=>resolve(null),wait);database.then(db=>{clearTimeout(timer);resolve(db)})});
}
function key(url){return REVISION+':'+new URL(url,location.href).pathname}
async function readCache(url){
 const db=await openCache();if(!db)return null;
 return new Promise(resolve=>{let done=false;const finish=v=>{if(done)return;done=true;clearTimeout(timer);resolve(v)};const timer=setTimeout(()=>finish(null),500);try{const request=db.transaction('files').objectStore('files').get(key(url));request.onsuccess=()=>finish(request.result||null);request.onerror=()=>finish(null)}catch{finish(null)}});
}
export function cacheRoomBuffer(url,buffer){
 if(cacheHits.has(key(url))){const result=Promise.resolve(true);writes.push(result);return result}
 const write=(async()=>{const db=await openCache(5000);if(!db)return false;return new Promise(resolve=>{let done=false;const finish=v=>{if(done)return;done=true;clearTimeout(timer);resolve(v)};const timer=setTimeout(()=>finish(false),5000);try{const transaction=db.transaction('files','readwrite');transaction.objectStore('files').put(buffer,key(url));transaction.oncomplete=()=>finish(true);transaction.onerror=transaction.onabort=()=>finish(false)}catch{finish(false)}})})();writes.push(write);return write;
}
export async function finishRoomCache(){
 const results=await Promise.all(writes);if(results.length<5||results.some(v=>!v))return;
 try{localStorage.setItem('ting-room-complete-assets',REVISION)}catch{}
 // Bound storage to this set of original room files, keeping unrelated app data intact.
 const db=await openCache();if(db)try{const transaction=db.transaction('files','readwrite'),store=transaction.objectStore('files'),request=store.openCursor();request.onsuccess=()=>{const cursor=request.result;if(cursor){if(!String(cursor.key).startsWith(REVISION+':'))cursor.delete();cursor.continue()}}}catch{}
}
async function valid(url,buffer){
 if(!(buffer instanceof ArrayBuffer))return false;const expected=EXPECTED[new URL(url,location.href).pathname];if(!expected)return true;
 if(!crypto.subtle)return true;
 const digest=await crypto.subtle.digest('SHA-256',buffer);return [...new Uint8Array(digest)].map(n=>n.toString(16).padStart(2,'0')).join('')===expected;
}
export async function loadRoomBuffer(url){
 const cached=await readCache(url);if(cached&&await valid(url,cached)){cacheHits.add(key(url));state.cached++;return cached}
 let error;
 for(let attempt=0;attempt<2;attempt++){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
  try{const response=await fetch(url,{signal:controller.signal,credentials:'same-origin',mode:'cors',cache:attempt?'reload':'default',priority:'high'});if(!response.ok)throw new Error('HTTP '+response.status);const buffer=await response.arrayBuffer();if(!await valid(url,buffer))throw new Error('Asset validation failed');return buffer}
  catch(reason){error=reason;if(attempt===0){state.retries++;if(state.phase!=='error')message('网络较慢，正在重新连接高清资源…')}}
  finally{clearTimeout(timer)}
 }
 throw error;
}
export function roomFailure(error){
 state.phase='error';message('高清场景未能加载，请检查网络后重试');
 const host=document.querySelector('.room-loading-status');if(host&&!host.querySelector('.room-loading-retry')){const button=document.createElement('button');button.className='room-loading-retry';button.textContent='重新加载';button.addEventListener('click',()=>location.reload());host.append(button)}
 console.warn('Room loading did not complete:',error);
}
export function roomReady(){state.phase='ready';message('准备好了，即将进入…')}
export function roomDeadline(promise,ms=25000){let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Scene decoding timed out')),ms)})]).finally(()=>clearTimeout(timer))}
