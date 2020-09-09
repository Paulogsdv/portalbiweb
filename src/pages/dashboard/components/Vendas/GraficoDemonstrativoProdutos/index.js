/* eslint-disable react-hooks/exhaustive-deps, react/no-array-index-key, func-names */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TD, TH, TR, THEAD, TBODY, MODAL, MODALBODY, MODALFOOTER, MODALHEADER, MODALTABLE, MODALTEXT } from './styles';
import { formatNumberInMonth, formatValue, currentDate, maskDate } from '../../../../../utils/functions';
import { CARD, CHARTBAR } from '../../../../../components';
import SCROLLHORIZONTAL from '../../../../../components/Scroll/ScrollHorizontal';

import api from '../../../../../services/api';
import schema from '../../../../../validations/form/Date';

export default function GraficoDemonstrativoProdutos({ empresa }) {
   const [dataDefault] = useState({
      dataInicial: maskDate(new Date(currentDate('minusYear', 1, 'reverseYear', 'firstDay'))),
      dataFinal: maskDate(new Date(currentDate('', 0, 'reverseYear', 'lastDay'))),
   });

   const [periodoDemonstrativo, setPeriodoDemonstrativo] = useState([{}]);
   const [prodNaoVendidos, setProdNaoVendidos] = useState([]);
   const [modalExtrato, setModalExtrato] = useState(false);
   const [prodVendidos, setProdVendidos] = useState([]);
   const [loading, setLoading] = useState(false);
   const [meses, setMeses] = useState([]);

   // Requisição dos dados do grafico
   async function graficoDemonstrativoProdutos(data) {
      // Se tiver data como parametro ele repassa
      const { dataInicial, dataFinal } = data || dataDefault;

      setLoading(true);
      await api
         .get(`graficodemonstrativoprodutos`, {
            params: { empresa, dataInicial, dataFinal },
         })
         .then(response => {
            setMeses(
               response.data?.map(
                  // Formata o numero em mês para apresentar no gráfico
                  prod => `${formatNumberInMonth(prod.mes)} ${prod.ano}`
               )
            );

            setProdVendidos(response.data?.map(prod => prod.vendidos));
            setProdNaoVendidos(response.data?.map(prod => prod.naoVendidos));

            setLoading(false);
         });
   }

   // Montando as informações do gráfico
   const dataChart = {
      labels: meses,
      datasets: [
         {
            label: 'Não vendidos',
            backgroundColor: 'rgba(245, 54, 92, 0.5)',
            data: prodNaoVendidos,
            borderColor: '#f5365c',
            borderWidth: 2,
         },
         {
            label: 'Vendidos',
            backgroundColor: 'rgba(45,206, 137, 0.4)',
            data: prodVendidos,
            borderColor: '#2dce89',
            borderWidth: 2,
         },
      ],
   };

   // Faz requisição dos dados
   useEffect(() => {
      graficoDemonstrativoProdutos();
   }, [empresa]);

   // Caso o usuário pesquise por data
   async function handleSubmit(data) {
      await graficoDemonstrativoProdutos(data);
   }

   // Caso o usuário clique na data no chart
   // Retorna a data e faz uma consulta de duplicatar a pagar
   async function handleElement(element) {
      // Percorre a árvore de atributos do componente e acha o index que foi clicado
      const i = element[0]._index;
      const prodData = element[0]._chart.tooltip._data.labels;
      const prodNaoVen = element[0]._chart.tooltip._data.datasets[0].data;
      const prodVen = element[0]._chart.tooltip._data.datasets[1].data;

      setPeriodoDemonstrativo([
         {
            data: prodData[i],
         },
         {
            descricao: 'Produtos não vendidos:',
            valor: formatValue(prodNaoVen[i]),
         },
         {
            descricao: 'Produtos vendidos:',
            valor: formatValue(prodVen[i]),
         },
      ]);

      // Abre o modal
      setModalExtrato(true);
   }

   return (
      <CARD
         title="Demonstrativo de produtos (vendidos x não vendidos)"
         valueDateInitial={new Date(currentDate('minusYear', 1, 'reverseYear', 'firstDay'))}
         valueDateEnd={new Date(currentDate('', 0, 'reverseYear', 'lastDay'))}
         submit={handleSubmit}
         loading={loading}
         schema={schema}
         filterFirstAndLastDay
         searchDate
         noFooter
      >
         <CHARTBAR data={dataChart} handleElement={handleElement} stracked />
         <MODAL isOpen={modalExtrato} toggle={() => setModalExtrato(!modalExtrato)} size="md">
            <MODALHEADER toggle={() => setModalExtrato(!modalExtrato)}>
               <MODALTEXT>Período: {periodoDemonstrativo.map(periodo => periodo.data)}</MODALTEXT>
            </MODALHEADER>
            <MODALBODY nopadding>
               <SCROLLHORIZONTAL>
                  <MODALTABLE>
                     <THEAD>
                        <TR>
                           <TH scope="col">Descrição</TH>
                           <TH scope="col" style={{ textAlign: 'right' }}>
                              Quantidade
                           </TH>
                        </TR>
                     </THEAD>
                     <TBODY>
                        {periodoDemonstrativo.map((periodo, index) => (
                           <TR key={index}>
                              <TD>{periodo.descricao}</TD>
                              <TD style={{ textAlign: 'right' }}>{periodo.valor}</TD>
                           </TR>
                        ))}
                     </TBODY>
                  </MODALTABLE>
               </SCROLLHORIZONTAL>
            </MODALBODY>
            <MODALFOOTER />
         </MODAL>
      </CARD>
   );
}

GraficoDemonstrativoProdutos.propTypes = {
   empresa: PropTypes.string.isRequired,
};
