import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Alert,
  AppBar,
  Toolbar,
  CssBaseline,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import CreateProfile from "../PrepareE700/CreateProfile";

const LoginPage = () => {
  const [pno, setPno] = useState("");
  const [login_pwd, setLogin_pwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/e700", { replace: true });
    }
  }, [setIsAuthenticated, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/csrf/", { withCredentials: true })
      .then(() => console.log("CSRF token loaded"))
      .catch((err) => console.error("CSRF error", err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!pno || !login_pwd) {
      setError("Both fields are required");
      return;
    }

    try {
      const csrfToken = Cookies.get("csrftoken");
      const response = await axios.post(
        "http://localhost:8000/login/",
        { pno, login_pwd },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        navigate("/e700", { replace: true });
      } else {
        setError("Invalid credentials");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handlePullData = async () => {
    const res = await fetch("http://localhost:8085/pull-schema-and-data", {
      method: "POST",
    });

    const data = await res.json();
    alert("Schema and Data pulled successfully");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#e3f2fd",
        minHeight: "100vh",
        backgroundImage: 'url("/images/ross-parmly-rf6ywHVkrlY-unsplash.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ background: "#1565c0" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            e-700
          </Typography>
          <Typography variant="subtitle1">CNAMS</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ pt: 12, pb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={4}
            sx={{ p: 4, borderRadius: 3, backgroundColor: "#fff" }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 600, color: "#1565c0" }}
            >
              Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    label="P No (User ID)"
                    fullWidth
                    value={pno}
                    onChange={(e) => setPno(e.target.value)}
                    autoComplete="off"
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    fullWidth
                    value={login_pwd}
                    onChange={(e) => setLogin_pwd(e.target.value)}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor: "#1565c0",
                            color: "#fff",
                            minWidth: 140,
                          }}
                        >
                          Login
                        </Button>
                      </motion.div>
                    </Grid>
                    <Grid item>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          variant="contained"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor: "#1565c0",
                            color: "#fff",
                            minWidth: 140,
                          }}
                          onClick={() => navigate("/create-profile")}
                        >
                          Create Profile
                        </Button>
                      </motion.div>
                    </Grid>
                    <Grid item>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          variant="contained"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor: "#1565c0",
                            color: "#fff",
                            minWidth: 140,
                          }}
                          onClick={() => navigate("/PasswordReset")}
                        >
                          SIGNATURE PIN RESET
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Container>

      {/* Footer */}
    </Box>
  );
};

export default LoginPage;
