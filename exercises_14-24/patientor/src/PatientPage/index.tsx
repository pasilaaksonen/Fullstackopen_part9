import React from 'react';
import { useParams } from "react-router-dom";
import { useStateValue, updatePatient } from "../state";
import axios from "axios";
import { Patient, Gender, Entry, DiagnoseEntry } from '../types';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import HealthCheckEntry from "../components/HealthCheckEntry";
import OccupationalEntry from "../components/OccupationalEntry";
import { Button } from "@material-ui/core";
import AddEntryModal from '../AddEntryModal';
import { apiBaseUrl } from "../constants";

// const diagnoseCodeAndDesc = (diagnose: string, codes: Array<DiagnoseEntry>): string => {
//     let diagnoseFull = '';
//     codes.forEach((code: DiagnoseEntry) => {
//         if (diagnose === code.code) {
//             diagnoseFull = `${diagnose} ${code.name} `;
//         }
//     });
//     return diagnoseFull;
// };

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    console.log(entry);
    switch (entry.type) {
        case "Hospital":
            return <HealthCheckEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const PatientPage = () => {
    // const [diagnoseCodesWithNames, setDiagnoseCodesWithNames] = React.useState<DiagnoseEntry[]>([]);
    const [displayedPatient, setDisplayedPatient] = React.useState<Patient>({
        id: "none",
        name: "empty",
        occupation: "empty",
        gender: Gender.Other,
        dateOfBirth: "empty",
        entries: []
    });
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
          const { data: newEntry } = await axios.post<EntryFormValues>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions  
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          const patientToUpdate = displayedPatient;
          patientToUpdate.entries.push(newEntry);
          setDisplayedPatient(patientToUpdate);
          dispatch(updatePatient(patientToUpdate));
          console.log(newEntry);
          closeModal();
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
    };

    React.useEffect(() => {
        const newArray: Array<DiagnoseEntry> = [];
        Object.values(patients).map((patient: Patient) => {
            if (patient.id === id) {
                setDisplayedPatient(patient); 
            } 
        });
        Object.values(diagnoses).forEach((diagnose: DiagnoseEntry) => {  
            newArray.push({
                code: diagnose.code,
                name: diagnose.name
            });
        });
    }, []);

    return (
        <>
            <h1>{displayedPatient.name}</h1>
            <p>ssh: {displayedPatient.ssn}</p>
            <p>occupation: {displayedPatient.occupation}</p>
            <h2>Entries</h2>
            {
               Object.values(displayedPatient.entries).map((entry: Entry, index) => (
                <div key={index}>
                    <EntryDetails entry={entry}/>
                </div>
            ))}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </>
    );
};

export default PatientPage;