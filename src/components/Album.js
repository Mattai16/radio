import React from 'react';

class Album extends React.Component {
  render() {
    const { title, artist, image } = this.props.data;

    return (
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{artist}</p>
        </div>
      </div>
    );
  }
}

export default Album;
