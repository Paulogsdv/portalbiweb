export function settingInRequest(idUsuario) {
   return {
      type: '@setting/SETTING_IN_REQUEST',
      payload: { idUsuario },
   };
}

export function settingInValidation(empresaPadrao, limiteCtb, adm, url, cnpj, menu) {
   return {
      type: '@setting/SETTING_IN_VALIDATION',
      payload: { empresaPadrao, limiteCtb, adm, url, cnpj, menu },
   };
}

export function settingSuccess(limiteCtb, adm, empresa, url, menu, configuracoes) {
   return {
      type: '@setting/SETTING_SUCCESS',
      payload: { limiteCtb, adm, empresa, url, menu, configuracoes },
   };
}

export function userAdmin(idClientePre, limiteCtb, adm, url, cnpj, menu) {
   return {
      type: '@setting/USER_ADMIN',
      payload: { idClientePre, limiteCtb, adm, url, cnpj, menu },
   };
}

export function userComercial(adm) {
   return {
      type: '@setting/USER_ADMIN',
      payload: { adm },
   };
}

export function releasedCompanySuccess(empresaLiberada) {
   return {
      type: '@setting/RELEASED_COMPANY_SUCCESS',
      payload: { empresaLiberada },
   };
}

export function settingSearch(empresaSearch) {
   return {
      type: '@setting/SETTING_SEARCH',
      payload: { empresaSearch },
   };
}

export function settingSearchSuccess(empresaSearch) {
   return {
      type: '@setting/SETTING_SEARCH_SUCCESS',
      payload: { empresaSearch },
   };
}

export function handleSearch(active) {
   return {
      type: '@setting/HANDLE_SEARCH',
      payload: { active },
   };
}
