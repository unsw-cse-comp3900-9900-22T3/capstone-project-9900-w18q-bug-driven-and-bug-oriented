import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import html from './dashboard'
import PacmanLoader from "react-spinners/PacmanLoader";


const theme = createTheme();

// class Rsvp extends React.Component {
//   constructor(props: {} | Readonly<{}>) {
//     super(props);
//     this.state = {
//       loading: true
//     };
//   }
// hideSpinner = () => {
//     this.setState({
//       loading: false
//     });
//   };


const Manager: React.FC<{}> = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
  }, []);


  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <PacmanLoader size={100} color={"#503E9D"} loading={loading} />
        </Box>
      ) : null}
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
          <Box>
            <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
          </Box>


          <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', minWidth: 1500, ml: 30 }}>
            <iframe
              id='ifra'
              title="resg"
              srcDoc={html}
              style={{ width: '100%', border: '0px', height: '100%' }}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              scrolling="auto"
            onLoad={()=>setTimeout(()=> setLoading(false), 2200)}
            />
          </Box>
          {
          }



        </Box>

    </ThemeProvider>
  );
};

export default Manager;