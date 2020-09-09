import styled from 'styled-components';
import {
   Container,
   Col,
   Collapse,
   Nav,
   Navbar,
   NavbarBrand,
   NavItem,
   NavLink,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Media,
} from 'reactstrap';
import MdClose from '@meronex/icons/md/MdClose';
import MdMenu from '@meronex/icons/md/MdMenu';

export const NAV = styled(Nav)`
   li {
      padding: 5px !important;
      a.active {
         span {
            color: #21c7c2 !important;
         }
         svg {
            color: #21c7c2 !important;
         }
      }
   }

   /* Não permite acessas essas paginas quando for menor que essa resolução */
   @media (max-width: 767.98px) {
      li#contasbancarias,
      li#contaspagar {
         visibility: hidden !important;
         display: none !important;
      }
   }
`;

export const PMdClose = styled(MdClose)`
   color: #000;
`;

export const PMdMenu = styled(MdMenu)`
   color: #21c7c2;
`;

export const CONTAINER = styled(Container)``;

export const COL = styled(Col)`
   display: flex;
   align-items: flex-end;
   justify-content: flex-end;
`;

export const COLLAPSE = styled(Collapse)`
   li {
      background: transparent !important;
      border: none !important;
      border-radius: 0px !important;
   }
`;

export const GROUP = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const NAVBARBRAND = styled(NavbarBrand)``;

export const NAVBAR = styled(Navbar)`
   padding: 0px 5px 0px 5px !important;
   z-index: 999;
   background: linear-gradient(#0d1234, #0a1533);
   border-bottom: 1px solid #1f2b49;
   height: 70px !important;
`;

export const NAVBARCOLLAPSE = styled.div`
   display: none;

   @media (max-width: 767.98px) {
      display: block;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
   }
`;

export const NAVITEM = styled(NavItem)``;

export const NAVLINK = styled(NavLink)`
   border: 1px solid rgba(0, 0, 0, 0.1);
   border-radius: 5px;
   padding: 10px !important;
   margin: 5px !important;

   :hover {
      background: rgba(0, 0, 0, 0.1);
   }
`;

export const NAVTEXT = styled.span`
   color: ${props => props.color};
   margin-left: 5px !important;
   font-size: 14px !important;
`;

export const SCROLL = styled.div`
   height: 100%;
`;

export const TEXT = styled.h4`
   font-size: 14px;
   color: #fff;
   font-weight: 700;
   font-family: 'Open Sans', sans-serif !important;
   margin-top: 10px;
`;

export const IMAGE = styled.img`
   width: 110px;
   height: auto;
`;

export const H6 = styled.h6`
   color: #212529;
   text-overflow: ellipsis;
   margin: 0 !important;
`;

export const I = styled.i``;

export const IMG = styled.img``;

export const UNCONTROLLEDDROPDOWN = styled(UncontrolledDropdown)`
   a {
      padding-right: 0px !important;
   }
`;

export const DROPDOWNTOGGLE = styled(DropdownToggle)``;

export const DROPDOWNMENU = styled(DropdownMenu)`
   @media (max-width: 767.98px) {
      a#configuracoes {
         visibility: hidden !important;
         display: none !important;
      }
   }
`;

export const DROPDOWNITEM = styled(DropdownItem)`
   span,
   i {
      color: #212529 !important;
   }
`;

export const MEDIACENTER = styled(Media)`
   align-items: center !important;
`;

export const MEDIA = styled(Media)`
   margin-left: 10px;
   display: none !important;

   @media (min-width: 992px) {
      display: block !important;
   }
`;

export const SPAN = styled.span``;

export const DIV = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;
