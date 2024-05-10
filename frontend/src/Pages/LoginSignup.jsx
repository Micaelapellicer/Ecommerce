import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("Inicio de sesión correcto", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log("Registro exitoso", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)
    if (responseData.success) {
      setRegistrationSuccess(true); // Establecer el estado de registro exitoso
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {registrationSuccess && <p>Registro exitoso</p>} {/* Mostrar mensaje de registro exitoso */}
        <div className='loginsignup-fields'>
          {state === "Crear nueva cuenta" ? (
            <>
              <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Tu nombre' />
              <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='correo electronico' />
              <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='contraseña' />
            </>
          ) : (
            <>
              <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='correo electronico' />
              <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='contraseña' />
            </>
          )}
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continuar</button>
        {state === "Crear nueva cuenta" ? <p className="loginsignup-login">¿Ya tienes una cuenta? <span onClick={() => { setState("Login") }}>Inicia sesión </span></p> : <p className="loginsignup-login">Crear una cuenta <span onClick={() => { setState("Crear nueva cuenta") }}>Haga clic aquí</span></p>}
        <div className="loginsignup-agree">
        </div>
      </div>
    </div>
  )
}

export default LoginSignup