import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">About the Library</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src="https://images6.alphacoders.com/346/346199.jpg" alt="" />
                </div>
                <div>
                    <p className="about-text">
                    "Welcome to our Course Resource Library, your gateway to an expansive world of literature and knowledge. 
                    Dive into our digital library filled with e-books, audiobooks, and scholarly articles, carefully curated to cater to every interest. 
                    
                    <br/>
                        <br/>
                        Explore themed reading rooms, connect with fellow book enthusiasts, and discover personalized recommendations tailored just for you. 
                    Whether you're seeking entertainment, enlightenment, or education, Virtual Bookshelf is your go-to destination for a rich and immersive reading experience.<br/>
                        <br/>
                        Join our global community of readers and embark on a journey of exploration, discovery, and lifelong learning. Start your adventure today on Course Resource Library!"<br/>
                        <br/>
                    
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
