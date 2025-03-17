import React, { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";
import './App.css'

// Set API URI
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`;

function App() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching from:", API_URI);

    fetch(API_URI)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch item: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setItem(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <UpdateItem item={item} />;
}

export default App;
