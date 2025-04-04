import React from "react";
import "./CategoryFilter.css";

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="categoryFilter">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Asana">Asana</option>
        <option value="Meditation">Meditation</option>
        <option value="Pranayama">Pranayama</option>
        <option value="Dhyana">Dhyana</option>
        <option value="Kriya">Kriya</option>
        <option value="Mantra">Mantra</option>
        <option value="Mudra">Mudra</option>
      </select>
    </div>
  );
};

export default CategoryFilter;