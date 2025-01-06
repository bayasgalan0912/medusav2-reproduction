import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import { FloatingAdSchema } from "./admin/validators";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/ads",
      method: ["POST", "PUT"],
      // Not working
      middlewares: [validateAndTransformBody(FloatingAdSchema as any)],
    },
  ],
});
