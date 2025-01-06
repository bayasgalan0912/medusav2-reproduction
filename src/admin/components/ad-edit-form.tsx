import { Drawer, Heading, Label, Input, Button, Switch } from "@medusajs/ui";
import { useForm, FormProvider, Controller } from "react-hook-form";
import * as zod from "zod";
import { Ads } from "../../types";
import { sdk } from "../lib/config";
import { useState } from "react";

const schema = zod.object({
  text: zod.string(),
  href: zod.string(),
  status: zod.boolean(),
});

// name
// text
// href
// type
// status
export const AdEditForm = ({ data, setData }: { data: Ads | undefined, setData: any }) => {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      text: data?.text || "",
      href: data?.href || "",
      status: data?.status || false,
    },
  });

  const handleSubmit = form.handleSubmit(({ text, status, href }) => {
    let values = { text, status, href }
    if (data?.id) values.id = data.id

    sdk.client.fetch(`/admin/ads`, {
      method: data?.id ? "put" : "post",
      body: values,
    }).then((data: any) => {
      console.log(data)
      setData(data.ad)
      setIsOpen(false)
    })
  });
  const toggle = () => {
    setIsOpen(prev => !prev)
  }
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

              <Controller
                control={form.control}
                name={'status'}
                render={({ field }) => {
                  return (
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-x-1">
                        <Label size="small" weight="plus">
                          Статус
                        </Label>
                      </div>
                      {/* <Switch   id="status"  /> */}
                      <Switch {...field} checked={field.value} onCheckedChange={val => field.onChange(val)} />
                    </div>
                  );
                }}
              />
              <Controller
                control={form.control}
                name={'text'}
                render={({ field }) => {
                  return (
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-x-1">
                        <Label size="small" weight="plus">
                          Текст
                        </Label>
                      </div>
                      <Input {...field} />
                    </div>
                  );
                }}
              />
              <Controller
                control={form.control}
                name={'href'}
                render={({ field }) => {
                  return (
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-x-1">
                        <Label size="small" weight="plus">
                          Линк
                        </Label>
                      </div>
                      <Input {...field} />
                    </div>
                  );
                }}
              />

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
