import styled from 'styled-components';
import Background from '../../assets/images/background.jpg';

export const CONTAINER = styled.div`
   background-color: #fff;
   background-image: url(${Background});
   background-repeat: no-repeat;
   background-size: cover;
   width: 100%;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`;
