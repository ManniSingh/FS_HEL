import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    console.log(req.body);
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    try {
      const bmi = calculateBmi(height, weight);
      const bmiResponse = { height: height, weight: weight, bmi: bmi };
      res.status(200).send(bmiResponse);
    } catch(error) {
      res.status(400).send(error.message);
    }
  });
  

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});