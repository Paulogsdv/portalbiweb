import styled from 'styled-components';
import { Button, Card, Col, Container, Row, NavLink } from 'reactstrap';

// Components
import Form from '../../../components/Form';

import Input from '../../../components/Input/InputBasic';

export const FORM = styled(Form)`
   div {
      /* Necessário para remover o css do chrome no autocomplete do campo */
      background: rgba(255, 255, 255, 0) !important;
   }

   div.form-group {
      border-bottom: 1px solid #52616a !important;
   }
`;

export const INPUT = styled(Input)`
   background: transparent !important;

   ::-webkit-input-placeholder {
      color: #fff;
   }

   :-moz-placeholder {
      /* Firefox 18- */
      color: #fff;
   }

   ::-moz-placeholder {
      /* Firefox 19+ */
      color: #fff;
   }

   :-ms-input-placeholder {
      color: #fff;
   }

   color: #fff !important;
`;

export const BUTTON = styled(Button)`
   background-color: rgba(255, 255, 255, 0.2) !important;
   border: none !important;
   height: 45px;
   z-index: 9999;
`;

export const BUTTONSAVE = styled(Button)`
   width: 100%;
   height: 60px;
   background-color: #19878b !important;
   color: #fff !important;
   border: none !important;
   z-index: 9999;
`;

export const CARD = styled(Card)`
   background-color: transparent !important;
   border: none !important;
   border-top-right-radius: 50px !important;
   border-bottom-left-radius: 50px !important;
`;

export const CONTAINER = styled(Container)``;

export const COL = styled(Col)``;

export const ROW = styled(Row)`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 4px;
`;

export const NAVLINK = styled(NavLink)``;

export const DIV = styled.div``;

export const IMG = styled.img``;
