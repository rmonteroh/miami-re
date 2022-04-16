import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { House, Close } from "@mui/icons-material";
import { PropertyData } from "../../../interfaces/bridge-response.interface";

interface IProps {
  showList: boolean;
  properties: PropertyData[];
  propertySelected: PropertyData | null;
  setShowList: (value: boolean) => void;
  setPositionLeft: (value: string) => void;
  changeSelectedProperty: (value: PropertyData) => void;
}

const PropertyList = ({
  showList,
  setShowList,
  setPositionLeft,
  properties,
  changeSelectedProperty,
  propertySelected,
}: IProps) => {
  return (
    <div
      className='property-list'
      style={{
        position: "absolute",
        backgroundColor: "white",
        zIndex: 1,
        height: "100%",
        width: showList ? "auto" : 0,
        overflow: "hidden",
      }}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemIcon>
            <House />
          </ListItemIcon>
          <ListItemText id='switch-list-label-bluetooth' primary='Properties' />
          <ListItemIcon style={{ display: "flex", justifyContent: "end" }}>
            <IconButton
              edge='end'
              aria-label='close'
              onClick={() => {
                setShowList(false);
                setPositionLeft("55px");
              }}
            >
              <Close />
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </List>
      <List
        sx={{ width: "100%", maxWidth: 360, height: "100%", overflowY: "auto" }}
      >
        {properties.map((property: PropertyData) => (
          <div key={property.ListingId} style={{backgroundColor: property.ListingId === propertySelected?.ListingId ? '#1976d2' : 'white' }}>
            <ListItem
              alignItems='flex-start'
              style={{ cursor: "pointer" }}
              onClick={() => changeSelectedProperty(property)}
            >
              <ListItemAvatar>
                <Avatar
                  alt='avatar'
                  src={
                    property.Media?.length ? property.Media[0]?.MediaURL : "?"
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={property.BuildingName || property.ListingId}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    ></Typography>
                    {property.UnparsedAddress}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
          </div>
        ))}
      </List>
    </div>
  );
};

export default PropertyList;
