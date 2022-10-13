import { Box } from "@mui/system";
import * as React from 'react';
import { Button } from "@mui/material";


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
  status?: string;
  passObj?: (params: any) => any;
}

// 别忘了修改函数名
export default function OrderDetailBox({
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
  status = 'check', //check, submit, bill
  ...props
}: ListProps) {

  const [dishNum, setDishNum] = React.useState(initDishNum);

  const changeDishNum = (newDishNum : number) => {
    setDishNum(newDishNum);
    const obj = {
      dishId: dishId,
      title: dishName,
      calorie: calories,
      cost: price,
      dishNumber: newDishNum,
      picture: picture,
    };
    passObj(obj);
  };

  return (
    <>
      <Box display='flex' justifyContent='space-between' sx={{width:1320, height: 110, alignContent: 'center'}}>
        <Box display='flex' >
          <Box>
            <img alt={dishName} src={picture} style={{width:370, height:100, objectFit: 'cover', borderRadius:8}} /> 
          </Box>
          <Box>
            <Box sx={{fontSize: 20, fontWeight: 'bold', m: 2}}>
              {dishName}
            </Box>
            <Box display='flex' sx={{m: 2}}>
              <Box sx={{px: 0.5, py: 0.5}}>
                ${price}
              </Box>
              {  status !== 'bill' &&
                (<Box sx={{backgroundColor: '#ffe3d9', color: '#fb7140', mx: 2, px: 1, py: 0.5, borderRadius:2}}>
                  {calories}Cal
                </Box>)
              }
            </Box>
          </Box>
        </Box>

        { status === 'check' &&
          (<Box sx={{mt: 4}}>
            <AddNumberBox passNum={changeDishNum} initialNum={dishNum} />
          </Box>)
        }

        { status === 'submit' &&
          (<Box display='flex' sx={{mt: 4, mx: 4, fontSize: 16, fontWeight: 'bold'}}>
            &times; {initDishNum}
          </Box>)
        }

        { status === 'bill' &&
          (<Box display='flex' sx={{mt: 4, mx: 4, fontSize: 16, fontWeight: 'bold'}}>
            ${price} &times; {initDishNum}
          </Box>)
        }
      </Box>

    </>
  );
}