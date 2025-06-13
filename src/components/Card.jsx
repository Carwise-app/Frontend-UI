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
    : "";

  return (
    <Card sx={{ maxWidth: 320, borderRadius: 3 }}>
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
            minWidth: "320px",
            maxWidth: "320px",
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
          {listing.brand?.name} {listing.series?.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {listing.model?.name}
        </Typography>
      </CardContent>

      <CardActions className="flex justify-end px-4 pb-3">
        <Typography>
          <span className="text-2xl font-semibold text-[#dc143c]">
            {listing.price?.toLocaleString()} ₺
          </span>
        </Typography>
      </CardActions>
    </Card>
  );
}
