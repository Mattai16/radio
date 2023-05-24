import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySawl = withReactContent(Swal)


const SolicitudCancion = () => {

    const [titulo, setTitulo] = useState('')
    const [artista, setArtista] = useState('')
    const navigate = useNavigate()

    const CancionCollection = collection(db, "canciones")


    const cancelar = ()=>{
        MySawl.fire({
          title: 'Estas seguro de Cancelar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              navigate('/'),
              'Cancelado!',
              'Ha sido cancelado.',
              'Cambios cancelados'
            )
          }
        })
    
      }

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
            <button className="btn btn-dark flex-grow-1" onClick={cancelar}>
              Cancelar
            </button>
        </>
    )
}

export default SolicitudCancion