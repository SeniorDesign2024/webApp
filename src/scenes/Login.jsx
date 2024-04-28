import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "../logo2.png"
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useState } from 'react';


export default function SignIn() {
  // variables and state variable declarations
  const navigate = useNavigate();
  const [error, setError] = useState(null);        // Stores error messages thrown by try catch statements

  /**
   * This function handles the login form submission and authenticates the user.
   * @param {*} event 
   */
  const handleSubmit = (event) => {
    try {
      
      /* Gets the form data and checks if all data is available to proceed. */
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      
      if (!data.get('username')) {
        throw new Error('Username is required!');
      }

      if (!data.get('password')) {
        throw new Error('Password is required!')
      }

      /* Makes a call to the sign in api to the backend using the form data
         and authenticates the user. Upon successful authentication, redirects
         the user to the My Events page or show the related error message.*/
      fetch(`/api/auth/signin`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "username": data.get('username'),
          "password": data.get('password')
        })
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || "An unknown error occured!");
          })
        } else {
          setError(null);
          return response.json()
        }
      })
      .then(data => {
        /* Storing the access token to only allow access to other pages if they 
           a user and are signed in. */
        sessionStorage.setItem("accessToken", data.accessToken)
        navigate("/my-events");
      })
      .catch(error => {
        setError(error.message)
      })
    } catch (error) {
      setError(error.message)
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CssBaseline />

      {/* Brand Logo */}
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
      </Box>

      {/* SigIn Form */}
      <Box
        sx={{
          marginTop: 8,
          width: "100%",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          sx={{
            fontFamily: "Open Sans",
          }}
        >
          Sign in
        </Typography>

        {/* Displaying the error messages if any! */}
        {error && (
          <Alert severity='error' onClose={() => setError(null)} sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3A0CA3', // Use the same color as the Sign In button's background
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3A0CA3', // Use the same color as the Sign In button's background
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2, 
              fontFamily: "Open Sans", 
              backgroundColor: "#3A0CA3",
              color: "#FFF",
              ":hover": {
                backgroundColor: "#E7CDE1",
                color: "#000"
              }, 
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link 
                href="#" 
                variant="body2" 
                sx={{ 
                  fontFamily: "Open Sans", 
                  color: '#3A0CA3',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link 
                href="/signup" 
                variant="body2" 
                sx={{ 
                  fontFamily: "Open Sans", 
                  color: '#3A0CA3',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}