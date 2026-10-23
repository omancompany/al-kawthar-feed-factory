import configured from './generated/contact.json';
export const contact = configured as typeof configured & {inquiryChannel?:'whatsapp'|'server'|'unavailable'};
export const whatsappUrl = 'https://wa.me/' + contact.whatsapp;
