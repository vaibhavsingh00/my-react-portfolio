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
  faLaptopCode, // ✅ Added Skills Icon
} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false)

  return (
    <div className="nav-bar">
      <Link
        className="logo"
        to="/"
        onClick={() => setShowNav(false)}
      >
        <img className="sub-logo" src={LogoSubtitle} alt="vaibhav" />
      </Link>

      <nav className={showNav ? 'mobile-show' : ''}>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>
        <NavLink
          activeclassname="active"
          className="about-link"
          to="/about"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </NavLink>
        <NavLink
          activeclassname="active"
          className="portfolio-link"
          to="/portfolio"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faSuitcase} color="#4d4d4e" />
        </NavLink>

        {/* ✅ Skills link */}
        <NavLink
          activeclassname="active"
          className="skills-link"
          to="/skills"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faLaptopCode} color="#4d4d4e" />
        </NavLink>

        <NavLink
          activeclassname="active"
          className="contact-link"
          to="/contact"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </NavLink>

        <FontAwesomeIcon
          onClick={() => setShowNav(false)}
          icon={faClose}
          color="#ffd700"
          size="3x"
          className="close-icon"
        />
      </nav>

      <ul>
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
        <li>
          <a
            href="https://www.instagram.com/vg_vaibhavsingh/"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
        <li>
          <a href="skype:live:bobangajicsm" rel="noreferrer" target="_blank">
            <FontAwesomeIcon
              icon={faSkype}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
      </ul>

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
