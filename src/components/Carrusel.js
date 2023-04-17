import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import firebase from "firebase/app";
import "firebase/database";
import { db } from './firebaseConfig/firebase'



const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Carrusel = () => {
    const [programa, setPrograma] = useState([])

    const programaCollection = collection(db, "programas")

    const getPrograma = async () => {
        const data = await getDocs(programaCollection)
        /* console.log(data) */
        setPrograma(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        console.log(programa)
    }

    const confirmDelete = (id) => {
        MySawl.fire({
            title: 'Estas seguro de eliminar el programa?',
            text: "No podras recuperar los datos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminalo'
          }).then((result) => {
            if (result.isConfirmed) {
                deletePrograma(id)
              Swal.fire(
                'Deleted!',
                'Ha sido borrado.',
                'Completado'
              )
            }
          })
    }

    const deletePrograma = async (id) => {
        const programaDoc = doc(db, "programas", id)
        await deleteDoc(programaDoc)
        getPrograma()
    }

    useEffect(() => {
        getPrograma()
    }, [])

  return (
    <Slider {...settings}>
      {images.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default Carrusel;
