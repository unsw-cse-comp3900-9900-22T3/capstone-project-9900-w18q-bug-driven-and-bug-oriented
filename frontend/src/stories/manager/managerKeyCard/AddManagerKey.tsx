import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Button, Card, IconButton, Input, Modal, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无

  //预留空函数
  addFunc?: (params: any) => any;

}

const ariaLabel = { 'aria-label': 'description' };

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt: 2,
};

const roleList = ['Manager', 'Wait staff', 'Kitchen staff']

// 别忘了修改函数名
export default function AddManagerKey({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）

  addFunc = () =>{},

  ...props
}: ListProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [roleName, setRoleName] = React.useState('');
  const handleRoleNameSelectChange = (event: SelectChangeEvent) => {
    setRoleName(event.target.value);
  };

  const [staffName, setStaffName] = React.useState('');
  const handleStaffNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaffName(event.target.value);
  };

  const [key, setKey] = React.useState('');
  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const subF = (e: any) => {
    handleClose();
    const obj = {
      role: roleName,
      name: staffName,
      key: key,
    };
    addFunc(obj);
  }

  useEffect(()=>{
    console.log('input',roleName, staffName, key);
  },[roleName, staffName, key])

  return (
    <>
      <Button onClick={handleOpen} variant="contained" sx={{
        height: 40, width: 130, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
          backgroundColor: '#8475B0',
        }
      }}>
        <Box sx={{ display: 'flex', ml: -2 }}>
          <AddIcon sx={{ color: '#ffffff' }} />
          <Typography variant="inherit" sx={{ color: '#ffffff', marginLeft: 1, fontSize: 16 }}>
            Add
          </Typography>
        </Box>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Card sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: -2 }}>
            <IconButton onClick={handleClose} color="primary" sx={{ color: '#A3A3A4' }} aria-label="upload picture" component="label">
              <ClearIcon />
            </IconButton>
          </Box>

          <Box sx={{ justifyContent: 'center', display: 'flex', mt: 5,ml:4, flexDirection:'column', width:300 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold',mb:2 }}  >
              ROLE NAME
            </Typography>
            <Select
              value={roleName}
              onChange={handleRoleNameSelectChange}
              sx={{height:35, mb:2}}
            >
              {roleList.map((role) => { return (<MenuItem value={role}>{role}</MenuItem>)})}
            </Select>
          </Box>  

          <Box sx={{ justifyContent: 'center', display: 'flex', mt: 5,ml:4, flexDirection:'column', width:300 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold',mb:2 }}  >
              STAFF NAME
            </Typography>
            <Input fullWidth inputProps={ariaLabel} sx={{mb: 2}} onChange={handleStaffNameChange}/>
          </Box>  

          <Box sx={{ justifyContent: 'center', display: 'flex', mt: 5,ml:4, flexDirection:'column', width:300 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold',mb:2 }}  >
              KEY
            </Typography>
            <Input fullWidth inputProps={ariaLabel} sx={{mb: 2}} onChange={handleKeyChange}/>
          </Box>  

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
            <Button onClick={subF} sx={{
              width: 150, '&:hover': {
                backgroundColor: '#8475B0',
              }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr: 5
            }}>
              <Typography variant="h6" sx={{ color: '#ffffff' }} >
                add
              </Typography>
            </Button>
            <Button onClick={handleClose} sx={{
              width: 150, '&:hover': {
                backgroundColor: '#F1F1F1',
              }, backgroundColor: '#F7F7F7', fontWeight: 'bold', height: 55, borderRadius: 3,
            }}>
              <Typography variant="h6" sx={{ color: '#000000', }} >
                cancel
              </Typography>
            </Button>
          </Box>
        </Card>

      </Modal>
    </>
  );
}