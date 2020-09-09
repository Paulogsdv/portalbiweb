import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FINANCEIRO } from '../..';

import { NAV, NAVITEM, NAVLINK, TABCONTENT, TABPANE } from './styles';

export default function Dashboard({ configuracoes, menu }) {
   const [activeTab, setActiveTab] = useState('1');

   const toggle = tab => {
      if (activeTab !== tab) setActiveTab(tab);
   };

   return (
      <>
         <NAV tabs>
            <NAVITEM>
               <NAVLINK
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {
                     toggle('1');
                  }}
               >
                  Financeiro
               </NAVLINK>
            </NAVITEM>
         </NAV>
         <TABCONTENT activeTab={activeTab}>
            <TABPANE tabId="1">
               <FINANCEIRO configuracoes={configuracoes} menu={menu} />
            </TABPANE>
         </TABCONTENT>
      </>
   );
}

Dashboard.propTypes = {
   configuracoes: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
   menu: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
