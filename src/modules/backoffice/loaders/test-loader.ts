// https://docs.medusajs.com/learn/fundamentals/modules/loaders
import { LoaderOptions } from "@medusajs/framework/types";

// Executed at the first time app starts
// Use case: Other DB connection, ..

export default async function adsLoader({ container }: LoaderOptions) {
  const logger = container.resolve("logger");
  logger.info("[backoffice Loader]: Hello, World!");
}
