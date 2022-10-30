import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button, Card, Paper, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  categoryId?: number;
  categoryName?: string;
  lastModified?: string;
  canMove?: boolean;
  //预留空函数
  preFunc?: (params: any) => any;
  nextFunc?: (params: any) => any;
  fatherListener?: (params: any) => any;
}

// 别忘了修改函数名
export default function ManagerCategoryCard({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  categoryId = 0,
  categoryName = '',
  lastModified = '',
  canMove = false,
  preFunc= () => { },
  nextFunc= () => { },
  fatherListener = () => { },

  ...props
}: ListProps) {
  const [move, setMove] = useState(false);

  useEffect(()=>{
    setMove(canMove);
    // console.log(categoryId,canMove);
  },[canMove])

  return (
    <>
      {!move && (
        <Paper elevation={0} onClick={move ? () => {setMove(false); fatherListener(-1)} : () => {setMove(true); fatherListener(categoryId)}} sx={{
          width: '100%', height: 182, display: 'flex', bgcolor: '#F7F7F7', borderRadius: 5, flexDirection: 'column', '&:hover': {
            cursor: 'pointer'
          }
        }}>
          <Typography sx={{ ml: 5, mt: 5, fontWeight: 'bold' }} variant="h5">
            {categoryName}
          </Typography>
          <Box sx={{ m: 4, mt: 6, flexDirection: 'row', display: 'flex' }}>
            <Box sx={{ bgcolor: '#f8eae5', height: 25, width: 180, color: '#FB6D3A', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                Last modified:
              </Typography>
            </Box>
            <Typography sx={{ ml: 5, mt: 0.2, fontWeight: 'bold', color: '#626264' }} variant="subtitle2">
              {lastModified}
            </Typography>
          </Box>
        </Paper>
      )}
      {move && (
        <Box sx={{ width: '100%', height: 150, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Button disableRipple onClick={preFunc} sx={{ width: '100%' }}> <ExpandLessIcon sx={{ color: '#503E9D' }} /></Button>
          <Paper elevation={0} onClick={move ? () => {setMove(false); fatherListener(-1)} : () => {setMove(true); fatherListener(categoryId)}} sx={{
            width: '100%', height: 100, display: 'flex', bgcolor: '#F7F7F7', borderRadius: 5, flexDirection: 'column', '&:hover': {
              cursor: 'pointer'
            }, border: '3px solid #503E9D'
          }}>
            <Typography sx={{ ml: 5, mt: 1, fontWeight: 'bold' }} variant="h5">
              {categoryName}
            </Typography>
            <Box sx={{ m: 4, mt: 2, flexDirection: 'row', display: 'flex' }}>
              <Box sx={{ bgcolor: '#f8eae5', height: 25, width: 180, color: '#FB6D3A', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                  Last modified:
                </Typography>
              </Box>
              <Typography sx={{ ml: 5, mt: 0.2, fontWeight: 'bold', color: '#626264' }} variant="subtitle2">
                {lastModified}
              </Typography>
            </Box>
          </Paper>
          <Button disableRipple onClick={nextFunc} sx={{ width: '100%' }}> <ExpandMoreIcon sx={{ color: '#503E9D' }} /></Button>
        </Box>

      )}

    </>
  );
}