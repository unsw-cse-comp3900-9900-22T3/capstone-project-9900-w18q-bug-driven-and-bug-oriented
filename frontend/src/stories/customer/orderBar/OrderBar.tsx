import { Box } from "@mui/system";
import React from "react";
import { Button, Collapse, Divider, Paper, Typography } from "@mui/material";
import OrderIcon from "./OrderIcon";
import PriceTag from "./PriceTag";
import CalorieTag from "./CalorieTag";
import SubmitButton from "./SubmitButton";
import OrderDetailBox from "../orderDetailBox/OrderDetailBox";
import CheckBillButton from "./CheckBillButton";
import { useNavigate } from "react-router-dom";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  number?: number;
  price?: number;
  haveItem?: boolean;
  canSubmit?: boolean;
  ceilingOfCal?: number;
  countOfCal?: number;
  //预留空函数
  orderFunc?: (params: any) => any;
  submitFunc: (params: any) => any;
  editFunc?: (params: any) => any;
  oldOrder?:
  {
    dishId: number,
    title: string,
    calorie: number,
    cost: number,
    dishNumber: number,
    picture: string
  }[];
  newOrder?: {
    dishId: number,
    title: string,
    calorie: number,
    cost: number,
    dishNumber: number,
    picture: string
  }[];
}

// 别忘了修改函数名
export default function OrderBar({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  number = 0,
  price = 0,
  haveItem = true,
  canSubmit = true,
  ceilingOfCal = 0,
  countOfCal = 0,
  orderFunc,
  submitFunc,
  editFunc,
  oldOrder,
  newOrder,

  ...props
}: ListProps) {


  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    };

  };

  const navigate = useNavigate();
  const toBill = () => {
    const arr = location.pathname.split('/');
    navigate(`/customer/${arr[2]}/bill`);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Collapse in={haveItem? checked : false}>
        <Paper elevation={3} sx={{ width: '100%', height: 'calc(100vh - 135px)', display: 'flex', flexDirection: 'column', overflow: "auto", borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
          <Box sx={{ m: 5, mt: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 7, mt: 5 }} >
              <Typography sx={{ p: 2, fontWeight: 'bold' }} variant='h3'>
                Your Order
              </Typography>
            </Box>
            {(oldOrder?.length !== 0 && newOrder?.length !== 1) && (
              <>
                {oldOrder?.map((item, index) => {
                  return (
                    <React.Fragment key={item.dishId}>
                      <Box sx={{ mx: 5 }}>
                        <OrderDetailBox
                          dishId={item.dishId}
                          dishName={item.title}
                          price={item.cost}
                          calories={item.calorie}
                          picture={item.picture}
                          status='submit'
                          initDishNum={item.dishNumber}
                        />
                      </Box>

                      {/* <div>{JSON.stringify(item)}</div> */}
                      {(index !== oldOrder.length - 1) && (
                        <Divider sx={{ my: 2, mx: 4 }} />
                      )}
                    </React.Fragment>
                  )
                })}
                <Divider sx={{
                  my: 5, "&::before, &::after": {
                    borderColor: "#000000",
                  },
                  mx: 5
                }}>
                  <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }} >
                    Add dishes
                    </Typography>
                </Divider>
                {newOrder?.map((item, index) => {
                  return (
                    <React.Fragment key={item.dishId}>
                      {item.dishNumber !== 0 && (
                        <>
                          <Box sx={{ mx: 5 }}>
                            <OrderDetailBox
                              dishId={item.dishId}
                              dishName={item.title}
                              price={item.cost}
                              calories={item.calorie}
                              picture={item.picture}
                              status='check'
                              initDishNum={item.dishNumber}
                              passObj={orderFunc}
                            />
                            {/* <div>{JSON.stringify(item)}</div> */}
                            {(index !== newOrder.length - 1) && (
                              <Divider sx={{ my: 2, mx: 4 }} />
                            )}
                          </Box>


                        </>
                      )}

                    </React.Fragment>
                  )
                })}
              </>
            )}
            {(oldOrder?.length !== 0 && newOrder?.length === 1) && (
              <>
                {oldOrder?.map((item, index) => {
                  return (
                    <React.Fragment key={item.dishId}>
                      <Box sx={{ mx: 5 }}>
                        <OrderDetailBox
                          dishId={item.dishId}
                          dishName={item.title}
                          price={item.cost}
                          calories={item.calorie}
                          picture={item.picture}
                          status='submit'
                          initDishNum={item.dishNumber}
                        />
                        {/* <div>{JSON.stringify(item)}</div> */}
                        {(index !== oldOrder.length - 1) && (
                          <Divider sx={{ my: 2, mx: 4 }} />
                        )}
                      </Box>
                    </React.Fragment>
                  )
                })}
                <Divider sx={{
                  mt: 5, backgroundColor: '#000000',
                  mx: 5
                }}>
                </Divider>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                      <Typography variant="h6" sx={{ display: 'flex', p: 2, color: '#626264' }} >
                        Thanks for your order!
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                      <Typography variant="h6" sx={{ display: 'flex', color: '#626264' }} >
                        Check now? Click here:
                      </Typography>
                      <Box sx={{ mx: 1 }}>
                        <CheckBillButton doSomething={() => toBill()} />
                      </Box>
                    </Box>
                  </Box>

                </Box>



              </>
            )}
            {(oldOrder?.length === 0 && newOrder?.length !== 1) && (
              <>
                {newOrder?.map((item, index) => {
                  return (
                    <React.Fragment key={item.dishId}>
                      {item.dishNumber !== 0 && (
                        <React.Fragment key={item.dishId + 100}>
                          <Box sx={{ mx: 5 }}>
                            <OrderDetailBox
                              dishId={item.dishId}
                              dishName={item.title}
                              price={item.cost}
                              calories={item.calorie}
                              picture={item.picture}
                              status='check'
                              initDishNum={item.dishNumber}
                              passObj={orderFunc}
                            />
                            {/* <div>{JSON.stringify(item)}</div> */}
                            {(index !== newOrder.length - 1) && (
                              <Divider sx={{ my: 2, mx: 4 }} />
                            )}
                          </Box>

                        </React.Fragment>
                      )}

                    </React.Fragment>
                  )
                })}
              </>
            )}

          </Box>

        </Paper>
      </Collapse>
      <Paper elevation={5} sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'end', height: 95, borderRadius: 3 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
          <OrderIcon number={number} shown={haveItem} doSomething={handleChange} />
          <PriceTag price={price} />
          <Box sx={{ margin: 2.5 }}>
            <CalorieTag ceiling={ceilingOfCal} count={countOfCal} />
          </Box>
        </Box>
        <SubmitButton shown={canSubmit} doSomething={submitFunc} />
      </Paper>
    </Box>


  );
}