import React, { createContext } from 'react'
import { IFiltersState } from '../../interfaces/filter-interface';

export type FilterContentProps = {
  filterState: IFiltersState;
  setCategory: (id: string) => void;
  setMinPrice: (id: number) => void;
  setMaxPrice: (id: number) => void;
  setBathrooms: (id: string) => void;
  setBedrooms: (id: string) => void;
  setHomeTypes: (id: string[]) => void;
  setFilters: () => void;
}

export const FilterContext = createContext<FilterContentProps>({} as FilterContentProps);
