import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  createTheme,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import OrderBar from "../stories/customer/orderBar/OrderBar";
import { getCustomerCategory, getCustomerInit } from "../api/customer";
import { element } from "prop-types";
import DishCard from "../stories/customer/dishCard/DishCard";


const theme = createTheme();

const haveOrder = [
  {
    dish_id: 1,
    title: 'meat',
    calorie: 50,
    cost: 10,
    dishNumber: 1,
  },
  {
    dish_id: 2,
    title: 'vegetable',
    calorie: 40,
    cost: 5,
    dishNumber: 1,
  },
  {
    dish_id: 3,
    title: 'rice',
    calorie: 48,
    cost: 3,
    dishNumber: 1,
  },
]

const nextOrder =
{
  dish_id: 11,
  title: 'Szechuan Dan Dan Noodles',
  calorie: 288,
  cost: 15.9,
  dishNumber: 5,
}


const Customer: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [nav, setNav] = useState<any>([]);
  const [menu, setMenu] = useState<any>([]);

  const [oldOrder, setOldOrder] = useState<any>([]);

  const [newOrder, setNewOrder] = useState<any>([]);
  const [totalOrder, setTotalOrder] = useState<any>([]);
  const [numberOfItem, setNumberOfItem] = useState(0);
  const [price, setPrice] = useState(0);
  const [countOfCal, setCountOfCal] = useState(0);
  const [ceilingOfCal, setCeilingOfCal] = useState(0);
  const [newEdit, setNewEdit] = useState<any>({
    dish_id: -999,
    title: '',
    calorie: 0,
    cost: 0,
    dishNumber: 0,
  });


  //init
  useEffect(() => {
    // const order = haveOrder;
    // setOldOrder(order);
    // set id 
    const arr = location.pathname.split('/');
    setId(arr[2]);
    getInit(arr[2]);
  }, [])



  const getInit = async (e: any) => {
    const message = await getCustomerInit(e);
    console.log('message', message);
    setNav(message.categoryList);
    setCeilingOfCal(message.diner * 2000);
    setMenu(message.itemList);
  };

  const getCategory = async () => {
    const arr = location.pathname.split('/');
    if (arr[3] !== 'hot') {
      const message = await getCustomerCategory(arr[2], arr[3]);
      console.log('message', message);
      resetMenu(newOrder, message.itemList);
    } else {
      const message = await getCustomerInit(arr[2]);
      console.log('message', message);
      resetMenu(newOrder, message.itemList);
    }
  };


  // reload menu
  const resetMenu = (input1:
    {
      dish_id: number;
      title: string;
      calorie: number;
      cost: number;
      dishNumber: number;
    }[], input2?:
      {
        dish_id: number;
        title: string;
        calorie: number;
        cost: number;
        dishNumber: number;
      }[]) => {
    if (input2) {
      const newMenu = [...input2];
      input1.map((e) => {
        newMenu.map((o) => {
          if (e?.dish_id === o?.dish_id) {
            o.dishNumber = e?.dishNumber;
          }
        });
      });
      setMenu(newMenu);
    } else {
      const newMenu = [...menu];
      input1.map((e) => {
        newMenu.map((o) => {
          if (e?.dish_id === o?.dish_id) {
            o.dishNumber = e?.dishNumber;
          }
        });
      });
      setMenu(newMenu);
    }
  };


  // 修改item
  const editItem = (input:
    {
      dish_id: number;
      title: string;
      calorie: number;
      cost: number;
      dishNumber: number;
    }) => {
    const order = [...newOrder];
    let flag = true;
    let index = 0;
    let i = 0;
    order.map((element) => {
      if (element?.dish_id === input?.dish_id) {
        i = index;

        flag = false;
      }
      index += 1;
    });
    if (flag) {
      order.push(input);
    } else {
      order[i].dishNumber = input?.dishNumber;
    }
    setNewOrder(order);
    // setNumberOfItem(numberOfItem + input.dishNumber);
    resetMenu(order);
  };


  // 提交订单函数
  const confirmSubmit = (e: any) => {
    setNumberOfItem(0);
  };

  // 更新总订单
  useEffect(() => {
    const order = [...oldOrder, ...newOrder];
    setTotalOrder(order);
    // console.log('totalOrder', totalOrder);
    console.log('new order', newOrder);
    let n = 0
    newOrder.map((e: any) => {
      n += e?.dishNumber
    });
    setNumberOfItem(n);
    console.log('menu', menu);
  }, [newOrder, oldOrder]);

  // update new item
  useEffect(() => {
    console.log('new add', newEdit);
    editItem(newEdit);
  }, [newEdit]);

  // update price and cal
  useEffect(() => {
    console.log('totalOrder', totalOrder);
    let tempcost = 0;
    let tempCal = 0;
    totalOrder.map((e: {
      dish_id: string;
      title: string;
      calorie: number;
      cost: number;
      dishNumber: number;
    }) => {
      tempcost = tempcost + e?.cost * e?.dishNumber;
      tempCal = tempCal + e?.calorie * e?.dishNumber;
    });
    setPrice(tempcost);
    setCountOfCal(tempCal);
  }, [totalOrder]);


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='customer' id={id} obj={nav} doSomething={() => getCategory()} />
        </Box>

        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', minWidth: 1900 }} >
          <Box sx={{ display: 'flex', height: '100%', flexGrow: 1, overflow: "auto", }} >
            <Grid container spacing={3} sx={{ display: 'flex', m: 10, ml: 20 }}>
              {menu.map((item: any) => {

                return (
                  <Grid item xs={3}>
                    <DishCard
                      dishId={item.dish_id}
                      dishName={item.title}
                      description={item.description}
                      ingredients={item.ingredient}
                      calories={item.calorie}
                      price={item.cost}
                      picture={item.picture}
                      initDishNum={item.dishNumber}
                      passObj={setNewEdit}
                    />
                    {/* <div>{JSON.stringify(item)}</div> */}
                  </Grid>
                )
              })}
            

            </Grid>
            {/* <Button sx={{ height: 30 }} onClick={() => navigate(`/customer/${id}/bill`)} variant="contained"> to the bill</Button>
            <Button onClick={() => setOldOrder(haveOrder)} sx={{ height: 30 }}> set old order</Button>
            <Button variant="contained" onClick={() => editItem(nextOrder)} sx={{ height: 30 }}> add item</Button> */}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'end', width: '100%' }}>

            <OrderBar
              haveItem={(numberOfItem >= 1 || oldOrder.length !== 0) ? true : false}
              canSubmit={(numberOfItem >= 1) ? true : false}
              number={numberOfItem}
              price={Number(price.toFixed(2))}
              ceilingOfCal={ceilingOfCal}
              countOfCal={countOfCal}
              submitFunc={() => confirmSubmit(newOrder)} />


          </Box>
        </Box>
      </Box>


    </ThemeProvider>
  );
};

export default Customer;