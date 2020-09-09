/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import BiBlock from '@meronex/icons/bi/BiBlock';
import AiOutlineFieldNumber from '@meronex/icons/ai/AiOutlineFieldNumber';
import MdToday from '@meronex/icons/md/MdToday';

import { INPUT } from '../../../../../../components';

import { COL, ROW } from '../../styles';

export default function GraficoProjecaoRecebimentos({ configuracoes }) {
   return (
      <>
         <ROW>
            <COL xl="4">
               <INPUT
                  autoFocus
                  icon={<BiBlock />}
                  placeholder="Meio de cobranças bloqueados (Ex: 20,21)"
                  name="meioCobBloq"
                  type="text"
                  defaultValue={configuracoes ? configuracoes?.meioCobBloq : 0}
               />
            </COL>
            <COL xl="4">
               <INPUT
                  icon={<AiOutlineFieldNumber />}
                  placeholder="Número de duplicatas"
                  name="numeroDup"
                  type="number"
                  defaultValue={configuracoes ? configuracoes?.numeroDup : 0}
               />
            </COL>
            <COL xl="4">
               <INPUT
                  icon={<MdToday />}
                  placeholder="Dias máximo de atraso"
                  name="diasMaxAtraso"
                  type="number"
                  defaultValue={configuracoes ? configuracoes?.diasMaxAtraso : 0}
               />
            </COL>
         </ROW>
      </>
   );
}

GraficoProjecaoRecebimentos.propTypes = {
   configuracoes: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
};
