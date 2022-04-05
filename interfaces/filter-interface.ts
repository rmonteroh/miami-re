import { IInputValue } from './input-interface';
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
}