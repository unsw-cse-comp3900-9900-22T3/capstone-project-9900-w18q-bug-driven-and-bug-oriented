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

import AddNumberBox from "./AddNumberBox";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  props1?: string;
  props2?: string;
  props3?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;

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
  picture = 'dishImg/chickenGrill.jpg',
  initDishNum = 0,
  passObj = () => {},

  ...props
}: ListProps) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setDishTryNum(dishNum);
  };
  const handleClose = () => setOpen(false);

  const [dishNum, setDishNum] = React.useState(initDishNum);

  const [dishTryNum, setDishTryNum] = React.useState(0);

  const selectDishNum = () => {
    setDishNum(dishTryNum);
    const obj = {
      dish_id: dishId,
      title: dishName,
      calorie: calories,
      cost: price,
      dishNumber: dishTryNum,
    };
    passObj(obj);
    setOpen(false);
  };

  return (
    <>
      {(dishNum !== 0 && dishNum) && (
        <Box sx={{ 
          height: 50, 
          width: 50, 
          backgroundColor: '#FB6D3A', 
          color: '#fff', 
          borderRadius: 10, 
          fontWeight: 'bold', 
          fontSize: 20,
          display:'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative',
          zIndex: 15, 
          ml:48,
          }}>
          {dishNum}
        </Box>
      )}

      {(dishNum === 0 || !dishNum ) && (
        <Box sx={{ 
          height: 50, 
          width: 50, 
          backgroundColor: '#fff', 
          color: '#fff', 
          borderRadius: 10, 
          fontWeight: 'bold', 
          fontSize: 20,
          display:'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative',
          zIndex: 5, 
          ml:48,
          }}>
         
        </Box>
      )}

      <Card variant="outlined" sx={{ width: 410, borderRadius: 5, border: 0, zIndex: 10, position: 'relative', mt:-2.5 }}>
        
        <CardMedia
          component="img"
          height="180"
          image = {picture}
          alt = {dishName}
        />

        <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>

          <Box sx={{display: 'flex'}}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {dishName}
          </Typography>
          </Box>

          <Box sx={{display: 'flex'}}>
            <Box
              sx={{
                minWidth: 50,
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

        <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', mx:1}}>
              <Button 
                size="small"
                variant="contained"
                color='neutral'
                onClick={handleOpen}
                sx={{borderRadius: 2}}
              >
                Select
              </Button>
            
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Box sx={{ 
                  position: 'absolute' as 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }} >
                  <IconButton
                    style={{ position: "absolute", top: "0", right: "0" }}
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                  <Card sx={{ maxWidth: 720, borderRadius: 5 }}>
            
                    <CardMedia
                      component="img"
                      height="420"
                      image = {picture}
                      alt="chicken grill"
                    />

                    <CardContent>
                      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>

                        <Box sx={{display: 'flex'}}>
                          <Typography gutterBottom variant="h6" component="div" sx={{fontWeight: 'bold'}}>
                            {dishName}
                          </Typography>
                        </Box>

                        <Box 
                          sx={{
                            display: 'flex',
                            minWidth: 30,
                            borderRadius: 2,
                            backgroundColor: '#EEECF5',
                            color: '#503E9D',
                            textAlign: 'center',
                            p: 0.5,
                            m: 0.5,
                            fontWeight: 'bold',
                          }}>
                          {calories}Cal
                        </Box>

                      </Box>

                      <Box sx={{my:0.5}}>
                        <Typography  variant="body1" component="div" >
                          $ {price}
                        </Typography>
                      </Box>

                      <Box sx={{my:0.5, display: 'inline'}}>
                        <Typography  variant="body1" component="div" >
                          <span style={{fontWeight: "bold"}}>Ingredient:</span > 
                          <span > {ingredients} </span >
                        </Typography>
                      </Box>

                      <Box sx={{mt:0.5}}>
                        <Typography  variant="body1" component="div" >
                          {description}
                        </Typography>
                      </Box>

                    </CardContent>

                    <CardActions sx={{display: 'flex', justifyContent: 'space-between', ml: 1}}>
                      
                      <ThemeProvider theme={theme}>
                        
                        <AddNumberBox passNum={setDishTryNum} initialNum={dishNum} />
                
                        <Box sx={{display: 'flex', mx:1}}>
                          <Button 
                            size="small"
                            variant="contained"
                            color='neutral'
                            onClick={selectDishNum}
                            sx={{borderRadius: 2, px:3}}
                            >
                            Select
                          </Button>
                        </Box>

                      </ThemeProvider>
                    </CardActions>


                  </Card>
                </Box>
              </Modal>
            </Box>
          </ThemeProvider>
        </CardActions>
      </Card>
    </>
  );
}
