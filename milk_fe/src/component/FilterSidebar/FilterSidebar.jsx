import { useState } from "react";

const FilterSidebar = ({ onFilter, filterBy }) => {
  const [brand, setBrand] = useState("");
  const [age, setAge] = useState("");

  const handleApply = () => {
    onFilter({ brand, age });
  };

  return (
    <div style={{ width: "220px" }}>
      <h3>Bộ lọc</h3>

      <div>
        <label>Thương hiệu:</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">-- Tất cả --</option>
          <option value="Friso">Friso</option>
          <option value="Abbott">Abbott</option>
          <option value="Vinamilk">Vinamilk</option>
        </select>
      </div>

      {filterBy === "baby" && (
        <div>
          <label>Độ tuổi:</label>
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="">-- Tất cả --</option>
            <option value="0-6 tháng">0-6 tháng</option>
            <option value="6-12 tháng">6-12 tháng</option>
            <option value="1-2 tuổi">1-2 tuổi</option>
          </select>
        </div>
      )}

      <button onClick={handleApply} style={{ marginTop: "10px" }}>
        Lọc
      </button>
    </div>
  );
};

export default FilterSidebar;
