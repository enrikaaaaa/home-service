import { API_URL } from "../../routes/consts";
import { Key } from "react";
import axiosInstance from "../../config/axios";

interface Appointment {
  id: Key | null | undefined;
  _id: string;
  date: string;
  time: string;
  business: {
    company: string;
    address: string;
  };
}

export const fetchBusinesses = () =>
  axiosInstance.get("/services").then((response) => response.data);

export const addTime = (id: string, time: string) =>
  axiosInstance.put(`/appointments/update/${id}`, { time });

export const fetchBusinessById = (id: string) =>
  axiosInstance.get(`/services/${id}`).then((response) => response.data);

export const createAppointment = (userId: string, date: string, time: string) =>
  axiosInstance.post<Appointment>("/appointments", {
    userId,
    date,
    time,
    reserved: true,
  });

export const fetchAppointmentsByUserId = (userId: string) =>
  axiosInstance
    .get(`/appointments/${userId}`)
    .then((response) => response.data);

export const fetchBookings = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/appointments/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw new Error("Failed to fetch bookings");
  }
};
export const fetchSimilarBusinesses = (category: string) =>
  axiosInstance
    .get(`/services/category/${category}`)
    .then((response) => response.data);
