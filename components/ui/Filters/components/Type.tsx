import {
  Badge,
  Box,
  Button,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import React, { useContext } from "react";
import { FilterContext } from "../../../../context/filter/FilterContext";
import { useEffect } from 'react';

function Type() {
  const {
    filterState: { homeTypes },
    setHomeTypes,
  } = useContext(FilterContext);
  const typesActive = [
    "Commercial",
    "Residential",
    "Land/Boat Docks",
    "Business",
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [typesList, setTypeList] = React.useState<string[]>([...homeTypes]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addHome = (homeType: string) => {
    const typeList: Set<string> = new Set<string>([...typesList]);

    if (typeList.has(homeType)) {
      typeList.delete(homeType);
    } else {
      typeList.add(homeType);
    }
    setTypeList(Array.from(typeList));
    // setHomeTypes(Array.from(typeList));
  };

  const apply = () => {
    setHomeTypes(typesList);
    handleClose();
  }

  useEffect(() => {
    setTypeList(homeTypes);
  }, [homeTypes])
  

  return (
    <>
      <Stack spacing={2} direction='row'>
        <Badge
          invisible={!homeTypes.length}
          badgeContent={`${homeTypes.length}`}
          color='secondary'
        >
          <Button size='medium' variant='text' onClick={(e) => handleClick(e)}>
            Property type
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
          {typesActive.map((type: string) => (
            <MenuItem key={Math.random()} onClick={() => addHome(type)}>
              <ListItemIcon>
                <Checkbox checked={typesList.includes(type)} />
              </ListItemIcon>
              <ListItemText>{type}</ListItemText>
            </MenuItem>
          ))}
          <MenuItem disableRipple disableTouchRipple sx={{display: 'flex', justifyContent: 'end'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <Button size="small" onClick={handleClose}>Close</Button>
              <Button size="small" variant="contained" onClick={apply}>Apply</Button>
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default Type;
