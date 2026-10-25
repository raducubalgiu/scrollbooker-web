import axios from "axios";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PostCreate } from "@/ts/models/social/PostCreate";
import { Product } from "@/ts/models/booking/product/Product";
import { GenderTypeEnum } from "@/ts/enums/GenderTypeEnum";
import { AppRoutes } from "@/utils/routes";

type CloudflareDirectUploadResponse = {
  provider_uid: string;
  upload_url: string;
  watermark: string | null;
  scheduled_deletion: string | null;
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail ?? error.response?.data?.error ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
};

export const useUploadVideoFlow = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [openProducts, setOpenProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [serviceDomainId, setServiceDomainId] = useState<number | null>(null);
  const [targetGender, setTargetGender] = useState<GenderTypeEnum>(
    GenderTypeEnum.OTHER
  );

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

    try {
      const { data: uploadData } =
        await axios.post<CloudflareDirectUploadResponse>(
          "/api/protected/cloudflare/upload",
          { meta: { name: selectedVideo.name } }
        );

      const formData = new FormData();
      formData.append("file", selectedVideo);

      await axios.post(uploadData.upload_url, formData);

      const linked_product_ids = selectedProducts.map((prod) => prod.id);

      const postData: PostCreate = {
        description,
        provider: "cloudflare_stream",
        provider_uid: uploadData.provider_uid,
        order_index: 0,
        linked_product_ids,
        service_domain_id: serviceDomainId,
        target_gender: targetGender,
      };

      await axios.post("/api/protected/posts", postData);

      if (session?.username && session?.profession) {
        router.push(AppRoutes.profile(session.username, session.profession));
      } else {
        router.push(AppRoutes.feed());
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert(
        getErrorMessage(error, "A apărut o eroare la încărcarea video-ului.")
      );
      setIsUploading(false);
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
    fileInputRef,
    openProducts,
    selectedProducts,
    serviceDomainId,
    setServiceDomainId,
    targetGender,
    setTargetGender,
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
