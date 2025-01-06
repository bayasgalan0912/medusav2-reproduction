import { loadEnv, defineConfig } from "@medusajs/framework/utils";
import { Modules } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  admin: {
    // ...
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },

  modules: {
    [Modules.AUTH]: {
      resolve: "@medusajs/medusa/auth",
      options: {
        providers: [
          // other providers...
          {
            resolve: "@medusajs/medusa/auth-emailpass",
            id: "emailpass",
            options: {
              // options...
            },
          },

          // other providers...
          {
            resolve: "@medusajs/medusa/auth-google",
            id: "google",
            options: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              callbackUrl: process.env.GOOGLE_CALLBACK_URL,
            },
          },
        ],
      },
    },

    backoffice: {
      // resolve: "./modules/ads",
      resolve: "./src/modules/backoffice",
    },
  },
});
