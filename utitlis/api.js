/* eslint-disable no-undef */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import queryClient from "./queries";

const BASEURL = import.meta.env.access_Url;

export const authlessFetch = axios.create({
  baseURL: BASEURL,
});

const authedFetch = axios.create({
  baseURL: BASEURL,
});

authedFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("urgentBuyToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    }
    const navigate = useNavigate();
    queryClient.invalidateQueries();
    queryClient.clear();
    navigate("/");
  },
  (error) => {
    return Promise.reject(error);
  }
);

authedFetch.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      const navigate = useNavigate();
      queryClient.invalidateQueries();
      queryClient.clear();
      navigate("/");
    }
    return Promise.reject(error);
  }
);

export default authedFetch;