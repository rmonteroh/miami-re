import type { NextApiRequest, NextApiResponse } from "next";
import { FilterUrlBuilder } from "../../../core/builders";
import { AndOrOperatorType, LessThanType } from "../../../core/enums";
import {
  BridgeResponse,
  IFiltersState,
  IInputValue,
  ISearchPostData,
} from "../../../core/interfaces";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return filterProperties(req, res);

    default:
      return res.status(400).json({ message: "Invalid endpoint" });
  }
}

const filterProperties = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, filters }: ISearchPostData = req.body;
  const {
    bathrooms,
    bedrooms,
    minPrice,
    maxPrice,
    homeTypes,
    city,
    postalCode,
    dom: { operator, days },
  } = filters;
  const baseUrl = `${process.env.MIAMIRE_API_URL}/Properties?access_token=${process.env.MLS_SERVER_TOKEN}`;
  // Max value permitted by bridge api
  const maxValuesPerRequest = 200;
  const propertyUrlBuilder = new FilterUrlBuilder();
  const searchProperties: string[] = ["PublicRemarks", "PrivateRemarks"];
  const searchCriteria: string[] = getSearchQuery(filters.inputList);
  const formattedBedrooms =
    bedrooms && bedrooms !== "any" ? parseFloat(bedrooms) : 0;
  const formattedBathrooms =
    bathrooms && bathrooms !== "any" ? parseFloat(bathrooms) : 0;

  propertyUrlBuilder
    .equalsTo("StandardStatus", "Active")
    .greaterThanOrEquals("ListPrice", minPrice)
    .lessThanOrEquals("ListPrice", maxPrice)
    .greaterThanOrEquals("BedroomsTotal", formattedBedrooms)
    .greaterThanOrEquals("BathroomsTotalDecimal", formattedBathrooms)
    .orContains("PropertyType", homeTypes)
    .equalsTo("City", city)
    .equalsTo("PostalCode", postalCode)
    .propertiesContains(searchProperties, searchCriteria, AndOrOperatorType.Or);

  if (days !== 0) {
    operator === LessThanType.More
      ? propertyUrlBuilder.greaterThanOrEquals("DaysOnMarket", days)
      : propertyUrlBuilder.lessThanOrEquals("DaysOnMarket", days);
  }

  /**
   * Example of filter builder result
   * $filter=tolower(StandardStatus) eq 'active' and ListPrice ge 3000000 and ListPrice le 120000000 and contains(tolower(PropertyType),'residential') and
   *  tolower(City) eq 'miami' and tolower(PostalCode) eq '33127' and (contains(tolower(PublicRemarks),'tlc') or contains(tolower(PublicRemarks),'investment') or
   *  contains(tolower(PrivateRemarks),'tlc') or contains(tolower(PrivateRemarks),'investment'))&$top=200&$skip=0
   */
  const filterUrl: string = propertyUrlBuilder
    .setResultsSize(maxValuesPerRequest)
    .setSkipResults(maxValuesPerRequest * page)
    .build();

  const properties: BridgeResponse = await fetch(`${baseUrl}&${filterUrl}`)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);

      return res.status(500);
    });

  res.status(200).json({ ...properties });
};

const getSearchQuery = (searchValue: IInputValue[]) => {
  const searchCriteria: string[] = [];
  for (const search of searchValue) {
    if (search.inputValue !== "") {
      searchCriteria.push(search.inputValue);
    }
  }

  return searchCriteria;
};
