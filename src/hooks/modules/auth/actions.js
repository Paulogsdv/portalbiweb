import { createPromiseAction } from '@adobe/redux-saga-promise';

export const refreshTokenRequest = createPromiseAction('@auth/REFRESH_TOKEN_REQUEST');

export function successToken(token) {
   return {
      type: '@auth/SUCCESS_TOKEN',
      payload: { token },
   };
}

export function signInRequest(email, senha) {
   return {
      type: '@auth/SIGN_IN_REQUEST',
      payload: { email, senha },
   };
}

export function signInSuccess(token, refreshToken, user) {
   return {
      type: '@auth/SIGN_IN_SUCCESS',
      payload: { token, refreshToken, user },
   };
}

export function logoutInRequest() {
   return {
      type: '@auth/LOGOUT_IN_REQUEST',
   };
}

export function signFailure() {
   return {
      type: '@auth/SIGN_FAILURE',
   };
}

export function signOut() {
   return {
      type: '@auth/SIGN_OUT',
   };
}
