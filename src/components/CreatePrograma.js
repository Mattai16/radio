import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";



const CreatePrograma = () => {

    const [desc, setDesc] = useState('')
    const [titulo, setTitulo] = useState('')
    const [horario, setHorario] = useState('')
    const navigate = useNavigate()

    const programaCollection = collection(db, "programas")

    const programs = async (e) => {
        e.preventDefault()
        await addDoc(programaCollection, { desc: desc, titulo: titulo, horario: horario })
        navigate('/programa')
    }

    return (
        <>
            <Form onSubmit={programs}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Descripcion</Form.Label>
                    <Form.Control
                    value={desc}
                    onChange = {(e)=> setDesc(e.target.value)}
                     type="text" placeholder="Introduce una descripcion" />
           
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                    value={titulo}
                    onChange = {(e) => setTitulo(e.target.value)}
                    type="text" placeholder="Introduce un titulo para el programa" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Horario</Form.Label>
                    <Form.Control 
                    value={horario}
                    onChange = {(e)=> setHorario(e.target.value)} type="text" placeholder="Introduce el horario del programa" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">


                </Form.Group>
                <button className="btn btn-dark flex-grow-1" type="submit">
                    Enviar
                </button>
            </Form>
        </>
    )
}

export default CreatePrograma