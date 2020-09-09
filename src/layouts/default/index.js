/* eslint-disable func-names, jsx-a11y/mouse-events-have-key-events, react/jsx-no-duplicate-props, react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MdArrowRoundUp from '@meronex/icons/ios/MdArrowRoundUp';
import PropTypes from 'prop-types';

import { userSession } from '../../hooks/modules/user/actions';
import { logoutInRequest } from '../../hooks/modules/auth/actions';
import { store } from '../../hooks';

import { CHATBOT, FOOTER, NAVBAR, SUBNAVBAR } from '../../containers';

import menu from '../../assets/json/Chatbot/menu.json';

import { USERCONTROL, CONTENT, CONTAINER, SCROLLTOTOP } from './styles';

export default function DefaultLayout({ children }) {
   const dispatch = useDispatch();
   const [verifySessionUser, setVerifySessionUser] = useState(true);
   const { profile } = useSelector(state => state.user);
   const { subNavbar } = useSelector(state => state.setting);

   // A cada minuto verifica se o usuário está a mais de 30 minutos inativo
   // Se estiver inativo é realizado o logout do sistema
   useEffect(() => {
      async function verifyUserActive() {
         setTimeout(function() {
            const { session } = store.getState().user;

            if (Math.abs(session - new Date().getMinutes()) >= 30) {
               dispatch(logoutInRequest());
            }
            setVerifySessionUser(!verifySessionUser);
         }, 60000);
      }

      verifyUserActive();
   }, [verifySessionUser]);

   // Verifica se o usuario está ativo
   function userActive() {
      // onClick	O evento ocorre quando o usuário clica em um elemento
      // onContextMenu	O evento ocorre quando o usuário clica com o direito em um elemento para abrir um menu de contexto
      // onDoubleClick	O evento ocorre quando o usuário clica duas vezes em um elemento
      // onMouseDown	O evento ocorre quando o usuário pressiona um botão do mouse sobre um elemento
      // onMouseEnter O evento ocorre quando o ponteiro é movido para um elemento
      // onMouseLeave O evento ocorre quando o ponteiro é movido para fora de um elemento
      // onMouseMove	O evento ocorre quando o ponteiro se move enquanto está sobre um elemento
      // onMouseOver	O evento ocorre quando o ponteiro é movido para um elemento, ou em um de seus filhos
      // onMouseOut	O evento ocorre quando o usuário move o ponteiro do mouse para fora de um elemento, ou fora de um de seus filhos
      // onMouseUp O evento ocorre quando o usuário solta o botão do mouse sobre um elemento
      // onScroll  O evento ocorre quando o usuário utiliza o scroll do elemento
      dispatch(userSession(new Date().getMinutes()));
   }

   return (
      <USERCONTROL
         onMouseMove={() => userActive()}
         onContextMenu={() => userActive()}
         onDoubleClick={() => userActive()}
         onMouseDown={() => userActive()}
         onMouseEnter={() => userActive()}
         onMouseLeave={() => userActive()}
         onMouseMove={() => userActive()}
         onMouseOver={() => userActive()}
         onMouseOut={() => userActive()}
         onMouseUp={() => userActive()}
         onScroll={() => userActive()}
      >
         <NAVBAR />
         <CONTENT className="main-content">
            {/* Se o usuário clicar para pesquisar é aberto o componente subnavbar */}
            {subNavbar ? <SUBNAVBAR /> : null}
            {/* Elementos */}
            {children}
            {/* Scroll to top */}
            <SCROLLTOTOP className="scrollToTop" href="#">
               <MdArrowRoundUp size={20} color="#21c7c2" />
            </SCROLLTOTOP>
            {/* Chatbot */}
            <CHATBOT user={profile && profile?.nome ? profile.nome : 'Usuário'} menu={menu} />
            <CONTAINER fluid>
               <FOOTER />
            </CONTAINER>
         </CONTENT>
      </USERCONTROL>
   );
}

DefaultLayout.propTypes = {
   children: PropTypes.element.isRequired,
};
