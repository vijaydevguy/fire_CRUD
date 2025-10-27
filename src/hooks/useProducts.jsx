import { useEffect, useState } from "react";
import { addProd, deleteProd, getProd, updateProd } from "../service/product";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getProd();

      const newProducts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // snapshot.docs.map((doc) => console.log("id", doc.id));

      setProducts(newProducts);
      console.log("products", newProducts);
    } catch (error) {
      setErr("Getting product failed: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const adding = async (payload) => {
    setLoading(true);
    try {
      const ref = await addProd(payload);
      const newProd = { id: ref.id, ...payload };

      setProducts((prev) => [...prev, newProd]);
    } catch (error) {
      setErr("Adding Product Failed: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const editing = async (id, payload) => {
    setLoading(true);
    try {
      await updateProd(id, payload);

      setProducts((prev) =>
        prev.map((prev) => (prev.id == id ? { ...prev, ...payload } : prev))
      );
    } catch (error) {
      setErr("Editing Product Failed: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleting = async (id) => {
    setLoading(true);
    try {
      await deleteProd(id);
      const filteredProd = products.filter((prev) => prev.id !== id);
      setProducts(filteredProd);
    } catch (error) {
      setErr("Deleting Product Failed: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, err, adding, deleting, editing };
};
