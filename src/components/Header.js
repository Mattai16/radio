import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import {  BrowserRouter ,Link } from 'react-router-dom';


export default function Header() {




    return (
        <nav classNameName="navbar navbar-expand-sm bg-body-tertiary bg-dark " data-bs-theme="dark">
            <div classNameName="container-fluid">
                <a classNameName="navbar-brand" >RADIO PROYECT</a>
                <button classNameName="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/'>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/programa">Programa</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/perfiles">Perfiles</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/tienda">Tienda</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        Equipo 7
                    </span>
                </div>
            </div>
        </nav>
    )
}