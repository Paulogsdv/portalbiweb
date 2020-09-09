/* eslint-disable react-hooks/exhaustive-deps, no-return-await, no-shadow */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { CARDSALESBODY, CARDSALESGROUP, CARDSALDO, CARDSALESTYPE, CARDBODYCOL, CARDBODYROW, SPAN } from './styles';
import { formatValue, currentDate, maskDate } from '../../../../../utils/functions';
import { CARD, TABS } from '../../../../../components';

import api from '../../../../../services/api';
import schema from '../../../../../validations/form/SemValidacao';

export default function TicketMedio({ empresa }) {
   const [dataDefault, setDataDefault] = useState({
      dataInicial: currentDate('minusDays', 1),
      dataFinal: currentDate('minusDays', 1),
   });

   const [loading, setLoading] = useState(false);
   const [vendas, setVendas] = useState([]);

   const [activeTab, setActiveTab] = useState(1);

   async function ticketMedio(data) {
      await setLoading(true);

      const { dataInicial, dataFinal } = data || dataDefault;

      await api
         .get(`ticketmedio`, {
            params: { empresa, dataInicial, dataFinal },
         })
         .then(response => {
            setVendas(response.data);
            setLoading(false);
         });
   }

   useEffect(() => {
      ticketMedio();
   }, [empresa, dataDefault]);

   async function handleSubmit(data) {
      await ticketMedio(data);
      await setDataDefault(data);
      await setActiveTab(null);
   }

   async function handleDate(type) {
      if (type === 'Ontem') {
         if (activeTab !== 1) {
            await setActiveTab(1);
            await setDataDefault({
               dataInicial: currentDate('minusDays', 1),
               dataFinal: currentDate('minusDays', 1),
            });
         }
      } else if (type === 'Hoje') {
         if (activeTab !== 2) {
            await setActiveTab(2);
            await setDataDefault({
               dataInicial: maskDate(new Date()),
               dataFinal: maskDate(new Date()),
            });
         }
      } else if (type === 'Mês') {
         if (activeTab !== 3) {
            await setActiveTab(3);
            await setDataDefault({
               dataInicial: currentDate(null, null, null, 'firstDay'),
               dataFinal: maskDate(new Date()),
            });
         }
      }
   }

   return (
      <CARD
         title="Ticket médio"
         subTitle={`${dataDefault.dataInicial} ${
            dataDefault.dataFinal !== dataDefault.dataInicial ? ` - ${dataDefault.dataFinal}` : ''
         }`}
         valueDateInitial={new Date()}
         valueDateEnd={new Date()}
         submit={handleSubmit}
         typeLoading="ticket"
         loading={loading}
         schema={schema}
         searchDate
         noFooter
      >
         <TABS tabAttributes={['Ontem', 'Hoje', 'Mês']} submit={handleDate} activeTab={activeTab} show />
         {vendas && vendas.length > 0 ? (
            <CARDBODYROW>
               {vendas?.map(ven => (
                  <CARDBODYCOL key={ven?.totalVendas}>
                     <CARDSALESBODY>
                        <CARDSALESGROUP>
                           <CARDSALESTYPE>
                              Faturamento (R$)
                              <CARDSALDO color={ven?.faturamento >= 0 ? '#4CD59A' : '#F65374'}>
                                 {formatValue(ven?.faturamento)}
                              </CARDSALDO>
                           </CARDSALESTYPE>
                           <CARDSALESTYPE>
                              Total de vendas (Qtd)<CARDSALDO>{formatValue(ven?.totalVendas)}</CARDSALDO>
                           </CARDSALESTYPE>
                           <CARDSALESTYPE>
                              Ticket médio (R$)
                              <CARDSALDO
                                 color={
                                    ven?.faturamento / ven?.totalVendas >= 0 || ven?.faturamento === 0
                                       ? '#4CD59A'
                                       : '#F65374'
                                 }
                              >{`${
                                 ven?.totalVendas > 0
                                    ? formatValue((ven?.faturamento / ven?.totalVendas).toFixed(2))
                                    : 0
                              }`}</CARDSALDO>
                           </CARDSALESTYPE>
                           <CARDSALESTYPE>
                              Preço médio (R$)
                              <CARDSALDO
                                 color={
                                    ven?.faturamento / ven?.totalVendas / (ven?.qtdVendida / ven?.totalVendas) >= 0 ||
                                    ven?.faturamento === 0
                                       ? '#4CD59A'
                                       : '#F65374'
                                 }
                              >{`${
                                 ven?.totalVendas > 0
                                    ? formatValue(
                                         (
                                            ven?.faturamento /
                                            ven?.totalVendas /
                                            (ven?.qtdVendida / ven?.totalVendas)
                                         ).toFixed(2)
                                      )
                                    : 0
                              }`}</CARDSALDO>
                           </CARDSALESTYPE>
                           <CARDSALESTYPE>
                              Produto por venda (Qtd)
                              <CARDSALDO>
                                 {ven?.totalVendas > 0
                                    ? formatValue((ven?.qtdVendida / ven?.totalVendas).toFixed(2))
                                    : 0}
                              </CARDSALDO>
                           </CARDSALESTYPE>
                           <CARDSALESTYPE>
                              Produto por venda (Unit)
                              <CARDSALDO>
                                 {ven?.totalVendas > 0
                                    ? formatValue((ven?.qtdProdutoVen / ven?.qtdProduto).toFixed(2))
                                    : 0}
                              </CARDSALDO>
                           </CARDSALESTYPE>
                        </CARDSALESGROUP>
                     </CARDSALESBODY>
                  </CARDBODYCOL>
               ))}
            </CARDBODYROW>
         ) : (
            <SPAN> Sem registros de vendas neste período! </SPAN>
         )}
      </CARD>
   );
}

TicketMedio.propTypes = {
   empresa: PropTypes.string.isRequired,
};
