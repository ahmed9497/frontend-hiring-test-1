import { message } from "antd";
import axios from "axios";

import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
const API_URL = process.env.REACT_APP_API_BASE_URL;


/*to check if same request in queue*/


const axiosInstance =axios.create({
  baseURL:API_URL
})



let loader = "";
axiosInstance.interceptors.request.use(
  async(config) => {
    
    console.log(config)
    loader = document.getElementById("loader-wrapper");
    loader.style.display = "block"

    if (config?.headers?.Authorization) {
     
      let user = jwtDecode(config?.headers?.Authorization);
      let token = config?.headers?.Authorization ;
     
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
      if (!isExpired) {
        config.headers.Authorization = `${token}`;
        return config;
      }
      else {
        const auth = JSON.parse(localStorage.getItem('token'));
      
        const res = await axios.post(`${API_URL}/auth/refresh-token`,{},
          {
            headers: {
              'Authorization': `Bearer ${auth.access_token}`
            }
          });
       
        auth.access_token = res.data.access_token;
        
        
        localStorage.setItem('token',JSON.stringify(auth));
        config.headers.Authorization = `Bearer ${res.data.access_token}` ;
      return config;
      }
     
      return config;

    }
    return config;
  
  }
);

/*Intercepting the response in case of specif status codes*/
axiosInstance.interceptors.response.use(
  function (success) {
    loader.style.display = "none"
    const { status, data } = success;

    data.statusCode = status;


    return Promise.resolve(data);
   
  },
  function (error) {
    loader.style.display = "none"


    if (error?.response?.status === 401) {

      message?.error(error?.response?.data?.message);
      // localStorage.clear();
      // setTimeout(() => {
      //   window.location.href = '/'
      // }, 1000);
    }
   
    
    return Promise.reject(error);
  }
);

const logger = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
export default logger;
