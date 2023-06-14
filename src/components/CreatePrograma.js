import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig/firebase';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CreatePrograma = () => {
  const [desc, setDesc] = useState('');
  const [titulo, setTitulo] = useState('');
  const [horario, setHorario] = useState('');
  const [imagen, setImagen] = useState('');
  const [dia, setDia] = useState('');
  const [involucrados, setInvolucrados] = useState('');
  const navigate = useNavigate();

  const programaCollection = collection(db, 'programas');

  const programs = async (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
        try {
          // Verificar la conexión a la base de datos
          await db.getFirestore().ping();
        } catch (error) {
          Swal.fire('Error', 'No se pudo establecer conexión con la base de datos', 'error');
          return;
        }
    
      }else if (
      titulo === '' ||
      desc === '' ||
      horario === '' ||
      imagen === '' ||
      dia === '' ||
      involucrados === ''
    ) {
      Swal.fire('Campos vacios, vuelve a intentarlo');
    } else {
      Swal.fire('¡Registrado!', '¡El programa ha sido registrado!', 'success');
      await addDoc(programaCollection, {
        desc: desc,
        titulo: titulo,
        horario: horario,
        imagen: imagen,
        dia: dia,
        involucrados: involucrados,
      });
      navigate('/programaAdmin');
    }
  };

  const cancelar = () => {
    MySwal.fire({
      title: '¿Estás seguro de Cancelar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          navigate('/ProgramaAdmin'),
          'Cancelado!',
          'Ha sido cancelado.',
          'Cambios cancelados'
        );
      }
    });
  };

  return (
    <>
      <div>
        <Form onSubmit={programs}>
          <div className="container">
            <div className="mb-3">
              <label htmlFor="exampeFormControlInput1" className="form-label">
                Asigna un título
              </label>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Introduce un título"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Agrega una descripción
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="exampeFormControlInput1" className="form-label">
                Horario
              </label>
              <select
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Selecciona el horario</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="exampeFormControlInput1" className="form-label">
                Imagen
              </label>
              <input
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Establece una imagen"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampeFormControlInput1" className="form-label">
                Día
              </label>
              <select
                value={dia}
                onChange={(e) => setDia(e.target.value)}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Selecciona el día</option>
                <option value="Domingo">Domingo</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="exampeFormControlInput1" className="form-label">
                Involucrados
              </label>
              <input
                value={involucrados}
                onChange={(e) => setInvolucrados(e.target.value)}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Menciona a los participantes"
              />
            </div>

            <div className="mb-3">
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
  );
};

export default CreatePrograma;
