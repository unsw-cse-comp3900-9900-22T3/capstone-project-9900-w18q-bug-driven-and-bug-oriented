import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import AddManagerCategory from "../stories/manager/managerCategoryCard/AddManagerCategory";
import { getManagerCategory, postManagerCategory } from "../api/manager";
import ManagerCategoryCardStories from "../stories/manager/managerCategoryCard/ManagerCategoryCard.stories";
import ManagerCategoryCard from "../stories/manager/managerCategoryCard/ManagerCategoryCard";


const theme = createTheme();

interface categoryInterface {
  categoryList: {
    categoryName: string;
    categoryId: number,
    lastModified: string,
  }[]
}

const ManagerCategory: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState('');
  const [categoryList, setCategoryList] = useState<categoryInterface>();
  const [moveItem, setMoveItem] = useState(-1);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  };

  const getCategory = async () => {
    const message = await getManagerCategory();
    setCategoryList(message);
  }

  const postCategory = async () => {
    const message = await postManagerCategory({categoryName:newCategory});
    console.log('success submit', message);
    setCategoryList(message);
  }

  useEffect(() => {
    console.log(newCategory);
  }, [newCategory])

  useEffect(() => {
    console.log(categoryList);
  }, [categoryList])

  useEffect(() => {
    getCategory();
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Box>
          <NavBar role='manager' doSomething={() => { }} postRequest={() => { }} />
        </Box>


        <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ alignItems: 'end', justifyContent: 'right', height: 200, width: '100%', display: 'flex' }}>
            <Box sx={{ mr: 20 }}>
              <AddManagerCategory changeFunc={handleCategoryChange} submitFunc={()=>postCategory()}/>
            </Box>

          </Box>
          <Box sx={{ height: '100%', width: '100%' , overflow: "auto", mt:5}}>
            {
              categoryList?.categoryList.map((item) => {
                return (
                  <React.Fragment key={item.categoryId}>
                    <Box sx={{ my: 3, mx: 10, height: 185 }}>
                      <ManagerCategoryCard
                        categoryId={item.categoryId}
                        categoryName={item.categoryName}
                        lastModified={item.lastModified}
                        canMove={moveItem === item.categoryId ? true : false}
                        fatherListener={setMoveItem}
                      />
                    </Box>

                  </React.Fragment>
                )
              })
            }
          </Box>
        </Box>


      </Box>

    </ThemeProvider>
  );
};

export default ManagerCategory;