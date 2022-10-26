import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  orderTime?: string;
  table?: Number;
  status?: string;
  waitCount?: Number;
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function OrderRecord({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  table = 1,
  orderTime = ' ',
  status = ' ',
  waitCount = 0,
  doSomething,

  ...props
}: ListProps) {
  const [color, setColor] = useState("#FF6D4D");
  const [backgroundColor, setBackgroundColor] = useState("#FFF1EE");

  const statusColor = (s: string) => {
    if (s == "Wait") {
      setColor("#FF6D4D")
      setBackgroundColor("#FFF1EE")
    }

    if (s == "Processing") {
      setColor("#2F4CDD")
      setBackgroundColor("#F7F8FE")
    }
    if (s == "Completed") {
      setColor("#2BC155")
      setBackgroundColor("#F4FCF6")
    }
  };

  useEffect(() => {
    statusColor(status);
  }, [status]);

  return (
    <>

      <Box sx={{ width:'100%' }}>
        <Grid container spacing={1} >
          <Grid item xs={3}>
            <Typography sx={{ml:2}} variant="subtitle1">{table.toString()}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ml:1.7}} variant="subtitle1">{orderTime.split(' ')[4]}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ml:11}} variant="subtitle1">{waitCount.toString()}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ height: 25, display: 'inline-block',zoom:1, justifyContent: 'center', alignItems: 'center', py: 0.5,px:1,  borderRadius: 2, ml: 0.5 , marginTop: -1, color: { color }, backgroundColor: { backgroundColor }, }}>{status}</Box>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={doSomething} sx={{ marginTop: -0.3, }}><NavigateNextIcon /></IconButton>
          </Grid>
        </Grid>
      </Box>


    </>
  );
}