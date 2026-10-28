import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import Image from "next/image";
import { Box, ButtonBase, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUploadServiceDomainPhoto } from "@/controllers/nomenclature/service-domain.controller";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 25 * 1024 * 1024;
const MAX_UPLOAD_SIZE = 4 * 1024 * 1024;
const MAX_UPLOAD_DIMENSION = 2048;

async function shrinkForUpload(file: File): Promise<File> {
  if (file.size <= MAX_UPLOAD_SIZE) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(
    1,
    MAX_UPLOAD_DIMENSION / Math.max(bitmap.width, bitmap.height),
  );
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.9),
  );
  if (!blob) throw new Error("Image conversion failed");

  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", {
    type: "image/jpeg",
  });
}

type ServiceDomainUploadImageModalProps = {
  open: boolean;
  serviceDomain: ServiceDomain | null;
  onClose: () => void;
};

const ServiceDomainUploadImageModal = ({
  open,
  serviceDomain,
  onClose,
}: ServiceDomainUploadImageModalProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadPhoto, isPending } = useUploadServiceDomainPhoto();

  useEffect(() => {
    if (open) {
      setPreviewUrl(serviceDomain?.url ?? null);
      setSelectedFile(null);
    }
  }, [open, serviceDomain]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Format neacceptat. Folosește JPG, PNG, WebP sau AVIF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Imaginea depășește 25 MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onUpload = async () => {
    if (!selectedFile || !serviceDomain) return;

    let photo: File;
    try {
      photo = await shrinkForUpload(selectedFile);
    } catch {
      toast.error("Imaginea nu a putut fi procesată. Încearcă alt fișier.");
      return;
    }

    uploadPhoto(
      { id: serviceDomain.id, photo },
      {
        onSuccess: () => {
          toast.success("Imaginea a fost salvată cu succes!");
          onClose();
        },
      },
    );
  };

  const actions: ActionButtonType[] = [
    {
      title: "Salvează",
      props: {
        onClick: onUpload,
        loading: isPending,
        disabled: !selectedFile || isPending,
      },
    },
  ];

  return (
    <Modal
      open={open}
      title={serviceDomain ? `Imagine — ${serviceDomain.name}` : ""}
      handleClose={() => {
        if (!isPending) onClose();
      }}
      actions={actions}
      maxWidth="md"
      fullWidth
    >
      <Box>
        <ButtonBase
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          sx={{
            ...styles.buttonContainer,
            borderColor: previewUrl ? "transparent" : "divider",
          }}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              style={{ objectFit: "cover" }}
              alt={`Imagine ${serviceDomain?.name ?? "domeniu de servicii"}`}
              unoptimized
            />
          ) : (
            <Box sx={{ color: "text.secondary", textAlign: "center", p: 3 }}>
              <Typography variant="body1" fontWeight={500}>
                Apasă pentru a încărca o imagine
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                Format recomandat: Landscape (orizontal)
              </Typography>
            </Box>
          )}
        </ButtonBase>
        <Typography
          variant="caption"
          display="block"
          sx={{ color: "text.secondary", mt: 1.5 }}
        >
          {previewUrl ? "Apasă pe imagine pentru a alege alta. " : ""}
          JPG, PNG, WebP sau AVIF, maxim 25 MB. Imaginea va fi decupată la 16:9.
        </Typography>
        <input
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </Box>
    </Modal>
  );
};

export default ServiceDomainUploadImageModal;

const styles = {
  buttonContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: "20px",
    overflow: "hidden",
    backgroundColor: "action.hover",
    border: "2px dashed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "primary.main",
      backgroundColor: "action.selected",
    },
  },
};
