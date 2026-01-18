// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';

// // ======================
// // Detect env
// // ======================
// const ENV = process.env.ENV || 'local';
// const isCI = !!process.env.CI;

// // ======================
// // Load env file MANUALLY
// // ======================
// const envFile = `.env.${ENV}`;
// const envPath = path.resolve(process.cwd(), envFile);

// if (fs.existsSync(envPath)) {
//   dotenv.config({ path: envPath });
//   console.log(`✅ Loaded ${envFile}`);
// } else {
//   console.warn(`⚠️ ${envFile} not found → using defaults`);
// }

// // ======================
// // Safe getter
// // ======================
// function getEnv(name: string, fallback: string): string {
//   return process.env[name] ?? fallback;
// }

// // ======================
// // Export
// // ======================
// export const env = {
//   name: ENV,
//   isCI,

//   baseUrl: getEnv('BASE_URL', 'https://www.saucedemo.com'),

//   user: {
//     username: getEnv('USERNAME', 'standard_user'),
//     password: getEnv('PASSWORD', 'secret_sauce'),
//   },

//   timeouts: {
//     action: Number(getEnv('ACTION_TIMEOUT', '10000')),
//     navigation: Number(getEnv('NAVIGATION_TIMEOUT', '30000')),
//   },
// };
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// ======================
// Detect environment
// ======================
const ENV = process.env.ENV || 'local';
const isCI = !!process.env.CI;

// ======================
// Load env file (LOCAL ONLY)
// ======================
if (!isCI) {
  const envFile = `.env.${ENV}`;
  const envPath = path.resolve(process.cwd(), envFile);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ Loaded ${envFile}`);
  } else {
    console.warn(`⚠️ ${envFile} not found → using defaults`);
  }
}

// ======================
// ======================
function getEnv(
  name: string,
  options?: { required?: boolean; defaultValue?: string }
): string {
  const value = process.env[name];

  if (!value) {
    if (options?.required) {
      throw new Error(`❌ Missing environment variable: ${name}`);
    }
    return options?.defaultValue ?? '';
  }

  return value;
}

// ======================
// Export ENV
// ======================
export const env = {
  name: ENV,
  isCI,

  // 🌐 App
  baseUrl: getEnv('BASE_URL', {
    defaultValue: 'https://www.saucedemo.com',
  }),

  // 👤 Auth (required in CI)
  user: {
    username: getEnv('USERNAME', {
      required: isCI,
      defaultValue: 'standard_user',
    }),
    password: getEnv('PASSWORD', {
      required: isCI,
      defaultValue: 'secret_sauce',
    }),
  },

  // ⏱ Timeouts
  timeouts: {
    action: Number(getEnv('ACTION_TIMEOUT', { defaultValue: '10000' })),
    navigation: Number(getEnv('NAVIGATION_TIMEOUT', { defaultValue: '30000' })),
  },
};

// ======================
// ======================
console.log('✅ Playwright ENV loaded:', {
  name: env.name,
  isCI: env.isCI,
  baseUrl: env.baseUrl,
  user: {
    username: env.user.username ? '***' : '',
    password: env.user.password ? '***' : '',
  },
  timeouts: env.timeouts,
});

