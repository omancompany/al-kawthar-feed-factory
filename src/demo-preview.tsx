import React from 'react';
export const demoRequested = () => new URLSearchParams(window.location.search).get('demo') === '1';
export const demoEnabled = () => (window as unknown as {__SITE_DEMO_ENABLED__?: boolean}).__SITE_DEMO_ENABLED__ === true;
export const demoPreview = () => demoRequested() && demoEnabled();
export function DemoBar({lang}: {lang:'ar'|'en'}) {
 const ar=lang==='ar';
 if(demoRequested())return <div role="status" className="sticky top-0 z-[70] bg-amber-100 p-3 text-center text-sm text-amber-950">{ar?'عرض تجريبي: الطلبات والروابط الخارجية لا تنفذ إجراءات حقيقية.':'Demo preview: requests and external links do not perform real actions.'} <a className="font-bold underline" href="/">{ar?'الخروج من الديمو':'Exit demo'}</a></div>;
 return demoEnabled()?<div className="bg-indigo-950 p-2 text-center text-sm text-white"><a className="font-bold underline" href="?demo=1">{ar?'استعراض الموقع تجريبيًا':'Try the demo preview'}</a></div>:null;
}
export function DemoUnavailable(){return <main dir="rtl" className="p-10 text-center"><h1>العرض التجريبي غير متاح</h1><a href="/">العودة إلى الموقع</a></main>}
export function blockDemoExternal(event: React.MouseEvent<HTMLElement>) {
 if(!demoRequested())return;
 const anchor=(event.target as HTMLElement).closest('a');
 const url=anchor?.getAttribute('href')||'';
 if(/^(https?:|tel:|mailto:)/i.test(url)){event.preventDefault();event.stopPropagation();}
}
