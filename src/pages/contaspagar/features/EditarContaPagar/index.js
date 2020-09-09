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
import { maskDate, formatValue } from '../../../../utils/functions';

export default function EditarContaPagar({ history, location }) {
   const [conta, setConta] = useState({});
   const [contaBancariaPBI, setContaBancariaPBI] = useState([]);
   const [loading, setLoading] = useState(false);
   const { idPag } = location.state;

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

   // Requisição para pegar os dados da conta a pagar
   useEffect(() => {
      async function contasPagar() {
         await setLoading(true);
         await api.get(`/contaspagar/${idPag}`).then(async response => {
            setConta(response.data);
            await setLoading(false);
         });
      }

      async function getContaBancariaPBI() {
         await api.get('search/contabancariapbi').then(async response => {
            setContaBancariaPBI(response.data);
         });
      }

      getContaBancariaPBI();
      contasPagar();
   }, [idPag]);

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
               <CARD title="Edição de conta a pagar avulsa" loading={loading} typeLoading="table">
                  <FORM schema={schema} submit={handleSubmit} initialData={conta}>
                     <COL>
                        <INPUT name="idPag" defaultValue={conta.idPag} hidden />
                     </COL>
                     <ROW>
                        <COL xl="4">
                           <INPUT
                              autoFocus
                              icon={<FiCalendar size={18} color="#aaa" />}
                              name="dtVcto"
                              placeholder="Data de vencimento"
                              type="text"
                              option="date"
                              defaultValue={maskDate(new Date(conta.dtVcto))}
                           />
                        </COL>
                        <COL xl="4">
                           <INPUTSELECT
                              icon={<MdPersonPin size={18} color="#aaa" />}
                              name="idConta"
                              placeholder="Conta bancária (PBI)"
                              isLoading={loading}
                              options={contaBancariaPBI.map(contaPBI => ({
                                 label: contaPBI.nome,
                                 value: contaPBI.id,
                              }))}
                              defaultValue={{ value: conta.idConta, label: conta.nomeReduz }}
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
                              defaultValue={formatValue(conta.valor)}
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
                           <INPUTCOLOR
                              placeholder="Cor (Opcional)"
                              name="cor"
                              readOnly="true"
                              colorDefault={`#${conta.cor}`}
                           />
                        </COL>
                        <COL xl="2">
                           <SPAN>Situação (Opcional)</SPAN>
                           <INPUTCHECKBOX
                              id="stspgto"
                              name="stsPgto"
                              label="Pago"
                              defaultChecked={conta.stsPgto}
                              valueChecked={conta.stsPgto}
                           />
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

EditarContaPagar.propTypes = {
   history: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
   location: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
