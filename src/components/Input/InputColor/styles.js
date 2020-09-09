import styled, { css } from 'styled-components';
import { FormGroup, InputGroup, InputGroupText } from 'reactstrap';
import PrecisaTooltip from '../../Tooltip';

export const FORMGROUP = styled(FormGroup)`
   background: rgba(255,255,255,0.1) !important;
   border-bottom: 0.15pt solid rgba(0,0,0,0.1);

   /* Se tiver com o foco aplica a cor */
   ${props =>
      props.isfocused &&
      css`
         border-bottom: 2px solid #15c9ca;
      `}


   /* Se tiver erro aplica cor */
   ${props =>
      props.iserrored &&
      css`
         border-bottom: 2px solid #f00;
      `}

   /* Se tiver valor deixa a cor */
   ${props =>
      props.isfield &&
      css`
         border-bottom: 2px solid #15c9ca !important;
      `}

`;

export const INPUTGROUP = styled(InputGroup)`
   display: flex;
   align-items: center;
   background: rgba(255, 255, 255, 0.1) !important;
`;

export const INPUT = styled.input`
   margin-left: 10px;
   border: 0;
   transition: box-shadow 0.15s ease;
   height: 60px;
   font-size: 12px;
   width: 220px;
   background: transparent !important;
   color: #000;
`;

export const DIV = styled.div``;

export const SPAN = styled.span`
   padding: 15px 10px 10px 15px;
`;

export const INPUTGROUPTEXT = styled(InputGroupText)`
   background: transparent !important;
   border: none !important;
   display: flex;
   align-items: center;
   height: 60px;
   padding: 0.625rem 0.75rem;
   border-radius: 0 !important;

   /* Se tiver com o foco aplica a cor */
   ${props =>
      props.isfocused &&
      css`
         svg {
            color: #15c9ca !important;
         }
      `}


   /* Se tiver erro aplica cor */
   ${props =>
      props.iserrored &&
      css`
         svg {
            color: #f00 !important;
         }
      `}

   /* Se tiver valor deixa a cor */
   ${props =>
      props.isfield &&
      css`
         svg {
            color: #15c9ca !important;
         }
      `}
`;

export const ERROR = styled(PrecisaTooltip)`
   height: 24px;

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

export const LABEL = styled.label`
   padding: 20px 10px 10px 15px !important;
   margin-left: 10px;
   font-family: 'Mulish', sans-serif !important;
   font-size: 14px;
   font-weight: 500 !important;
   color: #aaa !important;
   visibility: ${props => (props.defaultValue !== '' && props.defaultValue !== undefined ? 'hidden' : null)} !important;

   /* Se tiver com o foco aplica a cor */
   ${props =>
      props.isfocused &&
      css`
         color: #15c9ca !important;
      `}


   /* Se tiver erro aplica cor */
   ${props =>
      props.iserrored &&
      css`
         color: #f00 !important;
      `}

   /* Se tiver valor deixa a cor */
   ${props =>
      props.isfield &&
      css`
         visibility: hidden !important;
         color: #000 !important;
      `}
`;
