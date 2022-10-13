import apiClient from "./client";

interface input1 {
  staff: any,
  key: any,
  table: string,
  diner: string
}

export const getCustomerInit = async (a: string) => {
  const result = await apiClient.get(`/customer/${a}/hot`);
  return result.data;
};

export const getCustomerCategory = async (a: string, b: string) => {
  const result = await apiClient.get(`/customer/${a}/${b}`);
  return result.data;
};

export const getCustomerOrder = async (a: string) => {
  const result = await apiClient.get(`/customer/${a}`);
  return result.data;
};

export const postCustomerOrder = async (a:
  {
    'orderList': any
  },
  id: string) => {
  const result = await apiClient.post(`/customer/${id}`, JSON.stringify(a));
  return result.data;
};

export const getCustomerBill = async (a: string) => {
  const result = await apiClient.get(`/customer/${a}/bill`);
  return result.data;
};