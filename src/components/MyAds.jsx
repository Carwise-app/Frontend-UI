import { Box } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React from "react";
import ControlPanelHeader from "./ControlPanelHeader";
import YayindaOlanlar from "./YayindaOlanlar";

export default function MyAds() {
  return (
    <>
      <ControlPanelHeader
        icon={
          <FormatListBulletedIcon
            sx={{ fontSize: 115, color: "black", opacity: 0.1, marginRight: 1 }}
          />
        }
        title="İlanlarım"
        description="Oluşturduğunuz ilanlara kolayca bakabilirsiniz."
      />
      <Box className="mt-5">
        <YayindaOlanlar />
      </Box>
    </>
  );
}
