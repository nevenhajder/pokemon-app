/**
 * Formats the stats data into a single object.
 * @param {array} statsArray Array of stats from the API response
 * @returns {object} An object containing all of the stats as key-value pairs
 */
function formatPokemonStats(statsArray) {
  return statsArray.reduce((accumulator, { stat, base_stat }) => {
    accumulator[stat.name] = base_stat;
    return accumulator;
  }, {});
}

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS',
  startSearch: 'START_SEARCH',
};

function pokemonReducer(state, action) {
  const { error, success, startSearch } = actionTypes;

  switch (action.type) {
    case success:
      const {
        imageUrl,
        pokeData: { name, stats },
        descriptionText,
      } = action;
      const { hp, attack, defense } = formatPokemonStats(stats);

      return {
        pokemon: {
          hp,
          name,
          attack,
          defense,
        },
        imageUrl,
        isLoading: false,
        invalidInput: false,
        descriptionText,
      };
    case startSearch:
      return {
        ...state,
        isLoading: true,
      };
    case error:
      console.error(action.error);
      return {
        ...state,
        isLoading: false,
        invalidInput: true,
      };
    default:
      throw new Error(`${action.type} is not a valid action`);
  }
}

export { actionTypes, pokemonReducer as default };
