import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { BACKOFFICE_MODULE } from "../modules/backoffice";
import BofficeModuleService from "../modules/backoffice/service";

type AdWorkflowInput = {
  id?: string;
  name: string;
  text: string;
  href: string;
  type: string;
  status: boolean;
};

const createAdStep = createStep(
  "create-ads",
  async (
    { name, text, href, type, status }: AdWorkflowInput,
    { container }
  ) => {
    const adsModuleService: BofficeModuleService = container.resolve(BACKOFFICE_MODULE);

    const ads = await adsModuleService.createAds({
      name,
      text,
      href,
      type,
      status,
    });

    return new StepResponse(ads, ads);
  },
  async (ads, { container }) => {
    const adsModuleService: BofficeModuleService = container.resolve(BACKOFFICE_MODULE);

    await adsModuleService.deleteAds(ads.id);
  }
);
const updateAdStep = createStep(
  "update-ads",
  async (
    { id, name, text, href, type, status }: AdWorkflowInput,
    { container }
  ) => {
    const adsModuleService: BofficeModuleService = container.resolve(BACKOFFICE_MODULE);

    const ads = await adsModuleService.updateAds({
      id,
      name,
      text,
      href,
      type,
      status,
    });

    return new StepResponse(ads, ads);
  },
  async (ads, { container }) => {
    const adsModuleService: BofficeModuleService = container.resolve(BACKOFFICE_MODULE);

    await adsModuleService.deleteAds(ads.id);
  }
);

export const createAdWorkflow = createWorkflow(
  "create-ads",
  (adsInput: AdWorkflowInput) => {
    const ads = createAdStep(adsInput);

    return new WorkflowResponse(ads);
  }
);

export const updateAdWorkflow = createWorkflow(
  "update-ads",
  (adsInput: AdWorkflowInput) => {
    const ads = updateAdStep(adsInput);

    return new WorkflowResponse(ads);
  }
);
