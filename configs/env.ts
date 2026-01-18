import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// ======================
// Detect env
// ======================
const ENV = process.env.ENV || 'local';
const isCI = !!process.env.CI;

// ======================
// Load env file MANUALLY
// ======================
const envFile = `.env.${ENV}`;
const envPath = path.resolve(process.cwd(), envFile);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`✅ Loaded ${envFile}`);
} else {
  console.warn(`⚠️ ${envFile} not found → using defaults`);
}

// ======================
// Safe getter
// ======================
function getEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

// ======================
// Export
// ======================
export const env = {
  name: ENV,
  isCI,

  baseUrl: getEnv('BASE_URL', 'https://www.saucedemo.com'),

  user: {
    username: getEnv('USERNAME', 'standard_user'),
    password: getEnv('PASSWORD', 'secret_sauce'),
  },

  timeouts: {
    action: Number(getEnv('ACTION_TIMEOUT', '10000')),
    navigation: Number(getEnv('NAVIGATION_TIMEOUT', '30000')),
  },
};
