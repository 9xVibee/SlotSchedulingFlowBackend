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

//! login patient
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
  const { slot, email } = req.body;

  const physio = await Physio.findOne({
    email: email,
  });

  // get num by day
  const DateByDay = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  if (!physio) {
    return res.status(500).json({
      message: "Physio not found",
    });
  }

  for (let key in slot) {
    slot[key]?.map(async (item: any) => {
      // Get the current date
      const currentDate = new Date();

      // Add 7 days to the current date
      const futureDate = new Date(currentDate);

      let num =
        key === "monady"
          ? 1
          : key === "tuesday"
          ? 2
          : key === "wednesday"
          ? 3
          : key === "thursday"
          ? 4
          : key === "friday"
          ? 5
          : key === "saturday"
          ? 6
          : 0;

      futureDate.setDate(currentDate.getDate() + num);

      const futureWeek = new Date(currentDate);
      futureWeek.setDate(currentDate.getDate() + 7);

      await Slots.create({
        physioName: physio.name,
        createdBy: physio._id,
        slotStartTime: item.startTime,
        slotEndTime: item.endTime,
        day: key,
        date: futureDate.toISOString().slice(0, 10),
        weekStart: new Date().toISOString().slice(0, 10),
        weekEnd: futureWeek.toISOString().slice(0, 10),
        remark: "",
        isAllocated: false,
      });
    });
  }

  res.status(200).json({
    message: "Request submitted successfully",
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

export const isAlreadySubmitted = async (req: Request, res: Response) => {
  const slotExist = await Slots.findOne({
    weekStart: new Date().toISOString().slice(0, 10),
  });

  return res.status(200).json({
    isExist: slotExist ? true : false,
  });
};
