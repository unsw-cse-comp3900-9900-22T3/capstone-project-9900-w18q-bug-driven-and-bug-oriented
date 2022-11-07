import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Button, createTheme, IconButton, Modal, ThemeProvider, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import AddNumberBox from "../dishCard/AddNumberBox";

// 声明变量的数据格式
interface ListProps {

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
  typography:{
    fontFamily: "Quicksand",
    button: {
     textTransform: 'none'
   }
 }
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
export default function RecommendationCard({
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

  ...props
}: ListProps) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    // setDishTryNum(dishNum);
  };
  const handleClose = () => setOpen(false);


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
    <Box sx={{width: 400, height: 130, borderRadius: 5, display: 'flex'}}>
      
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <img src={picture} alt={dishName} style={{borderRadius: 8, width: 180, height: 110}}/>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mt: 1}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
              {dishName}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex'}}>
            <Box
              sx={{
                minWidth: 50,         
                borderRadius: 2,
                backgroundColor: '#EEECF5',
                color: '#503E9D',
                textAlign: 'center',  
                alignItems: 'center',
                px: 0.5, 
              }}
            >
              <Typography sx={{fontWeight: 'bold'}}>
                {calories}Cal
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: 50,
                
                borderRadius: 2,
                backgroundColor: '#EEECF5',
                color: '#503E9D',
                textAlign: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                px: 0.5, 
                ml: 2,
              }}
            >
              <Typography sx={{fontWeight: 'bold'}}>
                $ {price}
              </Typography>             
            </Box>                
        </Box>

        <Box position ='absolute' sx={{mt: 10, ml: 17}}>
            <ThemeProvider theme={theme}>
              <Button
                size="small"
                variant="contained"
                color='neutral'
                onClick={handleOpen}
                sx={{ borderRadius: 2}}
              >
                <Typography sx={{}}>
                 Select 
                </Typography>
                
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
                    style={{ position: "absolute", top: "0", right: "0", color: 'grey' }}
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                  <Card sx={{ maxWidth: 720, borderRadius: 5 }}>

                    <CardMedia
                      component="img"
                      height="420"
                      image={picture}
                      alt="chicken grill"
                      sx={{ width: '100%', borderRadius: 5 }}
                    />

                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Box sx={{ display: 'flex' }}>
                          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {dishName}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            minWidth: 30,
                            borderRadius: 2,
                            height: 23,
                            backgroundColor: '#EEECF5',
                            color: '#503E9D',
                            textAlign: 'center',
                            p: 0.5,
                            m: 0.5,

                            fontWeight: 'bold',
                          }}>
                            <Typography sx={{fontWeight: 'bold'}}>
                              {calories}Cal
                            </Typography>
                          
                        </Box>

                      </Box>

                      <Box sx={{ my: 0.2, flexDirection: 'row', display: 'flex' }}>
                        <Typography variant="body1" component="div" >
                          $
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mt: -0.7 }} >
                          {price}
                        </Typography>
                      </Box>

                      <Box sx={{ my: 0.5, display: 'inline' }}>
                        <Typography variant="body1" component="div" >
                          <span style={{ fontWeight: "bold" }}>Ingredient:</span >
                          <span > {ingredients} </span >
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body1" component="div" >
                          {description}
                        </Typography>
                      </Box>

                    </CardContent>

                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', ml: 1 }}>

                      <ThemeProvider theme={theme}>

                        <AddNumberBox passNum={setDishTryNum} initialNum={((initDishNum !== 0) && (dishNum === 0)) ? initDishNum : 1} />

                        <Box sx={{ display: 'flex', mx: 1 }}>
                          <Button
                            size="small"
                            variant="contained"
                            color='neutral'
                            onClick={selectDishNum}
                            sx={{ borderRadius: 2, px: 3, }}
                            
                          >
                            <Typography>
                              Select
                            </Typography>
                            
                          </Button>
                        </Box>

                      </ThemeProvider>
                    </CardActions>


                  </Card>
                </Box>
              </Modal>
         
            </ThemeProvider>
            <Box/>
        
      </Box> 

      </Box>

      

    </Box>
      
  );
}