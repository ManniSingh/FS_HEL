import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getCuratedEntries());
});

router.post("/", (req, res) => {
    const newPatientRecord = toNewPatient(req.body);
    const newEntry = patientService.addPatient(newPatientRecord);
    res.json(newEntry);
});

export default router;