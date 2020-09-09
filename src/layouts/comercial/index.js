import React from 'react';
import PropTypes from 'prop-types';

import { FOOTER, NAVBAR } from '../../containers';

import { CONTENT, CONTAINER } from './styles';

export default function ComercialLayout({ children }) {
   return (
      <CONTENT className="main-content">
         <NAVBAR />
         {children}
         <CONTAINER fluid>
            <FOOTER />
         </CONTAINER>
      </CONTENT>
   );
}

ComercialLayout.propTypes = {
   children: PropTypes.element.isRequired,
};
