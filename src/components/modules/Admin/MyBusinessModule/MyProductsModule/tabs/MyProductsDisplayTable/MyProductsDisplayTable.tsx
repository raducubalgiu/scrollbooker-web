import { Product, UserProducts } from "@/ts/models/booking/product/Product";
import { Delete, Edit } from "@mui/icons-material";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import React, { memo, useCallback, useMemo } from "react";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import Protected from "@/components/cutomized/Protected/Protected";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Product>;
  table: MRT_TableInstance<Product>;
  closeMenu: () => void;
};

type MyProductsDisplayTableProps = {
  userProducts: UserProducts | undefined;
  isLoading: boolean;
  onDelete: (productId: number) => void;
};

const MyProductsDisplayTable = ({
  userProducts,
  isLoading,
  onDelete,
}: MyProductsDisplayTableProps) => {
  // const canEditOrDelete = Boolean(
  //   session?.permissions?.includes(PermissionEnum.PRODUCT_EDIT)
  // );

  const products: Product[] = useMemo(
    () => userProducts?.data.flatMap((item) => item.products) ?? [],
    [userProducts]
  );

  const columns = React.useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Serviciu",
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
        Cell: ({ row }) => (
          <span>
            {row.original.description
              ? row.original.description.length > 50
                ? row.original.description.substring(0, 50) + "..."
                : row.original.description
              : "-"}
          </span>
        ),
      },
    ],
    []
  );

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: RenderRowActionMenuItemsProps) => [
      <Protected key="edit" permission={PermissionEnum.PRODUCT_EDIT}>
        <MRT_ActionMenuItem
          label="Editează"
          icon={<Edit />}
          onClick={() => {
            console.log("ROW ID", row.original.id);
            closeMenu();
          }}
          table={table}
        />
      </Protected>,
      <Protected key="delete" permission={PermissionEnum.PRODUCT_DELETE}>
        <MRT_ActionMenuItem
          label="Șterge"
          icon={<Delete />}
          onClick={() => {
            closeMenu();
            onDelete(row.original.id);
          }}
          table={table}
        />
        ,
      </Protected>,
    ],
    [onDelete]
  );

  const table = useMaterialReactTable({
    columns,
    data: products,

    enablePagination: true,
    manualPagination: false,
    enableTopToolbar: true,

    enableFilters: true,
    enableGlobalFilter: true,
    enableColumnFilters: false,

    enableDensityToggle: false,
    enableHiding: false,
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableSorting: false,
    enableRowActions: true,
    renderRowActionMenuItems,
    positionActionsColumn: "last",
    localization: MRT_Localization_RO,
    state: {
      isLoading,
    },

    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      },
    },
    // renderDetailPanel: ({ row }) => {
    //   return (
    //     <MyProductVariants
    //       product={row.original}
    //       authUserId={authUserId ?? null}
    //     />
    //   );
    // },
  });

  return <MaterialReactTable table={table} />;
};

export default memo(MyProductsDisplayTable);
