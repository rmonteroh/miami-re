import React, { useContext, useEffect } from "react";
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
import { FilterContext } from "../../../../context/filter/FilterContext";
import { formatCompactNumber } from "../../../../core/utils";

function Price() {
  const {
    filterState: { minPrice, maxPrice },
    setMinPrice,
    setMaxPrice,
  } = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [lowerPrice, setLowerPrice] = React.useState<number>(minPrice);
  const [hightPrice, setHightPrice] = React.useState<number>(maxPrice);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMinPriceChange = (minValue: string) => {
    if (Number(minValue) < 0) {
      setLowerPrice(0);
      return;
    }

    setLowerPrice(Number(minValue));

    if (!maxPrice || Number(minValue) > maxPrice) {
      setHightPrice(Number(minValue));
    }
  };

  const handleMaxPriceChange = (maxValue: string) => {
    setHightPrice(Number(maxValue));
  };

  const apply = () => {
    setMinPrice(lowerPrice);
    setMaxPrice(hightPrice);
    handleClose();
  }

  const showAmount = (): string => {
    const minValue = formatCompactNumber.format(minPrice);
    const maxValue = formatCompactNumber.format(maxPrice);

    return `${minValue} - ${maxValue}`;
  };

  useEffect(() => {
    setLowerPrice(minPrice);
    setHightPrice(maxPrice);
  }, [minPrice, maxPrice])
  

  return (
    <>
      <Stack spacing={2} direction='row'>
        <Badge
          invisible={!minPrice && !maxPrice}
          badgeContent={showAmount()}
          color='secondary'
        >
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <TextField
                type='number'
                value={lowerPrice === 0 ? "" : lowerPrice}
                onChange={(e) => handleMinPriceChange(e.target.value)}
                size='small'
                id='outlined-basic'
                label='Min'
                variant='outlined'
              />
              <TextField
                type='number'
                value={hightPrice === 0 ? "" : hightPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                size='small'
                id='outlined-basic'
                label='Max'
                variant='outlined'
              />
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button size="small" onClick={handleClose}>Close</Button>
                <Button size="small" variant="contained" onClick={apply}>Apply</Button>
              </Box>
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default Price;
