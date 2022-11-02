import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  createTheme,
  Divider,
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
import PacmanLoader from "react-spinners/PacmanLoader";
import BorderColorIcon from '@mui/icons-material/BorderColor';


const theme = createTheme({
  typography:{
     fontFamily: "Quicksand"
  }
});

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
  const [move, setMove] = useState(false);
  const [itemList, setItemList] = useState<totalInterface>();
  const [nowItemList, setNowItemList] = useState<itemListInterface>();
  const [nowCategoryId, setNowCategoryId] = useState<string>('');
  const [nowCategoryName, setNowCategoryName] = useState<string | undefined>('');
  const [mapList, setMapList] = useState<Map<string, string>>();

  const [source, setSource] = useState<null | number>(null);
  const [target, setTarget] = useState<null | number>(null);
  const [hide, setHide] = useState(false);

  const sortFunc = () => {
    if (move) {
      setMove(false);
      if (nowItemList) {
        let newList = new Array();
        for (let i = 0; i < nowItemList.itemList.length; i++) {
          if (nowItemList.itemList[i].dishId !== 0)
            newList.push(nowItemList.itemList[i]);
        }
        postOrder({ itemList: newList });
      }
    } else {
      setMove(true);
    }
  }


  const onDragStart = (id: number) => (e: any) => {
    // console.log(`#${id} - `, e);
    setSource(id);
    setTimeout(() => setHide(true), 50);
    console.log('show')
  }

  const onDragOver = (id: number) => (e: any) => {
    // console.log(`#${id} - `, e);
    e.preventDefault();
    setTarget(id);
    console.log('over', id)
    setHide(true)

  }

  const onDragLeave = (id: number) => (e: any) => {
    // console.log(`#${id} - `, e)
    e.preventDefault();
    setTarget(null)
    console.log('leave')
    setTimeout(() => setHide(false), 0);
  }

  const modifyList = (input: itemListInterface): itemListInterface => {
    if (input.itemList) {
      let newList = new Array();

      for (let i = 0; i < input.itemList.length; i++) {
        newList.push(
          {
            ingredient: '',
            picture: '',
            categoryName: '',
            dishId: 0,
            description: '',
            calorie: 0,
            dishName: '',
            price: 0,
          });
        newList.push(input.itemList[i]);
        newList.push(
          {
            ingredient: '',
            picture: '',
            categoryName: '',
            dishId: 0,
            description: '',
            calorie: 0,
            dishName: '',
            price: 0,
          });
      }
      if (newList.length !==0){
        newList.push({
        ingredient: '',
        picture: '',
        categoryName: '',
        dishId: 0,
        description: '',
        calorie: 0,
        dishName: '',
        price: 0,
      });
      }
      
      return { itemList: newList };
    } else {
      return { itemList: [] };
    }

  }


  const onDrop = () => {
    console.log('onDrop!!!!!!!!!!');
    setSource(null);
    setTarget(null);
    setHide(false);
    if ((nowItemList) && (target !== null) && (source !== null)) {
      if (nowItemList.itemList[target].dishId !== 0) {
        nowItemList.itemList[target - 1] = nowItemList.itemList[source]
        console.log('now is 1!!!!!!!!!!');
      } else {
        nowItemList.itemList[target] = nowItemList.itemList[source]
        console.log('now is 2!!!!!!!!!!');
      }

      nowItemList.itemList[source] = {
        ingredient: '',
        picture: '',
        categoryName: '',
        dishId: 0,
        description: '',
        calorie: 0,
        dishName: '',
        price: 0,
      }
      let newList = new Array();
      for (let i = 0; i < nowItemList.itemList.length; i++) {
        if (nowItemList.itemList[i].dishId !== 0)
          newList.push(nowItemList.itemList[i]);
      }
      setNowItemList(modifyList({ itemList: newList }));

    }
  }

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
  }, []);

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
      console.log(modifyList(message?.itemList[0].itemList));
      setNowItemList(modifyList(message?.itemList[0].itemList));
      setNowCategoryId(message?.categoryList[0].categoryId.toString());
      setNowCategoryName(message?.categoryList[0].categoryName);
      setLoading(false);
    }
  }


  // const exList = (arr: {
  //   ingredient: string;
  //   picture: string;
  //   categoryName: string;
  //   dishId: number;
  //   description: string;
  //   calorie: number;
  //   dishName: string;
  //   price: number;
  // }[], index1: number, index2: number) => {

  //   if (index1 >= 0 && index2 >= 0 && index1 < arr.length && index2 < arr.length) {
  //     arr.splice(index1, 1, ...arr.splice(index2, 1, arr[index1]));
  //   }
  //   return arr;

  // }

  // const changeList = (index1: number, index2: number) => {
  //   if (nowItemList) {

  //     setNowItemList({
  //       itemList: exList(nowItemList.itemList, index1, index2)
  //     })
  //   }
  // }

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
  }) => {
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
          setNowItemList(modifyList({ itemList: item.itemList }));
          // setNowItemList({ itemList: item.itemList });
        }
      });
    }
    setMove(false);
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
    if (move === false && nowItemList) {
      // postOrder(nowItemList)
      console.log('now select is', move);
    }

  }, [move])




  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>
        {loading ? (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <PacmanLoader size={100} color={"#503E9D"} loading={loading} />
          </Box>
        ) : (<Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ alignItems: 'end', justifyContent: 'space-between', height: 300, width: '100%', display: 'flex' }}>
            <Box sx={{ ml: 20 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}  >
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
            <Box sx={{ mr: 20, mb: 5, display: 'flex' }}>
              <Box sx={{ mr: 5 }}>
                <Button variant="contained" onClick={sortFunc} sx={{
                  height: 45, width: 120, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
                    backgroundColor: '#8475B0'
                  }
                }}>
                  <Box sx={{ display: 'flex' }}>
                    <BorderColorIcon sx={{ color: '#ffffff' }} />
                    <Typography variant="inherit" sx={{ color: '#ffffff', marginLeft: 1, fontSize: 16 }}>
                      sort
                    </Typography>
                  </Box>
                </Button>
              </Box>
              <ManagerAddDishButton
                categoryName={nowCategoryName}
                addCard={(obj) => { addItem(obj) }}
              />
            </Box>

          </Box>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: "auto", mt: 5, ml: 10, }}>
            {/* <div>{JSON.stringify(nowItemList?[1]:0)}</div> */}
            {/* <Box sx={{ display: 'flex', height: '100%', flexGrow: 1, overflow: "auto", justifyContent: 'center', alignItems: 'start', ml: 17, mt: 5 }} > */}
            <Grid container spacing={{}} justifyContent='start' >

              {Array.isArray(nowItemList?.itemList) && nowItemList?.itemList?.map((item: any, index) => {
                if (index % 3 === 1)
                return (
                  <Grid item container xs={'auto'} key={'dishname' + index}>
                    
                    <Box sx={{
                        mt: 3,
                        width: 280,
                        mr:-31.25,
                        // bgcolor: index-1 === target ? "red" : 'green',
                        position: 'relative',
                        zIndex: hide ? 15 : 5,
                        display:'flex',
                        justifyContent:'start',
                        borderLeft: (index-1 === target ) ? '3px solid #503E9D': '3px solid #ffffff',
                        mb:3
                      }}
                        onDragOver={onDragOver(index - 1)}
                        onDragLeave={onDragLeave(index)}
                        onDragStart={onDragStart(index - 1)}
                        onDrop={onDrop}
                        
                      >
                        {/* <Divider flexItem orientation="vertical" sx={{
                              mr:1000,
                              width: '100%',
                
                              color: target === index - 1 ? '#503E9D' : '#ffffff',

                            }}> 
                            </Divider> */}
                      </Box>
                    <Box
                      sx={{ mt: 5, 
                        // bgcolor: target === index ? "black" : 'yellow', 
                        height: '100%' }}
                      onDragOver={onDragOver(index)}
                      onDragLeave={onDragLeave(index)}
                    >

                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 10,
                      }}
                        draggable={(item.dishId !== 0 && move) ? true : false}
                        onDragStart={onDragStart(index)}
                        onDrop={onDrop}

                      // onDrop={onDrop}
                      >
                        {
                          item.dishId !== 0 && (
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
                              canMove={move}
                              selected={source === index}
                            // fatherListener={setMove}
                            // moveLeft={() => changeList(index, index - 1)}
                            // moveRight={() => changeList(index, index + 1)}
                            />
                              )}
                      </Box>

                      



                    </Box>
                    <Box sx={{
                        mt: 3,
                        width: 280,
                        ml:-31.25,
                        // bgcolor: index+1 === target ? "red" : 'green',
                        position: 'relative',
                        zIndex: hide ? 15 : 5,
                        borderRight: (index+1 === target ) ? '3px solid #503E9D': '3px solid #ffffff',
                        mb:3
                      }}
                        onDragOver={onDragOver(index + 1)}
                        onDragLeave={onDragLeave(index)}
                        onDragStart={onDragStart(index + 1)}
                        onDrop={onDrop}
                        
                      >
                        {/* {index + 1} */}
                        {/* <Divider  orientation="vertical" sx={{
                          
                          width: '100%',
                          "&::before, &::after": {
                            borderColor: target === index + 1 ? '#503E9D' : '#ffffff',

                          },
                          color: target === index + 1 ? '#503E9D' : '#ffffff',

                        }}> Move to here
                        </Divider> */}
                      </Box>

                  </Grid>

                )
              })}
              {Array.isArray(nowItemList?.itemList) && nowItemList?.itemList.length === 0 && (
                <Grid item xs={12} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 30 }}>
                  <Typography variant="h3">
                    Please add new item......
                  </Typography>
                </Grid>
              )

              }

            </Grid>

            {/* </Box> */}
          </Box>
        </Box>)}






      </Box>

    </ThemeProvider>
  );
};

export default ManagerMenu;