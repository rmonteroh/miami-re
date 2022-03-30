import React from "react";
import Stack from "@mui/material/Stack";
import { Button, Paper } from "@mui/material";
import Category from "./components/Category";
import Price from "./components/Price";
import Spaces from "./components/Spaces";
import Type from "./components/Type";
import { FilterContext } from '../../../context/filter/FilterContext';
import { useContext } from 'react';
import CityAndCode from './components/CityAndCode';

function Filters() {
  const {setFilters} = useContext(FilterContext);
  return (
    <Paper sx={{ padding: "10px 15px", display: 'flex', justifyContent: 'space-between' }}>
      <Stack spacing={2} direction='row'>
        {/* <Category /> */}
        <Price />
        <Spaces />
        <Type />
        <CityAndCode />
      </Stack>
        <Button size="medium" variant="text" onClick={() => setFilters()}>Clear filters</Button>
    </Paper>
  );
}

export default Filters;
