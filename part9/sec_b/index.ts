import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    //console.log(req.body);
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    try {
      const bmi = calculateBmi(height, weight);
      const bmiResponse = { height: height, weight: weight, bmi: bmi };
      res.status(200).send(bmiResponse);
    } catch(error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send(error.message);
    }
  });

app.post("/exercises", (req, res) => {
    console.log(req.body);
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const results = calculateExercise(req.body);
        res.status(200).send(results);
    }catch(error){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }
  });
  

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});