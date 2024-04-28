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
import io from 'socket.io-client';
import PerfectScrollbar from 'react-perfect-scrollbar';

const EventDetails = () => {
  /* Variables */
  const eventId = useParams();                              /* Event Id. Pulled from the parameters passed in.            */
  const [socket, setSocket] = useState(null);               /* Stores the instance of web socket.                         */
  const [eventData, setEventData] = useState({})            /* Stores the event data returned by the api.                 */
  const [attendeesList, setAttendeesList] = useState([]);   /* Stores the attendance count list.                          */
  const [intervalList, setIntervalList] = useState([]);     /* Stores the interval list used for the line chart's x-axis. */
  const [rows, setRows] = useState([]);                     /* Stores an array of rows for the MUI data grid.             */

  /* Defines the columns and the configuration properties of the MUI data grid */
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
    /**
     * fetchEventData: Fetches the event data using the provided event id and stores it
     */
    const fetchEventData = async () => {
      try {
        const response = await fetch('/api/event/event-details', {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-access-token": sessionStorage.getItem("accessToken") },
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
        populateTableRows(data);

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

    /* Retrieves the web socket running at localhost:3001 and stores that instance. */
    const newSocket = io('http://localhost:3001', {
      extraHeaders: {
        'x-access-token': sessionStorage.getItem("accessToken")
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [ eventId ])

  /* This useEffect is triggered when the app finds the connection to the websocket. */
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket.io server');
    });

    /* Upon receiving an attendance count from the websocket, this block of code
       updates the graph and the table live. */
    socket.on('countReceived', (data) => {
      appendRows(data)

      setAttendeesList(prevAttendeesList => {
        const updatedAttendeesList = [...prevAttendeesList, data.count];
        const l = [];
        for (let i = 0; i < updatedAttendeesList.length; i++) {
          l.push(i * 10);
        }
        setIntervalList(l);
        return updatedAttendeesList;
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('countReceived');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  
  /**
   * Populates the data grid table
   * @param {JSON} data - The Event Data returned by the fetch api call.
   */
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
      let timeStamps = currentTime.toLocaleTimeString();
      trows.push({
        id: trows.length + 1,
        timeStamps: timeStamps,
        attendees: 0, // Assuming no attendees for now
        comments: "",
      });
  
      // Increment currentTime by the time interval (in seconds)
      currentTime.setSeconds(currentTime.getSeconds() + timeInterval);
    }

    // Populating the attendees column.
    for (let i = 0; i < data.attendance.length; i++) {
      trows[i].attendees = data.attendance[i];
    }

    setRows(trows);
  }

  /**
   * This function is used to update the attendance count in the data grid on the go
   * @param {int} data 
   */
  function appendRows(data) {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      /* Updating the the attendance count on the first encounter of the value 
         0 for the attendees property of a row. */
      const emptyRowIndex = updatedRows.findIndex(row => row.attendees === 0);
      if (emptyRowIndex !== -1) {
        updatedRows[emptyRowIndex] = { ...updatedRows[emptyRowIndex], attendees: data.count };
      }
      return updatedRows;
    });
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

      {/* PAGE TITLE */}
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
            Start Time: {new Date(eventData.startTime).toLocaleTimeString()}
          </Typography>
          <Typography sx={{ my: 1, fontFamily: "Open Sans"}}>
            End Time: {new Date(eventData.endTime).toLocaleTimeString()}
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
          {/* THE DATA GRID OR SIMPLY THE TABLE. */}
          <Grid item xs={6}>
            {rows && (
              <DataGrid
                rows={rows}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
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
            )}
          </Grid>

          {/* THE LINE CHART CORRESPONDING TO THE DATA GRID ATTENDEES COLUMN */}
          <Grid item xs={6} sx={{ display: 'flex', overflowX: "auto", }}>
            {intervalList && attendeesList && (
              <PerfectScrollbar sx={{ width: "100%", height: "100%" }}>
                <LineChart
                  xAxis={[
                    { 
                      label: "Time (seconds)",
                      data: intervalList,
                    }
                  ]}
                  series={[
                    {
                      id: "attendance",
                      label: "Attendees",
                      color: "#FF7F50",
                      // showMark: false,
                      data: attendeesList,
                    },
                    
                    /* Compliance Limit Line */
                    {
                      id: "compliance",
                      label: "Compliance Limit",
                      color: "black",
                      showMark: false,
                      data: Array.from(attendeesList, x => eventData.complianceLimit)
                    }
                  ]}
                  width={700}
                  height={400}
                  sx={{
                    '& .MuiLineElement-series-compliance': {
                      strokeDasharray: '10 5',
                      strokeWidth: 2,
                    },
                    '& .MuiLineElement-series-attendance': {
                      strokeWidth: 4,
                    },
                  }}
                />
              </PerfectScrollbar>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default EventDetails