import React from 'react';
import PropTypes from 'prop-types';

import { GRAFICOINADIMPLENCIA, GRAFICAOPROJECAORECEBIMENTOS, GRAFICOSALDOBANCARIO, SALDOCONTABANCARIA } from '../..';
import { CONTAINER } from './styles';

export default function Financeiro({ empresa, menu }) {
   // Menu financeiro
   const {
      saldoContaBancaria,
      graficoSaldoBancario,
      graficoInadimplencias,
      graficoProjecaoRecebimentos,
   } = menu?.financeiro;

   return (
      <CONTAINER>
         {saldoContaBancaria === 1 ? <SALDOCONTABANCARIA empresa={empresa} /> : null}
         {graficoSaldoBancario === 1 ? <GRAFICOSALDOBANCARIO empresa={empresa} /> : null}
         {graficoInadimplencias === 1 ? <GRAFICOINADIMPLENCIA empresa={empresa} /> : null}
         {graficoProjecaoRecebimentos === 1 ? <GRAFICAOPROJECAORECEBIMENTOS empresa={empresa} /> : null}
      </CONTAINER>
   );
}

Financeiro.propTypes = {
   empresa: PropTypes.string.isRequired,
   menu: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.element]).isRequired,
};
