import React, { useState, useEffect, useContext } from "react";
import MuiAlert from '@mui/material/Alert';
import {
  AlertProps,
  Box,
  Button,
  createTheme,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import homeImg from "../static/homeImg.jpg"
import StaffSelectButton from "../stories/home/StaffSelectButton";
import Kitchen from "./Kitchen";
import BigButton from "../stories/home/BigButton";
import ButtonIcon from "../stories/home/ButtonIcon";
import { checkLogin } from "../api/login";
import DishCard from "../stories/customer/dishCard/DishCard";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

const Staff: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState('');
  const [showKey, setShowKey] = useState(false)
  const [key, setKey] = useState('')

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };


  const gotToStaff = async () => {
    const message = await checkLogin({
      staff: staff,
      key: key,
      table: '',
      diner: ''
    });
    console.log('message', message);
    if (message.data.message === 'Login success') {
      console.log('login success');
      navigate(`/${message.data.staff}`);
    } else {
      console.log('error key');
      handleClick();
    }
  };




  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    console.log('staff = ', staff, 'key = ', key)
  }, [staff, key])

  const selectStaff = (e: any) => {
    if (staff == e) {
      setStaff('')
    } else {
      setStaff(e)
    }
  };

  // const checkKey = (e: any, correctKey:any) => {
  //   if (e === correctKey) {
  //     console.log('go to', staff);
  //     navigate(`/${staff}`);
  //   } else {
  //     console.log('error key');
  //     handleClick()
  //   }
  // };

  useEffect(() => {
    const keyDownHandler = (e: any) => {
      console.log('now pressed:', e.key);
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!showKey && staff){
          setShowKey(true);
        } else if (showKey && key) {
          gotToStaff();
        }

      }
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    }
  }, [key, staff,showKey,])

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", minWidth: 1100, minHeight: 1000 }}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="warning" sx={{ width: 600 }}>
            Wrong key. Please try again.
          </Alert>
        </Snackbar>
        <Grid
          item
          xs={3}
          sx={{
            height: '100%',
            backgroundImage:
              `url(${homeImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            display:'flex',
            justifyContent:'right',
            alignItems:'end'
          }}
          >
          <Typography variant="h4" sx={{m:3,fontWeight:'bold',color:'#ABA89E'}}>
            New Bee
          </Typography>
        </Grid>

        {!showKey && (
          <Grid item xs={9} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ justifyContent: 'left', margin: 10 }}>
              <IconButton aria-label="delete" color='inherit' size="large" onClick={() => navigate(-1)}>
                <ArrowBackIosIcon />
              </IconButton>
            </Box>
            <Box sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Box sx={{ height: 650, width: 600, marginBottom: 20 }}>
                <Typography variant="h4" gutterBottom>
                  I'm Staff
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#626264' }}>
                  Please select your role to continue
                </Typography>
                <Box sx={{ marginTop: 7 }}>
                  {(staff == 'kitchen') && (
                    <StaffSelectButton doSomething={() => selectStaff('kitchen')} role='Kitchen staff' selected />
                  )}
                  {(staff !== 'kitchen') && (
                    <StaffSelectButton doSomething={() => selectStaff('kitchen')} role='Kitchen staff' />
                  )}
                </Box>
                <Box sx={{ marginTop: 7 }}>
                  {(staff == 'wait') && (
                    <StaffSelectButton doSomething={() => selectStaff('wait')} role='Wait staff' selected />
                  )}
                  {(staff !== 'wait') && (
                    <StaffSelectButton doSomething={() => selectStaff('wait')} role='Wait staff' />
                  )}
                </Box>
                <Box sx={{ marginTop: 7 }}>
                  {(staff == 'manager') && (
                    <StaffSelectButton doSomething={() => selectStaff('manager')} role='Manager' selected />
                  )}
                  {(staff !== 'manager') && (
                    <StaffSelectButton doSomething={() => selectStaff('manager')} role='Manager' />
                  )}
                </Box>
                <Box sx={{ marginTop: 10 }}>
                  {staff && (
                    <BigButton name='Continue' confirm doSomething={() => setShowKey(true)} />
                  )}
                  {!staff && (
                    <BigButton name='Continue' confirm={false} />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        )}
        {showKey && (
          <Grid item xs={9} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ justifyContent: 'left', margin: 10 }}>
              <IconButton aria-label="delete" color='inherit' size="large" onClick={() => setShowKey(false)}>
                <ArrowBackIosIcon />
              </IconButton>
            </Box>
            <Box sx={{ height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Box sx={{ height: 650, width: 800, marginBottom: 5 }}>
                <Typography variant="h4" gutterBottom>
                  Welcome!
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#626264' }}>
                  Please enter your key
                </Typography>
                <Box sx={{ marginTop: 5, display: 'flex', }}>
                  <ButtonIcon name='key' />
                  <Box sx={{ width: 550, marginLeft: 2, marginTop: 1 }}>
                    <TextField
                      id="standard-password-input"
                      label="Key"
                      type="password"
                      autoComplete="current-password"
                      variant="standard"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                        focused: true,
                      }}
                      value={key}
                      onChange={(e: any) => setKey(e.target.value)}
                    />
                  </Box>
                </Box>
                <Box sx={{ marginTop: 10 }}>
                  {key && (
                    <BigButton name='Log in' confirm doSomething={() => gotToStaff()} />
                  )}
                  {!key && (
                    <BigButton name='Log in' confirm={false} />
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                    <Typography variant="subtitle1" sx={{ color: '#626264' }}>
                      Forgot key? Please contact to the manager.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default Staff;