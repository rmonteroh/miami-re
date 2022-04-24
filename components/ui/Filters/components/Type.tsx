import {
  Badge,
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
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addHome = (homeType: string) => {
    const typeList: Set<string> = new Set<string>([...homeTypes]);

    if (typeList.has(homeType)) {
      typeList.delete(homeType);
    } else {
      typeList.add(homeType);
    }
    setHomeTypes(Array.from(typeList));
  };

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
                <Checkbox checked={homeTypes.includes(type)} />
              </ListItemIcon>
              <ListItemText>{type}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default Type;
