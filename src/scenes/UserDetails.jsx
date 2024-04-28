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
import { Alert } from "@mui/material";

const UserDetails = () => {
  /* State Variables */
  const [userData, setUserData] = useState(null);                         /* Stores the user data returned by the API       */
  const [userDataError, setUserDataError] = useState(null);               /* Stores all errors related to user data         */
  const [passwordError, setPasswordError] = useState(null);               /* Stores all errors related to password change   */
  const [userUpdateError, setUserUpdateError] = useState(null);           /* Stores all errors related to user data updates */
  const [showChangePassword, setShowChangePassword] = useState(false);    /* Hides or shows the change password form        */
  const [showUserUpdate, setShowUserUpdate] = useState(false);            /* Hides or shows the update user details form    */

  /**
   * Fetches user data from the database using the user-details api and stores it.
   */
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
      } else {
        const data = await response.json();
        setUserData(data);
      }

    } catch (error) {
      setUserDataError(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  /**
   * Handles the page refresh
   */
  const handleRefresh = () => {
    setShowChangePassword(false);
    setShowUserUpdate(false);
    fetchUserData();
  };

  /**
   * Handles password changes.
   * @param {*} event 
   */
  const handleChangePassword = (event) => {
    try {
      /* Getting data from the change password form and checking if necessary 
         data is available to proceed. */
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      if (!data.get('oldPassword')) {
        throw new Error('Please enter your old password!');
      }

      if (!data.get('newPassword')) {
        throw new Error('Please enter a new password!');
      } else if (data.get('newPassword') === data.get('oldPassword')) {
        throw new Error('New password cannot be the same as the old password!');
      }

      /* Makes a call to the reset-password api on the backend to change the password.
         If successful, it will close the form. Else, it will throw the appropriate error
         to display to the user. */
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
            throw new Error(errorData.error || "Unknown Error!");
          }))
        } else {
          setShowChangePassword(!showChangePassword);
          setPasswordError(null);
        }
      })
      .catch((error) => {
        setPasswordError(error.message);
      });
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  /**
   * Handles updates to the user information such as username and email.
   * @param {*} event 
   */
  const handleUpdateUser = (event) => {
    try {
      /* Getting data from the change password form and checking if necessary 
         data is available to proceed. */
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      if (!data.get('username')) {
        throw new Error('Please enter a new username!');
      }

      if (!data.get('email')) {
        throw new Error('Please enter a new email!');
      }

      /* Makes a call to the update-user api on the backend to update user details.
         If successful, it will close the form. Else, it will throw the appropriate error
         to display to the user. */
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
            throw new Error(errorData.error || "Unknown Error!");
          }))
        } else {
          setShowUserUpdate(!showUserUpdate);
          setUserUpdateError(null)
          handleRefresh();
        }
      })
      .catch((error) => {
        setUserUpdateError(error.message);
      })
    } catch (error) {
      setUserUpdateError(error.message);
    }
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

        {/* PAGE TITLE */}
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

        {/* PAGE BUTTONS */}
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}> 

            {/* EDIT USER DETAILS BUTTON */}
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

            {/* CHANGE PASSWORD BUTTON */}
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

            {/* REFRESH BUTTON */}
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

      {/* USER DETAILS SECTION */}
      <Grid container sx={{ display: "flex", justifyContent: "flex-start"}}>
        <Grid item xs={6} sx={{ px: 1, py: 1 }}>
          {/* DISPLAY ERROR MESSAGES RELATED TO USER DETAILS */}
          {userDataError ? (
            <Alert severity="error" onClose={() => setUserDataError(null)} sx={{ width: '100%' }}>
              {userDataError}
            </Alert>
          ) : (
            userData && (
              <>
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

        {/* PASSWORD AND USER DETAILS UPDATE SECTION */}
        <Grid item xs={6} sx={{ px: 1, py: 1 }}>
          {/* DISPLAY ERRORS REGARDING PASSWORD AND USER DETAILS UPDATES */}
          { passwordError && (
            <Alert severity="error" onClose={() => setPasswordError(null)} sx={{ width: '100%' }}>
              {passwordError}
            </Alert>
          )}
          { userUpdateError && (
            <Alert severity="error" onClose={() => setUserUpdateError(null)} sx={{ width: '100%' }}>
              {userUpdateError}
            </Alert>
          )}

          {/* CHANGE PASSWORD FORM. ONLY VISIBLE IF showChangePassword is true. */}
          { showChangePassword && (
            <Box component="form" noValidate onSubmit={handleChangePassword} sx={{ mt: 1 }}>
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

          {/* EDIT USER DETAILS FORM. ONLY VISIBLE IF showUserUpdate is true. */}
          {showUserUpdate && (
            <Box component="form" noValidate onSubmit={handleUpdateUser} sx={{ mt: 1 }}>
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
