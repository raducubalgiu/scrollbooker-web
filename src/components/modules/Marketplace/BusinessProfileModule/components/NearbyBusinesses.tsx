import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { NearbyBusiness } from "@/ts/models/booking/business/BusinessProfile";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import NearbyBusinessItem from "./NearbyBusinessItem";

type NearbyBusinessesProps = {
  businesses: NearbyBusiness[];
};

const NearbyBusinesses = ({ businesses }: NearbyBusinessesProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!businesses || businesses.length === 0) return null;

  const totalItems = businesses.length;
  const shouldShowCarousel = totalItems > 4;

  const slideOne = businesses.slice(0, 4);
  const slideTwo = businesses.slice(4, 8);
  const slides = slideTwo.length > 0 ? [slideOne, slideTwo] : [slideOne];

  const handleNext = () => setCurrentSlide(1);
  const handlePrev = () => setCurrentSlide(0);

  return (
    <Box sx={{ py: 4, borderTop: "1px solid", borderColor: "divider", mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" fontWeight={600}>
          În apropiere
        </Typography>

        {shouldShowCarousel && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={handlePrev}
              size="large"
              disabled={currentSlide === 0}
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <ArrowBackIosNew fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleNext}
              size="large"
              disabled={currentSlide === 1}
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box sx={{ overflow: "hidden", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            width: shouldShowCarousel ? "200%" : "100%",
            transform: `translateX(-${currentSlide * 50}%)`,
            transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {slides.map((slideItems, slideIndex) => (
            <Box
              key={slideIndex}
              sx={{
                width: shouldShowCarousel ? "50%" : "100%",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                  lg: "1fr 1fr 1fr 1fr",
                },
                gap: 3,
                boxSizing: "border-box",
                px: 0.5,
              }}
            >
              {slideItems.map((business) => (
                <NearbyBusinessItem key={business.id} business={business} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NearbyBusinesses;
