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

  const handleSearchButtonClick = () => {
    dispatch(getNamePokemon(name));
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

      <div className={style.containernav}>
        <ul>
          <li className={style.linknavli}>
            <Link to="/Create">CREATE A NEW POKEMON</Link>
          </li>
        </ul>
        <div>
          <input
            className={style.navinput}
            type="text"
            value={name}
            onChange={handleSearchInputChange}
            placeholder="Find a Pokemon..."
          />
          <button className={style.buttonnav} onClick={handleSearchButtonClick}>
            <span>FIND</span>
          </button>
        </div>
        <ul>
          <li className={style.linknavli2}>
            <Link
              to="/home"
              onClick={(e) => {
                handleClick(e);
              }}
            ></Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
