import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent } from 'react'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { FilterContext } from '../../../../context/filter/FilterContext';
import { useContext, useState } from 'react';
import { IInputValue } from '../../../../interfaces/input-interface';

const Search = ({search}) => {
  const [timer, setTimer] = useState<any>(null);
  const {filterState: {inputList} , setInputList} = useContext(FilterContext);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    if (timer) {
      clearTimeout(timer);
    }

    const list: IInputValue[] = [...inputList];
    list[index].inputValue = e.target.value;
    if (inputList.length - 1 === index) {
      list.push({ inputValue: "" });
    }

    const newTimer = setTimeout(() => {
      setInputList(list);
    }, 500)

    setTimer(newTimer);
  };

  const clearSearch = () => {
    setInputList([{inputValue: ""}]);
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {inputList.map((x, i) => (
          <TextField
            size='small'
            key={i}
            value={x.inputValue}
            onChange={(e) => handleInputChange(e, i)}
            label='New search criteria'
            variant='outlined'
          />
        ))}
        <Button onClick={() => search()} variant='contained'>
          Search
        </Button>
        {inputList.length > 1 && (
          <Button
            onClick={clearSearch}
            variant='outlined'
            startIcon={<BackspaceOutlinedIcon />}
          >
            Clear
          </Button>
        )}
      </Box>
    </div>
  )
}

export default Search