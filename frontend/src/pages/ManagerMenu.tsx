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
import { addManagerItem, deleteManagerItem, editManagerItem, getManagerItem, postManagerItemOrder } from "../api/manager";
import ManagerAddDishButton from "../stories/manager/managerAddDishButton/ManagerAddDishButton";
import ManagerDishCard from "../stories/manager/managerDishCard/ManagerDishCard";
import { Interface } from "readline";


const theme = createTheme();

interface categoryListInterface {
  [index: number]: {
    categoryName: string;
    categoryId: number;
  }
}



interface itemListInterface {
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

interface totalInterface {
  [index: number]: {
    categoryId: number;
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
}


const ManagerMenu: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<categoryListInterface>();
  const [nowSelect, setNowSelect] = useState(-1);
  const [itemList, setItemList] = useState<totalInterface>();
  const [nowItemList, setNowItemList] = useState<itemListInterface>();
  const [nowCategoryId, setNowCategoryId] = useState<string>('');
  const [nowCategoryName, setNowCategoryName] = useState<string | undefined>('');
  const [mapList, setMapList] = useState<Map<string, string>>();

  const init = async () => {
    const message = await getManagerItem();
    if (message) {
      setCategoryList(message?.categoryList);
      var map1 = new Map();
      message?.categoryList.map((item: any) => {
        map1.set(item.categoryId.toString(), item.categoryName);
      });
      setMapList(map1);

      setItemList(message?.itemList);
      setNowItemList({itemList:message?.itemList[0].itemList});
      setNowCategoryId(message?.categoryList[0].categoryId.toString());
      setNowCategoryName(message?.categoryList[0].categoryName);
    }
  }


  const exList = (arr: {
    ingredient: string;
    picture: string;
    categoryName: string;
    dishId: number;
    description: string;
    calorie: number;
    dishName: string;
    price: number;
  }[], index1: number, index2: number) => {

      if (index1 >= 0 && index2 >= 0 && index1 < arr.length && index2 < arr.length) {
        arr.splice(index1, 1, ...arr.splice(index2, 1, arr[index1]));
      }
      return arr;

  }

  const changeList = (index1: number, index2: number) => {
    if (nowItemList) {
      
      setNowItemList({
        itemList: exList(nowItemList.itemList, index1, index2)
      })
    }
  }

  const postOrder = async (input: {
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
  }  ) => {
    const message = await postManagerItemOrder(input);
    console.log('new category', message);
    setItemList(message.itemList);
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
    }
  }

  const deleteItem = async (
    input: number
  ) => {
    const message = await deleteManagerItem(input.toString());
    if (message) {
      console.log('delete success', message)
      setItemList(message?.itemList);
    }
  }

  const editItem = async (
    id: number,
    input: {
      categoryName: string;
      title: string;
      description: string;
      ingredient: string;
      cost: number;
      calorie: number;
      picture: string;
    },

  ) => {
    const message = await editManagerItem(id.toString(), input);
    if (message) {
      console.log('edit success', message)
      setItemList(message?.itemList);
    }
  }


  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    // console.log(categoryList)
    // console.log(map1.get('4'));
    // console.log('now',map1.get(nowCategoryId));
    if (itemList) {
      setNowCategoryName(mapList?.get(nowCategoryId));
      Array.isArray(itemList) && itemList.map((item: any) => {
        if (item.categoryId.toString() === nowCategoryId) {
          setNowItemList({itemList:item.itemList});
        }
      });
    }
    // console.log('now name', map1.get(nowCategoryId));

  }, [nowCategoryId, itemList,])

  useEffect(() => {

    // console.log(typeof(categoryList?.categoryList));
    // console.log('total item list', itemList);
    console.log('now item list', nowItemList);
    // console.log('now category id', nowCategoryId);
    console.log('now category name', nowCategoryName);
  }, [nowCategoryName])

  useEffect(() => {
    console.log('move after', nowItemList);
  }, [nowItemList])


  const handleCategorySelectChange = (event: SelectChangeEvent) => {
    setNowCategoryId(event.target.value);
    // handleCategoryChange(event);
  };

  useEffect(() => {
    if (nowSelect === -1 && nowItemList) {
      postOrder(nowItemList)
      console.log('now select is', nowSelect);
    }

  }, [nowSelect])




  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>


        <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ alignItems: 'end', justifyContent: 'space-between', height: 300, width: '100%', display: 'flex' }}>
            <Box sx={{ ml: 20 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold',mb:1 }}  >
                CATEGORY NAME:
              </Typography>
              {
                nowCategoryId && (<Select
                  value={nowCategoryId ? nowCategoryId : ""}
                  onChange={handleCategorySelectChange}
                  sx={{ height: 35, mb: 5 }}
                >
                  {Array.isArray(categoryList) && categoryList?.map((item: any) => {
                    return (
                      <MenuItem key={'cate' + item.categoryId} value={item.categoryId.toString()}>
                        {item.categoryName}
                      </MenuItem>
                    )
                  })
                  }
                </Select>)
              }

            </Box>
            <Box sx={{ mr: 20, mb: 5 }}>
              <ManagerAddDishButton

                categoryName={nowCategoryName}
                addCard={(obj) => { addItem(obj) }}
              />
            </Box>

          </Box>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: "auto", mt: 5, ml: 17, }}>
            {/* <div>{JSON.stringify(nowItemList?[1]:0)}</div> */}
            {/* <Box sx={{ display: 'flex', height: '100%', flexGrow: 1, overflow: "auto", justifyContent: 'center', alignItems: 'start', ml: 17, mt: 5 }} > */}
            <Grid container spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }}  >

              {Array.isArray(nowItemList?.itemList) && nowItemList?.itemList?.map((item: any, index) => {

                return (
                  <Grid item xs={'auto'} key={'dishname' + item.dishId} sx={{ mt: 5 }} >
                    <ManagerDishCard
                      dishId={item.dishId}
                      dishName={item.dishName}
                      categoryName={item.categoryName}
                      description={item.description}
                      ingredients={item.ingredient}
                      calories={item.calorie}
                      price={item.price}
                      picture={item.picture}
                      removeCard={(e) => deleteItem(e)}
                      editCard={(obj) => { editItem(item.dishId, obj) }}
                      canMove={nowSelect === item.dishId ? true : false}
                      fatherListener={setNowSelect}
                      moveLeft={() => changeList(index, index - 1)}
                      moveRight={() => changeList(index, index + 1)}
                    />

                  </Grid>
                )
              })}
              {Array.isArray(nowItemList?.itemList) && nowItemList?.itemList.length === 0 && (
                <Grid item xs={12} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 30 }}>
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