import styled from 'styled-components';
import { Col, Table } from 'reactstrap';

export const SPAN = styled.span`
   color: #bbb;
   margin-left: 1rem;
`;

export const CARDCONTAINER = styled(Col)`
   margin-top: 30px;
   margin-bottom: 10px;
   padding-right: 0px !important;
   padding-left: 0px !important;
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

export const TD = styled.td`
   p {
      font-family: 'Mulish', sans-serif !important;
      margin-block-end: 0px !important;
      white-space: normal;
      font-size: 12px;
      font-weight: 900 !important;
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
