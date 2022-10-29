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
import { addManagerItem, deleteManagerItem, editManagerItem, getManagerItem } from "../api/manager";
import ManagerAddDishButton from "../stories/manager/managerAddDishButton/ManagerAddDishButton";
import ManagerDishCard from "../stories/manager/managerDishCard/ManagerDishCard";


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
  const [nowCategoryName, setNowCategoryName] = useState<string>('');
  const [mapList, setMapList] = useState<any>();
  
  const init = async () => {
    const message = await getManagerItem();
    if (message) {
      setCategoryList(message?.categoryList);


      var map1 = new Map();
      message?.categoryList.map((item: any) => {
        map1.set(item.categoryId.toString(), item.categoryName);
      });
      setMapList(map1);
      console.log(map1);

      setItemList(message?.itemList);
      setNowItemList(message?.itemList[0].itemList);
      setNowCategoryId(message?.categoryList[0].categoryId.toString());
      setNowCategoryName(message?.categoryList[0].categoryName);
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
      console.log('add success ', message)
      setItemList(message?.itemList);
      // setNowItemList(message?.itemList[0]);
      // setNowCategoryId(message?.categoryList[0].categoryId.toString());
      // setNowCategoryName(message?.categoryList[0].categoryName);
    }

  }

  const deleteItem = async (
    input:number
  ) => {
    const message = await deleteManagerItem(input.toString());
    if (message) {
      console.log('delete success', message)
      setItemList(message?.itemList);
    }
  }

  const editItem = async (
    id:number,
    input:{
      categoryName:string;
      title:string;
      description:string;
      ingredient:string;
      cost:number;
      calorie:number;
      picture:string;
    }, 
    
  ) => {
    const message = await editManagerItem(id.toString(),input);
    if (message) {
      console.log('edit success', message)
      setItemList(message?.itemList);
    }
  }


  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    console.log(categoryList)
    // console.log(map1.get('4'));
    // console.log('now',map1.get(nowCategoryId));
    if (itemList) {
      setNowCategoryName(mapList.get(nowCategoryId));
      itemList.map((item: any) => {
        if (item.categoryId.toString() === nowCategoryId) {
          setNowItemList(item.itemList);
        }
      });
    }
    // console.log('now name', map1.get(nowCategoryId));

  }, [nowCategoryId,itemList,])

  useEffect(() => {

    // console.log(typeof(categoryList?.categoryList));
    // console.log('total item list', itemList);
    console.log('now item list', nowItemList);
    // console.log('now category id', nowCategoryId);
    console.log('now category name', nowCategoryName);
  }, [nowCategoryName])

  useEffect(() => {
    console.log(nowCategoryId);
  },[nowCategoryId])


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
                value={nowCategoryId ? nowCategoryId : undefined}
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
                
                categoryName={nowCategoryName}
                addCard={(obj) => {addItem(obj)}}
              />
            </Box>

          </Box>
          <Box sx={{ flexGrow:1, height: '100%',overflow: "auto", mt: 5,ml: 17, }}>
            {/* <div>{JSON.stringify(nowItemList?[1]:0)}</div> */}
            {/* <Box sx={{ display: 'flex', height: '100%', flexGrow: 1, overflow: "auto", justifyContent: 'center', alignItems: 'start', ml: 17, mt: 5 }} > */}
            <Grid container spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }}  >

              {nowItemList?.map((item: any) => {

                return (
                  <Grid item xs={'auto'} key={item.dishId} sx={{mt:5}} >
                    <ManagerDishCard
                    dishId={item.dishId}
                    dishName={item.dishName}
                    categoryName={item.categoryName}
                    description={item.description}
                    ingredients={item.ingredient}
                    calories={item.calorie}
                    price={item.price}
                    picture={item.picture}
                    removeCard={(e)=>deleteItem(e)}
                    editCard={(obj)=> {editItem(item.dishId, obj)} }
                    />

                  </Grid>
                )
              })}
              {nowItemList?.length === 0 && (
                <Grid item xs={12} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt:30 }}>
                  <Typography variant="h3">
                    Please add new items......
                  </Typography>
                </Grid>
              )

              }



            </Grid>

            {/* </Box> */}
          </Box>
        </Box>


      </Box>

    </ThemeProvider>
  );
};

export default ManagerMenu;