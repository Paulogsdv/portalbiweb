import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MdArrowBack from '@meronex/icons/md/MdArrowBack';
import MdAccountBalanceWallet from '@meronex/icons/md/MdAccountBalanceWallet';
import MdPersonPin from '@meronex/icons/md/MdPersonPin';
import MdAttachMoney from '@meronex/icons/md/MdAttachMoney';
import MdAccountBalance from '@meronex/icons/md/MdAccountBalance';
import MdMoneyOff from '@meronex/icons/md/MdMoneyOff';

import schema from '../../../../validations/form/ContaBancaria';

import api from '../../../../services/api';

import { CARD, FORM, INPUT, INPUTCHECKBOX, INPUTCOLOR, INPUTSELECT } from '../../../../components';

import { CENTER, BUTTON, CARDBUTTON, CONTENT, CONTAINER, COL, ROW, SPAN } from './styles';
import { formatValue } from '../../../../utils/functions';

export default function EditarContaBancaria({ history, location }) {
   const [conta, setConta] = useState({});
   const [contaBancariaSolution, setContaBancariaSolution] = useState([]);
   const [loading, setLoading] = useState(false);
   const { limiteCtb } = useSelector(state => state.setting);
   const { idConta } = location.state;

   // Salvar os dados da conta bancaria
   async function handleSubmit(data) {
      await api
         .post('/contasbancarias', data)
         .then(() => {
            toast.success('Conta bancária atualizada com sucesso!');
            history.push('/contasbancarias');
         })
         .catch(error => {
            if (error?.response?.status === 450) {
               toast.info('Você atingiu o limite de contas bancárias liberadas!');
            } else {
               toast.error('Ocorreu um erro ao tentar criar a conta bancária!');
            }
         });
   }

   // Requisição para pegar os dados da conta bancaria
   useEffect(() => {
      async function getContaBancaria() {
         await setLoading(true);

         // Requisição para pegar a conta do portalbi
         await api.get(`/contasbancarias/${idConta}`).then(async response => {
            setConta(response.data);
         });

         // Requisição para pegar as contas bancarias do solution (tblcdsctb0)
         await api.get('search/contabancariasolution').then(async response => {
            setContaBancariaSolution(response.data);
         });
         await setLoading(false);
      }

      getContaBancaria();
   }, [idConta]);

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CONTENT>
                  <Link to="/contasbancarias">
                     <BUTTON background="#32325d" color="#fff" type="button">
                        <MdArrowBack size={18} />
                     </BUTTON>
                  </Link>
               </CONTENT>
               <CARD title="Edição de conta bancária" loading={loading} typeLoading="table">
                  <FORM schema={schema} submit={handleSubmit} initialData={conta}>
                     <COL>
                        <INPUT name="idConta" defaultValue={conta.idConta} hidden />
                        <INPUT name="limiteCtb" defaultValue={limiteCtb} hidden />
                     </COL>
                     <ROW>
                        <COL xl="4">
                           <INPUT
                              autoFocus
                              icon={<MdPersonPin size={18} color="#aaa" />}
                              placeholder="Nome da conta"
                              name="nome"
                           />
                        </COL>
                        <COL xl="4">
                           <INPUTSELECT
                              icon={<MdAccountBalance size={18} color="#aaa" />}
                              placeholder="Conta do Solution (Opcional)"
                              name="idContaCtb"
                              isLoading={loading}
                              options={contaBancariaSolution.map(contaSolution => ({
                                 value: contaSolution.id,
                                 label: contaSolution.nome,
                              }))}
                              defaultValue={{ value: conta.idContaCtb, label: conta.nomeConta }}
                           />
                        </COL>
                        <COL xl="4">
                           <INPUT
                              icon={<MdMoneyOff size={18} color="#aaa" />}
                              placeholder="Limite da conta (Opcional)"
                              name="limite"
                              type="numeric"
                              option="value"
                              defaultValue={formatValue(conta.limite)}
                           />
                        </COL>
                     </ROW>
                     <ROW>
                        <COL xl="4">
                           <INPUT
                              icon={<MdAccountBalanceWallet size={18} color="#aaa" />}
                              placeholder="Número da agência (Opcional)"
                              name="agencia"
                              type="text"
                           />
                        </COL>
                        <COL xl="4">
                           <INPUT
                              icon={<MdAttachMoney size={18} color="#aaa" />}
                              placeholder="Número da conta (Opcional)"
                              name="conta"
                           />
                        </COL>
                        <COL xl="4">
                           <INPUTCOLOR placeholder="Cor" name="cor" readOnly="true" colorDefault={`#${conta.cor}`} />
                        </COL>
                     </ROW>
                     <ROW>
                        <COL xl="6">
                           <SPAN>Configurações (Opcional)</SPAN>
                           <COL>
                              <INPUTCHECKBOX
                                 id="stsSaldoInd"
                                 name="stsSaldoInd"
                                 label="Listar conta no saldo individual"
                                 defaultChecked={conta.stsSaldoInd}
                                 valueChecked={conta.stsSaldoInd}
                              />
                              <INPUTCHECKBOX
                                 id="stsSaldoAcu"
                                 name="stsSaldoAcu"
                                 label="Listar conta no saldo acumulado"
                                 defaultChecked={conta.stsSaldoAcu}
                                 valueChecked={conta.stsSaldoAcu}
                              />
                           </COL>
                        </COL>
                     </ROW>
                     <CENTER>
                        <CARDBUTTON color="#fff" type="submit">
                           Salvar conta
                        </CARDBUTTON>
                     </CENTER>
                  </FORM>
               </CARD>
            </COL>
         </ROW>
      </CONTAINER>
   );
}

EditarContaBancaria.propTypes = {
   history: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
   location: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
