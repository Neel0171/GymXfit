import React from 'react'

function Navbar({ handleToggle }) {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark border-bottom bg-dark pe-4">
            <button className="btn bg-transparent  ms-2" style={{ boxShadow: 'none' }} onClick={() => handleToggle()} id="menu-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
            </button>
            <h1 className="navbar-brand mb-0" style={{color: 'white', fontSize: '25px'}}>GymXFit</h1>
            <div className="d-flex collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center">
                    <li className="nav-item">
                        <i class="fa-light fa-bell"></i>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <li className="nav-item ">
                    <a className="nav-link" href="#">
                        <img src="https://gymxfit.gymxfit.com/assets/images/profile.svg" alt="Profile" className="image" height="15px" />
                    </a>
                </li>
            </div>
        </nav >

    )
}

export default Navbar;