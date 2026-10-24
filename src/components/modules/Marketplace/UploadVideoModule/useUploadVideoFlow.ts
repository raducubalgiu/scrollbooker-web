import * as tus from "tus-js-client";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { PostCreate } from "@/ts/models/social/PostCreate";
import { Product } from "@/ts/models/booking/product/Product";

export const useUploadVideoFlow = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [openProducts, setOpenProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleOpenProducts = useCallback(() => {
    setOpenProducts(true);
  }, []);

  const handleCloseProducts = useCallback(() => {
    setOpenProducts(false);
  }, []);

  const handleVideoChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedVideo(file);
        setVideoPreview(URL.createObjectURL(file));
      }
    },
    []
  );

  const handleContainerClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDescription = useCallback((d: string) => {
    setDescription(d);
  }, []);

  const handleUpload = async () => {
    if (!selectedVideo || isUploading) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const initResponse = await fetch("/api/social/post/upload-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploadLength: selectedVideo.size,
          metadata: {
            name: selectedVideo.name,
            filename: selectedVideo.name,
            filetype: selectedVideo.type || "application/octet-stream",
          },
        }),
      });

      if (!initResponse.ok) {
        const errorPayload = await initResponse.json().catch(() => null);
        throw new Error(
          errorPayload?.error ||
            "Nu s-a putut genera URL-ul de upload de la backend."
        );
      }

      const initData: { uploadUrl: string; uid: string } =
        await initResponse.json();

      if (!initData.uploadUrl || !initData.uid) {
        throw new Error(
          "Cloudflare Stream didn't returned the uploadUrl / uid"
        );
      }

      const upload = new tus.Upload(selectedVideo, {
        uploadUrl: initData.uploadUrl,
        metadata: {
          filename: selectedVideo.name,
          filetype: selectedVideo.type || "application/octet-stream",
        },

        uploadSize: selectedVideo.size,
        retryDelays: [0, 1000, 3000, 5000],
        removeFingerprintOnSuccess: true,

        onError: (error) => {
          console.error("Upload Error:", error);
          alert(`Eroare la încărcare: ${error.message}`);
          setIsUploading(false);
        },

        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setUploadProgress(Number(percentage));
        },

        onSuccess: async () => {
          const linked_product_ids = selectedProducts.map((prod) => prod.id);

          try {
            const postData: PostCreate = {
              description,
              provider: "cloudflare_stream",
              provider_uid: initData.uid,
              order_index: 0,
              linked_product_ids,
              video_review_message: null,
              is_video_review: false,
              rating: null,
              business_or_employee_id: null,
            };

            const saveResponse = await fetch("/api/protected/posts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            });

            if (!saveResponse.ok) {
              const errorPayload = await saveResponse.json().catch(() => null);
              throw new Error(
                errorPayload?.detail ||
                  errorPayload?.error ||
                  "Eroare la salvarea postării în baza de date."
              );
            }

            setSelectedVideo(null);
            setVideoPreview(null);
            setDescription("");
            setSelectedProducts([]);
            setUploadProgress(0);
            setIsUploading(false);

            alert("Video-ul a fost încărcat cu succes.");
          } catch (error) {
            console.error("DB Save Error:", error);
            alert(
              error instanceof Error
                ? error.message
                : "A apărut o eroare la salvarea postării."
            );
            setIsUploading(false);
          }
        },
      });

      upload.start();
    } catch (error) {
      console.error("Setup Error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "A apărut o eroare la inițierea upload-ului."
      );
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSelectProducts = useCallback((products: Product[]) => {
    setSelectedProducts(products);
  }, []);

  const handleRemoveProduct = useCallback((product: Product) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id)
    );
  }, []);

  return {
    selectedVideo,
    videoPreview,
    description,
    isUploading,
    uploadProgress,
    fileInputRef,
    openProducts,
    selectedProducts,
    handleOpenProducts,
    handleCloseProducts,
    handleVideoChange,
    handleContainerClick,
    handleDescription,
    handleUpload,
    handleSelectProducts,
    handleRemoveProduct,
  };
};
