import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className='footer-content-left'>
            <img src={assets.logo} alt="" />
            <p>Our food-ordering platform connects you with top local restaurants, offering fast delivery, easy customization, and secure payments—all in just a few taps. Whether you're craving comfort food or gourmet meals, we bring deliciousness to your doorstep.</p>
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
      <p className='footer-copyright'>Build by Anup <a href="https://github.com/anup2702" target="_blank" rel="noopener noreferrer"><FaGithub color="white" /></a></p>
    </div>
  )
}

export default Footer
