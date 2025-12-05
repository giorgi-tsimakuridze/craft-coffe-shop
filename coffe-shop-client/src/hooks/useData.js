import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const COFFEE_URL = "http://localhost:3000/coffees";
const ING_URL = "http://localhost:3000/ingredients";

export const useData = () => {
  const [coffees, setCoffees] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCoffeePrice = useCallback((coffee, allIngredients) => {
    if (!coffee || !allIngredients.length) return 0;

    const sum = coffee.ingredients.reduce((acc, id) => {
      const ing = allIngredients.find((i) => i.id === id);
      return acc + (ing ? Number(ing.price) : 0);
    }, 0);

    return 2 + sum;
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [cofRes, ingRes] = await Promise.all([
        axios.get(COFFEE_URL),
        axios.get(ING_URL),
      ]);
      setCoffees(cofRes.data);
      setIngredients(ingRes.data);
    } catch (err) {
      console.error("Error fetching product data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    coffees,
    ingredients,
    loading,
    getCoffeePrice: (coffee) => getCoffeePrice(coffee, ingredients),
  };
};
