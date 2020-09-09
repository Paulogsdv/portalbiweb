/* eslint-disable react/jsx-props-no-spreading, no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// Layouts
import { AuthLayout, AdminLayout, DefaultLayout, ComercialLayout } from '../layouts';

export default function RouteWrapper({ component: Component, isPrivate, ...rest }) {
   const { signed } = useSelector(state => state.auth);
   const { adm } = useSelector(state => state.setting);

   if (!signed && isPrivate) {
      return <Redirect to="/" />;
   }

   if (signed && !isPrivate && adm === 2) {
      return <Redirect to="/notificacoes" />;
   }

   if (signed && !isPrivate && adm === 1) {
      return <Redirect to="/usuarios" />;
   }

   if (signed && !isPrivate && adm === 0) {
      return <Redirect to="/dashboard" />;
   }

   // Verifica qual tipo de usuário através do campo adm e redireciona para o respectivo layout
   const Layout =
      signed && adm === 2 // Comercial
         ? ComercialLayout
         : signed && adm === 1 // Super administrador
         ? AdminLayout
         : signed && adm === 0 // Usuário
         ? DefaultLayout
         : AuthLayout; // Login

   return (
      <Route
         {...rest}
         render={props => (
            <Layout>
               <Component {...props} />
            </Layout>
         )}
      />
   );
}

RouteWrapper.propTypes = {
   isPrivate: PropTypes.bool,
   component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteWrapper.defaultProps = {
   isPrivate: false,
};
