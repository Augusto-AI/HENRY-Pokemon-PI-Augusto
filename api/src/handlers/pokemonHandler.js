//? Aca me traigo todos los controllers para empezar a manejar los req, res
//? hacia la Api y la Base de datos local

const {
  getAllpokemon,
  postPokemons,
  getPokemonId,
} = require("../controllers/pokemonControllers");

//*----------------------------

//* GET | /pokemons
//*Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.
//* ==>

const getPokemonHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const response = await getAllpokemon(name);
      return res.status(200).json(response);
    }
    const response = await getAllpokemon();
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*----------------------------------------------------------

//* GET | /pokemons/:idPokemon
//*Esta ruta obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon.
//*El pokemon es recibido por parámetro (ID).
//*Tiene que incluir los datos del tipo de pokemon al que está asociado.
//*Debe funcionar tanto para los pokemones de la API como para los de la base de datos.
//* ==>

const getPokemonHandlerId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getPokemonId(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*-----------------------------------------------------------------

//*POST | /pokemons
//*Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
//*Toda la información debe ser recibida por body.
//*Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (debe poder relacionarse al menos con dos).
//* ==>

const postPokemonHandler = async (req, res) => {
  try {
    const response = await postPokemons(req.body);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//? Aca exporto todos los Handlers con el manejo del GET y POST para los action en Redux

module.exports = {
  getPokemonHandler,
  postPokemonHandler,
  getPokemonHandlerId,
};
