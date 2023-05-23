import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, signInAnonymously, } from "firebase/auth"
import { messaging } from './firebaseConfig/firebase';
import { getToken, onMessage } from "firebase/messaging";
import { ToastContainer, Toast, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Menu() {

    const loguearse = () => {
        signInAnonymously(getAuth()).then(usuario => console.log(usuario));

    }

    const activarMsj = async () => {
        const token = await getToken(messaging, {
            vapidKey: "BPQlcKyIvPTczBcJtBUNezD6eL17HFCQo4LmpDPkCjd8rXlPD6y3nRWhbBU4PdZSh4dTlJ2hK1Ef9ZAQxwaqUsg"
        }).catch(error => console.log("Error al generar token"));

        if (token) console.log("Token generado:", token);
        if (!token) console.log("Token no generado");

    }


    React.useEffect(() => {
        onMessage(messaging, message => {
            console.log("Tú msj");
            toast(message.notification.title);
        })
    })

    return (
        <nav className="navbar navbar-expand-sm bg-body-tertiary bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" >RADIO PROYECT</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
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
                        <ToastContainer />
                        <button onClick={loguearse} className="btn btn-dark flex-grow-1" >R</button>
                        <button onClick={activarMsj} className="btn btn-dark flex-grow-1">N</button>
                    </span>
                </div>
            </div>
        </nav>
    )
}