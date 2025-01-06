import {
  InjectManager,
  MedusaContext,
  MedusaService,
} from "@medusajs/framework/utils";
import Ads from "./models/ads";
import Contact from "./models/contact";
import { EntityManager, SqlEntityManager } from "@mikro-orm/knex";
import { Context } from "@medusajs/framework/types";

class BackofficeModuleService extends MedusaService({
  Ads,
  Contact
}) {
  // Do
  async getMessage(): Promise<string> {
    return "Backoffice service: Hello, World!";
  }

  // DB change: https://docs.medusajs.com/learn/fundamentals/modules/db-operations
  @InjectManager()
  async getFloatingAds(
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any> {
    const data = await sharedContext.manager.execute(
      "select * from ads order by created_at desc limit 1"
    );

    return data && data.length > 0 ? data[0] : null;
  }
  @InjectManager()
  async getContactInfo(
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any> {
    const data = await sharedContext.manager.execute(
      "select * from contact"
    );

    return data && data.length > 0 ? data[0] : null;
  }
}

export default BackofficeModuleService;
