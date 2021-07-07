import React from "react";
import { ProductCatalog } from "./features/productCatalog/ProductCatalog";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Catalog</h1>
      </header>

      <ProductCatalog />
    </div>
  );
}

export default App;
