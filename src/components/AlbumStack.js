import React from 'react';
import Album from './Album'; // Componente de álbum

class AlbumStack extends React.Component {
  render() {
    const albumData = [
      // Aquí irían los datos de los álbumes, como el título, artista, imagen, etc.
    ];

    const albums = albumData.map((album, index) => {
      return (
        <div key={index} className="col-md-3 col-sm-6 mb-4">
          <Album data={album} />
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          {albums}
        </div>
      </div>
    );
  }
}

export default AlbumStack;
