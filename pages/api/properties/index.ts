import type { NextApiRequest, NextApiResponse } from "next";
import { BridgeResponse } from '../../../interfaces/bridge-response.interface';
import { ISearchPostData } from '../../../interfaces/search-post-data.interface';
import { IInputValue } from '../../../interfaces/input-interface';

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
  const { inputList, page }: ISearchPostData = req.body;
  let url = "";
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

  if (filterList.length) {
    url = `${process.env.MIAMIRE_API_URL}/Properties?access_token=${
      process.env.MLS_SERVER_TOKEN
    }&$top=200&$filter=StandardStatus eq 'Active' and ${filterList}&$skip=${
      200 * page
    }`;
  } else {
    url = `${process.env.MIAMIRE_API_URL}/Properties?access_token=${
      process.env.MLS_SERVER_TOKEN
    }&$top=200&$filter=StandardStatus eq 'Active'&$skip=${200 * page}`;
  }

  const properties: BridgeResponse = await fetch(url).then((response) => response.json());

  res.status(200).json({ ...properties });
};
