import React from 'react';
import PropTypes from 'prop-types';

import { INPUTCHECKBOX } from '../../../../components';

import { COL, ROW } from './styles';

export default function ResumoContas({ configuracoes }) {
   return (
      <ROW>
         <COL xl="6">
            <INPUTCHECKBOX
               id="desabilitarContas"
               name="desabilitarContas"
               label="Mostrar contas baixadas / pagas na cor cinza"
               defaultChecked={configuracoes?.desabilitarContas}
               valueChecked={configuracoes?.desabilitarContas}
            />
         </COL>
      </ROW>
   );
}

ResumoContas.propTypes = {
   configuracoes: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
