import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Show = () => {
  const [perfiles, setPerfiles] = useState([]);

  const perfilesCollection = collection(db, 'perfiles');

  const getPerfiles = async () => {
    const data = await getDocs(perfilesCollection);
    setPerfiles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Estás seguro de eliminar el perfil?',
      text: 'No podrás recuperar los datos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elímnalo',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePerfil(id);
        MySwal.fire('Deleted!', 'Ha sido borrado.', 'success');
      }
    });
  };

  const deletePerfil = async (id) => {
    const perfilesDoc = doc(db, 'perfiles', id);
    await deleteDoc(perfilesDoc);
    getPerfiles();
  };

  useEffect(() => {
    getPerfiles();
  }, []);

  return (
    <div className="vh-100">
      <MDBContainer>
        <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {perfiles.map((perfil) => (
            <MDBCol key={perfil.id}>
              <MDBCard className="h-100" style={{ margin: '10px', padding: '10 10px' }}>
                <MDBCardImage
                  src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyZmlsfGVufDB8fDB8fHww&w=1000&q=80"
                  alt="Generic placeholder image"
                  fluid
                />
                <MDBCardBody>
                  <MDBCardTitle>{perfil.nombre}</MDBCardTitle>
                  <MDBCardText>{perfil.papel}</MDBCardText>
                  <MDBCardText>{perfil.desc}</MDBCardText>
                  <div className="d-flex justify-content-between">
                    {/* <Link to={`/edit/${perfil.id}`} outline className="btn btn-outline-secondary">Editar</Link> */}
                    {/* <button onClick={() => confirmDelete(perfil.id)} className="btn btn-dark">Eliminar</button> */}
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
        {/* <Link to={'/create'} className="btn btn-dark flex-grow-1">Crear</Link> */}
      </MDBContainer>
    </div>
  );
};

export default Show;