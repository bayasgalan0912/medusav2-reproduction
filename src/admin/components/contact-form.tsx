import { Drawer, Heading, Label, Input, Button, Switch } from "@medusajs/ui";
import { useForm, FormProvider, Controller } from "react-hook-form";
import * as zod from "zod";
import { Contact } from "../../types";
import { sdk } from "../lib/config";
import { useState } from "react";

const schema = zod.object({
  name: zod.string(),
  description: zod.string(),
  logo: zod.string(),
  email: zod.string(),
  phone: zod.string(),
  address: zod.string(),
  facebook: zod.string(),
  ig: zod.string(),
  x: zod.string(),
  youtube: zod.string(),
  others: zod.string(),
});

// name
// text
// href
// type
// status
export const ContactForm = ({ data, setData }: { data: Contact | undefined, setData: any }) => {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      logo: data?.logo || "",
      email: data?.email || "",
      phone: data?.phone || "",
      address: data?.address || "",
      facebook: data?.facebook || "",
      ig: data?.ig || "",
      x: data?.x || "",
      youtube: data?.youtube || "",
      others: data?.others || "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {

    if (data?.id) values.id = data.id

    sdk.client.fetch(`/admin/contact`, {
      method: data?.id ? "put" : "post",
      body: values,
    }).then((data: any) => {
      console.log(data)
      setData(data.contact)
      setIsOpen(false)
    })
  });
  const toggle = () => {
    setIsOpen(prev => !prev)
  }
  const fields = [
    { name: 'name', label: 'Дэлгүүрийн нэр' },
    { name: 'description', label: 'Тайлбар' },
    { name: 'logo', label: 'Лого' },
    { name: 'email', label: 'Цахим шуудан' },
    { name: 'phone', label: 'Утас' },
    { name: 'address', label: 'Хаяг' },
    { name: 'facebook', label: 'Facebook' },
    { name: 'ig', label: 'Instagram' },
    { name: 'x', label: 'X (twitter)' },
    { name: 'youtube', label: 'Youtube' },
    { name: 'others', label: 'Шинэчлэгдсэн' },
  ]
  return (
    <Drawer open={isOpen}>
      <Drawer.Trigger asChild>
        <Button onClick={toggle}>{data?.id ? 'Засах' : 'Үүсгэх'}</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <Drawer.Header>
              <Heading className="capitalize">{data?.id ? 'Засах' : 'Үүсгэх'}</Heading>
            </Drawer.Header>
            <Drawer.Body className="flex max-w-full flex-1 flex-col gap-y-8 overflow-y-auto">

              {fields.map(el => {
                return <Controller
                  control={form.control}
                  name={el.name}
                  render={({ field }) =>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-x-1">
                        <Label size="small" weight="plus">
                          {el.label}
                        </Label>
                      </div>
                      <Input {...field} />
                    </div>
                  }
                />
              })}



            </Drawer.Body>
            <Drawer.Footer>
              <div className="flex items-center justify-end gap-x-2">
                <Drawer.Close asChild>
                  <Button size="small" variant="secondary">
                    Cancel
                  </Button>
                </Drawer.Close>
                <Button size="small" type="submit">
                  Save
                </Button>
              </div>
            </Drawer.Footer>
          </form>
        </FormProvider>
      </Drawer.Content>
    </Drawer>
  );
};
