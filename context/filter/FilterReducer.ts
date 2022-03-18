 import React from 'react'
import { IFiltersState } from '../../interfaces/filter-interface';

type FilterAction =
  | {type: 'setCategory', payload: string}
  | {type: 'setBedrooms', payload: string}
  | {type: 'setBathrooms', payload: string}
  | {type: 'setHomeType', payload: string[]}
  | {type: 'setMinPrice', payload: number}
  | {type: 'setMaxPrice', payload: number}
 
 const FilterReducer = (state: IFiltersState, action: FilterAction): IFiltersState => {

   switch (action.type) {
     case 'setCategory':
       return {
         ...state,
         category: action.payload
       }
     case 'setBedrooms':
       return {
         ...state,
         bedrooms: action.payload
       }
     case 'setBathrooms':
       return {
         ...state,
         bathrooms: action.payload
       }
     case 'setHomeType':
       return {
         ...state,
         homeTypes: action.payload
       }
     case 'setMinPrice':
       return {
         ...state,
         minPrice: action.payload
       }
     case 'setMaxPrice':
       return {
         ...state,
         maxPrice: action.payload
       }
   
     default:
       return state;
   }
 }
 
 export default FilterReducer