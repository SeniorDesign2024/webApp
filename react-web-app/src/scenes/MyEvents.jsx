import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "../logo2.png"
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);

  async function fetchList() {
    const response = await fetch(`/api/event/list-events`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: "include"
    });
    setDataReceived(true);
    return response.json();
  }

  useEffect(() => {
    fetchList().then((data) => {
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        let date = new Date(data.data[i].startTime);
        data.data[i].startTime = date;
      }
      setEvents(data.data);
      // console.log(events);
    })
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
      seconds.toString().padStart(2, "0")
    ].join(":");

    return formattedTime;
  }

  const formatDate = (date, month, year) => {
    // Formatting Date
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    
    const formattedDate = months[month].toString() + " " + date.toString() + ", " + year.toString();

    return formattedDate;
  }

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          width: "100%",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={logo} alt="logo" height={"100"} width={"100"} />
        <Typography
          component="h1" 
          variant="h5"
          sx={{
            mt: 2,
            fontFamily: "Open Sans",
          }}
        >
          My Events
        </Typography>
        <Typography component="p" sx={{ mt: 1, fontFamily: "Open Sans"}}>
          List of all you upcoming events!
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          width: "100%",
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center', // Evenly space the buttons
          alignItems: 'flex-end',
        }}
      >
        <Button 
          variant="contained" 
          endIcon={<AddIcon />}
          size="large"
          sx={{
            bgcolor: '#3A0CA3',
            color: '#FFF', // Set the default text color
            ':hover': {
              backgroundColor: "#E7CDE1",
              color: '#000', // Change text color to black on hover
            },
            borderRadius: 2,
            textTransform: 'none',
            marginRight: '16px',
            width: '20%',
            fontSize: '16px'
          }}
        >
          Create Event
        </Button>

        <Button 
          variant="contained" 
          endIcon={<RefreshIcon />}
          size="large"
          onClick={handleRefresh}
          sx={{
            bgcolor: '#3A0CA3',
            color: '#FFF', // Set the default text color
            ':hover': {
              backgroundColor: "#E7CDE1",
              color: '#000', // Change text color to black on hover
            },
            borderRadius: 2,
            textTransform: 'none',
            marginLeft: '16px',
            width: '20%',
            fontSize: '16px'
          }}
        >
          Refresh
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: 2,
          width: "100%",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto',
        }}
      >
        {events && events.map(event => {
          return (
            <List key={event.id}> {/* Make sure to add a unique key prop */}
              <ListItem disablePadding>
                <ListItemButton
                  fullWidth
                  sx={{
                    bgcolor: '#3A0CA3',
                    ':hover': {
                      backgroundColor: "#E7CDE1"
                    },
                    borderRadius: 2
                  }}
                >
                  <ListItemText sx={{ color: "white", fontFamily: "Open Sans", ':hover': { color: "black" }}}> 
                    {event.name}: {formatDate(event.startTime.getDate(), event.startTime.getMonth(), event.startTime.getFullYear())} @ {formatTime(event.startTime.getTime())}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          )
        })}
      </Box>
    </Container>
  )  
}