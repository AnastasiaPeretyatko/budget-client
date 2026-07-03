import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASEURL;

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': BASE_URL,
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
    const workspaceId = localStorage.getItem('workspaceId');
    if (workspaceId) {
      config.headers['X-Workspace-Id'] = workspaceId;
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
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._isRetry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
            token: refreshToken,
          });

          // localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('token', data.token);

          axios.defaults.headers.common['Authorization'] =
            `Bearer ${data.token}`;
          isRefreshing = false;
          onRefreshed(data.token);

          originalRequest.headers['Authorization'] =
            `Bearer ${data.token}`;
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
