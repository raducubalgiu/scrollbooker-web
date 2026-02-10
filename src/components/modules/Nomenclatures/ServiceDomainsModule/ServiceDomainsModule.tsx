"use client";

import Table from "@/components/core/Table/Table";
import { ServiceDomainsResponse } from "../../../../ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useRef, useState } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import ServicesByServiceDomainModule from "./ServicesByServiceDomainModule";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";
import Modal from "@/components/core/Modal/Modal";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import ServiceDomainBusinessTypes from "./ServiceDomainBusinessTypes";

type ServiceDomainsModuleProps = { businessDomains: BusinessDomainType[] };

export default function ServiceDomainsModule({
  businessDomains,
}: ServiceDomainsModuleProps) {
  const [open, setOpen] = useState(false);

  const {
    data,
    isLoading,
    onCreatingRowSave,
    pagination,
    setPagination,
    onEditingRowSave,
    onDeletingRowSave,
  } = useTableHandlers<ServiceDomainsResponse>({
    route: "nomenclatures/service-domains",
  });

  const serviceDomainsColumns = useMemo<
    MRT_ColumnDef<ServiceDomainsResponse>[]
  >(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        Edit: ({ row, column }) => (
          <MR_Input
            row={row}
            column={column}
            value={row.original.name}
            required
            minLength={3}
            maxLength={100}
          />
        ),
      },
    ],
    [businessDomains]
  );

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file); // ✅ asta trimiți la upload

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string); // ✅ doar pentru preview
    reader.readAsDataURL(file);
  };

  const onUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile); // ✅ File, nu string

      const res = await fetch(`/api/nomenclatures/service-domains/30`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Upload failed (${res.status})`);
      }
    } catch (e: any) {
      setError(e?.message ?? "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const modalActions: ActionButtonType[] = [
    {
      title: "Salveaza",
      props: {
        onClick: onUpload,
      },
    },
  ];

  return (
    <MainLayout title="Service Domains" onOpenModal={() => setOpen(true)}>
      <Modal
        open={open}
        handleClose={() => {
          setOpen(false);
          setPreviewUrl("");
          setSelectedFile(null);
        }}
        actions={modalActions}
      >
        <IconButton onClick={() => fileInputRef.current?.click()}>
          <Image
            src={previewUrl}
            width={700}
            height={400}
            style={{ borderRadius: 20 }}
            alt="Picture of the author"
          />
        </IconButton>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </Modal>

      <Table<ServiceDomainsResponse>
        data={data?.results}
        rowCount={data?.count}
        columns={serviceDomainsColumns}
        manualPagination
        onCreatingRowSave={onCreatingRowSave}
        onEditingRowSave={onEditingRowSave}
        onDeletingRowSave={onDeletingRowSave}
        state={{ pagination, isLoading }}
        onPaginationChange={setPagination}
        renderDetailPanel={({ row }) => (
          <>
            <ServicesByServiceDomainModule row={row} />
            <ServiceDomainBusinessTypes row={row} />
          </>
        )}
      />
    </MainLayout>
  );
}
