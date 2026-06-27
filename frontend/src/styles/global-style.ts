import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-size: 16px;
    color: #333;
    background-color: #fff;
    font-family: "All Round Gothic", sans-serif;
  }

  div, ul {
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      border-radius: ${(props) => props.theme.borders.radius.round};
      background-color: ${(props) => props.theme.colors.gray[200]};
    }
    
    &::-webkit-scrollbar-track {
      border-radius: ${(props) => props.theme.borders.radius.round};
      background-color: ${(props) => props.theme.colors.gray[200]};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.colors.gray[500]};
      border-radius: ${(props) => props.theme.borders.radius.round};
      -webkit-box-shadow: inset 0 0 6px ${(props) => props.theme.colors.blackAlpha[30]};
      transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${(props) => props.theme.colors.gray[600]};
    }
  } 
`;
