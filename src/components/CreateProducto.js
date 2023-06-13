import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import Menu from './Menu'
const MySawl = withReactContent(Swal)



const CreateProducto = () => {

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()

    const productosCollection = collection(db, "productos")



    const prod = async (e) => {
        e.preventDefault()

        try {
            // Verificar la conexión a la base de datos
            await db.getFirestore().collection('test').get()
        } catch (error) {
            Swal.fire('Error', 'No se pudo establecer conexión con la base de datos', 'error')
            return
        }

        if((desc == "") || (nombre == "") || (precio == "")) {
            Swal.fire('Campos vacios vuelve a intentarlos')

        } else {
            Swal.fire(
                'Registrado!',
                'El producto ha sido registrado!',
                'success'
            )
            await addDoc(productosCollection, { nombre: nombre, precio: precio, desc: desc })
            navigate('/tiendaAdmin')

        }
    }

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
              navigate('/tiendaAdmin'),
              'Cancelado!',
              'Ha sido cancelado.',
              'Cambios cancelados'
            )
          }
        })
    
      }


    return (
        <>
            <Form onSubmit={prod}>
                <div className='container'>
                    <div class="mb-3 ">
                        <label for="exampeFormControlInput1" class="form-label">Nombre del producto</label>
                        <input value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            type="text" class="form-control" id="exampleFormControlInput1" placeholder="introduce un nombre" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Agrrega una descripcion</label>
                        <textarea value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div class="mb-3 ">
                        <label for="exampeFormControlInput1" class="form-label">Precio del producto</label>
                        <input value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            type="text" class="form-control" id="exampleFormControlInput1" placeholder="Introduce solo numeros enteros" />
                    </div>

                    <div className='mb-3'>
                        <button className="btn btn-dark flex-grow-1" type="submit">
                            Guardar
                        </button>
                    </div>



                </div>
            </Form>
            <button className="btn btn-dark flex-grow-1" onClick={cancelar}>
                    Cancelar
                     </button>
                             </>
    )
}

export default CreateProducto
