import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig/firebase'
import { async } from '@firebase/util'
import { Form } from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
const MySawl = withReactContent(Swal)

const CreatePrograma = () => {

    const [desc, setDesc] = useState('')
    const [titulo, setTitulo] = useState('')
    const [horario, setHorario] = useState('')
    const [imagen, setImagen] = useState('')
    const [dias, setDias] = useState('')
    const [involucrados, setInvolucrados] = useState('')
    const navigate = useNavigate()

    const programaCollection = collection(db, "programas")

    const programs = async (e) => {
        e.preventDefault()

        if ((titulo == "") || (desc == "") || (horario == "") || (imagen == "") || (dias == "") || (involucrados == "")) {
            Swal.fire('Campos vacios vuelve a intentarlos')

        } else {
            Swal.fire(
                'Registrado!',
                'El programa ha sido registrado!',
                'success'
            )
            await addDoc(programaCollection, { desc: desc, titulo: titulo, horario: horario, imagen: imagen, dias: dias, involucrados: involucrados })
            navigate('/programaAdmin')

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
              navigate('/ProgramaAdmin'),
              'Cancelado!',
              'Ha sido cancelado.',
              'Cambios cancelados'
            )
          }
        })
    
      }


    return (
        <>
            <div>
            <Form onSubmit={programs}>
                <div className='container'>
                    <div class="mb-3 ">
                        <label for="exampeFormControlInput1" class="form-label">Asigna un titulo</label>
                        <input value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                            type="text" class="form-control" id="exampleFormControlInput1" placeholder="introduce un titulo" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Agrega una descripcion</label>
                        <textarea value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div class="mb-3 ">
                        <label for="exampeFormControlInput1" class="form-label">Horario</label>
                        <input value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                            type="text" class="form-control" id="exampleFormControlInput1" placeholder="Establece el horario" />
                    </div>

                    <div class="mb-3 ">
                        <label for="exampeFormControlInput1" class="form-label">Imagen</label>
                        <input value={imagen}
                            onChange={(e) => setImagen(e.target.value)} 
                            type="text" class="form-control" id="exampleFormControlInput1" placeholder="Establece un horario" />
                    </div>


                    <div class="mb-3 ">
                        <label for="exampeFormControlInput1" class="form-label">Días</label>
                        <input value={dias}
                            onChange={(e) => setDias(e.target.value)}
                            type="text" class="form-control" id="exampleFormControlInput1" placeholder="Introduce los días en los que se presentará" />
                    </div>

                    <div class="mb-3 ">
                        <label for="exampeFormControlInput1" class="form-label">Involucrados</label>
                        <input value={involucrados}
                            onChange={(e) => setInvolucrados(e.target.value)}
                            type="text" class="form-control" id="exampleFormControlInput1" placeholder="Menciona a los participantes" />
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
            </div>
        </>
    )
}

export default CreatePrograma
