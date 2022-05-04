export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]; 
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "Hospital";
    discharge: DischargeField;
}

export interface HospitalEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeaveField;
}

export interface SickLeaveField {
    startDate: string;
    endDate: string;
}

export interface DischargeField {
    date: string;
    criteria: string;
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface CombinedDiagnose {
  code: string;
  name: string;
}

export interface BaseEntry {
  id?: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

