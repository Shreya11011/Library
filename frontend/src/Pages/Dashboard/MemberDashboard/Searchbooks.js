import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import "../AdminDashboard/AdminDashboard.css";

function Searchbooks() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [requestedBooks, setRequestedBooks] = useState([]);

    const searchBook = async () => {
        try {
            const response = await axios.get(API_URL + 'api/books/getbook', {
                params: {
                    name: searchQuery,
                },
            });
            setSearchResults(response.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRequest = (book) => {
        setRequestedBooks(prevRequestedBooks => [...prevRequestedBooks, book._id]);
        alert('Book Requested Successfully 📚');
    };
    
    return (
        <div>
            <p className="dashboard-option-title">SEARCH BOOKS</p>
            <div className="dashboard-title-line"></div>
            <div className="editbook-search">
                <input
                    type="text"
                    className="edit-search-input"
                    placeholder="Search by book name, ID, or author"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-edit-book" onClick={searchBook}>Search</button>
            </div>
            {searchResults.length > 0 && (
                <table className='admindashboard-table' style={{ marginTop: '50px' }}>
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>Status</th>
                            <th>No. of Copies</th>
                            <th>Language</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((book) => (
                            <tr key={book._id}>
                                <td>{book.bookName}</td>
                                <td>{book.author}</td>
                                <td>{book.bookStatus}</td>
                                <td>{book.bookCountAvailable}</td>
                                <td>{book.language}</td>
                                <td>
                                    {requestedBooks.includes(book._id) ? (
                                        <button className="edit-button" disabled>Requested</button>
                                    ) : (
                                        <button className="edit-button" onClick={() => handleRequest(book)}>REQUEST</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        
    );
}

export default Searchbooks;
