import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";



const Create = () => {

    const [nombre, setNombre] = useState('')
    const [papel, setPapel] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()

    const perfilesCollection = collection(db, "perfiles")

    const profiles = async (e) => {
        e.preventDefault()
        await addDoc(perfilesCollection, { nombre: nombre, papel: papel, desc: desc })
        navigate('/perfilesAdmin')
    }

    return (
        <>
            <Form onSubmit={profiles}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Nombre</Form.Label>
                    <Form.Control
                    value={nombre}
                    onChange = {(e)=> setNombre(e.target.value)}
                     type="text" placeholder="Introduce un nombre" />
           
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                    value={desc}
                    onChange = {(e) => setDesc(e.target.value)}
                    type="text" placeholder="Introduce una descripción" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Papel</Form.Label>
                    <Form.Control 
                    value={papel}
                    onChange = {(e)=> setPapel(e.target.value)} type="text" placeholder="Introduce el papel (Locutor o DJ)" />
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

export default Create
