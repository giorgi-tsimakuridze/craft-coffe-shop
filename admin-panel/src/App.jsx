import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import IngredientsPage from "./pages/IngredientsPage";
import CoffeesPage from "./pages/CoffeesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<h1>გთხოვთ, აირჩიეთ მართვის პანელი</h1>} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/coffees" element={<CoffeesPage />} />
          <Route path="*" element={<h2>404 - გვერდი ვერ მოიძებნა</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
