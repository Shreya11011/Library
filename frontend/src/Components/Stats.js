import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import './Stats.css';

function Stats() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [bookCount, setBookCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);

    useEffect(() => {
        // Fetch total count of books
        axios.get(API_URL + "api/books/allbooks")
            .then(response => {
                setBookCount(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching book count:', error);
            });

        // Fetch total count of members
        axios.get(API_URL + "api/users/allmembers")
            .then(response => {
                setMemberCount(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching member count:', error);
            });
    }, [API_URL]);

    return (
        <div className='stats'>
            <div className='stats-block'>
                <LibraryBooksIcon className='stats-icon' style={{ fontSize: 80 }} />
                <p className='stats-title'>Total Books</p>
                <p className='stats-count'>{bookCount}</p>
            </div>
            <div className='stats-block'>
                <LocalLibraryIcon className='stats-icon' style={{ fontSize: 80 }} />
                <p className='stats-title'>Total Members</p>
                <p className='stats-count'>{memberCount}</p>
            </div>
        </div>
    );
}

export default Stats;
