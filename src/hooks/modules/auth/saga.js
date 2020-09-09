/* eslint-disable func-names */
import { takeLatest, takeEvery, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { implementPromiseAction } from '@adobe/redux-saga-promise';

import { settingInRequest } from '../setting/actions';
import history from '../../../services/history';
import api from '../../../services/api';
import auth from '../../../services/auth';
import { signInSuccess, signFailure, signOut, refreshTokenRequest, successToken } from './actions';

export function* signIn({ payload }) {
   try {
      const { email, senha } = payload;

      const response = yield call(auth.post, '/auth/login', {
         email,
         senha,
      });

      const { token, refreshToken, user } = response.data;

      if (!token) {
         toast.error('A autenticação desse usuário não foi fornecida!');

         yield put(signFailure());
         return;
      }

      if (!refreshToken) {
         toast.error('A autenticação secundária desse usuário não foi fornecida!');

         yield put(signFailure());
         return;
      }

      // Foi necessário setar o token antes das requisições
      auth.defaults.headers.Authorization = `Bearer ${token}`;
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Faz autenticação
      yield put(signInSuccess(token, refreshToken, user));

      // Define configurações
      yield put(settingInRequest(user.idUsuario));
   } catch (error) {
      toast.error('Email ou senha do usuário são inválidos!');

      yield put(signFailure());
   }
}

export function setToken({ payload }) {
   if (!payload) return;

   const { token } = payload.auth;

   if (token) {
      auth.defaults.headers.Authorization = `Bearer ${token}`;
      api.defaults.headers.Authorization = `Bearer ${token}`;
   }
}

function* setRefreshToken(action) {
   yield call(implementPromiseAction, action, function*() {
      try {
         const response = yield call(auth.post, '/auth/refreshtoken', { refreshToken: action.payload });

         if (response.data) {
            const { token } = response.data;

            auth.defaults.headers.Authorization = `Bearer ${token}`;
            api.defaults.headers.Authorization = `Bearer ${token}`;
            yield put(successToken(token));

            return token;
         }
         return null;
      } catch (err) {
         return null;
      }
   });
}

export function* logoutIn() {
   // Retira a autenticação
   yield put(signOut());
   // Garante que irá limpar o storage
   localStorage.clear();
   // Garante que irá limpar o cache
   window.location.reload(true);
   // Garante que irá para o login
   history.push('/');
}

export default all([
   takeLatest('persist/REHYDRATE', setToken),
   takeLatest('@auth/SIGN_IN_REQUEST', signIn),
   takeLatest('@auth/LOGOUT_IN_REQUEST', logoutIn),
   takeEvery(refreshTokenRequest, setRefreshToken),
]);
