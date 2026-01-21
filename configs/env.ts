// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';

// // ======================
// // Detect environment
// // ======================
// const ENV = process.env.ENV || 'local';
// const isCI = !!process.env.CI;

// // ======================
// // Load env file (LOCAL ONLY)
// // ======================
// if (!isCI) {
//   const envFile = `.env.${ENV}`;
//   const envPath = path.resolve(process.cwd(), envFile);

//   if (fs.existsSync(envPath)) {
//     dotenv.config({ path: envPath });
//     console.log(`✅ Loaded ${envFile}`);
//   } else {
//     console.warn(`⚠️ ${envFile} not found → using defaults`);
//   }
// }

// // ======================
// // ======================
// function getEnv(
//   name: string,
//   options?: { required?: boolean; defaultValue?: string }
// ): string {
//   const value = process.env[name];

//   if (!value) {
//     if (options?.required) {
//       throw new Error(`❌ Missing environment variable: ${name}`);
//     }
//     return options?.defaultValue ?? '';
//   }

//   return value;
// }

// // ======================
// // Export ENV
// // ======================
// export const env = {
//   name: ENV,
//   isCI,

//   // 🌐 App
//   baseUrl: getEnv('BASE_URL', {
//     defaultValue: 'https://www.saucedemo.com',
//   }),

//   // 👤 Auth (required in CI)
//   user: {
//     username: getEnv('USERNAME', {
//       required: isCI,
//       defaultValue: 'standard_user',
//     }),
//     password: getEnv('PASSWORD', {
//       required: isCI,
//       defaultValue: 'secret_sauce',
//     }),
//   },

//   // ⏱ Timeouts
//   timeouts: {
//     action: Number(getEnv('ACTION_TIMEOUT', { defaultValue: '10000' })),
//     navigation: Number(getEnv('NAVIGATION_TIMEOUT', { defaultValue: '30000' })),
//   },
// };

// // ======================
// // ======================
// console.log('✅ Playwright ENV loaded:', {
//   name: env.name,
//   isCI: env.isCI,
//   baseUrl: env.baseUrl,
//   user: {
//     username: env.user.username ? '***' : '',
//     password: env.user.password ? '***' : '',
//   },
//   timeouts: env.timeouts,
// });
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// ======================
// Detect CI & Target ENV
// ======================
const isCI = process.env.CI === 'true';
const TARGET_ENV = process.env.TARGET_ENV || 'local';

// ======================
// Load env file (LOCAL ONLY)
// ======================
if (!isCI) {
  const envFile = `.env.${TARGET_ENV}`;
  const envPath = path.resolve(process.cwd(), envFile);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ Loaded ${envFile}`);
  } else {
    console.warn(`⚠️ ${envFile} not found → using defaults`);
  }
}

// ======================
// Helper
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
  targetEnv: TARGET_ENV,
  isCI,

  // 🌐 Application
  baseUrl: getEnv('BASE_URL', {
    required: isCI,
    defaultValue: 'https://www.saucedemo.com',
  }),

  // 👤 Auth
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

  // 🏷 Test tag
  tag: getEnv('TAG', { defaultValue: '@smoke' }),

  // ⏱ Timeouts
  timeouts: {
    action: Number(getEnv('ACTION_TIMEOUT', { defaultValue: '10000' })),
    navigation: Number(getEnv('NAVIGATION_TIMEOUT', { defaultValue: '30000' })),
  },
};

// ======================
// Log (safe)
// ======================
console.log('✅ Playwright ENV loaded:', {
  targetEnv: env.targetEnv,
  isCI: env.isCI,
  baseUrl: env.baseUrl,
  tag: env.tag,
  timeouts: env.timeouts,
});

