import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import MdDeleteForever from '@meronex/icons/md/MdDeleteForever';
import MdModeEdit from '@meronex/icons/md/MdModeEdit';

import auth from '../../../../services/auth';

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
   DIV,
   ROW,
   SPAN,
} from './styles';

export default function Usuarios() {
   const { idClientePre } = useSelector(state => state.setting);
   const { profile } = useSelector(state => state.user);

   const [usuarios, setUsuarios] = useState([]);
   const [totalRegistros, setTotalRegistros] = useState([]);

   const [loading, setLoading] = useState(false);

   const [page, setPage] = useState(1);
   const [size] = useState(10);

   async function usuariosAdmin() {
      setLoading(true);
      await auth
         .get(`/usuarioadmin`, {
            params: { idUsuario: profile.idUsuario, idClientePre, page, size },
         })
         .then(response => {
            setUsuarios(response.data);
            setTotalRegistros(response.headers['x-record-count']);
            setLoading(false);
         });
   }

   useEffect(() => {
      usuariosAdmin();
   }, [profile.idUsuario, idClientePre, page, size]);

   // Paginação
   function handlePage(pageValue) {
      setPage(pageValue);
   }

   async function deletarUsuario(idUsuario) {
      await auth
         .delete(`/usuarioadmin/${idUsuario}`)
         .then(() => {
            toast.success('Usuário deletado com sucesso!');
            usuariosAdmin();
         })
         .catch(() => {
            toast.error('Não foi possível excluir o usuário!');
         });
   }

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CARD
                  title="Usuários cadastrados"
                  totalRecords={totalRegistros}
                  linkRoute="/novousuario"
                  handlePage={handlePage}
                  linkTitle="Cadastrar"
                  typeLoading="table"
                  loading={loading}
                  page={page}
                  size={size}
                  pagination
                  nopadding
                  link
               >
                  {usuarios ? (
                     <SCROLLHORIZONTAL>
                        <CARDTABLE>
                           <CARDTHEAD>
                              <CARDTR>
                                 <CARDTH scope="col">ID</CARDTH>
                                 <CARDTH scope="col">Nome</CARDTH>
                                 <CARDTH scope="col">Email</CARDTH>
                                 <CARDTH scope="col">Senha</CARDTH>
                                 <CARDTH scope="col">URL</CARDTH>
                                 <CARDTH scope="col">CNPJ</CARDTH>
                                 <CARDTHCENTER scope="col">Opções</CARDTHCENTER>
                              </CARDTR>
                           </CARDTHEAD>
                           <CARDTBODY>
                              {usuarios?.map(usuario => (
                                 <CARDTR key={usuario.idUsuario}>
                                    <CARDTD>{usuario.idUsuario}</CARDTD>
                                    <CARDTD>{usuario.nome}</CARDTD>
                                    <CARDTD>{usuario.email}</CARDTD>
                                    <CARDTD>{usuario.senha}</CARDTD>
                                    <CARDTD>{usuario.url}</CARDTD>
                                    <CARDTD>{usuario.cnpj}</CARDTD>
                                    <CARDTDCENTER className="text-center">
                                       <Link
                                          to={{
                                             pathname: '/editarusuario',
                                             state: {
                                                idUsuario: usuario.idUsuario,
                                             },
                                          }}
                                       >
                                          <MdModeEdit color="#5e72e4" size={24} />
                                       </Link>
                                       <MdDeleteForever
                                          color="#f5365c"
                                          size={24}
                                          onClick={() => deletarUsuario(usuario.idUsuario)}
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
                        <SPAN> Sem registros de usuários! </SPAN>
                     </DIV>
                  )}
               </CARD>
            </COL>
         </ROW>
      </CONTAINER>
   );
}
