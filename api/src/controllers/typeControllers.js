const axios = require("axios");
const { Type } = require("../db");

//? Esta función se encarga de obtener y sincronizar los tipos de Pokémon desde
//?la API pública de PokeAPI y la base de datos local.
const getAllTypes = async () => {
  const types = await Type.findAll({ attributes: ["name", "id"] });

  if (types.length === 0) {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const typeNames = response.data.results.map((el) => el.name);

    await Type.bulkCreate(typeNames.map((name) => ({ name })));

    return typeNames;
  }

  return types.map((type) => type.name);
};

module.exports = {
  getAllTypes,
};
