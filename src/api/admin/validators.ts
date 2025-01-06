import { z } from "zod";

export const FloatingAdSchema = z
  .object({
    id: z.string().optional(),
    text: z.string(),
    href: z.string(),
    status: z.boolean(),
  })
  .strict();

export const ContactSchema = z
  .object({
    id: z.string().optional(),

    name: z.string(),
    description: z.string(),
    logo: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    facebook: z.string(),
    ig: z.string(),
    x: z.string(),
    youtube: z.string(),
    others: z.string(),
  })
  .strict();
