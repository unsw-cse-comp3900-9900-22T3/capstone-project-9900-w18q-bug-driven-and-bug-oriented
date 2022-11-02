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
import { getKitchenEachOrder, postKitchenEachOrder } from "../api/kitchen";
import ItemRecord from "../stories/kitchen/ItemRecord";
import PacmanLoader from "react-spinners/PacmanLoader";


const theme = createTheme({
  typography:{
     fontFamily: "Quicksand"
  }
});

interface itemListInterface {
  itemList: {
    itemCategory: string;
    itemIndex: number;
    itemName: string;
    status: string;
  }[],
  orderTime: string,
  tableNumber: number
}

interface newStatusInterface {
  itemIndex: number;
  status: string;
}

const KitchenOrder: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState<itemListInterface | any>();
  const [pageOrder, setPageOrder] = useState<itemListInterface | any>();
  const [nowTime, setNowTime] = useState('');
  const [table, setTable] = useState(0);
  const [numPage, setNumPage] = useState(1);
  const [page, setPage] = useState(1);
  const [newStatus, setNewStatus] = useState<newStatusInterface>();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const getList = async () => {
    const orderId = location.pathname.split('/')[2];
    const message = await getKitchenEachOrder(orderId);
    if (message && (!nowTime || !table)) {
      setNowTime(message.orderTime.split(' ')[4]);
      setTable(message.tableNumber);
    }
    setItemList(message);
    setLoading(false);
    // console.log(message);
  };

  const postItem = async (iIndex: number, iStatus: string) => {
    const orderId = location.pathname.split('/')[2];
    const message = await postKitchenEachOrder(
      {
        itemIndex: iIndex,
        itemStatus: iStatus
      }, orderId);
    console.log(message);
  }

  useEffect(() => {
    if (newStatus)
      postItem(newStatus.itemIndex, newStatus?.status);
    console.log(newStatus);
  }, [newStatus])


  useEffect(() => {
    if (itemList) {
      const num = Math.ceil(itemList ? itemList?.itemList.length / 10 : 1);
      setNumPage(num);

      const newOrder = { itemList: [...itemList?.itemList.slice((page - 1) * 10, (page - 1) * 10 + 10)] };
      console.log(itemList);
      console.log(newOrder);
      setPageOrder(newOrder);
    }

  }, [itemList, page])


  useEffect(() => {
    const timer = setInterval(() => getList(), 5000);
    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    getList();
  }, [])



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box>
          <NavBar role='kitchen' doSomething={() => { }} postRequest={() => { }} />
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
      ) : (

        <Box sx={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', flexDirection: 'column' }}>

          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'left', alignItems: 'start', mt: 20, mb: 5, height: 200 }}>

            <IconButton aria-label="delete" color='inherit' size="large" sx={{ ml: 20, mt: -0.5 }} onClick={() => navigate(-1)}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h4" sx={{ display: 'flex', fontWeight: 'bold', height: 60 }}>
              Order Items
            </Typography>
          </Box>
          <Box sx={{ width: '100%', justifyContent: 'left', alignItems: 'start', height: 100 }}>
            <Typography variant="h5" sx={{ ml: 26, display: 'flex', color: '#626264' }} >
              Table:&nbsp;{table} &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  Order time: {nowTime}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', height: 'calc(100vh - 400px)', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

            <Box sx={{ display: 'flex', m: 20, height: 800, width: '100%', flexDirection: 'column' }}>
              <Grid container spacing={1} >
                <Grid item xs={5}>
                  <Typography variant="h6" sx={{ ml: 2 }} >Item name</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6">Category</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" sx={{ ml: 6 }} >Status</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 2 }} />
              <Box sx={{ height: '100%', width: '100%' }}>
                {pageOrder?.itemList.map((item: { itemCategory: string | undefined; itemName: string | undefined; itemIndex: number | undefined; status: string | undefined; }) => {
                  return (
                    // <Box key={item.orderId}>{JSON.stringify(item)}</Box>

                    <Box key={item.itemIndex} sx={{ my: 4 }}>
                      <ItemRecord doSomething={setNewStatus} itemCategory={item.itemCategory} itemName={item.itemName} itemIndex={item.itemIndex} status={item.status} />

                    </Box>

                  )
                })}
                {(!pageOrder || pageOrder?.itemList.length === 0) && (
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 50 }}>
                    <Typography variant="h3">
                      No item now......
                    </Typography>
                  </Grid>
                )
                }
              </Box>
            </Box>
          </Box>

          <Box sx={{ height: 200, display: 'flex', alignItems: 'end', mb: 20, width: '100%', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ ml: 15, height: 55 }} >Showing {pageOrder?.itemList.length} from {itemList?.itemList.length} data</Typography>
            <Box sx={{ mr: 20 }}>
              <PageButton doSomething={setPage} numberOfPage={numPage} nowPage={page} />
            </Box>

          </Box>

        </Box>
        )}
      </Box>

    </ThemeProvider>
  );
};

export default KitchenOrder;