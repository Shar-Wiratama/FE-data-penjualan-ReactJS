import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Items = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ ItemName: '', TypeID: '' });
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        fetchItems();
    }, [search, sortBy]);

    const fetchItems = async () => {
        const response = await axios.get('http://localhost:8000/api/items', {
            params: { search, sort_by: sortBy, sort_dir: 'asc' }
        });
        setItems(response.data);
    };

    const createItem = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:8000/api/items', newItem);
        fetchItems();
        setNewItem({ ItemName: '', TypeID: '' });
    };

    const deleteItem = async (id) => {
        await axios.delete(`http://localhost:8000/api/items/${id}`);
        fetchItems();
    };

    return (
        <div>
            <h2>Items</h2>
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
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.ItemName} - {item.type.TypeName}
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Items;
