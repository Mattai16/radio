import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySawl = withReactContent(Swal)


const Create = () => {

    const [nombre, setNombre] = useState('')
    const [papel, setPapel] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()

    const perfilesCollection = collection(db, "perfiles")

    const profiles = async (e) => {
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
                '¡Registrado!',
                '¡El perfil ha sido registrado!',
                'success'
            )
            await addDoc(perfilesCollection, { nombre: nombre, papel: papel, desc: desc })
            navigate('/perfilesAdmin')

        }

    }

    const cancelar = ()=>{
        MySawl.fire({
          title: '¿Estas seguro de Cancelar?',
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
            <Form onSubmit={profiles}>
                <div className='container'>
                    <div class="mb-3 ">
                        <label for="exampeFormControlInput1" class="form-label">Nombre del perfil</label>
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
                        <label for="exampeFormControlInput1" class="form-label">Papel</label>
                        <input value={papel}
                            onChange={(e) => setPapel(e.target.value)}
                            type="text" class="form-control" id="exampleFormControlInput1" placeholder="Introduce el papel Locutor o Dj" />
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

export default Create
