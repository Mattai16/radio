import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";
import Menu from './Menu'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
const MySawl = withReactContent(Swal)

const Edit = () => {

  const [nombre, setNombre] = useState('')
  const [papel, setPapel] = useState('')
  const [desc, setDesc] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {


    e.preventDefault()
    if (!navigator.onLine) {
      try {
        // Verificar la conexión a la base de datos
        await db.getFirestore().ping();
      } catch (error) {
        Swal.fire('Error', 'No se pudo establecer conexión con la base de datos', 'error');
        return;
      }
  
    }else if ((nombre == "") || (desc == "") || (papel == "")) {
      Swal.fire('Campos vacios vuelve a intentarlos')

    }
    else {
      Swal.fire(
        'Registrado!',
        'El perfil ha sido registrado!',
        'success'
      )

      const perfil = doc(db, "perfiles", id)
      const data = { nombre: nombre, desc: desc, papel: papel }
      await updateDoc(perfil, data)
      navigate('/perfilesAdmin')

    }



  }


const getPerfilesById = async (id) => {
  const perfil = await getDoc((doc(db, "perfiles", id)))
  if (perfil.exists()) {
    console.log(perfil.data())
    setNombre(perfil.data().nombre)
    setDesc(perfil.data().desc)
    setPapel(perfil.data().papel)
  } else {
    console.log("¡!")
  }
}

useEffect(() => {
  getPerfilesById(id)
}, [])

const cancelar = () => {
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
        navigate('/perfilesAdmin'),
        'Cancelado!',
        'Ha sido cancelado.',
        'Cambios cancelados'
      )
    }
  })

}


return (
  <>
    <Menu />
    <Form onSubmit={update}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> Nombre</Form.Label>
        <Form.Control
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          type="text" placeholder="Introduce un nombre" />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type="text" placeholder="Introduce una descripción" />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Papel</Form.Label>
        <Form.Control
          value={papel}
          onChange={(e) => setPapel(e.target.value)} type="text" placeholder="Introduce el papel (Locutor o DJ)" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">


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

export default Edit


