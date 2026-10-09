import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import {defineConfig} from 'vite';

const rootDir = import.meta.dirname ?? path.resolve('.');

export default defineConfig(() => {
  return {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(rootDir, 'index.html'),
          about: path.resolve(rootDir, 'about.html'),
          website: path.resolve(rootDir, 'website.html'),
          contact: path.resolve(rootDir, 'contact.html'),
          uxui: path.resolve(rootDir, 'ux-ui.html'),
          youtube: path.resolve(rootDir, 'youtube.html'),
          instagram: path.resolve(rootDir, 'instagram.html'),
          socialmedia: path.resolve(rootDir, 'social-media.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
