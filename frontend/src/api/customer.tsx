import apiClient from "./client";

interface input1 {
  staff: any,
  key: any,
  table: string,
  diner: string
}

export const getCustomerInit = async (a: string) => {
  const result = await apiClient.get(`/customer/${a}/hot`)
  return result.data;
};

export const getCustomerCategory = async (a: string, b:string) => {
  const result = await apiClient.get(`/customer/${a}/${b}`)
  return result.data;
};

export const getCustomerOrder = async (a: string) => {
  const result = await apiClient.get(`/customer/${a}`)
  return result.data;
};