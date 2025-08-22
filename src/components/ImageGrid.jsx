import React from "react";
import { row1, row2, row3 } from "../constants/Images.js";

const ImageGrid = () => {
  const rows = [row1, row2, row3];

  return (
    <div className="flex gap-3 mt-20">
      {rows.map((row, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col gap-3">
          {row.map((image, i) => (
            <img
              key={i}
              src={image.path}
              alt=""
              className="w-full h-auto object-cover"
              draggable="false"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
