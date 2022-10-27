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