import { NewPatientEntry, Gender, Entry } from './types';

//Validation for Gender fields
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {      
      throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

//Validation for string fields
const parseString = (element: unknown): string => {
    if (!element || !isString(element)) {
      throw new Error('Incorrect or missing data');
    }
    return element;
};

//Validation for arrays
// const parseArray = (array: unknown): Entry [] => {
//   if (!Array.isArray(array) || !array) {
//     throw new Error('Incorrect or missing data');
//   }
  /* eslint-disable @typescript-eslint/no-unsafe-return */
//   return array;
// };

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, type: unknown };
export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseString(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  };
  return newEntry;
};

type NewEntryFields = { description: unknown, date: unknown, specialist: unknown };
export const checkNewEntry = ({ description, date, specialist } : NewEntryFields) => {
  console.log(description, date, specialist);
  const newEntry: Entry = {
    description: parseString(description),
    date: parseString(date),
    specialist: parseString(specialist),
    type: "Hospital"
  };
  return newEntry;
};