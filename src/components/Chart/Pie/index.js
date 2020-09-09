import React from 'react';
import PropTypes from 'prop-types';

import { PIE, SPAN } from './styles';
import { formatValue } from '../../../utils/functions';

export default function ChartPie({ data, handleElement }) {
   function handleElementAtEvent(element) {
      if (handleElement !== null && element.length > 0) {
         handleElement(element);
      }
   }

   return (
      <>
         {data ? (
            <PIE
               data={data}
               getElementAtEvent={element => handleElementAtEvent(element)}
               options={{
                  responsive: true,
                  legend: {
                     labels: {
                        defaultFontFamily: "'Open Sans', 'sans-serif'",
                        boxWidth: 12,
                        fontSize: 9,
                     },
                     position: 'right',
                  },
                  animation: {
                     animateScale: true,
                     animateRotate: true,
                  },
                  tooltips: {
                     mode: 'index',
                     intersect: true,
                     hover: {
                        radius: 50,
                     },
                     callbacks: {
                        label(item, value) {
                           const label = value.datasets[item.datasetIndex].data[item.index] || ' ';

                           return ` R$ ${formatValue(label)}  `;
                        },
                     },
                  },
               }}
            />
         ) : (
            <SPAN>Sem dados durante este(s) período(s) nesta(s) empresa(s).</SPAN>
         )}
      </>
   );
}

ChartPie.propTypes = {
   data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
   handleElement: PropTypes.func,
};

ChartPie.defaultProps = {
   data: {},
   handleElement: null,
};
