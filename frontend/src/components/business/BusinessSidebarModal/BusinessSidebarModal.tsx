import { Box, Button, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";

import DatePicker from "./DatePicker";
import { Dayjs } from "dayjs";
import TimePicker from "./TimePicker";
import { createAppointment } from "../api";

interface BusinessSidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const BusinessSidebarModal = ({
  isOpen,
  onClose,
  userId,
}: BusinessSidebarModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    setSelectedTime(newTime);
  };

  const handleReserveTime = async () => {
    if (selectedDate && selectedTime) {
      try {
        const createdAppointment = await createAppointment(
          userId,
          selectedDate.format("YYYY-MM-DD"),
          selectedTime.format("HH:mm")
        );
        console.log("Appointment created:", createdAppointment);
        onClose();
      } catch (error) {
        console.error("Error creating appointment:", error);
      }
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
          Book an Appointment
        </Typography>
        <DatePicker value={selectedDate} onChange={handleDateChange} />
        <TimePicker
          value={selectedTime}
          onChange={handleTimeChange}
          unavailableTimes={[]}
        />
        <Button
          variant="contained"
          onClick={handleReserveTime}
          sx={{ mt: 2 }}
          disabled={!selectedDate || !selectedTime}
        >
          Reserve Time
        </Button>
      </Box>
    </Drawer>
  );
};

export default BusinessSidebarModal;
