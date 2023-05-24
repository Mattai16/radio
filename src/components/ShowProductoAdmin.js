import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Menu from './Menu';

const MySwal = withReactContent(Swal);

const ShowProductoAdmin = () => {

    const [productos, setProductos] = useState([]);

    const productosCollection = collection(db, 'productos');

    const getProductos = async () => {
        const data = await getDocs(productosCollection);
        setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const confirmDelete = (id) => {
        MySwal.fire({
            title: '¿Estás seguro de eliminar el producto?',
            text: 'No podrás recuperar los datos',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, elimínalo',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProducto(id);
                MySwal.fire('Deleted!', 'Ha sido borrado.', 'success');
            }
        });
    };

    const deleteProducto = async (id) => {
        const productosDoc = doc(db, 'productos', id);
        await deleteDoc(productosDoc);
        getProductos();
    };

    useEffect(() => {
        getProductos();
    }, []);

    return (
        <div>
            <Menu />
            <div className="vh-100">
                <MDBContainer>
                    <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {productos.map((producto) => (
                            <MDBCol key={producto.id}>
                                <MDBCard className="h-100" style={{ margin: '10px', padding: '10 10px' }}>
                                    <MDBCardImage
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Shopping_cart_icon.svg/586px-Shopping_cart_icon.svg.png"
                                        alt="Generic placeholder image"
                                        fluid
                                    />
                                    <MDBCardBody>
                                        <MDBCardTitle>{producto.nombre}</MDBCardTitle>
                                        <MDBCardText>{producto.desc}</MDBCardText>
                                        <MDBCardText>{producto.precio}</MDBCardText>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/editproducto/${producto.id}`} outline className="btn btn-outline-secondary">Editar</Link>
                                            <button onClick={() => confirmDelete(producto.id)} className="btn btn-dark">Eliminar</button>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ))}
                    </MDBRow>
                    
                </MDBContainer>
                <Link to={'/createproducto'} className="btn btn-dark flex-grow-1">Crear</Link>
            </div>
        </div>
    );
};

export default ShowProductoAdmin;
