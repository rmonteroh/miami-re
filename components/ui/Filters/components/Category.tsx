import React from 'react'
import Stack from '@mui/material/Stack';
import { Button, Menu, MenuItem, MenuList, ListItemText, Typography, Radio } from '@mui/material';

type Props = {
  category: string;
  setCategory: Function;
}

function Category({category, setCategory}: Props) {
  const availableCategories = ['rent', 'sale'];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectCategory = (categorySelected: string) => {
    setCategory(categorySelected);
  }
  return (
    <>
      <Stack spacing={2} direction="row">
          <Button size="medium" variant="text" onClick={handleClick}>For Sale</Button>
        </Stack>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
        <MenuList>
          {
            availableCategories.map((cat: string) => (
              <MenuItem key={Math.random()} onClick={() => selectCategory(cat)}>
                <Typography variant="body2" color="text.secondary">
                  <Radio checked={category === cat} />
                </Typography>
                <ListItemText>For {cat}</ListItemText>
              </MenuItem>
            ))
          }
        </MenuList>
        </Menu>
    </>
  )
}

export default Category