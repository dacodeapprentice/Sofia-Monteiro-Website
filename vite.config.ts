import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

const rootDir = import.meta.dirname ?? path.resolve('.');

function syncImagesPlugin(): Plugin {
  const syncFiles = () => {
    const rootPath = path.resolve(rootDir, 'images.json');
    const publicPath = path.resolve(rootDir, 'public', 'images.json');
    const rootExists = fs.existsSync(rootPath);
    const publicExists = fs.existsSync(publicPath);

    if (rootExists && publicExists) {
      const rootMtime = fs.statSync(rootPath).mtimeMs;
      const publicMtime = fs.statSync(publicPath).mtimeMs;
      if (rootMtime > publicMtime) {
        fs.copyFileSync(rootPath, publicPath);
      } else if (publicMtime > rootMtime) {
        fs.copyFileSync(publicPath, rootPath);
      }
    } else if (rootExists && !publicExists) {
      fs.mkdirSync(path.resolve(rootDir, 'public'), {recursive: true});
      fs.copyFileSync(rootPath, publicPath);
    } else if (publicExists && !rootExists) {
      fs.copyFileSync(publicPath, rootPath);
    }
  };

  return {
    name: 'sync-images-json',
    buildStart() {
      syncFiles();
    },
    configureServer(server) {
      syncFiles();
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url === '/images.json' || req.url.startsWith('/images.json?'))) {
          syncFiles();
          const publicPath = path.resolve(rootDir, 'public', 'images.json');
          if (fs.existsSync(publicPath)) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.end(fs.readFileSync(publicPath, 'utf-8'));
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [tailwindcss(), syncImagesPlugin()],
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
          photography: path.resolve(rootDir, 'photography.html'),
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
