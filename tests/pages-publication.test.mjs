import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {validateContact} from '../scripts/contact-policy.mjs';
const c=JSON.parse(readFileSync(new URL('../pages-contact.json',import.meta.url),'utf8'));
test('Pages reuses published contact data without requiring invented fields',()=>{assert.equal(validateContact(c),c);assert.throws(()=>validateContact({...c,contentApproved:false}));assert.throws(()=>validateContact({...c,siteUrl:'https://unapproved.example'}));});
test('public-only feed cannot silently enable a submission channel',()=>{assert.throws(()=>validateContact({...c,inquiryChannel:'server'}));assert.throws(()=>validateContact({...c,whatsapp:'96890000000'}));});
