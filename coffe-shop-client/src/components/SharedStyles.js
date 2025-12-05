import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const colors = {
  primary: "#000000",
  secondary: "#555555",
  background: "#F0F0F0",
  accent: "#A160FF",
  white: "#FFFFFF",
  darkOverlay: "rgba(0, 0, 0, 0.5)",
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif; 
    background: ${colors.background};
    color: ${colors.primary};
    line-height: 1.5;
  }
  * {
    box-sizing: border-box;
  }
  h1, h2, h3, h4 {
    color: ${colors.primary};
    margin: 10px 0;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  padding: 0 0 50px 0;
`;

export const Card = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: ${colors.white};
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardImage = styled.div`
  position: relative;
  height: 200px;
  background: #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${colors.white};
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
`;

export const CardInfo = styled.div`
  padding: 15px;
  h3 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
  }
`;

export const PriceText = styled.div`
  font-size: 1rem;
  font-weight: normal;
  color: ${colors.primary};
  margin-top: 5px;
`;

export const PrimaryButton = styled(Link)`
  background: ${colors.primary};
  color: ${colors.white};
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 3px;
  font-weight: bold;
  display: inline-block;
  margin-top: 20px;
  transition: background 0.2s;

  &:hover {
    background: ${colors.secondary};
  }
`;
