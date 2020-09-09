/* eslint-disable no-shadow */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MdSearch from '@meronex/icons/md/MdSearch';

import { settingSearch, handleSearch } from '../../hooks/modules/setting/actions';

import { formatStringInArray } from '../../utils/functions';

import EmpresaSearch from '../../validations/form/EmpresaSearch';

import { INPUTSEARCH } from '../../components';

import { BUTTON, COL, CONTAINER, FORM, NAVBAR, TEXT } from './styles';

export default function SubNavbar() {
   const dispatch = useDispatch();

   const { empresaPadrao, search, empresaLiberada, subNavbar } = useSelector(state => state.setting);
   const empresa = search?.empresaSearch || empresaPadrao;

   function handleSubmit(data) {
      dispatch(settingSearch(data));
      dispatch(handleSearch(!subNavbar));
   }

   return (
      <NAVBAR expand="md" id="navbar-main">
         <CONTAINER fluid>
            <COL>
               <TEXT>{`Empresa(s): ${empresa}`}</TEXT>
            </COL>
            <FORM submit={handleSubmit} schema={EmpresaSearch}>
               <INPUTSEARCH
                  name="empresaSearch"
                  options={formatStringInArray(empresaLiberada, ',').map(emp => ({
                     // Campos requiridos do componente
                     value: emp,
                     label: emp,
                  }))}
                  isMulti
               />
               <BUTTON type="submit">
                  <MdSearch color="#fff" size={20} />
               </BUTTON>
            </FORM>
         </CONTAINER>
      </NAVBAR>
   );
}
