import express, { Request, Response } from "express";

import Appointment from "../models/appointments";
import { Types } from "mongoose";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userObjectId = new Types.ObjectId(id);

    const appointments = await Appointment.aggregate([
      {
        $match: {
          UserId: userObjectId,
        },
      },
      {
        $lookup: {
          from: "Services",
          localField: "services",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      {
        $unwind: "$serviceDetails",
      },
      {
        $lookup: {
          from: "Categories",
          localField: "serviceDetails.category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 1,
          Category: "$categoryDetails._id",
          Date: 1,
          reserved: 1,
          UserId: 1,
          services: "$serviceDetails._id",
          serviceDetails: {
            name: "$serviceDetails.name",
            lastName: "$serviceDetails.lastName",
            address: "$serviceDetails.address",
            company: "$serviceDetails.company",
            img: "$serviceDetails.img",
          },
        },
      },
    ]);

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();

    console.log("Appointments found:", appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { UserId, Date, services, reserved } = req.body;

    const appointment = new Appointment({
      UserId,
      Date,
      services,
      reserved,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
