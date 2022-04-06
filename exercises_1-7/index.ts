import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, _res) => {
  _res.send('Hello Full Stack!');
});

app.get('/bmi?', (_req, _res) => {
    if (_req.query.weight && _req.query.height && !isNaN(parseInt(_req.query.weight as string)) && !isNaN(parseInt(_req.query.height as string))) {
        const result = calculateBmi(parseInt(_req.query.weight as string),parseInt(_req.query.height as string));
        const resultObject = {
            weight: _req.query.weight,
            height: _req.query.height,
            bmi: result 
        };
        _res.send(resultObject);
    } else {
        _res.send({error: "malformatted parameters"});
    }
});

app.post('/exercises', (_req, _res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = _req.body;
  if (!daily_exercises || !target) {
    _res.send({
      error: "parameters missing"
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  else if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(target)) {
    _res.send(({
      error: "malformatted parameters"
    }));
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    _res.send(calculateExercises(daily_exercises,target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});