/* eslint-disable no-shadow, prefer-const, no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MdArrowBack from '@meronex/icons/md/MdArrowBack';
import MdEmail from '@meronex/icons/md/MdEmail';
import MdPersonPin from '@meronex/icons/md/MdPersonPin';
import MdBusiness from '@meronex/icons/md/MdBusiness';
import MdDns from '@meronex/icons/md/MdDns';
import MdLock from '@meronex/icons/md/MdLock';

import schema from '../../../../validations/form/EditarUsuario';

import auth from '../../../../services/auth';

import { formatStringInArray } from '../../../../utils/functions';

import { CARD, FORM, INPUT, INPUTCHECKBOX, INPUTSELECT } from '../../../../components';

import {
   CENTER,
   BUTTON,
   CARDBUTTON,
   CONTENT,
   CONTAINER,
   COL,
   ROW,
   SPAN,
   NAV,
   NAVITEM,
   NAVLINK,
   TABCONTENT,
   TABPANE,
} from './styles';

export default function EditarUsuario({ history, location }) {
   const { idClientePre, limiteCtb, empresaPadrao, url, menu } = useSelector(state => state.setting);
   const [usuarioCli, setUsuarioCli] = useState({});
   const [loading, setLoading] = useState(true);

   const [activeTab, setActiveTab] = useState(
      menu?.financeiro?.ativo === 1 ? '1' : menu?.vendas?.ativo === 1 ? '2' : null
   );

   const toggle = tab => {
      if (activeTab !== tab) setActiveTab(tab);
   };

   const { idUsuario } = location.state;

   useEffect(() => {
      async function getUsuarioAdmin() {
         await setLoading(true);
         await auth.get(`/usuarioadmin/${idUsuario}`).then(async response => {
            setUsuarioCli(response.data);
            await setLoading(false);
         });
      }

      getUsuarioAdmin();
   }, [idUsuario]);

   async function handleSubmit(data) {
      // Instancia array
      const gerarMenu = [];

      // Pega o status do usuário
      const ativo = usuarioCli?.ativo;

      let {
         // Dados do usuario
         nome,
         email,
         senha,
         adm,
         url,
         cnpj,
         limiteCtb,
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
      const menu = gerarMenu
         .map(index => index)
         .toString()
         .replace(/,/g, '');

      // Verifica se há novo valor de cnpj, se não tiver pega o cnpj atual
      if (cnpj === undefined) {
         cnpj = usuarioCli?.cnpj;
      }

      // Verifica se há novo valor de url, se não tiver pega a url atual
      if (url === undefined) {
         url = usuarioCli?.url;
      }

      // Cria o objeto do usuário e sua configuração
      const usuario = {
         idUsuario,
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
         .put('/usuarioadmin', usuario)
         .then(() => {
            toast.success('Usuário editado com sucesso!');
            history.push('/usuarios');
         })
         .catch(error => {
            if (error.response.status === 450) {
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
               <CARD title="Editar usuário" loading={loading}>
                  <FORM schema={schema} submit={handleSubmit} initialData={usuarioCli}>
                     <ROW>
                        <INPUT name="idClientePre" defaultValue={idClientePre} hidden />
                        <INPUT name="limiteCtb" defaultValue={limiteCtb} hidden />
                        <INPUT name="adm" defaultValue={0} value={0} hidden />
                        <COL xl="6">
                           <INPUTSELECT
                              name="url"
                              placeholder="Url"
                              icon={<MdDns />}
                              options={formatStringInArray(url, ',').map(url => ({
                                 value: url,
                                 label: url,
                              }))}
                              defaultValue={{ value: usuarioCli?.url, label: usuarioCli?.url }}
                           />
                        </COL>
                        <COL xl="6">
                           <INPUT icon={<MdPersonPin />} placeholder="Nome do usuário" name="nome" />
                        </COL>
                     </ROW>
                     <ROW>
                        <COL xl="6">
                           <INPUT icon={<MdEmail />} placeholder="Email de acesso" name="email" />
                        </COL>
                        <COL xl="6">
                           <INPUT icon={<MdLock />} placeholder="Senha de acesso" name="senha" />
                        </COL>
                     </ROW>
                     <ROW>
                        <COL xl="12">
                           <SPAN>{`CNPJ atual: ${usuarioCli?.cnpj}`}</SPAN>
                           <INPUTSELECT
                              name="cnpj"
                              placeholder="CNPJ"
                              icon={<MdBusiness />}
                              isMulti
                              options={formatStringInArray(empresaPadrao, ',').map(cnpj => ({
                                 value: cnpj,
                                 label: cnpj,
                              }))}
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
                                          defaultChecked={usuarioCli?.menu?.financeiro?.contasBancarias}
                                          valueChecked={usuarioCli?.menu?.financeiro?.contasBancarias}
                                       />
                                    )}
                                    {menu?.financeiro?.contasPagar === 1 && (
                                       <INPUTCHECKBOX
                                          id="contasPagar"
                                          name="contasPagar"
                                          label="Liberar acesso as contas a pagar avulsas"
                                          defaultChecked={usuarioCli?.menu?.financeiro?.contasPagar}
                                          valueChecked={usuarioCli?.menu?.financeiro?.contasPagar}
                                       />
                                    )}
                                    {menu?.financeiro?.resumoContas === 1 && (
                                       <INPUTCHECKBOX
                                          id="resumoContas"
                                          name="resumoContas"
                                          label="Liberar acesso ao resumo de contas"
                                          defaultChecked={usuarioCli?.menu?.financeiro?.resumoContas}
                                          valueChecked={usuarioCli?.menu?.financeiro?.resumoContas}
                                       />
                                    )}
                                    {menu?.financeiro?.saldoContaBancaria === 1 && (
                                       <INPUTCHECKBOX
                                          id="saldoContaBancaria"
                                          name="saldoContaBancaria"
                                          label="Liberar acesso ao saldo das contas bancárias"
                                          defaultChecked={usuarioCli?.menu?.financeiro?.saldoContaBancaria}
                                          valueChecked={usuarioCli?.menu?.financeiro?.saldoContaBancaria}
                                       />
                                    )}
                                    {menu?.financeiro?.graficoSaldoBancario === 1 && (
                                       <INPUTCHECKBOX
                                          id="graficoSaldoBancario"
                                          name="graficoSaldoBancario"
                                          label="Liberar acesso ao gráfico de evolução de saldo bancário"
                                          defaultChecked={usuarioCli?.menu?.financeiro?.graficoSaldoBancario}
                                          valueChecked={usuarioCli?.menu?.financeiro?.graficoSaldoBancario}
                                       />
                                    )}
                                    {menu?.financeiro?.graficoInadimplencias === 1 && (
                                       <INPUTCHECKBOX
                                          id="graficoInadimplencias"
                                          name="graficoInadimplencias"
                                          label="Liberar acesso ao gráfico de inadimplências"
                                          defaultChecked={usuarioCli?.menu?.financeiro?.graficoInadimplencias}
                                          valueChecked={usuarioCli?.menu?.financeiro?.graficoInadimplencias}
                                       />
                                    )}
                                    {menu?.financeiro?.graficoProjecaoRecebimentos === 1 && (
                                       <INPUTCHECKBOX
                                          id="graficoProjecaoRecebimentos"
                                          name="graficoProjecaoRecebimentos"
                                          label="Liberar acesso ao gráfico de projeção de recebimentos"
                                          defaultChecked={usuarioCli?.menu?.financeiro?.graficoProjecaoRecebimentos}
                                          valueChecked={usuarioCli?.menu?.financeiro?.graficoProjecaoRecebimentos}
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
                                          defaultChecked={usuarioCli?.menu?.vendas?.rankingVendedores}
                                          valueChecked={usuarioCli?.menu?.vendas?.rankingVendedores}
                                       />
                                    )}
                                    {menu?.vendas?.graficoLucratividadeMensal === 1 && (
                                       <INPUTCHECKBOX
                                          id="graficoLucratividadeMensal"
                                          name="graficoLucratividadeMensal"
                                          label="Liberar acesso ao gráfico de lucratividade mensal"
                                          defaultChecked={usuarioCli?.menu?.vendas?.graficoLucratividadeMensal}
                                          valueChecked={usuarioCli?.menu?.vendas?.graficoLucratividadeMensal}
                                       />
                                    )}
                                    {menu?.vendas?.ticketMedio === 1 && (
                                       <INPUTCHECKBOX
                                          id="ticketMedio"
                                          name="ticketMedio"
                                          label="Liberar acesso ao ticket médio"
                                          defaultChecked={usuarioCli?.menu?.vendas?.ticketMedio}
                                          valueChecked={usuarioCli?.menu?.vendas?.ticketMedio}
                                       />
                                    )}
                                    {menu?.vendas?.rankingProdutos === 1 && (
                                       <INPUTCHECKBOX
                                          id="rankingProdutos"
                                          name="rankingProdutos"
                                          label="Liberar acesso ao ranking de produtos"
                                          defaultChecked={usuarioCli?.menu?.vendas?.rankingProdutos}
                                          valueChecked={usuarioCli?.menu?.vendas?.rankingProdutos}
                                       />
                                    )}
                                    {menu?.vendas?.rankingSecoes === 1 && (
                                       <INPUTCHECKBOX
                                          id="rankingSecoes"
                                          name="rankingSecoes"
                                          label="Liberar acesso ao ranking de seções"
                                          defaultChecked={usuarioCli?.menu?.vendas?.rankingSecoes}
                                          valueChecked={usuarioCli?.menu?.vendas?.rankingSecoes}
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

EditarUsuario.propTypes = {
   history: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
   location: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
