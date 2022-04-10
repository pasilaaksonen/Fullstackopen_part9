import diagnoses from '../data/diagnoses';
import { DiagnoseWithoutLatin, DiagnoseEntry } from '../types';

const getDiagnoses = (): Array<DiagnoseEntry> => {  
    return diagnoses;
};

const getDiagnosesWithoutLatins = (): DiagnoseWithoutLatin[] => {  
    return diagnoses.map(({ code, name }) => ({    
      code,
      name 
    }));
};

export default {
    getDiagnoses,
    getDiagnosesWithoutLatins
};