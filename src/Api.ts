import axios from "axios";

axios.interceptors.request.use((request) => {
  request.baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
  if(localStorage.getItem('token'))
    request.headers = {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
  return request;
});

export default axios;
