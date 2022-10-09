import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import html from './dashboard'


const theme = createTheme();

const Manager: React.FC<{}> = () => {
  const navigate = useNavigate();



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='manager' doSomething={() => { }} />
        </Box>


        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', minWidth: 1500, ml:30}}>
          <iframe
            title="resg"
            srcDoc={html}
            style={{ width: '100%', border: '0px', height: '100%' }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            scrolling="auto"
          />
        </Box>


      </Box>

    </ThemeProvider>
  );
};

export default Manager;