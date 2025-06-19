import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';

export default function ShowcaseCard({ listing }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = listing.image?.path
    ? `https://carwisegw.yusuftalhaklc.com${listing.image.path}`
    : "";

  return (
    <Card sx={{ width: '100%', maxWidth: '100%', borderRadius: 3 }}>
      <Box
        sx={{
          height: 180,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {(!imageUrl || imgError) ? (
          <NoPhotographyIcon sx={{ fontSize: 120, color: '#bdbdbd' }} />
        ) : (
          <img
            src={imageUrl}
            alt={listing.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
            onError={() => setImgError(true)}
          />
        )}
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div" className="truncate w-[180px]">
          {listing.brand?.name} {listing.series?.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="truncate w-[180px]">
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
