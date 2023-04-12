import React from "react";
import Menu from "./Menu";

const Programa = () => {
    return(
        <div>
            <Menu />
            <h1>Hola programa</h1>
            <audio controls>
       <source src="https://stream-42.zeno.fm/dinseg38t5suv?zs=Qx7iMRLeRzSGllcJJv1Trw" type="audio/mpeg"></source>
      Your browser does not support the audio element.
      </audio>
        </div>
    )
}

export default Programa