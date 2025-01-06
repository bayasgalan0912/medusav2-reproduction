import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { BACKOFFICE_MODULE } from "src/modules/backoffice";
import BackofficeModuleService from "src/modules/backoffice/service";
import { Ads } from "src/types";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  // res.sendStatus(200);
  // const productModuleService = req.scope.resolve(
  //   Modules.Ads
  // )

  const bofficeModuleService: BackofficeModuleService = req.scope.resolve(BACKOFFICE_MODULE);

  const floatingAd: Ads = await bofficeModuleService.getFloatingAds();

  res.json({
    floatingAd,
  });
}
