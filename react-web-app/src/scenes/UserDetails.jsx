import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/user-details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      setError("Failed to fetch user details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRefresh = () => {
    fetchUserData();
  };

  return (
    <Box
      sx={{
        marginTop: 2,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontFamily: "Open Sans" }}>
        User Details
      </Typography>
      {error ? (
        <Typography
          variant="body1"
          color="error"
          sx={{ fontFamily: "Open Sans" }}
        >
          {error}
        </Typography>
      ) : (
        userData && (
          <Box
            sx={{
              marginTop: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontFamily: "Open Sans" }}>
              Username: {userData.username}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "Open Sans" }}>
              Email: {userData.email}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "Open Sans" }}>
              Id: {userData.userid}
            </Typography>
          </Box>
        )
      )}
      <Button
        onClick={handleRefresh}
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon />}
        sx={{
          mt: 2,
          fontFamily: "Open Sans",
          bgcolor: "#3A0CA3",
          ":hover": {
            backgroundColor: "#E7CDE1",
            color: "#000",
          },
          borderRadius: 2,
          textTransform: "none",
          fontSize: "16px",
        }}
      >
        Refresh
      </Button>
    </Box>
  );
};

export default UserDetails;
