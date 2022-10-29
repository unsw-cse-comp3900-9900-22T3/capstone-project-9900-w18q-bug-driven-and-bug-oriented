import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  createTheme,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import { getManagerItem } from "../api/manager";


const theme = createTheme();

interface categoryListInterface {
  categoryList: {
    categoryName: string;
    categoryId: number;
  }[]
}

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
  }[]
}

const ManagerMenu: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<categoryListInterface>();
  const [itemList, setItemList] = useState<any>();
  const [nowItemList, setNowItemList] = useState<any>();
  const [nowCategoryId, setNowCategoryId] = useState<string>();
  const [nowCategoryName, setNowCategoryName] = useState<string>();

  const init = async () => {
    const message = await getManagerItem();
    if (message) {
      setCategoryList(message?.categoryList);
      setItemList(message?.itemList);
      setNowItemList(message?.itemList[0]);
      setNowCategoryId(message?.categoryList[0].categoryId.toString());
    }
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    // console.log(categoryList)
    if (categoryList)
    {
      categoryList.categoryList.map((item)=>{
        if (item.categoryId.toString() === nowCategoryId)
        setNowCategoryName(item.categoryName);
      })
    }
    
  }, [nowCategoryId])

  useEffect(() => {

    console.log(categoryList);
    console.log(itemList);
    console.log(nowItemList);
    console.log(nowCategoryId);

  }, [categoryList, itemList, nowItemList])

  // useEffect(() => {
  //   console.log(nowCategoryId);
  // },[nowCategoryId])


  const handleCategorySelectChange = (event: SelectChangeEvent) => {
    setNowCategoryId(event.target.value);
    // handleCategoryChange(event);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>


        <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ alignItems: 'end', justifyContent: 'left', height: 200, width: '100%', display: 'flex' }}>
            <Box sx={{ mr: 20 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}  >
                CATEGORY NAME
              </Typography>
              {/* <Select
                value={nowCategoryId? nowCategoryId: '-1'}
                onChange={handleCategorySelectChange}
                sx={{ height: 35, mb: 5 }}
              >
                {categoryList?.categoryList.map((item) => {
                  return (<MenuItem value={item.categoryId.toString()}>{item.categoryName}</MenuItem>)
                })
                }
              </Select> */}
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