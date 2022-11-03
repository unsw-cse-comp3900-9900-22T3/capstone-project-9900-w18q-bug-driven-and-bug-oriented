import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import ManagerAddKey from "../stories/manager/managerKeyCard/ManagerAddKey";
import { deleteManagerKey, getManagerKey, postManagerKey } from "../api/manager";
import ManagerKeyCard from "../stories/manager/managerKeyCard/ManagerKeyCard";
import PacmanLoader from "react-spinners/PacmanLoader";


const theme = createTheme({
  typography:{
     fontFamily: "Quicksand",
     button: {
      textTransform: 'none'
    }
  }
});

interface keyListInterface {
  keyList: {
    role: string;
    name: string;
    key: string;
  }
}

interface keyInterface {
  role: string;
  name: string;
  key: string;
}

const roleList = ['All', 'Manager', 'Kitchen staff', 'Wait staff']

const map1 = new Map();
map1.set('manager', 'Manager')
map1.set('kitchen', 'Kitchen staff')
map1.set('wait', 'Wait staff')

const ManagerKey: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [keyList, setKeyList] = useState<keyListInterface>()
  const [showName, setShowName] = useState<string>('All');


  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
  }, []);

  const handleRoleNameSelectChange = (event: SelectChangeEvent) => {
    setShowName(event.target.value);
  };
  const getKey = async () => {
    const message = await getManagerKey();
    setKeyList(message);
    console.log(message);
    setLoading(false);
  }

  const postKey = async (e: keyInterface) => {
    const message = await postManagerKey(e);
    if (message.message === 'success') {
      setKeyList({ keyList: message.keyList });
    }
    console.log(message);
    return (message.message);
  }

  const deleteKey = async (role: string, key: string) => {
    const message = await deleteManagerKey({ role, key });
    // console.log({role,key});
    console.log('delete success', message);
    setKeyList(message);
  }

  useEffect(() => {
    getKey();
  }, [])

  useEffect(() => {
    console.log(keyList);
  }, [keyList])


  return (
    <ThemeProvider theme={theme}>
 <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>      
      {loading ? (
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <PacmanLoader size={100} color={"#503E9D"} loading={loading} />
        </Box>
      ) : (<Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ alignItems: 'end', justifyContent: 'space-between', height: 250, width: '100%', display: 'flex' }}>
            <Box sx={{ ml: 20, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, mt: 5 }}  >
                ROLE NAME:
              </Typography>
              <FormControl >
                <Select
                  value={showName}
                  onChange={handleRoleNameSelectChange}
                  sx={{ height: 35, mb: 2 }}
                >
                  {roleList.map((role) => { return (<MenuItem key={'name' + role} value={role}>{role}</MenuItem>) })}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mr: 20 }}>
              <ManagerAddKey addFunc={(e) => postKey(e)} />
            </Box>

          </Box>
          <Box sx={{ height: '100%', width: '100%', overflow: "auto", mt: 5 }}>
            {
              Array.isArray(keyList?.keyList) && keyList?.keyList.map((item, index) => {
                if (showName === 'All' || showName === map1.get(item.role) )
                return (
                  <React.Fragment key={'key' + index}>
                    <Box sx={{ my: 3, mx: 10, height: 185 }}>
                      <ManagerKeyCard
                        keyValue={item.key}
                        role={map1.get(item.role)}
                        name={item.name}
                        deleteFunc={() => deleteKey(item.role, item.key)}

                      />
                    </Box>

                  </React.Fragment>
                )
              })
            }
          </Box>
        </Box>)}
     

      </Box>

    </ThemeProvider>
  );
};

export default ManagerKey;