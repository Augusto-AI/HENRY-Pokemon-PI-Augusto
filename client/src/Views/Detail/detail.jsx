import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdPokemon } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Pokemon from "../../Imagenes/Pokemoncreado.png";
import style from "./detail.module.css";
import Fondo from "../../Imagenes/Fondo.mp4";
import NavBar from "../../Components/NavBar/navbar";
import Footer from "../../Components/Footer/footer";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getIdPokemon(id));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch, id]);

  const myPokemon = useSelector((state) => state.detail);

  return (
    <div>
      <video className={style.videobackground} autoPlay loop muted>
        <source src={Fondo} type="video/mp4" />
      </video>
      <div className={style.container}>
        <NavBar />
        <div>
          <Link to="/home">
            <button className={style.detaillink}>Back</button>
          </Link>
        </div>
        <div className={style.detail}>
          {loading ? (
            <p className={style.detailp}>Loading...</p>
          ) : myPokemon ? (
            <div>
              <h1 className={style.detailh1}>{myPokemon.name}</h1>
              <div className={style.detailimg}>
                {myPokemon.img ? (
                  <img src={myPokemon.img} alt="" />
                ) : (
                  <img src={Pokemon} alt="Default Image" />
                )}
              </div>
              <div className={style.detailp}>
                <p>HP: {myPokemon.hp}</p>
                <p>Attack: {myPokemon.attack}</p>
                <p>Defense: {myPokemon.defense}</p>
                <p>Speed: {myPokemon.speed}</p>
                <p>Height: {myPokemon.height}</p>
                <p>Weight: {myPokemon.weight}</p>
                <div>
                  {myPokemon.types?.map((t, index) => (
                    <span key={index}>
                      {t.name ? (
                        <Link to={`/home/${id}`}>{t.name}</Link>
                      ) : (
                        <span>{t}</span>
                      )}
                      {index < myPokemon.types.length - 1 && <span> - </span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className={style.detailp}>Pokemon not found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
