/* eslint-disable no-shadow, no-unused-vars */
import React, { useState } from 'react';
import { Link, NavLink as NavLinkRRD } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Icones
import FiPieChart from '@meronex/icons/fi/FiPieChart';
import FiCalendar from '@meronex/icons/fi/FiCalendar';
import FiDollarSign from '@meronex/icons/fi/FiDollarSign';
import FiLogOut from '@meronex/icons/fi/FiLogOut';
import FiSearch from '@meronex/icons/fi/FiSearch';
import BsCardChecklist from '@meronex/icons/bs/BsCardChecklist';
import TiArrowSortedDown from '@meronex/icons/ti/TiArrowSortedDown';
import GoGear from '@meronex/icons/go/GoGear';

// Redux
import { logoutInRequest } from '../../hooks/modules/auth/actions';
import { handleSearch } from '../../hooks/modules/setting/actions';

// Páginas que irão aparecer no menu lateral
import { DASHBOARD } from '../../pages/dashboard';
import { CONTASPAGAR } from '../../pages/contaspagar';
import { CONTASBANCARIAS } from '../../pages/contasbancarias';
import { RESUMOCONTAS } from '../../pages/resumocontas';

// Logo
import LogoPreto from '../../assets/images/logoPreto.png';
import LogoBranco from '../../assets/images/logoBranco.png';
import logoUser from '../../assets/images/user.png';

// Componentes
import { NOTIFICATIONS } from '..';

// Styles
import {
   PMdMenu,
   CONTAINER,
   COLLAPSE,
   GROUP,
   NAVBARBRAND,
   NAV,
   NAVBAR,
   NAVBARCOLLAPSE,
   NAVITEM,
   NAVLINK,
   NAVTEXT,
   IMAGE,
   UNCONTROLLEDDROPDOWN,
   DROPDOWNTOGGLE,
   MEDIA,
   MEDIACENTER,
   H6,
   SPAN,
   DROPDOWNITEM,
   DROPDOWNMENU,
   TEXT,
   IMG,
   DIV,
} from './styles';

