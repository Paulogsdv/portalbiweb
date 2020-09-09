import axios from 'axios';
import { logoutInRequest, refreshTokenRequest } from '../hooks/modules/auth/actions';

// URL DO SERVIDOR DE AUTENTICACAO
const auth = axios.create({
   baseURL: process.env.REACT_APP_BASEURL,
   timeout: 180000,
});

auth.registerInterceptWithStore = async store => {
   auth.interceptors.request.use(
      response => response,
      async err => {
         if (err.response?.status === 403 || err.response?.status === 401) {
            const { refreshToken } = store.getState().auth;

            if (refreshToken) {
               const originalRequest = err.config;

               try {
                  const token = await store.dispatch(refreshTokenRequest(refreshToken));

                  if (token) {
                     originalRequest.headers.Authorization = `Bearer ${token}`;

                     return axios(originalRequest);
                  }

                  await store.dispatch(logoutInRequest());
               } catch {
                  await store.dispatch(logoutInRequest());
               }
            }
         }

         return Promise.reject(err);
      }
   );

   auth.interceptors.response.use(
      response => response,
      async err => {
         if (err.response?.status === 403 || err.response?.status === 401) {
            const { refreshToken } = store.getState().auth;

            if (refreshToken) {
               const originalRequest = err.config;

               try {
                  const token = await store.dispatch(refreshTokenRequest(refreshToken));

                  if (token) {
                     originalRequest.headers.Authorization = `Bearer ${token}`;

                     return axios(originalRequest);
                  }

                  await store.dispatch(logoutInRequest());
               } catch {
                  await store.dispatch(logoutInRequest());
               }
            }
         }

         return Promise.reject(err);
      }
   );
};

export default auth;
