export enum Mark {
  Irrelevant,
  Relevant,
  Favorite
}

export interface CityData {
  number: number;
  name: string;
  points: number | null;
  taxReturnRate: number;
  maxSalaryAmount: number;
  mark: Mark;
  data: {
    geojson: {
      type: any;
      coordinates: any;
    }
  }
}