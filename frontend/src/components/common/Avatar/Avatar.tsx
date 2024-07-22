import { MenuItem, Popover } from "@mui/material";
import React, { useState } from "react";

import styles from "./Avatar.module.scss";
import { useNavigate } from "react-router-dom";

interface AvatarProps {
  user: {
    name: string;
    _id: string;
    email: string;
  };
  handleLogout: () => void;
}

const Avatar = ({ user, handleLogout }: AvatarProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hover, setHover] = useState(false);

  if (!user || !user.name) {
    return null;
  }

  const initials = user.name.charAt(0).toUpperCase();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setHover(true);
  };

  const handlePopoverClose = () => {
    if (!hover) {
      setAnchorEl(null);
    }
  };

  const handlePopoverLeave = () => {
    setHover(false);
    setAnchorEl(null);
  };

  const handleMyBookings = () => {
    navigate(`/appointments/${user._id}`);
    handlePopoverLeave();
  };

  const open = Boolean(anchorEl);

  return (
    <div
      className={styles.avatarContainer}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <div className={styles.avatar}>{initials}</div>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={handlePopoverLeave}
        disableRestoreFocus
      >
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={handlePopoverLeave}
          className={styles.menu}
        >
          <MenuItem onClick={handleMyBookings}>My Bookings</MenuItem>
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </div>
      </Popover>
    </div>
  );
};

export default Avatar;
