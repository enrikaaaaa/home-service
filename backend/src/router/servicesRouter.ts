import { Request, Response } from "express";

import Service from "../models/service";
import express from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const services = await Service.aggregate([
      {
        $lookup: {
          from: "Categories",
          localField: "category",
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
          company: 1,
          name: 1,
          lastName: 1,
          address: 1,
          category: "$categoryDetails.name",
          img: 1,
          email: 1,
        },
      },
    ]);

    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.error("Error fetching service:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/search/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;

    const services = await Service.aggregate([
      {
        $lookup: {
          from: "Categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $match: {
          "categoryDetails.name": category,
        },
      },
      {
        $project: {
          _id: 1,
          company: 1,
          name: 1,
          lastName: 1,
          address: 1,
          category: "$categoryDetails.name",
          img: 1,
          email: 1,
        },
      },
    ]);

    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: `No services found for category: ${category}` });
    }

    res.json(services);
  } catch (err) {
    console.error("Error fetching services by category:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
