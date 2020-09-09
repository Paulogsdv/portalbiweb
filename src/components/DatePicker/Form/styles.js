import styled, { css } from 'styled-components';
import ReactDatePicker from 'react-datepicker';
import FiCalendar from '@meronex/icons/fi/FiCalendar';
import { Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

import Tooltip from '../../Tooltip';

export const BUTTON = styled(Button)`
   z-index: 3;
   border: none !important;
`;

export const PFiCalendar = styled(FiCalendar)`
   color: #1c2f67;
`;

export const REACTDATEPICKER = styled(ReactDatePicker)`
   width: 220px;
   height: 60px;
   background: #fff !important;
   border: none !important;
   border-radius: 0.375rem;
   color: #555;
   font-size: 14px;
   z-index: 9999;

   /* Se tiver valor deixa a cor */
   ${props =>
      props.isfield &&
      css`
         border: 2px solid #19878b !important;
      `}
`;

export const ERROR = styled(Tooltip)`
   height: 20px;
   svg {
      margin-right: 0;
   }
   span {
      background: #c53030;
      color: #fff;
      &::before {
         border-color: #c53030 transparent;
      }
   }
`;

export const SPAN = styled.span``;

export const TEXT = styled.span`
   font-size: 12px;
   color: #1c2f67;
`;

export const FORMGROUP = styled(FormGroup)`
   background: #fff !important;
   margin-bottom: 0rem !important;
   border: 0.15pt solid rgba(0,0,0,0.1);
   border-radius: 5px;

   /* Se tiver com o foco aplica a cor */
   ${props =>
      props.isfocused &&
      css`
         border: 2px solid #19878b;
      `}


   /* Se tiver erro aplica cor */
   ${props =>
      props.iserrored &&
      css`
         border: 2px solid #c53030;
      `}

   /* Se tiver valor deixa a cor */
   ${props =>
      props.isfield &&
      css`
         border: 2px solid #19878b !important;
      `}
`;

export const INPUTGROUP = styled(InputGroup)`
   display: flex;
   align-items: center;
   background: #fff !important;
`;

export const INPUT = styled.input`
   margin-left: 10px;
   border: 0;
   transition: box-shadow 0.15s ease;
   height: 60px;
   font-size: 12px;
   width: 220px;
   background: #fff !important;
   color: #555;
`;

export const INPUTGROUPADDON = styled(InputGroupAddon)``;

export const DIV = styled.div``;

export const INPUTGROUPTEXT = styled(InputGroupText)`
   background: #fff !important;
   border: none !important;
   display: flex;
   align-items: center;
   height: 60px;
   padding: 0.625rem 0.75rem;
   border-radius: 0 !important;

   /* Se tiver valor deixa a cor */
   ${props =>
      props.isfield &&
      css`
         background: #19878b !important;
      `}

   ${props =>
      props.iserrored &&
      css`
         background: #c53030 !important;
      `}
`;
