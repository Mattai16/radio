import React from "react";
import { Carousel } from "react-bootstrap";
import Carrusel from "../components/Carrusel";
import Menu from "../components/Menu";
import ShowPrograma from '../components/ShowPrograma'

const Programa = () => {
    return(
    <div>
        <div className="carrusel">

            <Menu />
            <Carrusel/>
            <ShowPrograma/>
        


        </div>

        <div className="gridPrograma">

        </div>
    </div>
    )
}

export default Programa