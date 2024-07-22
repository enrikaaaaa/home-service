import mongoose, { Document } from "mongoose";

export interface IService extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  company: string;
  name: string;
  category: mongoose.Schema.Types.ObjectId;
  address: string;
  img: string;
  lastName: string;
}

const serviceSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  company: { type: String, required: true },
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  address: { type: String, required: true },
  img: { type: String, required: true },
  lastName: { type: String, required: true },
});

export default mongoose.model<IService>("Service", serviceSchema, "Services");
