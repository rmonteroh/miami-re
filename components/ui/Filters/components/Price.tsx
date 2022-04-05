import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import {
  Badge,
  Button,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Slider,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { FilterContext } from '../../../../context/filter/FilterContext';
import { formatCompactNumber } from "../../../../Utils";


function Price() {
  const {filterState: {minPrice, maxPrice} , setMinPrice, setMaxPrice} = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMinPriceChange = (minValue: string) => {
    if (Number(minValue) < 0) {
      setMinPrice(0);
      return;
    }

    setMinPrice(Number(minValue));

    if (!maxPrice || Number(minValue) > maxPrice) {
      setMaxPrice(Number(minValue));
    }
  };

  const handleMaxPriceChange = (maxValue: string) => {
    setMaxPrice(Number(maxValue));
  };

  const showAmount = (): string => {
    const minValue = formatCompactNumber.format(minPrice);
    const maxValue = formatCompactNumber.format(maxPrice);

    return `${minValue} - ${maxValue}`
  }

  return (
    <>
      <Stack spacing={2} direction='row'>
      <Badge invisible={!minPrice && !maxPrice} badgeContent={showAmount()} color="secondary">
        <Button size='medium' variant='text' onClick={(e) => handleClick(e)}>
          List Price
        </Button>
      </Badge>
      </Stack>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
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
