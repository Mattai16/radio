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

const ShowPrograma = () => {

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
        <>
            <div className="vh-100" style={{ backgroundColor: '#E7F6F2' }}>
                <MDBContainer>

                    { programa.map( (programa) =>(
                                <MDBRow className="justify-content-center" key={programa.id}>
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
                                                    <h3> {programa.titulo}</h3>
                                                    <p>{programa.desc}</p>
                                                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                        style={{ backgroundColor: '#efefef' }}>
        
                                                        <div>
                                                            {programa.horario}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex pt-2">
                                                        {/* <Link to={`/editprograma/${programa.id}`} outline className="btn btn-outline-secondary me-1 flex-grow-1">Editar</Link> */}
                                                        {/* <button onClick={()=> confirmDelete(programa.id)} className="btn btn-dark flex-grow-1">Eliminar</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                    ))}

                {/* <Link to={'/createprograma'} className="btn btn-dark flex-grow-1">Crear</Link> */}
                </MDBContainer>
            </div>


        </>
    )
}

export default ShowPrograma
