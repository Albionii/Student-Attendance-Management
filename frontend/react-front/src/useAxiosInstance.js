import axios from "axios";

export function useAxiosInstance({handleShow = null}) {

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", 
    withCredentials: true, 
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        handleShow(); //* The parent of this function should navigate("/")
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
