import React from 'react';
import PropTypes from 'prop-types';

import { FOOTER, NAVBAR } from '../../containers';

import { CONTENT, CONTAINER } from './styles';

export default function AdminLayout({ children }) {
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

AdminLayout.propTypes = {
   children: PropTypes.element.isRequired,
};
