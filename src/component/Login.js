import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import images3 from "../assets/logo.png";
import Axios from "../Axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../css/login.css'; // Import your external CSS file

function Signin() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ login: "", password: "" });

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    if (event.target.value.length <= 4) {
      setPassword(event.target.value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { login: "", password: "" };

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
    const isMobile = /^\d{10}$/.test(login);

    if (!login.trim()) {
      newErrors.login = "Email or Mobile is required";
      valid = false;
    } else if (!isEmail && !isMobile) {
      newErrors.login = "Enter a valid Email or Mobile number";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const showAlert = (title, text, icon = "warning") => {
    Swal.fire({
      title: title,
      icon: icon,
      text: text,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const showSuccessAlert = (text) => {
    Swal.fire({
        title: 'Welcome.',
        icon: 'success',
        text: text,
        showConfirmButton: true,
        confirmButtonText: "OK",
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log("Attempting to login with:", { login, password });

      const response = await Axios.post("/auth/login", {
        login: login,
        password: password,
      });

      console.log("API Response:", response);
      if (response?.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userId", response?.data?.id);

        if (response?.data?.role === "admin") {
          showSuccessAlert(response?.data?.message);
          navigate("/all-users");
        } else {
          showSuccessAlert(response?.data?.message);
          navigate("/EventsList");
        }
      } else {
        showAlert("Error", "Invalid response from server. Please try again later.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.error === "Unauthorized") {
            showAlert("Error", "Invalid email or password. Please try again.");
          } else if (error.response.data.error === "Incorrect password") {
            showAlert("Error", "Incorrect password. Please try again.");
          } else {
            showAlert("Error", `Error: ${error.response.data.error}`);
          }
        } else {
           showAlert("Warning", `${error.response.data.error}`);
        }
      } else if (error.request) {
        showAlert("Error", "No response from server. Please try again later.");
      } else {
        showAlert("Error", "An error occurred. Please try again later.");
      }
    }
  };

  const renderPassword = () => {
    const placeholders = Array.from({ length: 4 - password.length }).fill("");
    
    return (
      <div className="passwordContainer">
        {password.split("").map((char, index) => (
          <div key={index} className="passwordChar">
            {showPassword ? char : <div className="dot"></div>}
          </div>
        ))}
        
        {placeholders.map((_, index) => (
          <div key={index} className="passwordChar">
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#7f223d",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div className="logo">
        <img
          src={images3}
          alt="Custom Icon"
          className="img"
          style={{ display: "flex", justifyContent: "center", height: "150px", width: "150px" }}
        />
      </div>
      <Container
        component="main"
        maxWidth="xs"
        className="container"
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="form" onSubmit={handleLoginSubmit}>
          <FormControl margin="normal" required fullWidth>
            <label htmlFor="login">Email or Mobile</label>
            <TextField
              id="login"
              name="login"
              value={login}
              onChange={handleLoginChange}
              variant="outlined"
              autoFocus
              error={!!errors.login}
              helperText={errors.login}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <label htmlFor="password">Password</label>
            <div className="passwordContainer">
              {renderPassword()}
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="hiddenInput"
                maxLength={4}
                autoComplete="off"
               
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                className="eye_icon"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Sign In
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Signin;
