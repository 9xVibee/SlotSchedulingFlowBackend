import { Request, Response } from "express";
import { Slots } from "../db";

export const getAllSlots = async (req: Request, res: Response) => {
  const date = new Date().toISOString().slice(0, 10);

  const slots = await Slots.find({
    $and: [
      {
        weekStart: { $lte: date },
      },
      {
        weekEnd: { $gte: date },
      },
    ],
  });

  res.status(200).json({
    message: "Done Successfully",
    slots,
  });
};
