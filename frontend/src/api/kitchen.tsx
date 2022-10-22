import apiClient from "./client";

export const getKitchenOrder = async () => {
  const result = await apiClient.get(`/kitchen`);
  return result.data;
};

export const postKitchenOrder = async (input: { 'orderStatus': string }) => {
  const result = await apiClient.post(`/kitchen`, JSON.stringify(input));
  return result.data;
};