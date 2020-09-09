/* eslint-disable no-unused-expressions, no-lone-blocks */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { NAV, NAVITEM, NAVLINK } from './styles';

export default function Tabs({ tabAttributes, submit, activeTab, margin, show }) {
   function handleSubmit(type) {
      submit(type);
   }

   return (
      <NAV margin={margin} tabs>
         {tabAttributes?.map(
            (tab, index) =>
               show && (
                  <NAVITEM>
                     <NAVLINK
                        className={classnames({ active: activeTab === index + 1 || activeTab === tab })}
                        onClick={() => {
                           handleSubmit(tab);
                        }}
                     >
                        {tab}
                     </NAVLINK>
                  </NAVITEM>
               )
         )}
      </NAV>
   );
}

Tabs.propTypes = {
   tabAttributes: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
   submit: PropTypes.func.isRequired,
   activeTab: PropTypes.number.isRequired,
   show: PropTypes.bool.isRequired,
   margin: PropTypes.bool,
};

Tabs.defaultProps = {
   margin: false,
};
