import React from 'react';
import PropTypes from 'prop-types';

import { CONTAINER } from './styles';

export default function AuthLayout({ children }) {
   return <CONTAINER>{children}</CONTAINER>;
}

AuthLayout.propTypes = {
   children: PropTypes.element.isRequired,
};
