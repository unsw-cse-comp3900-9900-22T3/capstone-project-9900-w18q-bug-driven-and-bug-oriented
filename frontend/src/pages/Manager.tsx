import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import html from './BAtest'


const theme = createTheme();

const Manager: React.FC<{}> = () => {
  const navigate = useNavigate();



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <NavBar role='manager' doSomething={() => { }} />
        <div></div>
        <iframe
        title="resg"
        srcDoc={html}
        style={{ width: '100%', border: '0px', height: '1100px' }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        scrolling="auto"
      />

      </Box>

    </ThemeProvider>
  );
};

export default Manager;