import React, { useState, useEffect } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Button } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySawl = withReactContent(Swal)

const Show = () => {

    // Declaración del estado inicial del componente
    const [perfiles, setPerfiles] = useState([])

    // Obtenemos la referencia a la colección "perfiles" en la base de datos
    const perfilesCollection = collection(db, "perfiles")

    // Función asincrónica que obtiene los perfiles desde la base de datos
    const getPerfiles = async () => {
        // Obtenemos todos los documentos de la colección "perfiles"
        const data = await getDocs(perfilesCollection)

        // Imprimimos los datos obtenidos para verificar que son correctos (opcional)
        /* console.log(data) */

        // Actualizamos el estado "perfiles" con los datos obtenidos de la base de datos
        setPerfiles(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )

        // Imprimimos el estado actualizado "perfiles" para verificar que ha cambiado (opcional)
        console.log(perfiles)
    }


    const confirmDelete = (id) => {
        MySawl.fire({
            title: 'Estas seguro de eliminar el perfil?',
            text: "No podras recuperar los datos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminalo'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePerfil(id)
                Swal.fire(
                    'Deleted!',
                    'Ha sido borrado.',
                    'Completado'
                )
            }
        })
    }

    // Función asincrónica que elimina un perfil con el ID especificado
    const deletePerfil = async (id) => {
        // Obtenemos la referencia al documento con el ID especificado en la colección "perfiles"
        const perfilesDoc = doc(db, "perfiles", id)

        // Borramos el documento de la base de datos
        await deleteDoc(perfilesDoc)

        // Actualizamos la lista de perfiles llamando a la función "getPerfiles"
        getPerfiles()
    }

    // Hook useEffect que se ejecuta cuando el componente se monta por primera vez
    // y llama a la función "getPerfiles" para obtener la lista de perfiles desde la base de datos


    return (
        <>
            <div className="vh-100" style={{ backgroundColor: '#E7F6F2' }}>
                <MDBContainer>

                    {perfiles.map((perfil) => (
                        <MDBRow className="justify-content-center" key={perfil.id}>
                            <MDBCol md="9" lg="7" xl="5" className="mt-5">
                                <MDBCard style={{ borderRadius: '0px' }}>
                                    <MDBCardBody className="p-4">
                                        <div className="d-flex text-black">
                                            <div className="flex-shrink-0">
                                                <MDBCardImage
                                                    style={{ width: '80px', borderRadius: '10px' }}
                                                    src='https://imgs.search.brave.com/GJ9XRZT2i6S2jnjcceZxYj5U2ZSZc9WkvL2bF1hTYj8/rs:fit:980:980:1/g:ce/aHR0cHM6Ly93ZWJz/dG9ja3Jldmlldy5u/ZXQvaW1hZ2VzL3By/b2ZpbGUtaWNvbi1w/bmctOS5wbmc'
                                                    alt='Generic placeholder image'
                                                    fluid />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h3> {perfil.nombre}</h3>
                                                <p>{perfil.papel}</p>
                                                <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                    style={{ backgroundColor: '#efefef' }}>

                                                    <div>
                                                        {perfil.desc}
                                                    </div>
                                                </div>
                                                <div className="d-flex pt-2">
                                                    <Link to={`/edit/${perfil.id}`} outline className="btn btn-outline-secondary me-1 flex-grow-1">Editar</Link>
                                                    <button onClick={() => confirmDelete(perfil.id)} className="btn btn-dark flex-grow-1">Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    ))}


                </MDBContainer>
            </div>


        </>
    )
}

export default Show