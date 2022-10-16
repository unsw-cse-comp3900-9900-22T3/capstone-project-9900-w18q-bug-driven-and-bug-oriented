import apiClient from "./client";

export const getWaitRequest = async () => {
  const result = await apiClient.get(`/wait/request`);
  return result.data;
};

export const getWaitItem = async () => {
  const result = await apiClient.get(`/wait/item`);
  return result.data;
};

export const getWaitOrder = async () => {
  const result = await apiClient.get(`/wait/order`);
  return result.data;
};