// import React from "react";
// import style from "./pagination.module.css";

// export default function Pagination({ pokemonPerPage, allPokemon, paginado }) {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(allPokemon / pokemonPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav className={style.pagnav }>
//       <ul className={style.navul }>
//         { pageNumbers &&
//           pageNumbers.map(number =>(
//             <li className={style.navli } key={number}>
//               <a onClick={() => paginado(number)}>{number}</a>
//             </li>
//           ))}
//       </ul>
//     </nav>
//   );
// }

import React from "react";
import style from "./pagination.module.css";

export default function Pagination({
  pokemonPerPage,
  allPokemon,
  paginado,
  currentPage,
}) {
  const maxPagesToShow = 10; // Número máximo de páginas a mostrar en la paginación
  const totalPages = Math.ceil(allPokemon / pokemonPerPage);

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Creamos un array con las páginas a mostrar en la paginación
  const pageRange = [];
  for (let i = startPage; i <= endPage; i++) {
    pageRange.push(i);
  }

  return (
    <nav className={style.pagnav}>
      <ul className={style.navul}>
        {/* Agregamos un botón para retroceder */}
        {currentPage > 1 && (
          <li className={style.navli}>
            <a href="#!" onClick={() => paginado(currentPage - 1)}>
              {"<"}
            </a>
          </li>
        )}

        {/* Mostramos los números de página */}
        {pageRange.map((number) => (
          <li className={style.navli} key={number}>
            <a href="#!" onClick={() => paginado(number)}>
              {number}
            </a>
          </li>
        ))}

        {/* Agregamos un botón para avanzar */}
        {currentPage < totalPages && (
          <li className={style.navli}>
            <a href="#!" onClick={() => paginado(currentPage + 1)}>
              {">"}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
