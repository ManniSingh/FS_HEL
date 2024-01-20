import express from 'express';
const app = express();
app.use(express.json());
import cors from 'cors';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

import diagnosesRouter from "./src/routes/diagnoses";
import patientsRouter from "./src/routes/patients";

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});