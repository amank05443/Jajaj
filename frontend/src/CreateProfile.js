import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  TextField, Button, Container, Box, Typography,
  Grid, Alert, AppBar, Toolbar, CssBaseline, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateProfilePage = () => {
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');
  const [pno, setPno] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
      .then(() => console.log('CSRF token set'))
      .catch((err) => console.error('CSRF token error:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !rank || !pno || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post(
        'http://localhost:8000/register/',
        { user_name:name,rank_id: rank, pno,login_pwd: password },
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setError('');
        setSuccess('Profile created successfully!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setSuccess('');
        setError(response.data.message || 'Profile creation failed');
      }
    } catch (err) {
      console.error('Create profile error:', err);
      setSuccess('');
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundImage: 'url("/ross-parmly-rf6ywHVkrlY-unsplash.jpg")',}}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #1976d2, #42a5f5)' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            e-700
          </Typography>
          <Typography variant="subtitle1">Department: CNAMS</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ flexGrow: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={6}
            sx={{
              mt: 10,
              p: 5,
              borderRadius: 4,
              backgroundColor: '#ffffff'
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{ fontWeight: 600, color: '#1976d2' }}
            >
              Create Profile
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Rank"
                    fullWidth
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="PNO"
                    fullWidth
                    value={pno}
                    onChange={(e) => setPno(e.target.value)}
                    sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        fontWeight: 'bold', backgroundColor: '#1565c0', color: '#fff'
                      }}
                    >
                      Create Profile
                    </Button>
                  </motion.div>
                </Grid>

                <Grid item xs={6}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        fontWeight: 'bold', backgroundColor: '#1565c0', color: '#fff'
                      }}
                      onClick={() => navigate('/login')}
                    >
                      Back to Login
                    </Button>
                  </motion.div>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Container>

      {/* Sticky Footer */}
      <AppBar
        position="static"
        component="footer"
        sx={{ backgroundColor: '#1976d2', mt: 'auto', py: 1 }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Department: CNAMS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CreateProfilePage;