export default function Sidebar() {
   const dispatch = useDispatch();
   const { menu, adm, subNavbar } = useSelector(state => state.setting);
   const { profile } = useSelector(state => state.user);
   const [collapseOpen, setCollapseOpen] = useState(false);

   function handleLogout() {
      dispatch(logoutInRequest());
   }

   function activeSubNavbar() {
      dispatch(handleSearch(!subNavbar));
   }

   const toggleCollapse = () => {
      setCollapseOpen(collapseOpen => !collapseOpen);
   };

   const closeCollapse = () => {
      setCollapseOpen(false);
   };

   function mobileCheck() {
      if (window.innerWidth <= 768) {
         return true;
      }
      return false;
   }

   // Criação dos links das rotas
   function createLinks() {
      // So tem acesso as rotas os usuários com adm igual a 0
      // No css do Navbar existem rotas que são bloqueadas na versão mobile
      if (adm === 0) {
         // Sempre tem o default como dashboard
         const RouteSidebar = [
            {
               path: '/dashboard',
               name: 'Dashboard',
               icon: <FiPieChart color="#52616a" size={20} />,
               component: DASHBOARD,
            },
         ];

         // A partir daqui começa a validação do menu liberado por usuario via centrun
         if (menu?.financeiro?.contasBancarias === 1) {
            RouteSidebar.push({
               id: 'contasbancarias',
               path: '/contasbancarias',
               name: 'Contas bancárias',
               icon: <FiDollarSign color="#52616a" size={20} />,
               component: CONTASBANCARIAS,
            });
         }

         if (menu?.financeiro?.contasPagar === 1) {
            RouteSidebar.push({
               id: 'contaspagar',
               path: '/contaspagar',
               name: 'Contas a pagar',
               icon: <BsCardChecklist color="#52616a" size={20} />,
               component: CONTASPAGAR,
            });
         }

         if (menu?.financeiro?.resumoContas === 1) {
            RouteSidebar.push({
               path: '/resumocontas',
               name: 'Resumo de contas',
               icon: <FiCalendar color="#52616a" size={20} />,
               component: RESUMOCONTAS,
            });
         }

         return RouteSidebar?.map(prop => {
            return (
               <NAVITEM key={prop.path} id={prop.id}>
                  <NAVLINK to={prop.path} tag={NavLinkRRD} onClick={closeCollapse} activeClassName="active">
                     {prop.icon}
                     {collapseOpen || mobileCheck() ? (
                        <NAVTEXT style={{ color: '#52616a' }}> {prop.name} </NAVTEXT>
                     ) : null}
                  </NAVLINK>
               </NAVITEM>
            );
         });
      }
      return null;
   }

   return (
      <NAVBAR expand="md" id="sidenav-main">
         <CONTAINER fluid>
            {collapseOpen ? (
               <GROUP>
                  <PMdMenu className="navbar-toggler" size={30} onClick={() => toggleCollapse()} />
                  <NAVBARBRAND>
                     <PMdMenu size={30} onClick={() => toggleCollapse()} />
                     <IMAGE alt="Logo" src={LogoBranco} />
                  </NAVBARBRAND>
               </GROUP>
            ) : (
               <NAVBARBRAND>
                  <PMdMenu size={30} onClick={() => toggleCollapse()} />
                  <IMAGE alt="Logo" src={LogoBranco} />
               </NAVBARBRAND>
            )}
            <COLLAPSE navbar isOpen={collapseOpen}>
               <NAVBARCOLLAPSE>
                  <PMdMenu size={30} color="#21c7c2" onClick={() => toggleCollapse()} />
                  <IMAGE alt="Logo" src={LogoPreto} />
               </NAVBARCOLLAPSE>
               <NAV navbar className="ml-auto mr-auto">
                  {/* Criação dos links das rotas */}
                  {createLinks()}
                  {/* Habilita a procura por empresas  */}
                  {adm === 0 ? (
                     <NAVITEM style={{ cursor: 'pointer' }} onClick={() => [activeSubNavbar(), closeCollapse()]}>
                        <NAVLINK>
                           <FiSearch color="#5e72e4" size={20} />
                           {collapseOpen || mobileCheck() ? <NAVTEXT color="#5e72e4"> Pesquisar </NAVTEXT> : null}
                        </NAVLINK>
                     </NAVITEM>
                  ) : null}
               </NAV>
            </COLLAPSE>
            <DIV>
               <NOTIFICATIONS />
               <NAV navbar>
                  <UNCONTROLLEDDROPDOWN nav>
                     <DROPDOWNTOGGLE nav>
                        <MEDIACENTER>
                           <SPAN className="avatar avatar-sm rounded-circle">
                              <IMG alt="PortalBI" src={logoUser} />
                           </SPAN>
                           <MEDIA>
                              <TEXT>
                                 {profile !== null && profile.nome ? profile.nome : 'Usuário'}
                                 <TiArrowSortedDown color="#fff" size={20} />
                              </TEXT>
                           </MEDIA>
                        </MEDIACENTER>
                     </DROPDOWNTOGGLE>
                     <DROPDOWNMENU className="dropdown-menu-arrow" right>
                        <DROPDOWNITEM className="noti-title" header tag="div">
                           <H6>Bem vindo {profile !== null && profile.nome ? profile.nome : 'Usuário'}!</H6>
                        </DROPDOWNITEM>
                        {adm === 1 || adm === 2 ? null : (
                           <DROPDOWNITEM id="configuracoes" to="/configuracoes" tag={Link}>
                              <GoGear color="#000" size={18} />
                              <SPAN>Configurações</SPAN>
                           </DROPDOWNITEM>
                        )}
                        <DROPDOWNITEM divider />
                        <DROPDOWNITEM onClick={() => handleLogout()}>
                           <FiLogOut color="#000" size={16} />
                           <SPAN>Sair</SPAN>
                        </DROPDOWNITEM>
                     </DROPDOWNMENU>
                  </UNCONTROLLEDDROPDOWN>
               </NAV>
            </DIV>
         </CONTAINER>
      </NAVBAR>
   );
}
