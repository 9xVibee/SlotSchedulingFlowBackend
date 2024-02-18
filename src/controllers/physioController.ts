import { Request, Response } from "express";
import { Admin, Patient, Physio, Slots } from "../db";
import { AdminType, PhysioType, SlotsType } from "../types";

export const createPhysio = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const physio = await Physio.create({
    name,
    password,
    email,
    role: "physio",
  });

  res.status(200).json({
    physio,
  });
};

// login patient
export const loginPhysio = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const physio: PhysioType | null = await Physio.findOne({
    email: email,
  });

  if (!physio) {
    return res.status(500).json({
      message: "Physio not found with this email",
    });
  }

  if (physio.password !== password) {
    return res.status(500).json({
      message: "Password is wrong",
    });
  }

  res.status(200).json({
    user: physio,
    message: "Login successfull",
  });
};

export const requestSlot = async (req: Request, res: Response) => {
  const {
    date,
    weekStart,
    weekEnd,
    slotStartTime,
    email,
    day,
    slotEndTime,
    remark,
  } = req.body;
  console.log(day);

  if (!date && !slotStartTime) {
    return res.status(400).json({
      message: "Please provide date and slot time",
    });
  }

  const physio = await Physio.findOne({ email });

  let slot = await Slots.findOne({
    createdBy: physio._id,
    $and: [
      { day: day },
      {
        slotStartTime: { $lte: slotStartTime },
      },
      { slotEndTime: { $gt: slotStartTime } },
    ],
  });

  if (slot) {
    return res.status(500).json({
      message: "Slots is occupied",
    });
  }

  slot = await Slots.create({
    physioName: physio.name,
    createdBy: physio._id,
    weekStart,
    weekEnd,
    date,
    day,
    slotStartTime,
    slotEndTime,
    remark,
  });

  res.status(200).json({
    message: "Request submitted successfully",
    slot,
  });
};

export const getAllSlotsPhysio = async (req: Request, res: Response) => {
  const { email } = req.body;

  const physio = await Physio.findOne({ email });
  if (!physio) {
    return res.status(500).json({
      message: "Physio not found",
    });
  }

  const date = new Date().toISOString().slice(0, 10);
  const slots = await Slots.find({
    createdBy: physio._id,
    $and: [
      {
        weekStart: { $lte: date },
        weekEnd: { $gte: date },
      },
    ],
  });

  res.status(200).json({
    message: "Done Successfully",
    slots,
  });
};
