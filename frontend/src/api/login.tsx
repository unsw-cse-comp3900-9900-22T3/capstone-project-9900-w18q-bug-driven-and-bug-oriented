import apiClient from "./client";

interface input {
  staff: any,
  key: any,
  table: string,
  diner: string
}

export const checkLogin = async (input: input) => {
  const data = JSON.stringify(input);
  return await apiClient.post(`/staff`, data);
};

export const getCustomerTable = async () => {
  return await (await apiClient.get(`/`)).data;
};