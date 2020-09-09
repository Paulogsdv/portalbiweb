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

export default function NovaContaBancaria({ history }) {
   const [loading, setLoading] = useState(false);
   const [contaBancariaSolution, setContaBancariaSolution] = useState([]);
   const { limiteCtb } = useSelector(state => state.setting);

   async function handleSubmit(data) {
      await api
         .post('/contasbancarias', data)
         .then(() => {
            toast.success('Conta bancaria criada com sucesso!');
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

   async function getContaBancariaSolution() {
      setLoading(true);
      await api.get('search/contabancariasolution').then(response => {
         setContaBancariaSolution(response.data);
         setLoading(false);
      });
   }

   useEffect(() => {
      getContaBancariaSolution();
   }, []);

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CONTENT>
                  <Link to="/contasbancarias">
                     <BUTTON color="#fff" type="button">
                        <MdArrowBack size={18} />
                     </BUTTON>
                  </Link>
               </CONTENT>
               <CARD title="Cadastro de conta bancária">
                  <FORM schema={schema} submit={handleSubmit}>
                     <INPUT name="limiteCtb" defaultValue={limiteCtb} hidden />
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
                           />
                        </COL>
                        <COL xl="4">
                           <INPUT
                              icon={<MdMoneyOff size={18} color="#aaa" />}
                              placeholder="Limite da conta (Opcional)"
                              name="limite"
                              type="numeric"
                              option="value"
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
                           <INPUTCOLOR placeholder="Cor" name="cor" readOnly="true" defaultValue="FFFF00" />
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
                                 valueChecked={0}
                              />
                              <INPUTCHECKBOX
                                 id="stsSaldoAcu"
                                 name="stsSaldoAcu"
                                 label="Listar conta no saldo acumulado"
                                 valueChecked={0}
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

NovaContaBancaria.propTypes = {
   history: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
