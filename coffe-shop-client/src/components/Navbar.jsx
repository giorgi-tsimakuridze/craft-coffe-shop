import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import { colors } from "./SharedStyles";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background: ${colors.white};
  border-bottom: 1px solid #e0e0e0;
  color: ${colors.primary};
`;
const Logo = styled(Link)`
  font-family: "Inter";
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.primary};
  text-decoration: none;
`;
const Menu = styled.div`
  display: flex;
  gap: 25px;
  a {
    font-family: "Inter";
    color: ${colors.primary};
    text-decoration: none;
    font-size: 1.3rem;
    padding: 5px 0;
    transition: color 0.2s;
    &:hover {
      color: ${colors.secondary};
    }
  }
`;
const Button = styled.button`
  font-family: "Inter";
  background: ${colors.primary};
  border: none;
  color: ${colors.white};
  padding: 8px 15px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background 0.2s;
  &:hover {
    background: ${colors.secondary};
  }
`;

export default function Navbar() {
  const { currency, toggleCurrency } = useCurrency();
  return (
    <Nav>
      <Logo to="/">Coffee Shop</Logo>
      <Menu>
        <Link to="/coffees">Coffees</Link>
        <Link to="/ingredients">Ingredients</Link>
      </Menu>
      <Button onClick={toggleCurrency}>
        {currency === "GEL" ? "USD" : "GEL"}
      </Button>
    </Nav>
  );
}
