import { State } from "./state";
import { Patient, DiagnoseEntry } from "../types";

export const setPatientList = (patients: Patient[]): Action => (
    {
      type: 'SET_PATIENT_LIST',
      payload: patients
    }
);

export const setDiagnoseList = (diagnoses: DiagnoseEntry[]): Action => (
  {
    type: 'SET_DIAGNOSE_LIST',
    payload: diagnoses
  }
);

export const addNewPatient = (patient: Patient): Action => (
  {
    type: 'ADD_PATIENT',
    payload: patient
  }
);

export const updatePatient = (patient: Patient): Action => {
  return { type: "UPDATE_PATIENT", payload: patient };
};

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_DIAGNOSE_LIST";
    payload: DiagnoseEntry[];
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
      case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};
