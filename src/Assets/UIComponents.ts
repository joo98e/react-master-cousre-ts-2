import Loader from 'react-loader-spinner';
import styled from 'styled-components';

export const Title = styled.h1`
    color : ${props => props.theme.accentColor};
    font-size : 2rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height : 10vh;
`;

export const Wrapper = styled.div.attrs({ "data-name": "wrapper" })`
  position: relative;
  width : 100vw;
  height : 100vh;
  color : ${props => props.theme.textColor};
  padding : 10px 20px;
`;

export const Content = styled.div`

`;

export const TextContent = styled.p`
  font-size : 1rem;
  background-color : ${props => props.theme.bgSecondaryColor};
`;

export const Button = styled.button`
    display: block;
    min-width: 80px;
    min-height: 40px;
    color : ${props => props.theme.accentColor};
    background-color : ${props => props.theme.btnColor};
    border: 1px solid ${props => props.theme.bgSecondaryColor};
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.1s linear;
    &:hover{
      border: 1px solid ${props => props.theme.borderAccentColor};
    }
`;

export const MyLoader = styled(Loader).attrs({
  type: "Oval",
  color: "#3d66ba",
  width: 30,
  height: 30,
  timeout: 3000
})`
  display: flex;
  justify-content: center;
`;