import Modal from "@/components/core/Modal/Modal";
import { useCustomQuery } from "@/hooks/useHttp";
import {
  BusinessServicesWithProducts,
  Product,
} from "@/ts/models/booking/product/Product";
import { Box, CircularProgress, Theme } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import ProductsSelectionOverview from "./ProductsSelectionOverview";
import ProductsSelectionTabs from "./ProductsSelectionTabs";
import ProductsSelectionList from "./ProductsSelectionList";

type ProductsSelectionModalProps = {
  selectedProducts: Product[];
  onAddProducts: (products: Product[]) => void;
  open: boolean;
  onClose: () => void;
};

const ProductsSelectionModal = ({
  selectedProducts,
  onAddProducts,
  open,
  onClose,
}: ProductsSelectionModalProps) => {
  const { data: session } = useSession();
  const [currentTab, setCurrentTab] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const businessId = session?.business_id;
  const businessOwnerId = session?.business_owner_id;
  const userId = session?.user_id;
  const isEmployee = businessOwnerId !== userId;

  const [localSelectedProducts, setLocalSelectedProducts] =
    useState<Product[]>(selectedProducts);

  useEffect(() => {
    setLocalSelectedProducts(selectedProducts);
  }, [selectedProducts]);

  const { data: services = [], isLoading } = useCustomQuery<
    BusinessServicesWithProducts[]
  >({
    key: ["business-products", businessId ?? undefined, userId ?? undefined],
    url: `/api/businesses/${session?.business_id}/products${isEmployee ? `?employeeId=${userId}` : ""}`,
    options: {
      enabled: !!businessId && !!businessOwnerId && !!userId,
    },
  });

  const [indicatorStyle, setIndicatorStyle] = useState({ x: 0, width: 0 });
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (!open) {
      setIsInitialMount(true);
    }
  }, [open]);

  useEffect(() => {
    let frameId: number;

    if (open && services.length > 0) {
      const update = () => {
        const activeTab = tabItemRefs.current[currentTab];
        if (activeTab) {
          setIndicatorStyle({
            x: activeTab.offsetLeft,
            width: activeTab.offsetWidth,
          });

          setTimeout(() => setIsInitialMount(false), 50);
        }
      };

      frameId = requestAnimationFrame(update);
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [currentTab, services, open]);

  const handleToggleProduct = (prod: Product, isSelected: boolean) => {
    if (isSelected) {
      setLocalSelectedProducts((products) =>
        products.filter((p) => p.id !== prod.id)
      );
    } else {
      setLocalSelectedProducts((products) => {
        if (products.length >= 5) return products;
        return [...products, prod];
      });
    }
  };

  return (
    <Modal
      title="Atașează Servicii"
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <Box sx={styles.container}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={styles.productsContainer}>
              <ProductsSelectionOverview
                localSelectedProductsCount={localSelectedProducts.length}
                onReset={() => setLocalSelectedProducts([])}
                onConfirm={() => {
                  onAddProducts(localSelectedProducts);
                  onClose();
                }}
              />

              <ProductsSelectionTabs
                services={services}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                tabsContainerRef={tabsContainerRef}
                tabItemRefs={tabItemRefs}
                indicatorStyle={indicatorStyle}
                isInitialMount={isInitialMount}
              />
            </Box>

            <ProductsSelectionList
              activeGroup={services[currentTab]}
              localSelectedProducts={localSelectedProducts}
              onToggleProduct={handleToggleProduct}
            />
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ProductsSelectionModal;

const styles = {
  container: {
    height: "80vh",
    overflowY: "auto",
    position: "relative",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: (theme: Theme) => theme.palette.divider,
      borderRadius: "10px",
      border: "2px solid transparent",
      backgroundClip: "padding-box",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: (theme: Theme) => theme.palette.text.disabled,
      border: "1px solid transparent",
      backgroundClip: "padding-box",
    },

    scrollbarWidth: "thin",
    scrollbarColor: (theme: Theme) => `${theme.palette.divider} transparent`,
  },
  productsContainer: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    bgcolor: "background.paper",
    p: 2,
  },
};
