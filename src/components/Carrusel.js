import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig/firebase';

export default function Carrusel() {
  const [programa, setPrograma] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getPrograma = async () => {
      const programaCollection = collection(db, 'programas');
      const data = await getDocs(programaCollection);
      setPrograma(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPrograma();
  }, []);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? programa.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === programa.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          {programa.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index.toString()}
              className={index === currentIndex ? 'active' : ''}
              aria-current={index === currentIndex ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {programa.map((programaItem, index) => (
            <div
              key={programaItem.id}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            >
              <img
                src={programaItem.imagen}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{programaItem.titulo}</h5>
                <p>{programaItem.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
          onClick={handlePrev}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
          onClick={handleNext}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
