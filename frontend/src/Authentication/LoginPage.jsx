import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreateProfile from "../PrepareE700/CreateProfile";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  InputAdornment,
  IconButton,
  Grid,
  Alert,
  CssBaseline,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LockOutlineIcon from "@mui/icons-material/LockOutlined";
import LockResetIcon from "@mui/icons-material/LockReset";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";

const LoginPage = () => {
  const [pno, setPno] = useState("");
  const [login_pwd, setLogin_pwd] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser, user, login } = useAuth();

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

  const handleChangePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!pno || !login_pwd) {
      setError("Both fields are required");
      return;
    }

    try {
      // Use login function from AuthContext (handles both JWT and session modes)
      const result = await login(pno, login_pwd);

      if (result.success) {
        navigate("/e700", { replace: true });
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Login failed");
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
    <div className="relative flex items-center justify-center p-1 min-h-screen">
      <div className="p-1 absolute inset-0 bg-cover bg-center opacity-70">
        <img src="./images/vkd.png" />
      </div>
      <CssBaseline />
      <div className="absolute inset-0 bg-black/40">
        <Container
          maxWidth="md"
          sx={{
            pt: 30,
            pb: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              width: "90%",
              borderRadius: 5,
              overflow: "hidden",
              display: "flex",
              minHeight: { xs: 460, md: 220 },
            }}
          >
            <Box
              sx={{
                flex: 1,
                position: "relative",
                display: { xs: "none", md: "block" },
                background:
                  "linear-gradient(rgba(24,17,116,0.95) 0%,rgba(82,17,100,.8) 100%)",
                color: "#455",
                p: 4,
                minWidth: 320,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <Box
                  sx={{
                    width: 360,
                    height: 360,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 30% 30%,rgba(255,255,255,0.06),rgba(0,0,0,0.25) 40%,rgba(0,0,0,0.45))",
                    filter: "blur(14px)",
                    transform: "scale(1.05)",
                  }}
                />
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  left: 36,
                  top: 40,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(255,200,50,0.14)",
                  filter: "blur(8px)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 56,
                  top: 80,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "rgba(90,200,255,0.12)",
                  filter: "blur(8px)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 30,
                  bottom: 60,
                  width: 50,
                  height: 50,
                  borderRadius: "10%",
                  background: "rgba(30,255,180,0.06)",
                  filter: "blur(14px)",
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 290,
                    borderRadius: 8,
                    p: 1,
                    flexDirection: "column",
                    minHeight: "38vh",
                    backgroundImage: 'url("/images/cnams.gif")',
                    boxShadow:
                      "0 8px 30px rgba(2,12,18,0.35),inset 0 1px 0 rgba(255,255,255,0.02)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backdropFilter: "blur(6px)",
                  }}
                ></Box>
              </motion.div>
            </Box>

            <Box sx={{ flex: 1, p: "2%", display: "flex" }}>
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={{ width: "100%" }}
              >
                <div className="border rounded-lg mt-2 ">
                  <Grid className="flex item-center justify-center font-bold text-3xl text-purple-500 mt-1 font-algerian italic">
                    Welcome to e-700
                  </Grid>
                  {error && (
                    <Alert severity="error" sx={{ ml: 4, mr: 4 }}>
                      <b>{error}</b>
                    </Alert>
                  )}

                  {/*  ------------------------------------------ For login with login password -------------------------------------------- */}
                  <Grid component="form" onSubmit={handleLogin} noValidate>
                    <Grid
                      container
                      className="flex item-center justify-center p-6 mt-1"
                    >
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="PNO"
                          type="text"
                          value={pno}
                          onChange={(e) => {
                            e.target.value.length > 9
                              ? setError("PNO is exceeding the range")
                              : setError("");
                            setPno(e.target.value.toUpperCase());
                          }}
                          autoComplete="username"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircleOutlinedIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                          size="small"
                        />
                      </Grid>

                      <Grid item xs={12} marginTop={3}>
                        <TextField
                          fullWidth
                          label="Password"
                          type={showPassword ? "text " : "password"}
                          value={login_pwd}
                          onChange={(e) => {
                            if (!pno) {
                              setError("Select Personal Number");
                              return;
                            }
                            setLogin_pwd(e.target.value);
                          }}
                          autoComplete="username"
                          size="small"
                          sx={{ width: "255px" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockOutlineIcon color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleChangePassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} marginTop={3}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              fontWeight: 700,
                              textTransform: "none",
                              alignItems: "center",
                              background:
                                "linear-gradient(90deg,#17A39A,#2DB7C4)",
                              boxShadow: "0 6px 18px rgba(37,150,148,0.18)",
                            }}
                            disabledElevation
                          >
                            <LockOutlineIcon sx={{ mr: 1 }} />
                            Sign In
                          </Button>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                {/*  ------------------------------------------ For reset signature pin -------------------------------------------- */}
                <div className="grid grid-rows-2 border rounded-lg mt-2 ">
                  <div className="flex item-center justify-center text-sm text-purple-500 mt-2 ">
                    👉 To reset 06 digit signature pin only.
                  </div>
                  <div className="flex item-center justify-center p-1 mb-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ marginTop: "1%" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          fontWeight: "bold",
                          background: "linear-gradient(90deg,#17A39A,#1565c0)",
                          boxShadow: "0 6px 18px rgba(37,150,148,0.18)",
                          minWidth: 140,
                        }}
                        disabledElevation
                        onClick={() => navigate("/PasswordReset")}
                      >
                        <LockResetIcon sx={{ mr: 1 }} />
                        SIGNATURE PIN RESET
                      </Button>
                    </motion.div>
                  </div>

                </div>
                {/*  ------------------------------------------ For create profile -------------------------------------------- */}
                <div className="grid grid-rows-2 border rounded-lg mt-2 ">
                  <div className="flex item-center justify-center text-sm text-purple-500 mt-2 ">
                    👉 New user? Create your profile here.
                  </div>
                  <div className="flex item-center justify-center p-1 mb-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ marginTop: "1%" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          fontWeight: "bold",
                          background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
                          boxShadow: "0 6px 18px rgba(99,102,241,0.18)",
                          minWidth: 140,
                        }}
                        disabledElevation
                        onClick={() => navigate("/create-profile")}
                      >
                        <PersonAddIcon sx={{ mr: 1 }} />
                        CREATE PROFILE
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;

