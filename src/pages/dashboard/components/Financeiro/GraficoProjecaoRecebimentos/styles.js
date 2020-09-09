import styled from 'styled-components';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

export const TABCONTENT = styled(TabContent)``;

export const TABPANE = styled(TabPane)``;

export const NAV = styled(Nav)`
   height: 42px !important;
   margin-bottom: 20px !important;
   border-bottom: 1px solid #21c7c2 !important;

   li {
      border: none !important;

      a {
         cursor: pointer !important;
         display: flex !important;
         justify-content: center !important;
         align-items: center !important;
         border: none !important;
         height: 100% !important;
      }

      a.active {
         cursor: pointer !important;
         border: none !important;
         display: flex !important;
         justify-content: center !important;
         align-items: center !important;
         text-align: center !important;
         height: 100% !important;
         color: #fff !important;
         background: #21c7c2 !important;
      }
   }
`;

export const NAVITEM = styled(NavItem)`
   @media (max-width: 767.98px) {
      a {
         font-size: 12px !important;
      }
   }
`;

export const NAVLINK = styled(NavLink)``;
