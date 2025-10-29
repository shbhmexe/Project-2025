import React from 'react';
import './ImageGrid.css';

const ImageGrid = ({ images, selectedImages, onToggleSelection }) => {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <div key={image.id} className="image-item">
          <img src={image.thumb} alt={image.description || 'Image'} />
          <div
            className={`image-overlay ${
              selectedImages.includes(image.id) ? 'selected' : ''
            }`}
            onClick={() => onToggleSelection(image.id)}
          >
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={selectedImages.includes(image.id)}
                onChange={() => {}}
                className="image-checkbox"
              />
            </div>
          </div>
          <div className="image-info">
            <p className="image-user">📷 {image.user.name}</p>
            {image.likes > 0 && (
              <p className="image-likes">❤️ {image.likes}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
