/* eslint-disable import/extensions, no-shadow */
import React from 'react';
import { useClearCache } from 'react-clear-cache';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// Redux, rotas
import { store, persistor } from './hooks';
import Routes from './routes';
import history from './services/history';

// Themes e styles
import './assets/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

// Clean cache
import './assets/js/clear';

// Google Analytics
import './assets/js/analytics';

// JQuery
import './assets/js/scrollToTop';

function App() {
   const { isLatestVersion, emptyCacheStorage } = useClearCache();
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <Router history={history}>
               {/* Auxilia na limpeza do cache */}
               {!isLatestVersion && emptyCacheStorage()}
               {/* Rotas */}
               <Routes />
               {/* Alertas */}
               <ToastContainer autoClose={5000} />
            </Router>
         </PersistGate>
      </Provider>
   );
}

export default App;