{
  /*  ------------------------------------------ code dump -------------------------------------------- */
}
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Container,
//   Box,
//   Typography,
//   Grid,
//   Alert,
//   AppBar,
//   Toolbar,
//   CssBaseline,
//   Paper,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { useAuth } from "./AuthContext";
// import CreateProfile from "../PrepareE700/CreateProfile";
//
// const LoginPage = () => {
//   const [pno, setPno] = useState("");
//   const [login_pwd, setLogin_pwd] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { isAuthenticated, setIsAuthenticated, setUser, user } = useAuth();
//
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/e700", { replace: true });
//     }
//   }, [setIsAuthenticated, navigate]);
//
//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/csrf/", { withCredentials: true })
//       .then(() => console.log("CSRF token loaded"))
//       .catch((err) => console.error("CSRF error", err));
//   }, []);
//
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//
//     if (!pno || !login_pwd) {
//       setError("Both fields are required");
//       return;
//     }
//
//     try {
//       const csrfToken = Cookies.get("csrftoken");
//       const response = await axios.post(
//         "http://localhost:8000/login/",
//         { pno, login_pwd },
//         {
//           headers: {
//             "X-CSRFToken": csrfToken,
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         },
//       );
//
//       if (response.data.success) {
//         setUser(response.data.user);
//         setIsAuthenticated(true);
//         navigate("/e700", { replace: true });
//       } else {
//         setError("Invalid credentials");
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };
//
//   const handlePullData = async () => {
//     const res = await fetch("http://localhost:8085/pull-schema-and-data", {
//       method: "POST",
//     });
//
//     const data = await res.json();
//     alert("Schema and Data pulled successfully");
//   };
//
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         backgroundColor: "#e3f2fd",
//         minHeight: "100vh",
//         backgroundImage: 'url("/images/vkd.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         opacity: 0.8,
//         p: 2,
//       }}
//     >
//       <CssBaseline />
//       <Container maxWidth="sm" sx={{ pt: 12, pb: 6 }}>
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Paper
//             elevation={6}
//             sx={{
//               p: 4,
//               background:
//                 "linear-gradient(135deg, rgba(90,120,241,0.95) 0%, rgba(90,90,170,0.97) 100%)",
//               color: "white",
//               minHeight: "180px",
//               position: "relative",
//               zIndex: 1,
//               boxShadow:
//                 "0 0 32px 10px rgba(99,102,241,0.4), 0 0 0 2px #6366F1",
//               borderRadius: "32px",
//             }}
//           >
//             <div cla>
//               <h2 className="flex item-center justify-center font-bold text-3xl  rounded-md shadow-2xl">
//                 Login
//               </h2>
//             </div>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}
//
//             <form onSubmit={handleLogin}>
//               <Grid container spacing={3} justifyContent="center">
//                 <Grid item xs={12}>
//                   <TextField
//                     label="P No (User ID)"
//                     fullWidth
//                     value={pno}
//                     onChange={(e) => setPno(e.target.value)}
//                     autoComplete="off"
//                     margin="normal"
//                   />
//                 </Grid>
//
//                 <Grid item xs={12}>
//                   <TextField
//                     type="password"
//                     label="Password"
//                     fullWidth
//                     value={login_pwd}
//                     onChange={(e) => setLogin_pwd(e.target.value)}
//                     margin="normal"
//                   />
//                 </Grid>
//                 <Grid>
//                   <motion.div whileHover={{ scale: 1.05 }}>
//                     <Button
//                       variant="contained"
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#1565c0",
//                         color: "#fff",
//                         minWidth: 140,
//                       }}
//                       onClick={() => navigate("/PasswordReset")}
//                     >
//                       SIGNATURE PIN RESET
//                     </Button>
//                   </motion.div>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Grid container spacing={2} justifyContent="center">
//                     <Grid item>
//                       <motion.div whileHover={{ scale: 1.05 }}>
//                         <Button
//                           type="submit"
//                           variant="contained"
//                           sx={{
//                             fontWeight: "bold",
//                             backgroundColor: "#1565c0",
//                             color: "#fff",
//                             minWidth: 140,
//                           }}
//                         >
//                           Login
//                         </Button>
//                       </motion.div>
//                     </Grid>
//                     {/*                     <Grid item> */}
//                     {/*                       <motion.div whileHover={{ scale: 1.05 }}> */}
//                     {/*                         <Button */}
//                     {/*                           variant="contained" */}
//                     {/*                           sx={{ */}
//                     {/*                             fontWeight: "bold", */}
//                     {/*                             backgroundColor: "#1565c0", */}
//                     {/*                             color: "#fff", */}
//                     {/*                             minWidth: 140, */}
//                     {/*                           }} */}
//                     {/*                           onClick={() => navigate("/create-profile")} */}
//                     {/*                         > */}
//                     {/*                           Create Profile */}
//                     {/*                         </Button> */}
//                     {/*                       </motion.div> */}
//                     {/*                     </Grid> */}
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </form>
//           </Paper>
//         </motion.div>
//       </Container>
//
//       {/* Footer */}
//     </Box>
//   );
// };
//
// export default LoginPage;
