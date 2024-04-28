import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "../logo2.png";
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useState } from 'react';

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      
      if (!data.get('username')) {
        throw new Error("A username is required!");
      }

      if (!data.get('email')) {
        throw new Error("An email is required!");
      }

      if (!data.get('password')) {
        throw new Error ("A password is required!");
      }
  
      fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify({
          "username": data.get('username'),
          "email": data.get("email"),
          "password": data.get("password")
        })
      })
      .then(response => {
        if (response.ok) {
          setError(null);
          navigate("/");
        } else {
          return response.json().then(errorData => {
            throw new Error(errorData.message || "An unknown error occured!");
          })
        }
      })
      .catch(err => {
        setError(err);
      })
    } catch (err) {
      setError(err);
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
          Sign up
        </Typography>
        {error && (
          <Alert severity='error' onClose={() => setError(null)} sx={{ width: '100%' }}>
            {error.message}
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#3A0CA3', // Use the same color as the Sign In button's background
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#3A0CA3', // Use the same color as the Sign In button's background
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#3A0CA3', // Use the same color as the Sign In button's background
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#3A0CA3', // Use the same color as the Sign In button's background
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#3A0CA3', // Use the same color as the Sign In button's background
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link 
                href="/" 
                variant="body2"
                sx={{
                  fontFamily: "Open Sans",
                  color: '#3A0CA3',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}