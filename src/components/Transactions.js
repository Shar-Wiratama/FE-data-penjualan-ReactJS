import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({ ItemID: '', Stock: '', Sold: '', TransactionDate: '' });
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [comparison, setComparison] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, [search, sortBy, startDate, endDate, comparison, amount]);

    const fetchTransactions = async () => {
        const response = await axios.get('http://localhost:8000/api/transactions', {
            params: { search, sort_by: sortBy, sort_dir: 'asc', start_date: startDate, end_date: endDate, comparison, amount }
        });
        setTransactions(response.data);
    };

    const createTransaction = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:8000/api/transactions', newTransaction);
        fetchTransactions();
        setNewTransaction({ ItemID: '', Stock: '', Sold: '', TransactionDate: '' });
    };

    const deleteTransaction = async (id) => {
        await axios.delete(`http://localhost:8000/api/transactions/${id}`);
        fetchTransactions();
    };

    return (
        <div>
            <h2>Transactions</h2>
            <form onSubmit={createTransaction}>
                <input
                    type="text"
                    placeholder="Item ID"
                    value={newTransaction.ItemID}
                    onChange={(e) => setNewTransaction({ ...newTransaction, ItemID: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newTransaction.Stock}
                    onChange={(e) => setNewTransaction({ ...newTransaction, Stock: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Sold"
                    value={newTransaction.Sold}
                    onChange={(e) => setNewTransaction({ ...newTransaction, Sold: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Transaction Date"
                    value={newTransaction.TransactionDate}
                    onChange={(e) => setNewTransaction({ ...newTransaction, TransactionDate: e.target.value })}
                />
                <button type="submit">Add Transaction</button>
            </form>
            <input
                type="text"
                placeholder="Search Transaction"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Sort By</option>
                <option value="TransactionDate">Date</option>
            </select>
            <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <select onChange={(e) => setComparison(e.target.value)}>
                <option value="">Comparison</option>
                <option value="more">More than</option>
                <option value="less">Less than</option>
            </select>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.item.ItemName} - {transaction.Sold} sold on {transaction.TransactionDate}
                        <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
