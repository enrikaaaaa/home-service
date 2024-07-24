import { API_URL } from "../../routes/consts";
import Business from "./types";
import axiosInstance from "../../config/axios";

interface Appointment {
  _id: string;
  userId: string;
  date: string;
  time: string;
  reserved: boolean;
  category: string;
  services: string[];
}

export const fetchBusinesses = () =>
  axiosInstance.get("/services").then((response) => response.data);

export const addTime = (id: string, time: string) =>
  axiosInstance.put(`/appointments/update/${id}`, { time });

export const fetchBusinessById = (id: string) =>
  axiosInstance.get(`/services/${id}`).then((response) => response.data);

export const createAppointment = async (
  userId: string,
  date: string,
  time: string,
  category: string,
  services: string[]
) => {
  try {
    const response = await axiosInstance.post("/appointments", {
      userId,
      date,
      time,
      reserved: true,
      category,
      services,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export const fetchAppointmentsByUserId = (userId: string) =>
  axiosInstance
    .get(`/appointments/${userId}`)
    .then((response) => response.data);

export const fetchBookings = async (userId: string) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/appointments/${userId}`
    );
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

export const searchBusinesses = async (query: string): Promise<Business[]> => {
  const response = await axiosInstance.get(`/businesses/search?q=${query}`);

  return response.data;
};
