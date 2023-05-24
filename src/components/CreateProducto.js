import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";



const CreateProducto = () => {

    const [nombre, setNombre] = useState('')
    const [precio, setprecio] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()

    const productosCollection = collection(db, "productos")

    const productos = async (e) => {
        e.preventDefault()
        await addDoc(productosCollection, { nombre: nombre, precio: precio, desc: desc })
        navigate('/tiendaAdmin')
    }

    return (
        <>
            <Form onSubmit={productos}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Nombre</Form.Label>
                    <Form.Control
                    value={nombre}
                    onChange = {(e)=> setNombre(e.target.value)}
                     type="text" placeholder="Introduce el nombre del producto" />
           
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                    value={desc}
                    onChange = {(e) => setDesc(e.target.value)}
                    type="text" placeholder="Introduce una descripción" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>precio</Form.Label>
                    <Form.Control 
                    value={precio}
                    onChange = {(e)=> setprecio(e.target.value)} type="text" placeholder="Introduce el precio del producto" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">


                </Form.Group>
                <button className="btn btn-dark flex-grow-1" type="submit">
                    Guardar
                </button>
            </Form>
        </>
    )
}

export default CreateProducto
