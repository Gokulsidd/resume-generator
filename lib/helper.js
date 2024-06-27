import api from "@/app/utils/api";
import Cookies from "js-cookie";
import { initialValues } from "./constants";

export const fetchData = async (route) => {
  const token = Cookies.get('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await api.get(route);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchDataById = async (route, param) => {
  const token = Cookies.get('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await api.get(route+param);
    return response.data;
  } catch (error) {
    return initialValues
  }
}
