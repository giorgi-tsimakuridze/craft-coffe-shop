import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "../styles/Admin.module.css";

const COFFEE_URL = "http://localhost:3000/coffees";
const ING_URL = "http://localhost:3000/ingredients";

export default function CoffeesPage() {
  const [coffees, setCoffees] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: [],
    isInStock: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [cofRes, ingRes] = await Promise.all([
        axios.get(COFFEE_URL),
        axios.get(ING_URL),
      ]);
      setCoffees(cofRes.data);
      setIngredients(ingRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const calculatePrice = (ingredientIds) => {
    if (!ingredientIds || !Array.isArray(ingredientIds)) return 2;
    const sum = ingredientIds.reduce((acc, id) => {
      const ing = ingredients.find((i) => i.id === id);
      return acc + (ing ? Number(ing.price) : 0);
    }, 0);

    return 2 + sum;
  };

  const handleCheckboxChange = (id) => {
    setForm((prev) => {
      const newIngs = prev.ingredients.includes(id)
        ? prev.ingredients.filter((i) => i !== id)
        : [...prev.ingredients, id];
      return { ...prev, ingredients: newIngs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        id: Date.now().toString(),
      };
      await axios.post(COFFEE_URL, payload);
      fetchData();
      setForm({ title: "", description: "", ingredients: [], isInStock: true });
    } catch (error) {
      console.error("Error adding coffee:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${COFFEE_URL}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting coffee:", error);
    }
  };

  if (loading) return <p>მონაცემები იტვირთება...</p>;

  return (
    <div className={styles.page}>
      <h2>ყავის მართვა</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="სათაური"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="აღწერა"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className={styles.ingList}>
          <p>აირჩიეთ ინგრედიენტები:</p>
          {ingredients.map((ing) => (
            <label key={ing.id} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={form.ingredients.includes(ing.id)}
                onChange={() => handleCheckboxChange(ing.id)}
              />
              {ing.name} ({ing.price} ₾)
            </label>
          ))}
        </div>

        <label>
          მარაგშია:
          <input
            type="checkbox"
            checked={form.isInStock}
            onChange={(e) => setForm({ ...form, isInStock: e.target.checked })}
          />
        </label>

        <button type="submit">ყავის დამატება</button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>სათაური</th>
            <th>ინგრედიენტები</th>
            <th>CoffeePrice</th>
            <th>მოქმედება</th>
          </tr>
        </thead>
        <tbody>
          {coffees.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.ingredients.length} ინგრედიენტი</td>
              <td>
                <strong>{calculatePrice(c.ingredients).toFixed(2)} ₾</strong>
              </td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(c.id)}
                >
                  წაშლა
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
