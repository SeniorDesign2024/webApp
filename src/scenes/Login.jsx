import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      
      if (!data.get('username')) {
        throw new Error('Username is required!');
      }

      if (!data.get('password')) {
        throw new Error('Password is required!')
      }

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
          throw new Error(response.statusText);
        } else {
          setError(null);
          return response.json()
        }
      })
      .then(data => {
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
          <FormControlLabel
            control={
              <Checkbox 
                value="remember" 
                color="primary"
                sx={{
                  '&.Mui-checked': {
                    color: '#3A0CA3', // Set the checkmark (and the border when checked) to the desired color
                  },
                }}
              />
            }
            label={<Typography variant="body2" sx={{ fontFamily: "Open Sans" }}>Remember me</Typography>}
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
                  color: '#3A0CA3', // Apply the Sign In button's background color
                  '&:hover': {
                    textDecoration: 'underline', // Optional: Change on hover if desired
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
                  color: '#3A0CA3', // Apply the Sign In button's background color
                  '&:hover': {
                    textDecoration: 'underline', // Optional: Change on hover if desired
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