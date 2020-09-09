/* eslint-disable  react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import MdDeleteForever from '@meronex/icons/md/MdDeleteForever';
import MdModeEdit from '@meronex/icons/md/MdModeEdit';
import MdCheckBox from '@meronex/icons/md/MdCheckBox';
import MdCheckBoxOutlineBlank from '@meronex/icons/md/MdCheckBoxOutlineBlank';

import api from '../../../../services/api';

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

export default function ContasBancarias() {
   const [contaBancaria, setContaBancaria] = useState([]);
   const { limiteCtb } = useSelector(state => state.setting);
   const [loading, setLoading] = useState(false);

   // Requisição para pegar as contas bancarias
   async function contasBancarias() {
      setLoading(true);
      await api
         .get('/contasbancarias', {
            params: { limiteCtb },
         })
         .then(response => {
            setContaBancaria(response.data);
            setLoading(false);
         });
   }

   useEffect(() => {
      contasBancarias();
   }, [limiteCtb]);

   // Função para deletar conta bancaria
   async function deletarContaBancaria(idConta) {
      await api
         .delete(`/contasbancarias/${idConta}`)
         .then(() => {
            toast.success('Conta bancária deletada com sucesso!');
            contasBancarias();
         })
         .catch(() => {
            toast.error('Não foi possível excluir a conta bancária!');
         });
   }

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CARD
                  title="Contas bancárias"
                  linkRoute="/novacontabancaria"
                  linkTitle="Nova conta"
                  typeLoading="table"
                  loading={loading}
                  noPadding
                  link
               >
                  {contaBancaria && contaBancaria.length > 0 ? (
                     <SCROLLHORIZONTAL>
                        <CARDTABLE>
                           <CARDTHEAD>
                              <CARDTR>
                                 <CARDTH scope="col">Nome</CARDTH>
                                 <CARDTH scope="col">Conta</CARDTH>
                                 <CARDTH scope="col">Cor</CARDTH>
                                 <CARDTH scope="col">Vínculo Solution</CARDTH>
                                 <CARDTHCENTER scope="col">Saldo Individual</CARDTHCENTER>
                                 <CARDTHCENTER scope="col">Saldo Acumulado</CARDTHCENTER>
                                 <CARDTHCENTER scope="col">Opções</CARDTHCENTER>
                              </CARDTR>
                           </CARDTHEAD>
                           <CARDTBODY>
                              {contaBancaria?.map(conta => (
                                 <CARDTR key={conta.idConta}>
                                    <CARDTD>{conta.nome}</CARDTD>
                                    <CARDTD>{conta.conta ? conta.conta : 'NÃO INFORMADO'}</CARDTD>
                                    <CARDTD>
                                       <CARDCOLOR background={`#${conta.cor}`} />
                                    </CARDTD>
                                    <CARDTD>{conta.nomeConta ? conta.nomeConta : 'NÃO INFORMADO'}</CARDTD>
                                    <CARDTDCENTER>
                                       {conta.stsSaldoInd ? (
                                          <MdCheckBox size={24} />
                                       ) : (
                                          <MdCheckBoxOutlineBlank size={24} />
                                       )}
                                    </CARDTDCENTER>
                                    <CARDTDCENTER>
                                       {conta.stsSaldoAcu ? (
                                          <MdCheckBox size={24} />
                                       ) : (
                                          <MdCheckBoxOutlineBlank size={24} />
                                       )}
                                    </CARDTDCENTER>
                                    <CARDTDCENTER className="text-center">
                                       <Link
                                          to={{
                                             pathname: '/editarcontabancaria',
                                             state: {
                                                idConta: conta.idConta,
                                             },
                                          }}
                                       >
                                          <MdModeEdit size={30} color="#5e72e4" />
                                       </Link>
                                       <MdDeleteForever
                                          size={30}
                                          color="#f5365c"
                                          onClick={() => deletarContaBancaria(conta.idConta)}
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
                        <SPAN> Sem registros de contas bancárias! </SPAN>
                     </DIV>
                  )}
               </CARD>
            </COL>
         </ROW>
      </CONTAINER>
   );
}
