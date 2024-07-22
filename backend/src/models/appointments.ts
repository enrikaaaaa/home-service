import mongoose, { Document, Schema } from "mongoose";

interface IAppointment extends Document {
  userId: string;
  date: string;
  time: string;
  reserved: boolean;
  category: string;
  services: string[];
}

const AppointmentSchema = new Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reserved: { type: Boolean, required: true },
  category: { type: String, required: true },
  services: { type: [String], required: true },
});

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema,
  "Appointments"
);

export default Appointment;
