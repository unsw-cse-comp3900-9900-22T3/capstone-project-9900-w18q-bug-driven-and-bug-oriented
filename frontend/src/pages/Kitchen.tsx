import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const theme = createTheme();

const Kitchen: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div>Kitchen page</div>
      <Button onClick={()=>navigate("/kitchen/123")}>order</Button>
    </ThemeProvider>
  );
};

export default Kitchen;