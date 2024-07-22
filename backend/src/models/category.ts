import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema, "Categories");

export default Category;
