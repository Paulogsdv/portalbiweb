import React from 'react';
import { Switch } from 'react-router-dom';

// Pages
import { LOGIN } from '../pages/login';
import { ADMINUSUARIOS, ADMINNOVOUSUARIO, ADMINEDITARUSUARIO } from '../pages/admin';
import { COMERCIALNOTIFICACOES, COMERCIALNOVANOTIFICACAO, COMERCIALEDITARNOTIFICACAO } from '../pages/comercial';
import { DASHBOARD, EXTRATOCONTABANCARIA } from '../pages/dashboard';
import { CONTASPAGAR, NOVACONTAPAGAR, EDITARCONTAPAGAR } from '../pages/contaspagar';
import { CONTASBANCARIAS, NOVACONTABANCARIA, EDITARCONTABANCARIA } from '../pages/contasbancarias';
import { RESUMOCONTAS } from '../pages/resumocontas';
import { CONFIGURACOES } from '../pages/configuracoes';

// Configuração das rotas
import Route from './Route';

export default function Routes() {
   return (
      <Switch>
         {/* Login */}
         <Route path="/" component={LOGIN} exact />

         {/* Admin */}
         <Route path="/usuarios" component={ADMINUSUARIOS} isPrivate exact />
         <Route path="/novousuario" component={ADMINNOVOUSUARIO} isPrivate exact />
         <Route path="/editarusuario" component={ADMINEDITARUSUARIO} isPrivate exact />

         {/* Comercial */}
         <Route path="/notificacoes" component={COMERCIALNOTIFICACOES} isPrivate exact />
         <Route path="/novanotificacao" component={COMERCIALNOVANOTIFICACAO} isPrivate exact />
         <Route path="/editarnotificacao" component={COMERCIALEDITARNOTIFICACAO} isPrivate exact />

         {/* Dashboard */}
         <Route path="/dashboard" component={DASHBOARD} isPrivate exact />

         {/* Extrato da conta bancaria acessado pelo saldo de conta bancaria */}
         <Route path="/extratocontabancaria" component={EXTRATOCONTABANCARIA} isPrivate exact />

         {/* Rotas das contas a pagar avulsas */}
         <Route path="/contaspagar" component={CONTASPAGAR} isPrivate exact />
         <Route path="/novacontapagar" component={NOVACONTAPAGAR} isPrivate exact />
         <Route path="/editarcontapagar" component={EDITARCONTAPAGAR} isPrivate exact />

         {/* Rotas das contas bancaria */}
         <Route path="/contasbancarias" component={CONTASBANCARIAS} isPrivate exact />
         <Route path="/novacontabancaria" component={NOVACONTABANCARIA} isPrivate exact />
         <Route path="/editarcontabancaria" component={EDITARCONTABANCARIA} isPrivate exact />

         {/* Resumo de contas */}
         <Route path="/resumocontas" component={RESUMOCONTAS} isPrivate exact />

         {/* Configurações */}
         <Route path="/configuracoes" component={CONFIGURACOES} isPrivate exact />

         {/* Rota inexistênte */}
         <Route path="*" component={DASHBOARD} isPrivate />
      </Switch>
   );
}
