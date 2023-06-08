import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";
import Menu from './Menu'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySawl = withReactContent(Swal)


const EditPrograma = () => {

  
  const [desc, setDesc] = useState('')
  const [titulo, setTitulo] = useState('')
  const [horario, setHorario] = useState('')
  const [imagen, setImagen] = useState('')
  const [dias, setDias] = useState('')
  const [involucrados, setInvolucrados] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()
  
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
          navigate('/ProgramaAdmin'),
          'Cancelado!',
          'Ha sido cancelado.',
          'Cambios cancelados'
        )
      }
    })

  }


  const update = async (e) => {
    e.preventDefault()
   
    if ((titulo == "") || (desc == "") || (horario == "") || (imagen == "") || (dias == "") || (involucrados == "")) {
      Swal.fire('Campos vacios vuelve a intentarlos')

  } else {
    const programa = doc(db, "programas", id)
    const data = { desc: desc, titulo: titulo, horario: horario, imagen: imagen, dias: dias, involucrados: involucrados }
    await updateDoc(programa, data)
    navigate('/programaAdmin')
  }
  }

  const getProgramaById = async (id) => {
    const programa = await getDoc((doc(db, "programas", id)))
    if (programa.exists()) {
      console.log(programa.data())
      setDesc(programa.data().desc)
      setTitulo(programa.data().titulo)
      setHorario(programa.data().horario)
      setImagen(programa.data().imagen)
      setDias(programa.data().dias)
      setInvolucrados(programa.data().involucrados)

    } else {
      console.log("¡!")
    }
  }

  useEffect(() => {
    getProgramaById(id)
  }, [])

  return (
    <>
      <Menu />

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


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            value={imagen}
            onChange={(e) => setImagen(e.target.value)} type="text" placeholder="Introduce la url de la imagen" />
        </Form.Group>
     

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Dias</Form.Label>
            <Form.Control
              value={dias}
              onChange={(e) => setDias(e.target.value)} type="text" placeholder="Introduce el dia del programa" />
          </Form.Group>
          

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>involucrado</Form.Label>
              <Form.Control
                value={involucrados}
                onChange={(e) => setInvolucrados(e.target.value)} type="text" placeholder="Introduce a la persona involucrada" />
            </Form.Group>

            


           
            <button className="btn btn-dark flex-grow-1" type="submit">
              Guardar
            </button>

          </Form>
          <button className="btn btn-dark flex-grow-1" onClick={cancelar}>
              Cancelar
            </button>

      </>
        )
}

        export default EditPrograma

