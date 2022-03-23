import { IInputValue } from './input-interface';
import { IFiltersState } from './filter-interface';

export interface ISearchPostData {
  inputList: IInputValue[];
  page: number;
  filters: IFiltersState
}
