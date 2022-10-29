import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  createTheme,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import { addManagerItem, getManagerItem } from "../api/manager";
import ManagerAddDishButton from "../stories/manager/managerAddDishButton/ManagerAddDishButton";


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
    title: string;
    cost: number;
  }[]
}

const ManagerMenu: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<any>();
  const [itemList, setItemList] = useState<any>();
  const [nowItemList, setNowItemList] = useState<any>();
  const [nowCategoryId, setNowCategoryId] = useState<string>('1');
  const [nowCategoryIndex, setNowCategoryIndex] = useState<number>(0);

  const map1 = new Map();
  const init = async () => {
    const message = await getManagerItem();
    if (message) {
      setCategoryList(message?.categoryList);

      message?.categoryList.map((item: any, index: number) => {
        map1.set(item.categoryId.toString(), index);
      });
      console.log(map1.get('2'));

      setItemList(message?.itemList);
      setNowItemList(message?.itemList[0].itemList);
      setNowCategoryId(message?.categoryList[0].categoryId.toString());
      setNowCategoryIndex(0);
    }
  }

  const addItem = async (
    input:
      {
        ingredient: string;
        picture: string;
        categoryName: string;
        description: string;
        calorie: number;
        title: string;
        cost: number;
      }) => {
    const message = await addManagerItem(input);
    if (message) {
      setItemList(message?.itemList);
      setNowItemList(message?.itemList[0]);
      // setNowCategoryId(message?.categoryList[0].categoryId.toString());
      // setNowCategoryIndex(message?.categoryList[0].categoryName);
    }

  }


  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    console.log(categoryList)

    // if (categoryList)
    // {
    //  for (let i =0; i< categoryList.categoryList.length; i++){
    //   if (categoryList.categoryList[i].categoryId.toString() === nowCategoryId){
    //     setNowCategoryIndex(categoryList.categoryList[i].categoryName)
    //   }
    //  }
    // }
    setNowCategoryIndex(map1.get(nowCategoryId));
    if (itemList)
    setNowItemList(itemList[map1.get(nowCategoryId)]);
    console.log('now index', map1.get(nowCategoryId));
  }, [nowCategoryId])

  useEffect(() => {

    // console.log(typeof(categoryList?.categoryList));
    console.log('total item list', itemList);
    console.log('now item list', nowItemList);
    console.log('now category id', nowCategoryId);
  }, [categoryList, itemList, nowItemList, nowCategoryId])

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
          <Box sx={{ alignItems: 'end', justifyContent: 'space-between', height: 300, width: '100%', display: 'flex' }}>
            <Box sx={{ ml: 20 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}  >
                CATEGORY NAME
              </Typography>
              <Select
                value={nowCategoryId ? nowCategoryId : '1'}
                onChange={handleCategorySelectChange}
                sx={{ height: 35, mb: 5 }}
              >
                {categoryList?.map((item: any) => {
                  return (
                    <MenuItem key={'cate' + item.categoryId} value={item.categoryId.toString()}>
                      {item.categoryName}
                    </MenuItem>
                  )
                })
                }
              </Select>
            </Box>
            <Box sx={{ mr: 20, mb: 5 }}>
              <ManagerAddDishButton
                addCard={(obj) => { }}
              />
            </Box>

          </Box>
          <Box sx={{ height: '100%', width: '100%', overflow: "auto", mt: 5 }}>
          {/* <div>{JSON.stringify(nowItemList?[1]:0)}</div> */}
            {/* <Box sx={{ display: 'flex', height: '100%', flexGrow: 1, overflow: "auto", justifyContent: 'center', alignItems: 'start', ml: 17, mt: 5 }} > */}
              <Grid container spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }}  >

                {nowItemList? nowItemList[nowCategoryId].map((item: any) => {
                return (
                  // <Grid item xs={'auto'} key={item.dishId} >
                  <div>{JSON.stringify(item)}</div>
                    // <div></div>
                  // </Grid>
                )
              }):console.log('1')}
              {/* { nowItemList.length === 0 && ( 
                  <Grid item xs={12} sx={{height:'calc(100vh - 95px)' ,display:'flex', justifyContent:'center',alignItems:'center'}}>
                    <Typography variant="h3">
                      Upcoming......
                      </Typography>
                    </Grid>
              )

              } */}



              </Grid>

            {/* </Box> */}
          </Box>
        </Box>


      </Box>

    </ThemeProvider>
  );
};

export default ManagerMenu;