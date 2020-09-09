/* eslint-disable  react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import MdDeleteForever from '@meronex/icons/md/MdDeleteForever';
import MdModeEdit from '@meronex/icons/md/MdModeEdit';

import auth from '../../../../services/auth';

import SCROLLHORIZONTAL from '../../../../components/Scroll/ScrollHorizontal';
import { CARD } from '../../../../components';

import { formatDate } from '../../../../utils/functions';

import {
   CARDBUTTON,
   CONTAINER,
   COL,
   CARDTABLE,
   CARDTHCENTER,
   CARDTDCENTER,
   CARDTH,
   CARDTD,
   CARDTR,
   CARDTHEAD,
   CARDTBODY,
   DIV,
   ROW,
   SPAN,
} from './styles';

export default function Notificacoes() {
   const [notificacoes, setNotificacoes] = useState([]);
   const [totalRegistros, setTotalRegistros] = useState([]);
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState(1);
   const [size] = useState(5);

   async function comercialNotificacoes() {
      setLoading(true);
      await auth
         .get('/notificacao', {
            params: { page, size },
         })
         .then(response => {
            setNotificacoes(response.data);
            setTotalRegistros(response.headers['x-record-count']);
            setLoading(false);
         });
   }

   useEffect(() => {
      comercialNotificacoes();
   }, [page, size]);

   // Paginação
   function handlePage(pageValue) {
      setPage(pageValue);
   }

   async function deletarNotificacao(idNotificacao) {
      await auth
         .delete(`notificacao/${idNotificacao}`)
         .then(() => {
            toast.success('Notificação deletada com sucesso!');
            // Refresh
            comercialNotificacoes();
         })
         .catch(() => {
            toast.error('Não foi possível excluir a notificação!');
         });
   }

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CARD
                  title="Notificações cadastradas"
                  pagination
                  page={page}
                  totalRecords={totalRegistros}
                  size={size}
                  handlePage={handlePage}
                  link
                  linkRoute="/novanotificacao"
                  linkTitle="Cadastrar"
                  nopadding
                  loading={loading}
               >
                  {notificacoes ? (
                     <SCROLLHORIZONTAL>
                        <CARDTABLE>
                           <CARDTHEAD>
                              <CARDTR>
                                 <CARDTH scope="col">Data</CARDTH>
                                 <CARDTH scope="col">Segmento</CARDTH>
                                 <CARDTH scope="col">Título</CARDTH>
                                 <CARDTH scope="col">Conteúdo</CARDTH>
                                 <CARDTHCENTER scope="col">Opções</CARDTHCENTER>
                              </CARDTR>
                           </CARDTHEAD>
                           <CARDTBODY>
                              {notificacoes?.map(notificacao => (
                                 <CARDTR key={notificacao.idNotificacao}>
                                    <CARDTD>{formatDate(notificacao.dtCriado)}</CARDTD>
                                    <CARDTD>{notificacao.segmento}</CARDTD>
                                    <CARDTD>{notificacao.titulo}</CARDTD>
                                    <CARDTD>{notificacao.conteudo}</CARDTD>
                                    <CARDTDCENTER className="td-actions text-center">
                                       <Link
                                          to={{
                                             pathname: '/editarnotificacao',
                                             state: {
                                                idNotificacao: notificacao.idNotificacao,
                                             },
                                          }}
                                       >
                                          <CARDBUTTON background="#5e72e4" color="#fff" type="button">
                                             <MdModeEdit size={20} />
                                          </CARDBUTTON>
                                       </Link>
                                       <CARDBUTTON
                                          background="#f5365c"
                                          color="#fff"
                                          type="button"
                                          onClick={() => deletarNotificacao(notificacao.idNotificacao)}
                                       >
                                          <MdDeleteForever size={20} />
                                       </CARDBUTTON>
                                    </CARDTDCENTER>
                                 </CARDTR>
                              ))}
                           </CARDTBODY>
                        </CARDTABLE>
                     </SCROLLHORIZONTAL>
                  ) : (
                     <DIV>
                        <SPAN> Sem registros de notificações! </SPAN>
                     </DIV>
                  )}
               </CARD>
            </COL>
         </ROW>
      </CONTAINER>
   );
}
