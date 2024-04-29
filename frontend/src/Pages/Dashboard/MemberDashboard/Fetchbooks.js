import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import "./Fetchbooks.css";

function Fetchbooks() {
    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const [allBooks, setAllBooks] = useState([])

    /* Fetch all books from the database */
    useEffect(() => {
        const getAllBooks = async () => {
            try {
                const response = await axios.get(API_URL + "api/books/allbooks")
                setAllBooks(response.data)
            } catch (err) {
                console.error("Error fetching all books:", err)
            }
        }
        getAllBooks()
    }, [API_URL])

    return (
        <div>
            <p className="dashboard-option-title">All Books</p>
            <div className="dashboard-title-line"></div>
            <table className='admindashboard-table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Book Name</th>
                        <th>Author Name</th>
                        <th>Number of Copies</th>
                        <th>Added Date</th>
                    </tr>
                </thead>
                <tbody>
                    {allBooks.map((book, index) => (
                        <tr key={book._id}>
                            <td>{index + 1}</td>
                            <td>{book.bookName}</td>
                            <td>{book.author}</td>
                            <td>{book.bookCountAvailable}</td>
                            <td>{book.createdAt.substring(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Fetchbooks;
