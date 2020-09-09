/* eslint-disable func-names, import/no-extraneous-dependencies, react-hooks/exhaustive-deps, react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import MdNotifications from '@meronex/icons/md/MdNotifications';
import MdChevronLeft from '@meronex/icons/md/MdChevronLeft';
import MdChevronRight from '@meronex/icons/md/MdChevronRight';

import auth from '../../services/auth';

import SCROLLHORIZONTAL from '../../components/Scroll/ScrollHorizontal';

import { formatDate } from '../../utils/functions';

import {
   BUTTON,
   CONTAINER,
   BADGE,
   SCROLL,
   NOTIFICATION,
   NOTIFICATIONLIST,
   DIV,
   SPAN,
   P,
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
   CARDH6,
   CARDPAGINATION,
   CARDPAGINATIONITEM,
   CARDPAGINATIONLINK,
} from './styles';

export default function Notifications() {
   const [visible, setVisible] = useState(false);
   const [hasUnread, setHasUnread] = useState(false);
   const [notificacoes, setNotificacoes] = useState([]);
   const [allNotificacoes, setAllNotificacoes] = useState([]);
   const [qtdNotificacao, setQtdNotificacao] = useState(0);
   const [modalNotificacoes, setModalNotificacoes] = useState(false);
   const [totalRegistros, setTotalRegistros] = useState([]);
   const [page, setPage] = useState(1);
   const [size] = useState(5);

   useEffect(() => {
      async function firstLoadNotifications() {
         const response = await auth.get('notificacao/sempaginacao');

         setNotificacoes(response.data);
         setQtdNotificacao(response.data.length);
         setHasUnread(response.data.length > 0);
      }

      firstLoadNotifications();
   }, []);

   // A cada 1 minuto procura novas notificações
   useEffect(() => {
      async function loadNotifications() {
         setTimeout(async function() {
            const response = await auth.get('notificacao/sempaginacao');

            setNotificacoes(response.data);
            setQtdNotificacao(response.data.length);
            setHasUnread(response.data.length > 0);
         }, 60000);
      }

      loadNotifications();
   }, [notificacoes]);

   async function getAllNotificacoes() {
      await auth
         .get('/notificacao', {
            params: { page, size },
         })
         .then(response => {
            setAllNotificacoes(response.data);
            setTotalRegistros(response.headers['x-record-count']);
         });
   }

   useEffect(() => {
      getAllNotificacoes();
   }, [page, size, modalNotificacoes]);

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
      <CONTAINER>
         <BADGE notifications={qtdNotificacao} onClick={() => setVisible(!visible)} hasUnread={hasUnread}>
            <MdNotifications color="#fff" size={22} />
         </BADGE>

         {visible ? (
            <NOTIFICATIONLIST visible={visible}>
               <SCROLL>
                  <DIV>
                     <P color="#21C7C2">Novidades da semana</P>
                  </DIV>

                  {hasUnread ? (
                     <>
                        {notificacoes.map(notificacao => (
                           <NOTIFICATION key={notificacao.id_notificacao}>
                              <DIV>
                                 <P color="#999" uppercase>
                                    {notificacao.segmento}
                                 </P>
                                 <P color="#999" uppercase>
                                    {formatDate(notificacao.dtCriado)}
                                 </P>
                              </DIV>
                              <P color="#fff">{notificacao.titulo}</P>
                              <P color="#ddd">{notificacao.conteudo} </P>
                           </NOTIFICATION>
                        ))}
                        <BUTTON onClick={() => setModalNotificacoes(!modalNotificacoes)}>Visualizar mais!</BUTTON>
                     </>
                  ) : (
                     <>
                        <SPAN>Sem notificação semanal.</SPAN>
                        <BUTTON onClick={() => setModalNotificacoes(!modalNotificacoes)}>Visualizar mais!</BUTTON>
                     </>
                  )}
               </SCROLL>
            </NOTIFICATIONLIST>
         ) : null}
         <MODAL isOpen={modalNotificacoes} toggle={() => setModalNotificacoes(!modalNotificacoes)} size="lg">
            <MODALHEADER toggle={() => setModalNotificacoes(!modalNotificacoes)}>
               <MODALTEXT>Notificações gerais</MODALTEXT>
            </MODALHEADER>
            <MODALBODY nopadding>
               {allNotificacoes ? (
                  <SCROLLHORIZONTAL>
                     <MODALTABLE>
                        <THEAD>
                           <TR>
                              <TH scope="col">Data</TH>
                              <TH scope="col">Segmento</TH>
                              <TH scope="col">Titulo</TH>
                              <TH scope="col">Conteúdo</TH>
                           </TR>
                        </THEAD>
                        <TBODY>
                           {allNotificacoes.map(notificacao => (
                              <TR key={notificacao.idNotificacao}>
                                 <TD>{formatDate(notificacao.dtCriado)}</TD>
                                 <TD>{notificacao.segmento}</TD>
                                 <TD>{notificacao.titulo}</TD>
                                 <TD>
                                    <P color="#626262">{notificacao.conteudo}</P>
                                 </TD>
                              </TR>
                           ))}
                        </TBODY>
                     </MODALTABLE>
                  </SCROLLHORIZONTAL>
               ) : (
                  <SPAN className="mt-5 ml-5">Sem nenhuma notificação no sistema.</SPAN>
               )}
            </MODALBODY>
            <MODALFOOTER>
               <CARDH6>Página: {page}</CARDH6>
               <CARDPAGINATION>
                  <CARDPAGINATIONITEM>
                     <CARDPAGINATIONLINK onClick={() => handlePage('previousPage')}>
                        <MdChevronLeft color="#32325d" size={30} />
                     </CARDPAGINATIONLINK>
                  </CARDPAGINATIONITEM>
                  <CARDPAGINATIONITEM>
                     <CARDPAGINATIONLINK onClick={() => handlePage('nextPage')}>
                        <MdChevronRight color="#32325d" size={30} />
                     </CARDPAGINATIONLINK>
                  </CARDPAGINATIONITEM>
               </CARDPAGINATION>
            </MODALFOOTER>
         </MODAL>
      </CONTAINER>
   );
}
