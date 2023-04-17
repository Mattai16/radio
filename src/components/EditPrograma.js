import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";
import Menu from './Menu'

const EditPrograma = () => {

  const [desc, setDesc] = useState('')
  const [titulo, setTitulo] = useState('')
  const [horario, setHorario] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    const programa = doc(db, "programas", id)
    const data = { desc: desc, titulo: titulo, horario: horario }
    await updateDoc(programa, data)
    navigate('/')

  }

  const getProgramaById = async (id) => {
    const programa = await getDoc((doc(db, "programas", id)))
    if (programa.exists()) {
      console.log(programa.data())
      setDesc(programa.data().desc)
      setTitulo(programa.data().titulo)
      setHorario(programa.data().horario)
    } else {
      console.log("¡!")
    }
  }

  useEffect(() => {
    getProgramaById(id)
  }, [])

  return (
    <>
      <Menu/>
      <Form onSubmit={update}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Descripcion</Form.Label>
          <Form.Control
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text" placeholder="Introduce una descripcion" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            type="text" placeholder="Introduce un Titulo" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Horario</Form.Label>
          <Form.Control
            value={horario}
            onChange={(e) => setHorario(e.target.value)} type="text" placeholder="Introduce un horario del programa" />
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

export default EditPrograma

