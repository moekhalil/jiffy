import React, { memo } from 'react';
import { Image } from '../../redux/features/types';

/*
  Nice todos: Use the picture element to render best image size according to client
*/

interface IGifCard {
  image: Image;
  onImageClick: (image: Image) => void;
}

const GifCard = ({ image, onImageClick }: IGifCard) => (
  <picture>
    <img
      src={image.fixedWidth.url}
      alt={image.title}
      title={image.title}
      onClick={() => onImageClick(image)}
    />
  </picture>
);

export default memo(GifCard);
