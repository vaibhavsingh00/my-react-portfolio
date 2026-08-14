import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import Portfolio from './components/Projects'
import Dashboard from './components/Dashboard'
import Skills from './components/skills'

import './App.scss'

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="about" element={<About />} />

          <Route path="skills" element={<Skills />} />

          <Route path="contact" element={<Contact />} />

          {/* Projects */}
          <Route path="projects" element={<Portfolio />} />

          <Route path="dashboard" element={<Dashboard />} />

        </Route>

      </Routes>
    </>
  )
}

export default App