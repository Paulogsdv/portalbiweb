/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MdChevronRight from '@meronex/icons/md/MdChevronRight';
import MdChevronLeft from '@meronex/icons/md/MdChevronLeft';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import schema from '../../../../../validations/form/Date';

import api from '../../../../../services/api';

import { formatDate, formatValue, currentDate, maskDate } from '../../../../../utils/functions';

import { CARD, CHARTLINE } from '../../../../../components';
import SCROLLHORIZONTAL from '../../../../../components/Scroll/ScrollHorizontal';

import {
   TD,
   TH,
   TR,
   THEAD,
   TBODY,
   MODAL,
   MODALHEADER,
   MODALBODY,
   MODALFOOTER,
   MODALTABLE,
   MODALTEXT,
   MODALTOTAL,
   CARDH6,
   CARDPAGINATION,
   CARDPAGINATIONITEM,
   CARDPAGINATIONLINK,
} from './styles';

export default function GraficoSaldoBancario({ empresa }) {
   const [dataDefault] = useState({
      dataInicial: maskDate(new Date(currentDate('minusDays', 15, 'reverseYear'))),
      dataFinal: maskDate(new Date(currentDate('plusDays', 15, 'reverseYear'))),
   });

   const [saldoTotalDuplicatas, setSaldoTotalDuplicatas] = useState({});
   const [saldoPagarAcumulado, setSaldoPagarAcumulado] = useState([]);
   const [totalRegistros, setTotalRegistros] = useState([]);
   const [modalExtrato, setModalExtrato] = useState(false);
   const [saldoPagarDia, setSaldoPagarDia] = useState([]);
   const [dataDuplicata, setDataDuplicata] = useState('');
   const [saldoConta, setSaldoConta] = useState([]);
   const [duplicatas, setDuplicatas] = useState([]);
   const [loading, setLoading] = useState(false);
   const [elemento, setElemento] = useState([]);
   const [dataDia, setDataDia] = useState([]);
   const [page, setPage] = useState(1);
   const [size] = useState(5);

   // Requisição dos dados do grafico
   async function graficoSaldoBancario(data) {
      // Se tiver data como parametro ele repassa
      const { dataInicial, dataFinal } = data || dataDefault;

      setLoading(true);
      await api
         .get(`/graficosaldobancario`, {
            params: { empresa, dataInicial, dataFinal },
         })
         .then(response => {
            setDataDia(response.data?.map(duplicata => formatDate(duplicata.data)));
            setSaldoConta(response.data?.map(duplicata => duplicata.saldoCta));
            setSaldoPagarDia(response.data?.map(duplicata => duplicata.saldoPagarDia));
            setSaldoPagarAcumulado(response.data?.map(duplicata => duplicata.saldoPagarAcumulado));
            setLoading(false);
         });
      return () => {
         setLoading(false);
      };
   }

   useEffect(() => {
      graficoSaldoBancario();
   }, [empresa]);

   // Caso o usuário pesquise por data
   async function handleSubmit(data) {
      await graficoSaldoBancario(data);
   }

   // Montando gráfico
   const dataChart = {
      labels: dataDia,
      datasets: [
         {
            label: 'Saldo contas bancárias (saldo + limite)',
            backgroundColor: 'rgba(45,206, 137, 0.4)',
            data: saldoConta,
            borderColor: '#2dce89',
         },
         {
            label: 'Saldo a pagar do dia',
            backgroundColor: 'rgba(245, 54, 92, 0.4)',
            data: saldoPagarDia,
            borderColor: '#f5365c',
         },
         {
            label: 'Saldo a pagar acumulado',
            backgroundColor: 'rgb(255, 145, 1, 0.4)',
            data: saldoPagarAcumulado,
            borderColor: '#ff9100',
         },
      ],
   };

   // Caso o usuário clique na data no chart
   // Retorna a data e faz uma consulta de duplicatar a pagar
   async function handleElement(element) {
      if (element.length > 0) {
         setElemento(element);
         // Percorre a árvore de atributos do componente e acha o index que foi clicado
         const i = element[0]._index;
         const dataSelecionada = element[0]._chart.tooltip._data.labels;

         setDataDuplicata(dataSelecionada[i]);

         await api
            .get(`duplicatas`, {
               params: {
                  empresa,
                  page,
                  size,
                  // Data inicial e final são iguais
                  dataInicial: dataSelecionada[i],
                  dataFinal: dataSelecionada[i],
               },
            })
            .then(response => {
               if (response.data.length > 0) {
                  setDuplicatas(response.data);
                  setTotalRegistros(response.headers['x-record-count']);
                  setSaldoTotalDuplicatas(response.headers['x-record-sum']);

                  setModalExtrato(true);
               } else {
                  toast.info(`Sem informações de duplicatas para a data ${dataSelecionada[i]}!`);
               }
            });
      }
   }

   useEffect(() => {
      if (elemento) {
         handleElement(elemento);
      }
   }, [page]);

   // Próxima página
   function handlePage(params) {
      if (params === 'nextPage') {
         if (totalRegistros > size * page) {
            setPage(page + 1);
         }
      }

      if (params === 'previousPage') {
         if (page > 1) {
            setPage(page - 1);
         }
      }
   }

   return (
      <CARD
         title="Evolução de saldos bancários"
         subTitle={`${dataDefault.dataInicial} ${
            dataDefault.dataFinal !== dataDefault.dataInicial ? ` - ${dataDefault.dataFinal}` : ''
         }`}
         valueDateInitial={new Date(currentDate('minusDays', 15, 'reverseYear'))}
         valueDateEnd={new Date(currentDate('plusDays', 15, 'reverseYear'))}
         submit={handleSubmit}
         typeLoading="chart"
         loading={loading}
         schema={schema}
         searchDate
         noFooter
      >
         <CHARTLINE data={dataChart} handleElement={handleElement} />
         <MODAL isOpen={modalExtrato} toggle={() => setModalExtrato(!modalExtrato)} size="lg">
            <MODALHEADER toggle={() => setModalExtrato(!modalExtrato)}>
               <MODALTEXT color="#21486B">Período: {dataDuplicata}</MODALTEXT>
            </MODALHEADER>
            <MODALBODY nopadding>
               <SCROLLHORIZONTAL>
                  <MODALTABLE>
                     <THEAD>
                        <TR>
                           <TH scope="col">Fornecedor</TH>
                           <TH scope="col">Par</TH>
                           <TH scope="col">Dupl</TH>
                           <TH scope="col">Nota</TH>
                           <TH scope="col" style={{ textAlign: 'right' }}>
                              Pago
                           </TH>
                           <TH scope="col" style={{ textAlign: 'right' }}>
                              Valor
                           </TH>
                           <TH scope="col" style={{ textAlign: 'right' }}>
                              Saldo
                           </TH>
                        </TR>
                     </THEAD>
                     <TBODY>
                        {duplicatas.map((duplicata, index) => (
                           // eslint-disable-next-line react/no-array-index-key
                           <TR key={index}>
                              <TD>{duplicata.razao}</TD>
                              <TD>{duplicata.parcela}</TD>
                              <TD>{duplicata.dupl}</TD>
                              <TD>{duplicata.nota}</TD>
                              <TD style={{ textAlign: 'right' }}>{formatValue(duplicata.credito)}</TD>
                              <TD style={{ textAlign: 'right' }}>{formatValue(duplicata.valor)}</TD>
                              <TD style={{ textAlign: 'right' }}>{formatValue(duplicata.saldo)}</TD>
                           </TR>
                        ))}
                     </TBODY>
                  </MODALTABLE>
               </SCROLLHORIZONTAL>
               <MODALTOTAL>
                  <MODALTEXT color="#fff">TOTAL:</MODALTEXT>
                  <MODALTEXT color="#fff">{formatValue(saldoTotalDuplicatas)}</MODALTEXT>
               </MODALTOTAL>
            </MODALBODY>
            <MODALFOOTER>
               <CARDH6>Página: {page}</CARDH6>
               <CARDPAGINATION>
                  <CARDPAGINATIONITEM>
                     <CARDPAGINATIONLINK onClick={() => handlePage('previousPage')}>
                        <MdChevronLeft color="#21486B" size={30} />
                     </CARDPAGINATIONLINK>
                  </CARDPAGINATIONITEM>
                  <CARDPAGINATIONITEM>
                     <CARDPAGINATIONLINK onClick={() => handlePage('nextPage')}>
                        <MdChevronRight color="#21486B" size={30} />
                     </CARDPAGINATIONLINK>
                  </CARDPAGINATIONITEM>
               </CARDPAGINATION>
            </MODALFOOTER>
         </MODAL>
      </CARD>
   );
}

GraficoSaldoBancario.propTypes = {
   empresa: PropTypes.string.isRequired,
};
