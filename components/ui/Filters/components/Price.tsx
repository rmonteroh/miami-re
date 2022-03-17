import React from "react";
import Stack from "@mui/material/Stack";
import {
  Button,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Slider,
} from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  priceRange: number[];
  setPriceRange: Function;
};

function Price({ priceRange, setPriceRange }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
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
        sx={{ width: 250 }}
      >
        <MenuList>
          <MenuItem disableRipple disableTouchRipple>
            <ListItemText>Price range</ListItemText>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple>
            <Box sx={{ padding: "10px 20px", width: 250 }}>
              <Slider
                min={0}
                step={1000}
                max={100000000}
                getAriaLabel={() => "Temperature range"}
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay='auto'
              />
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default Price;
