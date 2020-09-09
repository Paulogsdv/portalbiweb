import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MdArrowBack from '@meronex/icons/md/MdArrowBack';
import MdAccountBalanceWallet from '@meronex/icons/md/MdAccountBalanceWallet';
import MdPersonPin from '@meronex/icons/md/MdPersonPin';
import MdAttachMoney from '@meronex/icons/md/MdAttachMoney';
import MdSubject from '@meronex/icons/md/MdSubject';
import MdRecentActors from '@meronex/icons/md/MdRecentActors';
import FiCalendar from '@meronex/icons/fi/FiCalendar';

import schema from '../../../../validations/form/ContaPagar';

import api from '../../../../services/api';

import { FORM, INPUT, INPUTSELECT, INPUTCHECKBOX, INPUTCOLOR, CARD } from '../../../../components';

import { CENTER, BUTTON, CONTENT, CONTAINER, COL, ROW, SPAN } from './styles';

export default function NovaContaPagar({ history }) {
   const [loading, setLoading] = useState(false);
   const [contaBancariaPBI, setContaBancariaPBI] = useState([]);

   // Salvar os dados da conta a pagar
   async function handleSubmit(data) {
      await api
         .post('/contaspagar', data)
         .then(() => {
            toast.success('Conta a pagar atualizada com sucesso!');
            history.push('/contaspagar');
         })
         .catch(error => {
            if (error?.response?.status === 450) {
               toast.error('A data é inválida!');
            } else {
               toast.error('Não foi possível atualizar a conta a pagar!');
            }
         });
   }

   async function getContaBancariaPBI() {
      setLoading(true);
      await api.get('search/contabancariapbi').then(response => {
         setContaBancariaPBI(response.data);
         setLoading(false);
      });
   }

   useEffect(() => {
      getContaBancariaPBI();
   }, []);

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CONTENT>
                  <Link to="/contaspagar">
                     <BUTTON color="#fff" type="button">
                        <MdArrowBack size={18} />
                     </BUTTON>
                  </Link>
               </CONTENT>
               <CARD title="Nova conta a pagar avulsa" noFooter>
                  <FORM schema={schema} submit={handleSubmit}>
                     <ROW>
                        <COL xl="4">
                           <INPUT
                              autoFocus
                              icon={<FiCalendar size={18} color="#aaa" />}
                              name="dtVcto"
                              placeholder="Data de vencimento"
                              type="text"
                              option="date"
                              maxLength="10"
                           />
                        </COL>
                        <COL xl="4">
                           <INPUTSELECT
                              icon={<MdPersonPin size={18} color="#aaa" />}
                              name="idConta"
                              isLoading={loading}
                              placeholder="Conta bancária (PBI)"
                              options={contaBancariaPBI.map(conta => ({
                                 value: conta.id,
                                 label: conta.nome,
                              }))}
                           />
                        </COL>
                        <COL xl="4">
                           <INPUT
                              icon={<MdRecentActors size={18} color="#aaa" />}
                              placeholder="Razão da conta"
                              name="razao"
                              type="text"
                           />
                        </COL>
                     </ROW>
                     <ROW>
                        <COL xl="4">
                           <INPUT
                              icon={<MdAttachMoney size={18} color="#aaa" />}
                              placeholder="Valor da conta"
                              name="valor"
                              type="numeric"
                              option="value"
                           />
                        </COL>

                        <COL xl="4">
                           <INPUT
                              icon={<MdAccountBalanceWallet size={18} color="#aaa" />}
                              placeholder="Número da conta (Opcional)"
                              name="numero"
                              type="number"
                           />
                        </COL>
                        <COL xl="4">
                           <INPUT
                              icon={<MdSubject size={18} color="#aaa" />}
                              placeholder="Observação (Opcional)"
                              name="observacao"
                              type="text"
                           />
                        </COL>
                     </ROW>
                     <ROW>
                        <COL xl="4">
                           <INPUTCOLOR placeholder="Cor (Opcional)" name="cor" readOnly="true" />
                        </COL>
                        <COL xl="2">
                           <SPAN>Situação (Opcional)</SPAN>
                           <INPUTCHECKBOX id="stspgto" name="stsPgto" label="Pago" valueChecked={0} />
                        </COL>
                     </ROW>
                     <CENTER>
                        <BUTTON color="#fff" type="submit">
                           Salvar conta
                        </BUTTON>
                     </CENTER>
                  </FORM>
               </CARD>
            </COL>
         </ROW>
      </CONTAINER>
   );
}

NovaContaPagar.propTypes = {
   history: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
