import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { BACKOFFICE_MODULE } from "../modules/backoffice";
import BofficeModuleService from "../modules/backoffice/service";

type ContactWorkflowInput = {
  id?: string
  name: string;
  description: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  ig: string;
  x: string;
  youtube: string;
  others: string;
};

const createContactStep = createStep(
  "create-contact",
  async (
    params: ContactWorkflowInput,
    { container }
  ) => {
    const bofficeModuleService: BofficeModuleService = container.resolve(BACKOFFICE_MODULE);

    const contact = await bofficeModuleService.createContacts(params);

    return new StepResponse(contact, contact);
  },
  async (contact, { container }) => {
    const bofficeModuleService: BofficeModuleService = container.resolve(BACKOFFICE_MODULE);

    await bofficeModuleService.deleteContacts(contact.id);
  }
);
const updateContactStep = createStep(
  "update-contact",
  async (
    params: ContactWorkflowInput,
    { container }
  ) => {
    const bofficeModuleService: BofficeModuleService = container.resolve(BACKOFFICE_MODULE);

    const contact = await bofficeModuleService.updateContacts(params);

    return new StepResponse(contact, contact);
  },
  async (contact, { container }) => {
    const bofficeModuleService: BofficeModuleService = container.resolve(BACKOFFICE_MODULE);

    await bofficeModuleService.deleteContacts(contact.id);
  }
);

export const createContactWorkflow = createWorkflow(
  "create-contact",
  (contactInput: ContactWorkflowInput) => {
    const contact = createContactStep(contactInput);

    return new WorkflowResponse(contact);
  }
);

export const updateContactWorkflow = createWorkflow(
  "update-contact",
  (contactInput: ContactWorkflowInput) => {
    const contact = updateContactStep(contactInput);

    return new WorkflowResponse(contact);
  }
);
