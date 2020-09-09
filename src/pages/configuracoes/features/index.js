/* eslint-disable no-unused-expressions, no-shadow, react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { CENTER, BUTTON, CONTAINER, COL, ROW, TABCONTENT, TABPANE } from './styles';
import { CARD, INPUT, FORM, TABS } from '../../../components';
import { GERAL, DASHBOARD, RESUMOCONTAS } from '..';
import { settingSuccess } from '../../../hooks/modules/setting/actions';

import schema from '../../../validations/form/Configuracoes';
import api from '../../../services/api';
import auth from '../../../services/auth';

// 167517
export default function Configuracoes({ history }) {
   const { adm, empresaPadrao, menu, limiteCtb } = useSelector(state => state.setting);
   const [configuracoes, setConfiguracoes] = useState({});
   const [activeTab, setActiveTab] = useState('Geral');
   const dispatch = useDispatch();

   const { profile } = useSelector(state => state.user);
   const { idUsuario } = profile;

   const [loading, setLoading] = useState(false);

   async function handleSubmit(data) {
      // Caso tenha empresa nova no form é atualizada caso contrario é utilizada a empresa já configurada.
      const empresa = data?.empresaPadrao || empresaPadrao;
      // Requisição para salvar as configurações gerais
      await api
         .post('/configuracao', data)
         .then(async () => {
            // Se salvou corretamente as configurações gerais
            // Requisição para salvar as configurações por usuário
            await auth
               .post(`/configuracao/${idUsuario}/${empresa}`)
               .then(() => {
                  // Atualiza o redux com as novas informações
                  dispatch(settingSuccess(limiteCtb, adm, empresa, data.url, menu, data));
                  toast.success('Configurações atualizadas com sucesso!');
                  history.push('/dashboard');
               })
               .catch(() => {
                  toast.error('Não foi possível atualizar as configurações do usuário!');
               });
         })
         .catch(() => {
            toast.error('Não foi possível atualizar as configurações gerais!');
         });
   }

   useEffect(() => {
      let configuracao;

      async function getConfiguracoes() {
         setLoading(true);
         // Faz a requisição para as configurações especificas do usuário
         await auth.get(`/configuracao/${idUsuario}`).then(async response => {
            configuracao = response.data;
            // Faz a requisição para as configurações gerais do sistema
            await api.get(`/configuracao`).then(response => {
               configuracao = response.data;
               setConfiguracoes(configuracao);
            });
            setLoading(false);
         });
      }

      getConfiguracoes();
   }, []);

   async function handleType(type) {
      if (type === 'Geral') {
         if (activeTab !== type) await setActiveTab(type);
      } else if (type === 'Dashboard') {
         if (activeTab !== type) await setActiveTab(type);
      } else if (type === 'Resumo de contas') {
         if (activeTab !== type) await setActiveTab(type);
      }
   }

   function handleMenu() {
      const gerarMenu = [];
      gerarMenu.push('Geral');

      menu?.financeiro?.ativo === 1 && gerarMenu.push('Dashboard');
      menu?.financeiro?.resumoContas === 1 && gerarMenu.push('Resumo de contas');

      return gerarMenu;
   }

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CARD title="Configurações internas" loading={loading} typeLoading="table">
                  <FORM schema={schema} submit={handleSubmit} initialData={configuracoes}>
                     <INPUT name="idCfg" hidden />
                     <INPUT name="idUsuario" defaultValue={configuracoes?.idUsuario || profile?.idUsuario} hidden />
                     <TABS tabAttributes={handleMenu()} submit={handleType} activeTab={activeTab} margin show />
                     <TABCONTENT activeTab={activeTab}>
                        <TABPANE tabId="Geral">
                           <GERAL configuracoes={configuracoes} />
                        </TABPANE>
                        <TABPANE tabId="Dashboard">
                           <DASHBOARD configuracoes={configuracoes} menu={menu} />
                        </TABPANE>
                        <TABPANE tabId="Resumo de contas">
                           <RESUMOCONTAS configuracoes={configuracoes} />
                        </TABPANE>
                     </TABCONTENT>
                     <CENTER>
                        <BUTTON color="#fff" type="submit">
                           SALVAR
                        </BUTTON>
                     </CENTER>
                  </FORM>
               </CARD>
            </COL>
         </ROW>
      </CONTAINER>
   );
}

Configuracoes.propTypes = {
   history: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
