import styled from 'styled-components';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';

export const CARDACCOUNT = styled(Card)`
   border: 0.8pt solid #eee !important;
   margin-bottom: 1.5rem !important;
   background-color: #fff !important;
   border-radius: 5px !important;
   box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.04);
   -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.04);
   -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.04);
`;

export const CARDACCOUNTBUTTON = styled(Button)`
   border-radius: 0.375rem;
   border-top: 1px solid #eee !important;
   background-color: ${props => props.background} !important;
   width: 100%;
   font-family: 'Mulish', sans-serif !important;
   font-weight: 400 !important;
   font-size: 10px !important;
   color: #52616a !important;
`;

export const CARDACCOUNTBODY = styled(CardBody)`
   margin-top: 0px !important;
   padding: 0px !important;
`;

export const CARDACCOUNTBODYCOL = styled(Col)`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const CARDACCOUNTGROUP = styled.div``;

export const CARDACCOUNTSALDO = styled.h2`
   font-family: 'Mulish', sans-serif !important;
   font-size: 18px;
   font-weight: 900 !important;
   color: ${props => props.color};
   max-width: 15ch;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`;

export const CARDACCOUNTTYPE = styled.h6`
   font-family: 'Mulish', sans-serif !important;
   font-weight: 500;
   font-size: 12px;
   color: #52616a !important;
   margin: none;
   padding: none;
`;

export const CARDACCOUNTTITLE = styled.h6`
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

export const DIV = styled.div`
   margin-bottom: 10px;
   border-radius: 5px;
   background-color: ${props => props.background} !important;
   height: 20px;
   width: 40px;
`;
