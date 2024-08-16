import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Alert, Avatar, InputAdornment } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import images3 from '../assets/logo.png';
import Swal from 'sweetalert2';
import Axios from "../Axios";
import { useNavigate } from 'react-router-dom';
import "../css/style.css";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
  },
  logo: {
    position: 'absolute',
    top: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },
  img: {
    width: '50px',
    height: '50px',
    marginBottom: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: '#7f223d !important',
    color: '#fff',
    fontSize: '18px',
    textTransform: 'capitalize',
  },
}));

function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState(null);
  const navigate = useNavigate();

  const showAlert = (text) => {
    Swal.fire({
      title: 'OOPS.',
      icon: 'warning',
      text: text,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const showSuccessAlert = (text) => {
    Swal.fire({
      title: 'Success.',
      icon: 'success',
      text: text,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('https://reiosglobal.com/Printsmy_Backend/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate OTP');
      }

      const data = await response.json();
      setOtp(data.otp); // Set the OTP received from the backend
 //navigate('/verify-otp');
 navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      // setMessage('OTP has been generated and sent to your email address.');
      // console.log('Response data:', data); // Handle the successful OTP generation response
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    }
  };

      //const response = await Axios.post("/send-otp", { email : email, });
    //   if (response.status === 200) {
    //     const generatedOtp = response.data.otp; // Assuming your backend sends the OTP back
    //     setOtp(generatedOtp);

    //     setMessage('OTP has been generated and sent to your email address.');
    //     showSuccessAlert('OTP has been generated and sent to your email address.');
    //   } else {
    //     setError('Failed to generate OTP. Please try again later.');
    //     showAlert('Failed to generate OTP. Please try again later.');
    //   }
    // } 
    //catch (err) {
      // if (err.response) {
      //   console.error('Error status:', err.response.status);
      //   console.error('Error data:', err.response.data);
      //   setError(`Failed to generate OTP. ${err.response.data.message || 'Please try again later.'}`);
      //   showAlert(`Failed to generate OTP. ${err.response.data.message || 'Please try again later.'}`);
      // } else if (err.request) {
      //   console.error('Error request:', err.request);
      //   setError('No response received from the server. Please try again later.');
      //   showAlert('No response received from the server. Please try again later.');
      // } else {
      // //console.error('Error message:', err.message);
      //   setError(`An error occurred: ${err.message}`);
      //   showAlert(`An error occurred: ${err.message}`);
      // }
  //   }
  // };

 

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
      <div className={classes.logo}>
        <img src={images3} alt="Custom Icon" className={classes.img} style={{ display: "flex", justifyContent: "center", height: "150px", width: '150px' }} />
      </div>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography component="h1" variant="h5" color="primary"sx={{ fontFamily: 'Montserrat' }} >
          Forgot Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          <Button variant="contained" color="primary" type="submit" fullWidth className={classes.submit}>
            Generate OTP
          </Button>
        </form>
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {otp && <Alert severity="info" sx={{ mt: 2 }}>Generated OTP: {otp}</Alert>}
      </Container>
    </div>
  );
}

export default ForgotPassword;
