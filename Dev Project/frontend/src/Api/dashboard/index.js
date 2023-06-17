// FrontEnd EndPoint
import axios from "axios";
import apiBaseUrl from "../../constant/appConstant";
const api = axios.create({
  baseURL: apiBaseUrl.BACKEND_BASE_URL,
});

export const getActivity = async () => {
  return await api.get("/v1/exercise/");
};
export const createActivity = async (data) => {
  console.log('APIDataHere===>',data)
  // return await api.post(`/api/v1/exercise/save`, data);
};
export const deleteActivity = async (id) => {
  return await api.delete(`/v1/exercise/${id}`);
};
export const updateActivity = async (item, data) => {
  return await api.put(`/v1/exercise/${item.id}`, data);
};
export const getActivityPagination = async (pageno, pagelimit) => {
  return await api.get(
    `/v1/exercise/activityPage?page=${pageno}&limit=${pagelimit}`
  );
};
