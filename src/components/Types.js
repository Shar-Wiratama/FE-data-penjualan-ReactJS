import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Types = () => {
    const [types, setTypes] = useState([]);
    const [newType, setNewType] = useState({ TypeName: '' });
    const [editType, setEditType] = useState(null);
    const [editTypeName, setEditTypeName] = useState('');

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        const response = await axios.get('http://localhost:8000/api/types');
        setTypes(response.data);
    };

    const createType = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:8000/api/types', newType);
        fetchTypes();
        setNewType({ TypeName: '' });
    };

    const updateType = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:8000/api/types/${editType.id}`, { TypeName: editTypeName });
        fetchTypes();
        setEditType(null);
        setEditTypeName('');
    };

    const deleteType = async (id) => {
        await axios.delete(`http://localhost:8000/api/types/${id}`);
        fetchTypes();
    };

    const startEditType = (type) => {
        setEditType(type);
        setEditTypeName(type.TypeName);
    };

    const cancelEdit = () => {
        setEditType(null);
        setEditTypeName('');
    };

    return (
        <div>
            <h2>Types</h2>
            {editType ? (
                <form onSubmit={updateType}>
                    <input
                        type="text"
                        placeholder="Type Name"
                        value={editTypeName}
                        onChange={(e) => setEditTypeName(e.target.value)}
                    />
                    <button type="submit">Update Type</button>
                    <button type="button" onClick={cancelEdit}>Cancel</button>
                </form>
            ) : (
                <form onSubmit={createType}>
                    <input
                        type="text"
                        placeholder="Type Name"
                        value={newType.TypeName}
                        onChange={(e) => setNewType({ ...newType, TypeName: e.target.value })}
                    />
                    <button type="submit">Add Type</button>
                </form>
            )}
            <table border={1}>
                <thead>
                    <tr>
                        <th>Jenis Barang</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map(type => (
                        <tr key={type.id}>
                            <td>{type.TypeName}</td>
                            <td>
                                <button onClick={() => startEditType(type)}>Edit</button>
                                <button onClick={() => deleteType(type.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Types;
