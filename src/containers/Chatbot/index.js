/* eslint-disable react/button-has-type, no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import EnChat from '@meronex/icons/en/EnChat';

import logoUser from '../../assets/images/user.png';
import logoRobot from '../../assets/images/robot.gif';

export default function Chatbot({ user, menu }) {
   const [step] = useState([
      /* Apresentação do robô */
      {
         id: '1',
         message: `Olá ${user}, eu sou o PBI, estou aqui exclusivamente para auxiliar você!`,
         trigger: '2',
      },
      /* Menu das opções dinâmicas */
      ...menu,
      /* Faixa separada para o comercial */
      {
         id: '501',
         component: (
            <a
               href="https://api.whatsapp.com/send?phone=554699109037&text=Ol%C3%A1,%20estou%20interessado(a)%20nos%20seus%20softwares!."
               rel="noreferrer"
               target="_blank"
            >
               Clique aqui para iniciar uma conversa com o setor comercial.
            </a>
         ),
         trigger: '2',
      },
      /* Faixa separada para o suporte */
      {
         id: '502',
         component: (
            <a
               href="https://servidorseguro.mysuite2.com.br/client/login.php?sl=prcs&h=&inf=&lf="
               rel="noreferrer"
               target="_blank"
            >
               Clique aqui para iniciar uma conversa com o suporte.
            </a>
         ),
         trigger: '2',
      },
   ]);

   // Definindo tema
   const theme = {
      background: '#17223F',
      fontFamily: 'Mulish',
      headerBgColor: '#0B1333',
      headerFontColor: '#fff !important',
      headerFontSize: '15px',
      botBubbleColor: '#fff',
      botFontColor: '#4a4a4a',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a',
      footerBgColor: '#0B1333',
      footerFontColor: '#fff !important',
   };

   return (
      <ThemeProvider theme={theme}>
         <ChatBot
            headerTitle="Atendente PBI"
            placeholder="Envie sua mensagem"
            floatingStyle={{ background: '#0B1333', border: '1px solid #21c7c2', right: 10, bottom: 10 }}
            style={{ border: '2px solid #0B1333', right: 10, bottom: 10 }}
            width="35%"
            floatingIcon={<EnChat size={20} color="#21c7c2" />}
            botAvatar={logoRobot}
            userAvatar={logoUser}
            inputStyle={{ background: '#0B1333', color: '#fff' }}
            steps={step}
            // hideSubmitButton
            floating
         />
      </ThemeProvider>
   );
}

Chatbot.propTypes = {
   user: PropTypes.string.isRequired,
   menu: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
