import type { NextApiRequest, NextApiResponse } from "next";
import { BridgeResponse } from '../../../interfaces/bridge-response.interface';
import { ISearchPostData } from '../../../interfaces/search-post-data.interface';
import { IInputValue } from '../../../interfaces/input-interface';
import { IFiltersState } from "../../../interfaces";

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
  const { inputList, page, filters }: ISearchPostData = req.body;
  console.log('page', page);
  
  let url = "";
  const filterList: string = createSearchQuery(inputList);
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
    }&$top=200&$filter=StandardStatus eq 'Active' and ${filterQuery}&$skip=${200 * page}`;
  }
 // console.log('url', url);
 
  const properties: BridgeResponse = await fetch(url).then((response) => response.json());

  res.status(200).json({ ...properties });
};

const createSearchQuery = (inputList: IInputValue[]): string => {
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
}

const createFilterQuery = (filters: IFiltersState): string => {
  let filterQuery = '';
  let homeQuery = '';
  const { bathrooms, bedrooms, minPrice, maxPrice, homeTypes, category, city, postalCode } = filters;
  const minPriceQuery: string = `ListPrice ge ${minPrice || 0}`;
  const maxPriceQuery: string = `ListPrice le ${maxPrice }`;
  const bathroomsQuery: string = `${bathrooms === 'any' ? '' : 'BathroomsTotalDecimal ge '+ parseFloat(bathrooms)}`;
  const bedroomsQuery: string = `${bedrooms === 'any' ? '' : 'BedroomsTotal ge '+ parseFloat(bedrooms)}`;
  const cityQuery: string = `${city === '' ? '' : `tolower(City) eq '${city.toLowerCase()}'`}`;
  const codeQuery: string = `${postalCode === '' ? '' : `tolower(PostalCode) eq '${postalCode}'`}`;

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
        homeQuery = homeQuery.concat(`StructureType/any(a: contains(a, '${type}'))`);
      } else {
        homeQuery = homeQuery.concat(` or StructureType/any(a: contains(a, '${type}'))`);
      }
    })
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
}
