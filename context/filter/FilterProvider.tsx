import React, { useReducer } from "react";
import { FilterContext } from "./FilterContext";
import FilterReducer from "./FilterReducer";
import { toast } from "react-toastify";
import { IFiltersState, IInputValue } from "../../core/interfaces";
import { IDom } from '../../core/interfaces/dom-interface';
import { LessThanType } from "../../core/enums";

const INITIAL_STATE: IFiltersState = {
  category: "sale",
  bedrooms: "any",
  bathrooms: "any",
  homeTypes: [],
  minPrice: 0,
  maxPrice: 0,
  city: "",
  postalCode: "",
  inputList: [{ inputValue: "" }],
  dom: {
    operator: LessThanType.More,
    days: 0
  },
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

const FilterProvider = ({ children }: Props) => {
  const [filterState, dispatch] = useReducer(FilterReducer, INITIAL_STATE);
  const setCategory = (category: string) => {
    dispatch({ type: "setCategory", payload: category });
  };

  const setMinPrice = (min: number) => {
    dispatch({ type: "setMinPrice", payload: min });
  };

  const setMaxPrice = (max: number) => {
    dispatch({ type: "setMaxPrice", payload: max });
  };

  const setBathrooms = (bath: string) => {
    dispatch({ type: "setBathrooms", payload: bath });
  };

  const setBedrooms = (bed: string) => {
    dispatch({ type: "setBedrooms", payload: bed });
  };

  const setHomeTypes = (homeTypes: string[]) => {
    dispatch({ type: "setHomeType", payload: homeTypes });
  };

  const setCityTypes = (city: string) => {
    dispatch({ type: "setCityType", payload: city });
  };

  const setPostalCode = (code: string) => {
    dispatch({ type: "setPostalCode", payload: code });
  };

  const setFilters = () => {
    dispatch({ type: "resetFilters" });
    toast.info("Filters were removed");
  };

  const setInputList = (inputList: IInputValue[]) => {
    dispatch({ type: "setInputList", payload: inputList });
  };

  const setDOM = (dom: IDom) => {
    dispatch({ type: "setDom", payload: dom });
  };

  return (
    <FilterContext.Provider
      value={{
        filterState,
        setCategory,
        setMinPrice,
        setMaxPrice,
        setBathrooms,
        setBedrooms,
        setHomeTypes,
        setFilters,
        setCityTypes,
        setPostalCode,
        setInputList,
        setDOM,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
