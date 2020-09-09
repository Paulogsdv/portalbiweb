/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import RiMoneyDollarCircleLine from '@meronex/icons/ri/RiMoneyDollarCircleLine';
import FaAngleDown from '@meronex/icons/fa/FaAngleDown';
import FaAngleUp from '@meronex/icons/fa/FaAngleUp';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import schema from '../../../../../validations/form/UniqueDate';

import { formatValue, maskDate } from '../../../../../utils/functions';

import api from '../../../../../services/api';

import { CARD } from '../../../../../components';

import {
   CARDACCOUNT,
   CARDACCOUNTBUTTON,
   CARDACCOUNTBODY,
   CARDACCOUNTBODYCOL,
   CARDACCOUNTGROUP,
   CARDACCOUNTSALDO,
   CARDACCOUNTTITLE,
   CARDACCOUNTTYPE,
   CARDBODYCOL,
   CARDBODYROW,
   CARDGROUP,
   SPAN,
} from './styles';

export default function SaldoContaBancaria({ empresa }) {
   const [contaBancaria, setContaBancaria] = useState([]);
   const [dataDefault, setDataDefault] = useState(maskDate(new Date()));
   const [loading, setLoading] = useState(false);

   // Requisição do saldo das contas bancarias
   async function saldoContaBancaria(data) {
      const dataInicial = data || dataDefault;

      setLoading(true);
      await api
         .get(`/saldocontabancaria`, {
            params: { empresa, dataInicial },
         })
         .then(response => {
            setContaBancaria(response.data);
            setLoading(false);
         });
   }

   useEffect(() => {
      saldoContaBancaria();
   }, [empresa]);

   // Caso o usuário pesquise por data
   async function handleSubmit(data) {
      await saldoContaBancaria(data.dataInicial);
      await setDataDefault(data.dataInicial);
   }

   return (
      <CARD
         title="Saldo das contas bancárias"
         valueDateInitial={new Date()}
         subTitle={`${dataDefault}`}
         submit={handleSubmit}
         typeLoading="card"
         loading={loading}
         schema={schema}
         searchDate
         uniqueDate
         noFooter
         noPadding
      >
         <CARDBODYROW>
            {contaBancaria?.map(conta => (
               <CARDBODYCOL sm="6" xl="3" md="4" lg="4" key={conta.idConta}>
                  <CARDACCOUNT>
                     <CARDGROUP>
                        <CARDACCOUNTTITLE color={`#${conta.cor}`}>{conta.nomeConta}</CARDACCOUNTTITLE>
                        <RiMoneyDollarCircleLine size={30} color={`#${conta.cor}`} />
                     </CARDGROUP>
                     <CARDACCOUNTBODY>
                        <CARDACCOUNTBODYCOL>
                           <CARDACCOUNTGROUP>
                              <CARDACCOUNTTYPE>Saldo atual</CARDACCOUNTTYPE>
                              <CARDACCOUNTSALDO color={Number(conta.saldo >= 0) ? '#4CD59A' : '#F65374'}>
                                 {formatValue(Number(conta.saldo))}
                                 {Number(conta.saldo) >= 0 ? (
                                    <FaAngleUp size={24} color="#4CD59A" />
                                 ) : (
                                    <FaAngleDown size={24} color="#F65374" />
                                 )}
                              </CARDACCOUNTSALDO>
                           </CARDACCOUNTGROUP>
                           {conta.limite > 0 ? (
                              <CARDACCOUNTGROUP>
                                 <CARDACCOUNTTYPE>Saldo Disponível</CARDACCOUNTTYPE>
                                 <CARDACCOUNTSALDO
                                    color={
                                       Number(Number(conta.limite) + Number(conta.saldo)) >= 0 ? '#4CD59A' : '#F65374'
                                    }
                                 >
                                    {formatValue(Number(conta.limite) + Number(conta.saldo))}
                                 </CARDACCOUNTSALDO>
                              </CARDACCOUNTGROUP>
                           ) : null}
                        </CARDACCOUNTBODYCOL>
                     </CARDACCOUNTBODY>
                     <Link
                        to={{
                           pathname: `/extratocontabancaria`,
                           state: {
                              empresa,
                              dataDefault,
                              nomeConta: conta.nomeConta,
                              idConta: conta.idConta,
                           },
                        }}
                     >
                        <CARDACCOUNTBUTTON type="button" color="#333" background="#fff">
                           Gerar extrato
                        </CARDACCOUNTBUTTON>
                     </Link>
                  </CARDACCOUNT>
               </CARDBODYCOL>
            ))}
         </CARDBODYROW>
         {contaBancaria.length > 0 ? null : <SPAN> Sem registros de contas bancárias! </SPAN>}
      </CARD>
   );
}

SaldoContaBancaria.propTypes = {
   empresa: PropTypes.string.isRequired,
};
