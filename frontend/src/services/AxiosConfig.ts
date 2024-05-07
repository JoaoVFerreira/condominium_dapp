import axios from 'axios';

const instance = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem("token") || "";
    return config;
  },
  error => error
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && [401, 403].includes(error.response.status)) {
      console.error('Redirecting to login by 4xx response!');
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      localStorage.removeItem("account");

      if (window.location.pathname !== "/") {
        return window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
