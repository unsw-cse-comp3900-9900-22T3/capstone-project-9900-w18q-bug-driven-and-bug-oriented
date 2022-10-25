import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

// 声明变量的数据格式
interface ListProps {
  modalType?: string;
  editOpen?: boolean;
  categoryName?: string;
  dishName?: string;
  description?: string;
  ingredients?: string;
  calories?: string;
  price?: string;
  newPictureName?: string;

  handleEditClose?: (params: any) => any;
  handleEditComfirm?: (params: any) => any;
  handleCategoryChange?: (params: any) => any;
  handleDishChange?: (params: any) => any;
  handleDescriptionChange?: (params: any) => any;
  handleIngredientsChange?: (params: any) => any;
  handleCaloriesChange?: (params: any) => any;
  handlePriceChange?: (params: any) => any;
  handleFileUpload?: (params: any) => any;
}

const editStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt: 2,
};

const ariaLabel = { 'aria-label': 'description' };

// 别忘了修改函数名
export default function ManagerDishModal({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  modalType = 'Add', //Add or Update
  
  editOpen = false,

  categoryName = 'category name',
  dishName = 'Title name',
  description = 'Within 150 words',
  ingredients = 'Within 150 words',
  calories = '0',
  price = '0.00',
  newPictureName = 'picture',

  handleEditClose = () => {},
  handleEditComfirm = () => {},
  handleCategoryChange = () => {},
  handleDishChange = () => {},
  handleDescriptionChange = () => {},
  handleIngredientsChange = () => {},
  handleCaloriesChange = () => {},
  handlePriceChange = () => {},
  handleFileUpload = () => {},
  

  ...props
}: ListProps) {
  return (
    <>
      <Modal
                open={editOpen}
                onClose={handleEditClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >

                <Card sx={editStyle}>
                  <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: -2 }}>
                    <IconButton onClick={handleEditClose} color="primary" sx={{ color: '#A3A3A4' }} aria-label="upload picture" component="label">
                      <ClearIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ justifyContent: 'center', alignContent: 'middle', display: 'flex', mt: -3, flexDirection: 'column' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}  >
                      CATEGORY NAME
                    </Typography>
                    <Input placeholder={categoryName} inputProps={ariaLabel} sx={{mb: 5}} onChange={handleCategoryChange}/>

                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}  >
                      DISH NAME
                    </Typography>
                    <Input placeholder={dishName} inputProps={ariaLabel} sx={{mb: 5}} onChange={handleDishChange}/>

                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}  >
                      DESCRIPTION
                    </Typography>
                    <Input placeholder={description} inputProps={ariaLabel} sx={{mb: 5}} onChange={handleDescriptionChange}/>

                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}  >
                      INGREDIENTS
                    </Typography>
                    <Input placeholder={ingredients} inputProps={ariaLabel} sx={{mb: 5}} onChange={handleIngredientsChange}/>

                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}  >
                      CALORIES
                    </Typography>
                    <Box>
                      <Input placeholder={calories} inputProps={ariaLabel} sx={{mb: 5}} onChange={handleCaloriesChange}/> 
                      <Box display='inline' fontWeight='bold'>Cal</Box>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}  >
                      PRICE
                    </Typography>
                    <Box>
                      <Box display='inline' fontWeight='bold'>$</Box>
                      <Input placeholder={price} inputProps={ariaLabel} sx={{mb: 5}} onChange={handlePriceChange}/>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}  >
                      PICTURE
                    </Typography>
                    <Box>
                      <Input disabled placeholder={newPictureName} inputProps={ariaLabel} sx={{mb: 5, width: 0.75, fontWeight: 'bold'}}/> 
                      <Box display='inline'>
                      <Button 
                        component="label"
                        sx={{
                          '&:hover': {
                            backgroundColor: '#8475B0',
                          }, backgroundColor: '#503E9D', fontWeight: 'bold', borderRadius: 3, mx:1
                        }}>
                      <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 'bold'}} >
                        Upload
                      </Typography>
                      <input hidden accept="image/*" multiple type="file" onChange={handleFileUpload}/>
                    </Button>
                      </Box>
                    </Box>

                  </Box>

                  <Box sx={{display:'flex', justifyContent:'center', mt:1}}>
                    <Button onClick={handleEditComfirm} sx={{
                      width: 150, '&:hover': {
                        backgroundColor: '#8475B0',
                      }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr:5
                    }}>
                      <Typography variant="h6" sx={{ color: '#ffffff' }} >
                        {modalType}
                      </Typography>
                    </Button>
                    <Button onClick={handleEditClose} sx={{
                      width: 150, '&:hover': {
                        backgroundColor: '#F1F1F1',
                      }, backgroundColor: '#F7F7F7', fontWeight: 'bold', height: 55, borderRadius: 3,
                    }}>
                      <Typography variant="h6" sx={{ color: '#000000' }} >
                        Cancel
                      </Typography>
                    </Button>
                  </Box>
                </Card>

                </Modal> 
    </>
  );
}