import { model } from "@medusajs/framework/utils";

const Ads = model.define("ads", {
  id: model.id().primaryKey(),
  name: model.text(),
  text: model.text(),
  href: model.text(),
  type: model.enum(['floating']),
  // type: model.text(),
  status: model.boolean(),
});

export default Ads;
