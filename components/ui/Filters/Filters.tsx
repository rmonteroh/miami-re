import React from "react";
import Stack from "@mui/material/Stack";
import { Paper } from "@mui/material";
import Category from "./components/Category";
import Price from "./components/Price";
import Spaces from "./components/Spaces";
import Type from "./components/Type";

function Filters() {
  const [bedrooms, setBedrooms] = React.useState<string>("any");
  const [bathrooms, setBathrooms] = React.useState<string>("any");
  const [homeTypes, setHomeTypes] = React.useState<string[]>([]);

  return (
    <Paper sx={{ padding: "10px 15px" }}>
      <Stack spacing={2} direction='row'>
        <Category />
        <Price />
        <Spaces />
        <Type />
      </Stack>
    </Paper>
  );
}

export default Filters;
