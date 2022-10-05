import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  number?: number;
  shown?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function OrderIcon({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  number = 1,
  shown = false,
  doSomething,

  ...props
}: ListProps) {
  return (
    <>
      {shown && (
        <Box>
          {(number !== 0 && number) &&(
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
            zIndex: 15,
            position: 'relative',
            marginLeft: 9.5,
          }} >
            {number}
          </Box>
          )}
           {(number === 0 || !number) &&(
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
          )}
          
          <Button variant="contained" onClick={doSomething} sx={{
            height: 95, width: 95, backgroundColor: '#503E9D', borderRadius: 3, zIndex: 10, position: 'relative', marginTop: -2.5,
            '&:hover': {
              backgroundColor: '#8475B0',
            }
          }}>
            <ShoppingCartIcon sx={{ color: '#ffffff', height: 70, width: 70 }} />
          </Button>


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
  
        <Button disabled variant="contained" onClick={doSomething} sx={{
          height: 95, width: 95, backgroundColor: '#503E9D', borderRadius: 3, zIndex: 10, position: 'relative', marginTop: -2.5,
          '&:hover': {
            backgroundColor: '#8475B0',
          }
        }}>
          <ShoppingCartIcon sx={{ color: '#ffffff', height: 70, width: 70 }} />
        </Button>


      </Box>
      )}
    </>
  );
}