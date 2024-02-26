import * as React from "react";
import { useState } from "react";
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

export default function CreateEvent() {
  const navigate = useNavigate();
  const [logInError, setLogInError] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const errors = {};

    // Error checking for name
    if (!data.get("name")) {
      errors.name = "Event name is required";
    }

    // Error checking for startTime
    if (!data.get("startTime")) {
      errors.startTime = "Start time is required";
    }

    // Error checking for endTime
    if (!data.get("endTime")) {
      errors.endTime = "End time is required";
    }

    // Error checking for complianceLimit
    const complianceLimit = data.get("complianceLimit");
    if (!complianceLimit) {
      errors.complianceLimit = "Compliance limit is required";
    } else if (isNaN(complianceLimit)) {
      errors.complianceLimit = "Compliance limit must be a number";
    } else if (parseInt(complianceLimit) < 0) {
      errors.complianceLimit = "Compliance limit cannot be negative";
    }

    // Error checking for attendance
    if (!data.get("attendance")) {
      errors.attendance = "Attendance is required";
    } else {
      const attendanceString = data.get("attendance");
      const attendanceArray = attendanceString
        .split(",")
        .map((str) => parseInt(str.trim()));

      if (attendanceArray.some((num) => isNaN(num))) {
        errors.attendance =
          "Attendance must be a comma-separated list of numbers";
      } else if (attendanceArray.some((num) => num < 0)) {
        errors.attendance = "Attendance values cannot be negative";
      }
    }

    // Parse attendance field from string to array of integers
    const attendanceString = data.get("attendance");
    const attendanceArray = attendanceString
      .split(",")
      .map((str) => parseInt(str.trim()));

    // Parse date and time strings into Date objects
    const startTime = new Date(data.get("startTime"));
    const endTime = new Date(data.get("endTime"));

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    console.log({
      name: data.get("name"),
      startTime: startTime,
      endTime: endTime,
      attendance: attendanceArray,
      complianceLimit: data.get("complianceLimit"),
    });

    fetch(`/api/event/create-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: data.get("name"),
        startTime: startTime,
        endTime: endTime,
        attendance: attendanceArray,
        complianceLimit: data.get("complianceLimit"),
      }),
    }).then((response) => {
      if (!response.ok) {
        setLogInError(true);
      } else {
        navigate("/my-events");
      }
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
          Create Event
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Event Name"
            name="name"
            autoComplete="name"
            autoFocus
            error={!!errors.name}
            helperText={errors.name || " "}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="startTime"
            label="Start Time (MM/DD/YYYY, HH:MM AM/PM)"
            id="startTime"
            error={!!errors.startTime}
            helperText={errors.startTime || " "}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="endTime"
            label="End Time (MM/DD/YYYY, HH:MM AM/PM)"
            id="endTime"
            error={!!errors.endTime}
            helperText={errors.endTime || " "}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="attendance"
            label="Attendance (comma separated)"
            id="attendance"
            error={!!errors.attendance}
            helperText={errors.attendance || " "}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="complianceLimit"
            label="Compliance Limit"
            id="complianceLimit"
            error={!!errors.complianceLimit}
            helperText={errors.complianceLimit || " "}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontFamily: "Open Sans" }}
          >
            Create Event
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
        </Box>
      </Box>
    </Container>
  );
}
