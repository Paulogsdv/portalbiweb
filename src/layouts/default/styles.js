import styled from 'styled-components';
import { Container } from 'reactstrap';

export const CONTAINER = styled(Container)``;

export const USERCONTROL = styled.div``;

export const DIV = styled.div``;

export const CONTENT = styled.div`
   background: #f0f5f9 !important;
`;

export const SCROLLTOTOP = styled.a`
   border-radius: 50px;
   border: 1px solid #21c7c2;
   display: none;
   font-size: 32px;
   line-height: 45px;
   font-weight: bold;
   position: fixed;
   bottom: 10px;
   left: 10px;
   text-align: center;
   text-decoration: none;
   width: 55px;
   height: 55px;
   z-index: 999999;
   background: #0b1333;
   -webkit-transition: all 0.5s;
   -moz-transition: all 0.5s;
   -ms-transition: all 0.5s;
   -o-transition: all 0.5s;
   transition: all 0.5s;

   svg {
      text-align: center !important;
   }
`;
