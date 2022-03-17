import {
  Button,
  Divider,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  bedrooms: string;
  bathrooms: string;
  changeBathrooms: Function;
  changeBedrooms: Function;
}

function Spaces({ bedrooms, bathrooms, changeBathrooms, changeBedrooms }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBedrooms = (
    event: React.MouseEvent<HTMLElement>,
    bedrooms: string
  ) => {
    if (bedrooms !== null) {
      changeBedrooms(bedrooms);
    }
  };

  const handleBathrooms = (
    event: React.MouseEvent<HTMLElement>,
    bathrooms: string
  ) => {
    if (bathrooms !== null) {
      changeBathrooms(bathrooms);
    }
  };

  return (
    <>
      <Stack spacing={2} direction='row'>
        <Button size='medium' variant='text' onClick={handleClick}>
          Beds & Bath
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
            <ListItemText>Bedrooms</ListItemText>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple>
            <ToggleButtonGroup
              value={bedrooms}
              exclusive
              onChange={handleBedrooms}
              aria-label='device'
            >
              <ToggleButton value='any' aria-label='Any'>
                <Typography>Any</Typography>
              </ToggleButton>
              <ToggleButton value='+1' aria-label='+1'>
                <Typography>+1</Typography>
              </ToggleButton>
              <ToggleButton value='+2' aria-label='+2'>
                <Typography>+2</Typography>
              </ToggleButton>
              <ToggleButton value='+3' aria-label='+3'>
                <Typography>+3</Typography>
              </ToggleButton>
              <ToggleButton value='+4' aria-label='+4'>
                <Typography>+4</Typography>
              </ToggleButton>
              <ToggleButton value='+5' aria-label='+5'>
                <Typography>+5</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </MenuItem>
          <Divider />
          <MenuItem disableRipple disableTouchRipple>
            <ListItemText>Bathrooms</ListItemText>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple>
            <ToggleButtonGroup
              value={bathrooms}
              exclusive
              onChange={handleBathrooms}
              aria-label='device'
            >
              <ToggleButton value='any' aria-label='Any'>
                <Typography>Any</Typography>
              </ToggleButton>
              <ToggleButton value='+1' aria-label='+1'>
                <Typography>+1</Typography>
              </ToggleButton>
              <ToggleButton value='+1.5' aria-label='+1.5'>
                <Typography>+1.5</Typography>
              </ToggleButton>
              <ToggleButton value='+2' aria-label='+2'>
                <Typography>+2</Typography>
              </ToggleButton>
              <ToggleButton value='+3' aria-label='+3'>
                <Typography>+3</Typography>
              </ToggleButton>
              <ToggleButton value='+4' aria-label='+4'>
                <Typography>+4</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default Spaces;
