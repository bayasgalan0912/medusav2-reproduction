import { InferTypeOf } from "@medusajs/framework/types";
import Ads from "./modules/backoffice/models/ads";
import Contact from "./modules/backoffice/models/contact";

export type Ads = InferTypeOf<typeof Ads>;
export type Contact = InferTypeOf<typeof Contact>;
