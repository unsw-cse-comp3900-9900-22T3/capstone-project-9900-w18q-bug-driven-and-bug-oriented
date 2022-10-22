import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  itemCategory?:string;
  itemName?: string;
  status?: string;
  //预留空函数
  doSomething: (params: any) => any;

}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 165,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


// 别忘了修改函数名
export default function ItemRecord({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  itemCategory = ' ',
  itemName = ' ',
  status  = ' ',
  doSomething,

  ...props
}: ListProps) {
  const [color, setColor] = useState("#FF6D4D");
  const [backgroundColor, setBackgroundColor] = useState("#FFF1EE");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [method, setMethed] = useState(status);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = (e: string) => {
    setAnchorEl(null);
    setMethed(e);
    // doSomething(e);
    if(e=="Wait")
    {
      setColor("#FF6D4D")
      setBackgroundColor("#FFF1EE")
    }

    if(e=="Processing")
    {
      setColor("#2F4CDD")
      setBackgroundColor("#F7F8FE")
    }
    if(e=="Prepared")
    {
      setColor("#2BC155")
      setBackgroundColor("#F4FCF6")
    }
  };

  
  const statusColor=(s:string)=>{
    if(s=="Wait")
    {
      setColor("#FF6D4D")
      setBackgroundColor("#FFF1EE")
    }

    if(s=="Processing")
    {
      setColor("#2F4CDD")
      setBackgroundColor("#F7F8FE")
    }
    if(s=="Prepared")
    {
      setColor("#2BC155")
      setBackgroundColor("#F4FCF6")
    }
  };

  useEffect(() => {
    statusColor(status);
  }, [status]);

  return (
    <>

<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Box sx={{marginTop:1,}}>{itemName}</Box>
        </Grid>
        <Grid item xs={1}>
          <Box sx={{marginTop:1,}}>{itemCategory}</Box>
        </Grid>
        <Grid item xs={1}>
        <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon sx={{color:{color},}} />}
        sx={{
          height: 40,
          width: 150,
          backgroundColor: {backgroundColor},
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'center',
          '&:hover': {
            backgroundColor: {backgroundColor},
          },
        }}
      >
        <Typography variant="subtitle1" marginLeft={1.5} sx={{color:{color},}}>
          {method}
        </Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(method)}
        
      >

        <MenuItem onClick={() => handleClose('Wait') } disableRipple sx={{color:"#FF6D4D",display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'center',}}>
          <Typography variant="subtitle1">
            Wait
          </Typography>
        </MenuItem>

        <MenuItem onClick={() => handleClose('Processing')} disableRipple sx={{color:"#2F4CDD",display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'center',}}>
          <Typography variant="subtitle1">
            Processing
          </Typography>
        </MenuItem>

        <MenuItem onClick={() => handleClose('Prepared')} disableRipple sx={{color:"#2BC155",display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'center',}}>
          <Typography variant="subtitle1">
            Prepared
          </Typography>
        </MenuItem>
      </StyledMenu>
    </div>
          
        </Grid>
      </Grid>
    </Box>
      
    
    </>
  );
}