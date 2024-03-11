import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { TbPlus } from "react-icons/tb";
import { TbX } from "react-icons/tb";

export default function CreateEvent() {
  const navigate = useNavigate();
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
        console.log(response.statusText);
      } else {
        navigate("/my-events");
      }
    });
  };

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
      <Grid container>
        <Grid item xs={6} sx={{ px: 1, py: 1 }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              my: 1,
              fontFamily: "Open Sans",
            }}
          >
            Create Event
          </Typography>
          <Typography sx={{ my: 1, fontFamily: "Open Sans" }}>
            Fill out the form to create an event!
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          py: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Event Name"
            name="name"
            autoComplete="name"
            autoFocus
            // error={!!errors.name}
            // helperText={errors.name || " "}
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
            name="startTime"
            label="Start Time (MM/DD/YYYY, HH:MM AM/PM)"
            id="startTime"
            // error={!!errors.startTime}
            // helperText={errors.startTime || " "}
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
            name="endTime"
            label="End Time (MM/DD/YYYY, HH:MM AM/PM)"
            id="endTime"
            // error={!!errors.endTime}
            // helperText={errors.endTime || " "}
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
            name="attendance"
            label="Attendance (comma separated)"
            id="attendance"
            // error={!!errors.attendance}
            // helperText={errors.attendance || " "}
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
            name="complianceLimit"
            label="Compliance Limit"
            id="complianceLimit"
            // error={!!errors.complianceLimit}
            // helperText={errors.complianceLimit || " "}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3A0CA3',
                },
              },
            }}
          />
          <Grid container sx={{ mt: 2, justifyContent: "center" }}>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Button
                type="submit"
                variant="outlined"
                endIcon={<TbPlus size={20} color="#FF7F50" />}
                sx={{
                  width: '75%',
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#FF7F50",
                  border: "2px solid #FF7F50",
                  borderRadius: 2,
                  padding: "10px",
                  fontFamily: "Open Sans",
                  ":hover": {
                    border: "2px solid #FF7F50",
                    backgroundColor: "rgba(255,127,80, 0.04)"
                  }
                }}
              >
                Create Event
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Button
                type="submit"
                variant="outlined"
                endIcon={<TbX size={20} color="#3A0CA3" />}
                onClick={() => {
                  navigate("/my-events")
                }}
                sx={{
                  width: '75%',
                  display: "flex",
                  justifyContent: "center",
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
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
