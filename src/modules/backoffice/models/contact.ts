import { model } from "@medusajs/framework/utils";

const Ads = model.define("contact", {
  id: model.id().primaryKey(),
  name: model.text(),
  description: model.text(),
  logo: model.text(),


  email: model.text(),
  phone: model.text(),
  address: model.text(),


  // Social
  facebook: model.text(),
  ig: model.text(),
  // twitter
  x: model.text(),
  youtube: model.text(),

  others: model.json(),

});

export default Ads;
