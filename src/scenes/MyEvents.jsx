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
  /* Variables and State Variable declarations */
  const [events, setEvents] = useState([]);                 /* Stores the list of Events */
  const [dataReceived, setDataReceived] = useState(false);  /* Use for useEffect dependency to know if the data has been correctly received. */
  const navigate = useNavigate();                           /* Navigates to other pages at routes defined in App.js */

  /**
   * Fetches the event list from the background.
   * @returns nothing!!
   */
  async function fetchList() {
    const response = await fetch(`/api/event/list-events`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-access-token": sessionStorage.getItem("accessToken") },
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

  /* Call the fetchList function on first render! */
  useEffect(() => {
    fetchList().then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        let date = new Date(data.data[i].startTime);
        data.data[i].startTime = date;
      }
      setEvents(data.data);
    });
  }, [dataReceived]);

  /**
   * Function for the refresh button, calls the fetch list function!
   */
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

  /**
   * Formats the date
   * @param {int} date 
   * @param {int} month 
   * @param {int} year 
   * @returns a formatted string containing the full date
   */
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
            My Events
          </Typography>
          <Typography sx={{ my: 1, fontFamily: "Open Sans" }}>
            List of all your upcoming events!
          </Typography>
        </Grid>

        {/* PAGE BUTTONS */}
        <Grid item xs={6} sx={{ pl: 28, display: "flex", alignItems: "center" }}>
          {/* CREATE EVENT BUTTON */}
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

      {/* EVENT LIST */}
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
        {events.length > 0 ?
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
                      @ {event.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            );
          }) : (
            /* Display a message if the event list is empty */
            <Typography
              component="h1"
              variant="h5"
              sx={{
                my: 1,
                fontFamily: "Open Sans",
              }}
            >
              No Events available to monitor or manage. Create a new event to get started!
            </Typography>
          )}
      </Box>
    </Container>
  );
}
