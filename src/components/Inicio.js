import React from "react";
import Menu from "./Menu";
import AlbumStack from "./AlbumStack";
import Create from "./Create";
import { Form } from "react-bootstrap";

const Inicio = () => {
    return (
        <div>
            <Menu/>
            <h1>Inicio</h1>
            <audio controls>
            <source src="https://stream-42.zeno.fm/dinseg38t5suv?zs=Qx7iMRLeRzSGllcJJv1Trw" type="audio/mpeg"></source>
            Your browser does not support the audio element.
            </audio>
        </div>
    )
}

export default Inicio