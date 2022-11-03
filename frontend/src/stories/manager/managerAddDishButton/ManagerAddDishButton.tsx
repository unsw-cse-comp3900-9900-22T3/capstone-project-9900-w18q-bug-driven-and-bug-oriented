import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import ManagerDishModal from "../managerDishModal/ManagerDishModal";
import AddIcon from '@mui/icons-material/Add';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无

  //预留空函数
  doSomething?: (params: any) => any;
  categoryName?: string;
  addCard?: (params: any) => any;
}

// 别忘了修改函数名
export default function ManagerAddDishButton({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）

  doSomething,

  categoryName,
  addCard = () => { },
  ...props
}: ListProps) {

  const [editOpen, setEditOpen] = React.useState(false);

  const [haveDishName, setHaveDishName] = useState(true);
  const [haveCalories, setHaveCalories] = useState(true);
  const [havePrice, setHavePrice] = useState(true);
  const [havePicture, setHavePicture] = useState(true);
  const [haveCategory, setHaveCategory] = useState(true);
  const [haveDescription, setHaveDescription] = useState(true);
  const [haveIngredients, setHaveIngredients] = useState(true);
  const [canError, setCanError] = useState(false);


  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => { 
    setEditOpen(false); 
    setNewDishName('');
    setNewCalories('');
    setNewPrice('');
    setNewPictureName('');
    // setNewCategoryName('');
    setNewDescription('');
    setNewIngredients('');

    setCanError(false);

    setHaveDishName(true);
    setHaveCalories(true);
    setHavePrice(true);
    setHavePicture(true);
    setHaveCategory(true);
    setHaveDescription(true);
    setHaveIngredients(true);
  }

  const handleEditComfirm = (e: any) => {
    if (!newDishName) setHaveDishName(false)
    else setHaveDishName(true);
    if (!newCalories || isNaN(Number(newCalories))) setHaveCalories(false)
    else setHaveCalories(true);
    if (!newPrice || isNaN(Number(newPrice))) setHavePrice(false)
    else setHavePrice(true);
    if (!newPictureName) setHavePicture(false)
    else setHavePicture(true);
    if (!newCategoryName) setHaveCategory(false)
    else setHaveCategory(true);
    if (!newDescription) setHaveDescription(false)
    else setHaveDescription(true);
    if (!newIngredients) setHaveIngredients(false)
    else setHaveIngredients(true);

    const obj = {
      title: newDishName,
      calorie: Number(newCalories),
      cost: Number(newPrice),
      picture: newPictureName,
      categoryName: categoryName,
      description: newDescription,
      ingredient: newIngredients,
    };

    console.log('now obj is', obj);
    if (obj.title && obj.calorie && obj.cost && obj.picture
      && obj.categoryName && obj.description && obj.ingredient) {

      addCard(obj);
      setNewDishName('');
      setNewCalories('');
      setNewPrice('');
      setNewPictureName('');
      // setNewCategoryName('');
      setNewDescription('');
      setNewIngredients('');
      
      setCanError(false);
      setEditOpen(false);
    } else {
      setCanError(true);
    }

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

  const [newPictureName, setNewPictureName] = React.useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    setNewPictureName('/dishImg/' + file.name);
  };

  useEffect(() => {
    
  if (canError) {
    if (!newDishName) setHaveDishName(false)
    else setHaveDishName(true);
    if (!newCalories) setHaveCalories(false)
    else setHaveCalories(true);
    if (!newPrice) setHavePrice(false)
    else setHavePrice(true);
    if (!newPictureName) setHavePicture(false)
    else setHavePicture(true);
    if (!newCategoryName) setHaveCategory(false)
    else setHaveCategory(true);
    if (!newDescription) setHaveDescription(false)
    else setHaveDescription(true);
    if (!newIngredients) setHaveIngredients(false)
    else setHaveIngredients(true);
  }
    
  }, [newDishName, newCalories, newPrice, newPictureName, newCategoryName, newDescription, newIngredients])


  useEffect(() => {
    console.log('input', newCategoryName);
  }, [newCategoryName])

  useEffect(() => {
    const keyDownHandler = (e: any) => {
      console.log('now pressed:', e.key);
      if (e.key === 'Enter') {
        e.preventDefault();
        if (editOpen){
          handleEditComfirm(''); 
        }
      
      }
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    }
  }, [newDishName, newCalories, newPrice, newPictureName, newCategoryName, newDescription, newIngredients,editOpen])



  return (
    <>
      <Button variant="contained" onClick={handleEditOpen} sx={{
        height: 45, width: 205, backgroundColor: '#503E9D', borderRadius: 3,
        '&:hover': {
          backgroundColor: '#8475B0',
        }
      }}
        startIcon={<AddIcon fontSize="large" />} >
        <Typography variant="body1" >
          Add new dishes
        </Typography>
      </Button>
      <ManagerDishModal
        editOpen={editOpen}
        // categoryName={newCategoryName}


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

        haveCalories={haveCalories}
        haveCategoryName={haveCategory}
        haveDescription={haveDescription}
        haveDishName={haveDishName}
        haveIngredients={haveIngredients}
        haveNewPictureName={havePicture}
        havePrice={havePrice}

      />
    </>
  );
}