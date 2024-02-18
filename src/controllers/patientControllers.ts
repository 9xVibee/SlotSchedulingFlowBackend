import { Patient } from "./../db/index.js";
import { Request, Response } from "express";

// create patient
const CreatePatient = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const patient = await Patient.create({
    name,
    password,
    email,
    role: "patient",
  });

  res.status(200).json({
    patient,
  });
};

// login patient
const LoginPatient = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const patient = await Patient.findOne({
    email,
  });

  if (!patient) {
    return res.status(500).json({
      message: "Patient not found with this email",
    });
  }

  if (patient.password !== password) {
    return res.status(500).json({
      message: "Password is wrong",
    });
  }

  res.status(200).json({
    user: patient,
    message: "Login successfull",
  });
};

export { CreatePatient, LoginPatient };
