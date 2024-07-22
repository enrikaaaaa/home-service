import mongoose, { Document, Schema } from "mongoose";

interface IAppointment extends Document {
  userId: string;
  date: string;
  time: string;
  reserved: boolean;
}

const AppointmentSchema = new Schema({
  userId: { type: String, required: false },
  date: { type: String, required: false },
  time: { type: String, required: false },
  reserved: { type: Boolean, required: false },
});

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema,
  "Appointments"
);

export default Appointment;
