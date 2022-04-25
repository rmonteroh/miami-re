import React, { createContext } from 'react'
import { IFiltersState, IInputValue } from '../../core/interfaces';
import { IDom } from '../../core/interfaces/dom-interface';

export type FilterContentProps = {
  filterState: IFiltersState;
  setCategory: (id: string) => void;
  setMinPrice: (id: number) => void;
  setMaxPrice: (id: number) => void;
  setBathrooms: (id: string) => void;
  setBedrooms: (id: string) => void;
  setHomeTypes: (id: string[]) => void;
  setCityTypes: (id: string) => void;
  setPostalCode: (id: string) => void;
  setFilters: () => void;
  setInputList: (list: IInputValue[]) => void;
  setDOM: (id: IDom) => void;
}

export const FilterContext = createContext<FilterContentProps>({} as FilterContentProps);
