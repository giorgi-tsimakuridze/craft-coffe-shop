import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "../styles/Admin.module.css";

const API_URL = "http://localhost:3000/ingredients";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    isInStock: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchIngredients = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setIngredients(res.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchIngredients();
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        id: Date.now().toString(),
      };
      await axios.post(API_URL, payload);
      fetchIngredients();
      setForm({ name: "", price: "", description: "", isInStock: true });
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  if (loading) return <p>მონაცემები იტვირთება...</p>;

  return (
    <div className={styles.page}>
      <h2>ინგრედიენტების მართვა</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="სახელი"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="ფასი (GEL)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <textarea
          placeholder="აღწერა"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <label>
          მარაგშია:
          <input
            type="checkbox"
            checked={form.isInStock}
            onChange={(e) => setForm({ ...form, isInStock: e.target.checked })}
          />
        </label>
        <button type="submit">ინგრედიენტის დამატება</button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>სახელი</th>
            <th>ფასი</th>
            <th>მარაგშია</th>
            <th>მოქმედება</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing) => (
            <tr key={ing.id}>
              <td>{ing.id}</td>
              <td>{ing.name}</td>
              <td>{ing.price} ₾</td>
              <td>{ing.isInStock ? "✅" : "❌"}</td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(ing.id)}
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
