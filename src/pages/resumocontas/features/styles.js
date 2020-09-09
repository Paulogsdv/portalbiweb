import styled from 'styled-components';
import { Button, Col, Container, Row, ModalHeader, ModalFooter, Modal, ModalBody, Table } from 'reactstrap';

export const CONTAINER = styled(Container)`
   margin-top: 20px !important;
`;

export const COL = styled(Col)``;

export const ROW = styled(Row)`
   padding: ${props => (props.padding ? '1rem ' : null)};
   border-top: ${props => (props.bordertop ? '0.15pt solid #eee' : null)};
   border-bottom: ${props => (props.borderbottom ? '0.15pt solid #eee' : null)};
`;

export const BUTTON = styled(Button)`
   background: #eeeeef !important;
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
   justify-content: space-between !important;
   align-items: center !important;
`;

export const TEXT = styled.span`
   font-size: 16px;
   color: #555;
   margin: 15px;
`;

export const MODALTEXT = styled.span`
   font-size: 16px;
   color: ${props => (props.color ? '#fff' : '#1e2022')};
   word-wrap: break-word;
   vertical-align: middle;
   font-weight: ${props => (props.fontweight ? 700 : 400)} !important;
   font-family: 'Open Sans', sans-serif !important;
`;

export const MODALTEXTOBS = styled.span`
   font-size: 16px;
   color: #555;
   margin: 15px;

   max-width: 150ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

export const TOTAL = styled.div`
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: space-between;

   background: #eeeeef !important;
   border-radius: 10px;
   margin-bottom: 1rem;
`;

export const MODALOBS = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;

   background: #21486b;
   border: 1px solid #fff;

   span {
      font-size: 12px;
      text-transform: uppercase;
      color: #fff;
   }
`;

export const MODAL = styled(Modal)`
   z-index: 5;
   border: 1px solid #fff;
   border-radius: 10px !important;

   .close > span:not(.sr-only) {
      color: #000 !important;
   }
`;

export const MODALBODY = styled(ModalBody)`
   background-color: #fff;
`;

export const MODALHEADER = styled(ModalHeader)`
   background-color: #eee;
`;

export const MODALFOOTER = styled(ModalFooter)`
   background-color: #eee;
   border-radius: 10px !important;
`;

export const MODALTABLE = styled(Table)`
   align-items: center !important;

   td,
   th {
      vertical-align: middle;
      border-left: 0;
      border-right: 0;
      color: ${props => (props.color ? '#fff' : '#1e2022')};
      max-width: 25ch;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 400;
      font-family: 'Open Sans', sans-serif !important;
   }

   tbody tr:first-child td,
   tbody tr:first-child th {
      border-top: 0;
      border-bottom: 0;
   }

   thead {
      th {
         color: #fff !important;
         background-color: #21486b !important;
         border-color: #fff;
      }
   }
`;

export const THEAD = styled.thead``;

export const TBODY = styled.tbody``;

export const TD = styled.td`
   max-width: 20ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

export const TH = styled.th``;

export const TR = styled.tr``;

export const OPTIONS = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   margin-bottom: 10px;
`;

export const CARDTHCENTER = styled.th`
   text-align: center !important;
`;

export const CARDTDCENTER = styled.td`
   text-align: center !important;
`;

export const DIV = styled.div``;
