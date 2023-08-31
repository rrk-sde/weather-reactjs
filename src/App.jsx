import React, { useState } from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import InputField from './components/input/InputField'
import WeatherReport from './components/weather/WeatherReport'
import Layout from './layout/Layout'
// import ReactGlobe from 'react-globe'
// import GlobeFc from './components/globe/GlobeFc'
// import GlobeComponent from './components/globe/GlobeComponent'


function App() {

  const [result, setResult] = useState({});


  return (
    <>
      <Layout>
        <Routes>
          <Route exact path='/' element={<InputField setResult={setResult} />} />
          <Route exact path='*' element={<InputField setResult={setResult} />} />
          <Route path='/weather/:city' element={<WeatherReport data={result} setResult={setResult} />} />
        </Routes>

      </Layout>
    </>
  )
}

export default App