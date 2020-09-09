import styled from 'styled-components';
import { Button, Card, CardBody, Col, Nav, NavItem, NavLink, Row } from 'reactstrap';

export const CARDSALES = styled(Card)`
   border: 0.8pt solid #eee !important;
   margin-bottom: 1.5rem !important;
   background-color: #fff !important;
   border-radius: 5px !important;
   box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.04);
   -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.04);
   -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.04);
`;

export const CARDSALESBUTTON = styled(Button)`
   border-radius: 0.375rem;
   border-top: 1px solid #eee !important;
   background-color: ${props => props.background} !important;
   width: 100%;
   font-family: 'Mulish', sans-serif !important;
   font-weight: 400 !important;
   font-size: 10px !important;
   color: #52616a !important;
`;

export const CARDSALESBODY = styled(CardBody)`
   margin-top: 10px !important;
   padding: 0px !important;
   white-space: normal !important;
`;

export const CARDSALESGROUP = styled(Row)`
   display: flex;
   align-items: center;
   justify-content: space-around;
`;

export const CARDSALESDATE = styled.h2`
   font-family: 'Mulish', sans-serif !important;
   font-size: 10px;
   font-weight: 900 !important;
   color: #000;
`;

export const CARDSALESTYPE = styled.h6`
   font-family: 'Mulish', sans-serif !important;
   text-align: center !important;
   font-weight: 500;
   font-size: 12px !important;
   color: #52616a !important;
   margin: none;
   padding: none;
`;

export const CARDSALESTITLE = styled.h6`
   font-family: 'Mulish', sans-serif !important;
   font-size: 14px;
   font-weight: 700 !important;
   text-transform: uppercase !important;
   color: #52616a;
   max-width: 25ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

export const CARDGROUP = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;

   padding: 10px 10px 7px 10px;
   width: 100%;
`;

export const CARDBODYROW = styled(Row)``;

export const CARDBODYCOL = styled(Col)``;

export const SPAN = styled.span`
   color: #bbb;
   margin-left: 1rem;
`;

export const CARDSALDO = styled.h2`
   font-family: 'Mulish', sans-serif !important;
   font-size: 18px !important;
   font-weight: 900 !important;
   color: ${props => (props.color ? props.color : '#0b1333')} !important;
   max-width: 30ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

export const CARDCONTAINER = styled(Col)`
   margin-top: 10px;
   margin-bottom: 10px;
   padding-right: 0px !important;
   padding-left: 0px !important;
`;

export const NAV = styled(Nav)`
   height: 42px !important;
   margin-bottom: 25px !important;
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
