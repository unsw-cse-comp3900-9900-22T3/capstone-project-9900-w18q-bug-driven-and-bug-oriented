import { Box } from "@mui/system";
import React from "react";
import { Button, Divider, Fade, Menu, MenuItem, Paper, Popover, Popper, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  number?: number;
  shown?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;
  oldOrder?: {
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
export default function OrderIcon({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  number = 1,
  shown = false,
  doSomething,
  oldOrder,
  newOrder,

  ...props
}: ListProps) {


  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
  const navigate = useNavigate();

  const toBill = () => {
    const arr = location.pathname.split('/');
    navigate(`/customer/${arr[2]}/bill`);
  };

  return (
    <>
      {shown && (
        <Box>
          {(number !== 0 && number) && (
            <Box sx={{
              height: 37,
              width: 37,
              backgroundColor: '#FB6D3A',
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#ffffff',
              fontSize: 20,
              zIndex: 25,
              position: 'relative',
              marginLeft: 9.5,
            }} >
              {number}
            </Box>
          )}
          {(number === 0 || !number) && (
            <Box sx={{
              height: 37,
              width: 37,
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#ffffff',
              fontSize: 20,
              zIndex: 25,
              position: 'relative',
              marginLeft: 9.5,
            }} >

            </Box>
          )}

          <Button variant="contained" sx={{
            height: 95, width: 95, backgroundColor: '#503E9D', borderRadius: 3, zIndex: 10, position: 'relative', marginTop: -2.5,
            '&:hover': {
              backgroundColor: '#8475B0',
            }
          }}
            aria-describedby={id}
            onClick={handleClick}
          >
            <ShoppingCartIcon sx={{ color: '#ffffff', height: 70, width: 70 }} />
          </Button>
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}

            placement="top-start"

            sx={{
              zIndex: 20,
            }}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={250}>
                <Paper elevation={0} sx={{ width: 'calc(100vw - 320px)', height: 'calc(100vh - 95px)', display: 'flex', flexDirection: 'column' }}>
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
                            <>
                              <div>{JSON.stringify(item)}</div>
                              {(index !== oldOrder.length - 1) && (
                                <Divider sx={{ my: 2 }} />
                              )}
                            </>
                          )
                        })}
                        <Divider sx={{
                          my: 5, "&::before, &::after": {
                            borderColor: "#000000",
                          },
                          mx: 5
                        }}>
                          <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }} >Add dishes</Typography>
                        </Divider>
                        {newOrder?.map((item, index) => {
                          return (
                            <>
                              {item.dishNumber !== 0 && (
                                <>
                                  <div>{JSON.stringify(item)}</div>
                                  {(index !== newOrder.length - 1) && (
                                    <Divider sx={{ my: 2 }} />
                                  )}

                                </>
                              )}

                            </>
                          )
                        })}
                      </>
                    )}
                    {(oldOrder?.length !== 0 && newOrder?.length === 1) && (
                      <>
                        {oldOrder?.map((item, index) => {
                          return (
                            <>
                              <div>{JSON.stringify(item)}</div>
                              {(index !== oldOrder.length - 1) && (
                                <Divider sx={{ my: 2 }} />
                              )}

                            </>
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
                              <Typography variant="h6" sx={{ display: 'flex', p: 2, color: '#626264' }} >
                                Check now? Click here: <Button onClick={() => toBill()}> bill</Button>
                              </Typography>
                            </Box>
                          </Box>

                        </Box>



                      </>
                    )}
                    {(oldOrder?.length === 0 && newOrder?.length !== 1) && (
                      <>
                        {newOrder?.map((item, index) => {
                          return (
                            <>
                              {item.dishNumber !== 0 && (
                                <>
                                  <div>{JSON.stringify(item)}</div>
                                  {(index !== newOrder.length - 1) && (
                                    <Divider sx={{ my: 2 }} />
                                  )}
                                </>
                              )}

                            </>
                          )
                        })}
                      </>
                    )}



                  </Box>

                </Paper>
              </Fade>
            )}


          </Popper>


        </Box>

      )}

      {!shown && (
        <Box>

          <Box sx={{
            height: 37,
            width: 37,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff',
            fontSize: 20,
            zIndex: 15,
            position: 'relative',
            marginLeft: 9.5,
          }} >
          </Box>

          <Button disabled variant="contained" sx={{
            height: 95, width: 95, backgroundColor: '#503E9D', borderRadius: 3, zIndex: 10, position: 'relative', marginTop: -2.5,
            '&:hover': {
              backgroundColor: '#8475B0',
            }
          }}
          >
            <ShoppingCartIcon sx={{ color: '#ffffff', height: 70, width: 70 }} />
          </Button>


        </Box>
      )}
    </>
  );
}