/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
/* eslint-disable  func-names, react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { formatDate, formatTime, currentDate } from '../../../../../utils/functions';
import { CARD, CHARTLINE, TABS } from '../../../../../components';

import api from '../../../../../services/api';

export default function GraficoProjecaoRecebimentos({ empresa }) {
   const [duplicataClientesBons, setDuplicataClientesBons] = useState([]);
   const [versaoTransmissao, setVersaoTransmissao] = useState(0);
   const [valorRecebidoDia, setValorRecebidoDia] = useState([]);
   const [dataTransmissao, setDataTransmissao] = useState('');
   const [horaTransmissao, setHoraTransmissao] = useState('');
   const [valorPagarDia, setValorPagarDia] = useState([]);
   const [loading, setLoading] = useState(false);
   const [periodo, setPeriodo] = useState(15);
   const [dataDia, setDataDia] = useState([]);
   const [reload, setReload] = useState(0);

   const [activeTab, setActiveTab] = useState('15 dias');

   let { meioCobBloq, numeroDup, diasMaxAtraso } = useSelector(state => state.setting.configuracoes);

   // Tratamento para caso não tenha configuração
   if ((meioCobBloq, numeroDup, diasMaxAtraso) === undefined) {
      meioCobBloq = 0;
      numeroDup = 0;
      diasMaxAtraso = 0;
   }

   async function handleSubmit() {
      // Recarrega as informações dos dados do grafico
      setLoading(true);
      await api
         .get(`graficoprojecaorecebimentos/recarregar`, {
            params: { meioCobBloq, numeroDup, diasMaxAtraso, periodo },
         })
         .then(() => {
            setLoading(false);
            setReload(reload + 1);
         });
   }

   // Inicializa a consulta para gravar os dados na tabela temporária
   useEffect(() => {
      // Requisição dos dados do gráfico
      setLoading(true);
      async function graficoProjecaoRecebimentos() {
         await api
            .get(`graficoprojecaorecebimentos`, {
               params: { empresa, periodo },
            })
            .then(response => {
               setValorPagarDia(
                  response.data?.map(duplicata => duplicata.duplicataPagarDia + duplicata.chequePagarDia)
               );
               setDataDia(response.data?.map(duplicata => formatDate(duplicata.data)));
               setDuplicataClientesBons(response.data?.map(duplicata => duplicata.duplicataClientesBons));
               setValorRecebidoDia(response.data?.map(duplicata => duplicata.valorRecebidoDia));
               setDataTransmissao(formatDate(response.data[0]?.dataTransmissao));
               setHoraTransmissao(formatTime(response.data[0]?.horaTransmissao));
               setVersaoTransmissao(response.data[0]?.versaoTransmissao);
               setLoading(false);
            });
      }

      graficoProjecaoRecebimentos();
      // Sempre que mudar a versao das informações do gráfico, será reiniiciado a função
   }, [periodo, reload]);

   // Montando gráfico
   const dataChart = {
      labels: dataDia,
      datasets: [
         {
            label: 'Projeção de recebimentos',
            backgroundColor: 'rgba(94, 114, 228, 0.4)',
            data: duplicataClientesBons,
            borderColor: '#5e72e4',
         },
         {
            label: 'A pagar',
            backgroundColor: 'rgba(245, 54, 92, 0.4)',
            data: valorPagarDia,
            borderColor: '#f5365c',
         },
         {
            label: 'Recebido',
            backgroundColor: 'rgba(45,206, 137, 0.4)',
            data: valorRecebidoDia,
            borderColor: '#2dce89',
         },
      ],
   };

   async function handleDate(type) {
      if (type === '15 dias') {
         if (activeTab !== '15 dias') {
            await setActiveTab(type);
            await setPeriodo(15);
         }
      } else if (type === '30 dias') {
         if (activeTab !== '30 dias') {
            await setActiveTab(type);
            await setPeriodo(30);
         }
      }
   }

   return (
      <CARD
         title="Projeção de recebimentos"
         subTitle={`${currentDate('minusDays', periodo)} ${
            currentDate('plusDays', periodo) !== currentDate('minusDays', periodo)
               ? ` - ${currentDate('plusDays', periodo)}`
               : ''
         }`}
         lastBackgroundStreaming={versaoTransmissao > 0 && `${dataTransmissao} ${horaTransmissao}`}
         submit={handleSubmit}
         backgroundStreaming
         typeLoading="chart"
         loading={loading}
         noFooter
      >
         <TABS tabAttributes={['15 dias', '30 dias']} submit={handleDate} activeTab={activeTab} show />
         <CHARTLINE data={dataChart} />
      </CARD>
   );
}

GraficoProjecaoRecebimentos.propTypes = {
   empresa: PropTypes.string.isRequired,
};
