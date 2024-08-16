import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  InputAdornment,
  FormControl,
  IconButton,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import images3 from '../assets/logo.png';
import { useLocation } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
  passwordContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordChar: {
    width: '50px',
    height: '50px',
    border: '1px solid #000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 15px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#000',
  },
  eye_icon: {
    marginTop: '10px',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ResetPassword() {
  const classes = useStyles();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromParams = params.get('email');
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [location.search]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const showSuccessAlert = (text) => {
    Swal.fire({
      title: 'Success.',
      icon: 'success',
      text: text,
      showConfirmButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/`);
        
      }
    });
  };
  const handlePasswordChange = (setter) => (event) => {
    if (event.target.value.length <= 4) {
      setter(event.target.value);
    }
  };

  const handleClickShowPassword = (setter, value) => () => {
    setter(!value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnackbarMessage('');
    setSnackbarSeverity('info');
  
    if (newPassword !== confirmPassword) {
      setSnackbarMessage('Passwords do not match.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    try {
      const response = await fetch('https://reiosglobal.com/Printsmy_Backend/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });
  
      // Log the raw response
      const text = await response.text();
      console.log('Server response:', text);
  
      // Attempt to parse the response as JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        throw new Error('Invalid response format');
      }
  
      if (response.ok) {
        showSuccessAlert('Password has been successfully reset.');
        //setSnackbarMessage('Password has been successfully reset.');
       // setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(data.message || 'Failed to reset password. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error('Password Reset Error:', err);
      setSnackbarMessage('Failed to reset password. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const renderPassword = (password, showPassword) => {
    const placeholders = Array.from({ length: 4 - password.length }).fill('');

    return (
      <div className={classes.passwordContainer}>
        {password.split('').map((char, index) => (
          <div key={index} className={classes.passwordChar}>
            {showPassword ? char : <div className={classes.dot}></div>}
          </div>
        ))}
        {placeholders.map((_, index) => (
          <div key={index} className={classes.passwordChar}></div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: '#7f223d',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div className={classes.logo}>
        <img
          src={images3}
          alt='Custom Icon'
          className={classes.img}
          style={{ display: 'flex', justifyContent: 'center', height: '150px', width: '150px' }}
        />
      </div>
      <Container component='main' maxWidth='xs' className={classes.container}>
        <Typography component='h1' variant='h5'>
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormControl margin='normal' required fullWidth>
            <label htmlFor='newPassword'>New Password</label>
            <div className={classes.passwordContainer}>
              {renderPassword(newPassword, showPassword)}
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={handlePasswordChange(setNewPassword)}
                className={classes.hiddenInput}
                maxLength={4}
                autoComplete='off'
              />
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword(setShowPassword, showPassword)}
                onMouseDown={handleMouseDownPassword}
                className={classes.eye_icon}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <div className={classes.passwordContainer}>
              {renderPassword(confirmPassword, showConfirmPassword)}
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handlePasswordChange(setConfirmPassword)}
                className={classes.hiddenInput}
                maxLength={4}
                autoComplete='off'
              />
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword(setShowConfirmPassword, showConfirmPassword)}
                onMouseDown={handleMouseDownPassword}
                className={classes.eye_icon}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>
          </FormControl>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            fullWidth
            className={classes.submit}
          >
            Reset Password
          </Button>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <SnackbarContent
            message={<span>{snackbarMessage}</span>}
            style={{ backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336' }}
          />
        </Snackbar>
      </Container>
    </div>
  );
}

export default ResetPassword;
