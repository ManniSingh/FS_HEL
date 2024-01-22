import { Visibility, Weather } from "../Types";

export const parseWeather = (value: string) => {
    if (!Object.values(Weather).includes(value as Weather)) {
      throw new Error(`Invalid value for weather. `);
    }
    return value as Weather;
  };
  
export const parseVisibility = (value: string) => {
    if (!Object.values(Visibility).includes(value as Visibility)) {
      throw new Error(`Invalid value for visibility. `);
    }
    return value as Visibility;
  };