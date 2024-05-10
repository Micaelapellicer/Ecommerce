import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Obtén ofertas exclusivas en tu correo electrónico</h1>
      <p>Suscríbete y mantente actualizado"</p>
      <div>
        <input type="email" placeholder='Your Email id'/>
        <button>Subscribite</button>
      </div>
    </div>
  )
}

export default NewsLetter
