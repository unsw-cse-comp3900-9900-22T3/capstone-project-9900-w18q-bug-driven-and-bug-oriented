import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../stories/NavBar";
import AddManagerCategory from "../stories/manager/managerCategoryCard/AddManagerCategory";
import { getManagerCategory, postManagerCategory, postManagerCategoryOrder } from "../api/manager";
import ManagerCategoryCardStories from "../stories/manager/managerCategoryCard/ManagerCategoryCard.stories";
import ManagerCategoryCard from "../stories/manager/managerCategoryCard/ManagerCategoryCard";
import PacmanLoader from "react-spinners/PacmanLoader";


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

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
  }, []);

  const exList = (arr: {
    categoryName: string;
    categoryId: number,
    lastModified: string,
  }[], index1: number, index2: number) => {
    if (index1 >= 0 && index2 >= 0 && index1 < arr.length && index2 < arr.length) {
      arr.splice(index1, 1, ...arr.splice(index2, 1, arr[index1]));
    }
    return arr;
  }

  const changeList = (index1: number, index2: number) => {
    if (categoryList)
      setCategoryList({
        categoryList: exList(categoryList.categoryList, index1, index2)
      }
      )
  }

  const postOrder = async (input: {
    categoryList: {
      categoryName: string;
      lastModified: string;
      categoryId: number;
    }[]
  }) => {
    const message = await postManagerCategoryOrder(input);
    console.log('new category', message);
    setCategoryList(message);
  }


  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  };

  const getCategory = async () => {
    const message = await getManagerCategory();
    setCategoryList(message);
    setLoading(false);
  }

  const postCategory = async () => {
    const message = await postManagerCategory({ categoryName: newCategory });
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

  useEffect(() => {
    if (categoryList && moveItem === -1)
      postOrder(categoryList);
  }, [moveItem])


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
      ) : (
         <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>

          <Box sx={{ alignItems: 'end', justifyContent: 'right', height: 200, width: '100%', display: 'flex' }}>
            <Box sx={{ mr: 20 }}>
              <AddManagerCategory changeFunc={handleCategoryChange} submitFunc={() => postCategory()} />
            </Box>

          </Box>
          <Box sx={{ height: '100%', width: '100%', overflow: "auto", mt: 5 }}>
            {
              categoryList?.categoryList.map((item, index) => {
                return (
                  <React.Fragment key={item.categoryId}>
                    <Box sx={{ my: 3, mx: 10, height: 185 }}>
                      <ManagerCategoryCard
                        categoryId={item.categoryId}
                        categoryName={item.categoryName}
                        lastModified={item.lastModified}
                        canMove={moveItem === item.categoryId ? true : false}
                        fatherListener={setMoveItem}
                        preFunc={() => changeList(index, index - 1)}
                        nextFunc={() => changeList(index, index + 1)}
                      />
                    </Box>

                  </React.Fragment>
                )
              })
            }
            {(categoryList?.categoryList.length === 0) || (!categoryList) && (
              <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h3">
                  No category now......
                </Typography>
              </Box>
            )
            }

          </Box>
        </Box>       
      )}





      </Box>

    </ThemeProvider>
  );
};

export default ManagerCategory;