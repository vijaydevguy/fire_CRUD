import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/form";
import Products from "./components/products";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/products" replace /> : <Form />}
        />
        <Route
          path="/products"
          element={user ? <Products /> : <Navigate to={"/"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
