import './Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/Perfil.png'

const Navbar = () => {
  return (
    <div className='navbar'>
     <img src={navlogo} alt="" className="nav-logo" />
     <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
