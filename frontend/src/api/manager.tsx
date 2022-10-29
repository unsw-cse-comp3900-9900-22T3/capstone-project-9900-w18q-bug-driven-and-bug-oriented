import apiClient from "./client";

export const getManagerCategory = async () => {
  const result = await apiClient.get(`/manager/category`);
  return result.data;
}

export const postManagerCategory =async (input:{'categoryName':string}) => {
  const data = JSON.stringify(input);
  const result = await apiClient.post(`/manager/category/add`,data);
  return result.data;
}

export const getManagerItem =async () => {
  const result = await apiClient.get(`/manager/item`);
  return result.data;
}

export const addManagerItem =async (input:{
  categoryName:string;
  title:string;
  description:string;
  ingredient:string;
  cost:number;
  calorie:number;
  picture:string;
}) => {
  const data = JSON.stringify(input);
  const result = await apiClient.post(`/manager/item/add`,data);
  return result.data;
}

export const deleteManagerItem =async (id:string) => {
  const result = await apiClient.post(`/manager/item/${id}`);
  return result.data;
}

export const editManagerItem =async (id:string, input:{
  categoryName:string;
  title:string;
  description:string;
  ingredient:string;
  cost:number;
  calorie:number;
  picture:string;
}) => {
  const data = JSON.stringify(input);
  const result = await apiClient.put(`/manager/item/${id}`,input);
  return result.data;
}

export const getManagerKey =async () => {
  const result = await apiClient.get(`/manager/key`);
  return result.data;
}

export const postManagerKey =async (input:{
  role:string;
  name:string;
  key:string;
}) => {
  const result = await apiClient.post(`/manager/key`,input);
  return result.data;
}

export const deleteManagerKey =async (input:{
  role:string;
  key:string;
}) => {
  const result = await apiClient.delete(`/manager/key`,{data:{input}});
  return result.data;
}