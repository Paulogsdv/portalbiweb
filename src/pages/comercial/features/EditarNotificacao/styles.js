import styled from 'styled-components';
import {
   Button,
   Card,
   CardBody,
   CardHeader,
   CardFooter,
   Col,
   Container,
   Row,
   TabContent,
   TabPane,
   Nav,
   NavItem,
   NavLink,
} from 'reactstrap';

export const CENTER = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 2rem;
`;

export const CARD = styled(Card)`
   background-color: #fff !important;
   box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;
`;

export const CARDBODY = styled(CardBody)``;

export const CARDBUTTON = styled(Button)`
   background: #21c7c2;
   color: ${props => props.color};
   margin-right: 5px;
`;

export const CARDHEADER = styled(CardHeader)`
   display: flex;
   align-items: center;
   justify-content: space-between;
   background-color: #fff !important;
`;

export const CARDHEADERCOL = styled(Col)`
   align-items: center !important;
   margin-top: 1rem !important;
`;

export const CARDH6 = styled.text`
   font-size: 10px;
   text-transform: uppercase !important;
   color: #8898aa !important;
`;

export const CARDH2 = styled.h2``;

export const CARDFOOTER = styled(CardFooter)`
   display: flex;
   align-items: center;
   justify-content: space-between;

   padding-top: 1.5rem !important;
`;

export const CONTAINER = styled(Container)``;

export const COL = styled(Col)``;

export const ROW = styled(Row)``;

export const SPAN = styled.span``;

export const BUTTON = styled(Button)`
   background: #21c7c2;
   color: ${props => props.color};
   margin-top: 1rem !important;
`;

export const CONTENT = styled.div`
   display: flex;
   justify-content: space-between !important;
   align-items: center !important;
`;

export const TABCONTENT = styled(TabContent)``;

export const TABPANE = styled(TabPane)``;

export const NAV = styled(Nav)``;

export const NAVITEM = styled(NavItem)``;

export const NAVLINK = styled(NavLink)``;
