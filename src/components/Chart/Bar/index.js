import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

import { formatValue } from '../../../utils/functions';

import { DIV, SPAN } from './styles';

export default function ChartBar({ data, percentage, handleElement, stracked }) {
   function handleElementAtEvent(element) {
      if (handleElement !== null && element.length > 0) {
         handleElement(element);
      }
   }

   return (
      <DIV>
         {/* Somente mostra os dados do gráfico se tiver pelo menos uma linha de informação */}
         {data.datasets[1].data.length > 0 ? (
            <Bar
               data={data}
               getElementAtEvent={element => handleElementAtEvent(element)}
               options={{
                  responsive: true,
                  // scaleBeginAtZero: true,
                  maintainAspectRatio: false,
                  elements: {
                     point: {
                        radius: 5,
                     },
                     line: {
                        tension: 0.5,
                        borderWidth: 3,
                     },
                  },
                  legend: {
                     position: 'bottom',
                     defaultFontFamily: "'Open Sans', 'sans-serif'",
                     labels: {
                        padding: 30,
                     },
                  },
                  scales: {
                     yAxes: [
                        {
                           stacked: stracked || false,
                           gridLines: {
                              color: 'rgba(0,0,0,0.05)',
                              zeroLineColor: 'rgba(0,0,0,0.05)',
                           },
                           display: true,
                           ticks: {
                              // beginAtZero: true,
                              // suggestedMin: 0,
                              // min: 0,
                              callback(value) {
                                 if (value !== null) {
                                    if (percentage) {
                                       return `${Math.round(value)} %  `;
                                    }
                                    return `${formatValue(value)}  `;
                                 }
                                 return null;
                              },
                              fontColor: '#52616a',
                              defaultFontFamily: "'Open Sans', 'sans-serif'",
                           },
                        },
                     ],
                     xAxes: [
                        {
                           stacked: stracked || false,
                           gridLines: {
                              color: 'rgba(0,0,0,0.05)',
                              zeroLineColor: 'rgba(0,0,0,0.05)',
                           },
                           ticks: {
                              fontColor: '#52616a',
                           },
                        },
                     ],
                  },
                  tooltips: {
                     mode: 'index',
                     intersect: true,
                     hover: {
                        radius: 50,
                     },
                     callbacks: {
                        label(item, value) {
                           const label = value.datasets[item.datasetIndex].label || ' ';
                           const { yLabel } = item;
                           let content = ' ';
                           if (value.datasets.length > 1) {
                              content += label;
                           }

                           if (percentage) {
                              content += ` ${formatValue(yLabel)} %  `;
                           } else {
                              content += ` R$ ${formatValue(yLabel)}  `;
                           }

                           return content;
                        },
                     },
                  },
               }}
            />
         ) : (
            <SPAN>Sem dados durante este(s) período(s) nesta(s) empresa(s).</SPAN>
         )}
      </DIV>
   );
}

ChartBar.propTypes = {
   data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
   percentage: PropTypes.bool,
   handleElement: PropTypes.func,
   stracked: PropTypes.bool,
};

ChartBar.defaultProps = {
   data: {},
   percentage: false,
   handleElement: null,
   stracked: false,
};
