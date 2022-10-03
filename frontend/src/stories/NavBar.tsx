import { Box } from "@mui/system";
import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import NavButton from "./NavButton";
import { useLocation, useNavigate } from "react-router-dom";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  obj?: {
    categoryId?: string;
    categoryName?: string;
  }[];
  show?: string;
  role?: string;
  id?: string;
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function NavBar({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  obj = [],
  show = '',
  role = '',
  id = '',
  doSomething,

  ...props
}: ListProps) {

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname)

  return (
    <>
      {role == 'customer' && (
        <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
            Customer
          </Typography>
          <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {location.pathname !== `/customer/${id}/hot` && (
              <NavButton item='hot' selected={false} doSomething={() => navigate(`/customer/${id}/hot`)} />
            )}
            {location.pathname === `/customer/${id}/hot` && (
              <NavButton item='hot' selected />
            )}

            {obj.map((objs) => {
              return (
                <>
                  {
                    location.pathname !== `/customer/${id}/${objs.categoryId}` && (
                      <NavButton item='category' selected={false} name={objs.categoryName} doSomething={() => navigate(`/customer/${id}/${objs.categoryId}`)} />
                    )
                  }
                  {
                    location.pathname === `/customer/${id}/${objs.categoryId}` && (
                      <NavButton item='category' selected name={objs.categoryName} />
                    )
                  }
                </>
              )
            })}
          </Box>

        </Box>
      )}

      {role == 'manager' && (
        <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
            Manager
          </Typography>
          <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {location.pathname !== `/manager` && (
              <NavButton item='dashboard' selected={false} doSomething={() => navigate(`/manager`)} />
            )}
            {location.pathname === `/manager` && (
              <NavButton item='dashboard' selected />
            )}

            {location.pathname !== `/manager/category` && (
              <NavButton name='Category' item='category' selected={false} doSomething={() => navigate(`/manager/category`)} />
            )}
            {location.pathname === `/manager/category` && (
              <NavButton name='category' item='category' selected />
            )}

            {location.pathname !== `/manager/menu` && (
              <NavButton item='menu' selected={false} doSomething={() => navigate(`/manager/menu`)} />
            )}
            {location.pathname === `/manager/menu` && (
              <NavButton item='menu' selected />
            )}

            {location.pathname !== `/manager/order` && (
              <NavButton item='order' selected={false} doSomething={() => navigate(`/manager/order`)} />
            )}
            {location.pathname === `/manager/order` && (
              <NavButton item='order' selected />
            )}

            {location.pathname !== `/manager/service` && (
              <NavButton item='service' selected={false} doSomething={() => navigate(`/manager/service`)} />
            )}
            {location.pathname === `/manager/service` && (
              <NavButton item='service' selected />
            )}

            {location.pathname !== `/manager/key` && (
              <NavButton item='key' selected={false} doSomething={() => navigate(`/manager/key`)} />
            )}
            {location.pathname === `/manager/key` && (
              <NavButton item='key' selected />
            )}

          </Box>


        </Box>
      )}

      {role == 'bill' && (
        <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
            Customer
          </Typography>
        

        </Box>
      )}

    </>
  );
}