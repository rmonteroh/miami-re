import type { NextApiRequest, NextApiResponse } from "next";
import { FilterUrlBuilder } from "../../../core/builders";
import { ModifiersType, OperatorsType } from "../../../core/enums";
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
  } = filters;
  const baseUrl = `${process.env.MIAMIRE_API_URL}/Properties?access_token=${
    process.env.MLS_SERVER_TOKEN
  }`;
  // Max value permitted by bridge api
  const maxValuesPerRequest = 200;
  const propertyUrlBuilder = new FilterUrlBuilder();
  const searchCriteria = getSearchQuery(filters.inputList);

  const filterUrl: string = propertyUrlBuilder
    .equalsTo('StandardStatus', 'Active')
    .greaterThanOrEquals('ListPrice', minPrice)
    .lessThanOrEquals('ListPrice', maxPrice)
    .greaterThanOrEquals('BedroomsTotal', (bedrooms && bedrooms !== 'any') ? parseFloat(bedrooms) : 0)
    .greaterThanOrEquals('BathroomsTotalDecimal', (bathrooms && bathrooms !== 'any') ? parseFloat(bathrooms) : 0)
    .orContains('PropertyType', homeTypes)
    .equalsTo('City', city.toLowerCase())
    .equalsTo('PostalCode', postalCode)
    .orContains('PublicRemarks', searchCriteria)
    .orContains('PrivateRemarks', searchCriteria)
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
    if (search.inputValue !== '') {
      searchCriteria.push(search.inputValue);
    }
  }

  return searchCriteria;
};
