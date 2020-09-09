/* eslint-disable no-nested-ternary, react-hooks/exhaustive-deps,react/no-array-index-key, no-unused-expressions, prefer-const */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MdArrowBack from '@meronex/icons/md/MdArrowBack';
import PropTypes from 'prop-types';

import { formatDate, formatValue } from '../../../../../utils/functions';
import { CARD, TABS } from '../../../../../components';
import SCROLLHORIZONTAL from '../../../../../components/Scroll/ScrollHorizontal';

import schema from '../../../../../validations/form/SemValidacao';
import api from '../../../../../services/api';

import { BUTTON, CONTENT, CONTAINER, COL, CARDTABLE, THEAD, TBODY, TD, TH, TR, ROW, DIV } from './styles';

export default function ExtratoContaBancaria({ location }) {
   // Variaveis passadas por parametro pelo botão gerar extrato do saldo de contas bancarias
   let { empresa, dataDefault, nomeConta, idConta } = location.state;

   const [extratoContaBancaria, setExtratoContaBancaria] = useState([]);
   const [dataExtrato, setDataExtrato] = useState(dataDefault);
   const [diasLct, setDiasLct] = useState(3);
   const [tipoLct, setTipoLct] = useState(0);
   const [loading, setLoading] = useState(false);
   const [activeTab, setActiveTab] = useState('3 dias');

   // Requisição do extrato bancario
   async function extratoBancario(data) {
      // Se o usuario pesquisar por data mensal desconsidera o parametro que vem do saldo de contas bancarias
      const dataInicial = data || dataExtrato;

      setLoading(true);
      await api
         .get(`/extratocontabancaria`, {
            params: { empresa, idConta, tipoLct, diasLct, dataInicial },
         })
         .then(response => {
            setExtratoContaBancaria(response.data);
            setLoading(false);
         });

      return () => {
         setLoading(false);
      };
   }

   async function handleSubmit(data) {
      // Pega a data escolhida pelo usuario
      await extratoBancario(data.dataInicial);
      await setDataExtrato(data.dataInicial);
      await setActiveTab(null);
   }

   useEffect(() => {
      extratoBancario();
   }, [empresa, idConta, tipoLct, diasLct]);

   async function handleDate(type) {
      if (type === '3 dias') {
         if (activeTab !== '3 dias') {
            await setActiveTab(type);
            await setTipoLct(0);
            await setDiasLct(3);
         }
      } else if (type === '15 dias') {
         if (activeTab !== '15 dias') {
            await setActiveTab(type);
            await setTipoLct(1);
            await setDiasLct(15);
         }
      } else if (type === '30 dias') {
         if (activeTab !== '30 dias') {
            await setActiveTab(type);
            await setTipoLct(1);
            await setDiasLct(30);
         }
      }
   }

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CONTENT>
                  <Link to="/dashboard">
                     <BUTTON color="#fff" type="button">
                        <MdArrowBack size={18} />
                     </BUTTON>
                  </Link>
                  <BUTTON color="#fff" type="button">
                     {tipoLct === 0 ? `Dias com lançamentos` : `Dias corridos`}
                  </BUTTON>
               </CONTENT>
               <DIV>
                  <TABS
                     tabAttributes={['3 dias', '15 dias', '30 dias']}
                     activeTab={activeTab}
                     submit={handleDate}
                     margin
                     show
                  />
                  <CARD
                     title={`Extrato da conta bancária: ${nomeConta} `}
                     valueDateInitial={new Date()}
                     subTitle={`${dataExtrato}`}
                     submit={handleSubmit}
                     typeLoading="table"
                     loading={loading}
                     schema={schema}
                     filterMonth
                     searchDate
                     uniqueDate
                     noPadding
                     noFooter
                  >
                     <SCROLLHORIZONTAL>
                        <CARDTABLE>
                           <THEAD>
                              <TR>
                                 <TH scope="col">Data</TH>
                                 <TH scope="col">Histórico</TH>
                                 <TH scope="col">Complemento</TH>
                                 <TH scope="col" style={{ textAlign: 'right' }}>
                                    Entrada
                                 </TH>
                                 <TH scope="col" style={{ textAlign: 'right' }}>
                                    Saída
                                 </TH>
                                 <TH scope="col" style={{ textAlign: 'right' }}>
                                    Saldo
                                 </TH>
                              </TR>
                           </THEAD>
                           <TBODY>
                              {extratoContaBancaria?.map((extrato, index) => (
                                 <TR key={index}>
                                    <TD
                                       backgroundColor={extrato.tipoTotal === 1 ? '#bddaa5' : '#FFF'}
                                       fontweight={extrato.tipoTotal === 1 ? 600 : 400}
                                       color="#1e2022"
                                    >
                                       <p>{formatDate(extrato.dataLanc)}</p>
                                    </TD>
                                    <TD
                                       backgroundColor={extrato.tipoTotal === 1 ? '#bddaa5' : '#FFF'}
                                       fontweight={extrato.tipoTotal === 1 ? 600 : 400}
                                       color="#1e2022"
                                    >
                                       <p>{extrato.historico}</p>
                                    </TD>
                                    <TD
                                       backgroundColor={extrato.tipoTotal === 1 ? '#bddaa5' : '#FFF'}
                                       fontweight={extrato.tipoTotal === 1 ? 600 : 400}
                                       color="#1e2022"
                                    >
                                       <p>{extrato.complemento}</p>
                                    </TD>
                                    <TD
                                       backgroundColor={extrato.tipoTotal === 1 ? '#bddaa5' : '#FFF'}
                                       fontweight={extrato.tipoTotal === 1 ? 600 : 400}
                                       style={{ textAlign: 'right' }}
                                       color="#1e2022"
                                    >
                                       <p>{extrato.debito > 0 ? `${formatValue(extrato.debito)}` : null}</p>
                                    </TD>
                                    <TD
                                       backgroundColor={extrato.tipoTotal === 1 ? '#bddaa5' : '#FFF'}
                                       fontweight={extrato.tipoTotal === 1 ? 600 : 400}
                                       style={{ textAlign: 'right' }}
                                       color="#1e2022"
                                    >
                                       <p>{extrato.credito > 0 ? `${formatValue(extrato.credito)}` : null}</p>
                                    </TD>
                                    <TD
                                       backgroundColor={extrato.tipoTotal === 1 ? '#bddaa5' : '#FFF'}
                                       style={{ textAlign: 'right' }}
                                       color={
                                          extrato.saldo < 0
                                             ? '#ff2600'
                                             : extrato.tipoTotal === 1
                                             ? '#1e2022'
                                             : '#1e2022'
                                       }
                                    >
                                       <h5>{formatValue(extrato.saldo)}</h5>
                                    </TD>
                                 </TR>
                              ))}
                           </TBODY>
                        </CARDTABLE>
                     </SCROLLHORIZONTAL>
                  </CARD>
               </DIV>
            </COL>
         </ROW>
      </CONTAINER>
   );
}

ExtratoContaBancaria.propTypes = {
   location: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
