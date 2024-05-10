import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Descripcion</div>
        <div className="descriptionbox-nav-box fade">Reseñas (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>Descripcion2</p>
        <p>Description 3</p>
      </div>
    </div>
  );
};

export default DescriptionBox;
