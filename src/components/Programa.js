import React from "react";
import Menu from "./Menu";

import ShowPrograma from './ShowPrograma'

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