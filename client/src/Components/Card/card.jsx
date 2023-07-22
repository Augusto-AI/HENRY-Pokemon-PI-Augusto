import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import Pokemon from "../../Imagenes/Pokemoncreado.png";

export default function Card({ id, name, img, types }) {
  return (
   
    <div className={styles.card}>
      <h3>{name}</h3>
      <div className={styles.imgcard}>
      {img ? (
        <img src={img} alt="" />
      ) : (
        <img src={Pokemon} alt="Imagen por defecto" />
      )}</div>
      <div className={styles.types}>
        {types?.map((t, index) => (
          <span key={index}>
            {t.name ? (
              <Link to={`/home/${id}`}>{t.name}</Link>
            ) : (
              <span>{t}</span>
            )}
            {index < types.length - 1 && <span> - </span>}
          </span>
        ))}
      </div>
    </div>
  );
}

