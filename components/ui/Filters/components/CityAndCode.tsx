import { Badge, Button, Menu, MenuItem, MenuList, Stack, ListItemText, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useContext } from 'react';
import { FilterContext } from '../../../../context/filter/FilterContext';

const CityAndCode = () => {
  const {filterState: {city, postalCode} , setCityTypes, setPostalCode} = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCityChange = (city: string) => {
    setCityTypes(city);
  }

  const handleCodeChange = (code: string) => {
    setPostalCode(code);
  }


  return (
    <>
      <Stack spacing={2} direction='row'>
      <Badge invisible={city === '' && postalCode === ''} variant="dot" color="secondary">
        <Button size='medium' variant='text' onClick={(e) => handleClick(e)}>
          City & Code
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
            <ListItemText>City and postal code</ListItemText>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple>
            <Box sx={{ padding: "10px 20px"}}>
              <TextField value={city}  onChange={(e) => handleCityChange(e.target.value)} size="small" id="outlined-basic" label="City" variant="outlined" />
            </Box>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple>
            <Box sx={{ padding: "10px 20px"}}>
              <TextField value={postalCode} onChange={(e) => handleCodeChange(e.target.value)} size="small" id="outlined-basic" label="Code" variant="outlined" />
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default CityAndCode