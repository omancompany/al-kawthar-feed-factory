import {isIP} from 'node:net';
// Only the immediate, explicitly trusted peer may supply the client address.
const normalize=address=>address.startsWith('::ffff:')?address.slice(7):address;
export function trustImmediateProxy(addresses){
 if(!Array.isArray(addresses)||!addresses.length||addresses.some(a=>!isIP(a)))throw Error('Trusted proxy addresses must be explicit IP addresses');
 const trusted=new Set(addresses.map(normalize));
 return (address,hop)=>hop===0&&trusted.has(normalize(address));
}
