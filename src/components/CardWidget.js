import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const CardWidget = ({ title, amount }) => {
  return (
    <Box sx={{ display: "flex", alignSelf: "center", gap: 4 }}>
      <Card sx={{ border: "1px solid #ccc" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              width: { xs: "70%", sm: "80%", md: "100%" },
            }}
          >
            <CurrencyRupeeIcon />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="p">${amount}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardWidget;
