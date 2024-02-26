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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetError, setResetError] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const errors = {};

    // Error checking for old password
    if (!data.get("oldPassword")) {
      errors.oldPassword = "Old Password is required";
    }

    // Error checking for new password
    if (!data.get("newPassword")) {
      errors.newPassword = "New Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    fetch(`/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        oldPassword: data.get("oldPassword"),
        newPassword: data.get("newPassword"),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setResetError(true);
        } else {
          navigate("/my-events");
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setResetError(true);
      });
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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            error={!!errors.oldPassword}
            helperText={errors.oldPassword || " "}
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
            error={!!errors.newPassword}
            helperText={errors.newPassword || " "}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontFamily: "Open Sans" }}
          >
            Reset Password
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
          {resetError && (
            <Typography
              variant="body1"
              color="error"
              sx={{ mt: 2, fontFamily: "Open Sans" }}
            >
              Failed to reset password. Please try again later.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
