import React from 'react';
import PropTypes from 'prop-types';

import { CONTAINER, SPAN } from './styles';

export default function Tooltip({ title, className, children }) {
   return (
      <CONTAINER className={className}>
         {children}
         <SPAN>{title}</SPAN>
      </CONTAINER>
   );
}

Tooltip.propTypes = {
   title: PropTypes.string.isRequired,
   className: PropTypes.string.isRequired,
   children: PropTypes.element.isRequired,
};
