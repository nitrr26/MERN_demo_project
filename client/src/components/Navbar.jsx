
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

const Navbar = () => {
  const navStyle = {
    margin: 0
  }
  return (
    <>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className='ml-5 nav-item'>
                <NavLink className="nav-link" to="/" activeClassName='active'>Home</NavLink>
              </li>
              <li className='ml-5 nav-item'>
                <NavLink className="nav-link" to="/about" activeClassName='active'>About</NavLink>
              </li>
              <li className='ml-5 nav-item'>
                <NavLink className="nav-link" to="/contact" activeClassName='active'>Contact</NavLink>
              </li>
              <li className='ml-5 nav-item'>
                <NavLink className="nav-link" to="/login" activeClassName='active'>Login</NavLink>
              </li>
              <li className='ml-5 nav-item'>
                <NavLink className="nav-link" to="/register" activeClassName='active'>Register</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </>
  )
}

export default Navbar;