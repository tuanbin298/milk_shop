import React, { useState } from "react";
import FilterSidebar from "../../component/FilterSidebar";
import ProductList from "../../component/ProductList";
import { momProducts } from "../../data/mockProducts";

const MomMilkPage = () => {
  const [filtered, setFiltered] = useState(momProducts);

  const handleFilter = (filters) => {
    let result = momProducts;

    if (filters.brand) result = result.filter((p) => p.brand === filters.brand);
    setFiltered(result);
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <FilterSidebar filterBy="mom" onFilter={handleFilter} />
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <ProductList products={filtered} />
      </div>
    </div>
  );
};

export default MomMilkPage;
