import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "./context/CurrencyContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CoffeeList from "./pages/CoffeeList";
import IngredientList from "./pages/IngredientList";
import CoffeeDetails from "./pages/CoffeeDetails";
import IngredientDetails from "./pages/IngredientDetails";
import { GlobalStyle, Container } from "./components/SharedStyles";

export default function App() {
  return (
    <CurrencyProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/coffees"
            element={
              <Container>
                <CoffeeList />
              </Container>
            }
          />
          <Route
            path="/coffees/:id"
            element={
              <Container>
                <CoffeeDetails />
              </Container>
            }
          />
          <Route
            path="/ingredients"
            element={
              <Container>
                <IngredientList />
              </Container>
            }
          />
          <Route
            path="/ingredients/:id"
            element={
              <Container>
                <IngredientDetails />
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </CurrencyProvider>
  );
}
