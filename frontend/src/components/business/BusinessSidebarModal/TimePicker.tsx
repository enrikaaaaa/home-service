import * as React from "react";

import dayjs, { Dayjs } from "dayjs";

import { styled } from "@mui/system";

interface TimePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  unavailableTimes: string[];
}

const TimeSlot = styled("div")(({ theme }) => ({
  padding: "8px",
  width: "calc(100% / 3 - 16px)",
  margin: "4px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
  userSelect: "none",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
  "&.selected": {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  "&.unavailable": {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
}));

const TimePicker = ({ value, onChange, unavailableTimes }: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = React.useState<Dayjs | null>(null);

  const handleTimeClick = (time: Dayjs) => {
    setSelectedTime(time);
    onChange(time);
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    const startTime = dayjs().startOf("day").add(10, "hour");
    const endTime = dayjs().startOf("day").add(18, "hour");
    let currentTime = startTime;

    while (currentTime.isBefore(endTime)) {
      const formattedTime = currentTime.format("HH:mm");
      const isUnavailable = unavailableTimes.includes(formattedTime);

      timeSlots.push({ time: currentTime, isUnavailable });
      currentTime = currentTime.add(30, "minute");
    }

    return timeSlots.map(({ time, isUnavailable }, index) => (
      <TimeSlot
        key={index}
        className={`
          ${selectedTime?.isSame(time) ? "selected" : ""}
          ${isUnavailable ? "unavailable" : ""}
        `}
        onClick={() => !isUnavailable && handleTimeClick(time)}
      >
        {time.format("HH:mm")}
      </TimeSlot>
    ));
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>{renderTimeSlots()}</div>
  );
};

export default TimePicker;
