import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import ManagerDishModal from "../managerDishModal/ManagerDishModal";
import AddIcon from '@mui/icons-material/Add';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  props1?: string;
  props2?: string;
  props3?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;

  addCard?: (params: any) => any;
}

// 别忘了修改函数名
export default function ManagerAddDishButton({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  props1 = '',
  props2 = '',
  props3 = true,
  doSomething,

  addCard = () => {},
  ...props
}: ListProps) {
  
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => { setEditOpen(false); setNewPictureName('picture');}
  const handleEditComfirm =(e: any) => {
    setEditOpen(false);
    const obj = {
      //dishId: dishId,
      title: newDishName,
      calorie: newCalories,
      cost: newPrice,
      picture: newPictureName,
      category: newCategoryName,
      description: newDescription,
      ingredients: newIngredients,
    };
    addCard(obj);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    
    const file = e.target.files[0];
    setNewPictureName(file.name);
  };

  return (
    <>
      <Button variant="contained" onClick={handleEditOpen} sx={{
        height: 45, width: 205, backgroundColor: '#503E9D', borderRadius: 3,
        '&:hover': {
          backgroundColor: '#8475B0',
        }
      }}
      startIcon={<AddIcon fontSize="large"/>} >
        <Typography variant="body1" >
          Add new dishes
        </Typography>
      </Button>
      <ManagerDishModal 
        editOpen={editOpen} 
        handleEditClose={handleEditClose}
        handleEditComfirm={handleEditComfirm}
        handleCategoryChange={handleCategoryChange}
        handleDishChange={handleDishChange}
        handleDescriptionChange={handleDescriptionChange}
        handleIngredientsChange={handleIngredientsChange}
        handleCaloriesChange={handleCaloriesChange}
        handlePriceChange={handlePriceChange}
        handleFileUpload={handleFileUpload}
        newPictureName={newPictureName}
      />
    </>
  );
}