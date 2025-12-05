import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useData } from "../hooks/useData";
import { useCurrency } from "../context/CurrencyContext";
import { colors } from "../components/SharedStyles";
import getIndexedImageUrl from "../hooks/useImageLoader";

const Wrapper = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 50px;
  background: ${colors.white};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
const ImageBox = styled.div`
  flex: 1;
  max-width: 500px;
  height: 400px;
  background: #d0d0d0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
  color: ${colors.white};
  background-size: cover;
  background-position: center;
`;
const Content = styled.div`
  flex: 1;
  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
  }
`;
const Tag = styled.span`
  background: ${colors.secondary};
  color: ${colors.white};
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 0.9rem;
  margin-right: 8px;
  margin-top: 10px;
  display: inline-block;
`;
const PriceLarge = styled.h2`
  font-size: 2.5rem;
  color: ${colors.primary};
  border-bottom: 2px solid ${colors.secondary};
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export default function CoffeeDetails() {
  const { id } = useParams();
  const { coffees, ingredients, getCoffeePrice, loading } = useData();
  const { convertPrice } = useCurrency();

  if (loading) return <div>იტვირთება...</div>;

  const coffee = coffees.find((c) => c.id === id);

  if (!coffee) return <h2>ყავა ვერ მოიძებნა</h2>;

  const price = getCoffeePrice(coffee);
  const coffeeIndex = coffees.findIndex((c) => c.id === id);
  const imageUrl = getIndexedImageUrl(coffeeIndex);
  const coffeeIngredients = coffee.ingredients
    .map((ingId) => ingredients.find((i) => i.id === ingId))
    .filter(Boolean);

  return (
    <Wrapper>
      <ImageBox style={{ backgroundImage: `url('${imageUrl}')` }}>
        {!imageUrl.includes("No_Image") && (
          <span style={{ fontSize: "1rem", color: colors.white }}></span>
        )}
      </ImageBox>
      <Content>
        <h1>{coffee.title}</h1>
        <PriceLarge>{convertPrice(price)}</PriceLarge>
        <p style={{ fontSize: "1.1rem" }}>{coffee.description}</p>

        <div style={{ marginTop: "30px" }}>
          <strong style={{ fontSize: "1.1rem" }}>Ingredients:</strong>
          <div style={{ marginTop: "10px" }}>
            {coffeeIngredients.map((ing) => (
              <Tag key={ing.id}>{ing.name}</Tag>
            ))}
          </div>
        </div>
      </Content>
    </Wrapper>
  );
}
