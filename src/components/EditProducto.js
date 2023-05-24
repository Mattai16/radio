import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";
import Menu from './Menu'

const EditProducto = () => {

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [desc, setDesc] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    const producto = doc(db, "productos", id)
    const data = { nombre: nombre, desc: desc, precio: precio }
    await updateDoc(producto, data)
    navigate('/tiendaAdmin')

  }

  const getProductosById = async (id) => {
    const producto = await getDoc((doc(db, "productos", id)))
    if (producto.exists()) {
      console.log(producto.data())
      setNombre(producto.data().nombre)
      setDesc(producto.data().desc)
      setPrecio(producto.data().precio)
    } else {
      console.log("¡!")
    }
  }

  useEffect(() => {
    getProductosById(id)
  }, [])

  return (
    <>
      <Menu/>
      <Form onSubmit={update}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Nombre</Form.Label>
          <Form.Control
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text" placeholder="Introduce el nombre del producto nombre" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text" placeholder="Introduce una descripción" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            value={precio}
            onChange={(e) => setPrecio(e.target.value)} type="text" placeholder="Introduce el precio del producto" />
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

export default EditProducto