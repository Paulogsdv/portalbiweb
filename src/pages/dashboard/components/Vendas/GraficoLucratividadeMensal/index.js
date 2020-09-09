/* eslint-disable react-hooks/exhaustive-deps, react/no-array-index-key, func-names */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TD, TH, TR, THEAD, TBODY, MODAL, MODALBODY, MODALFOOTER, MODALHEADER, MODALTABLE, MODALTEXT } from './styles';
import { formatNumberInMonth, formatValue, currentDate, maskDate } from '../../../../../utils/functions';
import SCROLLHORIZONTAL from '../../../../../components/Scroll/ScrollHorizontal';
import { CARD, CHARTBAR } from '../../../../../components';

import schema from '../../../../../validations/form/Date';
import api from '../../../../../services/api';

export default function GraficoLucratividaMensal({ empresa }) {
   const [dataDefault] = useState({
      dataInicial: maskDate(new Date(currentDate('minusYear', 1, 'reverseYear', 'firstDay'))),
      dataFinal: maskDate(new Date(currentDate('', 0, 'reverseYear', 'lastDay'))),
   });

   const [periodoLucratividade, setPeriodoLucratividade] = useState([{}]);
   const [lucFaturamento, setLucFaturamento] = useState([]);
   const [modalExtrato, setModalExtrato] = useState(false);
   const [lucLucroBruto, setLucroBruto] = useState([]);
   const [lucLucroPer, setLucLucroPer] = useState([]);
   const [loading, setLoading] = useState(false);
   const [lucCusto, setLucCusto] = useState([]);
   const [meses, setMeses] = useState([]);

   // Requisição dos dados do grafico
   async function graficoLucratividadeMensal(data) {
      // Se tiver data como parametro ele repassa
      const { dataInicial, dataFinal } = data || dataDefault;

      setLoading(true);
      await api
         .get(`graficolucratividademensal`, {
            params: { empresa, dataInicial, dataFinal },
         })
         .then(response => {
            setMeses(
               response.data?.map(
                  // Formata o numero em mês para apresentar no gráfico
                  luc => `${formatNumberInMonth(luc.mes)} ${luc.ano}`
               )
            );

            setLucFaturamento(response.data?.map(luc => luc.faturamento));
            setLucCusto(response.data?.map(luc => luc.custo));
            setLucroBruto(response.data?.map(luc => luc.lucroBruto));
            // Percentual
            setLucLucroPer(
               response.data?.map(luc => {
                  let percentual;
                  if (luc.faturamento > 0) {
                     percentual = (luc.lucroBruto / luc.faturamento) * 100;
                  }
                  percentual = Number(percentual.toFixed(2));
                  return percentual;
               })
            );

            setLoading(false);
         });
   }

   // Montando as informações do gráfico
   const dataChart = {
      labels: meses,
      datasets: [
         {
            label: 'Valor faturamento',
            backgroundColor: 'rgba(94, 114, 228, 0.5)',
            data: lucFaturamento,
            borderColor: '#5e72e4',
            borderWidth: 2,
         },
         {
            label: 'Custo mercadoria',
            backgroundColor: 'rgba(245, 54, 92, 0.5)',
            data: lucCusto,
            borderColor: '#f5365c',
            borderWidth: 2,
         },
         {
            type: 'line',
            // borderDash: [5, 5],
            label: 'Lucro bruto',
            backgroundColor: 'transparent',
            data: lucLucroBruto,
            borderColor: '#2dce89',
            borderWidth: 5,
         },
      ],
   };

   // Faz requisição dos dados
   useEffect(() => {
      graficoLucratividadeMensal();
   }, [empresa]);

   // Caso o usuário pesquise por data
   async function handleSubmit(data) {
      await graficoLucratividadeMensal(data);
   }

   // Caso o usuário clique na data no chart
   // Retorna a data e faz uma consulta de duplicatar a pagar
   async function handleElement(element) {
      // Percorre a árvore de atributos do componente e acha o index que foi clicado
      const i = element[0]._index;
      const lucData = element[0]._chart.tooltip._data.labels;
      const lucValorSel = element[0]._chart.tooltip._data.datasets[0].data;
      const lucCustoSel = element[0]._chart.tooltip._data.datasets[1].data;
      const lucLucroSel = element[0]._chart.tooltip._data.datasets[2].data;

      setPeriodoLucratividade([
         {
            data: lucData[i],
         },
         {
            descricao: 'Valor faturamento:',
            valor: formatValue(lucValorSel[i]),
         },
         {
            descricao: 'Custo mercadoria:',
            valor: formatValue(lucCustoSel[i]),
         },
         {
            descricao: 'Lucro bruto:',
            valor: formatValue(lucLucroSel[i]),
            percentual: formatValue(lucLucroPer[i]),
         },
      ]);

      // Abre o modal
      setModalExtrato(true);
   }

   return (
      <CARD
         title="Lucratividade mensal"
         subTitle={`${dataDefault.dataInicial} ${
            dataDefault.dataFinal !== dataDefault.dataInicial ? ` - ${dataDefault.dataFinal}` : ''
         }`}
         valueDateInitial={new Date(currentDate('minusYear', 1, 'reverseYear', 'firstDay'))}
         valueDateEnd={new Date(currentDate('', 0, 'reverseYear', 'lastDay'))}
         handleElement={handleElement}
         submit={handleSubmit}
         filterFirstAndLastDay
         typeLoading="chart"
         loading={loading}
         schema={schema}
         searchDate
         noFooter
      >
         <CHARTBAR data={dataChart} handleElement={handleElement} />
         <MODAL isOpen={modalExtrato} toggle={() => setModalExtrato(!modalExtrato)} size="md">
            <MODALHEADER toggle={() => setModalExtrato(!modalExtrato)}>
               <MODALTEXT>Período: {periodoLucratividade.map(periodo => periodo.data)}</MODALTEXT>
            </MODALHEADER>
            <MODALBODY nopadding>
               <SCROLLHORIZONTAL>
                  <MODALTABLE>
                     <THEAD>
                        <TR>
                           <TH scope="col">Descrição</TH>
                           <TH scope="col" style={{ textAlign: 'center' }}>
                              Percentual ( % )
                           </TH>
                           <TH scope="col" style={{ textAlign: 'right' }}>
                              Valor ( R$ )
                           </TH>
                        </TR>
                     </THEAD>
                     <TBODY>
                        {periodoLucratividade.map((periodo, index) => (
                           <TR key={index}>
                              <TD>{periodo.descricao}</TD>
                              <TD style={{ textAlign: 'center' }}>{periodo.percentual ? periodo.percentual : null}</TD>
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

GraficoLucratividaMensal.propTypes = {
   empresa: PropTypes.string.isRequired,
};
