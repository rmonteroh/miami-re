/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import mapboxgl, { Map, Marker, Popup } from "mapbox-gl";
import { useState } from "react";
import { toast } from "react-toastify";
import ListMenu from "./ListMenu";
import CardPropertyDescription from "./CardPropertyDescription";
import PropertyList from "./PropertyList";
import { MapProps, PropertyData } from "../../../core/interfaces";
import { formatMoney } from "../../../core/utils";

import "mapbox-gl/dist/mapbox-gl.css";

const MapView = ({ properties, selectedProperty }: MapProps) => {
  // this is where the map instance will be stored after initialization
  const [map, setMap] = useState<Map>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [propertySelected, setPropertySelected] = useState<PropertyData | null>(
    selectedProperty
  );
  const [showAll, setShowAll] = useState<boolean>(true);
  const [showList, setShowList] = useState<boolean>(false);
  const [positionLeft, setPositionLeft] = useState<string>("55px");

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
            <p><strong>Agent phone:</strong> <a href=tel:${
              property.ListAgentDirectPhone
            }}> ${property.ListAgentDirectPhone}<a></p>
            <p><strong>Agent office:</strong> <a href=tel:${
              property.ListAgentOfficePhone
            }}>${property.ListAgentOfficePhone}<a></p>
            <p><strong>Price:</strong> ${formatMoney.format(
              property.ListPrice
            )}</p>
          `);

        const newMarker = new Marker()
          .setPopup(popup)
          .setLngLat([Longitude, Latitude])
          .addTo(map!);

        newMarkers.push(newMarker);
      }
      setMarkers(newMarkers);
    }
  };

  const initializeMap = () => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-80.191788, 25.761681],
      zoom: 9,
    });

    mapboxMap.addControl(new mapboxgl.FullscreenControl());

    // save the map object to React.useState
    setMap(mapboxMap);

    // Update markets
    updateMarkets();

    return () => {
      mapboxMap.remove();
    };
  };

  const goTo = (property: PropertyData) => {
    if (property) {
      if (property.Longitude && property.Latitude) {
        window.scrollTo(0, document.body.scrollHeight);
        map?.flyTo({
          zoom: 16,
          center: [property.Longitude, property.Latitude],
        });

        const findMarker: Marker | undefined = markers.find(
          (marker: Marker) => {
            const { lng, lat } = marker.getLngLat();
            return lng === property.Longitude && lat === property.Latitude;
          }
        );

        if (findMarker) {
          findMarker.getPopup().addTo(map!);
        }
      } else {
        toast.warn(
          `The property ${
            property?.BuildingName || property?.ListingId
          } could not be found because it does not have the location data.`
        );
      }
    }
  };

  const changeSelectedProperty = async (property: PropertyData | null) => {
    if (property) {
      await setPropertySelected(property);
      goTo(property);
    }
  };

  useEffect(() => {
    changeSelectedProperty(selectedProperty);
  }, [selectedProperty]);

  useEffect(() => {
    updateMarkets();
  }, [properties]);

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <div style={{ margin: "20px 0" }}>
      <div
        ref={mapNode}
        style={{ width: "100%", height: "500px", position: "relative" }}
      >
        {!showList && (
          <ListMenu
            setPositionLeft={setPositionLeft}
            setShowList={setShowList}
          />
        )}

        {propertySelected && (
          <CardPropertyDescription
            positionLeft={positionLeft}
            propertySelected={propertySelected}
            showAll={showAll}
            setShowAll={setShowAll}
            goTo={goTo}
          />
        )}

        <PropertyList
          showList={showList}
          properties={properties}
          propertySelected={propertySelected}
          setShowList={setShowList}
          setPositionLeft={setPositionLeft}
          changeSelectedProperty={changeSelectedProperty}
        />
      </div>
    </div>
  );
};

export default MapView;
