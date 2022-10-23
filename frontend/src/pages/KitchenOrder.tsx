import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  Divider,
  Grid,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageButton from "../stories/kitchen/PageButton";
import OrderRecord from "../stories/kitchen/OrderRecord";
import StatusMenu from "../stories/kitchen/StatusMenu";
import NavBar from "../stories/NavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getKitchenEachOrder } from "../api/kitchen";


const theme = createTheme();

interface itemListInterface {
  itemList:{
    itemCategory: string;
    itemIndex: number;
    itemName: string;
    status: string;
  }[],
  orderTime: string,
  tableNumber: number
}

const KitchenOrder: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState<itemListInterface>();
  const [nowTime, setNowTime] = useState('');
  const [table,setTable] = useState(0);

  const getList = async () =>{
    const orderId = location.pathname.split('/')[2];
    const message = await getKitchenEachOrder(orderId);
    if (message && (!nowTime || !table)){
      setNowTime(message.orderTime.split(' ')[4]);
      setTable(message.tableNumber);
    }
    setItemList(message);
    console.log(message);
  };

  useEffect(()=>{
    const timer = setInterval(() => getList(), 5000);
    return () => clearInterval(timer);
  },[])



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box>
          <NavBar role='kitchen' doSomething={() => { }} postRequest={() => { }} />
        </Box>
        <Box sx={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', flexDirection: 'column' }}>

          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'left', alignItems: 'start', mt: 20, mb: 10, height: 300 }}>
            <IconButton aria-label="delete" color='inherit' size="large" sx={{ml: 20,mt:-0.5 }} onClick={() => navigate(-1)}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h4" sx={{ display: 'flex', fontWeight: 'bold',height:60 }}>
              Order Items
            </Typography>

          </Box>

          <Box sx={{ display: 'flex', height: 'calc(100vh - 400px)', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

            <Box sx={{ display: 'flex', m: 20, height: 800, width: '100%', flexDirection: 'column' }}>
              <Grid container spacing={1} >
                <Grid item xs={3}>
                  <Typography variant="h6">Table</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6">Order time</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6">Number of wait items</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6">Status</Typography>
                </Grid>
                <Grid item xs={1}>

                </Grid>
              </Grid>
              <Divider sx={{ mt: 2 }} />
              <Box sx={{ height: '100%', width: '100%' }}>
                {/* {pageOrder?.orderList.map((item: { orderId: React.Key | null | undefined; table: Number | undefined; orderTime: string | undefined; status: string | undefined; waitCount: Number | undefined; }) => {
                  return (
                    // <Box key={item.orderId}>{JSON.stringify(item)}</Box>
                    <Box key={item.orderId} sx={{ my: 4 }}>
                      <OrderRecord table={item.table} orderTime={item.orderTime} status={item.status} waitCount={item.waitCount} doSomething={()=>navigate(`/kitchen/${item.orderId}`)} />
                    </Box>

                  )
                })} */}
              </Box>
            </Box>
          </Box>

          <Box sx={{ height: 200, display: 'flex', alignItems: 'end', mb: 20, width: '100%', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ ml: 15, height:55 }} >Showing { } from { } data</Typography>
            <Box sx={{ mr: 20 }}>
              {/* <PageButton doSomething={setPage} numberOfPage={numPage} nowPage={page} /> */}
            </Box>

          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default KitchenOrder;