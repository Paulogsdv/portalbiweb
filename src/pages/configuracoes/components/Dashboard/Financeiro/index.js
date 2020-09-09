import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { GRAFICOINADIMPLENCIA, GRAFICOPROJECAORECEBIMENTOS } from '../../..';

import { NAV, NAVITEM, NAVLINK, TABCONTENT, TABPANE } from '../styles';

export default function Financeiro({ configuracoes, menu }) {
   const [activeTab, setActiveTab] = useState('1');

   const toggle = tab => {
      if (activeTab !== tab) setActiveTab(tab);
   };

   return (
      <>
         <NAV tabs>
            {menu?.financeiro?.graficoInadimplencias === 1 ? (
               <NAVITEM>
                  <NAVLINK
                     className={classnames({ active: activeTab === '1' })}
                     onClick={() => {
                        toggle('1');
                     }}
                  >
                     Gráfico de Inadimplência
                  </NAVLINK>
               </NAVITEM>
            ) : null}
            {menu?.financeiro?.graficoProjecaoRecebimentos === 1 ? (
               <NAVITEM>
                  <NAVLINK
                     className={classnames({ active: activeTab === '2' })}
                     onClick={() => {
                        toggle('2');
                     }}
                  >
                     Gráfico de Projeção de Recebimentos
                  </NAVLINK>
               </NAVITEM>
            ) : null}
         </NAV>
         <TABCONTENT activeTab={activeTab}>
            {menu?.financeiro?.graficoInadimplencias === 1 ? (
               <TABPANE tabId="1">
                  <GRAFICOINADIMPLENCIA configuracoes={configuracoes} menu={menu} />
               </TABPANE>
            ) : null}
            {menu?.financeiro?.graficoProjecaoRecebimentos === 1 ? (
               <TABPANE tabId="2">
                  <GRAFICOPROJECAORECEBIMENTOS configuracoes={configuracoes} menu={menu} />
               </TABPANE>
            ) : null}
         </TABCONTENT>
      </>
   );
}

Financeiro.propTypes = {
   configuracoes: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
   menu: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
