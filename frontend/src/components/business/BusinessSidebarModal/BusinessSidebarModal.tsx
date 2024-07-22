import { Box, Button, Chip, Drawer, Typography } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import React, { FC, useContext, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../../context/UserContext";
import { createAppointment } from "../api";
import dayjs from "dayjs";
import styles from "./BusinessSidebarModal.module.scss";

interface BusinessSidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  category: string;
  services: string[];
}

const BusinessSidebarModal = ({
  isOpen,
  onClose,
  userId,
  category,
  services,
}: BusinessSidebarModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const { user } = useContext(UserContext);

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    setSelectedTime(null);
  };

  const handleReserveTime = async () => {
    if (selectedDate && selectedTime) {
      if (user) {
        try {
          const createdAppointment = await createAppointment(
            userId,
            selectedDate.format("YYYY-MM-DD"),
            selectedTime.format("HH:mm"),
            true,
            category,
            services
          );
          console.log("Appointment created:", createdAppointment);
          onClose();
        } catch (error) {
          console.error("Error creating appointment:", error);
          alert("Failed to create appointment.");
        }
      }
    } else {
      alert("Please select both date and time!");
    }
  };

  const generateTimeSlots = (selectedDate: Dayjs | null) => {
    const timeSlots = [];
    const now = dayjs();
    const startHour = selectedDate?.isSame(now, "day") ? now.hour() + 1 : 0;

    for (let i = startHour; i < 24; i++) {
      timeSlots.push(dayjs().hour(i).minute(0));
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots(selectedDate);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <div className={styles.top}>
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            Book an Appointment
          </Typography>
          <IoMdClose className={styles.closeButton} onClick={onClose} />
        </div>
        <span className={styles.text}>
          Select Date and Time slot to book an appointment
        </span>
        <div className={styles.dateWrapper}>
          <span className={styles.heading}>Select Date</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
              minDate={dayjs()}
            />
          </LocalizationProvider>
        </div>
        <div className={styles.timeWrapper}>
          <span className={styles.heading}>Select Time Slot</span>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={1}
            className={styles.timeSlots}
          >
            {timeSlots.map((timeSlot, index) => (
              <Chip
                key={index}
                label={timeSlot.format("HH:mm")}
                variant={
                  selectedTime && selectedTime.isSame(timeSlot, "hour")
                    ? "filled"
                    : "outlined"
                }
                onClick={() => setSelectedTime(timeSlot)}
              />
            ))}
          </Box>
        </div>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleReserveTime}
          className={styles.bookButton}
          disabled={!selectedDate || !selectedTime}
        >
          Reserve Time
        </Button>
      </Box>
    </Drawer>
  );
};

export default BusinessSidebarModal;
