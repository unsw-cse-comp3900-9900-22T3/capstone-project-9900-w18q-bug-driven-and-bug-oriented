import React, { useState, useEffect, useContext } from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const theme = createTheme();

const Home: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div>home page</div>
    </ThemeProvider>
  );
};

export default Home;
