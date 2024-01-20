import data from "../data/diagnosis";
import { Diagnosis } from "../types";

const getEntries = ():Diagnosis[] => {
  return data;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
};