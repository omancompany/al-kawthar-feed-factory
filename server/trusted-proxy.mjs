import {isIP} from 'node:net';
// Only the immediate, explicitly trusted peer may supply the client address.
const normalize=address=>address.startsWith('::ffff:')?address.slice(7):address;
export function trustImmediateProxy(addresses){
 if(!Array.isArray(addresses)||!addresses.length||addresses.some(a=>!isIP(a)))throw Error('Trusted proxy addresses must be explicit IP addresses');
 const trusted=new Set(addresses.map(normalize));
 return (address,hop)=>hop===0&&trusted.has(normalize(address));
}

// Empty configuration means automatic Compose gateway discovery, not an empty IP.
export async function resolveTrustedProxyAddresses({configured,production=false,lookup}){
 const explicit=(configured||'').split(',').map(value=>value.trim()).filter(Boolean);
 if(explicit.length){trustImmediateProxy(explicit);return explicit;}
 if(!production)return ['127.0.0.1','::1'];
 const addresses=(await lookup('gateway',{all:true})).map(entry=>entry.address);
 trustImmediateProxy(addresses); // Empty/invalid DNS answers fail closed.
 return addresses;
}
