const config = {
  NODE_ENV: process.env.NODE_ENV || 'production',

  // global
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'develop',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '0.0.0',

  // app
  APP_URL: process.env.NEXT_PUBLIC_APP_URL
    || (process.env.NODE_ENV === 'production' ? 'https://remont-nsk.net' : 'http://localhost:3000'),

  METRIKA_ID: process.env.METRIKA_ID || ''
};

export default config;
