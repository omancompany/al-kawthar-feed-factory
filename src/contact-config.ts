import configured from './generated/contact.json';
export const contact = configured as typeof configured & {inquiryChannel?:'whatsapp'|'server'};
export const whatsappUrl = 'https://wa.me/' + contact.whatsapp;
