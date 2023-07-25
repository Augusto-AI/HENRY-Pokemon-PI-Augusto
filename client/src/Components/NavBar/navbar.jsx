import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNamePokemon, getPokemon } from "../../Redux/actions";
import style from "./navBar.module.css";
import Pokemon from "../../Imagenes/Pokemon.png";

const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSearchInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    try {
      await dispatch(getNamePokemon(name));
    } catch (error) {
      console.log(error);
      alert("Error searching for Pokemon. Please try again later.");
    }
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemon());
  }

  return (
    <div className={style.navbar}>
      <div>
        <p className={style.pnav}></p>
      </div>
      <div>
        <Link to="/home">
          <img src={Pokemon} alt="Pokemon Logo" className={style.logo} />
        </Link>
      </div>

      <div>
        <input
          className={style.navinput}
          type="text"
          value={name}
          onChange={handleSearchInputChange}
          placeholder="Find a Pokemon"
        />
        <button className={style.buttonnav} onClick={handleSearchButtonClick}>
          <span>FIND</span>
        </button>
      </div>

      <div className={style.containernav}>
        <ul>
          <li className={style.button}>
            <Link to="/Create">CREATE A NEW POKEMON</Link>
          </li>
        </ul>
      </div>
      <div className="card">
        <a className="social-link1" href="http://www.github.comn/Augusto-IA">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            height="1em"
            viewBox="0 0 496 512"
          >
            <path d="http://www.github.comn/Augusto-IA"></path>
          </svg>
        </a>
        <a
          className="social-link2"
          href="https://www.linkedin.com/in/augusto-herrera-velasquez-36679060/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            fill="#fff"
          >
            <path d="https://www.linkedin.com/in/augusto-herrera-velasquez-36679060/"></path>
          </svg>{" "}
        </a>
      </div>
    </div>
  );
};

export default NavBar;
