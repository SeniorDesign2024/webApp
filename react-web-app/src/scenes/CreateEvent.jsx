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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(startTime);
    console.log(endTime);

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

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    console.log({
      name: data.get("name"),
      startTime: startTime,
      endTime: endTime,
      complianceLimit: data.get("complianceLimit"),
    });

    fetch(`/api/event/create-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": sessionStorage.getItem("accessToken") },
      body: JSON.stringify({
        name: data.get("name"),
        startTime: startTime,
        endTime: endTime,
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
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", px: 1, py: 1 }}>
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
              pb: 1,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3A0CA3',
                },
              },
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              // required
              id="startTime"
              name="startTime"
              label="Start Time"
              onChange={(value) => setStartTime(value.$d)}
              sx={{
                width: "100%",
                pb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#3A0CA3',
                  },
                },
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              // required
              id="endTime"
              name="endTime"
              label="End Time"
              onChange={(value) => setEndTime(value.$d) }
              sx={{
                width: "100%",
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#3A0CA3',
                  },
                },
              }}
            />
          </LocalizationProvider>
          {/* <TextField
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
          /> */}
          {/* <TextField
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
          /> */}
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
