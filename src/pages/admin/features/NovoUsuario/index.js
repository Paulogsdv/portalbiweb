/* eslint-disable prefer-const, no-shadow, no-nested-ternary */
import React, { useState } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MdArrowBack from '@meronex/icons/md/MdArrowBack';
import MdEmail from '@meronex/icons/md/MdEmail';
import MdPersonPin from '@meronex/icons/md/MdPersonPin';
import MdBusiness from '@meronex/icons/md/MdBusiness';
import MdDns from '@meronex/icons/md/MdDns';
import MdLock from '@meronex/icons/md/MdLock';

import { CARD, FORM, INPUT, INPUTCHECKBOX, INPUTSELECT } from '../../../../components';
import schema from '../../../../validations/form/Usuario';

import auth from '../../../../services/auth';

import { formatStringInArray } from '../../../../utils/functions';

import {
   CENTER,
   BUTTON,
   CARDBUTTON,
   CONTENT,
   CONTAINER,
   COL,
   ROW,
   NAV,
   NAVITEM,
   NAVLINK,
   TABCONTENT,
   TABPANE,
} from './styles';

export default function NovoUsuario({ history }) {
   let { idClientePre, limiteCtb, empresaPadrao, url, menu } = useSelector(state => state.setting);

   const [activeTab, setActiveTab] = useState(
      menu?.financeiro?.ativo === 1 ? '1' : menu?.vendas?.ativo === 1 ? '2' : null
   );

   const toggle = tab => {
      if (activeTab !== tab) setActiveTab(tab);
   };

   async function handleSubmit(data) {
      // Instancia array
      const gerarMenu = [];

      // Pega o status do usuário
      const ativo = 1;

      const {
         // Dados do usuario
         nome,
         email,
         senha,
         idClientePre,
         limiteCtb,
         adm,
         url,
         cnpj,
         // Funcionalidades
         contasBancarias,
         contasPagar,
         resumoContas,
         saldoContaBancaria,
         graficoSaldoBancario,
         graficoInadimplencias,
         graficoProjecaoRecebimentos,
         rankingVendedores,
         graficoLucratividadeMensal,
         ticketMedio,
         rankingProdutos,
         rankingSecoes,
      } = data;

      // Gera o menu
      gerarMenu.push(
         // Posição string
         contasBancarias, // 0
         contasPagar, // 1
         resumoContas, // 2
         saldoContaBancaria, // 3
         graficoSaldoBancario, // 4
         graficoInadimplencias, // 5
         graficoProjecaoRecebimentos, // 6
         rankingVendedores, // 7
         graficoLucratividadeMensal, // 8
         ticketMedio, // 9
         rankingProdutos, // 10
         rankingSecoes // 11
      );

      // Transforma o array em uma string
      menu = gerarMenu
         .map(index => index)
         .toString()
         .replace(/,/g, '');

      // Cria o objeto do usuário e sua configuração
      const usuario = {
         nome,
         email,
         senha,
         configuracao: {
            idClientePre, // Id da empresa no banco da precisa
            limiteCtb, // Qtde limite de contas bancárias por cliente
            ativo,
            adm, // Sempre adm igual a zero
            url,
            cnpj, // Cnpjs liberados para este usuario
            menu, // Funcionaldiades liberadas para este usuario
         },
      };

      await auth
         .post('/usuarioadmin', usuario)
         .then(() => {
            toast.success('Usuário criado com sucesso!');
            history.push('/usuarios');
         })
         .catch(error => {
            if (error?.response?.status === 450) {
               toast.error('Email já cadastrado, informe outro!');
            } else {
               toast.error('Não foi possível criar o usuário!');
            }
         });
   }

   return (
      <CONTAINER fluid>
         <ROW>
            <COL xl="12">
               <CONTENT>
                  <Link to="/usuarios">
                     <BUTTON color="#fff" type="button">
                        <MdArrowBack size={18} />
                     </BUTTON>
                  </Link>
               </CONTENT>
               <CARD title="Novo usuário">
                  <FORM schema={schema} submit={handleSubmit}>
                     <ROW>
                        <INPUT name="idClientePre" defaultValue={idClientePre} hidden />
                        <INPUT name="limiteCtb" defaultValue={limiteCtb} hidden />
                        <INPUT name="adm" defaultValue={0} value={0} hidden />
                        <COL xl="6">
                           <INPUTSELECT
                              name="url"
                              placeholder="Url"
                              options={formatStringInArray(url, ',').map(url => ({
                                 value: url,
                                 label: url,
                              }))}
                              icon={<MdDns size={18} color="#aaa" />}
                           />
                        </COL>
                        <COL xl="6">
                           <INPUT
                              icon={<MdPersonPin size={18} color="#aaa" />}
                              placeholder="Nome do usuário"
                              name="nome"
                           />
                        </COL>
                     </ROW>
                     <ROW>
                        <COL xl="6">
                           <INPUT
                              icon={<MdEmail size={18} color="#aaa" />}
                              placeholder="Email de acesso"
                              name="email"
                           />
                        </COL>
                        <COL xl="6">
                           <INPUT icon={<MdLock size={18} color="#aaa" />} placeholder="Senha de acesso" name="senha" />
                        </COL>
                     </ROW>
                     <ROW>
                        <COL xl="12">
                           <INPUTSELECT
                              name="cnpj"
                              placeholder="CNPJ"
                              options={formatStringInArray(empresaPadrao, ',').map(cnpj => ({
                                 value: cnpj,
                                 label: cnpj,
                              }))}
                              icon={<MdBusiness />}
                              isMulti
                           />
                        </COL>
                     </ROW>
                     <NAV tabs>
                        {menu?.financeiro?.ativo === 1 && (
                           <NAVITEM>
                              <NAVLINK
                                 className={classnames({ active: activeTab === '1' })}
                                 onClick={() => {
                                    toggle('1');
                                 }}
                              >
                                 Financeiro
                              </NAVLINK>
                           </NAVITEM>
                        )}
                        {menu?.vendas?.ativo === 1 && (
                           <NAVITEM>
                              <NAVLINK
                                 className={classnames({ active: activeTab === '2' })}
                                 onClick={() => {
                                    toggle('2');
                                 }}
                              >
                                 Vendas
                              </NAVLINK>
                           </NAVITEM>
                        )}
                     </NAV>
                     <TABCONTENT activeTab={activeTab}>
                        {/* Tab dos módulos de financeiro */}
                        <TABPANE tabId="1">
                           {menu && (
                              <ROW className="mt-3">
                                 <COL xl="6">
                                    {menu?.financeiro?.contasBancarias === 1 && (
                                       <INPUTCHECKBOX
                                          id="contasBancarias"
                                          name="contasBancarias"
                                          label="Liberar acesso as contas bancárias"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.financeiro?.contasPagar === 1 && (
                                       <INPUTCHECKBOX
                                          id="contasPagar"
                                          name="contasPagar"
                                          label="Liberar acesso as contas a pagar avulsas"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.financeiro?.resumoContas === 1 && (
                                       <INPUTCHECKBOX
                                          id="resumoContas"
                                          name="resumoContas"
                                          label="Liberar acesso ao resumo de contas"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.financeiro?.saldoContaBancaria === 1 && (
                                       <INPUTCHECKBOX
                                          id="saldoContaBancaria"
                                          name="saldoContaBancaria"
                                          label="Liberar acesso ao saldo das contas bancárias"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.financeiro?.graficoSaldoBancario === 1 && (
                                       <INPUTCHECKBOX
                                          id="graficoSaldoBancario"
                                          name="graficoSaldoBancario"
                                          label="Liberar acesso ao gráfico de evolução de saldo bancário"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.financeiro?.graficoInadimplencias === 1 && (
                                       <INPUTCHECKBOX
                                          id="graficoInadimplencias"
                                          name="graficoInadimplencias"
                                          label="Liberar acesso ao gráfico de inadimplências"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.financeiro?.graficoProjecaoRecebimentos === 1 && (
                                       <INPUTCHECKBOX
                                          id="graficoProjecaoRecebimentos"
                                          name="graficoProjecaoRecebimentos"
                                          label="Liberar acesso ao gráfico de projeção de recebimentos"
                                          valueChecked={0}
                                       />
                                    )}
                                 </COL>
                              </ROW>
                           )}
                        </TABPANE>
                        {/* Tab dos módulos de vendas */}
                        <TABPANE tabId="2">
                           {menu && (
                              <ROW className="mt-3">
                                 <COL xl="6">
                                    {menu?.vendas?.rankingVendedores === 1 && (
                                       <INPUTCHECKBOX
                                          id="rankingVendedores"
                                          name="rankingVendedores"
                                          label="Liberar acesso ao ranking de vendedores"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.vendas?.graficoLucratividadeMensal === 1 && (
                                       <INPUTCHECKBOX
                                          id="graficoLucratividadeMensal"
                                          name="graficoLucratividadeMensal"
                                          label="Liberar acesso ao gráfico de lucratividade mensal"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.vendas?.ticketMedio === 1 && (
                                       <INPUTCHECKBOX
                                          id="ticketMedio"
                                          name="ticketMedio"
                                          label="Liberar acesso ao ticket médio"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.vendas?.rankingProdutos === 1 && (
                                       <INPUTCHECKBOX
                                          id="rankingProdutos"
                                          name="rankingProdutos"
                                          label="Liberar acesso ao ranking de produtos"
                                          valueChecked={0}
                                       />
                                    )}
                                    {menu?.vendas?.rankingSecoes === 1 && (
                                       <INPUTCHECKBOX
                                          id="rankingSecoes"
                                          name="rankingSecoes"
                                          label="Liberar acesso ao ranking de  seções"
                                          valueChecked={0}
                                       />
                                    )}
                                 </COL>
                              </ROW>
                           )}
                        </TABPANE>
                     </TABCONTENT>
                     <CENTER>
                        <CARDBUTTON color="#fff" type="submit">
                           SALVAR
                        </CARDBUTTON>
                     </CENTER>
                  </FORM>
               </CARD>
            </COL>
         </ROW>
      </CONTAINER>
   );
}

NovoUsuario.propTypes = {
   history: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
