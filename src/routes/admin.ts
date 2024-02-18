import express, { Request, Response } from "express";
import { allocateSlot, createAdmin, loginAdmin } from "../controllers/adminController";

const router = express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.post('/slot/:slotId', allocateSlot)


export  {router};
