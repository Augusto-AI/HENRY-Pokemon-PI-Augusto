import React from "react";
import style from "./pagination.module.css";

export default function Pagination({ pokemonPerPage, allPokemon, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemon / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.pagnav }>
      <ul className={style.navul }>
        { pageNumbers &&
          pageNumbers.map(number =>(
            <li className={style.navli } key={number}>
              <a onClick={() => paginado(number)}>{number}</a> 
            </li>
          ))}
      </ul>
    </nav>
  );
}
