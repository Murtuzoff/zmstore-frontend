import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ProductImage = ({
  src,
  alt,
  width,
  height,
  border,
  borderRadius,
  cursor,
}) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!src) {
        setImageSrc('/images/no-image.jpg');

        return;
      }

      if (src.startsWith('blob:http')) {
        setImageSrc(src);
      }

      const response = await fetch(src);

      if (response.ok) {
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      } else {
        setImageSrc('/images/no-image.jpg');
      }
    };

    fetchImage();

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      style={{
        border: `${border}`,
        borderRadius: `${borderRadius}`,
        boxShadow: '2px 2px 4px #2112',
        cursor: `${cursor}`,
      }}
    />
  );
};

ProductImage.defaultProps = {
  src: '',
  alt: 'product-img',
  width: '',
  height: '',
  border: '',
  borderRadius: '12px',
  cursor: '',
};

ProductImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  cursor: PropTypes.string,
};

export default ProductImage;
