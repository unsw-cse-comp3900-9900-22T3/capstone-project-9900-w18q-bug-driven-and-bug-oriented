import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import homeImg from "../static/homeImg.jpg"
import { height } from "@mui/system";
import ButtonIcon from "../stories/home/ButtonIcon";
import BorderButton from "../stories/home/BorderButton";
import OrderNowButton from "../stories/home/OrderNowButton";

const theme = createTheme();

const tableList = [
  { number: '1' },
  { number: '2' },
  { number: '3' },
  { number: '4' },
  { number: '5' },
  { number: '6' },
  { number: '7' },
  { number: '8' },
  { number: '9' },
  { number: '10' },
  { number: '11' },
  { number: '12' },
];

const dinerList = [
  { number: '1' },
  { number: '2' },
  { number: '3' },
  { number: '4' },
  { number: '5' },
  { number: '6' },
];
const Home: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [table, setTable] = useState('');
  const [diner, setDiner] = useState('');

  const selectTable = (e: any) => {
    if (table == e) {
      setTable('')
    } else {
      setTable(e)
    }
  };

  const goToOrder = (table:any, diner:any) => {
    console.log('select success', 'table=', table, 'diner=', diner)
    navigate('/customer/123/hot')
  }

  const selectDiner = (e: any) => {
    if (diner == e) {
      setDiner('')
    } else {
      setDiner(e)
    }
  };

  useEffect(() => {
    console.log('table = ', table, 'diner = ', diner)
  }, [table, diner])

  return (
    <ThemeProvider theme={theme}>

      <Grid container component="main" sx={{ height: "100vh", minWidth: 1100, minHeight: 1000 }}>
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
            borderBottomRightRadius:10,
          }}
        />
        <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ height: 800, width: 900 }}>
            <Typography variant="h4" gutterBottom >
              Welcome!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#626264' }}>
              Enjoy your meal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 900, marginTop: 10 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <ButtonIcon name="table" />
                <Typography variant="h5" sx={{ margin: 1, marginLeft: 2, fontWeight: 'bold' }}>
                  TABLE
                </Typography>
              </Box>
              <Grid container spacing={3} sx={{ marginLeft: 7, marginBottom: 10, marginTop: 1 }}>
                {tableList.map((tableList) => {
                  return (
                    <Grid item xs={2}>
                      {
                        tableList.number == table && (
                          <BorderButton doSomething={() => selectTable(tableList.number)}
                            number={tableList.number}
                            selected={true}
                          />
                        )}
                      {
                        tableList.number !== table && (
                          <BorderButton doSomething={() => selectTable(tableList.number)}
                            number={tableList.number}
                            selected={false}
                          />
                        )}
                    </Grid>
                  )
                })}
              </Grid>

              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <ButtonIcon name="diner" />
                <Typography variant="h5" sx={{ margin: 1, marginLeft: 2, fontWeight: 'bold' }}>
                  DINER
                </Typography>

              </Box>
              <Grid container spacing={3} sx={{ marginLeft: 7, marginBottom: 10, marginTop: 1 }}>
                {dinerList.map((dinerList) => {
                  return (
                    <Grid item xs={2}>
                      {
                        dinerList.number == diner && (
                          <BorderButton doSomething={() => selectDiner(dinerList.number)}
                            number={dinerList.number}
                            selected={true}
                          />
                        )}
                      {
                        dinerList.number !== diner && (
                          <BorderButton doSomething={() => selectDiner(dinerList.number)}
                            number={dinerList.number}
                            selected={false}
                          />
                        )}
                    </Grid>
                  )
                })}
              </Grid>
              <Box >
                <Box sx={{ marginBottom: 2 }}>
                  {(diner && table) && (
                    <OrderNowButton doSomething={()=>goToOrder(table,diner)} isStaff={false} confirm={true} />
                  )}
                  {(!diner || !table) && (
                    <OrderNowButton isStaff={false} confirm={false} />
                  )}
                </Box>
                <Box>
                   <OrderNowButton doSomething={() => navigate('/staff')} isStaff={true} />
                </Box>
               
              </Box>

            </Box>


          </Box>

        </Grid>

      </Grid>
    </ThemeProvider>
  );
};

export default Home;
