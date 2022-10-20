import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';

import { useEffect } from 'react';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  props1?: string;
  props2?: string;
  props3?: boolean;
  //预留空函数
  doSomething: (params: any) => any;

  dishId?: string;
  dishName?: string;
  description?: string;
  ingredients?: string;
  calories?: string;
  price?: string;
  picture?: string;
  initDishNum?: number;
  passObj?: (params: any) => any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 280,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt: 2,
};

const theme = createTheme({
  palette: {
    neutral: {
      main: '#503E9D',
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

// 别忘了修改函数名
export default function DishCard({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）

  dishId = '123',
  dishName = 'Chicken Grill',
  description = 'It is one of the mot iconic and well-recognized fast food out there.',
  ingredients = 'Meat, vegetable',
  calories = '20',
  price = '16.66',
  picture = '/dishImg/chickenGrill.jpg',
  initDishNum = 0,
  passObj = () => { },
  doSomething = () => { },
  ...props
}: ListProps) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComfirm =(e: any) => {
    setOpen(false);
    doSomething(e);
  };


  const [dishNum, setDishNum] = React.useState(0);

  const [dishTryNum, setDishTryNum] = React.useState(0);

  const selectDishNum = () => {
    setDishNum(dishTryNum);
    const obj = {
      dishId: dishId,
      title: dishName,
      calorie: calories,
      cost: price,
      dishNumber: dishTryNum,
      picture: picture,
    };
    passObj(obj);
    setOpen(false);
    // setEditFlag(true);
  };

  useEffect(() => {
    setDishNum(0);
  }, [initDishNum]);

  return (
    <>
      {((dishNum !== 0) || (initDishNum !== 0 && initDishNum)) && (
        <Box sx={{
          height: 50,
          width: 50,
          backgroundColor: '#FB6D3A',
          color: '#fff',
          borderRadius: 10,
          fontWeight: 'bold',
          fontSize: 20,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative',
          zIndex: 15,
          ml: 48,
        }}>
          {((initDishNum !== 0) && (dishNum === 0)) ? initDishNum : dishNum}
        </Box>
      )}

      {((dishNum === 0) && (initDishNum === 0)) && (
        <Box sx={{
          height: 50,
          width: 50,
          backgroundColor: '#fff',
          color: '#fff',
          borderRadius: 10,
          fontWeight: 'bold',
          fontSize: 20,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative',
          zIndex: 5,
          ml: 48,
        }}>

        </Box>
      )}

      <Card variant='outlined' sx={{ width: 410, borderRadius: 5, border: 0, zIndex: 10, position: 'relative', mt: -2.5 }}>

        <CardMedia
          component="img"
          height="180"
          sx={{ width: '100%', borderRadius: 5 }}
          image={picture}
          alt={dishName}
        />

        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <Box sx={{ display: 'flex', height: 50 }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {dishName}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                minWidth: 50,
                height: 23,
                borderRadius: 2,
                backgroundColor: '#EEECF5',
                color: '#503E9D',
                textAlign: 'center',
                p: 0.5,
                m: 0.5,
                fontWeight: 'bold',
              }}
            >{calories}Cal
            </Box>

            <Box
              sx={{
                minWidth: 50,
                height: 23,
                borderRadius: 2,
                backgroundColor: '#EEECF5',
                color: '#503E9D',
                textAlign: 'center',
                p: 0.5,
                m: 0.5,
                fontWeight: 'bold',
              }}
            >
              $ {price}
            </Box>
          </Box>

        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          
            <Box sx={{ display: 'flex', mx: 1, mt: -2, mb: 2 }}>
              <Button variant="contained" onClick={handleOpen} sx={{
              height: 40, width: 130, backgroundColor: '#503E9D', borderRadius: 3,
              '&:hover': {
                backgroundColor: '#8475B0',
              }
              }}>
                <Typography variant="h6" >
                  Edit
                </Typography>
              </Button>
            </Box>

            <Box sx={{ display: 'flex', mx: 1, mt: -2, mb: 2 }}>
              <Button variant="contained" onClick={handleOpen} sx={{
              height: 40, width: 130, backgroundColor: '#503E9D', borderRadius: 3,
              '&:hover': {
                backgroundColor: '#8475B0',
              }
              }}>
                <Typography variant="h6" >
                  Remove
                </Typography>
              </Button>
              <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >

                <Card sx={style}>
                  <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: -2 }}>
                    <IconButton onClick={handleClose} color="primary" sx={{ color: '#A3A3A4' }} aria-label="upload picture" component="label">
                      <ClearIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ justifyContent: 'center', alignContent: 'middle', display: 'flex', mt: 3, flexDirection: 'column' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2}}  >
                      Confirm if you want to remove
                    </Typography>
                  </Box>

                  <Box sx={{display:'flex', justifyContent:'center', mt:4}}>
                    <Button onClick={handleComfirm} sx={{
                      width: 150, '&:hover': {
                        backgroundColor: '#8475B0',
                      }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr:5
                    }}>
                      <Typography variant="h6" sx={{ color: '#ffffff' }} >
                        Confirm
                      </Typography>
                    </Button>
                    <Button onClick={handleClose} sx={{
                      width: 150, '&:hover': {
                        backgroundColor: '#F1F1F1',
                      }, backgroundColor: '#F7F7F7', fontWeight: 'bold', height: 55, borderRadius: 3,
                    }}>
                      <Typography variant="h6" sx={{ color: '#000000', }} >
                        cancel
                      </Typography>
                    </Button>
                  </Box>
                </Card>

              </Modal>   
            </Box>

          
        </CardActions>
      </Card>
    </>
  );
}
