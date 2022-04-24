/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  LinearProgress,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  MutableRefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { CSVLink } from "react-csv";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterContext } from "../../context/filter/FilterContext";
import Popup from "../ui/Popup";
import Filters from "../ui/Filters/Filters";
import { toast } from "react-toastify";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import MapView from "../ui/map-view/MapView";
import { BridgeResponse, PropertyData } from "../../core/interfaces";
import { SortedColumns } from "../../core/types";
import { propertiesApi } from "../../core/apis";
import { formatMoney } from "../../core/utils";

const HomePage = () => {
  const { filterState } = useContext(FilterContext);
  const [open, setIsOpen] = useState(false);
  const [propertySelected, setPropertySelected] = useState<PropertyData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [mapProperty, setMapProperty] = useState<PropertyData | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [orderProperty, setOrderProperty] = useState<SortedColumns | "">("");
  const observer: MutableRefObject<undefined | any> = useRef();

  const lastPropertyRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          searchProperty(true);
        }
      });
      if (node) observer?.current?.observe(node);
    },
    [isLoading, hasMore]
  );

  const [fileHeaders] = useState([
    { label: "Building Name", key: "BuildingName" },
    { label: "List Agent Full Name", key: "ListAgentFullName" },
    { label: "List Agent Email", key: "ListAgentEmail" },
    { label: "List Agent Direct Phone", key: "ListAgentDirectPhone" },
    { label: "List Agent Office Phone", key: "ListAgentOfficePhone" },
  ]);

  const searchProperty = async (loadMore: boolean = false) => {
    const actualPage = 0;
    if (!loadMore) {
      await setProperties([]);
      await setTotal(0);
      await setPage(0);
      await setMapProperty(null);
    }
    await setIsLoading(true);

    try {
      const { data, status } = await propertiesApi.post("properties", {
        page: !loadMore ? 0 : page,
        filters: filterState,
      });

      const response: BridgeResponse = data;

      if (status === 200 && response.value) {
        setOrderProperty("");
        const { value } = response;
        setPage(page + 1);
        if (loadMore) {
          setProperties([...properties, ...value]);
        } else {
          setProperties([...value]);
        }
        if (response["@odata.count"]) {
          if (response["@odata.count"] < 200) {
            setHasMore(false);
          }
          setTotal(response["@odata.count"]);
        } else {
          setTotal(0);
        }

        if (!value.length) {
          setHasMore(false);
        }
      } else {
        console.log(response?.error?.message);
        toast.error("Error trying to load properties");
      }
    } catch (error) {
      console.error("error", error);
      toast.error("Error trying to load properties");
    }

    setIsLoading(false);
  };

  const renderExportButton = () => {
    if (properties?.length) {
      return (
        <Button
          sx={{ marginBottom: 2 }}
          variant='contained'
          startIcon={<FileDownloadOutlinedIcon />}
        >
          <CSVLink
            headers={fileHeaders}
            data={properties}
            filename='results.csv'
            target='_blank'
          >
            Export csv
          </CSVLink>
        </Button>
      );
    }
  };

  const resetStore = async () => {
    await setPage(0);
  };

  const selectProperty = async (property: PropertyData) => {
    await setPropertySelected(property);
    await setIsOpen(true);
  };

  const selectMapProperty = async (property: PropertyData) => {
    await setMapProperty(property);
  };

  const sortListingByProperty = (property: SortedColumns) => {
    // debugger;
    let sortedListings: PropertyData[] = [];
    if (isAscending) {
      sortedListings = properties.sort((a, b) =>
        a[property] > b[property] ? -1 : 1
      );
    } else {
      sortedListings = properties.sort((a, b) =>
        a[property] < b[property] ? -1 : 1
      );
    }
    setOrderProperty(property);
    setIsAscending(!isAscending);
    setProperties(sortedListings);
  };

  useEffect(() => {
    resetStore();
  }, [filterState]);

  return (
    <div>
      <Box sx={{ marginTop: "15px" }}>
        <Filters search={() => searchProperty()} />
      </Box>
      <div style={{ paddingBottom: "40px" }}>
        <Box sx={{ marginTop: "20px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography color='text.secondary'>
                We are searching Miami RE with authentication for properties
                with Active status and filtering by the PublicRemarks,
                SyndicationRemarks and PrivateRemarks fields
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 500 }}
                elevation={0}
              >
                <Table
                  stickyHeader
                  sx={{ minWidth: 750 }}
                  size='small'
                  aria-label='a dense table'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>MLS</TableCell>
                      <TableCell>API</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>Broker Remarks</TableCell>
                      <TableCell>Private Remarks</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>Intrnt Remarks</TableCell>
                      <TableCell>Syndication Remarks</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>Remarks</TableCell>
                      <TableCell>Public Remarks</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Box>
      </div>
      {renderExportButton()}
      <Box sx={{ width: "100%" }}>{isLoading && <LinearProgress />}</Box>
      <Card>
        <CardContent>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 500 }}
            elevation={0}
          >
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              size='small'
              aria-label='a dense table'
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => sortListingByProperty("DaysOnMarket")}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      DOM
                      {orderProperty === "DaysOnMarket" && (
                        <span>
                          {isAscending ? (
                            <ArrowUpward style={{ fontSize: "12px" }} />
                          ) : (
                            <ArrowDownward style={{ fontSize: "12px" }} />
                          )}
                        </span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => sortListingByProperty("ListPrice")}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      List Price
                      {orderProperty === "ListPrice" && (
                        <span>
                          {isAscending ? (
                            <ArrowUpward style={{ fontSize: "12px" }} />
                          ) : (
                            <ArrowDownward style={{ fontSize: "12px" }} />
                          )}
                        </span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>Agent Name</TableCell>
                  <TableCell>Agent Direct Phone</TableCell>
                  <TableCell>Agent Office Phone</TableCell>
                  <TableCell>List Agent Email</TableCell>
                  <TableCell>Listing Id</TableCell>
                  <TableCell>Building Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {properties.length ? (
                  properties.map((property, index) => {
                    {
                      if (properties.length === index + 1) {
                        return (
                          <TableRow
                            style={{ cursor: "pointer" }}
                            ref={lastPropertyRef}
                            key={Math.random()}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>{property.DaysOnMarket}</TableCell>
                            <TableCell
                              onClick={() => selectMapProperty(property)}
                            >
                              {property.UnparsedAddress}
                            </TableCell>
                            <TableCell onClick={() => selectProperty(property)}>
                              {formatMoney.format(property.ListPrice)}
                            </TableCell>
                            <TableCell>
                              <span>{property.ListAgentFullName}</span>
                            </TableCell>
                            <TableCell>
                              <span style={{ whiteSpace: "nowrap" }}>
                                {property.ListAgentDirectPhone}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span style={{ whiteSpace: "nowrap" }}>
                                {property.ListAgentOfficePhone}
                              </span>
                            </TableCell>
                            <TableCell>{property.ListAgentEmail}</TableCell>
                            <TableCell>{property.ListingId}</TableCell>
                            <TableCell
                              onClick={() => selectProperty(property)}
                              component='th'
                              scope='row'
                            >
                              {property.BuildingName}
                            </TableCell>
                          </TableRow>
                        );
                      } else {
                        return (
                          <TableRow
                            style={{ cursor: "pointer" }}
                            key={Math.random()}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>{property.DaysOnMarket}</TableCell>
                            <TableCell
                              onClick={() => selectMapProperty(property)}
                            >
                              {property.UnparsedAddress}
                            </TableCell>
                            <TableCell onClick={() => selectProperty(property)}>
                              {formatMoney.format(property.ListPrice)}
                            </TableCell>
                            <TableCell>
                              <span>{property.ListAgentFullName}</span>
                            </TableCell>
                            <TableCell>
                              <a href={`tel:${property.ListAgentDirectPhone}`}>
                                <span style={{ whiteSpace: "nowrap" }}>
                                  {property.ListAgentDirectPhone}
                                </span>
                              </a>
                            </TableCell>
                            <TableCell>
                              <a href={`tel:${property.ListAgentOfficePhone}`}>
                                <span style={{ whiteSpace: "nowrap" }}>
                                  {property.ListAgentOfficePhone}
                                </span>
                              </a>
                            </TableCell>
                            <TableCell>
                              <a href={`mailto:${property.ListAgentEmail}`}>
                                <span style={{ whiteSpace: "nowrap" }}>
                                  {property.ListAgentEmail}
                                </span>
                              </a>
                            </TableCell>
                            <TableCell>{property.ListingId}</TableCell>
                            <TableCell
                              component='th'
                              scope='row'
                              onClick={() => selectProperty(property)}
                            >
                              {property.BuildingName}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    }
                  })
                ) : (
                  <TableRow>
                    <TableCell>No listing found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: "15px",
        }}
      >
        {properties.length > 0 && (
          <span>
            {properties.length} of{" "}
            {total < properties.length ? properties.length : total}
          </span>
        )}
      </Box>
      <Popup
        open={open}
        handleClose={() => setIsOpen(false)}
        property={propertySelected}
      />
      <MapView properties={properties} selectedProperty={mapProperty} />
    </div>
  );
};

export default HomePage;
