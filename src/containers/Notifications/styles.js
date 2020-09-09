import styled, { css } from 'styled-components';
import { lighten } from 'polished';

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

export const CONTAINER = styled.div`
   position: relative;
   margin-right: 5px;
`;

export const DIV = styled.div``;

export const P = styled.p`
   color: ${props => props.color || '#fff'} !important;
   text-transform: ${props => (props.uppercase ? 'uppercase' : null)};
`;

export const SPAN = styled.span``;

export const BADGE = styled.button`
   border: 0;
   background: none;
   position: relative;
   ${props =>
      props.hasUnread &&
      css`
      &::after {
        position: absolute;
        right: -2px;
        top: -2px;
        width: 15px;
        height: 15px;
        background: #f5365c;
        content: "${props.notifications >= 10 ? '' : props.notifications}";
        font-size: 10px;
        color: #fff;
        border-radius: 50%;
      }
    `}
`;

export const NOTIFICATIONLIST = styled.div`
   position: absolute;
   width: 260px;
   left: calc(50% - 130px);
   top: calc(100% + 30px);
   background: rgba(10, 21, 51, 0.9);
   border-radius: 4px;
   padding: 15px 5px;
   display: ${props => (props.visible ? 'block' : 'none')};

   &::before {
      content: '';
      position: absolute;
      left: calc(50% - 20px);
      top: -20px;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 20px solid rgba(0, 0, 0, 0.9);
   }

   @media (max-width: 767.98px) {
      top: calc(100% + 20px);
      left: -167px !important;
      margin-right: 1px !important;

      &::before {
         content: '';
         position: absolute;
         left: calc(100% - 97px);
         top: -20px;
         width: 0;
         height: 0;
         border-left: 20px solid transparent;
         border-right: 20px solid transparent;
         border-bottom: 20px solid rgba(0, 0, 0, 0.9);
      }
   }
`;

export const SCROLL = styled.div`
   max-height: 260px;
   overflow: auto;
   padding: 5px 15px;
   & {
      ::-webkit-scrollbar-track {
         background-color: rgba(255, 255, 255, 0.1);
         border-radius: 5px;
      }
      ::-webkit-scrollbar {
         width: 6px;
         border-radius: 5px;
         background: rgba(255, 255, 255, 0.1);
      }
      ::-webkit-scrollbar-thumb {
         border-radius: 5px;
         background: rgba(0, 0, 0, 0.6);
      }
   }
   span {
      color: gray;
      color: #eee;
      font-size: 0.8rem;
   }
   div:first-child {
      top: -90px;
      display: block;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      p {
         font-size: 15px;
         font-weight: 800;
         border: 0;
         background: none;
         color: ${lighten(0.2, '#7159c1')};
      }
   }

   div {
      justify-content: center;
   }
`;

export const BUTTON = styled.button`
   text-align: center;
   font-size: 12px;
   border: 0;
   text-decoration: underline;
   background: none;
   color: ${lighten(0.1, '#aaa')};
   padding-left: 0px !important;
   margin-left: 0px !important;
   margin-top: 20px !important;
   white-space: normal;
   font-weight: 700 !important;
`;

export const NOTIFICATION = styled.div`
   & + div {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
   }
   div {
      justify-content: space-between !important;
      p {
         font-weight: 800 !important;
         font-size: 10px !important;
         line-height: 20px;
         margin-block-end: 0px !important;
      }
   }
   p {
      font-weight: 800 !important;
      font-size: 12px;
      line-height: 20px;
      margin-block-end: 0px !important;
   }
   span {
      font-size: 10px;
      line-height: 0 !important;
      color: #bbb;
   }
   time {
      font-size: 1.2rem;
      opacity: 0.6;
      display: block;
      margin-bottom: 5px;
   }
   button {
      font-size: 0.7rem;
      border: 0;
      background: none;
      color: ${lighten(0.2, '#21C7C2')};
   }
   ${props =>
      props.unread &&
      css`
         &::after {
            content: '';
            display: inline-block;
            height: 7px;
            width: 7px;
            background: red;
            border-radius: 50%;
            margin-left: 10px;
         }
      `}
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

export const TBODY = styled.tbody`
   tr {
      td {
         p {
            white-space: normal;
            font-weight: 500 !important;
            font-size: 14px;
            color: ${props => props.color} !important;
            margin-block-end: 0px !important;
         }
      }
   }
`;

export const TD = styled.td`
   max-width: 20ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

export const TH = styled.th``;

export const TR = styled.tr``;

export const MODALTEXT = styled.span`
   font-size: 16px;
   color: #21486b;
   margin: 15px;

   max-width: 25ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

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
