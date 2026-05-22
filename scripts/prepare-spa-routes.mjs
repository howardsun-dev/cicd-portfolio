import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const distDir = 'dist';
const indexPath = join(distDir, 'index.html');
const routes = ['project', 'techstack'];

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html does not exist. Run vite build before preparing SPA routes.');
}

for (const route of routes) {
  // Supports /route/ on static hosts that resolve directory indexes.
  // The deployment workflow separately uploads extensionless /route objects
  // with text/html content type for CloudFront/S3 direct route support.
  const routeDir = join(distDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexPath, join(routeDir, 'index.html'));
}

copyFileSync(indexPath, join(distDir, '404.html'));
console.log(`Prepared SPA fallback files for routes: ${routes.join(', ')}`);
