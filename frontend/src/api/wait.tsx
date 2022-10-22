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

export const postWaitOrder = async (id: string) => {
  const result = await apiClient.post(`/wait/order/${id}`);
  return result.data;
};

export const postWaitItem = async (id: string) => {
  const result = await apiClient.post(`/wait/item/${id}`);
  return result.data;
};

export const postWaitRequest = async (id: string) => {
  const result = await apiClient.post(`/wait/request/${id}`);
  return result.data;
};