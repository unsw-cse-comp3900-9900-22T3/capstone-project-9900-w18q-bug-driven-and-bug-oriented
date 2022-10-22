import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import PreNextButton from "./PreNextButton";
import { number } from "prop-types";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  numberOfPage?: number;
  props2?: string;
  props3?: boolean;
  //预留空函数
  doSomething: (params: any) => any;

}

// 别忘了修改函数名
export default function PageButton({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  numberOfPage = 1,
  props2 = '',
  props3 = true,

  doSomething,

  ...props
}: ListProps) {
  const [pageList, setPageList] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let temp: number[] = [];
    for (let i = 1; i <= numberOfPage; i++) {
      temp.push(i);
    }
    setPageList(temp);
    console.log(temp);
  }, [numberOfPage]);

  const nextPage = () => {
    if (page < numberOfPage) {
      let temp = page + 1;
      setPage(temp);
      doSomething(temp);
    }
  };

  const prePage = () => {
    if (page > 1) {
      let temp = page - 1;
      setPage(temp);
      doSomething(temp);
    }

  };

  const selectPage = (e: number) => {
    setPage(e);
    doSomething(e);
  }

  useEffect(() => {
    console.log('now page', page);
  }, [page]);

  return (
    <>
    {numberOfPage !== 1 && (
      <Box sx={{ display: 'flex' }}>
        {page !== 1 && (
          <PreNextButton doSomething={() => prePage()} type='1' />
        )}
        {page === 1 && (
          <Box sx={{ width: 135 }}></Box>
        )}

        <Box sx={{ backgroundColor: '#EEECF6', display: 'flex', height: 55, justifyContent: 'center', alignItems: 'center', mx: 3, px: 0.5, borderRadius: 2 }}>
          {pageList.map((item) => {
            return (
              <>
                {item === page && (
                  <Box sx={{
                    color: '#503E9D', fontWeight: 'bold', backgroundColor: '#FEFEFF', height: 43, width: 43, display: 'flex', mx: 0.5, my: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 1.5,
                    '&:hover': {
                      // backgroundColor: '#F6F4FA',
                      cursor: 'pointer'
                    },
                  }}
                  >
                    {item}
                  </Box>
                )}
                {item !== page && (
                  <Box sx={{
                    color: '#503E9D', fontWeight: 'bold', backgroundColor: '#EEECF6', height: 43, width: 43, display: 'flex', mx: 0.5, my: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: '#F6F4FA',
                      cursor: 'pointer'
                    }
                  }} onClick={() => selectPage(item)}
                  >
                    {item}
                  </Box>
                )}
              </>

            )
          })}
        </Box>
        {page !== numberOfPage && (
          <PreNextButton doSomething={() => nextPage()} type='0' />
        )}
        {page === numberOfPage && (
          <Box sx={{ width: 115 }}></Box>
        )}

      </Box>
    )}
      

    </>
  );
}