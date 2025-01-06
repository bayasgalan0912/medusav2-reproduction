import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { BACKOFFICE_MODULE } from "src/modules/backoffice";
import AdsModuleService from "src/modules/backoffice/service";
import { Ads } from "src/types";
import { z } from "zod";
import {
  createAdWorkflow,
  updateAdWorkflow,
} from "../../../workflows/create-ads";
import { FloatingAdSchema } from "../validators";

type FloatingAdSchemaType = z.infer<typeof FloatingAdSchema>;

export async function POST(
  req: MedusaRequest<FloatingAdSchemaType>,
  res: MedusaResponse
) {
  // console.log("req.validatedBody", req.validatedBody);
  console.log("req.body", req.body);

  const { href, text, status } = req.body;

  const { result: ad } = await createAdWorkflow(req.scope).run({
    input: {
      name: "Урдсаг зар",
      text: text,
      href: href || "#",
      type: "floating",
      status: status,
    },
  });

  res.json({
    ad,
  });
}
export async function PUT(
  req: MedusaRequest<FloatingAdSchemaType>,
  res: MedusaResponse
) {
  const { id, href, text, status } = req.body;

  const { result: ad } = await updateAdWorkflow(req.scope).run({
    input: {
      id: id,
      name: "Урдсаг зар",
      text: text,
      href: href || "#",
      type: "floating",
      status: status,
    },
  });

  res.json({
    ad,
  });
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {


  const adsModuleService: AdsModuleService = req.scope.resolve(BACKOFFICE_MODULE);

  const floatingAd: Ads = await adsModuleService.getFloatingAds();

  res.json({
    floatingAd,
  });
}
