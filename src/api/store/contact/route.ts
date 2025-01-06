import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { BACKOFFICE_MODULE } from "src/modules/backoffice";
import Service from "src/modules/backoffice/service";
import { Ads } from "src/types";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {


  const service: Service = req.scope.resolve(BACKOFFICE_MODULE);

  const contact: Ads = await service.getContactInfo();

  res.json({
    contact,
  });
}
