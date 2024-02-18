import express, { Request, Response } from "express";
import { CreatePatient, LoginPatient } from "../controllers/patientControllers";

const router = express.Router();

router.post("/create", CreatePatient);
router.post("/login", LoginPatient);

export  {router};
