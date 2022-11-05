import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Button, Typography } from "@mui/material";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  props1?: string;
  props2?: string;
  props3?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;

  initialNum?: number;
  passNum?: (params: any) => any;
}

// 别忘了修改函数名
export default function AddNumberBox({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）

  initialNum = 0,
  passNum = () => { },
  ...props
}: ListProps) {

  const [dishTryNum, setDishTryNum] = React.useState(initialNum);
  const addTryDish = () => { passNum(dishTryNum + 1); setDishTryNum(dishTryNum + 1); };
  const delTryDish = () => { if (dishTryNum >= 1) { passNum(dishTryNum - 1); setDishTryNum(dishTryNum - 1); } };

  useEffect(() => {
    passNum(dishTryNum);
  }, []);
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F7F7', fontWeight: 'bold', borderRadius: 3 }}>

        <Box
          onClick={delTryDish}
          sx={{ m: 1, fontSize: 22, ":hover": { cursor: 'pointer' } }}
        >
          <Typography sx={{fontWeight: 'bold'}}>
           - 
          </Typography>
          
        </Box>

        <Box
          sx={{ m: 1, fontSize: 16 }}
        >
          <Typography sx={{fontWeight: 'bold'}}>
            {dishTryNum}
          </Typography>
          
        </Box>

        <Box
          onClick={addTryDish}
          sx={{ m: 1, fontSize: 22, ":hover": { cursor: 'pointer' } }}
        >
          <Typography sx={{fontWeight: 'bold'}}>
           + 
          </Typography>
          
        </Box>

      </Box>
    </>
  );
}