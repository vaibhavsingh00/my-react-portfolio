import { useEffect, useState, useRef } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_t53sm3l',        // ✅ Your EmailJS Service ID
        'template_fdauapm',       // ✅ Your EmailJS Template ID
        form.current,
        'RBUucF2EKiPe-HmGM'       // ✅ Your EmailJS Public Key
      )
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        (error) => {
          console.error('FAILED...', error) // log full error for debugging
          alert('Failed to send the message, please try again.')
        }
      )
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am interested in freelance opportunities — especially ambitious
            or large projects. However, if you have any other requests or
            questions, don’t hesitate to contact me using the form below.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input placeholder="Email" type="email" name="email" required />
                </li>
                <li>
                  <input placeholder="Subject" type="text" name="subject" required />
                </li>
                <li>
                  <textarea placeholder="Message" name="message" required></textarea>
                </li>

                {/* Hidden time field for your template */}
                <input
                  type="hidden"
                  name="time"
                  value={new Date().toLocaleString()}
                />

                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>

        <div className="info-map">
          Vaibhav Singh,
          <br />
          Kanpur Uttarpradesh India,
          <br />
          <br />
          <span>mvaibhavsingh7054@gmail.com</span>
        </div>

        <div className="map-wrap">
  <MapContainer center={[26.4499, 80.3319]} zoom={13}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[26.4499, 80.3319]}>
      <Popup>
        Vaibhav lives here, come over for a cup of coffee :)
      </Popup>
    </Marker>
  </MapContainer>
</div>
        </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
