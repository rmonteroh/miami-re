import { IInputValue } from './input-interface';
import { IFiltersState } from './filter-interface';

export interface ISearchPostData {
  page: number;
  filters: IFiltersState
}
