import axios, { AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

export const http = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': baseURL,
    'ngrok-skip-browser-warning': true,
  },
});


let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._isRetry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._isRetry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const { data } = await axios.post(`${baseURL}/refresh`, {
            token: refreshToken,
          });

          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('accessToken', data.accessToken);

          axios.defaults.headers.common['Authorization'] =
            `Bearer ${data.accessToken}`;
          isRefreshing = false;
          onRefreshed(data.accessToken);

          originalRequest.headers['Authorization'] =
            `Bearer ${data.accessToken}`;
          return http(originalRequest);
        } catch (err) {
          isRefreshing = false;
          localStorage.clear();
          window.location.assign('/login');
          return Promise.reject(err);
        }
      } else {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(http(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  },
);
