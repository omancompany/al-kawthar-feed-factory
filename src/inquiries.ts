import {contact,whatsappUrl} from './contact-config';
export const useWhatsApp = contact.inquiryChannel !== 'server';
import { demoRequested } from './demo-preview';
export async function submitInquiry(kind: 'quote' | 'product' | 'consultation', name: string, phone: string, details: string) {
  if(demoRequested()) return 'demo-simulated';
  if(contact.inquiryChannel==='unavailable') throw Error('Online requests unavailable; use the published contact email.');
  if(useWhatsApp){const message=['طلب أعلاف الكوثر',kind,'الاسم: '+name,'الهاتف: '+phone,details].join('\n');const popup=window.open(whatsappUrl+'?text='+encodeURIComponent(message),'_blank');if(!popup)throw Error('Popup blocked');popup.opener=null;return 'whatsapp-prepared'}
  const response = await fetch(demoRequested() ? '/api/demo/inquiries' : '/api/inquiries', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, name, phone, details, consent: true }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Unable to save inquiry');
  const result = await response.json();
  if (result.ok !== true || !result.id) throw new Error('No confirmation');
  return result.id as string;
}
