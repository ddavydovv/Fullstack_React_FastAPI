import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCost, setSelectedCost] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ brand_name: "", caption_item: "", cost_item: 0, sizes_item: 0 });

  const getItems = async (brand, size, cost) => {
    try {
      let url = "/items/get";
      if (brand || size || cost) {
        url += "?";
        if (brand) url += `&brand_name=${brand}`;
        if (size) url += `&sizes_item=${size}`;
        if (cost) url += `&cost_item=${cost}`;
      }
      const response = await fetch(url);
      const result = await response.json();
      if (result.ok) {
        setData(result.data);
      } else {
        console.log("Error:", result.error);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    getItems(event.target.value, selectedSize, selectedCost);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    getItems(selectedBrand, event.target.value, selectedCost);
  };

  const handleCostChange = (event) => {
    setSelectedCost(event.target.value);
    getItems(selectedBrand, selectedSize, event.target.value);
  };

  const handleAddItemClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `/items/add?brand_name=${newItem.brand_name}&sizes_item=${newItem.sizes_item}&cost_item=${newItem.cost_item}&caption_item=${encodeURIComponent(newItem.caption_item)}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Товар успешно добавлен в каталог!");
        setShowForm(false);
        getItems(selectedBrand);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <h1>Каталог:</h1>
      <select value={selectedBrand} onChange={handleBrandChange}>
        <option value="">Все бренды</option>
        <option value="Adidas">Adidas</option>
        <option value="Nike">Nike</option>
        <option value="New Balance">New Balance</option>
        <option value="Reebok">Reebok</option>
      </select>
      <select value={selectedSize} onChange={handleSizeChange}>
        <option value="">Все размеры</option>
        <option value="41">41</option>
        <option value="42">42</option>
        <option value="43">43</option>
        <option value="44">44</option>
        <option value="45">45</option>
      </select>
      <select value={selectedCost} onChange={handleCostChange}>
        <option value="">Любая стоимость</option>
        <option value="5000">5000</option>
        <option value="10000">10000</option>
        <option value="15000">15000</option>
        <option value="20000">20000</option>
        <option value="25000">25000</option>
      </select>
      <button onClick={handleAddItemClick}>Добавить модель</button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Название бренда"
            value={newItem.brand_name}
            onChange={(e) => setNewItem({ ...newItem, brand_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Описание"
            value={newItem.caption_item}
            onChange={(e) => setNewItem({ ...newItem, caption_item: e.target.value })}
          />
          <input
            type="number"
            placeholder="Стоимость"
            value={newItem.cost_item}
            onChange={(e) => setNewItem({ ...newItem, cost_item: e.target.value })}
          />
          <input
            type="number"
            placeholder="Размер"
            value={newItem.sizes_item}
            onChange={(e) => setNewItem({ ...newItem, sizes_item: e.target.value })}
          />
          <button type="submit">Добавить</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Бренд</th>
            <th>Стоимость</th>
            <th>Размер</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.brand_name}</td>
              <td>{item.cost_item}</td>
              <td>{item.sizes_item}</td>
              <td>{item.caption_item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;