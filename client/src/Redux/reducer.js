import { GET_POKEMON, GET_TYPES, GET_ID_POKEMON, POST_POKEMON, GET_NAME_POKEMON, FILTER_BY_TYPES, FILTER_IF_CREATED, ORDER_BY_NAME, ORDER_BY_ATTACK } from "../Redux/actions";

const initialState = {
  pokemon: [],
  allPokemons: [],
  types: [],
  detail: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
        allPokemons: action.payload
      };

      case POST_POKEMON:
      return {
        ...state,
      };

      case GET_TYPES:
        return {
          ...state,
          types: action.payload
        };
  
  case FILTER_BY_TYPES:{
    const filtered =
    action.payload === "all"
      ? state.allPokemons
      : state.allPokemons.filter((el) =>
          el.types.some((type) => action.payload.includes(type))
        );
  return {
    ...state,
    pokemon: filtered,
  };
  }

  case FILTER_IF_CREATED: {
   
      const filtrado = action.payload === "created" ? state.allPokemons.filter(el => typeof el.id !== 'number') : state.allPokemons.filter(el=> typeof el.id === 'number')
      return{
        ...state,
        pokemon: action.payload === "all" ? state.allPokemons : filtrado
      }
  }

  case ORDER_BY_NAME: {
    let sortedArr = action.payload === "ascPokemon" ?
    state.pokemon.sort(function (a, b){
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
      }) :
      state.pokemon.sort(function (a, b){
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
    })
    return {
      ...state,
      pokemon: sortedArr
    }
  }

  case GET_NAME_POKEMON:{
    return{
      ...state,
      pokemon: action.payload
    }}

    case GET_ID_POKEMON:{
      return{
        ...state,
        detail: action.payload
      }}

    case ORDER_BY_ATTACK: {
      let sortedArr = action.payload === "descA" ?
      state.pokemon.sort((a, b) => b.attack - a.attack) :
      state.pokemon.sort((a, b) => a.attack - b.attack);
    return {
      ...state,
      pokemon: sortedArr
    };
   }



    default:
      return { ...state };
  }
};

export default rootReducer;
