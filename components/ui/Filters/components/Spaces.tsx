import {
  Badge,
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
import React, { useContext } from "react";
import { FilterContext } from '../../../../context/filter/FilterContext';

function Spaces() {
  const {filterState: {bathrooms, bedrooms}, setBathrooms, setBedrooms} = useContext(FilterContext)
  const bathList = ["any", "1+", "1.5+", "2+", "3+", "4+"];
  const bedList = ["any", "1+", "2+", "3+", "4+", "5+"];
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
      setBedrooms(bedrooms);
    }
  };

  const handleBathrooms = (
    event: React.MouseEvent<HTMLElement>,
    bathrooms: string
  ) => {
    if (bathrooms !== null) {
      setBathrooms(bathrooms);
    }
  };

  return (
    <>
      <Stack spacing={2} direction='row'>
        <Badge invisible={bedrooms === 'any' && bathrooms === 'any'} badgeContent={`${bedrooms} - ${bathrooms}`} color="secondary">
          <Button size='medium' variant='text' onClick={(e) => handleClick(e)}>
            Beds & Bath
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
            <ListItemText>Bedrooms</ListItemText>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple>
            <ToggleButtonGroup
              value={bedrooms}
              exclusive
              onChange={handleBedrooms}
              aria-label='device'
            >
              {bedList.map((bed: string) => (
                <ToggleButton key={Math.random()} value={bed} aria-label={bed}>
                  <Typography>{bed}</Typography>
                </ToggleButton>
              ))}
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
              {bathList.map((item: string) => (
                <ToggleButton
                  key={Math.random()}
                  value={item}
                  aria-label={item}
                >
                  <Typography>{item}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default Spaces;
