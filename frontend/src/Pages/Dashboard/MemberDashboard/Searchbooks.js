import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import "../AdminDashboard/AdminDashboard.css";

function Searchbooks() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [updatedBookData, setUpdatedBookData] = useState({});

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

    const handleEdit = (book) => {
        setSelectedBook(book);
    };

    const handleSave = async () => {
        try {
            const payload = {
                bookName: selectedBook.bookName, // Include bookName without changes
                bookStatus: updatedBookData.bookStatus || selectedBook.bookStatus,
                bookCountAvailable: updatedBookData.bookCountAvailable || selectedBook.bookCountAvailable,
                language: updatedBookData.language || selectedBook.language,
                author: updatedBookData.author || selectedBook.author,
                isAdmin: user.isAdmin
            };
    
            const response = await axios.put(
                API_URL + 'api/books/updatebook/' + selectedBook._id,
                payload
            );
            console.log(response.data);
            alert('Book Updated Successfully 🎉');
    
            // Update the search results with the updated book data
            const updatedResults = searchResults.map(book => {
                if (book._id === selectedBook._id) {
                    return {
                        ...book,
                        ...payload
                    };
                }
                return book;
            });
            setSearchResults(updatedResults);
        } catch (err) {
            console.log(err);
            alert('Error updating book. Please try again.');
        }
        setSelectedBook(null); // Clear selected book after updating
        setUpdatedBookData({}); // Reset updated book data
    };
    

    const handleCancel = () => {
        setSelectedBook(null); // Clear selected book
        setUpdatedBookData({}); // Reset updated book data
    };

    const handleDelete = async (bookId) => {
        try {
            const response = await axios.delete(API_URL + 'api/books/removebook/' + bookId, {
                data: {
                    isAdmin: user.isAdmin,
                },
            });
            console.log(response.data);
            alert('Book Deleted Successfully 🗑️');

            // Filter out the deleted book from the search results
            const updatedResults = searchResults.filter(book => book._id !== bookId);
            setSearchResults(updatedResults);
        } catch (err) {
            console.log(err);
            alert('Error deleting book. Please try again.');
        }
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
                                <td>{selectedBook === book ? <input className="edit-form-input" type="text" value={updatedBookData.author || book.author} onChange={(e) => setUpdatedBookData({ ...updatedBookData, author: e.target.value })} /> : book.author}</td>
                                <td>
                                    {selectedBook === book ? (
                                        <select  className="edit-form-input" value={updatedBookData.bookStatus || book.bookStatus} onChange={(e) => setUpdatedBookData({ ...updatedBookData, bookStatus: e.target.value })}>
                                            <option value="Available">Available</option>
                                            <option value="Not Available">Not Available</option>
                                        </select>
                                    ) : (
                                        book.bookStatus
                                    )}
                                </td>
                                <td>{selectedBook === book ? <input className="edit-form-input" type="number" value={updatedBookData.bookCountAvailable || book.bookCountAvailable} onChange={(e) => setUpdatedBookData({ ...updatedBookData, bookCountAvailable: e.target.value })} /> : book.bookCountAvailable}</td>
                                <td>{selectedBook === book ? <input className="edit-form-input" type="text" value={updatedBookData.language || book.language} onChange={(e) => setUpdatedBookData({ ...updatedBookData, language: e.target.value })} /> : book.language}</td>
                                <td>
                                    {selectedBook === book ? (
                                        <>
                                            <button className="edit-button" onClick={handleSave}>Save</button>
                                            <button className="edit-button" onClick={handleCancel}>Cancel</button>
                                        </>
                                    ) : (
                                        <button className="edit-button" onClick={() => handleEdit(book)}>REQUEST</button>
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
