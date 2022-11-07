import { Box } from "@mui/system";
import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import NavButton from "./NavButton";
import { useLocation, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import AskHelpButtonStories from "./customer/askHelpButton/AskHelpButton.stories";
import AskHelpButton from "./customer/askHelpButton/AskHelpButton";

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
  canBack?: boolean;
  //预留空函数
  doSomething: (params: any) => any;
  postRequest: (params: any) => any;

}

// 别忘了修改函数名
export default function NavBar({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  obj = [],
  show = '',
  role = '',
  id = '',
  canBack = false,
  doSomething,
  postRequest,

  ...props
}: ListProps) {

  const location = useLocation();
  const navigate = useNavigate();


  return (
    <>
      {role == 'customer' && (
        <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
            Customer
          </Typography>
          <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow:'auto', height:'70vh',width: 300 }}>
            <Box>
              {location.pathname !== `/customer/${id}/hot` && (
              <NavButton item='hot' selected={false} doSomething={(e) => { navigate(`/customer/${id}/hot`); doSomething(e); }} />
            )}
            {location.pathname === `/customer/${id}/hot` && (
              <NavButton item='hot' selected />
            )}
            </Box>
            

            {obj.map((objs) => {
              return (
                <Box key={objs.categoryId}>
                  {
                    location.pathname !== `/customer/${id}/${objs.categoryId}` && (
                      
                      <NavButton item='category' selected={false} name={objs.categoryName} doSomething={(e) => { navigate(`/customer/${id}/${objs.categoryId}`); doSomething(e); }} />
                    )
                  }
                  {
                    location.pathname === `/customer/${id}/${objs.categoryId}` && (
                      <NavButton item='category' selected name={objs.categoryName} />
                    )
                  }
                </Box>
              )
            })}
          </Box>
      
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', mb: 3, flexGrow:1}}>
            <AskHelpButton doSomething={postRequest} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', mb: 5 }}>
            {canBack && (<Logout status="back" />)}
            {!canBack && (<Box sx={{height:45}}></Box>)}
        </Box>

        </Box>
  )
}

{
  role == 'manager' && (
    <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
        Manager
      </Typography>
      <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {location.pathname !== `/manager` && (
          <NavButton item='dashboard' selected={false} doSomething={(e) => { navigate(`/manager`); doSomething(e); }} />
        )}
        {location.pathname === `/manager` && (
          <NavButton item='dashboard' selected />
        )}

        {location.pathname !== `/manager/category` && (
          <NavButton name='Category' item='category' selected={false} doSomething={(e) => { navigate(`/manager/category`); doSomething(e); }} />
        )}
        {location.pathname === `/manager/category` && (
          <NavButton name='Category' item='category' selected />
        )}

        {location.pathname !== `/manager/menu` && (
          <NavButton item='menu' selected={false} doSomething={(e) => { navigate(`/manager/menu`); doSomething(e); }} />
        )}
        {location.pathname === `/manager/menu` && (
          <NavButton item='menu' selected />
        )}

        {location.pathname !== `/manager/order` && (
          <NavButton item='order' selected={false} doSomething={(e) => { navigate(`/manager/order`); doSomething(e); }} />
        )}
        {location.pathname === `/manager/order` && (
          <NavButton item='order' selected />
        )}

        {location.pathname !== `/manager/service` && (
          <NavButton item='service' selected={false} doSomething={(e) => { navigate(`/manager/service`); doSomething(e); }} />
        )}
        {location.pathname === `/manager/service` && (
          <NavButton item='service' selected />
        )}

        {location.pathname !== `/manager/key` && (
          <NavButton item='key' selected={false} doSomething={(e) => { navigate(`/manager/key`); doSomething(e) }} />
        )}
        {location.pathname === `/manager/key` && (
          <NavButton item='key' selected />
        )}

      </Box>
      <Box sx={{ display: 'flex', height: '100%', }}></Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', mb: 5 }}>
        <Logout status="logout" />
      </Box>

    </Box>
  )
}

{
  role == 'bill' && (
    <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
        Customer
      </Typography>
      <Box sx={{ display: 'flex', height: '100%', }}></Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', mb: 10 }}>
        <Logout status="back" />
      </Box>


    </Box>
  )
}
{
  role == 'kitchen' && (
    <Box sx={{ display: 'flex', width: 300, height: '100%', backgroundColor: '#F7F7F7', borderTopRightRadius: 10, borderBottomRightRadius: 10, flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', margin: 5 }}>
        Kitchen
      </Typography>
      <Box sx={{ display: 'flex', height: '100%', }}></Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', mb: 10 }}>
        <Logout status="logout" />
      </Box>


    </Box>
  )
}

    </>
  );
}