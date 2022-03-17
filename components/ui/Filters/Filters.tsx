import React from "react";
import Stack from "@mui/material/Stack";
import { Paper } from "@mui/material";
import Category from "./components/Category";
import Price from "./components/Price";
import Spaces from "./components/Spaces";
import Type from "./components/Type";

function Filters() {
  const [category, setCategory] = React.useState<string>("rent");
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 1000]);
  const [bedrooms, setBedrooms] = React.useState<string>("any");
  const [bathrooms, setBathrooms] = React.useState<string>("any");
  const [homeTypes, setHomeTypes] = React.useState<string[]>([]);

  return (
    <Paper sx={{ padding: "10px 15px" }}>
      <Stack spacing={2} direction='row'>
        <Category category={category} setCategory={setCategory} />
        <Price priceRange={priceRange} setPriceRange={setPriceRange} />
        <Spaces
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          changeBathrooms={setBathrooms}
          changeBedrooms={setBedrooms}
        />
        <Type homeTypes={homeTypes} setHomeTypes={setHomeTypes} />
      </Stack>
    </Paper>
  );
}

export default Filters;
