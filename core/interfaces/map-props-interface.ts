import { PropertyData } from './bridge-response.interface';

export interface MapProps {
  properties: PropertyData[];
  selectedProperty: PropertyData | null;
  isLoading: boolean
}