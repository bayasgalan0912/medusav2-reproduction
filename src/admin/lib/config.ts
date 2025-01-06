import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  baseUrl: 'http://admin.tosonbekh.com', //"http://localhost:9000",
  debug: process.env.NODE_ENV === "development",
  auth: {
    type: "session",
  },
});
