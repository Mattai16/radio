import React from "react";
import Menu from "./Menu";
import AlbumStack from "./AlbumStack";
import Create from "./Create";
import { Form } from "react-bootstrap";

const Inicio = () => {
    return (
        <div>
            <Menu/>
            <Create/>
        </div>
    )
}

export default Inicio