import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({ ItemID: '', Quantity: '', Date: '' });
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, [search, sortBy]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/transactions', {
                params: { search, sort_by: sortBy, sort_dir: 'asc' }
            });
            setTransactions(response.data);
        } catch (err) {
            setError('Failed to fetch transactions');
        }
    };

    const createTransaction = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/transactions', newTransaction);
            fetchTransactions();
            setNewTransaction({ ItemID: '', Quantity: '', Date: '' });
            setError(null);
        } catch (err) {
            setError('Failed to create transaction');
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/transactions/${id}`);
            fetchTransactions();
            setError(null);
        } catch (err) {
            setError('Failed to delete transaction');
        }
    };

    return (
        <div>
            <h2>Transaksi</h2>
            {error && <p>{error}</p>}
            <form onSubmit={createTransaction}>
                <input
                    type="text"
                    placeholder="Item ID"
                    value={newTransaction.ItemID}
                    onChange={(e) => setNewTransaction({ ...newTransaction, ItemID: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Quantity"
                    value={newTransaction.Quantity}
                    onChange={(e) => setNewTransaction({ ...newTransaction, Quantity: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Date"
                    value={newTransaction.Date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, Date: e.target.value })}
                />
                <button type="submit">Add Transaction</button>
            </form>
            <input
                type="text"
                placeholder="Search Transactions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Sort By</option>
                <option value="Date">Date</option>
            </select>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID Barang</th>
                        <th>Jumlah</th>
                        <th>Tanggal Transaksi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.ItemID}</td>
                            <td>{transaction.Quantity}</td>
                            <td>{transaction.Date}</td>
                            <td>
                                <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
