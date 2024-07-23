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

export const createAppointment = (
  userId: string,
  selectedDate: string,
  selectedTime: string,
  reserved: boolean,
  category: string,
  services: string[]
) =>
  axiosInstance
    .post<Appointment>("/appointments", {
      userId,
      date: selectedDate,
      time: selectedTime,
      reserved,
      category,
      services,
    })
    .then((response) => response.data);

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

export async function searchBusinesses(query: string): Promise<Appointment[]> {
  try {
    const response = await fetch(`/businesses?query=${query}`);
    const data = await response.json();
    // Ensure the data is an array
    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Invalid data format received from API:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return [];
  }
}
