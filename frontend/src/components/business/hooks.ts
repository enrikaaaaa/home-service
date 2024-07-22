import {
  fetchAppointmentsByUserId,
  fetchBookings,
  fetchBusinessById,
  fetchBusinesses,
  fetchSimilarBusinesses,
} from "./api";

import { useQuery } from "@tanstack/react-query";

export const BUSINESS_KEY = "BUSINESS";
export const APPOINTMENTS_KEY = "APPOINTMENTS";

export const useBusinesses = () => {
  return useQuery({
    queryKey: [BUSINESS_KEY],
    queryFn: fetchBusinesses,
  });
};

export const useBusiness = (id: string) => {
  return useQuery({
    queryKey: [BUSINESS_KEY, id],
    queryFn: () => fetchBusinessById(id),
    enabled: !!id,
  });
};

export const useBookings = (userId: string) => {
  return useQuery({
    queryKey: [APPOINTMENTS_KEY, userId],
    queryFn: () => fetchBookings(userId),
    enabled: !!userId,
  });
};

export const useSimilarBusinesses = (category: string) => {
  return useQuery({
    queryKey: [BUSINESS_KEY, category],
    queryFn: () => fetchSimilarBusinesses(category),
    enabled: !!category,
  });
};

export const useAppointments = (userId: string) => {
  return useQuery({
    queryKey: [APPOINTMENTS_KEY, userId],
    queryFn: () => fetchAppointmentsByUserId(userId),
    enabled: !!userId,
  });
};
