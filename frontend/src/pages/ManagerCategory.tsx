import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Card,
  createTheme,
  Divider,
  Grid,
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
import BorderColorIcon from '@mui/icons-material/BorderColor';


const theme = createTheme({
  typography: {
    fontFamily: "Quicksand"
  }
});

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
  const [move, setMove] = useState(false);

  const [source, setSource] = useState<null | number>(null);
  const [target, setTarget] = useState<null | number>(null);
  const [hide, setHide] = useState(false);


  const sortFunc = () => {
    if (move) {
      setMove(false);
      if (categoryList) {
        let newList = new Array();
        for (let i = 0; i < categoryList.categoryList.length; i++) {
          if (categoryList.categoryList[i].categoryId !== 0)
            newList.push(categoryList.categoryList[i]);
        }
        postList({ categoryList: newList });
      }
    } else {
      setMove(true);
    }
  }

  const onDragStart = (id: number) => (e: any) => {
    // console.log(`#${id} - `, e);
    setSource(id);
    setTimeout(() => setHide(true), 50);
    console.log('show')
  }

  const onDragOver = (id: number) => (e: any) => {
    // console.log(`#${id} - `, e);
    e.preventDefault();
    setTarget(id);
    console.log('over')
    setHide(true)

  }

  const onDragLeave = (id: number) => (e: any) => {
    // console.log(`#${id} - `, e)
    e.preventDefault();
    setTarget(null)
    console.log('leave')
    setTimeout(() => setHide(false), 0);
  }




  const onDrop = () => {
    console.log('onDrop');
    setSource(null);
    setTarget(null);
    setHide(false);
    if ((categoryList) && (target !== null) && (source !== null)) {
      if (categoryList.categoryList[target].categoryId !== 0) {
        categoryList.categoryList[target - 1] = categoryList.categoryList[source]
      } else {
        categoryList.categoryList[target] = categoryList.categoryList[source]
      }

      categoryList.categoryList[source] = {
        categoryId: 0,
        categoryName: '',
        lastModified: ''
      }
      let newList = new Array();
      for (let i = 0; i < categoryList.categoryList.length; i++) {
        if (categoryList.categoryList[i].categoryId !== 0)
          newList.push(categoryList.categoryList[i]);
      }
      setCategoryList(modifyList({ categoryList: newList }));

    }
  }


  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
  }, []);


  // const exList = (arr: {
  //   categoryName: string;
  //   categoryId: number,
  //   lastModified: string,
  // }[], index1: number, index2: number) => {
  //   if (index1 >= 0 && index2 >= 0 && index1 < arr.length && index2 < arr.length) {
  //     arr.splice(index1, 1, ...arr.splice(index2, 1, arr[index1]));
  //   }
  //   return arr;
  // }

  // const changeList = (index1: number, index2: number) => {
  //   if (categoryList)
  //     setCategoryList({
  //       categoryList: exList(categoryList.categoryList, index1, index2)
  //     }
  //     )
  // }

  const postList = async (input: {
    categoryList: {
      categoryName: string;
      lastModified: string;
      categoryId: number;
    }[]
  }) => {
    const message = await postManagerCategoryOrder(input);
    console.log('new category', message);
    setCategoryList(modifyList(message));
  }


  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  };


  const modifyList = (input: categoryInterface): categoryInterface => {
    let newList = new Array();
    for (let i = 0; i < input.categoryList.length; i++) {
      newList.push(
        {
          categoryId: 0,
          categoryName: '',
          lastModified: ''
        });
      newList.push(input.categoryList[i]);
    }
    newList.push({
      categoryId: 0,
      categoryName: '',
      lastModified: ''
    });
    return { categoryList: newList };
  }

  const getCategory = async () => {
    const message = await getManagerCategory();
    setCategoryList(modifyList(message));
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
    if (categoryList && move === false)
      // postList(categoryList);
      console.log('now is', move);
  }, [move])


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

            <Box sx={{ alignItems: 'end', justifyContent: 'right', height: 200, width: '100%', display: 'flex', flexDirection: 'row' }}>
              <Box sx={{mr:5}}>
                <Button variant="contained" onClick={sortFunc} sx={{
                  height: 45, width: 120, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
                    backgroundColor: '#8475B0'
                  }
                }}>
                  <Box sx={{ display: 'flex' }}>
                    <BorderColorIcon sx={{ color: '#ffffff' }} />
                    <Typography variant="inherit" sx={{ color: '#ffffff', marginLeft: 1, fontSize: 16 }}>
                      sort
                    </Typography>
                  </Box>
                </Button>
              </Box>

              <Box sx={{mr:15}}>
                <AddManagerCategory changeFunc={handleCategoryChange}
                  submitFunc={() => postCategory()}
                />
              </Box>



            </Box>
            <Box justifyContent={'center'} alignItems={'flex-start'} sx={{ height: '100%', width: '100%', overflow: "auto", mt: 5, mb: 5 }}>
              {
                categoryList?.categoryList.map((item, index) => {

                  let zValue;
                  if (item.categoryId !== 0) {
                    zValue = 10;
                  }
                  if (item.categoryId === 0 && !hide) {
                    zValue = 5;
                  }
                  if (item.categoryId === 0 && hide) {
                    zValue = 15;
                  }

                  return (
                    <Box key={'cate' + index} sx={{ mt: -8, mb: -12, mx: 10, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{
                        width: '100%',
                        // bgcolor: c, 
                        display: 'flex', alignItems: 'center'
                      }}

                        // onDragOver={item.categoryId === 0 ? onDragOver(index) : undefined}
                        onDragOver={onDragOver(index)}
                        onDragLeave={onDragLeave(index)}
                      >
                        <Box sx={{
                          // bgcolor: b,
                          width: '100%',
                          position: 'relative',
                          display: 'flex', alignItems: 'center',

                        }}
                          height={item.categoryId === 0 ? 210 : 185}

                          zIndex={zValue}
                          // draggable={move === item.categoryId ? true : false}
                          draggable={(item.categoryId !== 0 && move) ? true : false}
                          onDragStart={onDragStart(index)}

                          onDrop={onDrop}
                        >
                          {/* <Card>{JSON.stringify(item)}</Card> */}
                          {item.categoryId !== 0 && <ManagerCategoryCard
                            categoryId={item.categoryId}
                            categoryName={item.categoryName}
                            lastModified={item.lastModified}
                            canMove={move}
                            selected={source === index}
                            fatherListener={setMove}
                          // preFunc={() => changeList(index, index - 1)}
                          // nextFunc={() => changeList(index, index + 1)}

                          />}
                          {
                            (item.categoryId === 0) &&
                            // <Box sx={{width:'100%', height:2, bgcolor:'#503E9D', mx:3}}>
                            //   </Box>
                            <Divider sx={{
                              width: '100%',
                              "&::before, &::after": {
                                borderColor: target === index ? '#503E9D' : '#ffffff',

                              },
                              color: target === index ? '#503E9D' : '#ffffff',

                            }}> Move to here
                            </Divider>
                          }

                        </Box>
                      </Box>


                    </Box>
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