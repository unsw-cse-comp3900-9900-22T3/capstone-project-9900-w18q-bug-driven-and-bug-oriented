import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";
import OrderIcon from "./OrderIcon";
import PriceTag from "./PriceTag";
import CalorieTag from "./CalorieTag";
import SubmitButton from "./SubmitButton";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  number?: number;
  price?: number;
  haveItem?: boolean;
  canSubmit?: boolean;
  ceilingOfCal?: number;
  countOfCal?: number;
  //预留空函数
  orderFunc?: (params: any) => any;
  submitFunc: (params: any) => any;
}

// 别忘了修改函数名
export default function OrderBar({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  number = 0,
  price = 0,
  haveItem = true,
  canSubmit = true,
  ceilingOfCal = 0,
  countOfCal = 0,
  orderFunc,
  submitFunc,

  ...props
}: ListProps) {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'end' }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
        <OrderIcon number={number} shown={haveItem} doSomething={orderFunc} />
        <PriceTag price={price} />
        <Box sx={{ margin: 3 }}>
          <CalorieTag ceiling={ceilingOfCal} count={countOfCal} />
        </Box>
      </Box>
      <SubmitButton shown={canSubmit} doSomething={submitFunc} />
    </Box>

  );
}