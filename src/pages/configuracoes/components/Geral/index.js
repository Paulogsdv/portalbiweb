import React from 'react';
import { useSelector } from 'react-redux';
import MdBusiness from '@meronex/icons/md/MdBusiness';
import MdDns from '@meronex/icons/md/MdDns';

import { formatStringInArray } from '../../../../utils/functions';

import { INPUT, INPUTSELECT } from '../../../../components';

import { COL, ROW, SPAN } from './styles';

export default function Geral() {
   const { url, empresaPadrao, empresaLiberada } = useSelector(state => state.setting);

   return (
      <>
         <ROW>
            <COL xl="8">
               <SPAN>{`Empresa padrão: ${empresaPadrao}`}</SPAN>
               <INPUTSELECT
                  autoFocus
                  name="empresaPadrao"
                  placeholder={empresaPadrao ? null : 'Empresa padrão'}
                  options={formatStringInArray(empresaLiberada, ',').map(empresa => ({
                     value: empresa,
                     label: empresa,
                  }))}
                  icon={<MdBusiness />}
                  isMulti
               />
            </COL>
         </ROW>
         <ROW>
            <COL xl="8">
               <INPUT
                  icon={<MdDns />}
                  placeholder="Url do servidor"
                  name="url"
                  type="text"
                  readOnly
                  defaultValue={url}
               />
            </COL>
         </ROW>
      </>
   );
}
