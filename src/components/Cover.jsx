import { useState } from "react";
import { images, placeholder } from "../images";

export function Cover({ id, image }) {
  const [src, setSrc] = useState(image || images[id] || placeholder);

  return (
    <span className="cover-frame">
      <img
        className="cover"
        src={src}
        alt=""
        onError={() => {
          if (src !== placeholder) setSrc(placeholder);
        }}
      />
    </span>
  );
}
