import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE || "/",
    plugins: [react(), tailwindcss(), {name:'approved-contact-metadata',transformIndexHtml(){const c=JSON.parse(process.env.SITE_CONTACT_JSON||'{}');return c.siteUrl?[{tag:'meta',attrs:{property:'og:url',content:c.siteUrl},injectTo:'head'},{tag:'link',attrs:{rel:'canonical',href:c.siteUrl},injectTo:'head'}]:[]}}],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      proxy: { "/api": "http://127.0.0.1:3001" },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
