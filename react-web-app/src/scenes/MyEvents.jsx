import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "../logo2.png"

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

  // useEffect(() => {
  //   const fetchEventList = async () => {
  //     try {
  //       await fetch(`/api/event/list-events`, {
  //         method: "GET",
  //         headers: {'Content-Type': 'application/json'},
  //         credentials: "include"
  //       })
  //       .then(response => {
  //         if (!response.ok) {
  //           console.log("Unable to fetch event list");
  //         } else {
  //           console.log(response.json());
  //           setEvents(response.data);
  //           console.log(events);
  //         }
  //       })
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchEventList();
  // });

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

  const MyEvents = [
    {
      name: "My Event 1",
      startTime: new Date('2024-05-18T14:10:30.000+00:00'),
      endTime: new Date('2024-05-18T15:10:30.000+00:00'),
      userId: "1",
      attendance: [10, 20, 30],
      complianceLimit: 100
    },

    {
      name: "My Event 2",
      startTime: new Date('2024-05-19T14:10:30.000+00:00'),
      endTime: new Date('2024-05-19T15:10:30.000+00:00'),
      userId: "1",
      attendance: [10, 20, 30, 40],
      complianceLimit: 100
    },

    {
      name: "My Event 3",
      startTime: new Date('2024-05-20T14:10:30.000+00:00'),
      endTime: new Date('2024-05-20T15:10:30.000+00:00'),
      userId: "1",
      attendance: [10, 20, 30, 40, 50],
      complianceLimit: 100
    },
    
    {
      name: "My Event 4",
      startTime: new Date('2024-05-21T18:10:30.000+00:00'),
      endTime: new Date('2024-05-21T19:10:30.000+00:00'),
      userId: "1",
      attendance: [10, 20, 30, 40, 50, 60],
      complianceLimit: 100
    },

    {
      name: "My Event 5",
      startTime: new Date('2024-05-22T14:10:30.000+00:00'),
      endTime: new Date('2024-05-22T15:10:30.000+00:00'),
      userId: "1",
      attendance: [10, 20, 30, 40, 50, 60],
      complianceLimit: 100
    },
  ];

  return (
    <Container
      component="main" 
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column'
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
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {events && events.map(event => {
          return (
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  fullWidth
                  sx={{
                    bgcolor: '#3A0CA3',
                    ':hover': {
                      backgroundColor: "#E7CDE1"
                    },
                    borderRadius: 2,
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