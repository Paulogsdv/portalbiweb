/* eslint-disable no-shadow , react-hooks/exhaustive-deps, no-nested-ternary */
import React, { useState, useEffect } from 'react';
import MdFileDownload from '@meronex/icons/md/MdFileDownload';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { CARDBUTTON, CONTAINER, COL, ROW, MODAL, MODALBODY, MODALFOOTER, MODALHEADER, MODALTEXT } from './styles';
import { currentDate, formatReverseDate, formatDate, formatValue, maskDate } from '../../../utils/functions';
import { CALENDAR, CARD } from '../../../components';

import api from '../../../services/api';

export default function ResumoContas() {
   const [contas, setContas] = useState([]);
   const [contaSelecionada, setContaSelecionada] = useState({});
   const [dataDefault] = useState({
      dataInicial: maskDate(new Date(currentDate('minusYear', 1, 'reverseYear'))),
      dataFinal: maskDate(new Date(currentDate('plusYear', 1, 'reverseYear'))),
   });
   let { desabilitarContas } = useSelector(state => state.setting.configuracoes);
   const [modalExtrato, setModalExtrato] = useState(false);
   const [loading, setLoading] = useState(false);

   // Tratamento para caso não tenha configuração
   if (desabilitarContas === undefined) {
      desabilitarContas = 0;
   }

   // Requisição para as contas a pagar (resumo dias)
   async function resumoContas() {
      const { dataInicial, dataFinal } = dataDefault;

      setLoading(true);
      await api
         .get(`/resumocontas`, {
            params: { dataInicial, dataFinal },
         })
         .then(response => {
            setContas(
               response.data?.map(conta => ({
                  ...conta,
                  // Campos requiridos do componente
                  // Verifica se tem o campo fantasia, se não tiver, exibe a razão
                  title: `R$ ${formatValue(conta.saldo)} - ${conta.fantasia ? conta.fantasia : conta.razao}`,
                  start: new Date(formatReverseDate(conta.vcto)),
                  // Verifica se a conta já está paga / baixada, se estiver a conta vai na cor cinza.
                  color: Number(conta.stsPgto) === 1 ? '#ccc' : `#${conta.cor}`,
                  allDay: false,
               }))
            );
            setLoading(false);
         });
   }

   useEffect(() => {
      resumoContas();
   }, []);

   // Função para baixar (deixar como pago) conta a pagar
   async function baixarContaPagar(idPag) {
      await api
         .put(`/contaspagar/${idPag}`)
         .then(() => {
            setModalExtrato(false);
            toast.success('Conta a pagar baixada com sucesso!');
            resumoContas();
         })
         .catch(() => {
            toast.error('Não foi possível baixar a conta a pagar!');
         });
   }

   // Quando a data é clicada
   async function handleDateClick(date) {
      await api
         .get(`/resumocontas`, {
            params: { dataInicial: maskDate(date), dataFinal: maskDate(date) },
         })
         .then(response => {
            // Procedure retorna no ultimo registro o saldo total
            toast.info(
               `Data ${maskDate(date)} - Total R$ ${formatValue(Number(response.data[response.data.length - 1].saldo))}`
            );
         });
   }

   // Quando o evento clicado
   function handleEventClick(event) {
      setContaSelecionada(event);
      setModalExtrato(true);
   }

   return (
      <CONTAINER fluid>
         {loading ? (
            <CARD loading={loading} typeLoading="calendar" />
         ) : (
            <CALENDAR
               // Se a configuração estiver desmarcada, pega somente as contas que não foram baixadas
               data={Number(desabilitarContas) === 0 ? contas.filter(conta => conta.stsPgto === 0) : contas}
               submitDate={handleDateClick}
               submitEvent={handleEventClick}
            />
         )}
         <MODAL isOpen={modalExtrato} toggle={() => setModalExtrato(modalExtrato => !modalExtrato)} size="md">
            <MODALHEADER toggle={() => setModalExtrato(modalExtrato => !modalExtrato)}>
               <MODALTEXT fontweight>
                  {contaSelecionada.tipo} -{' '}
                  {contaSelecionada.fantasia ? contaSelecionada.fantasia : contaSelecionada.razao}
               </MODALTEXT>
            </MODALHEADER>
            <MODALBODY>
               <ROW padding>
                  <COL>
                     <MODALTEXT fontweight>Data:</MODALTEXT>
                  </COL>
                  <COL>
                     <MODALTEXT>{formatDate(contaSelecionada.vcto)}</MODALTEXT>
                  </COL>
               </ROW>
               {contaSelecionada.conta ? (
                  <ROW bordertop padding>
                     <COL>
                        <MODALTEXT fontweight>Conta:</MODALTEXT>
                     </COL>
                     <COL>
                        <MODALTEXT>{contaSelecionada.conta}</MODALTEXT>
                     </COL>
                  </ROW>
               ) : null}
               {contaSelecionada.fantasia ? (
                  <ROW bordertop padding>
                     <COL>
                        <MODALTEXT fontweight>Fantasia:</MODALTEXT>
                     </COL>
                     <COL>
                        <MODALTEXT>{contaSelecionada.fantasia}</MODALTEXT>
                     </COL>
                  </ROW>
               ) : null}
               <ROW bordertop padding>
                  <COL>
                     <MODALTEXT fontweight>Razão:</MODALTEXT>
                  </COL>
                  <COL>
                     <MODALTEXT>{contaSelecionada.razao}</MODALTEXT>
                  </COL>
               </ROW>
               {contaSelecionada.tipo === 'PBI' ? (
                  <ROW bordertop padding>
                     <COL>
                        <MODALTEXT fontweight>Situação:</MODALTEXT>
                     </COL>
                     <COL>
                        <MODALTEXT>{contaSelecionada.stsPgto === 1 ? 'Pago' : 'Pendente'}</MODALTEXT>
                     </COL>
                  </ROW>
               ) : null}
               {contaSelecionada.numero ? (
                  <ROW bordertop padding>
                     <COL>
                        <MODALTEXT fontweight>Número:</MODALTEXT>
                     </COL>
                     <COL>
                        <MODALTEXT>{contaSelecionada.numero}</MODALTEXT>
                     </COL>
                  </ROW>
               ) : null}
               <ROW bordertop padding>
                  <COL>
                     <MODALTEXT fontweight>Valor:</MODALTEXT>
                  </COL>
                  <COL>
                     <MODALTEXT>{formatValue(Number(contaSelecionada.saldo))}</MODALTEXT>
                  </COL>
               </ROW>
               {contaSelecionada.observacao ? (
                  <ROW bordertop padding>
                     <COL>
                        <MODALTEXT fontweight>Observação:</MODALTEXT>
                     </COL>
                     <COL>
                        <MODALTEXT>{contaSelecionada.observacao}</MODALTEXT>
                     </COL>
                  </ROW>
               ) : null}
            </MODALBODY>
            <MODALFOOTER>
               {contaSelecionada.tipo === 'PBI' && contaSelecionada.stsPgto !== 1 ? (
                  <CARDBUTTON
                     background="#2dce89"
                     color="#fff"
                     type="button"
                     onClick={() => baixarContaPagar(contaSelecionada.idPag)}
                  >
                     Baixar
                     <MdFileDownload size={15} color="#fff" />
                  </CARDBUTTON>
               ) : null}
               <CARDBUTTON background="#f5365c" color="#fff" type="button" onClick={() => setModalExtrato(false)}>
                  Fechar
               </CARDBUTTON>
            </MODALFOOTER>
         </MODAL>
      </CONTAINER>
   );
}
