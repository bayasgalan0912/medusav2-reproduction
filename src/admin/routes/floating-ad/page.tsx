import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChatBubbleLeftRight, Pencil } from "@medusajs/icons";
import { Container } from "../../components/container";
import { Header } from "../../components/header";
import { TwoColumnLayout } from "../../layouts/two-column";
import { AdEditForm } from "../../components/ad-edit-form";
import { SectionRow } from "../../components/section-row";
import { sdk } from "../../lib/config";
import { useEffect, useState } from "react";
import { Ads } from "../../../types";


const FloatingAd = () => {
  const [data, setData] = useState<Ads | undefined>()
  useEffect(() => {
    sdk.client.fetch(`/admin/ads`).then((data: any) => {
      const ad = data.floatingAd as Ads;

      setData(ad)

    });
  }, []);


  return (
    <TwoColumnLayout
      firstCol={
        <Container>
          <Header
            title="Урсдаг зар"
            subtitle="Бүх хуудасны дээр, үндсэн цэсний доор байрлаж харагдана."
            actions={[
              {
                type: "custom",
                children: <AdEditForm data={data} setData={setData} />,
              },
            ]}
          />
          <SectionRow title="Текст" value={data?.text || ''} />
          {/* <SectionRow title="Текстийн өнгө" value={data?.text || ''} /> */}
          <SectionRow title="Холбоос линк" value={data?.href || ''} />
          <SectionRow title="Статус" value={data?.status ? 'Идэвхитэй' : "Идэвхигүй"} />
          <SectionRow title="Үүссэн огноо" value={data?.created_at.toString() || ''} />
          <SectionRow title="Шинэчилсэн огноо" value={data?.updated_at.toString() || ''} />
        </Container>
      }
    // secondCol={
    //   <Container>
    //     <Header
    //       title="Харагдах байдал"
    //       subtitle="This is my custom product widget"
    //       actions={[
    //         {
    //           type: "action-menu",
    //           props: {
    //             groups: [
    //               {
    //                 actions: [
    //                   {
    //                     icon: <Pencil />,
    //                     label: "Edit",
    //                     onClick: () => {
    //                       alert("You clicked the edit action!");
    //                     },
    //                   },
    //                 ],
    //               },
    //             ],
    //           },
    //         },
    //       ]}
    //     />
    //     <SectionRow title="Name" value="John" />
    //   </Container>
    // }
    />
  );
};

export const config = defineRouteConfig({
  label: "Урсдаг зар",
  icon: ChatBubbleLeftRight,
});

export default FloatingAd;
