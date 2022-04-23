 import React from 'react'
import { IFiltersState, IInputValue } from '../../core/interfaces'

type FilterAction =
  | {type: 'setCategory', payload: string}
  | {type: 'setBedrooms', payload: string}
  | {type: 'setBathrooms', payload: string}
  | {type: 'setHomeType', payload: string[]}
  | {type: 'setMinPrice', payload: number}
  | {type: 'setMaxPrice', payload: number}
  | {type: 'setCityType', payload: string}
  | {type: 'setPostalCode', payload: string}
  | {type: 'setInputList', payload: IInputValue[]}
  | {type: 'resetFilters'}
 
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
     case 'setPostalCode':
       return {
         ...state,
         postalCode: action.payload
       }
     case 'setCityType':
       return {
         ...state,
         city: action.payload
       }
     case 'setInputList':
       return {
         ...state,
         inputList: action.payload
       }
     case 'resetFilters':
       return {
          category: 'sale',
          bedrooms: 'any',
          bathrooms: 'any',
          homeTypes: [],
          minPrice: 0,
          maxPrice: 0,
          city: '',
          postalCode: '',
          inputList: [{ inputValue: "" }],
       }
   
     default:
       return state;
   }
 }
 
 export default FilterReducer