import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import Image from "next/image";
import { Box, ButtonBase, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type ServiceDomainUploadImageModalProps = {
  open: boolean;
  serviceDomainId: number;
  url: string | null | undefined;
  onClose: () => void;
};

const ServiceDomainUploadImageModal = ({
  open,
  serviceDomainId,
  url,
  onClose,
}: ServiceDomainUploadImageModalProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(url);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log("ERROR!!!", error);

  useEffect(() => {
    setPreviewUrl(url);
  }, [url]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      const res = await fetch(
        `/api/nomenclatures/service-domains/${serviceDomainId}/upload-image`,
        {
          method: "PATCH",
          body: formData,
        }
      );

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

  const actions: ActionButtonType[] = [
    {
      title: "Salveaza",
      props: {
        onClick: onUpload,
        loading,
        disabled: loading,
      },
    },
  ];

  return (
    <Modal
      open={open}
      handleClose={() => {
        setPreviewUrl("");
        setSelectedFile(null);
        onClose();
      }}
      actions={actions}
      maxWidth="md"
      fullWidth
    >
      <Box>
        <ButtonBase
          onClick={() => fileInputRef.current?.click()}
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
              alt="Preview domeniu de servicii"
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
        <input
          type="file"
          accept="image/*"
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
