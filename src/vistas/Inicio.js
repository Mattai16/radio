import React from "react";
import Menu from "../components/Menu";
import './Inicio.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTiktok, faYoutube, faTwitter, faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'react-bootstrap';
import AlbumStack from "../components/AlbumStack";
import Create from "../components/Create";
import { Form } from "react-bootstrap";

const Inicio = () => {
    return (
        <div>
            <Menu/>

            <div class= "Inicio">
             <img src="https://img.freepik.com/vector-premium/estacion-radio-linea-vintage-icono-o-simbolo_8071-25787.jpg"></img>
             <audio controls>
             <source src="https://stream-42.zeno.fm/dinseg38t5suv?zs=Qx7iMRLeRzSGllcJJv1Trw" type="audio/mpeg"></source>
             Your browser does not support the audio element.
             </audio>
             </div>
            
           <div class="redes">
                <a href="https://www.youtube.com"><FontAwesomeIcon icon={faYoutube} size="2xl" style={{color: "#ff0000"}} /></a>
                <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} size="2xl" style={{color: "#833ab4",}} /></a>
                <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} size="2xl"style={{color: "#1da1f3",}} /></a>
                <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} size="2xl" style={{color: "#4267b2",}} /></a>
                <a href="https://www.tiktok.com"><FontAwesomeIcon icon={faTiktok} size="2xl" style={{color: "#000000"}}  /></a>

               
           </div>

           <Link to={'/SolicitudCancion'} className="btn btn-dark flex-grow-1">Solicitud Cancion</Link>
           
        </div>

        
    )
}

export default Inicio