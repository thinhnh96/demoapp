import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// ======================
// Detect environment
// ======================
const ENV = process.env.ENV || 'local';

// ======================
// Load env file
// ======================
const envFile = `.env.${ENV}`;
const envPath = path.resolve(process.cwd(), 'env', envFile);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn(`⚠️ /env/${envFile} not found`);
}

// ======================
// Helper
// ======================
function getEnv(name: string, defaultValue = ''): string {
  return process.env[name] || defaultValue;
}

// ======================
// Export ENV
// ======================
export const env = {
  env: ENV,

  baseUrl: getEnv('BASE_URL', 'https://www.saucedemo.com'),

  user: {
    username: getEnv('USERNAME', 'standard_user'),
    password: getEnv('PASSWORD', 'secret_sauce'),
  },

  tag: getEnv('TAG', '@smoke'),

  timeouts: {
    action: Number(getEnv('ACTION_TIMEOUT', '10000')),
    navigation: Number(getEnv('NAVIGATION_TIMEOUT', '30000')),
  },
};

// ======================
// Debug log
// ======================
console.log('ENV loaded:', {
  env: env.env,
  baseUrl: env.baseUrl,
  tag: env.tag,
});

