// import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// ======================
// Detect ENV
// ======================
const ENV = process.env.ENV || 'local';
const isCI = !!process.env.CI;

// ======================
// Load env file (LOCAL ONLY)
// ======================
if (!isCI) {
  const envFile = `.env.${ENV}`;
  const envPath = path.resolve(process.cwd(), 'env', envFile);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ Loaded /env/${envFile}`);
  } else {
    console.warn(`⚠️ /env/${envFile} not found`);
  }
}

// ======================
// Helper
// ======================
function getEnv(name: string, defaultValue = ''): string {
  return process.env[name] || defaultValue;
}

// ======================
// Export
// ======================
export const env = {
  env: ENV,

  baseUrl: getEnv('BASE_URL'),

  user: {
    username: getEnv('USERNAME'),
    password: getEnv('PASSWORD'),
  },

  timeouts: {
    action: Number(getEnv('ACTION_TIMEOUT', '10000')),
    navigation: Number(getEnv('NAVIGATION_TIMEOUT', '30000')),
  },
};

// ======================
// Debug
// ======================
console.log('✅ Playwright ENV loaded:', {
  env: env.env,
  baseUrl: env.baseUrl,
  user: {
    username: env.user.username ? '***' : '',
    password: env.user.password ? '***' : '',
  },
});
