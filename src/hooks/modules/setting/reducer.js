import produce from 'immer';

const INITIAL_STATE = {
   idClientePre: null, // Responsavel por vincular os usuarios padroes com o usuario admin
   limiteCtb: null, // Responsavel por limitar o cadastro de contas bancárias
   adm: null, // Reponsavel por diferenciar usuario padrão de admin
   url: null, // Url do servidor
   search: null, // Se existe procura por empresa ele substitui a empresa padrão nas pesquisas dos componentes
   menu: null, // Módulos liberados para o usuario
   empresaPadrao: null, // Empresa padrão para pesquisas dos componentes
   empresaLiberada: null, // Empresas liberadas para o usuario
   configuracoes: null, // Configurações do usuário
   subNavbar: false, // Controle do subNavbar para pesquisas de empresa
};

export default function auth(state = INITIAL_STATE, action) {
   return produce(state, draft => {
      switch (action.type) {
         case '@setting/SETTING_SEARCH_SUCCESS': {
            draft.search = action.payload.empresaSearch;
            break;
         }

         case '@setting/RELEASED_COMPANY_SUCCESS': {
            draft.empresaLiberada = action.payload.empresaLiberada;
            break;
         }

         case '@setting/SETTING_SUCCESS': {
            draft.limiteCtb = action.payload.limiteCtb;
            draft.adm = action.payload.adm;
            draft.url = action.payload.url;
            draft.menu = action.payload.menu;
            draft.empresaPadrao = action.payload.empresa;
            draft.configuracoes = action.payload.configuracoes;
            break;
         }

         case '@setting/USER_ADMIN': {
            draft.limiteCtb = action.payload.limiteCtb;
            draft.adm = action.payload.adm;
            draft.menu = action.payload.menu;
            draft.url = action.payload.url;
            draft.empresaPadrao = action.payload.cnpj;
            draft.idClientePre = action.payload.idClientePre;
            break;
         }

         case '@setting/USER_COMERCIAL': {
            draft.adm = action.payload.adm;
            break;
         }

         case '@setting/HANDLE_SEARCH': {
            draft.subNavbar = action.payload.active;
            break;
         }

         case '@auth/SIGN_OUT': {
            draft.idClientePre = null;
            draft.limiteCtb = null;
            draft.adm = null;
            draft.url = null;
            draft.search = null;
            draft.menu = null;
            draft.empresaPadrao = null;
            draft.configuracoes = null;
            draft.empresaLiberada = null;
            draft.subNavbar = false;
            break;
         }

         default:
      }
   });
}
