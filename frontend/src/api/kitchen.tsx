import apiClient from "./client";

export const getKitchenOrder = async () => {
  const result = await apiClient.get(`/kitchen`);
  return result.data;
};

export const postKitchenOrder = async (input: { 'orderStatus': string }) => {
  const result = await apiClient.post(`/kitchen`, JSON.stringify(input));
  return result.data;
};

export const getKitchenEachOrder = async (id:string) => {
  const result = await apiClient.get(`/kitchen/${id}`);
  return result.data;
};

export const postKitchenEachOrder = async (input:{'itemIndex':number,'itemStatus':string}, id:string) => {
  const result = await apiClient.post(`/kitchen/${id}`, JSON.stringify(input));
  return result.data;
};