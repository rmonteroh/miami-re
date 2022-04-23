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

console.log('searchCriteria', searchCriteria);

  const filterUrl: string = propertyUrlBuilder.equalsTo('StandardStatus', 'Active')
    .greaterThanOrEquals('ListPrice', minPrice)
    .lessThanOrEquals('ListPrice', maxPrice)
    .greaterThanOrEquals('BedroomsTotal', (bedrooms && bedrooms !== 'any') ? parseFloat(bedrooms) : 0)
    .greaterThanOrEquals('BathroomsTotalDecimal', (bathrooms && bathrooms !== 'any') ? parseFloat(bathrooms) : 0)
    .orContains('PropertyType', homeTypes)
    //.comparedWithModifier('City', ModifiersType.Lowercase, OperatorsType.Equal, city.toLowerCase())
    .equalsTo('City', city.toLowerCase())
    .equalsTo('PostalCode', postalCode)
    .orContains('PublicRemarks', searchCriteria)
    .orContains('PrivateRemarks', searchCriteria)
    .setResultsSize(maxValuesPerRequest)
    .setSkipResults(maxValuesPerRequest * page)
    .build();

console.log('filterUrl', `${baseUrl}&${filterUrl}`);

/* return res.status(200).json({}); */


 /*  let url = "";
  const filterList: string = createSearchQuery(filters.inputList);
  const filterQuery: string = createFilterQuery(filters);

  if (filterList.length) {
    url = `${process.env.MIAMIRE_API_URL}/Properties?access_token=${
      process.env.MLS_SERVER_TOKEN
    }&$top=200&$filter=StandardStatus eq 'Active' and ${filterQuery} and ${filterList}&$skip=${
      200 * page
    }`;
  } else {
    url = `${process.env.MIAMIRE_API_URL}/Properties?access_token=${
      process.env.MLS_SERVER_TOKEN
    }&$top=200&$filter=StandardStatus eq 'Active' and ${filterQuery}&$skip=${
      200 * page
    }`;
  } */

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

/* const createSearchQuery = (inputList: IInputValue[]): string => {
  let filterList = "";

  inputList.map((searchValue: IInputValue) => {
    if (searchValue.inputValue) {
      if (!filterList.length) {
        filterList = filterList.concat(
          `contains(tolower(PublicRemarks),'${searchValue.inputValue.toLowerCase()}') or contains(tolower(PrivateRemarks),'${searchValue.inputValue.toLowerCase()}') or contains(tolower(SyndicationRemarks),'${searchValue.inputValue.toLowerCase()}')`
        );
      } else {
        filterList = filterList.concat(
          ` or contains(tolower(PublicRemarks),'${searchValue.inputValue.toLowerCase()}') or contains(tolower(PrivateRemarks),'${searchValue.inputValue.toLowerCase()}') or contains(tolower(SyndicationRemarks),'${searchValue.inputValue.toLowerCase()}')`
        );
      }
    }
  });

  return filterList;
}; */
/* 
const createFilterQuery = (filters: IFiltersState): string => {
  let filterQuery = "";
  let homeQuery = "";
  const {
    bathrooms,
    bedrooms,
    minPrice,
    maxPrice,
    homeTypes,
    category,
    city,
    postalCode,
  } = filters;
  const minPriceQuery: string = `ListPrice ge ${minPrice || 0}`;
  const maxPriceQuery: string = `ListPrice le ${maxPrice}`;
  const bathroomsQuery: string = `${
    bathrooms === "any"
      ? ""
      : "BathroomsTotalDecimal ge " + parseFloat(bathrooms)
  }`;
  const bedroomsQuery: string = `${
    bedrooms === "any" ? "" : "BedroomsTotal ge " + parseFloat(bedrooms)
  }`;
  const cityQuery: string = `${
    city === "" ? "" : `tolower(City) eq '${city.toLowerCase()}'`
  }`;
  const codeQuery: string = `${
    postalCode === "" ? "" : `tolower(PostalCode) eq '${postalCode}'`
  }`;

  filterQuery = filterQuery.concat(minPriceQuery);

  if (maxPrice && maxPrice > minPrice) {
    filterQuery = filterQuery.concat(` and ${maxPriceQuery}`);
  }

  if (bathroomsQuery.length) {
    filterQuery = filterQuery.concat(` and ${bathroomsQuery}`);
  }

  if (bedroomsQuery.length) {
    filterQuery = filterQuery.concat(` and ${bedroomsQuery}`);
  }

  if (homeTypes.length) {
    homeTypes.map((type: string) => {
      if (!homeQuery.length) {
        homeQuery = homeQuery.concat(
          `contains(tolower(PropertyType),'${type.toLowerCase()}')`
        );
      } else {
        homeQuery = homeQuery.concat(
          ` or contains(tolower(PropertyType),'${type.toLowerCase()}')`
        );
      }
    });
  }

  if (homeQuery.length) {
    filterQuery = filterQuery.concat(` and ${homeQuery}`);
  }

  if (city.length) {
    filterQuery = filterQuery.concat(` and ${cityQuery}`);
  }

  if (postalCode.length) {
    filterQuery = filterQuery.concat(` and ${codeQuery}`);
  }

  return filterQuery;
}; */
