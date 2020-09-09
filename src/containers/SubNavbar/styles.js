import styled from 'styled-components';
import {
   Button,
   Col,
   Container,
   Nav,
   Navbar,
   Row,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Media,
} from 'reactstrap';

import Form from '../../components/Form';

export const CONTAINER = styled(Container)`
   display: flex !important;
   justify-content: space-between !important;
   align-items: center !important;

   @media (max-width: 430px) {
      justify-content: center !important;
      align-items: center !important;
   }
`;

export const BUTTON = styled(Button)`
   background-color: #21c7c2 !important;
   border: none !important;
`;

export const FORM = styled(Form)`
   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 50px;
   border: 2px solid #21c7c2;
   background-color: rgba(255, 255, 255, 0.1);

   button {
      margin: 3px;
      border-radius: 50px;
   }
`;

export const NAV = styled(Nav)`
   align-items: center !important;
`;

export const NAVBAR = styled(Navbar)`
   display: flex;
   position: relative;
   align-items: center;
   justify-content: space-between;
   height: 60px !important;
   background: #fff !important;
   background: linear-gradient(#17223f, #17223f) !important;

   @media (max-width: 767px) {
      height: 100% !important;
   }
`;

export const TEXT = styled.h6`
   font-size: 14px;
   color: #fff;
   word-wrap: break-word !important;
   white-space: normal !important;

   @media (max-width: 430px) {
      text-align: center !important;
      flex-basis: 100% !important;
   }
`;

export const ROW = styled(Row)``;

export const COL = styled(Col)`
   padding-left: 0px !important;
   padding-right: 0px !important;
`;

export const SPAN = styled.span``;

export const H6 = styled.h6`
   text-overflow: ellipsis;
   margin: 0 !important;
`;

export const I = styled.i``;

export const IMG = styled.img``;

export const UNCONTROLLEDDROPDOWN = styled(UncontrolledDropdown)``;

export const DROPDOWNTOGGLE = styled(DropdownToggle)``;

export const DROPDOWNMENU = styled(DropdownMenu)``;

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
