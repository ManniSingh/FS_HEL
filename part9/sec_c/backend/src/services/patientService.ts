import data from "../data/patients";
import { Patient, CuratedPatient, newPatient } from "../types";
import { v1 as uuid } from "uuid";

const patientData: Patient[] = data as Patient[];

const getCuratedEntries = (): CuratedPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getEntries = ():Patient[] => {
  return patientData;
};

const addPatient = (input: newPatient): Patient => {
  const id: string = uuid();
  const patientInput = { id: id, ...input };
  patientData.push(patientInput);
  return patientInput;
};


export default {
  getEntries,
  getCuratedEntries,
  addPatient
};