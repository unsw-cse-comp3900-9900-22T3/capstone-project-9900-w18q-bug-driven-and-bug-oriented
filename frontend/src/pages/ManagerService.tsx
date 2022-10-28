import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";

import ManageDishCard from "../stories/manager/managerDishCard/ManagerDishCard"
import ManagerAddDishButton from "../stories/manager/managerAddDishButton/ManagerAddDishButton";

const theme = createTheme();

const ManagerService: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [info1, setinfo1] = useState('info1');
  const [info2, setinfo2] = useState('info2');

  const obj = {
    'dishId': 1,
    'ingredient': 'whole chicken',
    'calorie': 200.0,
    'categoryName': 'Broiled Food',
    'description': 'grilled chicken withlemongrass',
    'picture': '/dishImg/img1.png',
    'dishName': 'Chicken Grill',
    'price': 18.9,
  }
  return (
    
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'row', m: 5}}>
        <NavBar role='manager' doSomething={()=>{}} postRequest={() => { }} />
        <div>ManagerService page</div>
        <Box>
         <ManageDishCard 
          removeCard={(dishId) => {setinfo1('dish with dishID of ' + dishId + ' is removed' );}}
          moveLeft={() => {setinfo1('move dish left' );}}
          moveRight={() => {setinfo1('move dish right' );}}
         />
         <Box>{info1}</Box>
        </Box>
        <Box>
          <ManagerAddDishButton 
            addCard={(obj) => {setinfo2(JSON.stringify(obj));}}
          />
          <Box>{info2}</Box>
        </Box>
      </Box>
    </ThemeProvider>
    
  );
};

export default ManagerService;