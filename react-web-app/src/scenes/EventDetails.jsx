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

  // const rows = [
  //   { id: 1, timeStamps: '10:00 AM', attendees: '20', comments: "" },
  //   { id: 2, timeStamps: '10:15 AM', attendees: '60', comments: "" },
  //   { id: 3, timeStamps: '10:30 AM', attendees: '95', comments: "" },
  //   { id: 4, timeStamps: '10:45 AM', attendees: '80', comments: "" },
  //   { id: 5, timeStamps: '11:00 AM', attendees: '40', comments: "" },
  // ];

  

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
        populateTableRows(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchEventData();
  })

  function populateTableRows(data) {
    const r = []
    setAttendeesList(data.attendance)
    let startTime = new Date(data.startTime);
    let endTime = new Date(data.endTime);
    let count = 0;

    for (let i = 0; i < attendeesList.length; i++) {
      if (i == 0) {
        r.push(
          { id: i + 1, timeStamps: `${startTime.getHours()}:${startTime.getMinutes()}`, attendees: attendeesList[i], comments: "" }
        )
      } else if (i == attendeesList.length - 1) {
        r.push(
          { id: i + 1, timeStamps: `${endTime.getHours()}:${endTime.getMinutes()}`, attendees: attendeesList[i], comments: "" }
        )
      } else {
        r.push(
          { id: i + 1, timeStamps: `${startTime.getHours()}:${count + timeInterval}`, attendees: attendeesList[i], comments: "" }
        )
        count += timeInterval;
      }
    }
    setRows(r)
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