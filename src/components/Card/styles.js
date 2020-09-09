import styled from 'styled-components';
import {
   Row,
   Col,
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Button,
   Pagination,
   PaginationItem,
   PaginationLink,
} from 'reactstrap';

import DatePicker from '../DatePicker/Card';
import Form from '../Form';

export const CARD = styled(Card)`
   margin-top: 15px !important;
   border: 0px !important;
   background-color: ${props => (props.background ? props.background : '#fff')} !important;
   box-shadow: ${props => (props.background ? null : '0px 0px 20px 5px rgba(0,0,0,0.05)')};
   -webkit-box-shadow: ${props => (props.background ? null : '0px 0px 20px 5px rgba(0,0,0,0.05)')};
   -moz-box-shadow: ${props => (props.background ? null : '0px 0px 20px 5px rgba(0,0,0,0.05)')};
`;

export const CARDHEADER = styled(CardHeader)`
   display: flex;
   align-items: center !important;
   justify-content: space-between !important;
   padding: 25px 20px 25px 20px !important;

   background: transparent !important;
   border-bottom: 1px solid #eee !important;

   /* Não permite escolher data na versão mobile */
   @media (max-width: 767.98px) {
      svg {
         visibility: hidden !important;
         display: none !important;
      }
   }
`;

export const CARDBODY = styled(CardBody)`
   background: transparent !important;
   padding: 30px !important;
`;

export const CARDFOOTER = styled(CardFooter)`
   display: flex;
   align-items: center !important;
   justify-content: space-between !important;

   -webkit-flex-direction: none !important;

   padding: 25px 20px 25px 20px !important;
   background: transparent !important;
   border-top: 1px solid #eee !important;

   height: auto !important;
`;

export const CARDCOL = styled(Col)``;

export const CARDROW = styled(Row)``;

export const CARDBUTTON = styled(Button)`
   border: ${props => (props.border ? '1px solid #21c7c2' : null)} !important;
   color: ${props => props.color};
   background: ${props => props.background};

   box-shadow: 0px 0px 30px 5px rgba(237, 242, 246, 0.8) !important;
`;

export const CARDHEADERCOL = styled(Col)`
   align-items: center !important;
`;

export const TEXT = styled.h6`
   font-family: 'Mulish', sans-serif !important;
   font-weight: ${props => props.fontW} !important;
   font-size: ${props => props.fontS && `${props.fontS}px`} !important;
   text-transform: uppercase !important;
   color: ${props => (props.color ? props.color : '#0a1533')} !important;
   margin-block-end: 0 !important;
   flex-wrap: wrap !important;
`;

export const FORM = styled(Form)`
   display: flex !important;
   align-items: center !important;
   justify-content: space-between !important;
   flex-wrap: wrap !important;

   width: ${props => (props.uniqueDate ? '440px' : '300px')} !important;
`;

export const DATEPICKER = styled(DatePicker)``;

export const CARDPAGINATION = styled(Pagination)`
   justify-content: flex-end !important;
`;

export const CARDPAGINATIONLINK = styled(PaginationLink)``;

export const CARDPAGINATIONITEM = styled(PaginationItem)``;

export const DIV = styled.div``;

export const SINALOFF = styled.div`
   display: flex;
   align-items: center !important;
   justify-content: space-between !important;

   background-color: ${props => (props.background ? props.background : null)};
   border-radius: 5px !important;
   padding: 5px 20px 5px 20px;
   margin-bottom: 20px;
   flex-wrap: wrap !important;
`;
