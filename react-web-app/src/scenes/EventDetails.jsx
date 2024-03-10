import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../logo2.png";
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate, useParams } from "react-router-dom";

const EventDetails = () => {
  const eventId = useParams();
  const [attendeesList, setAttendeesList] = useState([]);
  const [rows, setRows] = useState([])

  const timeInterval = 10;
  const navigate = useNavigate();
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
        setAttendeesList(data.attendance)
        populateTableRows(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchEventData();
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
      let timeStamps = currentTime.toLocaleTimeString("en-US", { timeZone: "UTC", hour12: false });
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

  // function populateTableRows(data) {
  //   const trows = []
  //   setAttendeesList(data.attendance)
  //   let startTime = new Date(data.startTime);
  //   let endTime = new Date(data.endTime);
  //   let count = 0;

  //   for (let i = 0; i < data.attendance.length; i++) {
  //     if (i === 0) {
  //       trows.push(
  //         { id: i + 1, timeStamps: `${startTime.getHours()}:${startTime.getMinutes().toString().padStart(2, '0')} = ${startTime.getTimezoneOffset()}`, attendees: data.attendance[i], comments: "" }
  //       )
  //     } else if (i === data.attendance.length - 1) {
  //       trows.push(
  //         { id: i + 1, timeStamps: `${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')}`, attendees: data.attendance[i], comments: "" }
  //       )
  //     } else {
  //       trows.push(
  //         { id: i + 1, timeStamps: `${startTime.getHours()}:${count + timeInterval}`, attendees: data.attendance[i], comments: "" }
  //       )
  //       count += timeInterval;
  //     }
  //   }
  //   setRows(trows)
  // }

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
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: 2,
            fontFamily: "Open Sans",
          }}
        >
          Event Details
        </Typography>
      </Box>
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
                  label: "Timestamps (minutes)",
                  data: [0, 10, 20, 30, 40, 50, 60]
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
      <Box
        sx={{
          marginTop: 3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          endIcon={<HomeIcon />}
          onClick={() => {
            navigate("/my-events")
          }}
          sx={{
            bgcolor: "#3A0CA3",
            color: "#FFF",
            ":hover": {
              backgroundColor: "#E7CDE1",
              color: "#000",
            },
            borderRadius: 2,
            textTransform: "none",
            marginLeft: "16px",
            width: "20%",
            fontSize: "16px",
            paddingBottom: "10px",
          }}
        >
          HOME
        </Button>
      </Box>
    </Container>
  )
}

export default EventDetails