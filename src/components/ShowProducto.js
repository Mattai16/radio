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

const ShowProducto = () => {

    const [productos, setproductos] = useState([])

    const productosCollection = collection(db, "productos")

    const getproductos = async () => {
        const data = await getDocs(productosCollection)
        /* console.log(data) */
        setproductos(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        console.log(productos)
    }

    const showProducto = (id, nombre) => {
        Swal.fire(nombre)
    }


    const confirmDelete = (id) => {
        MySawl.fire({
            title: 'Estas seguro de eliminar el producto?',
            text: "No podras recuperar los datos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminalo'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteproducto(id)
                Swal.fire(
                    'Deleted!',
                    'Ha sido borrado.',
                    'Completado'
                )
            }
        })
    }

    const deleteproducto = async (id) => {
        const productosDoc = doc(db, "productos", id)
        await deleteDoc(productosDoc)
        getproductos()
    }

    useEffect(() => {
        getproductos()
    }, [])

    return (
        <>
            <div className="vh-100">
                <MDBContainer>

                    {productos.map((producto) => (
                        <MDBRow className="justify-content-center" key={producto.id}>
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
                                                <h3> {producto.nombre}</h3>
                                                <p>{producto.precio}</p>
                                                <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                    style={{ backgroundColor: '#efefef' }}>

                                                    <div>
                                                        {producto.desc}
                                                    </div>
                                                </div>
                                                <div className="d-flex pt-2">
                                                    {/* <Link to={`/editProducto/${producto.id}`} outline className="btn btn-outline-secondary me-1 flex-grow-1">Editar</Link> */}
                                                    {/* <button onClick={() => confirmDelete(producto.id)} className="btn btn-dark flex-grow-1">Eliminar</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    ))}

                {/* <Link to={'/createProducto'} className="btn btn-dark flex-grow-1">Crear</Link> */}
                </MDBContainer>

            </div>

            <div id="myModal" class="modal">
                <span class="close" onclick="closeModal()">&times;</span>
                <div class="modal-content">
                    {/* <img src="https://imgs.search.brave.com/GJ9XRZT2i6S2jnjcceZxYj5U2ZSZc9WkvL2bF1hTYj8/rs:fit:980:980:1/g:ce/aHR0cHM6Ly93ZWJz/dG9ja3Jldmlldy5u/ZXQvaW1hZ2VzL3By/b2ZpbGUtaWNvbi1w/bmctOS5wbmc"
                alt="Foto de producto"> */}
                    <h2>Tu Nombre</h2>
                    <p>Descripción de ti</p>
                    <div class="email">
                        <h3>Contacto</h3>
                        <p>Correo electrónico:</p>
                        <a href="quepex:tu-correo@example.com">tu-correo@example.com</a>
                    </div>
                    <div class="buttons">
                        <button class="edit">Editar</button>
                        <button class="delete">Eliminar</button>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ShowProducto