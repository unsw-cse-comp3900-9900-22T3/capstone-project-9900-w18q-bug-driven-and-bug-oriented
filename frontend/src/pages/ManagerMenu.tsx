import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import { getManagerItem } from "../api/manager";


const theme = createTheme();

interface categoryInterface {
  categoryName: string;
  categoryId: number;
}

interface itemInterface {
  itemList: {
    ingredient: string;
    picture: string;
    categoryName: string;
    dishId: number;
    description: string;
    calorie: number;
    dishName: string;
    price: number;
  }
}

const ManagerMenu: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<categoryInterface>();
  const [itemList, setItemList] = useState();

  const init = async () => {
    const message = await getManagerItem();
    if (message) {
      setCategoryList(message.categoryList);
      setItemList(message.itemList);
    }

  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>


        <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ alignItems: 'end', justifyContent: 'right', height: 200, width: '100%', display: 'flex' }}>
            <Box sx={{ mr: 20 }}>
              <div>test</div>
            </Box>

          </Box>
          <Box sx={{ height: '100%', width: '100%', overflow: "auto", mt: 5 }}>
            {
              // categoryList?.categoryList.map((item) => {
              //   return (
              //     <React.Fragment key={item.categoryId}>
              //       <Box sx={{ my: 3, mx: 10, height: 185 }}>
              //         <ManagerCategoryCard
              //           categoryId={item.categoryId}
              //           categoryName={item.categoryName}
              //           lastModified={item.lastModified}
              //           canMove={moveItem === item.categoryId ? true : false}
              //           fatherListener={setMoveItem}
              //         />
              //       </Box>

              //     </React.Fragment>
              //   )
              // })
            }
          </Box>
        </Box>


      </Box>

    </ThemeProvider>
  );
};

export default ManagerMenu;