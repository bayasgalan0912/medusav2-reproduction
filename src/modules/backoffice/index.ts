import adsLoader from "./loaders/test-loader";
import moduleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const BACKOFFICE_MODULE = "backoffice";

export default Module(BACKOFFICE_MODULE, {
  service: moduleService,
  loaders: [adsLoader],
});
