export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

//type Gender = 'male' | 'female' | 'other';
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
export type CuratedPatient = Omit<Patient, "ssn">;
export type newPatient = Omit<Patient, "id">;
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}




















  