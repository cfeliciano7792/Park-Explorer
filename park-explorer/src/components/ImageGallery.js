import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const MyImageGallery = ({ parkData }) => {
  const mapImages = () => {
    return parkData.images.map((image) => ({
      original: image.url,
      originalAlt: image.altTex,
      originalHeight: 500,
      originalWeight: 700,
      //description: image.caption,
    }));
  };

  const galleryOptions = {
    showBullets: false,
    showFullscreenButton: false,
    showPlayButton: false,
  };

  return (
    <article>
      <ImageGallery items={mapImages()} {...galleryOptions} />
    </article>
  );
};

export default MyImageGallery;