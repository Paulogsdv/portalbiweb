/* eslint-disable prefer-const */
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Conexão Api
import auth from '../../../services/auth';
import api from '../../../services/api';

import { signFailure } from '../auth/actions';
import history from '../../../services/history';
import {
   settingSuccess,
   settingInValidation,
   settingSearchSuccess,
   releasedCompanySuccess,
   userAdmin,
   userComercial,
} from './actions';

export function* settingRequest({ payload }) {
   try {
      const { idUsuario } = payload;

      const response = yield call(auth.get, `/configuracao/${idUsuario}`);

      const { idClientePre, empresaPadrao, limiteCtb, adm, url, cnpj, menu } = response.data;

      if (!url) {
         toast.error('A url do servidor desse usuário não foi fornecida!');

         yield put(signFailure());
         return;
      }

      // Seta a url do servidor do cliente
      api.defaults.baseURL = url;

      if (!cnpj) {
         toast.error('As empresas desse usuário não foram fornecidas!');

         yield put(signFailure());
         return;
      }

      if (!menu) {
         toast.error('O usuário não tem acesso aos módulos do sistema!');

         yield put(signFailure());
         return;
      }

      if (!idClientePre) {
         toast.error('O usuário não foi localizado no banco de dados da Precisa!');

         yield put(signFailure());
         return;
      }

      // Se o usuário for comercial é redirecionado ao crud de notificações e só pode ter acesso ao mesmo.
      if (adm === 2) {
         yield put(userComercial(adm));
         history.push('/notificacoes');
         return;
      }

      // Se o usuário for administrador só pode ter acesso ao crud de usuários relacionados à empresa
      if (adm === 1) {
         yield put(userAdmin(idClientePre, limiteCtb, adm, url, cnpj, menu));
         history.push('/usuarios');
         return;
      }

      // Valida as configurações
      yield put(settingInValidation(empresaPadrao, limiteCtb, adm, url, cnpj, menu));
   } catch (error) {
      yield put(signFailure());
   }
}

export function* settingValidation({ payload }) {
   try {
      let { empresaPadrao, limiteCtb, adm, url, cnpj, menu } = payload;

      toast.info('Carregando suas informações!');

      // Retorna o id das empresas no banco de dados através dos cnpjs liberados
      const idEmpresa = yield call(api.post, 'empresa', {
         cnpj,
      });

      // Verifica se retornou alguma empresa
      if (idEmpresa.data.length > 0) {
         // Transforma o array de id em uma string
         let empresa = idEmpresa.data.map(emp => emp.idEmpresa).toString();

         // Define no sistema as empresas liberadas para consulta nas configurações internas
         yield put(releasedCompanySuccess(empresa));

         // Verifica se já existe a(s) empresa padrão configurada
         if (empresa !== empresaPadrao && empresaPadrao !== null && empresaPadrao !== undefined) {
            // Se tiver ele assume configura tais empresas como padrão
            empresa = empresaPadrao;
         }

         // Retorna as configurações do usuário gravadas do solution
         const configuracao = yield call(api.get, 'configuracao');

         // Define as configurações
         yield put(settingSuccess(limiteCtb, adm, empresa, url, menu, configuracao.data));
         history.push('/dashboard');
      } else {
         toast.error('Nenhuma empresa no banco de dados tem vínculo com este(s) CNPJ(s)!');
         yield put(signFailure());
      }
   } catch (error) {
      toast.error('Sem conexão com o seu servidor!');
      yield put(signFailure());
   }
}

export function* settingSearch({ payload }) {
   const { empresaSearch } = payload;

   yield put(settingSearchSuccess(empresaSearch));
}

export function setURL({ payload }) {
   if (!payload) return;

   const { url } = payload.setting;

   if (url) {
      api.defaults.baseURL = url;
   }
}

export default all([
   takeLatest('persist/REHYDRATE', setURL),
   takeLatest('@setting/SETTING_SEARCH', settingSearch),
   takeLatest('@setting/SETTING_IN_REQUEST', settingRequest),
   takeLatest('@setting/SETTING_IN_VALIDATION', settingValidation),
]);
