import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from './Header';
import Menu from './Menu';

const MySwal = withReactContent(Swal);

const ShowProgramaAdmin = () => {

    const [programas, setProgramas] = useState([]);

    const programasCollection = collection(db, 'programas');

    const getProgramas = async () => {
        if (navigator.onLine) {
            const data = await getDocs(programasCollection);
            setProgramas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          }else {
      
          try {
            // Verificar la conexión a la base de datos
            await db.getFirestore().ping();
          } catch (error) {
            Swal.fire('Error', 'No se pudo establecer conexión con la base de datos', 'error');
            return;
          }
        }
        
    };

    const confirmDelete = (id) => {
        MySwal.fire({
            title: '¿Estás seguro de eliminar el Programa?',
            text: 'No podrás recuperar los datos',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, elimínalo',
        }).then((result) => {
            if (result.isConfirmed) {
                deletePrograma(id);
                MySwal.fire('Deleted!', 'Ha sido borrado.', 'success');
            }
        });
    };

    const deletePrograma = async (id) => {
        const programasDoc = doc(db, 'programas', id);
        await deleteDoc(programasDoc);
        getProgramas();
    };

    useEffect(() => {
        getProgramas();
    }, []);

    return (

        <div>
            <Menu />
            <div className="vh-100">
                <MDBContainer>
                    <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {programas.map((programa) => (
                            <MDBCol key={programa.id}>
                                <MDBCard className="h-100" style={{ margin: '10px', padding: '10 10px' }}>
                                    <MDBCardImage
                                        src={programa.imagen}
                                        alt="Generic placeholder image"
                                        fluid
                                    />
                                    <MDBCardBody>
                                        <MDBCardTitle>{programa.titulo}</MDBCardTitle>
                                        <MDBCardText>{programa.desc}</MDBCardText>
                                        <MDBCardText>{programa.horario}</MDBCardText>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/editprograma/${programa.id}`} outline className="btn btn-outline-secondary">Editar</Link>
                                            <button onClick={() => confirmDelete(programa.id)} className="btn btn-dark">Eliminar</button>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ))}
                    </MDBRow>
                    
                </MDBContainer>
                <Link to={'/createprograma'} className="btn btn-dark flex-grow-1">Crear</Link>
            </div>
        </div>
    );
};

export default ShowProgramaAdmin;
