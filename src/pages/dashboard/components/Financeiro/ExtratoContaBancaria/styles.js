import styled from 'styled-components';
import { Button, Col, Container, Row, Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import Form from '../../../../../components/Form';

export const TEXT = styled.h6`
   text-align: center !important;
   font-family: 'Mulish', sans-serif !important;
   font-weight: 500;
   font-size: 20px;
   color: #52616a !important;
   margin: none;
   padding: none;
`;

export const CONTAINER = styled(Container)``;

export const CONTENT = styled.div`
   display: flex;
   justify-content: space-between !important;
   align-items: center !important;
   text-align: center !important;
`;

export const DIV = styled.div``;

export const COL = styled(Col)``;

export const ROW = styled(Row)``;

export const CARDTHCENTER = styled.th`
   text-align: center !important;
`;

export const CARDTABLE = styled(Table)`
   align-items: center !important;
   border: none !important;
   border-color: transparent !important;
   border-radius: 50px !important;

   td,
   th {
      vertical-align: middle;
      border-left: 0;
      border-right: 0;
      color: #555 !important;
   }

   tbody tr:first-child td,
   tbody tr:first-child th {
      border-top: 0;
      border-bottom: 0;
      border: none !important;
      border-color: transparent !important;
   }

   thead {
      th {
         font-family: 'Mulish', sans-serif !important;
         font-weight: 900 !important;
         color: #fff !important;
         background-color: #0c1233 !important;
      }
   }
`;

export const CARDROW = styled(Row)`
   display: flex;
   align-items: center;
   justify-content: flex-end;
`;

export const CARDCOL = styled(Col)``;

export const BUTTON = styled(Button)`
   background: ${props => (props.background ? props.background : '#21c7c2')};
   color: ${props => props.color};
   margin-top: 1rem;
`;

export const TD = styled.td`
   background-color: ${props => props.backgroundColor};

   p {
      font-family: 'Mulish', sans-serif !important;
      margin-block-end: 0px !important;
      white-space: normal;
      font-size: 14px;
      font-weight: ${props => props.fontweight} !important;
      color: ${props => props.color} !important;
   }

   h5 {
      font-family: 'Mulish', sans-serif !important;
      font-size: 14px;
      font-weight: 900 !important;
      color: ${props => props.color} !important;
   }
`;

export const THEAD = styled.thead`
   th {
      padding: 7px !important;
   }
`;

export const TBODY = styled.tbody`
   td {
      padding: 7px !important;
   }
`;

export const TH = styled.th``;

export const TR = styled.tr``;

export const FORM = styled(Form)`
   margin-top: 1.5rem;
`;

export const TABCONTENT = styled(TabContent)``;

export const TABPANE = styled(TabPane)``;

export const NAV = styled(Nav)`
   height: 42px !important;
   margin-top: 15px !important;
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
