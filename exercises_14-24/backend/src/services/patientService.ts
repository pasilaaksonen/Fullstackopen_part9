import  patientEntries  from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NewPatientEntry, PublicPatient, Entry } from '../types';


const getPatient = (id: string): PublicPatient => {

  const patient: Patient[] = patientEntries.filter(patient => patient.id === id);

  const showPatient: PublicPatient = {
    ...patient[0]
  };

  return showPatient;
};

const getPatients = (): PublicPatient[] => {  
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({    
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
      ssn
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    id: uuid(),
    entries: [],
    ...entry  
  };
  
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntry = ( entry: Entry, id: string ) => {
  const newPatientEntry = {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    id: uuid(),
    ...entry  
  };

  const patientDatatoUpdate = patientEntries.filter(patient => patient.id === id);
  if (!patientDatatoUpdate[0].entries) {
    throw new Error('Data is empty');
  } else {
    patientDatatoUpdate[0].entries.push(newPatientEntry);
    const index = patientEntries.findIndex(patient => patient.id === id);
    patientEntries.splice(index, 1);
    patientEntries.push(patientDatatoUpdate[0]);
  }
  
  return newPatientEntry;
};

export default {
    getPatient,
    getPatients,
    addPatient,
    addNewEntry
};