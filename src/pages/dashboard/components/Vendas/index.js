import React from 'react';
import PropTypes from 'prop-types';

import {
   RANKINGVENDEDORES,
   GRAFICOLUCRATIVIDADEMENSAL,
   TICKETMEDIO,
   RANKINGPRODUTOS,
   RANKINGSECOES,
   // GRAFICODEMONSTRATIVOPRODUTOS,
} from '../..';
import { CONTAINER } from './styles';

export default function Vendas({ empresa, menu }) {
   // Menu Vendas
   const { rankingVendedores, graficoLucratividadeMensal, ticketMedio, rankingProdutos, rankingSecoes } = menu?.vendas;

   return (
      <CONTAINER>
         {ticketMedio === 1 ? <TICKETMEDIO empresa={empresa} /> : null}
         {graficoLucratividadeMensal === 1 ? <GRAFICOLUCRATIVIDADEMENSAL empresa={empresa} /> : null}
         {rankingProdutos === 1 ? <RANKINGPRODUTOS empresa={empresa} /> : null}
         {rankingSecoes === 1 ? <RANKINGSECOES empresa={empresa} /> : null}
         {rankingVendedores === 1 ? <RANKINGVENDEDORES empresa={empresa} /> : null}
         {/* {vendasVendedor === 1 ? <GRAFICODEMONSTRATIVOPRODUTOS empresa={empresa} /> : null} */}
      </CONTAINER>
   );
}

Vendas.propTypes = {
   empresa: PropTypes.string.isRequired,
   menu: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.element]).isRequired,
};
