import React, { useEffect } from "react";
import { Map, Marker, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { MapProps } from "../../../interfaces/map-props-interface";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Media } from '../../../interfaces/bridge-response.interface';
import Carousel from 'react-material-ui-carousel';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { formatMoney } from "../../../Utils";
import { toast } from 'react-toastify';

const MapView = ({ properties, selectedProperty }: MapProps) => {
  // this is where the map instance will be stored after initialization
  const [map, setMap] = useState<Map>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [showAll, setShowAll] = useState<boolean>(true);

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = React.useRef(null);

  const updateMarkets = () => {
    if (properties.length) {
      const newMarkers: Marker[] = [];
      markers.forEach((marker) => marker.remove());
      for (const property of properties) {
        const { Latitude, Longitude } = property;
        const popup = new Popup().setHTML(`
            <h3>${property.BuildingName || property.ListingId}</h3>
            <p><strong>Agent name:</strong> ${property.ListAgentFullName}</p>
            <p><strong>Agent phone:</strong> <a href=tel:${property.ListAgentDirectPhone}}> ${property.ListAgentDirectPhone}<a></p>
            <p><strong>Agent office:</strong> <a href=tel:${property.ListAgentOfficePhone}}>${property.ListAgentOfficePhone}<a></p>
            <p><strong>Price:</strong> ${formatMoney.format(property.ListPrice)}</p>
          `);

        const newMarker = new Marker()
          .setPopup(popup)
          .setLngLat([Longitude, Latitude])
          .addTo(map!);

        newMarkers.push(newMarker);
      }
      setMarkers(newMarkers);
    }
  }

  const initializeMap = () => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new Map({
      container: node,
      accessToken:
        "pk.eyJ1Ijoicm1vbnRlcm9oIiwiYSI6ImNsMXp4a21hazByZ2wzY24zanUxeW1qa3UifQ.kXl6ehwGh0e-os7wzXLzGQ",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-80.191788, 25.761681],
      zoom: 9,
    });

    // save the map object to React.useState
    setMap(mapboxMap);

    // Update markets
    updateMarkets();

    return () => {
      mapboxMap.remove();
    };
  };

  const goTo = () => {
    if (selectedProperty) {
      if (selectedProperty.Longitude && selectedProperty.Latitude) {
        map?.flyTo({
          zoom: 16,
          center: [selectedProperty.Longitude, selectedProperty.Latitude],
        });
      }else {
        toast.warn(`The property ${selectedProperty?.BuildingName || selectedProperty?.ListingId} could not be found because it does not have the location data.`);
      }
    } 
  }


  const renderImages = () => {
    if (selectedProperty && selectedProperty.Media?.length) {
      return (
        <Carousel indicators={false}>
          {selectedProperty?.Media.map((media: Media) => (
            <CardMedia
              key={Math.random()}
              component='img'
              height='150'
              image={media.MediaURL}
              alt='Paella dish'
            />
          ))}
        </Carousel>
      )
    }
  }

  useEffect(() => {
    goTo();
  }, [selectedProperty]);

  useEffect(() => {
    updateMarkets();
  }, [properties]);

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <div style={{position: 'relative', margin: '20px 0'}}>
      <div ref={mapNode} style={{ width: "100%", height: "500px" }} />
      {
        selectedProperty && (
          <div style={{
            position: 'absolute',
            top: 0,
          }}>
            <Card sx={{ maxWidth: 345 }}>
              {
                renderImages()
              }
              <CardContent>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {selectedProperty.BuildingName || selectedProperty.ListingId}
                </Typography>
                {
                  showAll && (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <BedOutlinedIcon /> Rooms:{" "}
                        </span>
                        {selectedProperty?.BedroomsTotal}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <ShowerOutlinedIcon /> Baths:{" "}
                        </span>
                        {selectedProperty?.BathroomsTotalDecimal}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <SquareFootOutlinedIcon /> Lot Size:{" "}
                        </span>
                        {selectedProperty?.LotSizeSquareFeet} {selectedProperty?.LotSizeUnits}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <AspectRatioOutlinedIcon /> Living area:{" "}
                        </span>
                        {selectedProperty?.LivingArea} {selectedProperty?.LivingAreaUnits}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <CalendarMonthOutlinedIcon /> Year Built:{" "}
                        </span>
                        {selectedProperty?.YearBuilt}
                      </div>
                      <div style={{ display: "flex", alignItems: "start", gap: "15px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <strong>Property type:</strong>{" "}
                        </span>
                        {selectedProperty?.PropertyType}
                      </div>
                    </>
                  )
                }
              </div>
              </CardContent>
              <CardActions>
                <Button onClick={() => goTo()} size="small">Center location</Button>
                {
                  showAll ? 
                  (
                    <Button onClick={() => setShowAll(false)} size="small">Less</Button>
                  ) : 
                  (
                    <Button onClick={() => setShowAll(true)} size="small">More</Button>
                  )
                }
              </CardActions>
            </Card>
          </div>
        )
      }
    </div>
  );
};

export default MapView;
