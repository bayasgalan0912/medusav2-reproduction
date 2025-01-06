import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { BACKOFFICE_MODULE } from "src/modules/backoffice";
import Service from "src/modules/backoffice/service";
import { Contact } from "src/types";
import { createContactWorkflow, updateContactWorkflow } from "src/workflows/create-contact";
import { z } from "zod";
import { ContactSchema } from "../validators";

type SchemaType = z.infer<typeof ContactSchema>;

export async function POST(
  req: MedusaRequest<SchemaType>,
  res: MedusaResponse
) {
  // console.log("req.validatedBody", req.validatedBody);
  console.log("req.body", req.body);

  const { id, name, description, logo, email, phone, address, facebook, ig, x, youtube, others } = req.body;

  const { result: contact } = await createContactWorkflow(req.scope).run({
    input: {
      id,
      name,
      description,
      logo,
      email,
      phone,
      address,
      facebook,
      ig,
      x,
      youtube,
      others,
    },
  });

  res.json({
    contact,
  });
}
export async function PUT(
  req: MedusaRequest<SchemaType>,
  res: MedusaResponse
) {
  const { id, name, description, logo, email, phone, address, facebook, ig, x, youtube, others } = req.body;

  const { result: contact } = await updateContactWorkflow(req.scope).run({
    input: {
      id,
      name,
      description,
      logo,
      email,
      phone,
      address,
      facebook,
      ig,
      x,
      youtube,
      others,
    },
  });

  res.json({
    contact,
  });
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {


  const service: Service = req.scope.resolve(BACKOFFICE_MODULE);

  const contact: Contact = await service.getContactInfo();

  res.json({
    contact,
  });
}
