import React, { useState } from "react";
import FilterSidebar from "../../component/FilterSidebar";
import ProductList from "../../component/ProductList";
import { babyProducts } from "../../data/mockProducts";

const BabyMilkPage = () => {
  const [filtered, setFiltered] = useState(babyProducts);

  const handleFilter = (filters) => {
    let result = babyProducts;

    if (filters.brand) result = result.filter(p => p.brand === filters.brand);
    if (filters.age) result = result.filter(p => p.age === filters.age);

    setFiltered(result);
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <FilterSidebar filterBy="baby" onFilter={handleFilter} />
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <ProductList products={filtered} />
      </div>
    </div>
  );
};

export default BabyMilkPage;
