/* eslint-disable react-hooks/exhaustive-deps, react/no-array-index-key, func-names */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import schema from '../../../../../validations/form/Date';

import { formatNumberInMonth, formatValue, currentDate, maskDate } from '../../../../../utils/functions';

import api from '../../../../../services/api';

import SCROLLHORIZONTAL from '../../../../../components/Scroll/ScrollHorizontal';
import { CARD, CHARTLINE } from '../../../../../components';

import { TD, TH, TR, THEAD, TBODY, MODAL, MODALBODY, MODALFOOTER, MODALHEADER, MODALTABLE, MODALTEXT } from './styles';

export default function GraficoInadimplencia({ empresa }) {
   const [dataDefault] = useState({
      dataInicial: maskDate(new Date(currentDate('minusYear', 1, 'reverseYear', 'firstDay'))),
      dataFinal: maskDate(new Date(currentDate(null, null, 'reverseYear', 'lastDay'))),
   });

   const [inadimplenciaFaturamento, setInadimplenciaFaturamento] = useState([]);
   const [inadimplenciaPeriodoPer, setInadimplenciaPeriodoPer] = useState([]);
   const [inadimplenciaLimitePer, setInadimplenciaLimitePer] = useState([]);
   const [inadimplenciaAtualPer, setInadimplenciaAtualPer] = useState([]);
   const [inadimplenciaPeriodo, setInadimplenciaPeriodo] = useState([]);
   const [inadimplenciaAtual, setInadimplenciaAtual] = useState([]);
   const [meses, setMeses] = useState([]);

   const [periodoInadimplencia, setPeriodoInadimplencia] = useState([{}]);
   const [modalExtrato, setModalExtrato] = useState(false);
   const [loading, setLoading] = useState(false);

   let { inadimplenciaLimite } = useSelector(state => state.setting.configuracoes);

   // Requisição dos dados do grafico
   async function graficoInadimplencia(data) {
      // Se tiver data como parametro ele repassa
      const { dataInicial, dataFinal } = data || dataDefault;

      // Tratamento para caso não tenha configuração
      if (inadimplenciaLimite === undefined) {
         inadimplenciaLimite = 0;
      }

      setLoading(true);
      await api
         .get(`graficoinadimplencia`, {
            params: { empresa, dataInicial, dataFinal },
         })
         .then(response => {
            setMeses(
               response.data?.map(
                  // Formata o numero em mês para apresentar no gráfico
                  inad => `${formatNumberInMonth(inad.mes)} ${inad.ano}`
               )
            );

            // Total
            setInadimplenciaFaturamento(response.data?.map(inad => inad.faturamento));
            setInadimplenciaPeriodo(response.data?.map(inad => inad.inadMes));
            setInadimplenciaAtual(response.data?.map(inad => inad.inadAtual));

            // Percentual
            setInadimplenciaPeriodoPer(
               response.data?.map(inad => {
                  let percentual;
                  if (inad.faturamento > 0) {
                     percentual = (inad.inadMes / inad.faturamento) * 100;
                  }
                  percentual = Number(percentual.toFixed(2));
                  return percentual;
               })
            );
            setInadimplenciaAtualPer(
               response.data?.map(inad => {
                  let percentual;
                  if (inad.faturamento > 0) {
                     percentual = (inad.inadAtual / inad.faturamento) * 100;
                  }
                  percentual = Number(percentual.toFixed(2));
                  return percentual;
               })
            );
            setInadimplenciaLimitePer(
               response.data?.map(() => {
                  return inadimplenciaLimite;
               })
            );
            setLoading(false);
         });
   }

   // Faz requisição dos dados
   useEffect(() => {
      graficoInadimplencia();
   }, [empresa]);

   // Caso o usuário pesquise por data
   async function handleSubmit(data) {
      await graficoInadimplencia(data);
   }

   // Caso o usuário clique na data no chart
   // Retorna a data e faz uma consulta de duplicatar a pagar
   async function handleElement(element) {
      // Percorre a árvore de atributos do componente e acha o index que foi clicado
      const i = element[0]._index;
      const inadData = element[0]._chart.tooltip._data.labels;
      const inadAtual = element[0]._chart.tooltip._data.datasets[0].data;
      const inadPeriodo = element[0]._chart.tooltip._data.datasets[1].data;

      setPeriodoInadimplencia([
         {
            data: inadData[i],
         },
         {
            descricao: 'Faturamento:',
            valor: formatValue(inadimplenciaFaturamento[i]),
         },
         {
            descricao: 'Inadimplência atual:',
            valor: formatValue(inadimplenciaAtual[i]),
            percentual: formatValue(inadAtual[i]),
         },
         {
            descricao: 'Inadimplência período:',
            valor: formatValue(inadimplenciaPeriodo[i]),
            percentual: formatValue(inadPeriodo[i]),
         },
         // Pega limite de inadimplência das configurações internas ou seta 0
         {
            descricao: 'Inadimplência limite:',
            valor: formatValue(inadimplenciaLimite) || 0,
            percentual: formatValue(inadimplenciaLimite) || 0,
         },
      ]);

      // Abre o modal
      setModalExtrato(true);
   }

   // Montando as informações do gráfico
   const dataChart = {
      labels: meses,
      datasets: [
         {
            label: 'Inadimplência atual',
            backgroundColor: 'rgba(245, 54, 92, 0.4)',
            data: inadimplenciaAtualPer,
            borderColor: '#f5365c',
         },
         {
            label: 'Inadimplência período',
            backgroundColor: 'rgba(94, 114, 228, 0.4)',
            data: inadimplenciaPeriodoPer,
            borderColor: '#5e72e4',
         },
         {
            label: 'Inadimplência limite',
            backgroundColor: 'rgba(45,206, 137, 0.4)',
            data: inadimplenciaLimitePer,
            borderColor: '#2dce89',
         },
      ],
   };

   return (
      <CARD
         title="Demonstrativo de inadimplências"
         subTitle={`${dataDefault.dataInicial} ${
            dataDefault.dataFinal !== dataDefault.dataInicial ? ` - ${dataDefault.dataFinal}` : ''
         }`}
         valueDateInitial={new Date(currentDate('minusYear', 1, 'reverseYear', 'firstDay'))}
         valueDateEnd={new Date(currentDate(null, null, 'reverseYear', 'lastDay'))}
         handleElement={handleElement}
         filterFirstAndLastDay
         submit={handleSubmit}
         typeLoading="chart"
         loading={loading}
         data={dataChart}
         schema={schema}
         searchDate
         percentage
         noFooter
      >
         <CHARTLINE data={dataChart} handleElement={handleElement} percentage />
         <MODAL isOpen={modalExtrato} toggle={() => setModalExtrato(!modalExtrato)} size="lg">
            <MODALHEADER toggle={() => setModalExtrato(!modalExtrato)}>
               <MODALTEXT>Período: {periodoInadimplencia.map(periodo => periodo.data)}</MODALTEXT>
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
                        {periodoInadimplencia.map((periodo, index) => (
                           <TR key={index}>
                              <TD>{periodo.descricao}</TD>
                              <TD style={{ textAlign: 'center' }}>{periodo.percentual}</TD>
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

GraficoInadimplencia.propTypes = {
   empresa: PropTypes.string.isRequired,
};
