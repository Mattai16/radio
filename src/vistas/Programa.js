import React from "react";
import Menu from "../components/Menu";

import ShowPrograma from '../components/ShowPrograma'

const Programa = () => {
    return(
    <div>
        <div className="carrusel">
            <Menu />
            <h1>Carrusel</h1>

            <ShowPrograma/>
           
        </div>

        <div className="gridPrograma">

        </div>
    </div>
    )
}

export default Programa