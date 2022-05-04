import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, checkNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (_req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const id: string = _req.params.id;
  res.send(patientService.getPatient(id));
});

router.post('/', (_req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(_req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);    
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (_req, res) => {
  try {
    const id: string = _req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const checkedPatientEntry = checkNewEntry(_req.body);
    const newPatientEntry = patientService.addNewEntry(checkedPatientEntry,id);    
    res.json(newPatientEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;