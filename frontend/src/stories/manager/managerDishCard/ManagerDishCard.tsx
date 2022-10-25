import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import { useEffect } from 'react';
import { fontSize } from '@mui/system';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  props1?: string;
  props2?: string;
  props3?: boolean;
  //预留空函数
  removeCard: (params: any) => any;
  editCard: (params: any) => any;

  dishId?: string;
  dishName?: string;
  categoryName?: string;
  description?: string;
  ingredients?: string;
  calories?: string;
  price?: string;
  picture?: string;
  passObj?: (params: any) => any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 280,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt: 2,
};

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
export default function DishCard({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）

  dishId = '123',
  dishName = 'Chicken Grill',
  categoryName = 'meat',
  description = 'It is one of the mot iconic and well-recognized fast food out there.',
  ingredients = 'Meat, vegetable',
  calories = '20',
  price = '16.66',
  picture = '/dishImg/chickenGrill.jpg',
  passObj = () => { },
  removeCard = () => { },
  editCard = () => { },
  ...props
}: ListProps) {

  const [removeOpen, setRemoveOpen] = React.useState(false);
  const handleRemoveOpen = () => setRemoveOpen(true);
  const handleRemoveClose = () => setRemoveOpen(false);
  const handleRemoveComfirm =(e: any) => {
    setRemoveOpen(false);
    removeCard(dishId);
  };

  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleEditComfirm =(e: any) => {
    setEditOpen(false);
    const obj = {
      dishId: dishId,
      title: newDishName,
      calorie: newCalories,
      cost: newPrice,
      picture: newPictureFile,
      category: newCategoryName,
      description: newDescription,
      ingredients: newIngredients,
    };
    editCard(obj);
  };


  const [newCategoryName, setNewCategoryName] = React.useState('');
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const [newDishName, setNewDishName] = React.useState('');
  const handleDishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDishName(event.target.value);
  };

  const [newDescription, setNewDescription] = React.useState('');
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  const [newIngredients, setNewIngredients] = React.useState('');
  const handleIngredientsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredients(event.target.value);
  };

  const [newCalories, setNewCalories] = React.useState('');
  const handleCaloriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCalories(event.target.value);
  };

  const [newPrice, setNewPrice] = React.useState('');
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(event.target.value);
  };

  const [newPictureName, setNewPictureName] = React.useState('picture');
  const [newPictureFile, setNewPictureFile] = React.useState({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    
    const file = e.target.files[0];
    setNewPictureName(file.name);
  };

  return (
    <>

      <Card variant='outlined' sx={{ width: 410, borderRadius: 5, border: 0, zIndex: 10, position: 'relative', mt: -2.5 }}>

        <CardMedia
          component="img"
          height="180"
          sx={{ width: '100%', borderRadius: 5 }}
          image={picture}
          alt={dishName}
        />

        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <Box sx={{ display: 'flex', height: 50 }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {dishName}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                minWidth: 50,
                height: 23,
                borderRadius: 2,
                backgroundColor: '#EEECF5',
                color: '#503E9D',
                textAlign: 'center',
                p: 0.5,
                m: 0.5,
                fontWeight: 'bold',
              }}
            >{calories}Cal
            </Box>

            <Box
              sx={{
                minWidth: 50,
                height: 23,
                borderRadius: 2,
                backgroundColor: '#EEECF5',
                color: '#503E9D',
                textAlign: 'center',
                p: 0.5,
                m: 0.5,
                fontWeight: 'bold',
              }}
            >
              $ {price}
            </Box>
          </Box>

        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          
            <Box sx={{ display: 'flex', mx: 1, mt: -2, mb: 2 }}>
              <Button variant="contained" onClick={handleEditOpen} sx={{
              height: 40, width: 130, backgroundColor: '#503E9D', borderRadius: 3,
              '&:hover': {
                backgroundColor: '#8475B0',
              }
              }}>
                <Typography variant="h6" >
                  Edit
                </Typography>
              </Button>
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
                      <Typography sx={{ color: '#ffffff'}} >
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
                        Update
                      </Typography>
                    </Button>
                    <Button onClick={handleEditClose} sx={{
                      width: 150, '&:hover': {
                        backgroundColor: '#F1F1F1',
                      }, backgroundColor: '#F7F7F7', fontWeight: 'bold', height: 55, borderRadius: 3,
                    }}>
                      <Typography variant="h6" sx={{ color: '#000000', }} >
                        Cancel
                      </Typography>
                    </Button>
                  </Box>
                </Card>

                </Modal>   
            </Box>

            <Box sx={{ display: 'flex', mx: 1, mt: -2, mb: 2 }}>
              <Button variant="contained" onClick={handleRemoveOpen} sx={{
                height: 40, width: 130, backgroundColor: '#503E9D', borderRadius: 3,
                '&:hover': {
                  backgroundColor: '#8475B0',
                }
                }}>
                <Typography variant="h6" >
                  Remove
                </Typography>
              </Button>
                <Modal
                open={removeOpen}
                onClose={handleRemoveClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >

                <Card sx={style}>
                  <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: -2 }}>
                    <IconButton onClick={handleRemoveClose} color="primary" sx={{ color: '#A3A3A4' }} aria-label="upload picture" component="label">
                      <ClearIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ justifyContent: 'center', alignContent: 'middle', display: 'flex', mt: 3, flexDirection: 'column' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2}}  >
                      Confirm if you want to remove
                    </Typography>
                  </Box>

                  <Box sx={{display:'flex', justifyContent:'center', mt:4}}>
                    <Button onClick={handleRemoveComfirm} sx={{
                      width: 150, '&:hover': {
                        backgroundColor: '#8475B0',
                      }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr:5
                    }}>
                      <Typography variant="h6" sx={{ color: '#ffffff' }} >
                        Confirm
                      </Typography>
                    </Button>
                    <Button onClick={handleRemoveClose} sx={{
                      width: 150, '&:hover': {
                        backgroundColor: '#F1F1F1',
                      }, backgroundColor: '#F7F7F7', fontWeight: 'bold', height: 55, borderRadius: 3,
                    }}>
                      <Typography variant="h6" sx={{ color: '#000000', }} >
                        Cancel
                      </Typography>
                    </Button>
                  </Box>
                </Card>

              </Modal>   
            </Box>

          
        </CardActions>

      </Card>
    </>
  );
}
