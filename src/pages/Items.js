import React, { useState, useEffect } from "react";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ ItemName: "", TypeID: "" });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [search, sortBy]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/items", {
        params: { search, sort_by: sortBy, sort_dir: "asc" },
      });
      setItems(response.data);
    } catch (err) {
      setError("Failed to fetch items");
    }
  };

  const createItem = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/items", newItem);
      fetchItems();
      setNewItem({ ItemName: "", TypeID: "" });
    } catch (err) {
      setError("Failed to create item");
    }
  };

  const deleteItem = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/api/items/${id}`);
        fetchItems();
    } catch (err) {
        setError('Failed to delete item');
    }
  };

  return (
    <div>
    <h2>Barang</h2>
    {error && <p>{error}</p>}
    <form onSubmit={createItem}>
        <input
            type="text"
            placeholder="Item Name"
            value={newItem.ItemName}
            onChange={(e) => setNewItem({ ...newItem, ItemName: e.target.value })}
        />
        <input
            type="text"
            placeholder="Type ID"
            value={newItem.TypeID}
            onChange={(e) => setNewItem({ ...newItem, TypeID: e.target.value })}
        />
        <button type="submit">Add Item</button>
    </form>
    <input
        type="text"
        placeholder="Search Items"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
    <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="ItemName">Name</option>
    </select>
    <table border={1}>
        <thead>
            <tr>
                <th>Nama Barang</th>
                <th>Jenis Barang</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.id}>
                    <td>{item.ItemName}</td>
                    <td>{item.type ? item.type.TypeName : 'No Type'}</td>
                    <td>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
  );
};

export default Items;
