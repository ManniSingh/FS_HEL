import { newPatient, Gender } from "./types";

const isString = (text: unknown): boolean => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (text: unknown): string => {
    if (!isString(text)) {
      throw new Error("Not a string type!");
    }
    return text as string;
};

const isGender = (param: string): boolean => {
    return Object.values(Gender).map((v) => v.toString()).includes(param);
}; 
export const parseGender = (gender: unknown): Gender => {
    if (!isString(gender)){
        throw new Error("Gender is not string: " + gender); 
    } else if (!isGender(gender as string)) {
        throw new Error("Gender is not acceptable: " + gender);
    }
    return gender as Gender;
};

const toNewPatient = (object: unknown): newPatient => {
    if (!object || typeof object !== "object") {
      throw new Error("Incorrect or missing datatype");
    }
    if (
      "name" in object &&
      "dateOfBirth" in object &&
      "gender" in object &&
      "occupation" in object &&
      "ssn" in object
    ) {
      const newEntry: newPatient = {
        name: parseString(object.name),
        ssn: parseString(object.ssn),
        dateOfBirth: parseString(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
      };
      return newEntry;
    }
    throw new Error("Incorrect data entered");
};

export default toNewPatient;


