import React from 'react'
import parrot from '../assets/parrot.png'

const Header = () => {
  return (
    <div className='header'>
        <img src={parrot} alt="a parrot" className='parrot'/>
        <div>
          <h1>PollyGlot</h1>
          <h2>Perfect Translation Every Time</h2>
        </div>
    </div>
  )
}

export default Header