import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChatBubbleLeftRight } from "@medusajs/icons";
import { StatusBadge } from "@medusajs/ui";
import { useMemo, useState } from "react";
import { Container } from "../../components/container";
import { CreateForm } from "../../components/create-form";
import { Header } from "../../components/header";
import { Table } from "../../components/table";
import { SingleColumnLayout } from "../../layouts/single-column";

const CustomPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const limit = 15;
  // const offset = useMemo(() => {
  //   return currentPage * limit;
  // }, [currentPage]);

  // const { data } = useQuery({
  //   queryFn: () =>
  //     sdk.admin.product.list({
  //       limit,
  //       offset,
  //     }),
  //   queryKey: [["products", limit, offset]],
  // });

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "is_enabled",
      label: "Status",
      render: (value: unknown) => {
        const isEnabled = value as boolean;

        return (
          <StatusBadge color={isEnabled ? "green" : "grey"}>
            {isEnabled ? "Enabled" : "Disabled"}
          </StatusBadge>
        );
      },
    },
  ];
  const data = [
    {
      name: "John",
      is_enabled: true,
    },
    {
      name: "Jane",
      is_enabled: false,
    },
  ];
  return (
    <SingleColumnLayout>
      <Container>
        <Header
          title="Single column"
          actions={[
            {
              type: "custom",
              children: <CreateForm />,
            },
          ]}
        />

        <Table
          columns={columns}
          data={data}
          pageSize={2}
          count={2}
          // data={data.products as any}
          // pageSize={data.limit}
          // count={data.count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </SingleColumnLayout>
  );
};

export const config = defineRouteConfig({
  label: "Single column",
  icon: ChatBubbleLeftRight,
});

export default CustomPage;
