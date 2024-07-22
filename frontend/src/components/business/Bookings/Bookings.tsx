import { AxiosError } from "axios";
import React from "react";
import styles from "./Bookings.module.scss";
import { useBookings } from "../hooks";
import { useParams } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

const Bookings = () => {
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser)._id : null;
  const { user } = useUser();
  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useBookings(userId || user?._id || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as AxiosError)?.message}</div>;
  }

  if (!bookings || bookings.length === 0) {
    return <div>No bookings found.</div>;
  }

  return (
    <div className={styles.bookingsContainer}>
      <h1>Your Bookings</h1>
      {bookings.map((booking: any) => (
        <div key={booking._id} className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.imageContainer}>
              {booking.serviceDetails.img && (
                <img
                  src={booking.serviceDetails.img}
                  alt={booking.company}
                  className={styles.image}
                />
              )}
            </div>
            <div className={styles.infoContainer}>
              <h3>{booking.serviceDetails.company}</h3>
              <div>
                <img
                  src="https://img.icons8.com/?size=100&id=23400&format=png&color=B646E2"
                  alt="icon"
                />
                {booking.serviceDetails.name} {booking.serviceDetails.lastName}
              </div>
              <div>
                <img
                  src="https://img.icons8.com/?size=100&id=5bHmXpLDVtWf&format=png&color=B646E2"
                  alt="icon"
                />
                {booking.serviceDetails.address}
              </div>
              <div>
                <img
                  src="https://img.icons8.com/?size=100&id=SqCUs5XkuU76&format=png&color=B646E2"
                  alt="icon"
                />
                {new Date(booking.Date.From).toLocaleDateString()}
              </div>
              <div>
                <img
                  src="https://img.icons8.com/?size=100&id=72CqXZXdPMV2&format=png&color=B646E2"
                  alt="icon"
                />
                {new Date(booking.Date.From).toLocaleTimeString()} -
                {new Date(booking.Date.To).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
