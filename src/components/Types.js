import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Types = () => {
    const [types, setTypes] = useState([]);
    const [newType, setNewType] = useState({ TypeName: '' });
    const [editType, setEditType] = useState(null);
    const [editTypeName, setEditTypeName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/types');
            setTypes(response.data);
        } catch (err) {
            setError('Failed to fetch types');
        }
    };

    const createType = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/types', newType);
            fetchTypes();
            setNewType({ TypeName: '' });
            setError(null);
        } catch (err) {
            setError('Failed to create type');
        }
    };

    const updateType = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/types/${editType.id}`, { TypeName: editTypeName });
            fetchTypes();
            setEditType(null);
            setEditTypeName('');
            setError(null);
        } catch (err) {
            setError('Failed to update type');
        }
    };

    const deleteType = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/types/${id}`);
            fetchTypes();
            setError(null);
        } catch (err) {
            setError('Failed to delete type');
        }
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
            <h2>Jenis Barang</h2>
            {error && <p>{error}</p>}
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
                        placeholder="Nama Jenis Barang"
                        value={newType.TypeName}
                        onChange={(e) => setNewType({ ...newType, TypeName: e.target.value })}
                    />
                    <button type="submit">Tambah Jenis Barang</button>
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
