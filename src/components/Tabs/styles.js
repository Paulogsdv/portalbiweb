import styled from 'styled-components';
import { Nav, NavItem, NavLink } from 'reactstrap';

export const NAV = styled(Nav)`
   height: auto !important;
   margin-top: ${props => props.margin && '20px'} !important;
   margin-bottom: 25px !important;
   border-bottom: 1px solid #21c7c2 !important;
   flex-wrap: wrap !important;

   li {
      border: none !important;
      flex-wrap: wrap !important;

      a {
         cursor: pointer !important;
         display: flex !important;
         justify-content: center !important;
         align-items: center !important;
         border-top: 1px solid #eee !important;
         border-right: 1px solid #eee !important;
         border-left: 1px solid #eee !important;
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
   flex-wrap: wrap !important;
   @media (max-width: 767.98px) {
      a {
         font-size: 10px !important;
         max-width: 12ch;
         /* overflow: hidden;
         text-overflow: ellipsis; */
      }
   }
`;

export const NAVLINK = styled(NavLink)``;
