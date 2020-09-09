import styled from 'styled-components';

export const APP = styled.div`
   font-size: 14px;
`;

export const CALENDAR = styled.div`
   margin: 0 auto;
   box-shadow: 0 0 0.3rem 0 rgba(255, 255, 255, 0.1) !important;
   background: #fff !important;
   border-radius: 10px;

   .fc {
      font-family: 'Open Sans', sans-serif !important;
      padding: 10px;
      color: #555;

      button {
         margin: 0;
         font-family: inherit;
         font-size: inherit;
         line-height: inherit;
         background: #32325d !important;
         overflow: visible;
         text-transform: none;
         -webkit-appearance: button;
         font-weight: 600 !important;

         button::-moz-focus-inner,
         [type='button']::-moz-focus-inner,
         [type='reset']::-moz-focus-inner,
         [type='submit']::-moz-focus-inner {
            padding: 0;
            border-style: none;
         }
      }
   }

   .fc-center {
      h2 {
         font-size: 24px;
         text-transform: uppercase;
         color: #52616a;

         @media (max-width: 767.98px) {
            font-weight: 600 !important;
            font-size: 12px;
         }
      }
   }

   .fc-event,
   .fc-agenda .fc-event-time,
   .fc-event a {
      font-weight: 600 !important;
      margin-top: 5px;
      padding: 5px;
      font-size: 0.7em;
      text-transform: uppercase;
   }

   .fc-time {
      visibility: hidden;
   }

   .fc-unthemed td.fc-today {
      background: rgba(0, 0, 0, 0.1) !important;

      @media (max-width: 767.98px) {
         background: transparent !important;
      }
   }
   /*
   .fc-scroller {
      overflow-y: hidden !important;
   } */
`;
