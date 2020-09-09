/* eslint-disable no-unused-expressions, no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { TABS } from '../../../components';
import { COL, CONTAINER, ROW, TABCONTENT, TABPANE } from './styles';
import { FINANCEIRO, VENDAS } from '..';

export default function Dashboard() {
   const { menu } = useSelector(state => state.setting);
   const { empresaPadrao, search } = useSelector(state => state.setting);
   const empresa = search?.empresaSearch || empresaPadrao;

   const [activeTab, setActiveTab] = useState(
      menu?.financeiro?.ativo === 1 ? 'Financeiro' : menu?.vendas?.ativo === 1 ? 'Vendas' : null
   );

   async function handleSubmit(type) {
      if (type === 'Financeiro') {
         if (activeTab !== type) await setActiveTab(type);
      } else if (type === 'Vendas') {
         if (activeTab !== type) await setActiveTab(type);
      }
   }

   function handleMenu() {
      const gerarMenu = [];

      menu?.financeiro?.ativo === 1 && gerarMenu.push('Financeiro');
      menu?.vendas?.ativo === 1 && gerarMenu.push('Vendas');

      return gerarMenu;
   }

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <TABS tabAttributes={handleMenu()} submit={handleSubmit} activeTab={activeTab} margin show />
               <TABCONTENT activeTab={activeTab}>
                  <TABPANE tabId="Financeiro">
                     <FINANCEIRO empresa={empresa} menu={menu} />
                  </TABPANE>
                  <TABPANE tabId="Vendas">
                     <VENDAS empresa={empresa} menu={menu} />
                  </TABPANE>
               </TABCONTENT>
            </COL>
         </ROW>
      </CONTAINER>
   );
}
