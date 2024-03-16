import * as React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TbPlus } from "react-icons/tb";
import { TbRefresh } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);
  const navigate = useNavigate();

  async function fetchList() {
    const response = await fetch(`/api/event/list-events`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      setDataReceived(true);
      return response.json();
    }
    else {
      setDataReceived(false);
      return null;
    }
  }

  useEffect(() => {
    fetchList().then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        let date = new Date(data.data[i].startTime);
        data.data[i].startTime = date;
      }
      setEvents(data.data);
    });
  }, [dataReceived]);

  const handleRefresh = () => {
    fetchList().then((data) => {
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        let date = new Date(data.data[i].startTime);
        data.data[i].startTime = date;
      }
      setEvents(data.data);
    });
  };

  const formatTime = (milliseconds) => {
    // Converting milliseconds to readable time format HH:MM:SS
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
    const formattedTime = [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");

    return formattedTime;
  };

  const formatDate = (date, month, year) => {
    // Formatting Date
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate =
      months[month].toString() + " " + date.toString() + ", " + year.toString();

    return formattedDate;
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
        <Grid item xs={6} sx={{ px: 1, py: 1}}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              my: 1,
              fontFamily: "Open Sans",
            }}
          >
            My Events
          </Typography>
          <Typography sx={{ my: 1, fontFamily: "Open Sans" }}>
            List of all you upcoming events!
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ pl: 28, display: "flex", alignItems: "center" }}>
          <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              component={Link}
              to="/create-event"
              endIcon={<TbPlus size={30} color="#FF7F50" />}
              sx={{
                minWidth: 'auto',
                display: "flex",
                justifyContent: "space-between",
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
      <Box
        sx={{
          marginTop: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        {events &&
          events.map((event) => {
            return (
              <List key={event.eventId}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/event-details/${event.eventId}`);
                    }}
                    sx={{
                      width: "100%",
                      minHeight: "48px",
                      justifyContent: "flex-start",
                      border: "1px solid #3A0CA3", // Outline color
                      ":hover": {
                        backgroundColor: "rgba(58,12,163, 0.04)",
                        borderColor: "1px solid #3A0CA3", // Keeps the border color consistent on hover, or choose a different color
                      },
                      borderRadius: 2,
                    }}
                  >
                    <ListItemText
                      sx={{
                        color: "#3A0CA3", // Changing text color to match the outline for consistency
                        fontFamily: "Open Sans",
                        ":hover": { color: "black" }, // Adjust hover color as needed
                      }}
                    >
                      {event.name}:{" "}
                      {formatDate(
                        event.startTime.getDate(),
                        event.startTime.getMonth(),
                        event.startTime.getFullYear()
                      )}{" "}
                      @ {formatTime(event.startTime)}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            );
          })}
      </Box>
    </Container>
  );
}
