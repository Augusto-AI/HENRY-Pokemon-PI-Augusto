const axios = require("axios");
const { Pokemon, Type } = require("../db");

//* La idea de este proyecto es construir una aplicación web a partir de la API pokeapi en la que se pueda:

//* Buscar pokemones.
//* Visualizar la información de los pokemones.
//* Filtrarlos.
//* Ordenarlos.
//* Crear nuevos pokemones.
//* ⚠️ Para las funcionalidades de filtrado y ordenamiento NO se puede utilizar los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados.

//* Únicos end-points que se pueden utilizar
//* PokeApitype Home
//* Por id: "https://pokeapi.co/api/v2/pokemon/{id}"
//* Por nombre: "https://pokeapi.co/api/v2/pokemon/{name}"
//* Por tipo: "https://pokeapi.co/api/v2/type"

//? Funcion para solicitar a la API de PokeApi mediante axios la data de los pokemons segun
//? el modelo pepido por el PI: En este me traigo toda la información de API y la guardo en
//? apiInfo.

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=200");
  const apiInfo = apiUrl.data.results.map(async (el) => {
    const pokemonData = await axios.get(el.url);
    return {
      id: pokemonData.data.id,
      name: pokemonData.data.name,
      img: pokemonData.data.sprites.other.dream_world.front_default,
      hp: pokemonData.data.stats[0].base_stat,
      attack: pokemonData.data.stats[1].base_stat,
      defense: pokemonData.data.stats[2].base_stat,
      speed: pokemonData.data.stats[5].base_stat,
      height: pokemonData.data.height,
      weight: pokemonData.data.weight,
      types: pokemonData.data.types.map((type) => type.type.name),
    };
  });
  return Promise.all(apiInfo);
};

//? En esta función consulto la base de datos local para obtener la información de
//? los Pokemons creados en ella. Utilizando las tablas de pokenon y type.
const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//? En esta función conbino la info del Api y de la Base de Datso local.
//? Si se proporciona un nombre como argumento, filtra los pokemon que coiciden con ese nombre
//? en minusculas, sino devuelve todos los pokemones
const getAllpokemon = async (name) => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = [...apiInfo, ...dbInfo];

  if (name) {
    const pokemontotal = infoTotal.filter((p) => {
      if (p.name.toLowerCase().includes(name.toLowerCase())) {
        return p;
      }
    });

    if (pokemontotal.length <= 0) {
      throw new Error("Error: there is no such Pokemon");
    } else {
      return pokemontotal;
    }
  } else {
    return infoTotal;
  }
};
//? En esta función filtro los pokemon por ID
const getPokemonId = async (id) => {
  const allPoke = await getAllpokemon();

  const pokemon = allPoke.find((d) => d.id.toString() === id);
  return pokemon;
};
//? Esta función tomo los datos para Create Pokemon como argumento y lo utilizo
//? para crear un nuevo pokemon tanto de la API y la Base da datos local:

const postPokemons = async (pokemonData) => {
  const { name, img, hp, attack, defense, speed, height, weight, types } =
    pokemonData;

  const newPokemon = await Pokemon.create({
    name,
    img,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  if (Array.isArray(types) && types.length > 0) {
    const typeToAssociate = await Promise.all(
      types.map((typeName) => Type.findOrCreate({ where: { name: typeName } }))
    );
    //Relacion pokemon - types
    await newPokemon.addType(typeToAssociate.map((type) => type[0]));
  }

  return newPokemon;
};

//* Aca me exporto todos los crontroller con sus respectivas funciones:

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllpokemon,
  postPokemons,
  getPokemonId,
};
