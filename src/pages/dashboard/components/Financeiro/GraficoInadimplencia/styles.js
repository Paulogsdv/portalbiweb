import styled from 'styled-components';
import { ModalHeader, ModalFooter, Modal, ModalBody, Table } from 'reactstrap';

export const MODALTEXT = styled.span`
   font-size: 16px;
   color: #21486b;
   margin: 15px;

   max-width: 25ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

export const MODALTOTAL = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;

   background: #21486b;
   border: 1px solid #fff;
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
   padding: ${props => (props.nopadding !== false ? '0rem !important' : null)};
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
   border-top: 0px solid transparent !important;

   td,
   th {
      vertical-align: middle;
      border-left: 0;
      border-right: 0;
      color: #555 !important;
      border-top: 0px solid transparent !important;
   }

   tbody tr:first-child td,
   tbody tr:first-child th {
      border-top: 0;
      border-bottom: 0;
      border-color: transparent !important;
      border: none !important;
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
