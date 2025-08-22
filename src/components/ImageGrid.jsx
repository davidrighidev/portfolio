import React from "react";
import { images } from "../constants/Images";

const ImageGrid = () => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3 mt-20">
      {images.map((image, i) => (
        <img
          key={i}
          src={image.path}
          alt=""
          className="w-full mb-3 break-inside-avoid object-cover"
          draggable="false"
        />
      ))}
    </div>
  );
};

export default ImageGrid;
