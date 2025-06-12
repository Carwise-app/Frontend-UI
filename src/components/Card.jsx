import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";


export default function ShowcaseCard({ listing }) {
  const imageUrl = listing.image?.path
    ? `https://carwisegw.yusuftalhaklc.com${listing.image.path}`
    : FallbackImage;

  return (
    <Card sx={{ maxWidth: 320, borderRadius: 3 }}>
      {/* Sabit yükseklik ve kırpma (cover) */}
      <Box
        sx={{
          height: 180,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <img
          src={imageUrl}
          alt={listing.title}
          style={{
            minWidth:"320px",
            maxWidth:"320px",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Stack>
            <span>
              {listing.brand?.name} {listing.model?.name} {listing.version}
            </span>
          </Stack>
        </Typography>

        <Box className="flex flex-wrap gap-2 mt-2">
          <span className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
            {listing.mileage?.toLocaleString() || "KM"}
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
            {listing.horsepower ? `${listing.horsepower} hp` : "hp"}
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
            {listing.fuel_type?.name || "-"}
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
            {listing.transmission?.name || "-"}
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-2xl text-xs font-semibold">
            {listing.year}
          </span>
        </Box>
      </CardContent>

      <CardActions className="flex justify-end px-4 pb-3">
        <Typography>
          <span className="text-2xl font-semibold text-black">
            {listing.price?.toLocaleString()} ₺
          </span>
        </Typography>
      </CardActions>
    </Card>
  );
}
