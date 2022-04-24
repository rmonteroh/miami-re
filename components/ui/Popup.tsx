import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import Highlighter from "react-highlight-words";
import { useContext } from "react";
import { FilterContext } from "../../context/filter/FilterContext";
import { Media, PropertyData } from "../../core/interfaces";

type Props = {
  open: boolean;
  handleClose: Function;
  property: PropertyData | null;
};

const Popup = ({ open, handleClose, property }: Props) => {
  const {
    filterState: { inputList },
  } = useContext(FilterContext);

  const fillSearchHighlight = () => {
    const searchHighlight: string[] = [];
    inputList.map((search) => {
      searchHighlight.push(search.inputValue);
    });

    return searchHighlight;
  };

  const renderImages = () => {
    if (property && property.Media?.length) {
      return (
        <Carousel indicators={false}>
          {property?.Media.map((media: Media) => (
            <CardMedia
              key={Math.random()}
              component='img'
              height='300'
              image={media.MediaURL}
              alt='Paella dish'
            />
          ))}
        </Carousel>
      );
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => handleClose()}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{property?.BuildingName?.toUpperCase()}</DialogTitle>
      <Card>{renderImages()}</Card>
      <DialogContent sx={{ minWidth: 320 }}>
        <DialogContentText id='alert-dialog-slide-description'>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <BedOutlinedIcon /> Rooms:{" "}
              </span>
              {property?.BedroomsTotal}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <ShowerOutlinedIcon /> Baths:{" "}
              </span>
              {property?.BathroomsTotalDecimal}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <SquareFootOutlinedIcon /> Lot Size:{" "}
              </span>
              {property?.LotSizeSquareFeet} {property?.LotSizeUnits}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <AspectRatioOutlinedIcon /> Living area:{" "}
              </span>
              {property?.LivingArea} {property?.LivingAreaUnits}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <CalendarMonthOutlinedIcon /> Year Built:{" "}
              </span>
              {property?.YearBuilt}
            </div>
            <div style={{ display: "flex", alignItems: "start", gap: "15px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <strong>Property type:</strong>{" "}
              </span>
              {property?.PropertyType}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "15px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <strong>Public remark:</strong>{" "}
              </span>
              <Highlighter
                highlightClassName='YourHighlightClass'
                searchWords={[...fillSearchHighlight()]}
                autoEscape={true}
                textToHighlight={property?.PublicRemarks || "-"}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "15px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <strong>Private remark:</strong>{" "}
              </span>
              <Highlighter
                highlightClassName='YourHighlightClass'
                searchWords={[...fillSearchHighlight()]}
                autoEscape={true}
                textToHighlight={property?.PrivateRemarks || "-"}
              />
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

Popup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Popup;
