import { IInputValue } from './input-interface';
import { IDom } from './dom-interface';
export interface IFiltersState {
  category: string;
  bedrooms: string;
  bathrooms: string;
  homeTypes: string[];
  minPrice: number;
  maxPrice: number;
  city: string;
  postalCode: string;
  inputList: IInputValue[];
  dom: IDom;
}