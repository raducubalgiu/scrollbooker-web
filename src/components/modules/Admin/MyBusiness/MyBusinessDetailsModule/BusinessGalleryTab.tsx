import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";

type GalleryItem = {
  id: string; // local id
  src: string | null; // preview URL (objectURL or remote URL)
  file?: File; // if newly added/replaced
  remote?: boolean; // whether src is a remote existing image
};

type Props = {
  businessId: number;
  initialImages?: string[]; // optional existing image URLs
};

const MAX_IMAGES = 5;

const BusinessGalleryTab: React.FC<Props> = ({
  businessId,
  initialImages = [],
}) => {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    const initial: GalleryItem[] = initialImages
      .slice(0, MAX_IMAGES)
      .map((url, idx) => ({
        id: `remote-${idx}-${Date.now()}`,
        src: url,
        remote: true,
      }));
    // fill remaining slots with empty placeholders
    while (initial.length < MAX_IMAGES)
      initial.push({ id: `empty-${initial.length}-${Date.now()}`, src: null });
    return initial;
  });

  // keep refs to inputs for each slot
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(MAX_IMAGES).fill(null)
  );

  useEffect(() => {
    return () => {
      // cleanup object URLs
      items.forEach((it) => {
        if (it?.file && it.src && it.src.startsWith("blob:")) {
          URL.revokeObjectURL(it.src);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isPending } = useMutate<FormData, unknown>({
    key: ["business-gallery", businessId],
    url: "/api/my-business/gallery",
    method: "POST",
    options: {
      onSuccess: () => {
        toast.success("Galeria a fost actualizata cu succes.");
      },
    },
  });

  const handlePick = (index: number) => {
    inputRefs.current[index]?.click();
  };

  const onFileSelected = (index: number, file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Te rog selecteaza un fisier de tip imagine.");
      return;
    }

    setItems((prev) => {
      const copy = [...prev];
      // revoke previous objectURL if it was a blob
      const prevItem = copy[index];
      if (prevItem?.file && prevItem.src && prevItem.src.startsWith("blob:")) {
        URL.revokeObjectURL(prevItem.src);
      }

      const objectUrl = URL.createObjectURL(file);
      copy[index] = { id: prevItem.id, src: objectUrl, file, remote: false };
      return copy;
    });
  };

  const handleRemove = (index: number) => {
    setItems((prev) => {
      const copy = [...prev];
      const it = copy[index];
      if (it?.file && it.src && it.src.startsWith("blob:")) {
        URL.revokeObjectURL(it.src);
      }
      // clear slot
      copy[index] = { id: `empty-${index}-${Date.now()}`, src: null };
      return copy;
    });
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= MAX_IMAGES) return;
    setItems((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy;
    });
  };

  const handleUpload = () => {
    // // collect new files to upload (those with file defined)
    // const filesToUpload = items.reduce<File[]>((acc, it) => {
    //   if (it.file) acc.push(it.file);
    //   return acc;
    // }, []);
    // if (filesToUpload.length === 0) {
    //   toast.info("Nu sunt fisiere noi de incarcat.");
    //   return;
    // }
    // const form = new FormData();
    // filesToUpload.forEach((f) => form.append("images[]", f));
    // form.append("businessId", businessId);
    // mutate(form as unknown as any);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">
              Galerie (maxim {MAX_IMAGES} imagini)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Poti incarca, inlocui, reordona sau sterge imagini. Fisierele noi
              vor fi incarcate la apasarea butonului "Incarca".
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
              }}
            >
              {items.map((it, idx) => (
                <Box key={it.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: 220,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: it.src ? "transparent" : "action.hover",
                        cursor: "pointer",
                      }}
                      onClick={() => handlePick(idx)}
                      role="button"
                      tabIndex={0}
                    >
                      {it.src ? (
                        <img
                          src={it.src}
                          alt={`preview-${idx}`}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{ textAlign: "center", color: "text.secondary" }}
                        >
                          <AddPhotoAlternateIcon fontSize="large" />
                        </Box>
                      )}

                      <input
                        ref={(el) => {
                          inputRefs.current[idx] = el;
                        }}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          onFileSelected(idx, f ?? null);
                          if (e.target)
                            (e.target as HTMLInputElement).value = "";
                        }}
                      />

                      {it.src && (
                        <IconButton
                          size="small"
                          aria-label="Sterge"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(idx);
                          }}
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "rgba(0,0,0,0.48)",
                            color: "common.white",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Card>
                </Box>
              ))}
            </Box>
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => {
                setItems((prev) =>
                  prev.map((it, i) =>
                    it.remote
                      ? it
                      : { id: `empty-${i}-${Date.now()}`, src: null }
                  )
                );
                toast.info("Modificarile locale au fost resetate.");
              }}
            >
              Reseteaza
            </Button>

            <Button
              startIcon={<CloudUploadIcon />}
              onClick={handleUpload}
              variant="contained"
              disabled={isPending}
            >
              {isPending ? "Incarcare..." : "Incarca"}
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BusinessGalleryTab;
