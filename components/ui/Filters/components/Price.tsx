import React from "react";
import Stack from "@mui/material/Stack";
import {
  Button,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Slider,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Value } from '../../../../interfaces/bridge-response.interface';
import { formatMoney } from "../../../../Utils";

type Props = {
  minPrice: number;
  maxPrice: number;
  setMinPrice: Function;
  setMaxPrice: Function;
};

function Price({ minPrice, maxPrice, setMinPrice, setMaxPrice }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMinPriceChange = (minValue: string) => {
    console.log('minValue', minValue);
    
    setMinPrice(Number(minValue));
  };

  const handleMaxPriceChange = (maxValue: string) => {
    console.log('minValue', maxValue);
    
    setMaxPrice(Number(maxValue));
  };

  return (
    <>
      <Stack spacing={2} direction='row'>
        <Button size='medium' variant='text' onClick={handleClick}>
          Price
        </Button>
      </Stack>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <MenuItem disableRipple disableTouchRipple>
            <ListItemText>Price range</ListItemText>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple>
            <Box sx={{ padding: "10px 20px"}}>
              {/* <Slider
                min={0}
                max={10000}
                getAriaLabel={() => "Temperature range"}
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay='auto'
              /> */}
              <TextField type='number' value={minPrice} onChange={(e) => handleMinPriceChange(e.target.value)} size="small" id="outlined-basic" label="Min" variant="outlined" />
              <span style={{height: '100%'}}> - </span>
              <TextField type='number' value={maxPrice} onChange={(e) => handleMaxPriceChange(e.target.value)} size="small" id="outlined-basic" label="Max" variant="outlined" />
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default Price;
