import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";

import ManageDishCard from "../stories/manager/managerDishCard/ManagerDishCard"
import ManagerAddDishButton from "../stories/manager/managerAddDishButton/ManagerAddDishButton";
import { getWaitRequest } from "../api/wait";
import ShowService from "../stories/manager/ShowService";

const theme = createTheme();

interface requestInterface {
  requestsList: {
    id?: number;
    table?: number;
    startTime?: string;
  }[]
};

const ManagerService: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState<requestInterface | any>()

  const getRequest = async () => {
    const message = await getWaitRequest();
    setRequest(message);
    // console.log(message.requestsList);
  };

  useEffect(() => {
    const timer = setInterval(getRequest, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getRequest();
  }, []);


  return (

    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', mt: 10, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', width: '100%', }}>
            <Typography sx={{ m: 5, ml: 15 }} variant='h3'>
              Now request:
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', overflow: "auto", ml: 15, flexGrow: 1 }}>

            <Grid container alignItems='flex-start' justifyContent="flex-start" spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} >

              {request?.requestsList.map((item: any, index: any) => {
                // if (item.requestTime)
                return (
                  <Grid item xs={'auto'} key={'request' + item.requestId + 'index' + index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ShowService
                      requestId={item.id}
                      table={item.table}
                      startTime={item.startTime}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Box>


      </Box>
    </ThemeProvider>

  );
};

export default ManagerService;