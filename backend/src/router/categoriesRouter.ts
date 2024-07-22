import express, { Request, Response } from "express";

import Category from "../models/category";
import Service from "../models/service";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const Categories = await Category.find();
    res.json(Categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err });
  }
});

router.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category });
    res.json(services);
  } catch (err) {
    console.error("Error fetching services by category:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
