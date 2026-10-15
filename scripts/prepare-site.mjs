import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';import {validateContact} from './contact-policy.mjs';
const raw=process.env.SITE_CONTACT_JSON;if(!raw)throw Error('SITE_CONTACT_JSON must contain owner-approved contact JSON; production build blocked');
const c=validateContact(JSON.parse(raw));mkdirSync('src/generated',{recursive:true});writeFileSync('src/generated/contact.json',JSON.stringify(c,null,2)+'\n');
const base=process.env.VITE_BASE||'/';if(!base.startsWith('/')||!base.endsWith('/')||base.includes('..'))throw Error('VITE_BASE must be an absolute path ending in /');
writeFileSync('public/robots.txt','User-agent: *\nAllow: /\nSitemap: '+c.siteUrl.replace(/\/$/,'')+base+'sitemap.xml\n');
writeFileSync('public/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+c.siteUrl.replace(/\/$/,'')+base+'</loc></url></urlset>');

const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');writeFileSync('public/privacy.html','<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>الخصوصية</title><main style="max-width:800px;margin:40px auto;font:18px Arial;white-space:pre-wrap">'+escape(c.privacyText)+'</main></html>');
