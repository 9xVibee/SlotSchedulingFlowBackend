import { Request, Response } from "express";
import { Admin, Slots } from "../db";
import { AdminType, SlotsType } from "../types";

/* {
    "date": "2024-02-18",
    "weekStart": "2024-02-12",
    "weekEnd": "2024-02-18",
    "slotStartTime": "09:00",
    "email": "sdfdasf",
    "day": "Sunday",
    "slotEndTime": "10:00"
} */

export const createAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const admin = await Admin.create({
    name,
    password,
    email,
    role: "admin",
  });

  res.status(200).json({
    admin,
  });
};

// login admin
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin: AdminType | null = await Admin.findOne({
    email,
  });

  if (!admin) {
    return res.status(500).json({
      message: "Admin not found with this email",
    });
  }

  if (admin.password !== password) {
    return res.status(500).json({
      message: "Password is wrong",
    });
  }

  res.status(200).json({
    user: admin,
    message: "Login successfull",
  });
};

export const allocateSlot = async (req: Request, res: Response) => {
  try {
    const { slotId } = req.params;
    const { remark } = req.body;

    if (!slotId) {
      return res.status(400).json({
        message: "Please provide slot id",
      });
    }

    const slot: SlotsType | null = await Slots.findOne({ _id: slotId });

    if (!slot) {
      return res.status(400).json({
        message: "Slot not found",
      });
    }

    slot.isAllocated = true;
    slot.remark = remark;
    await slot.save();

    res.status(200).json({
      message: "Done Successfully",
    });
  } catch (e: any) {
    console.log(e);
  }
};
