import React from 'react';
import PropTypes from 'prop-types';
import MdcFileDelimitedOutline from '@meronex/icons/mdc/MdcFileDelimitedOutline';

import { INPUT } from '../../../../../../components';

import { COL, ROW } from '../../styles';
import { formatValue } from '../../../../../../utils/functions';

export default function GraficoInadimplencia({ configuracoes }) {
   return (
      <ROW>
         <COL xl="4">
            <INPUT
               autoFocus
               icon={<MdcFileDelimitedOutline />}
               placeholder="Limite de inadimplência"
               name="inadimplenciaLimite"
               type="numeric"
               option="value"
               defaultValue={configuracoes ? formatValue(configuracoes.inadimplenciaLimite) : formatValue(0)}
            />
         </COL>
      </ROW>
   );
}

GraficoInadimplencia.propTypes = {
   configuracoes: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
};
