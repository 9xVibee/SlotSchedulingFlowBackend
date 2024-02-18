import express, { Request, Response } from "express";
import {
  createPhysio,
  getAllSlotsPhysio,
  loginPhysio,
  requestSlot,
} from "../controllers/physioController";
// import { CreatePatient, LoginPatient } from "../controllers/patientControllers";

const router = express.Router();

router.post("/create", createPhysio);
router.post("/login", loginPhysio);
router.post("/slots", requestSlot);
router.post("/getallslots", getAllSlotsPhysio);

export { router };
