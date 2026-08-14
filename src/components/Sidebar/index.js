import './index.scss'
import { useState } from 'react'
import LogoSubtitle from '../../assets/images/vaibhav.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faLinkedin,
  faGithub,
  faInstagram,
  faSkype,
} from '@fortawesome/free-brands-svg-icons'

import {
  faHome,
  faUser,
  faEnvelope,
  faSuitcase,
  faBars,
  faClose,
  faLaptopCode,
} from '@fortawesome/free-solid-svg-icons'

import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false)

  return (
    <div className="nav-bar">

      {/* Logo */}
      <Link
        className="logo"
        to="/"
        onClick={() => setShowNav(false)}
      >
        <img
          className="sub-logo"
          src={LogoSubtitle}
          alt="Vaibhav"
        />
      </Link>

      {/* Navigation */}
      <nav className={showNav ? 'mobile-show' : ''}>

        {/* Home */}
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon
            icon={faHome}
            color="#4d4d4e"
          />
        </NavLink>

        {/* About */}
        <NavLink
          activeclassname="active"
          className="about-link"
          to="/about"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon
            icon={faUser}
            color="#4d4d4e"
          />
        </NavLink>

        {/* Projects */}
        <NavLink
          activeclassname="active"
          className="portfolio-link"
          to="/Projects"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon
            icon={faSuitcase}
            color="#4d4d4e"
          />
        </NavLink>

        {/* Skills */}
        <NavLink
          activeclassname="active"
          className="skills-link"
          to="/skills"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon
            icon={faLaptopCode}
            color="#4d4d4e"
          />
        </NavLink>

        {/* Contact */}
        <NavLink
          activeclassname="active"
          className="contact-link"
          to="/contact"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            color="#4d4d4e"
          />
        </NavLink>

        {/* Close Icon - Mobile */}
        <FontAwesomeIcon
          onClick={() => setShowNav(false)}
          icon={faClose}
          color="#ffd700"
          size="3x"
          className="close-icon"
        />

      </nav>

      {/* Social Links */}
      <ul>

        {/* LinkedIn */}
        <li>
          <a
            href="https://www.linkedin.com/in/vaibhav-singh-991op/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>

        {/* GitHub */}
        <li>
          <a
            href="https://github.com/vaibhavsingh00"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>

        {/* Instagram */}
        <li>
          <a
            href="https://www.instagram.com/vg_vaibhavsingh/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>

        {/* Skype */}
        <li>
          <a
            href="skype:live:bobangajicsm"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faSkype}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>

      </ul>

      {/* Mobile Hamburger */}
      <FontAwesomeIcon
        onClick={() => setShowNav(true)}
        icon={faBars}
        color="#ffd700"
        size="3x"
        className="hamburger-icon"
      />

    </div>
  )
}

export default Sidebar