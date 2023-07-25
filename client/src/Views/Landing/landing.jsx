import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";
import MundoPokemon from "../../Imagenes/MundoPokemon.mp4";
import Footer from "../../Components/Footer/footer";

function Landing() {
  return (
    <div className={style.landingg}>
      <div className={style.containervideo}>
        <video className={style.video} autoPlay loop muted>
          <source src={MundoPokemon} type="video/mp4" />
        </video>
        <div className={style.buttonlanding}>
          <Link to="/home">
            <button>GO</button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
