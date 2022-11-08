import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  Box,
  Button,
  createTheme,
  Grid,
  Paper,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import OrderBar from "../stories/customer/orderBar/OrderBar";
import { getCustomerCategory, getCustomerInit, getCustomerOrder, postCustomerOrder, postCustomerRecommend, postCustomerRequest } from "../api/customer";
import { element } from "prop-types";
import DishCard from "../stories/customer/dishCard/DishCard";
import PacmanLoader from "react-spinners/PacmanLoader";
import RecommendationCard from "../stories/customer/recommendationCard/RecommendationCard";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    button: {
      textTransform: 'none'
    }
  }
});


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
    dishId: -999,
    title: '',
    calorie: 0,
    cost: 0,
    dishNumber: 0,
    picture: '',
  });

  const [checked, setChecked] = useState(false);
  const [recommendList, setRecommendList] = useState<any>();

  const [successOpen, setSuccessOpen] = React.useState(false);
  const handleSucessSubmit = () => {
    setSuccessOpen(true);
  };
  const handleSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
  };

  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);


  //init
  useEffect(() => {
    // const order = haveOrder;
    // setOldOrder(order);
    // set id 
    const arr = location.pathname.split('/');
    setId(arr[2]);
    getInit(arr[2]);
    getOrder(arr[2]);
    getCategory();
  }, [])


  const getInit = async (e: any) => {
    const message = await getCustomerInit(e);
    console.log('message', message);
    setNav(message.categoryList);
    setCeilingOfCal(message.diner * 2000);

    // setMenu(message.itemList);
  };

  const askHelp = async () => {
    const message = await postCustomerRequest(id);
    console.log('ask for help', message.message, id);
  };

  const getCategory = async () => {
    setLoading(true);
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
    setTimeout(() => setLoading(false), 200);
  };

  const getOrder = async (e: any) => {
    const message = await getCustomerOrder(e);
    console.log('get order', message);
    const orderList: {
      dishId: any;
      title: any;
      calorie: any;
      cost: any;
      dishNumber: any;
    }[] = [];
    message.itemList.map((e: any) => {
      const item = {
        dishId: e.dishId,
        title: e.title,
        calorie: e.calorie,
        cost: e.cost,
        dishNumber: e.dishNumber,
        picture: e.picture,
      };
      orderList.push(item);
    });
    setOldOrder(orderList);
  }

  const postOrder = async () => {
    // setLoading(true);
    const order = {
      'orderList': new Array
    }
    newOrder.map((item: any) => {
      if (item.dishNumber !== 0) {
        const e =
        {
          "dishId": item.dishId,
          "title": item.title,
          "dishNumber": item.dishNumber
        }
        order.orderList.push(e);
      }
    });

    console.log('post', order);
    const message = await postCustomerOrder(order, id);
    console.log('now is', message);
    handleSucessSubmit();
    setTimeout(() => {
      // navigate(`/customer/${id}/hot`);
      navigate(0);
      // setLoading(false);
    }, 1000);
  }

  const postRecommend = async () => {
    // setLoading(true);
    const order = {
      'orderList': new Array
    }
    totalOrder.map((item: any) => {
      if (item.dishNumber !== 0) {
        const e =
        {
          "dishId": item.dishId,
          "title": item.title,
          "dishNumber": item.dishNumber
        }
        order.orderList.push(e);
      }
    });

    console.log('to recommand', order);
    if (order.orderList.length) {
      const message = await postCustomerRecommend(order, id);
      console.log('now is', message);
      setRecommendList(message)
    }

    // handleSucessSubmit();

  }


  // reload menu
  const resetMenu = (input1:
    {
      dishId: number;
      title: string;
      calorie: number;
      cost: number;
      dishNumber: number;
      picture: string;
    }[], input2?:
      {
        dishId: number;
        title: string;
        calorie: number;
        cost: number;
        dishNumber: number;
        picture: string;
      }[]) => {
    if (input2) {
      const newMenu = [...input2];
      input1.map((e) => {
        newMenu.map((o) => {
          if (e?.dishId === o?.dishId) {
            o.dishNumber = e?.dishNumber;
          }
        });
      });
      setMenu(newMenu);
    } else {
      const newMenu = [...menu];
      input1.map((e) => {
        newMenu.map((o) => {
          if (e?.dishId === o?.dishId) {
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
      dishId: number;
      title: string;
      calorie: number;
      cost: number;
      dishNumber: number;
      picture: string;
    }) => {
    const order = [...newOrder];
    let flag = true;
    let index = 0;
    let i = 0;
    order.map((element) => {
      if (element?.dishId === input?.dishId) {
        i = index;

        flag = false;
      }
      index += 1;
    });
    if (flag) {
      order.push(input);
    } else {
      order[i].dishNumber = input?.dishNumber;
    };

    // setNumberOfItem(numberOfItem + input.dishNumber);
    resetMenu(order);
    order.map((element, index) => {
      if (element?.dishNumber === 0 && index !== 0) {
        order.splice(index, 1);
      };
    });
    setNewOrder(order);
  };

  // 提交订单函数
  // const confirmSubmit = (e: any) => {
  //   setNumberOfItem(0);
  // };

  // 更新总订单
  useEffect(() => {
    const order = [...oldOrder, ...newOrder];
    setTotalOrder(order);
    // console.log('totalOrder', totalOrder);
    console.log('new order', newOrder);
    console.log('old order', oldOrder);
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
      dishId: string;
      title: string;
      calorie: number;
      cost: number;
      dishNumber: number;
      picture: string;
    }) => {
      tempcost = tempcost + e?.cost * e?.dishNumber;
      tempCal = tempCal + e?.calorie * e?.dishNumber;
    });
    setPrice(tempcost);
    setCountOfCal(tempCal);
    postRecommend();
  }, [totalOrder]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', minWidth: 800 }}>
        <Box>
          <NavBar canBack={oldOrder.length === 0 ? true : false} role='customer' id={id} obj={nav} doSomething={() => getCategory()} postRequest={() => askHelp()} />
        </Box>

        <Box sx={{
          height:
            '100%',
          width: '100%',
          maxWidth: 'calc(100vw - 316.6px)',
          display: 'flex',
          flexDirection: 'column'
        }} >

          <Box sx={{
            display: 'flex',
            height: '100%',
            flexGrow: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'start',
            backgroundImage: 'url(../../bgimg3.jpg)',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "right",
            flexDirection: 'column'

          }} >

            <Box sx={{ backdropFilter: "blur(3px)", flexGrow: 1, height: 'calc(100%)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', overflow: 'hidden' }}>
              {loading ? (
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    backgroundColor: '#ffffff',
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    flexGrow: 1,
                    mb: -1.5
                  }}
                >
                  <PacmanLoader size={100} color={"#503E9D"} loading={loading} />
                </Box>
              ) : (
                <Box sx={{ height: 'calc(100vh - 115px)', width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', justifyContent: 'center' }}>
                  <Box sx={{ ml: 7, overflow: "auto", flexGrow: 1, mt: 5, width: '100%', height: '100%', mb: 1 }}>
                    <Grid container rowSpacing={{ xs: 2, sm: 3, md: 5, lg: 1 }} sx={{}} columnSpacing={{ xs: 2, sm: 3, md: 5, lg: 8 }} justifyContent='flex-start' alignItems='flex-start' >

                      {menu?.map((item: any) => {
                        return (
                          <Grid item xs={'auto'} key={item.dishId} sx={{ width: 500, height: 350 }}>
                            <DishCard
                              dishId={item.dishId}
                              dishName={item.title}
                              description={item.description}
                              ingredients={item.ingredient}
                              calories={item.calorie}
                              price={item.cost}
                              picture={item.picture}
                              initDishNum={item.dishNumber}
                              passObj={setNewEdit}
                            />

                          </Grid>
                        )
                      })}
                      {menu.length === 0 && (
                        <Grid item xs={12} sx={{ height: 'calc(100vh - 95px)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Typography variant="h3">
                            Upcoming......
                          </Typography>
                        </Grid>
                      )
                      }
                    </Grid>

                  </Box>

                  {(numberOfItem >= 1 && !checked) &&

                    <Box sx={{ height: 255, bgcolor: '#F3F2F7', mb: -5, borderRadius: 3, display: 'flex', flexDirection: 'column', ml: 1, mr: 1, flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ m: 1, ml: 3, fontWeight: 'bold' }}>
                        You may also like:
                      </Typography>
                      <Box sx={{ height: '100%', ml: 5, mr: 5, display: 'flex', flexDirection: 'row', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        {recommendList?.itemList.map((item: any, index: any) => {
                          return (
                            <Box key={'recom' + index} sx={{ height: 130, ml: 3, display: 'inline-block', width: 500, }}>
                              <RecommendationCard
                                dishId={item.dishId.toString()}
                                dishName={item.title}
                                description={item.description}
                                ingredients={item.ingredient}
                                calories={item.calorie.toString()}
                                price={item.cost.toString()}
                                picture={item.picture}
                                initDishNum={item.dishNumber}
                                passObj={setNewEdit}
                              />
                            </Box>
                          )
                        })}

                      </Box>
                    </Box>


                  }
                </Box>

              )}
              <Box sx={{ display: 'flex', alignItems: 'end', width: '100%', position: 'relative', zIndex: 50, height: 115 }}>
                <OrderBar
                  haveItem={(numberOfItem >= 1 || oldOrder.length !== 0) ? true : false}
                  canSubmit={(numberOfItem >= 1) ? true : false}
                  number={numberOfItem}
                  price={Number(price.toFixed(2))}
                  ceilingOfCal={ceilingOfCal}
                  countOfCal={countOfCal}
                  submitFunc={() => postOrder()}
                  newOrder={newOrder}
                  oldOrder={oldOrder}
                  orderFunc={setNewEdit}
                  ifCheck={(e) => setChecked(e)}
                />
                <Snackbar
                  open={successOpen}
                  autoHideDuration={3000}
                  onClose={handleSuccessClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  <Alert onClose={handleSuccessClose} sx={{ width: 600 }}>
                    Your order has been submitted!
                  </Alert>
                </Snackbar>
              </Box>

            </Box>

          </Box>

        </Box>

      </Box>



    </ThemeProvider>
  );
};

export default Customer;