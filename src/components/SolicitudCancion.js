import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";



const SolicitudCancion = () => {

    const [titulo, setTitulo] = useState('')
    const [artista, setArtista] = useState('')
    const navigate = useNavigate()

    const CancionCollection = collection(db, "canciones")

    const canciones = async (e) => {
        e.preventDefault()
        await addDoc(CancionCollection, { titulo: titulo, artista: artista })
        navigate('/')
    }

    return (
        <>
            <Form onSubmit={canciones}>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                    value={titulo}
                    onChange = {(e) => setTitulo(e.target.value)}
                    type="text" placeholder="Introduce el titulo de la cancion" />

                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicArtist">
                    <Form.Label>artista</Form.Label>
                    <Form.Control 
                    value={artista}
                    onChange = {(e)=> setArtista(e.target.value)} type="text" placeholder="Introduce el nombre del artista" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>


              
                <button className="btn btn-dark flex-grow-1" type="submit">
                    Enviar
                </button>
            </Form>
        </>
    )
}

export default SolicitudCancion