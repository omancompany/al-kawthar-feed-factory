export function validateContact(c) {
 const required=['phone','whatsapp','email','addressAr','addressEn','hoursAr','hoursEn','siteUrl','privacyText'];
 const errors=required.filter(k=>typeof c[k]!=='string'||!c[k].trim()||/XXXX|placeholder|TODO/i.test(c[k]));
 if(!/^968[0-9]{8}$/.test(c.phone||''))errors.push('phone');
 if(!/^968[0-9]{8}$/.test(c.whatsapp||''))errors.push('whatsapp');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email||''))errors.push('email');
 try {if(new URL(c.siteUrl).protocol!=='https:')throw Error()}catch{errors.push('siteUrl')}
 if(c.contentApproved!==true||c.privacyApproved!==true)errors.push('owner content/privacy approval');
 if(errors.length)throw Error('Production contact configuration required: '+[...new Set(errors)].join(', '));return c;
}
