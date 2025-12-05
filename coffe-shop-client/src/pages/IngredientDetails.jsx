import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useData } from "../hooks/useData";
import { useCurrency } from "../context/CurrencyContext";
import { colors } from "../components/SharedStyles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
  background: ${colors.white};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
const Status = styled.h3`
  color: ${(props) => (props.$inStock ? "#4CAF50" : "#F44336")};
  margin-top: 10px;
  font-size: 1.2rem;
`;
const PriceH2 = styled.h2`
  font-size: 2rem;
  color: ${colors.primary};
  margin-top: 20px;
`;

export default function IngredientDetails() {
  const { id } = useParams();
  const { ingredients, loading } = useData();
  const { convertPrice } = useCurrency();

  if (loading) return <div>იტვირთება...</div>;

  const ingredient = ingredients.find((i) => i.id === id);

  if (!ingredient) return <h2>ინგრედიენტი ვერ მოიძებნა</h2>;

  return (
    <Wrapper>
      <h1>{ingredient.name}</h1>
      <Status $inStock={ingredient.isInStock}>
        Status: {ingredient.isInStock ? "In Stock" : "Out of Stock"}
      </Status>
      <p style={{ fontSize: "1.1rem", color: colors.secondary }}>
        {ingredient.description}
      </p>

      <PriceH2>Price: {convertPrice(ingredient.price)}</PriceH2>
    </Wrapper>
  );
}
