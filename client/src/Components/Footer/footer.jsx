import React from "react";
import style from "./footer.module.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={style.footer}>
      <p>API creado con Pokeapi por Augusto Herrera para PI Henry 2023.</p>
      <div className={style.icons}>
        <a
          href="https://www.linkedin.com/in/augusto-herrera-velasquez-36679060/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className={style.icon} />
        </a>
        <a
          href="https://github.com/Augusto-AI/HENRY-Pokemon-PI-Augusto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className={style.icon} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
