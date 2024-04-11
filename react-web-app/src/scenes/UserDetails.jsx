import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Navbar from "./Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid';
import { TbRefresh } from "react-icons/tb";
import { IoKey } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import TextField from "@mui/material/TextField";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUserUpdate, setShowUserUpdate] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/user-details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("accessToken")
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

  const handleChangePassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch(`/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": sessionStorage.getItem("accessToken") },
      body: JSON.stringify({
        oldPassword: data.get("oldPassword"),
        newPassword: data.get("newPassword"),
      }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData => {
          alert(errorData.error || "Unknown Error!");
        }))
      } else {
        setShowChangePassword(!showChangePassword);
        alert("Success!");
      }
    })
    .catch((error) => {
      console.log("Error resetting password:", error.message);
      alert("Error resetting password: " + error.message)
    });
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch(`/api/user/update-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": sessionStorage.getItem("accessToken") },
      body: JSON.stringify({
        username: data.get("username"),
        email: data.get("email"),
      }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData => {
          alert(errorData.error || "Unknown Error!")
        }))
      } else {
        setShowUserUpdate(!showUserUpdate);
        alert("Success!");
        handleRefresh();
      }
    })
    .catch((error) => {
      console.log("Error updating user: ", error.message);
      alert("Error updating user: " + error.message)
    })
  }

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Navbar />
      <Grid container >

        <Grid item xs={6} sx={{ px: 1, py: 1}}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              my: 1,
              fontFamily: "Open Sans",
            }}
          >
            User Details
          </Typography>
          <Typography sx={{ my: 1, fontFamily: "Open Sans" }}>
            All your user details are here!
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}> 
            <Button
              variant="outlined"
              onClick={() => {
                setShowUserUpdate(!showUserUpdate)
                if (showChangePassword) setShowChangePassword(false)
              }}
              endIcon={<TbEdit size={30} color="#3A0CA3" />}
              sx={{
                minWidth: 'auto',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#3A0CA3",
                border: "2px solid #3A0CA3",
                borderRadius: 2,
                padding: "10px",
                fontFamily: "Open Sans",
                ":hover": {
                  border: "2px solid #3A0CA3",
                  backgroundColor: "rgba(58,12,163, 0.04)"
                }
              }}
            >
              Edit User Details
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                if (showUserUpdate) setShowUserUpdate(false)
                setShowChangePassword(!showChangePassword)
              }}
              endIcon={<IoKey size={30} color="#3A0CA3" />}
              sx={{
                minWidth: 'auto',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#3A0CA3",
                border: "2px solid #3A0CA3",
                borderRadius: 2,
                padding: "10px",
                fontFamily: "Open Sans",
                ":hover": {
                  border: "2px solid #3A0CA3",
                  backgroundColor: "rgba(58,12,163, 0.04)"
                }
              }}
            >
              Change Password
            </Button>

            <Button
              variant="outlined"
              onClick={() => handleRefresh()}
              endIcon={<TbRefresh size={30} color="#3A0CA3" />}
              sx={{
                minWidth: 'auto',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#3A0CA3",
                border: "2px solid #3A0CA3",
                borderRadius: 2,
                padding: '10px',
                fontFamily: "Open Sans",
                ":hover": {
                  border: "2px solid #3A0CA3",
                  backgroundColor: "rgba(58,12,163, 0.04)"
                }
              }}
            >
              Refresh
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ display: "flex", justifyContent: "flex-start"}}>
        <Grid item xs={6} sx={{ px: 1, py: 1 }}>
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
              <>
                <Typography sx={{ my: 1, fontFamily: "Open Sans", display: 'flex', justifyContent: 'flex-start' }}>
                  <strong>Role:</strong>&nbsp;ADMIN
                </Typography>
                <Typography sx={{ my: 1, fontFamily: "Open Sans", display: 'flex', justifyContent: 'flex-start' }}>
                  <strong>Username:</strong>&nbsp;{userData.username}
                </Typography>
                <Typography sx={{ my: 1, fontFamily: "Open Sans", display: 'flex', justifyContent: 'flex-start' }}>
                <strong>Email:</strong>&nbsp;{userData.email}
                </Typography>
                <Typography sx={{ my: 1, fontFamily: "Open Sans", display: 'flex', justifyContent: 'flex-start' }}>
                <strong>User ID:</strong>&nbsp;{userData.userid}
                </Typography> 
              </>
            )
          )}
        </Grid>
        <Grid item xs={6} sx={{ px: 1, py: 1 }}>
          { showChangePassword && (
            <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="oldPassword"
                label="Old Password"
                name="oldPassword"
                type="password"
                autoComplete="current-password"
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#3A0CA3', 
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="New Password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#3A0CA3',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  fontFamily: "Open Sans", 
                  backgroundColor: "#3A0CA3",
                  color: "#FFF",
                  ":hover": {
                    backgroundColor: "#E7CDE1",
                    color: "#000"
                  }, 
                }}
              >
                Change Password
              </Button>
            </Box>
          )}
          {showUserUpdate && (
            <Box component="form" onSubmit={handleUpdateUser} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#3A0CA3', 
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#3A0CA3', 
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  fontFamily: "Open Sans", 
                  backgroundColor: "#3A0CA3",
                  color: "#FFF",
                  ":hover": {
                    backgroundColor: "#E7CDE1",
                    color: "#000"
                  }, 
                }}
              >
                Update User Details
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDetails;
