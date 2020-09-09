/* eslint-disable prefer-const, no-shadow */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MdArrowBack from '@meronex/icons/md/MdArrowBack';
import MdTitle from '@meronex/icons/md/MdTitle';
import MdViewModule from '@meronex/icons/md/MdViewModule';
import MdSubject from '@meronex/icons/md/MdSubject';

import schema from '../../../../validations/form/Notificacoes';

import auth from '../../../../services/auth';

import { CARD, FORM, INPUT } from '../../../../components';

import { CENTER, BUTTON, CARDBUTTON, CONTENT, CONTAINER, COL, ROW, SPAN } from './styles';

export default function EditarNotificacao({ history, location }) {
   const [loading, setLoading] = useState(false);
   const [notificacoes, setNotificacoes] = useState({});

   const { idNotificacao } = location.state;

   useEffect(() => {
      async function getNotificacao() {
         setLoading(true);
         await auth.get(`notificacao/${idNotificacao}`).then(response => {
            setNotificacoes(response.data);
            setLoading(false);
         });
      }

      getNotificacao();
   }, [idNotificacao]);

   async function handleSubmit(data) {
      await auth
         .put('/notificacao', data)
         .then(() => {
            toast.success('Notificação editada com sucesso!');
            history.push('/notificacoes');
         })
         .catch(() => {
            toast.error('Não foi possível editar a notificação!');
         });
   }

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CONTENT>
                  <Link to="/notificacoes">
                     <BUTTON color="#fff" type="button">
                        <MdArrowBack size={18} />
                     </BUTTON>
                  </Link>
               </CONTENT>
               <CARD title="Editar notificação" loading={loading}>
                  <FORM schema={schema} submit={handleSubmit} initialData={notificacoes}>
                     <INPUT name="idNotificacao" hidden />
                     <INPUT name="idUsuario" hidden />
                     <INPUT name="dtCriado" defaultValue={new Date().toISOString().slice(0, 10)} hidden />
                     <ROW>
                        <COL xl="6">
                           <SPAN>Segmento</SPAN>
                           <INPUT icon={<MdViewModule />} placeholder="Segmento" name="segmento" />
                        </COL>
                        <COL xl="6">
                           <SPAN>Titulo</SPAN>
                           <INPUT icon={<MdTitle />} placeholder="Título" name="titulo" />
                        </COL>
                     </ROW>
                     <ROW>
                        <COL xl="12">
                           <SPAN>Conteúdo</SPAN>
                           <INPUT icon={<MdSubject />} placeholder="Conteúdo" name="conteudo" />
                        </COL>
                     </ROW>
                     <CENTER>
                        <CARDBUTTON color="#fff" type="submit">
                           SALVAR
                        </CARDBUTTON>
                     </CENTER>
                  </FORM>
               </CARD>
            </COL>
         </ROW>
      </CONTAINER>
   );
}

EditarNotificacao.propTypes = {
   history: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
   location: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
