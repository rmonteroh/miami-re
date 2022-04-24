import React from "react";
import { Stack, IconButton } from "@mui/material";
import { OtherHouses } from "@mui/icons-material";

interface IProps {
  setPositionLeft: (value: string) => void;
  setShowList: (value: boolean) => void;
}

const ListMenu = ({ setPositionLeft, setShowList }: IProps) => {
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <IconButton
        style={{
          display: "absolute",
          top: '5px',
          left: '5px',
          zIndex: 1,
          backgroundColor: "white",
        }}
        aria-label='delete'
        size='large'
        onClick={() => {
          setPositionLeft("370px");
          setShowList(true);
        }}
      >
        <OtherHouses />
      </IconButton>
    </Stack>
  );
};

export default ListMenu;
