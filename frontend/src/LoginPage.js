import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Container, Box, Typography,
  Grid, Alert, AppBar, Toolbar, CssBaseline, Paper
} from '@mui/material';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [pno, setPno] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/csrf/', { withCredentials: true })
      .then(() => console.log('CSRF token loaded'))
      .catch(err => console.error('CSRF error', err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
//    setError('');
    if (!pno || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post(
        'http://localhost:8000/login/',
        { pno, password },
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        await axios.get('http://localhost:8000/csrf/', { withCredentials: true });
        navigate('/e700');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handlePullData = async () => {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const { ip } = await ipRes.json();

    const res = await fetch("http://localhost:8085/pull-schema-and-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip_address: ip })
    });

    const data = await res.json();
    alert("Schema and Data pulled successfully");
  };

  return (
    <Box
      sx={{display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#e3f2fd',
        backgroundImage: 'url("/ross-parmly-rf6ywHVkrlY-unsplash.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ background: '#1565c0' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>e-700</Typography>
          <Typography variant="subtitle1">CNAMS</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ pt: 12, pb: 6 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* Pull DB Data */}
          {/*<Paper elevation={6} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fff', mb: 4 }}>*/}
          {/*  <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#1565c0', mb: 2 }}>*/}
          {/*    Download E-700*/}
          {/*  </Typography>*/}
          {/*  <Box display="flex" justifyContent="center">*/}
          {/*    <motion.div whileHover={{ scale: 1.05 }}>*/}
          {/*      <Button*/}
          {/*        onClick={handlePullData}*/}
          {/*        sx={{ fontWeight: 'bold', backgroundColor: '#1565c0', color: '#fff', minWidth: 140 }}*/}
          {/*      >*/}
          {/*        Click Here*/}
          {/*      </Button>*/}
          {/*    </motion.div>*/}
          {/*  </Box>*/}
          {/*</Paper>*/}

          {/* Login Box */}
          <div className="login_tab"
                style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.1),rgba(255,255,255,0))',
                WebkitBackdropFilter: 'blur(20px)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '10px',
                height: '40%',
                width: '80%',
                margin: 'auto',
                padding: '20px'}}
          >
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: '#1565c0' }}>
              Login
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={handleLogin}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <TextField label="P No (User ID)" fullWidth value={pno}  onChange={(e) => setPno(e.target.value)}
                    autoComplete="off"
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField type="password" label="Password" fullWidth value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button type="submit" variant="contained" sx={{ fontWeight: 'bold', backgroundColor: '#1565c0', color: '#fff', minWidth: 140 }}>
                          Login
                        </Button>
                      </motion.div>
                    </Grid>
                    <Grid item>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button variant="contained" sx={{ fontWeight: 'bold', backgroundColor: '#1565c0', color: '#fff', minWidth: 140 }}
                          onClick={() => navigate('/create-profile')}
                        >
                          Create Profile
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </motion.div>
      </Container>

      {/* Footer */}
      <AppBar
        position="fixed"
        component="footer"
        sx={{ backgroundColor: '#1565c0', top: 'auto', bottom: 0 }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LoginPage;