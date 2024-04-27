import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import { Alert } from "@mui/material";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [lightChecked, setLightChecked] = useState(true);
  const [busyChecked, setBusyChecked] = useState(false);

  const handleSubmit = (event) => {
    try {
      // Getting data from the create event form
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const lightCheck = lightChecked ? 'Light' : '';
      const busyCheck = busyChecked ? 'Busy' : '';

      data.append('light', lightCheck);
      data.append('busy', busyCheck);

      // Error checking for name
      if (!data.get("name")) {
        throw new Error("Event name is required!");
      }

      // Error checking for startTime
      if (!startTime) {
        throw new Error("Start time is required!");
      }

      // Error checking for endTime
      if (!endTime) {
        throw new Error("End time is required!");
      }

      // Error checking for complianceLimit
      const complianceLimit = data.get("complianceLimit");
      if (!complianceLimit) {
        throw new Error("Compliance limit is required!");
      } else if (isNaN(complianceLimit)) {
        throw new Error("Compliance limit must be a number!");
      } else if (parseInt(complianceLimit) < 0) {
        throw new Error("Compliance limit cannot be negative!");
      }

      // API call to create an event using values from the form.
      fetch(`/api/event/create-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-access-token": sessionStorage.getItem("accessToken") },
        body: JSON.stringify({
          name: data.get("name"),
          startTime: startTime,
          endTime: endTime,
          eventType: lightChecked ? 'sparse' : busyChecked ? 'dense' : '',
          complianceLimit: data.get("complianceLimit"),
        }),
      }).then((response) => {
        if (!response.ok) {
          console.log(response.statusText);
        } else {
          navigate("/my-events");
        }
      });
    } catch (error) {
      console.error("Error creating event:", error.message);
      setErrors(error.message);
    }
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
        {errors && (
          <Alert severity="error" onClose={() => setErrors(null)} sx={{ width: '100%' }}>
            {errors}
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%", px: 1, py: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Event Name"
            name="name"
            autoComplete="name"
            autoFocus
            sx={{
              pb: 1,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3A0CA3',
                },
              },
            }}
          />
          <Grid container>
            <Grid item xs={6} sx={{ px: 1, py: 1}}>
              <Typography sx={{ my: 1, fontFamily: "Open Sans" }}>
                Event Type:
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ px: 1, py: 1}}>
            <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox
                    id="light"
                    name="light"
                    checked={lightChecked}
                    onChange={(event) => {
                      if (busyChecked) setBusyChecked(false)
                      setLightChecked(event.target.checked)
                    }} 
                    sx={{ 
                      color: '#3A0CA3', 
                      '&.Mui-checked': { 
                        color: '#3A0CA3' 
                      } 
                    }} 
                  />
                } 
                label={<Typography sx={{ my: 1, fontFamily: "Open Sans" }}>Light</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="busy"
                    name="busy"
                    checked={busyChecked}
                    onChange={(event) => {
                      if (lightChecked) setLightChecked(false)
                      setBusyChecked(event.target.checked)
                    }}
                    sx={{ 
                      color: '#3A0CA3', 
                      '&.Mui-checked': { 
                        color: '#3A0CA3' 
                      }
                    }} 
                  />
                } 
                label={<Typography sx={{ my: 1, fontFamily: "Open Sans" }}>Busy</Typography>}
              />
            </FormGroup>
            </Grid>
          </Grid>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="complianceLimit"
            label="Compliance Limit"
            id="complianceLimit"
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
