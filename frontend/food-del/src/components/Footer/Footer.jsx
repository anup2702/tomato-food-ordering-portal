import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className='footer-content-left'>
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus laboriosam placeat voluptatibus? Voluptatum, sed et.</p>
            <div className="social-icons">
                <img src={assets.facebook_icon} alt="Facebook" />
                <img src={assets.linkedin_icon} alt="LinkedIn" />
                <img src={assets.twitter_icon} alt="Twitter" />
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>Company</h2>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </div>
        <div className='footer-content-right'>
            <h2>Get in touch</h2>
            <ul>
                <li>+1-222-112-2232</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2025 © Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
