import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const EventDetails = () => {
  const eventId = useParams();
  const [eventData, setEventData] = useState({})
  const [attendeesList, setAttendeesList] = useState([]);
  const [intervalList, setIntervalList] = useState([]);
  const [rows, setRows] = useState([])
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'timeStamps',
      headerName: 'Timestamps',
      width: 150,
      editable: false,
    },
    {
      field: 'attendees',
      headerName: 'Attendees',
      width: 150,
      editable: false,
    },
    {
      field: 'comments',
      headerName: 'Comments',
      width: 150,
      editable: false,
    },
  ];

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('/api/event/event-details', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            "eventId": eventId
          })
        });
  
        if (!response.ok) {
          throw new Error('Error while fetching Event data')
        }
  
        const data  = await response.json()
        setEventData(data)
        setAttendeesList(data.attendance)
        populateTableRows(data)

        const l = []
        for (let i = 0; i < data.attendance.length; i++) {
          l.push(i*10)
        }
        setIntervalList(l)

      } catch (err) {
        console.log(err)
      }
    }

    fetchEventData();

    const interval = setInterval(() => {
      fetchEventData();
    }, 30000);

    return () => clearInterval(interval);
  }, [ eventId ])
    
  function populateTableRows(data) {
    const trows = [];
    let startTime = new Date(data.startTime);
    let endTime = new Date(data.endTime);
    let currentTime = new Date(startTime);
  
    // Set the time interval to 10 seconds
    const timeInterval = 10;
  
    // Loop until currentTime reaches endTime
    while (currentTime <= endTime) {
      // Format the current time and add it to the rows
      let timeStamps = currentTime.toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true });
      trows.push({
        id: trows.length + 1,
        timeStamps: timeStamps,
        attendees: "", // Assuming no attendees for now
        comments: "",
      });
  
      // Increment currentTime by the time interval (in seconds)
      currentTime.setSeconds(currentTime.getSeconds() + timeInterval);
    }
  
    setRows(trows);
  }

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
      <Box sx={{ px: 1, py: 1}}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ my: 1, fontFamily: "Open Sans" }}
        >
          Event Details
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={6} sx={{ px: 1, py: 1}}>
          <Typography sx={{ my: 1, fontFamily: "Open Sans" }}>
            Event Name: {eventData.name}
          </Typography>
          <Typography sx={{ my: 1, fontFamily: "Open Sans"}}>
            Compliance Limit: {eventData.complianceLimit}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ px: 1, py: 1 }}>
          <Typography sx={{ my: 1, fontFamily: "Open Sans"}}>
            Start Time: {new Date(eventData.startTime).toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true })}
          </Typography>
          <Typography sx={{ my: 1, fontFamily: "Open Sans"}}>
            End Time: {new Date(eventData.endTime).toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true })}
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          marginTop: 3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid 
          container spacing={2}
          sx={{
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#3A0CA3",
            },
          }}
        >
          <Grid item xs={6}>
            <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              sx={{
                border: 0,
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <LineChart
              xAxis={[
                { 
                  label: "Time (seconds)",
                  // data: [0, 10, 20, 30, 40, 50, 60]
                  data: intervalList
                }
              ]}
              series={[
                {
                  label: "Attendees",
                  color: "#FF7F50",
                  data: attendeesList,
                },
              ]}
              width={700}
              height={400}
              sx={{
                '& .MuiLineElement-root': {
                  strokeWidth: 4,
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default EventDetails