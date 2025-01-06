import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChatBubbleLeftRight } from "@medusajs/icons";
import { useEffect, useState } from "react";
import { Contact } from "../../../types";
import { ContactForm } from "../../components/contact-form";
import { Container } from "../../components/container";
import { Header } from "../../components/header";
import { SectionRow } from "../../components/section-row";
import { TwoColumnLayout } from "../../layouts/two-column";
import { sdk } from "../../lib/config";


const FloatingAd = () => {
  const [data, setData] = useState<Contact | undefined>()
  useEffect(() => {
    sdk.client.fetch(`/admin/contact`).then((data: any) => {
      const contact = data.contact as Contact;

      setData(contact)

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
                children: <ContactForm data={data} setData={setData} />,
              },
            ]}
          />
          <SectionRow title="Дэлгүүрийн нэр" value={data?.name || ''} />
          <SectionRow title="Тайлбар" value={data?.description || ''} />
          {/* TODO: Image viewer */}
          <SectionRow title="Лого" value={data?.logo} />
          <SectionRow title="Цахим шуудан" value={data?.email || ''} />
          <SectionRow title="Утас" value={data?.phone || ''} />
          <SectionRow title="Хаяг" value={data?.address || ''} />
          <SectionRow title="Facebook" value={data?.facebook || ''} />
          <SectionRow title="Instagram" value={data?.ig || ''} />
          <SectionRow title="X (twitter)" value={data?.x || ''} />
          <SectionRow title="Youtube" value={data?.youtube || ''} />
          <SectionRow title="Шинэчлэгдсэн" value={data?.updated_at.toString() || ''} />
        </Container>
      }

    />
  );
};

export const config = defineRouteConfig({
  label: "Холбоо барих",
  icon: ChatBubbleLeftRight,
});

export default FloatingAd;
