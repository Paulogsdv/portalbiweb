import styled from 'styled-components';
import { Button, Card, Col, Container, Row, Table } from 'reactstrap';

export const CARD = styled(Card)`
   background-color: #27293d !important;
   box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.1) !important;
   margin-top: 2rem !important;
   padding: 0 !important;
`;

export const BUTTON = styled(Button)`
   background: ${props => props.theme.contaBancaria.button.backgroundColor};
   color: ${props => props.color};
   margin-top: 1rem;
`;

export const CARDBUTTON = styled(Button)`
   background: ${props => props.background};
   color: ${props => props.color};
   margin-right: 5px;
`;

export const CONTENT = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: flex-end !important;
   align-items: center !important;
   margin-bottom: 10px;
`;

export const CONTAINER = styled(Container)``;

export const COL = styled(Col)``;

export const ROW = styled(Row)``;

export const CARDTHCENTER = styled.th`
   text-align: center !important;
`;

export const CARDTDCENTER = styled.td`
   text-align: center !important;
`;

export const CARDTH = styled.th``;

export const CARDTD = styled.td``;

export const CARDTBODY = styled.tbody``;

export const CARDTHEAD = styled.thead``;

export const CARDTR = styled.tr``;

export const CARDSPAN = styled.span``;

export const CARDCOLOR = styled.div`
   height: 20px;
   width: 20px;
   border-radius: 50px;
   background: ${props => props.background};
`;

export const CARDTABLE = styled(Table)`
   align-items: center !important;

   td,
   th {
      vertical-align: middle;
      border-left: 0;
      border-right: 0;
      color: #555;
      max-width: 25ch;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }

   tbody tr:first-child td,
   tbody tr:first-child th {
      border-top: 0;
      border-bottom: 0;
   }

   thead {
      th {
         color: #333 !important;
         background-color: #eee !important;
         border-color: #aaa;
      }
   }
`;

export const SPAN = styled.span`
   color: #bbb;
   margin-left: 1rem !important;
`;

export const DIV = styled.div`
   color: #bbb;
   padding: 20px;
`;

export const IMG = styled.img``;
