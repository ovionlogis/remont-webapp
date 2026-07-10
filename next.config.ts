import type { NextConfig } from 'next';
import path from 'path';

import packageJson from './package.json';

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : 'standalone',

  trailingSlash: false,

  images: {
    unoptimized: process.env.NODE_ENV === 'production'
  },

  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `
      @use "${path.join(__dirname, 'src/styles/mixins.scss')}" as *;
    `
  }
};

export default nextConfig;
