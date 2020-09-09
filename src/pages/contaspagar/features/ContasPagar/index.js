/* eslint-disable  react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import MdDeleteForever from '@meronex/icons/md/MdDeleteForever';
import MdModeEdit from '@meronex/icons/md/MdModeEdit';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../../../services/api';

import { maskDate, formatValue } from '../../../../utils/functions';
import SCROLLHORIZONTAL from '../../../../components/Scroll/ScrollHorizontal';
import { CARD } from '../../../../components';

import {
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
   CARDCOLOR,
   DIV,
   ROW,
   SPAN,
} from './styles';

export default function ContasPagar() {
   const [contasPagar, setContasPagar] = useState([]);
   const [loading, setLoading] = useState(false);

   // Requisição para pegar as contas pagar
   async function getContasPagar() {
      setLoading(true);
      await api.get('/contaspagar').then(response => {
         setContasPagar(response.data);
         setLoading(false);
      });
   }

   useEffect(() => {
      getContasPagar();
   }, []);

   // Função para deletar conta a pagar
   async function deletarContaPagar(idPag) {
      await api
         .delete(`/contaspagar/${idPag}`)
         .then(() => {
            toast.success('Conta a pagar deletada com sucesso!');
            // Atualizar
            getContasPagar();
         })
         .catch(() => {
            toast.error('Não foi possível excluir a conta a pagar!');
         });
   }

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CARD
                  title="Contas a pagar avulsas"
                  linkRoute="/novacontapagar"
                  linkTitle="Nova conta"
                  typeLoading="table"
                  loading={loading}
                  noPadding
                  link
               >
                  {contasPagar && contasPagar.length > 0 ? (
                     <SCROLLHORIZONTAL>
                        <CARDTABLE>
                           <CARDTHEAD>
                              <CARDTR>
                                 <CARDTH scope="col">Data</CARDTH>
                                 <CARDTH scope="col">Conta</CARDTH>
                                 <CARDTH scope="col">Cor</CARDTH>
                                 <CARDTH scope="col">Razão</CARDTH>
                                 <CARDTH scope="col">Valor</CARDTH>
                                 <CARDTH scope="col">Situação</CARDTH>
                                 <CARDTHCENTER scope="col">Opções</CARDTHCENTER>
                              </CARDTR>
                           </CARDTHEAD>
                           <CARDTBODY>
                              {contasPagar?.map(conta => (
                                 <CARDTR key={conta.idPag}>
                                    <CARDTD>{maskDate(new Date(conta.dtVcto.toString().replace('-', '/')))}</CARDTD>
                                    <CARDTD>{conta.nomeReduz}</CARDTD>
                                    <CARDTD>
                                       <CARDCOLOR background={`#${conta.cor ? conta.cor : conta.corConta}`} />
                                    </CARDTD>
                                    <CARDTD>{conta.razao}</CARDTD>
                                    <CARDTD>{formatValue(conta.valor)}</CARDTD>
                                    <CARDTD>{conta.stsPgto ? 'PAGO' : 'PENDENTE'}</CARDTD>
                                    <CARDTDCENTER className="td-actions text-center">
                                       <Link
                                          to={{
                                             pathname: '/editarcontapagar',
                                             state: {
                                                idPag: conta.idPag,
                                             },
                                          }}
                                       >
                                          <MdModeEdit color="#5e72e4" size={30} />
                                       </Link>
                                       <MdDeleteForever
                                          color="#f5365c"
                                          size={30}
                                          onClick={() => deletarContaPagar(conta.idPag)}
                                          style={{ cursor: 'pointer' }}
                                          className="ml-3"
                                       />
                                    </CARDTDCENTER>
                                 </CARDTR>
                              ))}
                           </CARDTBODY>
                        </CARDTABLE>
                     </SCROLLHORIZONTAL>
                  ) : (
                     <DIV>
                        <SPAN> Sem registros de contas a pagar avulsas! </SPAN>
                     </DIV>
                  )}
               </CARD>
            </COL>
         </ROW>
      </CONTAINER>
   );
}
