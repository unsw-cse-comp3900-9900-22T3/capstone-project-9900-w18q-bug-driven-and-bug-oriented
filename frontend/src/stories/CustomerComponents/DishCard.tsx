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

import dishImg from "../../static/chickenGrill.jpg"

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  props1?: string;
  props2?: string;
  props3?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;

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
  props1 = '',
  props2 = '',
  props3 = true,
  doSomething,

  ...props
}: ListProps) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
    <Card variant="outlined" sx={{ maxWidth: 410, borderRadius: 5, border: 0 }}>
      
      <CardMedia
        component="img"
        height="180"
        image = {dishImg}
        alt="chicken grill"
      />

      <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>

        <Box sx={{display: 'flex'}}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Chicken Grill
        </Typography>
        </Box>

        <Box sx={{display: 'flex'}}>
        <Box
          sx={{
            minWidth: 50,
            //height: 300,
            borderRadius: 2,
            backgroundColor: '#EEECF5',
            color: '#503E9D',
            textAlign: 'center',
            p: 0.5,
            m: 0.5,
            fontWeight: 'bold',
          }}
          >{props1} Cal</Box>
  
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
            $ {props2} 
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
            <Card sx={{ maxWidth: 720, borderRadius: 5 }}>
      
              <CardMedia
                component="img"
                height="420"
                image = {dishImg}
                alt="chicken grill"
              />

      <CardContent>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex'}}>
          <Typography gutterBottom variant="h6" component="div" sx={{fontWeight: 'bold'}}>
            Chicken Grill
          </Typography>
        </Box>

        <Box 
          sx={{
            display: 'flex',
            minWidth: 50,
            //height: 300,
            borderRadius: 2,
            backgroundColor: '#EEECF5',
            color: '#503E9D',
            textAlign: 'center',
            p: 0.5,
            m: 0.5,
            fontWeight: 'bold',
          }}>
          {props1}Cal
        </Box>
      </Box>

      <Box sx={{my:0.5}}>
        <Typography  variant="body1" component="div" >
          $ {props2}
        </Typography>
      </Box>

      <Box sx={{my:0.5}}>
        <Typography  variant="body1" component="div" sx={{display: 'inline'}} >
          <Typography sx={{fontWeight: 'bold'}}>Ingredient:</Typography> 
          <Typography> Meat, vegetable </Typography>
        </Typography>
      </Box>

      <Box sx={{mt:0.5}}>
        <Typography  variant="body1" component="div" >
          It is one of the mot iconic and well-recognized fast food out there.
        </Typography>
      </Box>

      </CardContent>

      <CardActions sx={{display: 'flex', justifyContent: 'space-between', ml: 1}}>
          <ThemeProvider theme={theme}>
            
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F7F7', fontWeight: 'bold'}}>
              <Box
                onClick={() => {alert("-")}}
                sx={{m: 1, fontSize:22}}
              >
                -
              </Box>
              <Box
                //onClick={handleOpen}
                sx={{m: 1, fontSize:16}}
              >
                1
              </Box>
              <Box
                //onClick={handleOpen}
                sx={{m: 1, fontSize:22}}
              >
                +
              </Box>
          </Box>
            
            
            <Box sx={{display: 'flex', mx:1}}>
              <Button 
                size="small"
                variant="contained"
                color='neutral'
                onClick={handleOpen}
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
