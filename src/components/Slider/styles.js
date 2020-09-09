import styled from 'styled-components';

export const TEXT = styled.h2`
   text-align: end;
   font-family: 'Mulish', sans-serif !important;
   text-transform: uppercase !important;
   font-size: 14px;
   font-weight: 900 !important;
   color: #000;

   @media (max-width: 767.98px) {
      font-size: 10px;
   }
`;

export const CONTAINER = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: auto;
   width: 100%;
   margin-bottom: 10px;
`;
