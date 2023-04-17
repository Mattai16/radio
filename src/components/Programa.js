import React from "react";
import Menu from "./Menu";
import Carrusel from "./Carrusel";

const Programa = () => {
    return(
    <div>
        <div class="carrusel">
            <Menu />
            <h1>Carrusel</h1>
            <Carrusel />
        </div>

        <div class="gridPrograma">

        </div>
    </div>
    )
}

export default Programa