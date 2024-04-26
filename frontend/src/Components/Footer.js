import React from 'react'
import './Footer.css'

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    <div className="contact-details">
                        <h1>Contact Us</h1>
                        <p>Librarian</p>
                        
                        <p>Fort Wayne, IN 46805</p>
                        <p>260-481-6505</p>
                        <p><b>Email:</b>ref@pfw.edu</p>
                    </div>
                    <div className='usefull-links'>
                        <h1>Library Hours</h1>
                        
                        <p> Monday - Thursday, 8am to 9pm</p>
                        <p> Friday - Saturday, 8am to 5pm </p>
                        <p> Sunday, noon - 9pm</p>
                    </div>
                    <div className='librarian-details'>
                        <h1>CONNECT WITH US</h1>
                        <p>Need Help ?</p> <a href='#home'> Ask A Librarian</a>
                        <p>Check our</p> <a href='#home'> Frequently Asked Questions</a>
                       
                        
                        <p>Contact: +91 9123456787</p>
                    </div>
                </div>
                <div className="contact-social" >
                    <a href='#home' className='social-icon'><TwitterIcon style={{ fontSize: 40,color:"rgb(135, 206, 235)"}} /></a>
                    <a href='#home' className='social-icon'><LinkedInIcon style={{ fontSize: 40,color:"rgb(135, 206, 235)"}} /></a>
                    <a href='#home' className='social-icon'><TelegramIcon style={{ fontSize: 40,color:"rgb(135, 206, 235)"}} /></a>
                    <a href='#home' className='social-icon'><InstagramIcon style={{ fontSize: 40,color:"rgb(135, 206, 235)"}} /></a>
                </div>
            </div>
            <div className='copyright-details'>
                <p className='footer-copyright'>&#169; 2020 copyright all right reserved<br /><span>Developers Team 5</span></p>
            </div>
        </div>
    )
}

export default Footer