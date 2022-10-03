import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import NavButton from "../stories/NavButton";


const theme = createTheme();

const Waiter: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState('request');
  const [numOfRequest, setNumOfRequest] = useState(0)
  const [numOfItem, setNumOfItem] = useState(0)
  const [numOfOrder, setNumOfOrder] = useState(0)

  return (
    <ThemeProvider theme={theme}>

      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
            Wait Staff
          </Typography>
          <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {show !== 'request' && (
              <NavButton item='request' selected={false} doSomething={() => setShow('request')} number={numOfRequest} />
            )}
            {show === 'request' && (
              <NavButton item='request' selected number={numOfRequest} />
            )}

            {show !== 'item' && (
              <NavButton item='item' selected={false} doSomething={() => setShow('item')} number={numOfItem} />
            )}
            {show === 'item' && (
              <NavButton item='item' selected number={numOfItem} />
            )}

            {show !== 'order' && (
              <NavButton item='order' selected={false} doSomething={() => setShow('order')} number={numOfOrder} />
            )}
            {show === 'order' && (
              <NavButton item='order' selected number={numOfOrder} />
            )}
          </Box>

        </Box>

        {show === 'request' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfRequest(numOfRequest - 1)}
            >-1</Button>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfRequest(numOfRequest + 1)}
            >+1</Button>
          </Box>
        )}

        {show === 'item' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfItem(numOfItem - 1)}
            >-1</Button>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfItem(numOfItem + 1)}
            >+1</Button>
          </Box>
        )}

        {show === 'order' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfOrder(numOfOrder - 1)}
            >-1</Button>
            <Button
              variant="contained"
              sx={{ height: 50, margin: 5 }}
              onClick={() => setNumOfOrder(numOfOrder + 1)}
            >+1</Button>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Waiter;