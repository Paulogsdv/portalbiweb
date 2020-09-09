/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import { CONTAINER, DIV } from './styles';

export default function Loading({ type }) {
   return (
      <CONTAINER>
         {type === 'table' ? (
            <DIV>
               <Skeleton count={1} height={30} className="mb-3" />
               <Skeleton count={4} height={20} />
            </DIV>
         ) : type === 'chart' ? (
            <DIV>
               <Skeleton count={1} height={350} className="mb-4" />
               <Skeleton count={1} height={30} />
            </DIV>
         ) : type === 'ticket' ? (
            <DIV>
               <Skeleton count={1} height={30} />
               <Skeleton count={1} height={30} />
            </DIV>
         ) : type === 'card' ? (
            <DIV>
               <Skeleton count={1} height={130} width={270} />
            </DIV>
         ) : type === 'calendar' ? (
            <DIV>
               <Skeleton count={1} height={400} />
            </DIV>
         ) : (
            <DIV>
               <Skeleton count={1} height={30} className="mb-4" />
               <Skeleton count={4} height={15} />
            </DIV>
         )}
      </CONTAINER>
   );
}

Loading.propTypes = {
   type: PropTypes.string,
};

Loading.defaultProps = {
   type: null,
};
