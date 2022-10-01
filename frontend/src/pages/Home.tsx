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

const theme = createTheme();

const line1 = [
  { number: '1' },
  { number: '2' },
  { number: '3' },
  { number: '4' },
  { number: '5' },
  { number: '6' }];
const Home: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [table, setTable] = useState('');
  const [hover, setHover] = useState(false);
  const [diner, setDiner] = useState('');

  const selectTable = (e: any) => {
    setTable(e)
    
  };
  
  useEffect(() => {
    console.log('table', table)
    setHover(true)
  },[table])

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
            borderRadius: 5
          }}

        />
        <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{  height: 1100, width: 900 }}>
            <Typography variant="h4" gutterBottom>
              Welcome!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#626264' }}>
              Enjoy your meal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 900, marginTop: 10 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <ButtonIcon name="table" />
                <Typography variant="h5" sx={{ margin: 1, fontWeight: 'bold' }}>
                  TABLE
                </Typography>
              </Box>
              <Box sx={{marginTop:5, marginLeft:10, marginBottom:5, display:'flex', justifyContent:'space-between'}}>
                {line1.map((line1) => {
                  return (
                    <BorderButton doSomething={()=>selectTable(line1.number)} 
                    number={line1.number} 
                    selected={hover  ? true : false}
                    />
                  )
                }
                )}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <ButtonIcon name="diner" />
                <Typography variant="h5" sx={{ margin: 1, fontWeight: 'bold' }}>
                  DINER
                </Typography>

              </Box>
            </Box>
          </Box>

        </Grid>

      </Grid>
    </ThemeProvider>
  );
};

export default Home;
