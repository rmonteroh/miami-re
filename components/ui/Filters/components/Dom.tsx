import { Badge, Button, InputLabel, ListItemText, Menu, MenuItem, MenuList, Select, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { FilterContext } from '../../../../context/filter/FilterContext';
import { useContext } from 'react';
import { IDom } from '../../../../core/interfaces/dom-interface';
import { LessThanType } from '../../../../core/enums';

const Dom = () => {
  const {
    filterState: { dom },
    setDOM,
  } = useContext(FilterContext);
  const [operator, setOperator] = React.useState<LessThanType>(LessThanType.More);
  const [days, setDays] = React.useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSelect = (order: LessThanType) => {
    setOperator(order);
  }

  const handleDayChange = (day:string) => {
    setDays(parseInt(day));
  };

  const showAmount = () => {
    return `${dom.operator === LessThanType.Less ? '-' : '+'} ${dom.days}`
  }

  const apply = () => {
    const filter: IDom = {
      operator: operator,
      days,
    }

    setDOM(filter);

    handleClose();
  }

  useEffect(() => {
    setDays(dom.days);
  }, [dom])

  return (
    <>
      <Stack spacing={2} direction='row'>
        <Badge
          invisible={!dom.days}
          badgeContent={showAmount()}
          color='secondary'
        >
          <Button size='medium' variant='text' onClick={(e) => handleClick(e)}>
            DOM
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
            <ListItemText>Days on market</ListItemText>
          </MenuItem>
          <MenuItem disableRipple disableTouchRipple>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={operator}
                  label="Age"
                  size='small'
                  onChange={(e) => {handleChangeSelect(e.target.value as LessThanType)}}
                >
                  <MenuItem selected value={LessThanType.More}>More than</MenuItem>
                  <MenuItem value={LessThanType.Less}>Less than</MenuItem>
                </Select>

                <TextField
                  type='number'
                  value={days}
                  onChange={(e) => {handleDayChange(e.target.value)}}
                  size='small'
                  id='outlined-basic'
                  label='Days'
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
  )
}

export default Dom