import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  PropertyData,
  Media,
} from "../../../interfaces/bridge-response.interface";
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

interface IProps {
  positionLeft: string;
  propertySelected: PropertyData;
  showAll: boolean;
  setShowAll: (value: boolean) => void;
  goTo: (value: PropertyData) => void;
}

const CardPropertyDescription = ({
  positionLeft,
  propertySelected,
  showAll,
  setShowAll,
  goTo,
}: IProps) => {
  const renderImages = () => {
    if (propertySelected && propertySelected.Media?.length) {
      return (
        <Carousel indicators={false}>
          {propertySelected?.Media.map((media: Media) => (
            <CardMedia
              key={Math.random()}
              component='img'
              height='150'
              image={media.MediaURL}
              alt='Paella dish'
            />
          ))}
        </Carousel>
      );
    }
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: positionLeft,
        zIndex: 999,
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        {renderImages()}
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Typography variant='subtitle1' color='text.secondary'>
              {propertySelected.BuildingName || propertySelected.ListingId}
            </Typography>
            {showAll && (
              <>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <BedOutlinedIcon /> Rooms:{" "}
                  </span>
                  {propertySelected?.BedroomsTotal}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <ShowerOutlinedIcon /> Baths:{" "}
                  </span>
                  {propertySelected?.BathroomsTotalDecimal}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <SquareFootOutlinedIcon /> Lot Size:{" "}
                  </span>
                  {propertySelected?.LotSizeSquareFeet}{" "}
                  {propertySelected?.LotSizeUnits}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <AspectRatioOutlinedIcon /> Living area:{" "}
                  </span>
                  {propertySelected?.LivingArea}{" "}
                  {propertySelected?.LivingAreaUnits}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <CalendarMonthOutlinedIcon /> Year Built:{" "}
                  </span>
                  {propertySelected?.YearBuilt}
                </div>
                <div
                  style={{ display: "flex", alignItems: "start", gap: "15px" }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <strong>Property type:</strong>{" "}
                  </span>
                  {propertySelected?.PropertyType}
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={() => goTo(propertySelected)} size='small'>
            Center location
          </Button>
          {showAll ? (
            <Button onClick={() => setShowAll(false)} size='small'>
              Less
            </Button>
          ) : (
            <Button onClick={() => setShowAll(true)} size='small'>
              More
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default CardPropertyDescription;
