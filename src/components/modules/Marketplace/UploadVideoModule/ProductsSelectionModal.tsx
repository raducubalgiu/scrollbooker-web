import Modal from "@/components/core/Modal/Modal";
import { useCustomQuery } from "@/hooks/useHttp";
import {
  BusinessProductsResponse,
  Product,
  ProductUtils,
} from "@/ts/models/booking/product/Product";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";

type ProductsSelectionModalProps = {
  selectedProducts: Product[];
  onSelectProduct: (product: Product) => void;
  open: boolean;
  onClose: () => void;
};

const ProductsSelectionModal = ({
  selectedProducts,
  onSelectProduct,
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

  const { data: services = [], isLoading } = useCustomQuery<
    BusinessProductsResponse[]
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

  return (
    <Modal
      title="Atașează Servicii"
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <Box
        sx={{
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
            background: (theme) => theme.palette.divider,
            borderRadius: "10px",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: (theme) => theme.palette.text.disabled,
            border: "1px solid transparent",
            backgroundClip: "padding-box",
          },

          scrollbarWidth: "thin",
          scrollbarColor: (theme) => `${theme.palette.divider} transparent`,
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                bgcolor: "background.paper",
                p: 2,
              }}
            >
              {/* SECȚIUNE REZUMAT SELECȚIE */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  pb: 2.5,
                  px: 1,
                }}
              >
                <Box>
                  <Typography fontWeight={700} variant="h5">
                    Ai selectat {localSelectedProducts.length}{" "}
                    {localSelectedProducts.length === 1
                      ? "serviciu"
                      : "servicii"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Maxim 5 servicii pot fi atașate video-ului
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  disabled={localSelectedProducts.length === 0}
                  disableElevation
                  // onClick={() => {
                  //   onAddServices(localSelectedProducts); // Funcția care trimite datele către Sidebar
                  //   onClose();
                  // }}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 3,
                    fontWeight: 600,
                  }}
                >
                  Adaugă servicii
                </Button>
              </Stack>

              {/* TABS (Sub rezumat) */}
              <Box
                ref={tabsContainerRef}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                  position: "relative",
                  gap: 1,
                  py: 1,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    height: 40,
                    width: indicatorStyle.width,
                    bgcolor: "primary.main",
                    borderRadius: 999,
                    transform: `translateX(${indicatorStyle.x}px) translateY(-50%)`,
                    zIndex: 0,
                    transition: isInitialMount
                      ? "none"
                      : "transform 250ms cubic-bezier(0.4, 0, 0.2, 1), width 250ms",
                    opacity: indicatorStyle.width > 0 ? 1 : 0,
                  }}
                />

                {services.map((group, index) => (
                  <Box
                    key={group.service.id}
                    component="button"
                    ref={(node: HTMLButtonElement) => {
                      tabItemRefs.current[index] = node;
                    }}
                    onClick={() => setCurrentTab(index)}
                    sx={(theme) => ({
                      position: "relative",
                      zIndex: 1,
                      appearance: "none",
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      px: 3,
                      py: 1.2,
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      fontSize: 16,
                      fontWeight: 600,
                      color:
                        currentTab === index
                          ? "#fff"
                          : theme.palette.text.secondary,
                      transition: "color 180ms ease",
                    })}
                  >
                    {group.service.short_name}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ minHeight: 400, px: 2 }}>
              {services[currentTab] && (
                <Stack spacing={2}>
                  {services[currentTab].products.map((prod) => {
                    const isSelected = find(localSelectedProducts, {
                      id: prod.id,
                    });
                    const filtersText = ProductUtils.getFiltersSummary(prod);
                    const displayedPrice = ProductUtils.getPrice(prod);
                    const displayed_price_with_discount =
                      ProductUtils.getPriceWithDiscount(prod);
                    const displayedDiscount = ProductUtils.getDiscount(prod);

                    return (
                      <Box
                        key={prod.id}
                        sx={(theme) => {
                          const isDark = theme.palette.mode === "dark";
                          const baseBg = isDark
                            ? "background.default"
                            : "background.paper";
                          const selectedBg = "background.default";

                          return {
                            bgcolor: isSelected ? selectedBg : baseBg,
                            p: 2.5,
                            borderRadius: 2.5,
                            border: 1.5,
                            borderColor: "divider",
                          };
                        }}
                      >
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between"
                          gap={2}
                        >
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography
                              fontSize={20}
                              fontWeight={600}
                              noWrap
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {prod.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              {filtersText}
                            </Typography>

                            <Stack
                              flexDirection="row"
                              alignItems="center"
                              gap={1}
                              mt={1.5}
                            >
                              <Typography fontSize={18} fontWeight={600}>
                                {prod.has_different_prices && "de la"}{" "}
                                {displayed_price_with_discount} RON
                              </Typography>
                              {displayedDiscount > 0 && (
                                <>
                                  <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ textDecoration: "line-through" }}
                                  >
                                    {displayedPrice}
                                  </Typography>
                                  <Typography
                                    fontWeight={600}
                                    color="error.main"
                                  >
                                    (-{displayedDiscount}%)
                                  </Typography>
                                </>
                              )}
                            </Stack>
                          </Box>

                          <IconButton
                            size="large"
                            disabled={
                              !isSelected && localSelectedProducts.length >= 5
                            }
                            onClick={() => {
                              if (isSelected) {
                                setLocalSelectedProducts((products) =>
                                  products.filter((p) => p.id !== prod.id)
                                );
                              } else {
                                setLocalSelectedProducts((products) => {
                                  if (products.length >= 5) {
                                    return products;
                                  }
                                  return [...products, prod];
                                });
                              }
                            }}
                          >
                            {isSelected ? (
                              <Tooltip title="Elimină">
                                <CheckCircleRoundedIcon
                                  fontSize="large"
                                  color="primary"
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Adaugă">
                                <AddRoundedIcon fontSize="large" />
                              </Tooltip>
                            )}
                          </IconButton>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ProductsSelectionModal;
