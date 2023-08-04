const { getAllTypes } = require("../controllers/typeControllers");

const { Type } = require("../db");

//*GET | /types
//*Obtiene un arreglo con todos los tipos de pokemones.
//*En una primera instancia, cuando la base de datos este vacía, deberás guardar
//*todos los tipos que encuentres en la API.
//*Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo).
//*Luego de obtenerlos de la API, deben ser guardados en la base de datos para
//*su posterior consumo desde allí.

const getTypesHandler = async (req, res) => {
  try {
    const types = await getAllTypes();
    res.json(types);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTypesHandler,
};
