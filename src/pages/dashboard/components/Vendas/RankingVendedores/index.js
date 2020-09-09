/* eslint-disable no-unused-expressions,react-hooks/exhaustive-deps, react/no-array-index-key, func-names, consistent-return, no-shadow */
import React, { useEffect, useState } from 'react';
import MdTrophy from '@meronex/icons/ios/MdTrophy';
import PropTypes from 'prop-types';

import { CARDTABLE, THEAD, TBODY, TD, TH, TR, SPAN } from './styles';
import { CARD, TABS } from '../../../../../components';
import { formatValue, maskDate, currentDate } from '../../../../../utils/functions';

import SCROLLHORIZONTAL from '../../../../../components/Scroll/ScrollHorizontal';

import schema from '../../../../../validations/form/SemValidacao';
import api from '../../../../../services/api';

export default function RankingVendedores({ empresa }) {
   const [dataDefault, setDataDefault] = useState({
      dataInicial: currentDate('minusDays', 1),
      dataFinal: currentDate('minusDays', 1),
   });

   const [ordenacao, setOrdernacao] = useState('Quantidade');
   const [totalRegistros, setTotalRegistros] = useState([]);
   const [loading, setLoading] = useState(false);
   const [vendas, setVendas] = useState([]);
   const [page, setPage] = useState(1);
   const [size] = useState(10);

   // Tabs
   const [activeTabDate, setActiveTabDate] = useState(1);
   const [activeTabOrder, setActiveTabOrder] = useState(1);

   async function rankingVendedores(data) {
      setLoading(true);

      const { dataInicial, dataFinal } = data || dataDefault;

      await api
         .get(`rankingvendedores`, {
            params: { empresa, ordenacao, dataInicial, dataFinal, page, size },
         })
         .then(response => {
            setTotalRegistros(response.headers['x-record-count']);
            setVendas(response.data);

            setLoading(false);
         });
   }

   useEffect(() => {
      rankingVendedores();
   }, [empresa, page, ordenacao, dataDefault]);

   async function handleSubmit(data) {
      await rankingVendedores(data);
      await setDataDefault(data);
      await setActiveTabDate(null);
   }

   async function handlePage(page) {
      await setPage(page);
   }

   async function handleDate(type) {
      if (type === 'Ontem') {
         if (activeTabDate !== 1) {
            await setActiveTabDate(1);
            await setDataDefault({
               dataInicial: currentDate('minusDays', 1),
               dataFinal: currentDate('minusDays', 1),
            });
         }
      } else if (type === 'Hoje') {
         if (activeTabDate !== 2) {
            await setActiveTabDate(2);
            await setDataDefault({
               dataInicial: maskDate(new Date()),
               dataFinal: maskDate(new Date()),
            });
         }
      } else if (type === 'Mês') {
         if (activeTabDate !== 3) {
            await setActiveTabDate(3);
            await setDataDefault({
               dataInicial: currentDate(null, null, null, 'firstDay'),
               dataFinal: maskDate(new Date()),
            });
         }
      }
   }

   async function handleOrder(type) {
      if (type === 'Quantidade') {
         if (activeTabOrder !== 1) {
            await setActiveTabOrder(1);
            await setOrdernacao(type);
         }
      } else if (type === 'Faturamento') {
         if (activeTabOrder !== 2) {
            await setActiveTabOrder(2);
            await setOrdernacao(type);
         }
      } else if (type === 'Custo') {
         if (activeTabOrder !== 3) {
            await setActiveTabOrder(3);
            await setOrdernacao(type);
         }
      } else if (type === 'Lucro') {
         if (activeTabOrder !== 4) {
            await setActiveTabOrder(4);
            await setOrdernacao(type);
         }
      }
   }

   return (
      <CARD
         title="Ranking de vendedores"
         subTitle={`${dataDefault.dataInicial} ${
            dataDefault.dataFinal !== dataDefault.dataInicial ? ` - ${dataDefault.dataFinal}` : ''
         }`}
         totalRecords={totalRegistros}
         valueDateInitial={new Date()}
         valueDateEnd={new Date()}
         handlePage={handlePage}
         submit={handleSubmit}
         typeLoading="table"
         loading={loading}
         schema={schema}
         page={page}
         size={size}
         pagination
         searchDate
      >
         <TABS tabAttributes={['Ontem', 'Hoje', 'Mês']} submit={handleDate} activeTab={activeTabDate} show />
         <TABS
            tabAttributes={['Quantidade', 'Faturamento', 'Custo', 'Lucro']}
            submit={handleOrder}
            activeTab={activeTabOrder}
            show
         />
         {vendas && vendas.length > 0 ? (
            <SCROLLHORIZONTAL>
               <CARDTABLE>
                  <THEAD>
                     <TR>
                        <TH scope="col">Posição</TH>
                        <TH scope="col">Seção</TH>
                        <TH scope="col" style={{ textAlign: 'center' }}>
                           Vendido (Qtd)
                        </TH>
                        <TH scope="col" style={{ textAlign: 'right' }}>
                           Faturamento (R$)
                        </TH>
                        <TH scope="col" style={{ textAlign: 'right' }}>
                           Custo (R$)
                        </TH>
                        <TH scope="col" style={{ textAlign: 'right' }}>
                           Lucro (R$)
                        </TH>
                     </TR>
                  </THEAD>
                  <TBODY>
                     {vendas?.map((ven, index) => (
                        <TR key={index}>
                           <TD backgroundColor="#FFF" color="#1e2022">
                              <p>
                                 {page === 1 ? index + 1 : index + 1 + (size * page - size)}{' '}
                                 {index + 1 === 1 && page === 1 && <MdTrophy color="#ffd700" size={18} />}
                                 {index + 1 === 2 && page === 1 && <MdTrophy color="#bab8b5" size={18} />}
                                 {index + 1 === 3 && page === 1 && <MdTrophy color="#b87333" size={18} />}
                              </p>
                           </TD>
                           <TD backgroundColor="#FFF" color="#1e2022">
                              <p>{ven?.nomeVendedor ? ven.nomeVendedor : 'Outros faturamentos'}</p>
                           </TD>
                           <TD style={{ textAlign: 'center' }} color="#1e2022">
                              <p>{ven?.qtdVendida}</p>
                           </TD>
                           <TD style={{ textAlign: 'right' }} color="#5e72e4">
                              <p>{ven?.faturamento > 0 ? `${formatValue(ven?.faturamento)}` : null}</p>
                           </TD>
                           <TD style={{ textAlign: 'right' }} color="#F65374">
                              <p>{ven?.custo > 0 ? `${formatValue(ven?.custo)}` : null}</p>
                           </TD>
                           <TD style={{ textAlign: 'right' }} color="#4CD59A">
                              <p>{formatValue(ven?.lucro)}</p>
                           </TD>
                        </TR>
                     ))}
                  </TBODY>
               </CARDTABLE>
            </SCROLLHORIZONTAL>
         ) : (
            <SPAN> Sem registros no ranking de vendedores neste período! </SPAN>
         )}
      </CARD>
   );
}

RankingVendedores.propTypes = {
   empresa: PropTypes.string.isRequired,
};
