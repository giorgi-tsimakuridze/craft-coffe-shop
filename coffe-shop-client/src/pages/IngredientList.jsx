import styled from "styled-components";
import { useData } from "../hooks/useData";
import { useCurrency } from "../context/CurrencyContext";
import {
  Grid,
  Card,
  CardImage,
  CardInfo,
  PriceText,
  colors,
} from "../components/SharedStyles";

import IngredientImage from "../assets/ingredients.webp";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0;
  margin-top: 50px;
  margin-bottom: 20px;
  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
  span {
    background: ${colors.secondary};
    color: ${colors.white};
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 0.9rem;
  }
`;

export default function IngredientList() {
  const { ingredients, loading } = useData();
  const { convertPrice, currency } = useCurrency();

  if (loading) return <h2>ინგრედიენტები იტვირთება...</h2>;

  return (
    <>
      <Header>
        <h2>Available Ingredients</h2>
        <span>{currency}</span>
      </Header>
      <Grid>
        {ingredients.map((ingredient) => (
          <Card key={ingredient.id} to={`/ingredients/${ingredient.id}`}>
            <CardImage
              style={{
                backgroundImage: `url(${IngredientImage})`,
                filter: ingredient.isInStock ? "none" : "grayscale(100%)",
                height: "250px",
                opacity: ingredient.isInStock ? 1 : 0.6,
              }}
            >
              {!ingredient.isInStock && (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(255, 0, 0, 0.7)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  OUT OF STOCK
                </span>
              )}
            </CardImage>
            <CardInfo>
              <h3
                style={{
                  fontWeight: "normal",
                  fontSize: "1.2rem",
                  marginBottom: "10px",
                }}
              >
                {ingredient.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <PriceText>{convertPrice(ingredient.price)}</PriceText>
                <span style={{ color: colors.primary }}>🌱</span>
              </div>
            </CardInfo>
          </Card>
        ))}
      </Grid>
    </>
  );
}
