import styled from 'styled-components';
import {
   ModalHeader,
   ModalFooter,
   Modal,
   ModalBody,
   Pagination,
   PaginationItem,
   PaginationLink,
   Table,
} from 'reactstrap';

export const MODALTEXT = styled.span`
   font-size: 16px;
   color: ${props => props.color};
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
   display: flex !important;
   align-items: center !important;
   justify-content: space-between !important;
   border-radius: 10px !important;
`;

export const MODALTABLE = styled(Table)`
   align-items: center !important;

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

export const CARDH6 = styled.h6`
   font-weight: 600 !important;
   font-size: 12px;
   text-transform: uppercase !important;
   color: #555 !important;
`;

export const CARDPAGINATION = styled(Pagination)`
   display: flex;
   padding-left: 0;
   list-style: none;
   border-radius: 0.375rem;

   justify-content: flex-end !important;
`;

export const CARDPAGINATIONLINK = styled(PaginationLink)``;

export const CARDPAGINATIONITEM = styled(PaginationItem)``;
