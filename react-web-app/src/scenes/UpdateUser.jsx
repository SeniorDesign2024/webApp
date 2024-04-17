import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../logo2.png";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const [updateError, setUpdateError] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
  try {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const errors = {};

    // Error checking for username
    if (!data.get("username")) {
      errors.username = "Username is required";
    }

    // Error checking for email
    const email = data.get("email");
    if (!email) {
      errors.email = "Email is required";
    } else if (!email.includes("@")) {
      errors.email = "Email must be valid";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

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
          setUpdateError(true);
        } else {
          navigate("/my-events");
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setUpdateError(true);
      });
    } catch (error) {
      console.error("Error updating user:", error.message);
      setErrors("Failed to update user. Please try again later.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo" height={"100"} width={"100"} />
      </Box>
      <Box
        sx={{
          marginTop: 8,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontFamily: "Open Sans",
          }}
        >
          Update User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username || " "}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email || " "}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontFamily: "Open Sans" }}
          >
            Update
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="/my-events"
                variant="body2"
                sx={{ fontFamily: "Open Sans" }}
              >
                Cancel
              </Link>
            </Grid>
          </Grid>
          {updateError && (
            <Typography
              variant="body1"
              color="error"
              sx={{ mt: 2, fontFamily: "Open Sans" }}
            >
              Failed to update user. Please try again later.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateUser;
