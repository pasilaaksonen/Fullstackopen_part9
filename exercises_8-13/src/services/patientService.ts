import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientsWithoutSsn, PatientEntry, NewPatientEntry } from '../types';

const getPatients = (): PatientsWithoutSsn[] => {  
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {

  const newPatientEntry = {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    id: uuid(),
    ...entry  
  };
  
  patients.push(newPatientEntry);
  return newPatientEntry;
  };

export default {
    getPatients,
    addPatient
};