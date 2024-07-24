import { Box, Button, Drawer, Snackbar, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useState } from "react";

import DatePicker from "./DatePicker";
import { Dayjs } from "dayjs";
import TimePicker from "./TimePicker";
import { createAppointment } from "../api";

interface BusinessSidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  category: string;
  services: string[];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BusinessSidebarModal = ({
  isOpen,
  onClose,
  userId,
  category,
  services,
}: BusinessSidebarModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    setSelectedTime(newTime);
  };

  const handleReserveTime = async () => {
    if (selectedDate && selectedTime) {
      setLoading(true);
      try {
        const response = await createAppointment(
          userId,
          selectedDate.format("YYYY-MM-DD"),
          selectedTime.format("HH:mm"),
          category,
          services
        );

        // Check if the response has the expected fields
        if (response && response._id) {
          setSnackbarMessage("Appointment successfully created!");
          setSnackbarSeverity("success");
          onClose();
        } else {
          setSnackbarMessage("Error creating appointment. Please try again.");
          setSnackbarSeverity("error");
        }
      } catch (error) {
        setSnackbarMessage("Error creating appointment. Please try again.");
        setSnackbarSeverity("error");
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Please select both date and time.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
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
            type="submit"
            variant="contained"
            onClick={handleReserveTime}
            sx={{ mt: 2 }}
            disabled={!selectedDate || !selectedTime || loading}
          >
            {loading ? "Reserving..." : "Reserve Time"}
          </Button>
        </Box>
      </Drawer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BusinessSidebarModal;
